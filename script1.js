const daysArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const tune = new Audio("./ring.mp3");

let dB = [];

let snzOnOff = 0;
let snzCount = 0;

const addZero = (a) => {
  return a >= 10 ? a : "0" + a;
};

const get = (a) => {
  return document.getElementById(a);
};

const snzShow = () => {
  if (snzOnOff == 1 && snzCount < 3) {
    get("snooze").style.display = "inline-block";
  } else {
    get("snooze").style.display = "none";
  }
};

// HOURS DROPDOWN
const hrs = function (a, no) {
  for (let i = no; i > 0; i--) {
    const option = `<option value=${i}>${i}</option>`;
    a.firstElementChild.insertAdjacentHTML("afterend", option);
  }
};
const hoursSelect = get("hoursSelect");
hrs(hoursSelect, 12);

// MINUTES DROPDOWN
const mins = function (a, no) {
  for (let i = no; i >= 0; i--) {
    const option = `<option value=${i}>${i}</option>`;
    a.firstElementChild.insertAdjacentHTML("afterend", option);
  }
};
const minutesSelect = get(`minutesSelect`);
mins(minutesSelect, 59);

// DAYS DROPDOWN
const dys = function (a, no) {
  for (let i = no; i >= 0; i--) {
    const option = `<option value=${i}>${daysArr[i]}</option>`;
    a.firstElementChild.insertAdjacentHTML("afterend", option);
  }
};
const daysSelect = get(`daysSelect`);
dys(daysSelect, 6);

//
function clock() {
  const t = new Date();

  const h = t.getHours() <= 12 ? t.getHours() : t.getHours() - 12;
  const m = t.getMinutes();
  const s = t.getSeconds();
  const d = t.getDay();
  const shft = t.getHours() <= 12 ? 0 : 1;

  get("h").textContent = addZero(h);
  get("m").textContent = addZero(m);
  get("s").textContent = addZero(s);
  get("d").textContent = daysArr[d];

  if (h == dB[0] && m == dB[1] && shft == dB[2] && d == dB[3]) {
    tune.play();
    snzOnOff = 1;
  } else {
    snzOnOff = 0;
  }
  snzShow();
}
setInterval(clock, 500);

get("addBtn").addEventListener("click", function () {
  const h = get("hoursSelect").value;
  const m = get("minutesSelect").value;
  const s = get("shiftSelect").value;
  const d = get("daysSelect").value;
  if (h == "Hour" || m == "Minutes" || s == "AM/PM" || d == "Day") {
    alert("Invalid Time Format");
  } else {
    dB.push(h, m, s, d);

    get("reset").style.display = "inline-block";
    get("addBtn").style.display = "none";
  }
});

get("reset").addEventListener("click", function () {
  dB = [];

  get("reset").style.display = "none";
  get("addBtn").style.display = "inline-block";
});

get("snooze").addEventListener("click", function () {
  dB[0] = Number(dB[0]);
  dB[1] = Number(dB[1]);
  if (dB[1] <= 54) {
    dB[1] = dB[1] + 1;
  } else if ((dB[1] = 55)) {
    dB[0]++;
    dB[1] = 0;
  } else {
    dB[0]++;
    dB[1] = 5 - (60 - dB[0]);
  }
  snzCount++;
});
