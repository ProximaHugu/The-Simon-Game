var buttonColors = ["red", "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedButton = []
var startTheGame  = false;
var level = 0;
$(".btn").on("click", function(){
    var userChoosedColor = $(this).attr("id");
    userClickedButton.push(userChoosedColor);
    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
    checkAnswer(userClickedButton.length - 1)
    
});
function nextSequence(){
    
    var randomNumber = Math.floor(Math.random()* 4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("."+ randomChoosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    level++;
    $("h1").text("level " + level);
    
    

    
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){$("."+currentColor).removeClass("pressed")},100);

}

function checkAnswer(currentLevel){
    if (userClickedButton[currentLevel] === gamePattern[currentLevel]){
        if(userClickedButton.length === gamePattern.length){
            setTimeout(function(){
                userClickedButton = [];
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();

    }
    
}


$("body").on("keydown",(e) => {
    if(!startTheGame && (e.key === "a" || e.key === "A")){
        startTheGame = true;
        $("h1").text("level "+level);
        nextSequence();
    }
});

function startOver(){
    gamePattern = [];
    userClickedButton = [];
    startTheGame = false;
    level = 0;
}


