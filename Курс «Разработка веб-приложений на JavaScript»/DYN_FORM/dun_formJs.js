"use strict"

var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];

var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];

document.addEventListener('DOMContentLoaded', function() {

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
          console.log(element);
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
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    form.appendChild(table);
  }

  buildForm("formDef1",formDef1);
  buildForm("formDef2",formDef2);


},false);