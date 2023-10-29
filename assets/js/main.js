const periodInput = document.getElementById('period-input');
const periodSlider = document.getElementById('period-slider');
const creditInput = document.getElementById('credit-input');
const creditSlider = document.getElementById('credit-slider');
const alertMsg = document.getElementsByClassName('alert-msg');
const calcRes = document.getElementsByClassName('calc-res');
const btn = document.getElementsByClassName('btn')[0];
const ir = 2.2;

const creditAlert =
  'Сума кредиту повинна бути в діапазоні від 1000 до 50000 грн';
const periodAlert = 'Період повинен бути в діапазоні від 10 до 60 днів';

// Крінж-код, треба якось фіксити на нормальний
creditInput.oninput = function () {
  creditSlider.value = this.value;
  writeRes();
};

creditSlider.oninput = function () {
  creditInput.value = this.value;
  writeRes();
};

periodInput.oninput = function () {
  periodSlider.value = this.value;
  writeRes();
};

periodSlider.oninput = function () {
  periodInput.value = this.value;
  writeRes();
};

const calcDaily = (la, rp) => {
  let dr = (la + la * (ir / 100) * rp) / rp;
  calcRes[0].innerHTML = `Денна сума погашень (DR): ${dr.toFixed(2)} `;
  return dr;
};

const calcFull = (la, rp) => {
  let tr = calcDaily(la, rp) * rp;
  return tr;
};

const isValid = () => {
  let isCreditValid = true;
  let isPeriodValid = true;
  if (creditInput.value >= 1000 && creditInput.value <= 50000) {
    alertMsg[0].innerHTML = null;
    isCreditValid = true;
  } else {
    alertMsg[0].innerHTML = creditAlert;
    isCreditValid = false;
  }

  if (periodInput.value >= 7 && periodInput.value <= 60) {
    alertMsg[1].innerHTML = null;
    isPeriodValid = true;
  } else {
    alertMsg[1].innerHTML = periodAlert;
    isPeriodValid = false;
  }
  if (isCreditValid && isPeriodValid) return true;
  else return false;
};

const writeRes = () => {
  if (!isValid()) {
    btn.disabled = true;
    btn.classList.add('inactive');
    calcRes[0].innerHTML =
      'Введіть допустимі значення для отримання результатів';
    calcRes[1].innerHTML = null;
    return;
  } else {
    btn.disabled = false;
    btn.classList.remove('inactive');
    let tr = calcFull(+creditInput.value, +periodInput.value);
    calcRes.innerHTML =
      calcRes[1].innerHTML = `Сума повного погашення (TR): ${tr.toFixed(2)}`;
  }
};
