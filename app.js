const addExpenseBtn = document.getElementById("addExpense");

//   get JSON object from the local storage
const expenseInLocal = JSON.parse(localStorage.getItem("expenseInLocal")) || [];

addExpenseBtn.addEventListener("click", function (e) {
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const name = document.getElementById("name").value;
  const amount = document.getElementById("amount").value;

  e.preventDefault();
  if (
    type === "" ||
    date === "" ||
    name.length === 0 ||
    Number.isNaN(parseFloat(amount))
  ) {
    alert("Please enter the fields");
    return;
  }

  const expense = {
    type,
    date,
    name,
    amount,
    id: expenseInLocal.length + 1,
  };

  expenseInLocal.push(expense);
  //   set JSON object to the local storage
  localStorage.setItem("expenseInLocal", JSON.stringify(expenseInLocal));
  console.log(expenseInLocal.length);
  document.getElementById("expenseForm").reset();
  showExpenses();
});

console.log(expenseInLocal.length);

function showExpenses() {
  const tableData = document.getElementById("tableData");

  tableData.innerHTML = "";

  for (let i = 0; i < expenseInLocal.length; i++) {
    tableData.appendChild(createDataRow(expenseInLocal[i]));
  }
}

function createDataRow(expense) {
  const expenseRowEl = document.createElement("tr");
  const expenseTypeEl = document.createElement("td");
  expenseTypeEl.textContent = expense.type;
  expenseRowEl.appendChild(expenseTypeEl);
  const expenseNameEl = document.createElement("td");
  expenseNameEl.textContent = expense.name;
  expenseRowEl.appendChild(expenseNameEl);
  const expenseDateEl = document.createElement("td");
  expenseDateEl.textContent = expense.date;
  expenseRowEl.appendChild(expenseDateEl);
  const expenseAmountEl = document.createElement("td");
  expenseAmountEl.textContent = "$ " + expense.amount;
  expenseRowEl.appendChild(expenseAmountEl);
  const deleteOptionEl = document.createElement("td");
  const deleteAnchorEl = document.createElement("a");
  deleteAnchorEl.className = "deleteButton";
  deleteAnchorEl.textContent = "Delete";
  deleteOptionEl.appendChild(deleteAnchorEl);
  expenseRowEl.appendChild(deleteOptionEl);

  deleteAnchorEl.addEventListener("click", function () {
    deleteExpense(expense.id);
    localStorage.setItem("expenseInLocal", JSON.stringify(expenseInLocal));
  });
  return expenseRowEl;
}

function deleteExpense(id) {
  // loop throught the array to see which id matches
  for (let i = 0; i < expenseInLocal.length; i++) {
    if (expenseInLocal[i].id === id) {
      // remove that id
      expenseInLocal.splice(i, 1);
    }
  }
  showExpenses();
}
showExpenses();
