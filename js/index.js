"use strict";

const navList = document.querySelector(".navContainer__buttons");
const hamburgerMenu = document.querySelector(".navContainer__hamburger");

hamburgerMenu.addEventListener("click", function () {
  navList.classList.toggle("navContainer__buttons--active");
  hamburgerMenu.classList.toggle("navContainer__hamburger--active");
});

const incomesArray = [];
//const incomesArrayValues = [];

const inputIncomeName = document.querySelector("#inputIncomeText");
const inputIncomeAmount = document.querySelector("#inputIncomeSum");
const inputIncomeButton = document.querySelector("#inputIncomeButton");
const listOfIncomes = document.querySelector("#balanceTableIncomesList");

inputIncomeButton.addEventListener("click", incomeButtonHandleClick);

function incomeButtonHandleClick(event) {
  event.preventDefault();
  if (inputIncomeAmount.value <= 0) {
    clearIncomeForm();
    return;
  }
  if (inputIncomeAmount.value.length === 0) {
    clearIncomeForm();
    return;
  }
  if (inputIncomeName.value.length === 0) {
    clearIncomeForm();
    return;
  }
  const incomeName = inputIncomeName.value;
  const incomeAmount = inputIncomeAmount.value;
  const incomeID = `incomeItem-${incomesArray.length}`;
  incomesArray.push({
    incomeName: incomeName,
    incomeAmount: incomeAmount,
    incomeID: incomeID,
  });
  updateListOfIncomes();
  const sumOfIncomes = updateSumOfIncomes().toFixed(2);
  balanceTableIncomesSummary.innerHTML = "";
  const sumOfIncomesH1 = document.createElement("h1");
  sumOfIncomesH1.innerText = `SUMA PRZYCHODÓW: ${sumOfIncomes} ${currency}`;
  sumOfIncomesH1.classList.add("balanceTable__incomes--summary");
  sumOfIncomesH1.id = "incomesSummary";
  balanceTableIncomesSummary.appendChild(sumOfIncomesH1);
  updateBalanceSheetResult();
  clearIncomeForm();
}
function updateSumOfIncomes() {
  const incomesArrayValues = updateIncomesArrayValue();
  const sumOfIncomes = incomesArrayValues.reduce((acc, number) => {
    return acc + number;
  }, 0);

  return sumOfIncomes;
}

function clearIncomeForm() {
  inputIncomeName.value = "";
  inputIncomeAmount.value = "";
}
function updateListOfIncomes() {
  listOfIncomes.innerHTML = "";
  incomesArray.forEach((income, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<div class = "balanceTable__incomes--list"><p></p><button class = "button--edit">EDYTUJ</button><button class = "button--warrning">USUŃ</button></div>`;
    listOfIncomes.appendChild(item);

    const incomeItem = listOfIncomes.querySelectorAll("p");
    incomeItem[
      index
    ].textContent = `${income.incomeName} - ${income.incomeAmount} ${currency}`;
    incomeItem[index].id = `${income.incomeID}`;

    const buttonEdit = listOfIncomes.querySelectorAll(".button--edit");
    buttonEdit[index].id = "incomeButtonEdit-" + index;

    const buttonDelete = listOfIncomes.querySelectorAll(".button--warrning");
    buttonDelete[index].id = "incomeButtonDelete-" + index;
  });
}
function updateIncomesArrayValue() {
  const incomesArrayValues = [];
  incomesArray.forEach((income, index) => {
    const incomeAsNumber = parseFloat(income.incomeAmount);

    incomesArrayValues.push(incomeAsNumber);
  });
  return incomesArrayValues;
}

const inputExpenseName = document.querySelector("#inputExpenseText");
const inputExpenseAmount = document.querySelector("#inputExpenseSum");
const inputExpenseButton = document.querySelector("#inputExpenseButton");
const listOfExpenses = document.querySelector("#balanceTableExpensesList");
const expensesArray = [];
//const expensesArrayValues = [];

inputExpenseButton.addEventListener("click", expenseButtonHandleClick);

function expenseButtonHandleClick(event) {
  event.preventDefault();
  if (inputExpenseAmount.value < 0) {
    clearExpenseForm();
    return;
  }
  if (inputExpenseAmount.value.length === 0) {
    clearExpenseForm();
    return;
  }
  if (inputExpenseName.value.length === 0) {
    clearExpenseForm();
    return;
  }

  const expenseName = inputExpenseName.value;
  const expenseAmount = inputExpenseAmount.value;
  const expenseID = `expenseItem-${expensesArray.length}`;
  expensesArray.push({
    expenseName: expenseName,
    expenseAmount: expenseAmount,
    expenseID: expenseID,
  });
  updateListOfExpenses();
  const sumOfExpenses = updateSumOfExpenses().toFixed(2);
  balanceTableExpensesSummary.innerHTML = "";
  const sumOfExpensesH1 = document.createElement("h1");
  sumOfExpensesH1.innerText = `SUMA WYDATKÓW: ${sumOfExpenses} ${currency}`;
  sumOfExpensesH1.classList.add("balanceTable__expenses--summary");
  sumOfExpensesH1.id = "expensesSummary";
  balanceTableExpensesSummary.appendChild(sumOfExpensesH1);
  updateBalanceSheetResult();
  clearExpenseForm();
}

function clearExpenseForm() {
  inputExpenseName.value = "";
  inputExpenseAmount.value = "";
}
function updateListOfExpenses() {
  listOfExpenses.innerHTML = "";
  expensesArray.forEach((expense, index) => {
    const item = document.createElement("li");
    item.innerHTML = `<div class = "balanceTable__expenses--list"><p></p><button class = "button--edit">EDYTUJ</button><button class = "button--warrning">USUŃ</button></div>`;
    listOfExpenses.appendChild(item);

    const expenseItem = listOfExpenses.querySelectorAll("p");
    expenseItem[
      index
    ].textContent = `${expense.expenseName} - ${expense.expenseAmount} ${currency}`;
    expenseItem[index].id = `${expense.expenseID}`;

    const buttonEdit = listOfExpenses.querySelectorAll(".button--edit");
    buttonEdit[index].id = "expenseButtonEdit-" + index;

    const buttonDelete = listOfExpenses.querySelectorAll(".button--warrning");
    buttonDelete[index].id = "expenseButtonDelete-" + index;
  });
}
function updateExpensesArrayValue() {
  const expensesArrayValues = [];
  expensesArray.forEach((expense, index) => {
    const expenseAsNumber = parseFloat(expense.expenseAmount);
    expensesArrayValues.push(expenseAsNumber);
  });
  return expensesArrayValues;
}
function updateSumOfExpenses() {
  const expensesArrayValues = updateExpensesArrayValue();
  const sumOfExpenses = expensesArrayValues.reduce((acc, number) => {
    return acc + number;
  }, 0);

  return sumOfExpenses;
}

const balanceTableIncomesSummary = document.querySelector("#incomesSummary");
const balanceTableExpensesSummary = document.querySelector("#expensesSummary");
const balanceSheetResultField = document.querySelector("#balanceSheetResult");
const neutralBalanceText = "BILANS  WYNOSI  ZERO";
const positiveBalanceText = "BILANS DODATNI MOŻESZ JESZCZE WYDAĆ:";
const negativeBalanceText = "BILANS UJEMNY JESTEŚ NA MINUSIE:";
const currency = "zł";

function updateBalanceSheetResult() {
  const sumOfIncomes = updateSumOfIncomes();
  const sumOfExpenses = updateSumOfExpenses();
  const balanceSheetResult = (sumOfIncomes - sumOfExpenses).toFixed(2);
  balanceSheetResultField.innerHTML = "";
  let balanceIndex = "";
  if (balanceSheetResult == 0) {
    balanceIndex = "balance";
  } else if (balanceSheetResult > 0) {
    balanceIndex = "positive";
  } else {
    balanceIndex = "negative";
  }

  let summaryText = " ";
  switch (balanceIndex) {
    case "balance":
      summaryText = `${neutralBalanceText}`;
      break;
    case "positive":
      summaryText = `${positiveBalanceText} ${balanceSheetResult} ${currency}`;
      break;
    case "negative":
      summaryText = `${negativeBalanceText} ${balanceSheetResult} ${currency}`;
      break;
    default:
      summaryText = "WPROWADŹ POPRAWNE DANE";
  }

  const balanceSheetResultH1 = document.createElement("h1");
  balanceSheetResultH1.innerText = summaryText;
  balanceSheetResultH1.classList.add("balanceSheetResult");
  balanceSheetResultField.appendChild(balanceSheetResultH1);
}
