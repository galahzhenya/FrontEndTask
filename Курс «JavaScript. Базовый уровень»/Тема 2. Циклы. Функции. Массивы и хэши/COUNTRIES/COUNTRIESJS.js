
var countrysH={};

// Функции с занятия 
function addCountry(countryName,capitalName) {
    countrysH[countryName]=capitalName;
}

function deleteCountry(countryName) {
    delete countrysH[countryName];
}

function getCountryInfo(countryName) {
    if ( countryName in countrysH )
        return 'страна: ' + countryName + ' столица: ' + countrysH[countryName] ;
    else
        return 'нет информации о стране ' + countryName + '!' ;
}

function listCountrys() {
    var res="";
    for ( var CN in countrysH )
        res+='\n'+getCountryInfo(CN);
    return res;
}
//

function AddCountryInfo() 
{
    var countryName = prompt("Введите название страны");
    if (countryName==null)
    {
        alert("Вы не ввели название страны. Повторите попытку"); 
    }
    else
    {
    var countryCapital = prompt("Введите название столицы данной страны");
    addCountry(countryName, countryCapital);
    }
}

function AskCountryInfo()
{
    var countryName = prompt("Введите название страны");
    alert(getCountryInfo(countryName));
}

function ShowCountryInfoInLog()
{
    console.log(listCountrys());
}

function DeleteCountryInfo()
{
    var countryName = prompt("Введите название страны");
    deleteCountry(countryName);
}