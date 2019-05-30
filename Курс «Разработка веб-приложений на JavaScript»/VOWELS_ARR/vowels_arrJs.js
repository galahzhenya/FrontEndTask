"use strict";

(function() {
do{

    var str = prompt("Введите строку").toLowerCase();

} while(!str);


function SearchVowelsRUSForEach(str)
{
    var count =0;
    var strArray = str.split('');
    var listOfVawelsRus = {а:true, о:true, у:true, ы:true, э:true, я:true, е:true, ё:true, ю:true, и:true};

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

function SearchVowelsRUSfilter(str)
{
    var listOfVawelsRus = {а:true, о:true, у:true, ы:true, э:true, я:true, е:true, ё:true, ю:true, и:true};
    var strArray=str.split('');
    return strArray.filter((v,i,a)=>v in listOfVawelsRus).length;
}

function SearchVowelsRUSreduce(str)
{
    var listOfVawelsRus = {а:true, о:true, у:true, ы:true, э:true, я:true, е:true, ё:true, ю:true, и:true};
    var countUsedReduse = str.split('').reduce(function(count, elem) 
        {
            return (elem in listOfVawelsRus)?++count:count;
        },0);
    return countUsedReduse;
}

alert("Количество гласных букв в вашей строке (forEach) = "+SearchVowelsRUSForEach(str));
alert("Количество гласных букв в вашей строке (filter) = "+SearchVowelsRUSfilter(str));
alert("Количество гласных букв в вашей строке (reduse) = "+SearchVowelsRUSfilter(str));
})( );  
