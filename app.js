const getRequest = async () => {
  const response = await fetch("https://opentdb.com/api.php?amount=1");
  return response.json();
};

$("#start_btn").hide();
$("#restart_game").hide();
$("#stop_now").hide();
$("#joker_fifty_fifty").hide();
$("#winner").hide();


const generateQuestions = (callback) => $("#start_btn").on("click", callback);

let indexOfWinSums = 0;
let countQuestions = 0;
let sum = 0;
const tableSum = [200,300,400,500,1500,3000,5000,10000,25000,50000,100000,150000,250000,500000,1000000];
let playerName = $(".player_name").val();

generateQuestions(async () => {
  let responseSearch = await getRequest();
  
    const category = responseSearch.results[0].category;
    const correctAnswer = responseSearch.results[0].correct_answer;
    const incorrectAnswer = responseSearch.results[0].incorrect_answers;
    const difficulty = responseSearch.results[0].difficulty;
    const question = responseSearch.results[0].question;
    $("#joker_fifty_fifty").show();
    $("#finish_results").empty();
    $("#joker_usage").empty();
    $("#category").empty();
    $("#diff").empty();
    $("#category").append(`Category: <br>${category}`);
    $("#diff").append(`Difficulty: <br>${difficulty}`);
    $("#start_btn").hide();
    if(incorrectAnswer.length === 1){
        $(".quest_and_answers").empty();
        let itemBtnsAnswers = 
            `<br><button id="answer_1">A: ${correctAnswer}</button>
            <button id="answer_2">B: ${incorrectAnswer[0]}</button>`;
            $(".quest_and_answers").append(question,itemBtnsAnswers);
            $("#joker_fifty_fifty").hide(); 
      } 
      else {
        $(".quest_and_answers").empty();
            let itemBtnsAnswers = 
                `<br>
                <button id="answer_1">A: ${incorrectAnswer[0]}</button>
                <button id="answer_2">B: ${correctAnswer}</button>
                <button id="answer_3">C: ${incorrectAnswer[1]}</button>
                <button id="answer_4">D: ${incorrectAnswer[2]}</button>
                `;
                $(".quest_and_answers").append(question,itemBtnsAnswers); 
      }

  let winSum = [];
  
  $( "#answer_2" ).on('click',function() {
    $("#joker_usage").empty();
    $("#start_btn").show();
    $("#category").empty();
    $("#diff").empty();
    $(".quest_and_answers").empty();
    $('#sum').empty();
    $('#countQuestions').empty();
    winSum.push(tableSum[indexOfWinSums]);
    indexOfWinSums++;
    sum = winSum.join("");
    
    $("#finish_results").append(`Correct Answer ! <br> You win: ${sum} $`);
    
    $('#sum').append(`Amount Money: <br>${sum}`);
    countQuestions++;
    $('#countQuestions').append(`Questions: <br>${countQuestions} / 15`);
    $("#joker_fifty_fifty").hide();
    if(countQuestions === 15){
        $("#start_btn").hide();
        $(".items").empty();
        $("#stop_now").hide();
        $('#winner').show();
    }
    
}); 

let wrongAnswer = () =>{
    if(sum < 500){
        sum = 0;
    }
    else if(sum >= 500 && sum < 25000){
        sum = 500;
    } else if (sum >= 25000 && sum < 10000000){
        sum = 25000;
    }
    
    $("#joker_usage").empty();
    $(".quest_and_answers").empty();
    $("#start_btn").hide();
    $("#finish_results").append(`Wrong Answer !`);
    $("#wrong_answer").append(`<br>You finished at: ${countQuestions} question with amount of ${sum} $ !`);
    $('#sum').empty();
    $('#countQuestions').empty();
    $("#stop_now").hide();
    $("#joker_fifty_fifty").hide();
    
}

$("#answer_1").on('click', function() {
   wrongAnswer(); 
});
$("#answer_3").on('click', function() {
    wrongAnswer();
});
$("#answer_4").on('click', function() {
    wrongAnswer();
});
$("#stop_now").on('click', function(){
     $("#finish_results").empty();
     $("#category").empty();
     $("#diff").empty();
     $(".quest_and_answers").empty();
     $("#start_btn").hide();
     $("#stop_now").hide();
     $("#joker_fifty_fifty").hide();
     $("#wrong_answer").empty();
     $("#stop_game").empty();
     $("#stop_game").append(`You finished at: ${countQuestions} question with amount of ${sum} $ !`);
});

});

$(document).ready(function() {
    $('#set_user_btn').click(function() {
        if (!$('.player_name').val()) {
            alert(`You entered like a Guest !`);
            $("#username").append("Guest");
        } else {
            alert(`You entered like ${playerName} !`);
        }
    })
});


$("#set_user_btn").on('click', function (){
        
    $("#start_btn").show();
    playerName = $(".player_name").val();
    $(".player_name").hide();
    $("#username").append(playerName);
    $("#set_user_btn").hide();
    $("#restart_game").show();
    $("#stop_now").show();
});



$("#restart_game").on('click', function (){
    location.reload();
});


const jokerFiftyFifty = () => {
    $("#answer_1").hide();
    $("#answer_3").hide();
}
let countJokerUsage = 3;

$("#joker_fifty_fifty").on('click', function (){
    jokerFiftyFifty();
    countJokerUsage--;
    if (countJokerUsage == 0){
        $("#joker_fifty_fifty").remove();
    };
    $("#joker_usage").append(`You can use this joker ${countJokerUsage} more times.`);
    $("#joker_fifty_fifty").hide();
});

