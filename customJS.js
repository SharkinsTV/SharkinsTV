const itemListURL = "https://raw.githubusercontent.com/SharkinsTV/SharkinsTV/main/StoreItems.json";
const eventListURL = "https://raw.githubusercontent.com/SharkinsTV/SharkinsTV/main/StoreIncidents.json";
const shopExtURL = "https://raw.githubusercontent.com/SharkinsTV/SharkinsTV/main/ShopExt.json";

let itemList = null;
$.getJSON(itemListURL, function(data) {
    var options = {
        valueNames: ['abr', 'price', 'category'],
        item: '<tr><td class="abr" scope="row"></td><td class="price"></td><td class="category"></td></tr>'
    };

    var itemData = [];
    $.each(data.items, function(index, value) {
        if (value["price"] > 0) {
            itemData.push(value);
        }
    });

    itemList = new List('items', options, itemData);
});

let eventList = null;
$.getJSON(eventListURL, function(data) {
    var options = {
        valueNames: ['abr', 'price', 'karmatype'],
        item: '<tr><td class="abr" scope="row"></td><td class="price"></td><td class="karmatype"></td></tr>'
    };

    var eventData = [];
    $.each(data.incitems, function(index, value) {

        //evblacklist//
        var evBlacklist = ['trait', 'removetrait', 'pawn', 'replacetrait', 'backpack'];
        if (evBlacklist.indexOf(value["abr"]) != -1){
            return;
        } 

        if (value["price"] > 0) {
            eventData.push(value);
        }
    });

    eventList = new List('events', options, eventData);
});

let traitList = null;
let raceList = null;
$.getJSON(shopExtURL, function(data) {  
    //TraitList  
    var options = {
        valueNames: ['name', 'addPrice', 'removePrice'],
        item: '<tr><td class="name" scope="row"></td><td class="addPrice"></td><td class="removePrice"></td></tr>'
    };
    var traitData = [];
    $.each(data.traits, function(index, value) {
        var traitBlacklist = ['robot'];
        if (traitBlacklist.indexOf(value["name"]) != -1){
            return;
        } 

        if (value["addPrice"] > 0) {
            traitData.push(value);
        }
    });

    traitList = new List('traits', options, traitData);

    //RaceList
    options = {
        valueNames: ['name', 'price'],
        item: '<tr><td class="name" scope="row"></td><td class="price"></td>'
    };

    var racesData = [];
    $.each(data.races, function(index, value) {
        if (value["price"] > 0) {
            //console.log(value["name"] + " check for existing: " + racesData.indexOf(value["name"]));
            racesData.push(value);
            //console.log(value);
        }
    });

    //console.log(racesData);

    racesList = new List('races', options, racesData);
});

var tabs = angular.module('tabs', [])
    .controller('tabCtrl', function($scope) {
        $scope.selected = "1";
    });
