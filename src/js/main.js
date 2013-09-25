'use strict';

// A helper function so that when we change tab the web view scrolls to the top of the new page
// var scrollTop = function () {
//     setTimeout(function () {
//         document.body.scrollTop = 0;
//     }, 0);
// }

// Setup the select box styling
// $(function() {
//     $("select").selecter({
//         callback: selectCallback
//     });
// });

function LbmCtrl($scope) {

    // Grab persisted user object
    forge.prefs.get("user", function (user) {
        // Updating Angular model, $apply makes sure the view is updated too.
        if (user) {
            $scope.user = user;
        } else {
            $scope.user = {weight:'', bodyFat:'', lbm:''};
        }
        // $scope.$apply(function () {
        // });
    });

    $scope.lbmResultClass = 'hidden';

    $scope.weightUnit = {
        "type": "select",
        "name": "Unit",
        "value": "Pounds",
        "values": [ "Pounds", "Kilograms"]
    };

    $scope.calculateLbm = function() {
        var userBodyFat = (parseInt($scope.userBodyFat, 10) - 100) / 100,
            userWeight = parseInt($scope.userWeight, 10).toFixed(2),
            lbm = (Math.abs(userBodyFat) * userWeight).toFixed(2);

        if (lbm > 0) {
            $scope.user = {weight:$scope.userWeight, bodyFat:$scope.userBodyFat, lbm:lbm};

            forge.prefs.set("user", $scope.user);

            $scope.lbmResultClass = '';
        } else {
            $scope.lbmResultClass = 'hidden';
        }
    };

    // Setup the select box styling
    $(function() {
        $("select").selecter({
            callback: selectCallback
        });
    });

    var selectCallback = function(index, value) {
        $scope.$apply(function () {
            $scope.weightUnit.value = $scope.weightUnit.values[value];
        });
    };
}
