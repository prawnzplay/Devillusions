let currentQuizIndex = 0;
const quizIds = ["angel-vs-devil","aol-screenname"];

function loadQuiz(quizId) {
  fetch(`quizzes/${quizId}.json`)
    .then(response => response.json())
    .then(data => renderQuiz(data))
    .catch(error => console.error("Failed to load quiz:", error));
}

function renderQuiz(quiz) {
  const container = document.getElementById("quiz-area");
  container.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = quiz.title;
  container.appendChild(title);

  const form = document.createElement("form");
  form.className = "quiz-form";

  quiz.questions.forEach((q, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${q.text}`;
    form.appendChild(p);

    q.options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${index}" value="${opt.value}"> ${opt.text}`;
      form.appendChild(label);
      form.appendChild(document.createElement("br"));
    });

    form.appendChild(document.createElement("br"));
  });

  const submit = document.createElement("button");
  submit.textContent = "Get My Result";
  submit.type = "submit";
  form.appendChild(submit);

  const resultPara = document.createElement("p");
  resultPara.className = "quiz-result";
  resultPara.style.display = "none";
  form.appendChild(resultPara);

  form.addEventListener("submit", e => {
    e.preventDefault();
    const answers = new FormData(form);

    // Validate all questions answered
    let allAnswered = true;
    for (let i = 0; i < quiz.questions.length; i++) {
      if (!answers.get(`q${i}`)) {
        allAnswered = false;
        break;
      }
    }

    if (!allAnswered) {
      resultPara.textContent = "⚠️ Ummm.. you forgot something ⚠️";
      resultPara.style.display = "block";
      return;
    }

    const counts = {};
    for (let pair of answers.entries()) {
      counts[pair[1]] = (counts[pair[1]] || 0) + 1;
    }

    // Sort types by most selected
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topTypes = sorted.map(entry => entry[0]);
    const comboKey = topTypes.slice(0, 3).sort().join("+");

    let result = quiz.results[comboKey];

    if (!result && topTypes.length > 1) {
      const comboKey2 = topTypes.slice(0, 2).sort().join("+");
      result = quiz.results[comboKey2];
    }

    if (!result) {
      result = quiz.results[topTypes[0]];
    }

    resultPara.textContent = result;
    resultPara.style.display = "block";
  });

  container.appendChild(form);
}

function loadNextQuiz() {
  currentQuizIndex = (currentQuizIndex + 1) % quizIds.length;
  loadQuiz(quizIds[currentQuizIndex]);
}

function loadPreviousQuiz() {
  currentQuizIndex = (currentQuizIndex - 1 + quizIds.length) % quizIds.length;
  loadQuiz(quizIds[currentQuizIndex]);
}
