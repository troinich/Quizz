
document.addEventListener('DOMContentLoaded', function () {
    var quizz;
    var score = 0;
    var x = 0;
    var allErrorMess = document.getElementsByClassName("errorMess");

    
    
    difficulty.onblur = function () {
        if (!isNaN(this.value)) { // if input is a number
            // show mistake
            this.classList.add("error");
            document.getElementsByClassName("errorMess")[0].style.display = "block";
            //get back a focus
            difficulty.focus();
        } else {
            this.classList.remove("error");
            document.getElementsByClassName("errorMess")[0].style.display = "none";
            document.getElementsByClassName("errorMess")[0].style.color = "white";
        }
    };

    quantity.onblur = function () {
        if (isNaN(this.value)) { // input is not a number
            this.classList.add("error");
            allErrorMess[1].style.display = "block";
            quantity.focus();
        } else {
            this.classList.remove("error");
            document.getElementsByClassName("errorMess")[1].style.display = "none";
            document.getElementsByClassName("errorMess")[1].style.color = "white";
        }
    };

    subject.onblur = function () {
        if (!isNaN(this.value)) { // if input is a number
            this.classList.add("error");
            allErrorMess[2].style.display = "block";
            subject.focus();
        } else {
            this.classList.remove("error");
            document.getElementsByClassName("errorMess")[2].style.display = "none";
            document.getElementsByClassName("errorMess")[2].style.color = "white";
        }
        setGo();
    };

    function setGo() {
        if ((difficulty.value !== "") && (quantity.value !== "") && (subject.value !== "")) {
            document.getElementById('go').style.backgroundColor = "yellow";
            document.getElementById('go').disabled = false;
        }
    }

    setGo();


    function display(x) {
        if (x >= 0 && x < quizz.results.length) {
            document.getElementById('question1').style.display = 'block';
            document.getElementById('trues').style.display = 'block';
            document.getElementById('falses').style.display = 'block';

            document.getElementById("question1").innerHTML = (x + 1) + "." + quizz.results[x].question;
            document.getElementById("trues").innerHTML = quizz.results[x].correct_answer;
            document.getElementById("falses").innerHTML = quizz.results[x].incorrect_answers[0];

        }//end if statement

        else {
            document.body.innerHTML = "THE END. YOUR SCORE is " + score + " of " + quizz.results.length;
            document.body.setAttribute("style", "width: 100%; margin:0 auto; font-weight:bold; font-size: 100px; color: white; background-imquantity: url('https://res.cloudinary.com/simpleview/imquantity/upload/crm/poconos/Holiday-Independence-Day-Fireworks-Lake-Wallenpaupack-2-PoconoMtns01_e6c78873-9f82-6be5-8281f3b4afedd280.jpg');background-repeat: no-repeat; background-size:cover;");
        }

    };

    allowedDiff = ["easy", "medium", "hard"];
    var allErrors = document.getElementsByClassName("error");
    var difError = allErrors[0];

    allInputs = document.querySelectorAll('input');

    function selectedOrDefault(val, dflt, allowedItems) {
        val = val.toLowerCase().trim();
        if (!allowedItems.includes(val)) {
            return dflt
        }
        else {
            return val;
        }
    }

    function setComplex() {
        var difficulty = selectedOrDefault(
            document.getElementById("difficulty").value, 'easy', allowedDiff)

        var quantity = selectedOrDefault(
            document.getElementById("quantity").value, 5)

        var subject = selectedOrDefault(
            document.getElementById("subject").value, 9)

        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(xhr.status);
                quizz = JSON.parse(xhr.responseText);
                console.log(quizz);
                console.log(quizz.results);
                x = 0;
                display(x);
            }
        }

        var difPath = "https://opentdb.com/api.php?amount=" + quantity + "&category=" + subject + "&difficulty=" + difficulty + "&type=boolean";
        xhr.open('GET', difPath, true);
        xhr.responseType = 'text';
        xhr.send();

    }

    document.getElementById("go").addEventListener("click", () => {
        document.getElementById("settings").style.display = "none";
        document.getElementById("article").innerHTML = setComplex();
    });

    document.getElementById("falses").addEventListener("click", () => {
        alert("NO, sorry");
        display(++x);
    });

    document.getElementById("trues").addEventListener("click", () => {
        alert("Correct! + 1 score")
        ++score;
        display(++x);
        console.log(score);
    });

});// end of DOM function
