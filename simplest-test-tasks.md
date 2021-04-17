"use strict";
let user = 'John';
let age = 25;
let message = 'Hello';


let str = "hello";
let str2 = 'test 2';
let phrase = `${str} world`;
let isGreater = true;

alert( typeof isGreater ); // true (результатом сравнения будет "да")
let result = prompt(232,'');
alert(`вы ввели ${result}`)
let result = confirm("azaza");
alert("messaf");
prompt(message,1);
confirm("azaza")
String();
Boolean();
Number();


 let a = 1;
 let b = 5;
 let result = a+b<4 ? "Мало" : "много";
 alert(result);

let hour = 9;
if (hour < 10 || hour > 18) 
{
  alert( 'road closed' );
}
alert( 1 && 3 && 2 );
let sum = "",chet = 0;
for (let i = 0; i < 100; i++) {
    if (i % 2 != 0) continue;
  sum += i+" ";
  chet ++;
}
sum = sum + `количество чётных: ${chet}`;

alert(sum);



function pow(a,b)
{
  let chislo = a;
  for(let i=1;i<b;i++)
  {
    chislo *=b;  
  }
  return chislo;
}
alert(pow(2,2));


function pow(x,n)
{
  return x**n;
}
alert(pow(5,3))



let ask = (question, yes, no) => (confirm(question)) ? yes(): no();
  
  ask("Are you agree?", 
  () => alert("You are agree"),
  () => alert("You are disagree"),
  );

function showPrimes(n) 
{
    nextPrime:
    for (let i = 2; i < n; i++) 
    {
        for (let j = 2; j < i; j++) 
        {
        if (i % j == 0) continue nextPrime;
        }
        alert(i);
    }
}
showPrimes(15)

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};
function multiplyNumeric(obj) 
{
  for(let key in menu)  
  {
    if(typeof(menu[key]) != 'number') continue;
    menu[key] *= 2;
    alert(menu[key]);
  }
}
multiplyNumeric(menu)


function multiplyNumeric(obj) 
{
  for (let key in obj) 
  {
    if (typeof obj[key] == 'number') 
    {
      obj[key] *= 2;
    }
  }
}
let user = {
  name: "Джон",
  go: function() { alert(this.name) }
}

(user.go)() 


let calculator = {
a: +prompt("a",0),
b: +prompt("b",0),
sum() { return this.a+this.b;},
mul() { return this.a*this.b;},
};

calculator.read();
alert( calculator.sum() );
alert( calculator.mul() );


let ladder = {
  step: 0,
  up() { this.step++; return this; },
  down() { this.step--; return this;},
  showStep() { alert(this.step);return this;}
};

ladder.up().up().down().showStep(); // 1



function Calculator() {
  this.read = function() {
    this.chislo = +prompt("Введите первое значение:");
    this.chisla = +prompt("Введите второе значение:");
  };
   this.sum = function() {
    return this.chislo+this.chisla;
  };
  this.mul = function()  {
    return this.chislo*this.chisla;
  }
}



let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );


function Accumulator(startingValue) {
  this.value = startingValue;
  this.read = function() {
    this.value += +prompt("введите число:",0) 
  }
}
let accumulator = new Accumulator(1); // начальное значение 1

accumulator.read();
accumulator.read(); 

alert(accumulator.value); 
function readNumber()
{
    let num;
    do
    {
        num = prompt("введите число!",0);
    }
    while(!isFinite(num))
    {
        if(num === null || num === '') return null;
        return +num;
    }
}
alert(`Число ${readNumber()}`);


function random(a,b)//random from a to b
{
    return a+Math.random()*(b-a) 
}
alert(random(1,5))


for (let char of "Hello") 
{
  alert(char); // H,e,l,l,o
}
function ucFirst(str) // first letter in UpperCase
{
    let b = str[0].toUpperCase()+str.slice(1);
    alert(b); 
}
ucFirst("имя") 


function checkSpam(str)
{
    let a = str.toLowerCase();
    if(a.includes('viagra') || a.includes('xxx'))
        alert("ban!")
    else 
        alert("ok")
}
checkSpam(prompt("тест",0)) 


function truncate(str,maxlen) // trucate for length 20
{
  return (str.length < 20) ? alert(str): alert(str.slice(0,(maxlen-1))+'...')// ... - is a 1 symbol
}
truncate("Эта строка будет содержать до 20 символов", 20)   


function createMarker(id)//this function used on my site: https://gameextream.polirek.by/ucp/pages/maps/index.php
{
    let p_windows = new google.maps.InfoWindow({
        content: "<p>"+p_pos[id].name+" <b>(ID: "+id+")</b><br>Ping: "+p_pos[id].ping+"</p>"
    });

    let p_marker = new google.maps.Marker({
        position: SanMap.getLatLngFromPos(p_pos[id].x, p_pos[id].y),
        map: map,
        icon: "/ucp/pages/maps/images/player.gif"
    });

    google.maps.event.addListener(p_marker, 'click', function() {
        p_windows.open(map,p_marker);
    });
}
