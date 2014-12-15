var consoleApp = angular.module('consoleApp', []);

consoleApp.controller('mainCtrl', ['$scope', '$q', function ($scope, $q) {


    function initialize () {
        updateVoiceList();
        updateIdList();
    }

    function updateVoiceList () {
        getVoiceList().then(function (items) {
            $scope.items = items;
        }, function (reason) {
            console.log('Error[updateVoiceList]:' + reason);
        });
    }

    function tryDeleteVoice (item) {
        if (item) {
            if(window.confirm('Do you want to remove ' + item.url + ' ?')) {
                removeVoice(item.key).then(function () {
                    updateVoiceList();
                }, function (reason) {
                    console.log('Error[tryDeleteVoice]:' + reason);
                });
            }
        }
    }

    function updateIdList () {
        getIdList().then(function (rids) {
            $scope.rids = rids;
        }, function (reason) {
            console.log('Error[updateVoiceList]:' + reason);
        });
    }

    function tryDeleteId (rid) {
        if (rid) {
            if(window.confirm('Do you want to remove ' + rid.registrationId + ' ?')) {
                removeId(rid.registrationId).then(function () {
                    updateIdList();
                }, function (reason) {
                    console.log('Error[tryDeleteVoice]:' + reason);
                });
            }
        }
    }

    function uploadRegistrationId () {
        var id = $scope.registrationId;

        if (id) {
            uploadId(id).then(function () {
                updateIdList();
            }, function () {
                console.log('Error[uploadRegistrationId]:' + reason);
            });
        }
    }



    function getVoiceList () {
        var deferred = $q.defer();
        var url = 'api/voice';

        $.ajax({
            dataType: 'json',
            url: url
        }).then(function (result) {
            deferred.resolve(result);
        }, function (reason) {
            console.log('Error[getVoiceList]:' + reason);
            deferred.reject(reason);
        });

        return deferred.promise;
    }


    function removeVoice(key) {
        var deferred = $q.defer();
        var url = 'api/voice/' + key;

        $.ajax({
            type: 'DELETE',
            url: url
        }).then(function (result) {
            deferred.resolve(result);
        }, function (reason) {
            console.log('Error[removeVoice]:' + reason);
            deferred.reject(reason);
        });

        return deferred.promise;
    }

    function getIdList () {
        var deferred = $q.defer();
        var url = 'api/register';

        $.ajax({
            dataType: 'json',
            url: url
        }).then(function (result) {
            deferred.resolve(result);
        }, function (reason) {
            console.log('Error[getIdList]:' + reason);
            deferred.reject(reason);
        });

        return deferred.promise;
    }


    function removeId(key) {
        var deferred = $q.defer();
        var url = 'api/register/' + key;

        $.ajax({
            type: 'DELETE',
            url: url
        }).then(function (result) {
            deferred.resolve(result);
        }, function (reason) {
            console.log('Error[removeId]:' + reason);
            deferred.reject(reason);
        });

        return deferred.promise;
    }

    function uploadId(key) {
        var deferred = $q.defer();
        var url = 'api/register';

        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: {registrationId: key}
        }).then(function (result) {
            deferred.resolve(result);
        }, function (reason) {
            console.log('Error[uploadId]:' + reason);
            deferred.reject(reason);
        });

        return deferred.promise;
    }


    function fireVoice (item) {
        var key = item.key;
        var url = 'api/gcm/voice/' + key;

        $.ajax({
            dataType: 'json',
            url: url
        }).then(function (result) {
            console.log('Succeed[fireVoice] code:' + result);
        }, function (reason) {
            console.log('Error[fireVoice]:' + reason);
        });
    }

    function fireTonTon (rid) {
        var url = 'api/gcm/tonton';
        var id = rid.registrationId;
        var name = 'Test';

        $.ajax({
            dataType: 'json',
            url: url + "?name=" + name + "&id=" + id
        }).then(function (result) {
            console.log('Succeed[fireTonTon] code:' + result);
        }, function (reason) {
            console.log('Error[fireTonTon]:' + reason);
        });
    }


    $scope.updateVoiceList = updateVoiceList;
    $scope.tryDeleteVoice = tryDeleteVoice;
    $scope.updateIdList = updateIdList;
    $scope.tryDeleteId = tryDeleteId;
    $scope.uploadRegistrationId = uploadRegistrationId;
    $scope.fireVoice = fireVoice;
    $scope.fireTonTon = fireTonTon;

    initialize();
}]);