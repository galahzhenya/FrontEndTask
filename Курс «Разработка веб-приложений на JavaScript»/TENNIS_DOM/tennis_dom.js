//Параметры теннисного поля
var  fieldH = {
    width : 600,
    height : 400,
    background : "#ff9900",
    position: "relative"

}

//Параметры мячика 
var ballH = {
    diameter: 30,
    borderRadius: "50%",
    background: "#000000",
    position: "absolute",
    speedX : 4 * Math.pow(-1,getRandomInt(1,3)),
    speedY : getRandomInt(1,6) * Math.pow(-1,getRandomInt(1,3)),
    posX : (fieldH.width/2) - 15,
    posY : (fieldH.height/2) -15
}

var racketH1 = {
    width : 20,
    height : 100,
    background : "#0000ff",
    speedY : 5,
    position: "absolute",
    speedY : 0,
    posY : (fieldH.height-100)/2
}

var racketH2 = {
    width : 20,
    height : 100,
    background : "#ff0000",
    speedY : 5,
    position: "absolute",
    speedY : 0,
    posY : (fieldH.height-100)/2
}

// Рисуем теннисное поле
var  field = document.getElementById("tennis_dom");
field.style.width = fieldH.width+"px";
field.style.height = fieldH.height+"px";
field.style.background = fieldH.background;
field.style.position = fieldH.position;

//Рисуем мяч
var ball = document.createElement("div");
ball.id ="ball";
ball.style.width = ballH.diameter+"px";
ball.style.height = ballH.diameter+"px";
ball.style.borderRadius = ballH.borderRadius;
ball.style.background = ballH.background;
ball.style.position = ballH.position;
ball.style.left = ballH.posX+"px";
ball.style.top =ballH.posY+"px";
field.appendChild(ball);

//Рисуем первую ракетку
var racket1 = document.createElement("div");
racket1.id = "racket1";
racket1.style.width = racketH1.width + "px";
racket1.style.height = racketH1.height + "px";
racket1.style.background = racketH1.background;
racket1.style.position = racketH1.position;
racket1.style.top = racketH1.posY+"px";
racket1.style.left = "0px";
field.appendChild(racket1);

//Рисуем вторую ракетку
var racket2 = document.createElement("div");
racket2.id = "racket2";
racket2.style.width = racketH2.width + "px";
racket2.style.height = racketH2.height + "px";
racket2.style.background = racketH2.background;
racket2.style.position = racketH2.position;
racket2.style.top = racketH2.posY+"px";
racket2.style.left = (fieldH.width - racketH2.width)+"px";
field.appendChild(racket2);

//счет игроков
var count1 = 0;
var count2 = 0;
var score = document.getElementById("score");
score.style.textAlign = "center";
score.style.fontSize ="30px";
score.parentElement.style.width = fieldH.width+"px";
var timerId = null;
var fieldDiv = document.getElementById("tennis_dom");

addEventListener("keydown", racket1Move);
addEventListener("keyup", racket1Stop);

function racket1Move (e){
    switch (e.keyCode){
        case 16: //Shift 
            racketH1.speedY = -4;
            break;
        case 17: //Ctrl 
            racketH1.speedY = 4;
            break;
        case 38: //стрелка вверх
            racketH2.speedY = -4;
            break;
        case 40: //стрелка вниз
            racketH2.speedY = 4;
            break;
    }
}

function racket1Stop (e){
    switch (e.keyCode){
        case 16: //Shift 
            racketH1.speedY = 0;
            break;
        case 17: //Ctrl 
            racketH1.speedY = 0;
            break;
        case 38: //стрелка вверх
            racketH2.speedY = 0;
            break;
        case 40: //стрелка вниз
            racketH2.speedY = 0;
            break;
    }
}

function start() {
    clearInterval(timerId);
    ballH.speedX = 4 * Math.pow(-1,getRandomInt(1,3));
    ballH.speedY = getRandomInt(1,6) * Math.pow(-1,getRandomInt(1,3));
    ballH.posX = (fieldH.width/2) - 15;
    ballH.posY = (fieldH.height/2) -1;
    console.log("1");
    racketH1.posY = (fieldH.height - racketH1.height)/2;
    racketH2.posY = (fieldH.height - racketH2.height)/2;
    timerId = setInterval(tick,1000/60);

}

function tick() {
    ballH.posX += ballH.speedX;
    ballH.posY += ballH.speedY;
    racketH1.posY += racketH1.speedY;
    racketH2.posY += racketH2.speedY;
    // вылетел ли мяч правее стены?
    if ( ballH.posX+ballH.diameter> fieldH.width ) {
        ballH.speedX=0;
        ballH.speedY=0;
        ballH.posX = fieldH.width -ballH.diameter;
        count1++;
        clearInterval(timerId);
    }
    // вылетел ли мяч левее стены?
    if ( ballH.posX<0 ) { 
        ballH.speedX= 0;
        ballH.speedY=0;
        ballH.posX=0;
        count2++;
        clearInterval(timerId);
    }
    
    // вылетел ли мяч ниже пола?
    if ( ballH.posY+ballH.diameter>fieldH.height ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=fieldH.height-ballH.diameter;
    }
    // вылетел ли мяч выше потолка?
    if ( ballH.posY<0 ) {
        ballH.speedY=-ballH.speedY;
        ballH.posY=0;

    }

    // Настройка поведения ракеток
    //Первая ракетка
    if ( racketH1.posY + racketH1.height > fieldH.height ) {
        racketH1.posY = fieldH.height - racketH1.height;
        racketH1.speedY = 0;

    }
    if ( racketH1.posY<0 ) { 
        racketH1.posY = 0;
        racketH1.speedY = 0;
    }
    // Настройка второй ракетки
    if ( racketH2.posY + racketH2.height > fieldH.height ) {
        racketH2.posY = fieldH.height - racketH2.height;
        racketH2.speedY = 0;

    }
    if ( racketH2.posY<0 ) {
        racketH2.posY = 0;
        racketH2.speedY = 0;
    }

    //Настройка отскока от ракетки 
    //Первая ракетка
    if ( ballH.posX<racketH1.width && ( ballH.posY+(ballH.diameter/2)> racketH1.posY && ballH.posY+(ballH.diameter/2)< racketH1.posY+racketH1.height )) { 
        ballH.speedX=-ballH.speedX;
        ballH.posX=racketH1.width;
        
    }
    //Вторая ракетка
    if ( ballH.posX+ballH.diameter>fieldH.width-racketH2.width && ( ballH.posY+(ballH.diameter/2)> racketH2.posY && ballH.posY+(ballH.diameter/2)< racketH2.posY+racketH2.height )) { 
        ballH.speedX=-ballH.speedX;
        ballH.posX=fieldH.width-racketH2.width-ballH.diameter;
    }

    ball.style.left = ballH.posX+ "px";
    ball.style.top =  ballH.posY +"px";
    racket1.style.top = racketH1.posY +"px";
    racket2.style.top = racketH2.posY +"px";
    score.textContent = count1 +":"+count2;
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}