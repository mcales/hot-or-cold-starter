/*--- variables ---*/
var secret;
var newGuess;
var guessCount;
var oldGuesses = [];
var guessList;
var gameOver = false;
var feedbackNotice;
var alreadyGuessed = false;

$(document).ready(function(){
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
  	newGame();
  	$('form').submit(function(event){
  		event.preventDefault();
  		getGuess();
  	});
  	$('a.new').click(newGame);
  });
 //Random number generator
 function secretNumber(){
 	var x = (Math.random()*100) + 1;
 	secret = x - (x % 1);
 }
 //evaluate a new guess
 function getGuess(){
 	newGuess = $('form').find('#userGuess').val();
 	$('form').find('#userGuess').val('');
 	if (guessValidator()){return ;}
 	updateFeedback();
 	guessCount++;
 	checkOldGuesses();
 	updateGame();
 }
//check if guess is valid
function guessValidator(){
	if (gameOver == true){
		alert('Please start a new game')
		return true;
	}
	if (newGuess < 0){
		alert('guess a number between 0 and 100')
		return true;
	}
	if (newGuess > 100){
		alert('guess a number between 0 and 100')
		return true;
	}
	if (newGuess % 1 != 0){
		alert('guess a number between 0 and 100')
		return true;
	}
	if (oldGuesses.length > 0){
		$.each(oldGuesses,function(guess,value){
			if(newGuess == value){
				alreadyGuessed = true;
			}
		});
	}
	if(alreadyGuessed){
		alreadyGuessed = false;
		alert('You guessed this already')
		return true;
	}
return false;
}
//determine user feedback
function updateFeedback(){
	if (secret == newGuess){
		feedbackNotice = 'You Win! Click new game to play again';
		gameOver = true;
	}
	else if (Math.abs(secret - newGuess) < 10){
		feedbackNotice = 'hot';
	}
	else if (Math.abs(secret - newGuess) > 9 && Math.abs(secret - newGuess) < 20){
		feedbackNotice = 'warm';
	}
	else{
		feedbackNotice = 'cold';
	}
}
//check if the guess has been made before
function checkOldGuesses (){
	oldGuesses.push(newGuess);
	guessList = '';
	if(oldGuesses[0].length){
		$.each(oldGuesses,function(guess,value){
			guessList += '<li>' + value + '</li>';
		});
	}
}
//update the page
function updateGame(){
	$('#count').html(guessCount);
	$('#feedback').html(feedbackNotice);
	$('#guessList').html(guessList);
}
//reset variables
function resetGame(){
	guessCount = 0;
	feedbackNotice = 'Make your Guess!';
	newGuess = '';
	oldGuesses = [];
	guessList = '';
	gameOver = false;
}
//make a new game
function newGame(){
	resetGame();
	updateGame();
	secretNumber();
}


