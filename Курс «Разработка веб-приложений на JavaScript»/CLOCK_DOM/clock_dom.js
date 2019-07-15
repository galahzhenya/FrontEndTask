"use strict";
//!! Для удобства расчетов все переменные размеров хранят значения без "px"
var HOUR_FORMAT = 12; // Часовой формат времени
var CLOCKDIAMETER = 200 // Диаметр часов 
var CENTERDIVDIAMENT = 10; // Диаметр точки центра часов
var rayK =0.8; // Коэффициент, для расчетов мнимой окружности


//Создание основы часов
var clock_dom = document.getElementById("clock_dom");
clock_dom.style.background ="#ff9900";
clock_dom.style.width = CLOCKDIAMETER+"px"; 
clock_dom.style.height =CLOCKDIAMETER + "px";
clock_dom.style.position = "relative";
clock_dom.style.borderRadius = "50%"

// Координаты центра часов
var clockCentreX = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); 
var clockCentreY = Math.ceil((parseInt(CLOCKDIAMETER) / 2)); 

//Диаметр дивов для циферблата
var HourDiameter = Math.ceil((parseInt(CLOCKDIAMETER) / 7)); 

// Создание елемента центра часов
var centerDiv = document.createElement("div");
centerDiv.style.width = CENTERDIVDIAMENT+"px";
centerDiv.style.height = CENTERDIVDIAMENT+"px";
centerDiv.style.borderRadius = "50%";
centerDiv.style.background ="#000000";
centerDiv.style.position = "relative";
centerDiv.style.left = clockCentreX- (CENTERDIVDIAMENT/2) +"px";
centerDiv.style.top = clockCentreY -(CENTERDIVDIAMENT/2) +"px";
clock_dom.appendChild(centerDiv);


var rad = (2*Math.PI)/HOUR_FORMAT;
var radN = 0;
var rayHourDiv = Math.ceil((CLOCKDIAMETER/2)*rayK); // Радиус мнимой окружности, на которой будут размещаться hourDiv
//Создание циферблата
for (var i = 1; i<=HOUR_FORMAT; i++){
    var hourDiv = document.createElement("div");
    hourDiv.style.background ="#ffcc00";
    hourDiv.style.width = HourDiameter + "px"; 
    hourDiv.style.height = HourDiameter + "px";
    hourDiv.style.borderRadius = "50%";
    hourDiv.style.position ="absolute";//absolute
    var hourDivCenter = Math.ceil(HourDiameter/2);
    radN=rad*i;
    var x = Math.ceil(rayHourDiv * Math.sin(radN));
    var y = Math.ceil(rayHourDiv * Math.cos(radN));
    hourDiv.style.left = (x-hourDivCenter+CENTERDIVDIAMENT/2)+"px";
    hourDiv.style.top =  (-y-hourDivCenter+CENTERDIVDIAMENT/2)+"px";

    var hourText = document.createTextNode(i);
    // Выравниваем по центру цифры 
    hourDiv.style.textAlign = "center";
    hourDiv.style.lineHeight = HourDiameter+"px";
    hourDiv.appendChild(hourText);
    centerDiv.appendChild(hourDiv);
}

var tail = 5 ; // На сколько будет выступать другая сторона стрелок из центра (px)
var transformOriginPX = CENTERDIVDIAMENT/2 +tail; // Для настройки точки поворота стрелок часов 
var hourHandWK = 0.5; // Коэффициент длинны часовой стрелки от радицса часов
var minuteHandWK = 0.6; // Коэффициент длинны минутной стрелки от радицса часов
var secondHandWK = 0.7; // Коэффициент длинны секундной стрелки от радицса часов

var hourHandHK = 0.06; // Коэффициент ширины часовой стрелки от радицса часов
var minuteHandHK = 0.04; // Коэффициент ширины минутной стрелки от радицса часов
var secondHandHK = 0.02; // Коэффициент ширины секундной стрелки от радицса часов


//Часовая стрелка
var hourHandDiv = document.createElement("div");
hourHandDiv.style.width = (hourHandWK*(CLOCKDIAMETER/2))+"px";
hourHandDiv.style.height = (hourHandHK*(CLOCKDIAMETER/2))+"px";
hourHandDiv.id = "hourHand";
hourHandDiv.style.position ="absolute";
hourHandDiv.style.left = "-"+tail+"px";
hourHandDiv.style.top = ((CENTERDIVDIAMENT-(hourHandHK*(CLOCKDIAMETER/2)))/2)+"px";
hourHandDiv.style.background = "#000000";
hourHandDiv.style.borderRadius = "30%";
hourHandDiv.style.transformOrigin = transformOriginPX+"px center";

//Минутная стрелка
var minuteHandDiv = document.createElement("div");
minuteHandDiv.style.width = (minuteHandWK*(CLOCKDIAMETER/2))+"px";
minuteHandDiv.style.height = (minuteHandHK*(CLOCKDIAMETER/2))+"px";
minuteHandDiv.id = "minuteHand";
minuteHandDiv.style.position ="absolute";
minuteHandDiv.style.left = "-"+tail+"px";
minuteHandDiv.style.top = ((CENTERDIVDIAMENT-(minuteHandHK*(CLOCKDIAMETER/2)))/2)+"px";
minuteHandDiv.style.background = "#000000";
minuteHandDiv.style.borderRadius = "30%";
minuteHandDiv.style.transformOrigin = transformOriginPX+"px center";

//Секундная стрелка
var secondHandDiv = document.createElement("div");
secondHandDiv.style.width = (secondHandWK*(CLOCKDIAMETER/2))+"px";
secondHandDiv.style.height = (secondHandHK*(CLOCKDIAMETER/2))+"px";
secondHandDiv.id = "secondHand";
secondHandDiv.style.position ="absolute";
secondHandDiv.style.left = "-"+tail+"px";
secondHandDiv.style.top = ((CENTERDIVDIAMENT-(secondHandHK*(CLOCKDIAMETER/2)))/2)+"px";
secondHandDiv.style.background = "#000000";
secondHandDiv.style.borderRadius = "30%";
secondHandDiv.style.transformOrigin = transformOriginPX+"px center";


centerDiv.appendChild(hourHandDiv);
centerDiv.appendChild(minuteHandDiv);
centerDiv.appendChild(secondHandDiv);

//Электронная панель
var clockSpanW = 55; // Размеры панели
var clockSpanH = 20;

var clockSpan = document.createElement("span");
clockSpan.style.position = "absolute";
console.log(clockSpan.style.width)
clockSpan.style.width =clockCentreX+"px";
clockSpan.style.height =clockCentreY+"px";
clockSpan.style.left =Math.ceil(((CLOCKDIAMETER-clockSpanW)/2))+"px"; 
clockSpan.style.top =((CLOCKDIAMETER-clockSpanH)/4)+"px";
clockSpan.style.fontSize = "100";
clockSpan.id = "clockSpan";
clock_dom.appendChild(clockSpan);
//Заполнение вне  таймера ( что бы не было секундной задержки появления времени)
var currTime=new Date();
var currTimeStr=formatDateTime(currTime);
document.getElementById("clockSpan").textContent = currTimeStr;
clockHandMove(currTime.getSeconds(),currTime.getUTCMinutes(), currTime.getHours());

var getMillisecond = 1000-currTime.getMilliseconds();


setTimeout(updateTime,getMillisecond);

function updateTime() {
    var currTime=new Date();
    var currTimeStr=formatDateTime(currTime);
    document.getElementById("clockSpan").textContent = currTimeStr;
    clockHandMove(currTime.getSeconds(),currTime.getUTCMinutes(), currTime.getHours());
    getMillisecond = 1000-currTime.getMilliseconds();
    setTimeout(updateTime,getMillisecond);
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

function clockHandMove(second, minute, hour) {
    var secondHandDiv = document.getElementById("secondHand");
    var minuteHandDiv = document.getElementById("minuteHand");
    var hourHandDiv = document.getElementById("hourHand");
    var Ydeg = 90; // 90 - граду прямого угла, для удобства поворота стрелок относительно угла счетая по вертикальной прямой 
    //360 - градусов окружность, 60 - количество секунд ( на каждую секунду выделяется 6 градусов пространства)
    var secondDeg = -Ydeg+second * (360/60);
    // На каждую минуту выделяется (360/60) = 6 градусов пространства для движения
    // Math.floor(second/10) - для более плавного движения минутно стрелки 
    var minuteDeg = -Ydeg+minute * (360/60) + Math.floor(second/10);

    // 
    var hourDeg = -Ydeg+hour * (360/HOUR_FORMAT) + Math.ceil(minute/2);
    
    console.log(second)
    secondHandDiv.style.transform = "rotate("+secondDeg+"deg)";
    minuteHandDiv.style.transform = "rotate("+minuteDeg+"deg)";
    hourHandDiv.style.transform = "rotate("+hourDeg+"deg)";
}
