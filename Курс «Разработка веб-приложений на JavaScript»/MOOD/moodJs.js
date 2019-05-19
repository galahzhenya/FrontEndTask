"use strict";

(function() {

    function randomDiap(n,m) {
            return Math.floor(Math.random()*(m-n+1))+n;
    }

    function mood(colorsCount) {
        var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
        var colorsH={}; //Хранит список выпавших цветов 

        console.log( 'цветов: ' + colorsCount );
        for ( var i=1; i<=colorsCount; i++ ) {
            
            //генерируем до тех пор, пока не попадется цвет, который до этого не выпадал 
            do{
            var n=randomDiap(1,7);
            if(!(colors[n] in colorsH))
            {
                var colorName=colors[n];
                colorsH[colors[n]]=true;
                console.log( colorName );   
                break;
            }
            }while(true);

        }
    }

    mood(3);

})( );  
