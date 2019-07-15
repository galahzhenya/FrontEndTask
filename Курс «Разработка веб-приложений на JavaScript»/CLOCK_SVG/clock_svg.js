"use strict";
var HOUR_FORMAT = 12; // Часовой формат времени
var CLOCKDIAMETER = 200 // Диаметр часов 
var CLOCKR = Math.ceil((parseInt(CLOCKDIAMETER) / 2));  // Диаметр часов 
var CENTERDIVDIAMENT = 10; // Диаметр точки центра часов
var rayK =0.8; // Коэффициент, для расчетов мнимой окружности
var centerCircleR = 5 ; 
var HourDiameter = Math.ceil((parseInt(CLOCKDIAMETER) / 7)); // Диаметр окружностей для циферблатов
var HourR = Math.ceil((parseInt(HourDiameter) / 2)); // Радиус окружностей для циферблатов
// Координаты центра часов
var clockCentreX = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); 
var clockCentreY = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); 
var clockR = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); // Радиус часов 

var clock_div = document.getElementById("clock_dom");

// Создание основы для часов
var spaceURL = "http://www.w3.org/2000/svg";
var svg = document.createElementNS(spaceURL, "svg");
svg.style.width = CLOCKDIAMETER;
svg.style.height= CLOCKDIAMETER;
var clock_svg  = document.createElementNS(spaceURL, "circle");
clock_svg.style.r = clockR;
clock_svg.style.cx = clockCentreX;
clock_svg.style.cy = clockCentreY;
clock_svg.style.fill ="#ff9900";
svg.appendChild(clock_svg);

//Создание центра часов
var centerCircle = document.createElementNS(spaceURL,"circle");
centerCircle.style.r = centerCircleR;
centerCircle.style.cx = clockCentreX;
centerCircle.style.cy = clockCentreY;
centerCircle.style.fill ="#000000";
svg.appendChild(centerCircle);


var rad = (2*Math.PI)/HOUR_FORMAT;
var radN = 0;
var rayHourCircle = Math.ceil((CLOCKDIAMETER/2)*rayK); // Радиус мнимой окружности, на которой будут размещаться hourCircle
//Создание циферблата
for (var i = 1; i<=HOUR_FORMAT; i++){
    var hourCircle = document.createElementNS(spaceURL, "circle");
    hourCircle.style.fill ="#ffcc00";
    hourCircle.style.r = HourR; 
    radN=rad*i;
    var x = Math.ceil(rayHourCircle * Math.sin(radN));
    var y = Math.ceil(rayHourCircle * Math.cos(radN));
    //Переменные для центровки текста 
    var a = 8;
    if (i <10) {
        a = 4; 
    }
    var b = 4;
    //
    hourCircle.style.cx = (clockCentreX+x);
    hourCircle.style.cy =  (clockCentreY-y);
    var hour = document.createElementNS(spaceURL, "text");
    var hourText = document.createTextNode(i);
    hour.setAttribute("x",clockCentreX+x-a);
    hour.setAttribute("y",clockCentreY-y+b);
    hour.appendChild(hourText);
    svg.appendChild(hourCircle);
    svg.appendChild(hour);
}


var tail = 5 ; // На сколько будет выступать другая сторона стрелок из центра (px)
var transformOriginPX = CENTERDIVDIAMENT/2 +tail; // Для настройки точки поворота стрелок часов 
var hourHandWK = 0.4; // Коэффициент длинны часовой стрелки от радицса часов
var minuteHandWK = 0.6; // Коэффициент длинны минутной стрелки от радицса часов
var secondHandWK = 0.7; // Коэффициент длинны секундной стрелки от радицса часов

var hourHandHK = 0.05; // Коэффициент ширины часовой стрелки от радицса часов
var minuteHandHK = 0.04; // Коэффициент ширины минутной стрелки от радицса часов
var secondHandHK = 0.02; // Коэффициент ширины секундной стрелки от радицса часов


//Часовая стрелка
var hourHand = document.createElementNS(spaceURL, "line");
hourHand.setAttribute("x1",clockCentreX);
hourHand.setAttribute("x2",clockCentreX+CLOCKR*hourHandWK);
hourHand.setAttribute("y1",clockCentreY);
hourHand.setAttribute("y2",clockCentreY);
hourHand.setAttribute("stroke","black")
hourHand.setAttribute("stroke-width",CLOCKR*hourHandHK)
hourHand.setAttribute("rx","10");

//Минутная стрелка
var minuteHand = document.createElementNS(spaceURL, "line");
minuteHand.setAttribute("x1",clockCentreX);
minuteHand.setAttribute("x2",clockCentreX+CLOCKR*minuteHandWK);
minuteHand.setAttribute("y1",clockCentreY);
minuteHand.setAttribute("y2",clockCentreY);
minuteHand.setAttribute("stroke","black")
minuteHand.setAttribute("stroke-width",CLOCKR*minuteHandHK)

//Секундная стрелка
var secondHand = document.createElementNS(spaceURL, "line");
secondHand.setAttribute("x1",clockCentreX);
secondHand.setAttribute("x2",clockCentreX+CLOCKR*secondHandWK);
secondHand.setAttribute("y1",clockCentreY);
secondHand.setAttribute("y2",clockCentreY);
secondHand.setAttribute("stroke","black")
secondHand.setAttribute("stroke-width",CLOCKR*secondHandHK)

svg.appendChild(secondHand);
svg.appendChild(minuteHand);
svg.appendChild(hourHand);

clock_div.appendChild(svg);

function clockHandMove(second, minute, hour) {
    var secondHandDiv = document.getElementById("secondHand");
    var minuteHandDiv = document.getElementById("minuteHand");
    var hourHandDiv = document.getElementById("hourHand");
    //360 - градусов окружность, 60 - количество секунд ( на каждую секунду выделяется 6 градусов пространства)
    var secondRad = degToRad(second * (360/60))
    // На каждую минуту выделяется (360/60) = 6 градусов пространства для движения
    // Math.floor(second/10) - для более плавного движения минутно стрелки 
    var minuteRad = degToRad(minute * (360/60) + Math.floor(second/10));
    var hourRad = degToRad(hour * (360/HOUR_FORMAT) + Math.ceil(minute/2));
    
    var sX = Math.ceil(CLOCKR*secondHandWK * Math.sin(secondRad));
    var sY = Math.ceil(CLOCKR*secondHandWK * Math.cos(secondRad));
    secondHand.setAttribute("x2",clockCentreX+sX);
    secondHand.setAttribute("y2",clockCentreY-sY);

    var mX = Math.ceil(CLOCKR*minuteHandWK * Math.sin(minuteRad));
    var mY = Math.ceil(CLOCKR*minuteHandWK * Math.cos(minuteRad));
    minuteHand.setAttribute("x2",clockCentreX+mX);
    minuteHand.setAttribute("y2",clockCentreY-mY);

    var hX = Math.ceil(CLOCKR*hourHandWK * Math.sin(hourRad));
    var hY = Math.ceil(CLOCKR*hourHandWK * Math.cos(hourRad));
    hourHand.setAttribute("x2",clockCentreX+hX);
    hourHand.setAttribute("y2",clockCentreY-hY);
}


var currTime=new Date();
clockHandMove(currTime.getSeconds(),currTime.getUTCMinutes(), currTime.getHours());
var clock = document.createElementNS(spaceURL, "text");
clock.setAttribute("x",clockCentreX-29);
clock.setAttribute("y",clockCentreY-40);
clock.textContent=formatDateTime(currTime);
svg.appendChild(clock);
console.log(clock.style.width)
var getMillisecond = 1000-currTime.getMilliseconds();

setTimeout(updateTime,getMillisecond);

function updateTime() {
    var currTime=new Date();
    clock.textContent=formatDateTime(currTime);
    clockHandMove(currTime.getSeconds(),currTime.getUTCMinutes(), currTime.getHours());
    getMillisecond = 1000-currTime.getMilliseconds();
    setTimeout(updateTime,getMillisecond);
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
