// questions and correct answers

var familyMembers = [
    {"name": "Elliot",
    "src": "img/brother.jpg",
    "relation": "Brother",
    "selectList": ["Cousin", "Brother", "Uncle", "Unknown"]},
    {"name": "Leon",
    "src": "img/nephew2.jpg",
    "relation": "Nephew",
    "selectList": ["Grandchild", "Nephew", "Son", "Unknown"]},
    {"name": "Tyrell",
    "src": "img/grandchild2.jpg",
    "relation": "Grandchild",
    "selectList": ["Grandnephew", "Nephew", "Grandchild", "Unknown"]},
    {"name": "Angela",
    "src": "img/neice1.jpg",
    "relation": "Neice",
    "selectList": ["Grandchild", "Neice", "Daughter", "Unknown"]},
    {"name": "Shayla",
    "src": "img/sister.jpg",
    "relation": "Sister",
    "selectList": ["Aunt", "Sister", "Cousin", "Unknown"]},
    {"name": "Joanna",
    "src": "img/neice2.jpg",
    "relation": "Neice",
    "selectList": ["Daughter", "Grandchild", "Neice", "Unknown"]},
    {"name": "Krista",
    "src": "img/neice3.jpg",
    "relation": "Neice",
    "selectList": ["Daughter", "Grandchild", "Neice", "Unknown"]},
    {"name": "Darlene",
    "src": "img/grandchild1.jpg",
    "relation": "Grandchild",
    "selectList": ["Grandchild", "Grandneice", "Neice", "Unknown"]},
    {"name": "Phillip",
    "src": "img/nephew1.jpg",
    "relation": "Nephew",
    "selectList": ["Grandchild", "Son", "Nephew", "Unknown"]},
  ]

  var curPicture = 0;
  
  var wrongAnswers = [];
  var rightAnswers = [];
  var skippedAnswers = [];
  $(document).ready(function() {
    $('#container').on('click', "#quizStart", function(){
          $('#question').html("<p style='font-size: 22px; margin: 2%;'>What is your relation to this person?</p><select name='relation' style='margin: 0 auto; display: block; font-size: 22px' id='relation'></select><button class='btn btn-success' style='margin-left: 35%; width: 30%; font-size: 30px; margin-top: 25%;' id=\"submit\">Submit</button>")

          familyMembersSelect = document.getElementById("relation");
          var firstOpt = document.createElement('option');
          firstOpt.value = "";
          firstOpt.innerHTML = "Select your relation to this person here";
          firstOpt.disabled = "disabled";
          firstOpt.selected = "selected";
          firstOpt.style.fontSize = "22px";
          familyMembersSelect.appendChild(firstOpt);
            for (var i = 0; i<familyMembers[curPicture]["selectList"].length; i++){
                var opt = document.createElement('option');
                opt.value = familyMembers[curPicture]["selectList"][i];
                opt.innerHTML = familyMembers[curPicture]["selectList"][i];
                opt.style.fontSize = "22px";
                familyMembersSelect.appendChild(opt);
        }
        });

    $('#container').on('click', "#submit", function() {
        var familyMembersSelectList = document.getElementById('relation');
        var answer = familyMembersSelectList.options[familyMembersSelectList.selectedIndex].value;
        if(answer == familyMembers[curPicture]["relation"]){
            if(curPicture == familyMembers.length - 1){
                $('#question').append("<p style='font-size: 22px; margin: 2%; color: green;'>Congrations you remembered " + familyMembers[curPicture]["name"] + " is your " + familyMembers[curPicture]["relation"]  + "!!</p><p style='font-size: 22px; margin: 2%;'>Click the Finish button under " + familyMembers[curPicture]["name"] + "'s picture to view the summary of your quizzes</p>");
            }
            else{
                $('#question').append("<p style='font-size: 22px; margin: 2%; color: green;'>Congrations you remembered " + familyMembers[curPicture]["name"] + " is your " + familyMembers[curPicture]["relation"]  + "!!</p><p style='font-size: 22px; margin: 2%;'>Click the Next button under " + familyMembers[curPicture]["name"] + "'s picture to see the next family member</p>");
            }

            rightAnswers.push(curPicture);
        }
        else{
            if(curPicture == familyMembers.length - 1){
                $('#question').append("<p style='font-size: 22px; margin: 2%;'>Unfortunately you forgot that " + familyMembers[curPicture]["name"] + " is your " + familyMembers[curPicture]["relation"] + "</p><p style='font-size: 22px; margin: 2%;'>Click the Finish button under " + familyMembers[curPicture]["name"] + "'s picture to view the summary of your quizzes</p>");
            }
            else{
                $('#question').append("<p style='font-size: 22px; margin: 2%;'>Unfortunately you forgot that " + familyMembers[curPicture]["name"] + " is your " + familyMembers[curPicture]["relation"] + "</p><p style='font-size: 22px; margin: 2%;'>Click the Next button under " + familyMembers[curPicture]["name"] + "'s picture to see the next family member</p>");
            }
            
            wrongAnswers.push(curPicture);
        }
        if(curPicture == familyMembers.length - 1){
            document.getElementById("next").innerText = "Finish";
        }
        else{
            document.getElementById("next").innerText = "Next";
        }
        var submitButton = document.getElementById("submit");
        submitButton.remove();
        document.getElementById("relation").disabled = "disabled";
    });

    $('#container').on('click', "#next", function(){
        curPicture++;
        if(wrongAnswers.length + rightAnswers.length + skippedAnswers.length != curPicture){
            skippedAnswers.push(curPicture);
        }

        if(curPicture == familyMembers.length){
            var rememberNote = "";
            for(i=0; i<wrongAnswers.length; i++){
                if(i==0){
                    rememberNote += "<p>Things to keep in mind</p>"
                }
                rememberNote += "<p>" + familyMembers[wrongAnswers[i]]["name"] + " is your " + familyMembers[wrongAnswers[i]]["relation"] + "</p>";
            }
            if((wrongAnswers.length == 0) && (skippedAnswers.length == 0)){
                remembernote = "<p>Congratulations you got perfect!</p>";
            }
            else if((wrongAnswers.length == 0) && (skippedAnswers.length > 0) && (rightAnswers.length > 0)){
                rememberNote = "<p>Congratulations you got perfect on the questions you attempted. Give the ones that you skipped a go in your next session.</p>";
            }
            else if((wrongAnswers.length == 0) && (rightAnswers.length == 0)){
                rememberNote = "<p>Try to identify a family member next time</p>"
            }
        
            var answeredQuestions = rightAnswers.length + wrongAnswers.length;
            $('#container').html("<h1 style='text-align: center'>Summary</h1><p style='font-size: 22px;'>You got " + rightAnswers.length + "/" + answeredQuestions + " family member relations correct and skipped " + skippedAnswers.length + "</p>" + rememberNote + "<div class='row col-lg-12'><a class='btn btn-primary' href='https://www.alzheimer.ca/en' style='margin: auto; display: block'>Learn More about dementia</a></div><div class='row col-lg-12'><button class='btn btn-primary' style='margin: auto; display: block; margin-top: 0.5%' id='tryAgain'>Try Again</button></div>");
        }
        else{
        document.getElementById("picture").src = familyMembers[curPicture]["src"];
        document.getElementById("name").innerText = familyMembers[curPicture]["name"];
        $('#question').html("<p style='font-size: 22px; margin: 2%;'>Select \"Start Quiz\" to test your memory of the relation to this person</p><button class='btn btn-success' style='margin-left: 35%; width: 30%; font-size: 30px; margin-top: 5%;' id='quizStart'>Start Quiz</button>")
        if(curPicture == familyMembers.length - 1)
            document.getElementById("next").innerText = "Skip and Finish";
        else{
            document.getElementById("next").innerText = "Skip";
        }
    }
    });
    $("#container").on('click', '#tryAgain', function() {
        curPicture = 0;
        wrongAnswers = [];
        skippedAnswers = [];
        rightAnswers = [];
        $('#container').html("<div class='row'><div class='col-lg-6'><img class='col-lg-12' style='padding: 0%' src='img/brother.jpg' id='picture'><h1 id='name'>Elliot</h1><div class='row' style='margin-left: 7.5%' id='nextButton'><button class='col-lg-5 btn btn-primary' style='margin: 0.25%; margin-left: 24%; width: 30%' id='next'>Skip</button></div></div><div class='col-lg-6' style='padding: 0%;' id='question'><p style='font-size: 22px; margin: 2%;'>Select \"Start Quiz\" to test your memory of the relation to this person</p><button class='btn btn-success' style='margin-left: 35%; width: 30%; font-size: 30px; margin-top: 5%;' id='quizStart'>Start Quiz</button></div></div>")
    })
  });
