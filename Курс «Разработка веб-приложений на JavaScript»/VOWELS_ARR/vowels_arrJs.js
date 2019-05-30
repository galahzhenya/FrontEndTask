"use strict";

(function() {
do{

    var str = prompt("Введите строку").toLowerCase();

} while(!str);

var listOfVawelsRus = {а:true, о:true, у:true, ы:true, э:true, я:true, е:true, ё:true, ю:true, и:true};

function SearchVowelsRUSForEach(str,listOfVawelsRus)
{
    var count =0;
    var strArray = str.split('');
    function d (v,i,a)
    {
        if (v in listOfVawelsRus)
        { 
        return count++; 
        }
    }
    strArray.forEach(d);
    return count;
}

function SearchVowelsRUSfilter(str,listOfVawelsRus)
{
    var strArray=str.split('');
    return strArray.filter((v,i,a)=>v in listOfVawelsRus).length;
}

var countUsedReduse = str.split('').reduce(function(count, elem) 
    {
        return (elem in listOfVawelsRus)?++count:count;
    },0);


alert("Количество гласных букв в вашей строке (forEach) = "+SearchVowelsRUSForEach(str,listOfVawelsRus));
alert("Количество гласных букв в вашей строке (filter) = "+SearchVowelsRUSfilter(str,listOfVawelsRus));
alert("Количество гласных букв в вашей строке (reduse) = "+countUsedReduse);
})( );  
