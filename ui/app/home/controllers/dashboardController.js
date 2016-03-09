'use strict';

angular.module('bahmni.home')
    .controller('DashboardController', ['$rootScope', '$scope', '$state', 'appService', 'locationService', 'spinner', '$bahmniCookieStore', '$window', '$q', 'offlineService', 'scheduledSync',
        function ($rootScope, $scope, $state, appService, locationService, spinner, $bahmniCookieStore, $window, $q, offlineService, scheduledSync) {
            $scope.appExtensions = appService.getAppDescriptor().getExtensions($state.current.data.extensionPointId, "link") || [];
            $scope.selectedLocationUuid = {};
            $scope.isOfflineApp = offlineService.isOfflineApp();

            var getCurrentLocation = function () {
                return $bahmniCookieStore.get(Bahmni.Common.Constants.locationCookieName) ? $bahmniCookieStore.get(Bahmni.Common.Constants.locationCookieName) : null;
            };

            var init = function () {
                return locationService.getAllByTag("Login Location").then(function (response) {
                        $scope.locations = response.data.results;
                        $scope.selectedLocationUuid = getCurrentLocation().uuid;
                    }
                );
            };

            var getLocationFor = function (uuid) {
                return _.find($scope.locations, function (location) {
                    return location.uuid == uuid;
                })
            };

            $scope.isCurrentLocation = function (location) {
                return getCurrentLocation().uuid === location.uuid;
            };

            $scope.onLocationChange = function () {
                var selectedLocation = getLocationFor($scope.selectedLocationUuid);
                $bahmniCookieStore.remove(Bahmni.Common.Constants.locationCookieName);
                $bahmniCookieStore.put(Bahmni.Common.Constants.locationCookieName, {
                    name: selectedLocation.display,
                    uuid: selectedLocation.uuid
                }, {path: '/', expires: 7});
                $window.location.reload();
            };

            $scope.sync = function() {
                scheduledSync.jobInit();
            };

            $scope.$watch(function(){return scheduledSync.isJobRunning()}, function(newValue){
                if(!_.isNull(newValue)){
                    $scope.isSyncing = (newValue.jobPromise !== null);
                }
            }, true);

            return spinner.forPromise($q.all(init()));
        }]);