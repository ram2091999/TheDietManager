//jshint esversion:6

var healthQuotes = ["Without health life is not life; it is only a state of langour and suffering - an image of death.", "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.", "Time and health are two precious assets that we don't recognize and appreciate until they have been depleted."];
var quoteIndex = Math.floor(3 * Math.random());
var quote = document.getElementsByTagName('h1')[0];
quote.innerHTML = healthQuotes[quoteIndex];
var welcomeDiv = document.getElementsByClassName("welcome-div")[0];
var messageDiv = document.getElementsByClassName("message")[0];
var submit = document.getElementsByTagName('button')[0];
var kcal;
//localStorage.clear();
var weight1, height1, age1;

if (localStorage.getItem("data") === null) {
  submit.addEventListener("click", function() {
    var formDetails = {
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      weight: document.getElementById("weight").value,
      height: document.getElementById("height").value,

    };
    weight1 = Number(formDetails.weight);
    height1 = Number(formDetails.height);
    age1 = Number(formDetails.age);

    localStorage.setItem("data", JSON.stringify(formDetails));
    welcomeDiv.style.display = "none";
    messageDiv.style.display = "block";
    //messageDiv.style.backgroundColor = "green";
    document.getElementsByTagName('h2')[0].innerHTML = "HI!" + formDetails.name;
    changeh2();

  });

} else {
  var formDetails = JSON.parse(localStorage.getItem("data"));
  welcomeDiv.style.display = "none";
  messageDiv.style.display = "block";
  //messageDiv.style.backgroundColor = "green";
  document.getElementsByTagName('h2')[0].innerHTML = "HI!" + formDetails.name;

  weight1 = Number(formDetails.weight);
  height1 = Number(formDetails.height);
  age1 = Number(formDetails.age);
  changeh2();
}



function changeh2() {



  var kcal1;
  var bmr = 88.362 + (13.397 * weight1) + (4.799 * height1) - (5.677 * age1);

  kcal1 = bmr * 1.24;
  kcal=kcal1;
  document.getElementsByTagName('h2')[1].innerHTML = "Your calorie intake should be " + kcal1 + " Kilocalories per day.";
}

//for calorie div----problematic
var calorieMessage = document.getElementsByClassName("calorieMessage")[0];
var calorieMessageButton = document.getElementsByClassName("calorieMessageButton")[0];
var foodForm = document.getElementById("foodForm1");
var add = document.getElementById("add1");
var ul = document.getElementsByTagName("ul")[0];
var foodItems=[];
var kcalConsumed=0;
//localStorage.clear();

const liMaker = text => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
};
if(localStorage.getItem("food")!=null){
  foodItems=JSON.parse(localStorage.getItem("food"));
  foodItems.forEach(function(e){
    let kcalOfThis=0;
    kcalOfThis=4*(Number(e.carbs)+Number(e.protein))+9*Number(e.fat);
    kcalOfThis/=1000;
    liMaker(e.name+"-"+kcalOfThis+"kcal");
    kcalConsumed+=4*(Number(e.carbs)+Number(e.protein))+9*Number(e.fat);
  });
  changeCalorieConsumed();
  }
calorieMessageButton.addEventListener("click",function(){

  calorieMessage.style.display="none";
  document.getElementById("foodForm1").style.display="block";

});


add.addEventListener("click",function(){

  var data1={
    name:document.getElementById("food-name").value,
    carbs:document.getElementById("carbs").value,
    protein:document.getElementById("protein").value,
    fat:document.getElementById("fat").value
  };

  let kcalOfThis=0;
  kcalOfThis=4*(Number(data1.carbs)+Number(data1.protein))+9*Number(data1.fat);
  kcalOfThis/=1000;


  kcalConsumed+=4*(Number(data1.carbs)+Number(data1.protein))+9*Number(data1.fat);
  calorieMessage.style.display= "block";
  document.getElementById("foodForm1").style.display="none";
  foodItems.push(data1);
  localStorage.removeItem("food");
  localStorage.setItem("food",JSON.stringify(foodItems));
  liMaker(data1.name+"-"+kcalOfThis+"kcal");
  changeCalorieConsumed();
});
function changeCalorieConsumed(){
  h2ToChange=document.getElementsByClassName("changeCalorieConsumed")[0];
  h2ToChange.innerHTML="You have consumed "+(kcalConsumed/1000)+" KCalories as of now...";

  if((kcalConsumed/1000)>kcal)
    alert("You've consumed more calories than you should be consuming today...");
}
//For water div

var hours,mins;

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
//here
var waterToDrink=weight1*(2/3)*0.0295735;
waterToDrink/=24;
waterToDrink*=hours;


var waterToDrinkH2=document.getElementsByClassName("waterToDrink")[0];
//here
function startTime() {
  var today = new Date();
  var h = today.getHours();
  hours = h;
  var m = today.getMinutes();
  mins=m;
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  t = setTimeout(function() {
    startTime();
  }, 500);

}
startTime();
//here
//hereend
function changeWaterh2(){

waterToDrinkH2.innerHTML="You should have drunk "+(hours/4)+" L of water by now";
}
changeWaterh2();
var foodForm=document.getElementsByClassName("waterForm")[0];
var waterContents=document.getElementsByClassName("waterContents")[0];
var waterDivButton=document.getElementsByClassName("waterDivButton")[0];
var waterConsumedUl=document.getElementsByClassName("waterConsumedUl")[0];
var waterAdd=document.getElementsByClassName("waterAdd")[0];
var waterArray=[];
function waterLiMaker(e){
  const li=document.createElement("li");
  li.textContent=e+" Liters at "+hours+":"+mins;
  waterConsumedUl.appendChild(li);
}
if(localStorage.getItem("water")!=null){
  waterArray=JSON.parse(localStorage.getItem("water"));
  waterArray.forEach(function(e){
    waterLiMaker(e);
  });

}


waterDivButton.addEventListener("click",function(){
  foodForm.style.display="block";
  waterContents.style.display="none";
  document.getElementsByClassName("hydratedMessage")[0].style.display="none";
});
waterAdd.addEventListener("click",function(){
  var waterConsumed=document.getElementById("liter").value;


  waterArray.push(waterConsumed);
  localStorage.removeItem("water");
  localStorage.setItem("water",JSON.stringify(waterArray));
  waterLiMaker(waterConsumed);
  foodForm.style.display="none";
  waterContents.style.display="block";
  document.getElementsByClassName("hydratedMessage")[0].style.display="block";
  document.location.reload(false);
});

var totalWaterConsumed=0;
waterArray.forEach(function(e){
  totalWaterConsumed+=Number(e);
});

if((hours/4)>totalWaterConsumed && localStorage.getItem("data") != null){
document.getElementsByClassName("hydratedMessage")[0].innerHTML="You're not hydrated enough..";
alert("you're not sufficiently hydrated...Please drink water more frequently");
//console.log(totalWaterConsumed);
}

if((hours/4)<totalWaterConsumed){
 document.getElementsByClassName("hydratedMessage")[0].innerHTML="Good job you're sufficiently hydrated...";

//console.log(totalWaterConsumed);
}

document.getElementsByClassName("resetButton")[0].addEventListener("click",function(){
  localStorage.clear();
  document.location.reload(true);
});
