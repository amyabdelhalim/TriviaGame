$(document).ready(function () {

  var triviaQuestions = [
    {
      question: "Best Color",
      answers: ["purple", "pink", "red", "lilac"],
      answer: 3
    },
    {
      question: "Best Food",
      answers: ["fish", "chicken", "lobster", "steak"],
      answer: 2
    },
    {
      question: "Girls Best Friend",
      answers: ["diamonds", "dogs", "cats", "makeup"],
      answer: 0
    }]

  var currentQuestion;
  var correctAnswer;
  var incorrectAnswer;
  var answered;
  var unanswered;
  var time;
  var seconds;
  var userSelect;

  var messages = {
    correct: "Yes, you were right!",
    incorrect: "Sorry, you are wrong!!!!!!!",
    endTime: "YOU HAVE RUN OUT OF TIIIIMMMMMMEEEE",
    finsihed: "Alright!Lets see how well you did."
  };

  $("#startButton").on("click", function () {
    $(this).hide();
    newGame();
  });

  function newGame() {
    $("#finalMessage").empty();
    $("correctAnswers").empty();
    $("incorrectAnswers").empty();
    $("unanswered").empty();

    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
  }

  function newQuestion() {
    $("#message").empty();
    $("correctedAnswer").empty();
    answered = true

    $("#currentQuestion").html(
      "question # " + (currentQuestion + 1) + '/' + triviaQuestions.length);

    $(".question").html(
      "<h2>" + triviaQuestions[currentQuestion].question + "</h2>");

    for (var i = 0; i < 4; i++) {
      var choices = $('<div>');
      choices.text(triviaQuestions[currentQuestion].answers[i]);
      choices.attr({ 'data-index': i });
      choices.addClass('thisChoice');
      $('.answersList').append(choices);
    }

    countdown();
    $('.thisChoice').on('click', function () {
      userSelect = $(this).data('index');
      clearInterval(time);
      answerPage()
    });

    function countdown() {
      seconds = 15
      $('#timeleft').html('<h3>Time remaining: ' + seconds + ' < h3 > ');
      answered = true;
      //sets timer to go down
      time = setInterval(showCountdown, 1000);
    }

    function showCountdown() {
      seconds--;
      $("#timeLeft").html('<h3>Time Remaining: ' + seconds + '</h3 >');
      if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
      }

      console.log(seconds);

    }

    function answerPage() {
      $("#currentQuestion").empty();
      $(".thisChoice").empty(); //clears questions page
      $('question').empty();

      var rightAnswerText =
        triviaQuestions[currentQuestion].answers[
        triviaQuestions[currentQuestion].answers];
      var rightAnswerText = triviaQuestions[currentQuestion].answer;

      if (userSelect == rightAnswerText && answered == true) {
        correctAnswer++;
        $('#message').html(messages.correct);
      } else if (userSelect != rightAnswerText && answered == true) {
        incorrectAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctAnswer').html('The correct answer was:' + rightAnswerText);
      } else {
        unanswered++;
        $('#message').html(messages.endtime);
        $('#correctAnswer').html('The correct answer was:' + rightAnswerText);
        answered = true;

      }
      if (currentQuestion == triviaQuestions.length - 1) {
        setTimeout(scoreboard, 5000);
      }
      else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
      }

      function scoreboard() {
        $('#timeLeft').empty();
        $('#messages').empty();
        $('#correctAnswer').empty();

        $('#finalMessage').html(messages.finished);
        $('#correctAnswers').html('Correct Answers; ' + correctAnswer);
        $('#incorrectAnswers').html('Incorrect Answers: ' + incorrectAnswer);
        $("#unanswered").html('Unanswered: ' + unanswered);
      }
    }
  }
})