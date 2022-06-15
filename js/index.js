console.log("--script loaded--");

// Writing Unique IDs to each anwer
var subjects = document.querySelectorAll(".subject");

for (i = 0, n = subjects.length; i < n; i++) {
  var subjectName = subjects[i].getAttribute("id");
  var answers = document.querySelectorAll(`#${subjectName} .subject__answer`);

  for (j = 0, k = answers.length; j < k; j++) {
    answers[j].setAttribute("id", `${subjectName}-answer-${j + 1}`);
    // writes question numbers for each answer
    answers[j].querySelector(".subject__question-no").textContent = j + 1 + ".";
  }
}

// Implementing to nav__goto functionality
var navBtns = document.querySelectorAll(".nav__goto-btn");
var navInputs = document.querySelectorAll(".nav__goto-input");

for (i = 0, n = navBtns.length; i < n; i++) {
  navBtns[i].addEventListener("click", function (event) {
    locateAnswer(event);
  });

  navInputs[i].addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      locateAnswer(event);
    }
  });
}

function locateAnswer(event) {
  //getting subject name
  var subjectName = event.target.closest(".subject").getAttribute("id");

  //some validation check + functionality
  var answerNumber = Number(
    document.querySelector(`#${subjectName} .nav__goto-input`).value
  );
  var availableAnswers = document.querySelectorAll(
    `#${subjectName} .subject__answer`
  ).length;

  if (availableAnswers > 0 && answerNumber > 0) {
    document.querySelector(".landing").classList.add("display-none");
    document.querySelector(`#${subjectName}`).classList.add("display-initial");
    if (answerNumber > availableAnswers) {
      location.replace(`#${subjectName}-answer-${availableAnswers}`);
    } else {
      location.replace(`#${subjectName}-answer-${answerNumber}`);
    }
  }
}

// Removing the display classes when site changes to root url.
window.addEventListener("hashchange", function () {
  if (location.hash === "") {
    document.querySelector(".landing").classList.remove("display-none");
    for (i = 0, n = subjects.length; i < n; i++) {
      subjects[i].classList.remove("display-initial");
    }
  }
});

//Implementing the nav__top functionality
var navTops = document.querySelectorAll(".nav__top");

for (i = 0, n = navTops.length; i < n; i++) {
  navTops[i].addEventListener("click", function (event) {
    //getting subject name
    var subjectName = event.target.closest(".subject").getAttribute("id");

    location.replace(`#${subjectName}`);
  });
}
