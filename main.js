document.addEventListener('DOMContentLoaded', function () {
    var quizz;
    var score = 0;
    var x = 0;

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.status);
            quizz = JSON.parse(xhr.responseText);
            console.log(quizz);
            display(x);
        }
    }

    xhr.open('GET', 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean', true);
    xhr.responseType = 'text';
    xhr.send();

    function display(x) {
        if (x >= 0 && x < 10) {
            document.getElementById("question1").innerHTML = quizz.results[x].question;
            document.getElementById("trues").innerHTML = quizz.results[x].correct_answer;
            document.getElementById("falses").innerHTML = quizz.results[x].incorrect_answers[0];
        }//end if statement

        else {
            document.body.innerHTML = "THE END. YOUR SCORE is " + score + " of " + quizz.results.length;
            document.body.setAttribute("style", "width: 100%; margin:0 auto; font-weight:bold; font-size: 100px; color: white; background-image: url('https://res.cloudinary.com/simpleview/image/upload/crm/poconos/Holiday-Independence-Day-Fireworks-Lake-Wallenpaupack-2-PoconoMtns01_e6c78873-9f82-6be5-8281f3b4afedd280.jpg');background-repeat: no-repeat;     background-size:cover;");
        }
    };//end of function display

    document.getElementById("falses").addEventListener("click", () => {
        alert("NO, sorry");
        display(++x);
    });

    document.getElementById("trues").addEventListener("click", () => {
        alert("Correct! + 1 score");
        ++score;
        display(++x);
        console.log(score);
    });

});// end of DOM function
