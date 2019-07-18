"use strict";
//!! Для удобства расчетов все переменные размеров хранят значения без "px"
var HOUR_FORMAT = 12; // Часовой формат времени
var CLOCKDIAMETER = 200 // Диаметр часов 
var CENTERDIVDIAMENT = 10; // Диаметр точки центра часов
var CLOCKR = Math.ceil((parseInt(CLOCKDIAMETER) / 2));  // Диаметр часов 
var rayK =0.8; // Коэффициент, для расчетов мнимой окружности
var centerCircleR = 5 ; 
var fontSize = 14; // размер шрифта цифр 
var HourDiameter = Math.ceil((parseInt(CLOCKDIAMETER) / 7)); // Диаметр окружностей для циферблатов
var HourR = Math.ceil((parseInt(HourDiameter) / 2)); // Радиус окружностей для циферблатов
// Координаты центра часов
var clockCentreX = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); 
var clockCentreY = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); 
var clockR = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); // Радиус часов 


var tail = 5 ; // На сколько будет выступать другая сторона стрелок из центра (px)
var transformOriginPX = CENTERDIVDIAMENT/2 +tail; // Для настройки точки поворота стрелок часов 
var hourHandWK = 0.4; // Коэффициент длинны часовой стрелки от радицса часов
var minuteHandWK = 0.6; // Коэффициент длинны минутной стрелки от радицса часов
var secondHandWK = 0.7; // Коэффициент длинны секундной стрелки от радицса часов

var hourHandHK = 0.05; // Коэффициент ширины часовой стрелки от радицса часов
var minuteHandHK = 0.04; // Коэффициент ширины минутной стрелки от радицса часов
var secondHandHK = 0.02; // Коэффициент ширины секундной стрелки от радицса часов



//Устанвавливае размеры области canvas
var clock_canvas=document.getElementById("clock_canvas");
clock_canvas.Id="test";
clock_canvas.width = CLOCKDIAMETER;
clock_canvas.height = CLOCKDIAMETER;
var ctx=clock_canvas.getContext("2d");

paintClock(); 

function paintClock(){
    //Рисуем основу часов 
    ctx.beginPath();
    ctx.arc(clockCentreX,clockCentreY,clockR,0,2*Math.PI);
    ctx.fillStyle ="#ff9900";
    ctx.fill();
    // Рисуем центр часов
    ctx.beginPath();
    ctx.arc(clockCentreX,clockCentreY,centerCircleR,0,2*Math.PI);
    ctx.fillStyle ="#000000";
    ctx.fill();

    var rad = (2*Math.PI)/HOUR_FORMAT;
    var radN = 0;
    var rayHourCircle = Math.ceil((CLOCKDIAMETER/2)*rayK); // Радиус мнимой окружности, на которой будут размещаться hourCircle
    //Создание циферблата
    for (var i = 1; i<=HOUR_FORMAT; i++){
        ctx.beginPath();
        radN=rad*i;
        var x = Math.ceil(rayHourCircle * Math.sin(radN));
        var y = Math.ceil(rayHourCircle * Math.cos(radN));
        //
        ctx.arc(clockCentreX+x,clockCentreY-y,HourR,0,2*Math.PI);
        ctx.fillStyle ="#ffcc00";
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.font =fontSize+"px Times New Roman";
        var a = 4;
        if (i>9){
            a =8;
        }
        var b = 3;
        ctx.fillText(i,clockCentreX+x-a,clockCentreY-y+b)
    }

    var currTime=new Date();
    //Рисуем "электронный циферблат"
    ctx.fillStyle ="#000000";
    ctx.font =fontSize+"px Times New Roman";
    ctx.fillText(formatDateTime(currTime),clockCentreX-25,clockCentreY-40)
    clockHandMove(currTime.getSeconds(),currTime.getUTCMinutes(), currTime.getHours(),ctx);
    var getMillisecond = 1000-currTime.getMilliseconds();
    setTimeout(paintClock,getMillisecond);
}



//Функция прорисовки стрелок
function clockHandMove(second, minute, hour,) {
    //360 - градусов окружность, 60 - количество секунд ( на каждую секунду выделяется 6 градусов пространства)
    var secondRad = degToRad(second * (360/60))
    // На каждую минуту выделяется (360/60) = 6 градусов пространства для движения
    // Math.floor(second/10) - для более плавного движения минутно стрелки 
    var minuteRad = degToRad(minute * (360/60) + Math.floor(second/10));
    var hourRad = degToRad(hour * (360/HOUR_FORMAT) + Math.ceil(minute/2));
    
    var sX = Math.ceil(CLOCKR*secondHandWK * Math.sin(secondRad));
    var sY = Math.ceil(CLOCKR*secondHandWK * Math.cos(secondRad));
    //Секундная стрелка
    ctx.beginPath();
    ctx.moveTo(clockCentreX, clockCentreY);
    ctx.lineWidth = CLOCKR*secondHandHK;
    ctx.lineTo(clockCentreX+sX, clockCentreY-sY);
    ctx.stroke();

    var mX = Math.ceil(CLOCKR*minuteHandWK * Math.sin(minuteRad));
    var mY = Math.ceil(CLOCKR*minuteHandWK * Math.cos(minuteRad));
    //Минутная стрелка
    ctx.beginPath();
    ctx.moveTo(clockCentreX, clockCentreY);
    ctx.lineWidth = CLOCKR*minuteHandHK;
    ctx.lineTo(clockCentreX+mX, clockCentreY-mY);
    ctx.stroke();

    var hX = Math.ceil(CLOCKR*hourHandWK * Math.sin(hourRad));
    var hY = Math.ceil(CLOCKR*hourHandWK * Math.cos(hourRad));
    //Часовая стрелка
    ctx.beginPath();
    ctx.moveTo(clockCentreX, clockCentreY);
    ctx.lineWidth = CLOCKR*hourHandHK;
    ctx.lineTo(clockCentreX+hX, clockCentreY-hY);
    ctx.stroke();
}

function degToRad (deg)
{
	return (Math.PI * deg) / 180;
}

// форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
function formatDateTime(dt) {
    var hours=dt.getHours();
    var minutes=dt.getMinutes();
    var seconds=dt.getSeconds();
    return str0l(hours,2) + ':' + str0l(minutes,2) + ':' + str0l(seconds,2);
}

// дополняет строку val слева нулями до длины Len
function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}