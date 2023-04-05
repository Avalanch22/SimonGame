var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
//this is to play sound accounding to the input provided in the
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function nextSequence(){
  userClickedPattern=[];  //this is done so that during the next itiration of level the user clicked button is cleared and a new can be made
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // this is to make the button flick whenever the button is selected or clicked
  playSound(randomChosenColour);
  level++;
  $("h1").text("level "+level);
}
///her we will check whether the user has pressed any key on the keyboard and if one key is pressed the game will start but if more then one is pressed the loop will go to the else part
var mykeys=0;
$(document).keypress(function(){
  if(mykeys===0){
    nextSequence();
    mykeys++;
  }
});
//here we will work the animation and functions of when any button is clicked in the document
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
//checkAnswer() is used to check whether the array with the user input is the same as the input of the random array
function checkAnswer(level){
  if(userClickedPattern[level]===gamePattern[level]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
    //the else part is used to play the wrong sound , change the heading and also flash the screen with red colur by adding the game-over class in the css file
  }else{
    var wrongAnswer = new Audio("sounds/wrong.mp3");
    wrongAnswer.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
//StartOver() is to restarrt the code when the user taps a wrong button or when the game is over
function startOver(){
  level=0;
  mykeys=0;
  gamePattern=[];
  userClickedPattern=[];
}
