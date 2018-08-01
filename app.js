//Emojis array for cards
const emojis=['meh-blank','grin-stars','grin-hearts','laugh-beam','laugh-wink','dizzy','angry','grin-tongue-wink','grin-stars','grin-hearts','laugh-beam','laugh-wink','dizzy','angry','grin-tongue-wink','meh-blank'];

const container=document.querySelector('.container');
const name=document.querySelector('#name');
const submit=document.querySelector('#submit');
const board=document.querySelector('.board');
const card=document.querySelector('li .card');
const side1=document.querySelector('#side1');
const side2=document.querySelector('#side2');
const main=document.querySelector('.main');
const moves=document.querySelector('.moves');
let timer=document.querySelector('.timer');
const stars=document.querySelector('.stars');
const restart=document.querySelector('.restart');
const starsLi=document.querySelector('.stars li');
const modal=document.querySelector('.modal');

let opened=[], matchVar=0, movesVar=0, starsVar=5, playerName="";


//Function to store the name and start the timer
function pName(){
playerName=name.value;
if(confirm("Game is about to start. Are you ready?")){ 

startTimer(); lead();
calStars();

}
else alert("Unsuccessful in submitting the name. \nGame initializaion aborted. \nSubmit your name successfully to start the game.")
}

//Function to restart the game
restart.addEventListener('click', function(){
                         location.reload(true);
                         }
);

//Function to shuffle the elements in emojis array
function shuffle(array){
  var currentIndex=array.length, tempVal, randomIndex;
  while(currentIndex!==0){
    randomIndex=Math.floor(Math.random()*currentIndex);
    currentIndex-=1;
    tempVal=array[currentIndex];
    array[currentIndex]=array[randomIndex];
    array[randomIndex]=tempVal;
  }
  return array;
}

//Function to place cards inside board
function Cards(emojis){
  let shuffled=shuffle(emojis);
  for(let i=0; i<shuffled.length; i++){
    let temp='<li class="card"><i class="far fa-'+shuffled[i]+'"></i></li>';
    board.insertAdjacentHTML('beforeend', temp);
  }
}

//Code to calculate stars
const starstemp='<li class="stars li"><i class="far fa-star"></i></li>'.repeat(starsVar);

function displayStars(){
  stars.insertAdjacentHTML('beforeend',starstemp);
}

function calStars(){
if(movesVar<19){
  setInterval(function(){
    stars.removeChild(stars.lastElementChild);

  starsVar--;
  },30000);
}
else if(movesVar>18){
  setInterval(function(){
    stars.removeChild(stars.lastElementChild);

  starsVar--;
  },20000);
}
else if(movesVar>25){
  setInterval(function(){
    stars.removeChild(stars.lastElementChild);

  starsVar--;
  },10000);
}
else if(movesVar>30){
  setInterval(function(){
    stars.removeChild(stars.lastElementChild);
  starsVar--;
  },1500);
}
else if(movesVar<0){
  starsVar=0;
}
}

//Function to display congratulations modal
function displayModal(){
  if(movesVar==16){
    var temp='<h1>You got the perfect score!</h1>';
  }
  if(movesVar>=0){
    var temp='<h2>You completed game with a score of '+starsVar+' out of 5 stars!<br><h3>You did it in '+movesVar+' moves and finished in '+min+' minute and '+sec+' second.</h3>';
  }
  temp+='<center><button onclick="f1()">Restart</button></center>';
  modal.insertAdjacentHTML('beforeend',temp);
  main.style.display="none";
  $('.modal').attr('id','modalshow');
  stopTimer();
}

function f1(){
                         location.reload(true);
                         }


//Timer functions
let sec=0, min=0;
function startTimer(){
  timer=setInterval(insertTime,1000);
}
function stopTimer(){
  clearInterval(timer);
  sec=0;
  min=0;
}
function insertTime(){
  sec++;
  if(sec>=60){
    min++;
    sec=0;
  }
  sec=(sec).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false});
  min=(min).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping:false});

  //Code to display time
  document.querySelector('.timer').innerHTML=min+" : "+sec;
}

//Functions on clicking the card
function cardOpen(card){
  card.target.classList.add('open','show');
  opened.push(card.target);
}

function closeCard(card){
  opened[1].classList.remove('open','show','unmatch');
  opened[0].classList.remove('open','show','unmatch');
  opened.splice(0,2);
}

//Function to check the card
function checkCard(card){
  if(opened.length>1 && opened[0].firstChild.className==opened[1].firstChild.className && !(opened[0]===opened[1])){
    match(card);
    movesVar++;
    moves.innerText=movesVar;
  }
  else{
    movesVar++;
    moves.innerText=movesVar;
    unmatch(card);
    setTimeout(function(){
      closeCard(card);
    }, 700);
  }
}

//Function to match cards
function match(card){
  opened[0].classList.toggle('match');
  opened[1].classList.toggle('match');
  matchVar++;
  opened.splice(0,2);
}

//Function to unmatch cards
function unmatch(card){
opened[0].classList.toggle('unmatch');
opened[1].classList.toggle('unmatch'); 
}


//Clicking funtions
board.addEventListener('click',function(card){
  if(opened.length==1 && card.target.classList.contains('card')){
    cardOpen(card);
    checkCard(card);
  }
  else if(opened.length==0 && card.target.classList.contains('card')){
    cardOpen(card);
  }
  
  //Winning condition to display the congratulations modal
  if(matchVar==8){
    displayModal();
  }
});




//Leaderboard code
function openNav() {
    document.getElementById("mySidenav").style.width = "500px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//Once the game is successfully played, then data will get entered in leaderboard
function lead(){

    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

setInterval(function(){
    cell1.innerHTML = playerName;
    cell2.innerHTML = movesVar;
    cell3.innerHTML = min+":"+sec;
    cell4.innerHTML = starsVar;}, 300);
}




//Function to start the game
function game(){
  Cards(emojis);
  displayStars();
}

game();