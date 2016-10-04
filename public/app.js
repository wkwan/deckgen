var jetbrains = angular.module('jetbrains', []);

jetbrains.controller('AppCtrl', function ($scope, $http) {
    var app  = this;
    // var url = 'http://localhost:5000';
    var url = 'http://sheltered-tor-55228.herokuapp.com/'
    //
    // app.saveProduct = function (newProduct) {
    //     $http.post(url + '/add', {name:newProduct}).success(function() {
    //         console.log('added product ' + newProduct);
    //         loadProducts();
    //     });
    // }
    //
    // function loadProducts() {
    //     $http.get(url).success(function (products) {
    //         console.log('got products');
    //         app.products = products;
    //     });
    // }
    //
    // loadProducts();










    $scope.inputDeck = {};
    $scope.outputDeck = {};

    $scope.cardsByClass = {
        'Warrior': [],
        'Shaman': [],
        'Rogue': [],
        'Hunter': [],
        'Druid': [],
        'Warlock': [],
        'Mage': [],
        'Priest': []
    };

    $scope.neutralCards = [];

    $scope.selectedClass = 'Warrior';
    $scope.inputDeckClass = 'Warrior';

    $scope.selectedCard = null;

    $scope.changeClass = function () {
        if ($scope.cardsByClass[$scope.selectedClass].length == 0) {
            getClassCards();
        }

        if ($scope.neutralCards.length == 0) {
            getNeutralCards();
        }

        for (var card in $scope.inputDeck) {
            if ($scope.neutralCards.indexOf(card) < 0) {
                delete $scope.inputDeck[card];
            }
        }
    }

    function cardCount() {
        var cardCount = 0;
        for (var card in $scope.inputDeck) {
            cardCount += $scope.inputDeck[card];
        }
        return cardCount;
    }


    $scope.addCard = function () {
        if ($scope.selectedCard == null) return;
        if ($scope.selectedCard in $scope.inputDeck) {
            if ($scope.inputDeck[$scope.selectedCard] == 1) {
                if (cardCount() < 30) $scope.inputDeck[$scope.selectedCard] = 2;
            }
        } else {
            if (cardCount() < 30) $scope.inputDeck[$scope.selectedCard] = 1;
        }
    }

    $scope.removeCard = function (card) {
        if ($scope.inputDeck[card] == 2) {
            $scope.inputDeck[card] = 1;
        } else {
            delete $scope.inputDeck[card];
        }
    }

    $scope.generateDeck = function () {
        console.log("generate deck");
        // Make request and set the response to outputDeck

        $http.post(url + '/generate', $scope.inputDeck).success(function(generatedDeck) {
            console.log('generate deck success');
            $scope.outputDeck = generatedDeck;
        });
    }


    getClassCards();
    getNeutralCards();

    function getClassCards() {
        $http({
            method: 'GET',
            url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/' + $scope.selectedClass + '?collectible=1',
            headers: {
                'X-Mashape-Key': 'NXohkzLH9CmshmkxPUTtI3d3k9ZNp1HIGwxjsnfBKub61oQpDR'
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if (response.status == 200) {
                for (var i = 0; i < response.data.length; i++) {
                    var card = response.data[i];
                    if (card.type == "Minion" || card.type == "Spell" || card.type == "Weapon" && card.collectible) {
                        $scope.cardsByClass[$scope.selectedClass].push(card.name);
                    }

                }

            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    function getNeutralCards() {
        $http({
            method: 'GET',
            url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/Neutral?collectible=1',
            headers: {
                'X-Mashape-Key': 'NXohkzLH9CmshmkxPUTtI3d3k9ZNp1HIGwxjsnfBKub61oQpDR'
            }
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            if (response.status == 200) {
                for (var i = 0; i < response.data.length; i++) {
                    var card = response.data[i];
                    if (card.type == "Minion" || card.type == "Spell" || card.type == "Weapon" && card.collectible) {
                        $scope.neutralCards.push(card.name);
                    }

                }

            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }
})
