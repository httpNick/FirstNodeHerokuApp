angular.module('httpCSGOStash', ['ui.router', 'angular.filter', 'ui.bootstrap.modal', 'chart.js']);

angular.module('httpCSGOStash').factory('prices', ['$http', function($http) {

    var o = {
      prices : [
        {
          weapon: 'AWP',
          cached: false,
          skins: ['Asiimov', 'Redline', 'BOOM', 'Hyper Beast', 'Man-o\'-war'],
          skinData: {}
        },{
          weapon: 'AK-47',
          cached: false,
          skins: ['Vulcan', 'Jaguar', 'Aquamarine Revenge', 'Wasteland Rebel', 'Redline'],
          skinData: {}
        },{
          weapon: 'M4A1-S',
          cached: false,
          skins: ['Hyper Beast', 'Guardian', 'Nitro', 'Atomic Alloy', 'Cyrex'],
          skinData: {}
        }
      ]
    }
    var z = {
        prices : [{weapon: "AWP",
                    cached:  false,
                        names:
                            [{name: "Asiimov",
                                wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Redline",
                                wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "BOOM",
                               wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Hyper Beast",
                               wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Man-o'-war",
                               wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }}]},
                        {weapon: "AK-47",
                        cached: false,
                        names:
                            [{name: "Jaguar",
                               wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Redline",
                                wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Vulcan",
                            wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Wasteland Rebel",
                               wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Aquamarine Revenge",
                                 wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }}]},
                        {weapon: "M4A1-S",
                        cached: false,
                        names:
                            [{name: "Guardian",
                              wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Nitro",
                                wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Atomic Alloy",
                                wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Hyper Beast",
                              wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }},
                            {name: "Cyrex",
                                wears: {
                                FieldTested : "",
                                WellWorn : "",
                                FactoryNew : "",
                                BattleScarred :"",
                                MinimalWear : ""
                                }}]}]
    };
    return o;
}]);

angular.module('httpCSGOStash').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
            /* Updates all prices for weapons/skins before page loads if uncommented. */
            /*resolve: {
                pricePromise : ['prices', function(prices) {
                    return prices.getPrices();
                }]
            }*/
        });

        $stateProvider
        .state('wep', {
            url: '/wep/{wep} | {skin}',
            templateUrl: '/wep.html',
            controller: 'SkinCtrl',
            resolve: {
                skin : ['$stateParams', 'prices',
                function($stateParams, prices) {
                    var i = prices.prices.length;
                    while (i--)
                      if (prices.prices[i].weapon === $stateParams.wep)
                        return prices.prices[i].skinData[$stateParams.skin];
                }],
                wep: ['$stateParams',
                    function($stateParams) {
                        return {
                            wep: $stateParams.wep,
                            skin: $stateParams.skin
                        };
                }]
            }
        });

        $stateProvider
        .state('nothing', {
            url: '/nothing',
            templateUrl: '/nothing.html',
            controller: 'NothingCtrl'
        });

        $stateProvider
        .state('search', {
          url: '/search',
          templateUrl: '/search.html'
        });

        $urlRouterProvider.otherwise('home');
    }]);
