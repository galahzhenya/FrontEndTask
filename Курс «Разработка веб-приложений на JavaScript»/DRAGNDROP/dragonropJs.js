"use strict";

var draggedBall=null;
var div1 = document.getElementById("div1");

var imgList = div1.getElementsByTagName("img");
var LTHesh = {};
for (var i = 0; i < imgList.length; i++) {
  var LTArray =[];
  LTArray[0]= imgList[i].offsetLeft;
  LTArray[1]= imgList[i].offsetTop;
  LTHesh[i]=LTArray;
}
for (var i = 0; i < imgList.length; i++) {
  imgList[i].style.position ="absolute";
  var LTArray = LTHesh[i];
  imgList[i].style.left=LTArray[0]+"px";
  imgList[i].style.top=LTArray[1]+"px";
  imgList[i].style.cursor="pointer"; 
  imgList[i].addEventListener("mousedown",mousedown,false);
  imgList[i].addEventListener("mouseup",mouseup,false);
}

var zInd=0;
var x;
var y;
function mousedown(EO){
  EO=EO||window.event;
  x=EO.pageX-EO.target.offsetLeft;
  y=EO.pageY-EO.target.offsetTop;
  zInd++;
  EO.target.style.zIndex=zInd;
  EO.target.addEventListener("mousemove",mousemove,false);
  document.body.style.cursor="pointer";

}
function mousemove(EO) {
  console.log(document.body.style.cursor)
  document.body.style.cursor="pointer";
  EO=EO||window.event;
  EO.preventDefault();
  //Границы по горизонтали
  if (EO.pageX-x+EO.target.offsetWidth > parseInt(div1.style.width)){
    EO.target.style.left = (parseInt(div1.style.width)-EO.target.offsetWidth)+"px";
  } else if (EO.pageX-x < 0){
    EO.target.style.left="0px"
  }
  else{
  EO.target.style.left=(EO.pageX-x)+"px";
  }

  if (EO.pageY-y+EO.target.offsetHeight > parseInt(div1.style.height)){
    EO.target.style.top = (parseInt(div1.style.height)-EO.target.offsetHeight)+"px";
  } else if (EO.pageY-y < 0){
    EO.target.style.top="0px"
  }
  else{
    EO.target.style.top=(EO.pageY-y)+"px";
  }
}

function mouseup(EO) {
  EO.target.removeEventListener("mousemove",mousemove,false);
  document.body.style.cursor="default";

}
