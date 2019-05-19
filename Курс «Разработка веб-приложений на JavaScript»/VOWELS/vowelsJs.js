"use strict";

(function() {
do{
    
    var str = prompt("Введите строку");
    
} while(!str);

function SearchVowelsRUS(str)
{
    var count =0;
    var listOfVawelsRus = {а:true, о:true, у:true, ы:true, э:true, я:true, е:true, ё:true, ю:true, и:true};
    console.log(listOfVawelsRus);
    for (var  i=0; i<str.length; i++)
    {

        var key = str.charAt(i).toLowerCase();
        if (key in listOfVawelsRus )
        {
            count++;
        }
    }

    return count;
}

alert("Количество гласных букв в вашей троке = "+SearchVowelsRUS(str));
})( );  
