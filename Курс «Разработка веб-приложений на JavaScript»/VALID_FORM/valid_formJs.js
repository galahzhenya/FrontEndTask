"use strict"
// Форма в виде массива 
var formDef1=
[
  {label:'Разработчики:',kind:'longtext',name:'sitename'},
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Дата запуска сайта:',kind:'number',name:'visitors'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:4},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];
// Функция создание формы
function buildForm(tag, array){
  var form = document.forms[tag];
  var table = document.createElement("table");
  var tbody = document.createElement("tbody");

  for(var i =0; i<array.length; i++){
    var hesh = array[i];
    var lable = null;
    var element = null;
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    //td3.style.color="#ff0000";
    if(hesh.kind == "longtext"){
      element = document.createElement("input");
      element.type = "text";
      element.style= "width: 453px";
      element.name=hesh.name;
      td2.appendChild(element);
    } else if (hesh.kind == "number"){
      element = document.createElement("input");
      element.type = "text";
      element.style= "width: 80px";
      element.name=hesh.name;
      td2.appendChild(element);
    } else if (hesh.kind == "shorttext"){
      element = document.createElement("input");
      element.type = "text";
      element.style= "width: 200px";
      element.name=hesh.name;
      td2.appendChild(element);
    } else if (hesh.kind == "combo"){
      element = document.createElement("select");
      element.style = "width: 204px; margin-left: 2px";
      var optionList = hesh.variants;
      for (var r = 0; r < optionList.length; r++){
        var optionhesh = optionList[r];
        var optionElement = document.createElement("option");
        optionElement.value=optionhesh.value;
        var optionText = document.createTextNode(optionhesh.text);
        optionElement.appendChild(optionText);
        element.appendChild(optionElement);
      }
      element.name=hesh.name;
      td2.appendChild(element);
    } else if (hesh.kind == "radio"){
      var radioList = hesh.variants;
      for (var k = 0; k < radioList.length; k++){
        var variantsHesh = radioList[k];
        element = document.createElement("input");
        element.type = hesh.kind;
        element.name = hesh.name;
        element.value = variantsHesh.value; 
        td2.appendChild(element);
        element = document.createElement("span");
        var elementText = document.createTextNode(variantsHesh.text);
        element.appendChild(elementText);
        td2.appendChild(element);
      }
    } else if (hesh.kind == "check"){
      element = document.createElement("input");
      element.type = "checkbox";
      element.name = hesh.name;
      td2.appendChild(element);
    } else if (hesh.kind == "memo"){
      element = document.createElement("textarea");
      element.style="width: 608px; height: 50px";
      element.name = hesh.name;
      var lable = document.createTextNode(hesh.label);
      var br = document.createElement("br");
      td1.appendChild(lable);
      td1.appendChild(br);
      td1.appendChild(element);
      td1.colSpan="2";
      hesh.label="";
    } else if (hesh.kind == "submit"){
      element = document.createElement("input");
      element.type = "submit";
      element.value = hesh.label;
      hesh.label="";
      element.name=hesh.name;
      td1.appendChild(element); 
    }
    lable = document.createTextNode(hesh.label);
    td1.appendChild(lable);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  form.appendChild(table);
}
// Создние формы 
buildForm("formDef1",formDef1);


//------------Непосредственно код задания по валидации формы-------------//
// Обработчик события "фокус" на элементы формы 
var formDef1 = document.forms.formDef1;
formDef1.addEventListener("blur", function( event ) {
  var elemErrorMes = event.target.parentElement.nextSibling;
  var elemTarget = event.target;
  elemErrorMes.style.color="#ff0000";
  var errorMesString = validForm(elemTarget);
  elemErrorMes.innerHTML= '&nbsp;'; //Очистка ячейки таблицы
  
  elemErrorMes.appendChild(document.createTextNode(errorMesString))
}, true);

// Обработчик события submit
formDef1.addEventListener('submit',validateInfoForm,false);

function validateInfoForm(event){
  var trList = event.target.getElementsByTagName("tr");
  var errorCount =0;
  for( var i =0; i<trList.length-1; i++){
    var errorMesString ="";
    var elemErrorMes ="";
    var elemValid="";
    if ( trList[i].firstChild.colSpan =="2"){
      elemValid=trList[i].firstChild.firstChild.nextSibling.nextSibling;
      errorMesString = validForm(elemValid);
      elemErrorMes = elemValid.parentElement.nextSibling;
    }
    else {
      elemValid=trList[i].firstChild.nextSibling.firstChild;
      errorMesString = validForm(elemValid);
      elemErrorMes = elemValid.parentElement.nextSibling;
    }
    if(errorMesString!=""){
       errorCount++;
      }
    if(errorCount==1){ 
    elemValid.focus();
    }
    console.log(elemValid);
    console.log(errorCount);

    //if(errorCount==1) trList[i].firstChild.firstChild.nextSibling.nextSibling.focus();

    elemErrorMes.style.color="#ff0000";
    elemErrorMes.innerHTML= '&nbsp;'; //Очистка ячейки таблицы
    elemErrorMes.appendChild(document.createTextNode(errorMesString));

  }
  if(errorCount>0){
  event.preventDefault();
  }
}


// Фунеция валидации полученного элемента формы 
function validForm(elemTarget){
  var errorMesArray = ["Пустое значение. ", 
    "Длинна строки меньше 5 символов. ", 
    "Рубрика 'Бытовая техника' временно недоступна для выбора. ",
    "Данному аккаунту статус \"VIP\" недоступен. ",
    "Укажите один из вариантов размещения. ",
    "По правилам сайта вы обязаны дать согласие на размещение отзывов. ",
    "Описание сайта не должно быть короче 30 символов. "];
  var errorString="";
  switch (elemTarget.type) {
    case "text":
      if (elemTarget.value==""){
        errorString+=errorMesArray[0];
      }
      if (elemTarget.value.length <5){
        errorString+=errorMesArray[1];
      }
    break;
    case "radio":
      var value = elemTarget.parentElement.parentElement.parentElement.parentElement.parentElement.elements.payment.value;
      if (value==3){
        errorString+=errorMesArray[3];
      } else if (value ==""){
        errorString+=errorMesArray[4];
      }
    break;
    case "checkbox":
      if (!elemTarget.checked){
        errorString+=errorMesArray[5];
      }
    break;
    case "textarea":
        if (elemTarget.value==""){
          errorString+=errorMesArray[0];
        }
        if (elemTarget.value.length <30){
          errorString+=errorMesArray[1];
        }
    break;

  } 
  if(elemTarget.getElementsByTagName("option").length>1){
    if(elemTarget.value==3){
      errorString+=errorMesArray[2];
    }
  }

  return errorString;
}


