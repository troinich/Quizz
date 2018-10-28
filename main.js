
    document.addEventListener('DOMContentLoaded', function () {
        var quizz;
        var score = 0;
        var x = 0;

        function display(x) {
            if (x >= 0 && x < quizz.results.length) {
                document.getElementById('question1').style.display = 'block';
                document.getElementById('trues').style.display = 'block';
                document.getElementById('falses').style.display = 'block';

                document.getElementById("question1").innerHTML = quizz.results[x].question;
                document.getElementById("trues").innerHTML = quizz.results[x].correct_answer;
                document.getElementById("falses").innerHTML = quizz.results[x].incorrect_answers[0];

            }//end if statement

            else {
                document.body.innerHTML = "THE END. YOUR SCORE is " + score + " of " + quizz.results.length;
                document.body.setAttribute("style", "width: 100%; margin:0 auto; font-weight:bold; font-size: 100px; color: white; background-image: url('https://res.cloudinary.com/simpleview/image/upload/crm/poconos/Holiday-Independence-Day-Fireworks-Lake-Wallenpaupack-2-PoconoMtns01_e6c78873-9f82-6be5-8281f3b4afedd280.jpg');background-repeat: no-repeat;     background-size:cover;");
            }

        };

allowedDiff = ["easy", "medium", "hard"];
//var allErrors = document.getElementsByClassName("error");
//var difError = allErrors[0];
//var defDiff = "easy";
//function ifDif () {
//var ID = document.getElementById('difficulty').value;
/* ID = ID.toLowerCase();
if (allowedDiff.includes(ID) === true) {
    console.log("In array")
    return ID}
    else {return defDiff}; //difError.style.display = "block" ||);
}; */


var val = document.getElementById('difficulty').value;
val = val.toLowerCase();
function selectedOrDefault(val, dflt) {
    if (val == "") {
        return dflt
    }
    else {
        val = val.toLowerCase().trim();
        return (allowedDiff.includes(val) ? val:dflt);
    }
}

        function setComplex() {
            var difficulty = selectedOrDefault(
                document.getElementById("difficulty").value, 'easy')

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
                    x=0;
                    display(x);
                }
            }

            var difPath = "https://opentdb.com/api.php?amount=" + quantity + "&category=" + subject + "&difficulty=" + difficulty + "&type=boolean";
            xhr.open('GET', difPath, true);
            xhr.responseType = 'text';
            xhr.send();

            //display(x)
        }

        document.getElementById("go").addEventListener("click", () => {
            document.getElementById("go").disabled = true;
            document.getElementById("go").style.backgroundColor = "grey";
            setComplex();
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
