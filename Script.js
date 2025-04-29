const form = document.querySelector("#meuFormulario");
const log = document.querySelector("#log");
const verificarBtn = document.querySelector("#verificarBtn");
const dateInput = document.querySelector("#dateInput");
const resultadoCor = document.querySelector("#resultadoCor");
const calendarDiv = document.querySelector(".calendar");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const daysContainer = document.getElementById("days");
const obs = document.getElementById("obs");

let useEvenForBlue = true; 
let selectedDay = null;
let selectedMonth = null;
let selectedYear = null;

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Oculta o calendário no início
calendarDiv.style.display = "none";

verificarBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  let valor = "";

  for (const entry of data) {
    valor = entry[1];
  }

  if (valor === "1") {
    useEvenForBlue = true;
  } else if (valor === "0") {
    useEvenForBlue = false;
  } else {
    log.innerText = "Selecione uma opção!";
    log.style.color = "orange";
    return;
  }

  if (dateInput.value) {
    const date = new Date(dateInput.value);
    selectedDay = date.getDate();
    selectedMonth = date.getMonth();
    selectedYear = date.getFullYear();
    currentMonth = selectedMonth;
    currentYear = selectedYear;

    selectedDay = selectedDay + 1;
    console.log("selectedDay:");
    console.log(selectedDay);

    // Agora mostramos se seria azul ou branco
    if ((selectedDay % 2 === 1 && useEvenForBlue) || (selectedDay % 2 === 0 && !useEvenForBlue)) {
      resultadoCor.innerText = "Esse dia você não irá trabalhar";
      resultadoCor.style.color = "blue";
    } else {
      resultadoCor.innerText = "Esse dia você irá trabalhar";
      resultadoCor.style.color = "black";
    }

    // Agora exibe o calendário
    calendarDiv.style.display = "block";
    renderCalendar();
  } else {
    resultadoCor.innerText = "Selecione uma data!";
    resultadoCor.style.color = "red";
  }
});

function renderCalendar() {
  daysContainer.innerHTML = "";

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  monthYear.innerText = `${monthNames[currentMonth]} ${currentYear}`;
  obs.innerText = "obs: os dias em azuis são os que você trabalha, os em branco você estará de folga";

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    daysContainer.appendChild(emptyDiv);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;

    if (
      selectedDay !== null &&
      day === selectedDay &&
      currentMonth === selectedMonth &&
      currentYear === selectedYear
    ) {
      dayDiv.style.backgroundColor = "lightgreen";
    } else if ((day % 2 === 0 && useEvenForBlue) || (day % 2 === 1 && !useEvenForBlue)) {
      dayDiv.style.backgroundColor = "lightblue";
    } else {
      dayDiv.style.backgroundColor = "white";
    }

    daysContainer.appendChild(dayDiv);
  }
}

// Botões de navegar mês
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});
