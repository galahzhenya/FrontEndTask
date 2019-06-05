"use strict";

function HashStorage ()
{
    var self = this;
    this.hashStorage ={};

    this.addValue = function(key,value){
        self.hashStorage[key]=value;
    }

    this.getValue = function(key){
        return self.hashStorage[key];
    }

    this.deleteValue = function(key){
        if (key in self.hashStorage){
            delete self.hashStorage[key];
            return true;
        }
        else {
            return false;
        }
    }

    this.getKeys = function(){
        return Object.keys(self.hashStorage);
    }

}

var drinkStorage = new HashStorage();   

function addValueInObj(hashStorage) {
    var infoHash = {}

    do{
    var name = null;
    name = prompt("Укажите название напитка");
    }while (!name); 

    do{
    var typeValue = null;
    typeValue = prompt("Напиток алкогольный ? ");
    }while (!typeValue); 

    do{
    var recipeValue = null;
    recipeValue = prompt("Укажите рецепт приготовления");
    }while (!recipeValue); 

    infoHash.type=typeValue;
    infoHash.recipe=recipeValue;

    hashStorage.addValue(name,infoHash);
}

function getValueInObj(hashStorage){
    do{
    var key = null;
    key = prompt("Укажите название напитка");
    }while (!key); 

    var info = hashStorage.getValue(key);

    if (info){
        alert("напиток: "+key+"\nалкогольный: " +info.type+ " \nрецепт приготовления: \n "+info.recipe);
    }
    else{
        alert("Такой напиток отсутствует");
    }
}

function deleteValueInObj(hashStorage){
    do{
    var key = null;
    key = prompt("Укажите название напитка");
    }while (!key); 

    var info = hashStorage.deleteValue(key);

    if (info){
        alert("напиток: "+key+" был удален");
    }
    else{
        alert("Такой напиток отсутствует");
    }
}

function getAllKeysInObj(hashStorage){
    var arrayStorage = hashStorage.getKeys();
    var keysString ="";
    for (var i=0; i < arrayStorage.length; i++ ){
        keysString+=""+arrayStorage[i]+"\n";
    }
    alert(keysString);
}