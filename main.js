document
  .getElementById("overallIncomeModal")
  .addEventListener("hidden.bs.modal", () => {
    window.location.reload();
  });

function checkInput(inputID) {
  let input = document.getElementById(inputID);
  let value = input.value;
  let toolTip = document.getElementById(inputID + "ToolTip");

  if (!/^[0-9]+$/.test(value)) {
    toolTip.style.display = "block";
  } else {
    toolTip.style.display = "none";
  }
}

function calculateOverallIncome() {
  let grossIncome = document.getElementById("grossIncome").value;
  let extraIncome = document.getElementById("extraIncome").value;
  let age = Number(document.getElementById("age-select").value);
  let totalDeductions = document.getElementById("totalDeductions").value;

  if (
    isSpaces(grossIncome) ||
    isSpaces(extraIncome) ||
    isSpaces(totalDeductions)
  ) {
    alert("Please enter numbers that are non-negative and not empty.");
    return;
  }
  grossIncome = Number(grossIncome);
  extraIncome = Number(extraIncome);
  totalDeductions = Number(totalDeductions);

  if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(totalDeductions)) {
    alert("Please enter numbers that are non-negative and not empty.");
    return;
  }
  if (grossIncome < 0 || extraIncome < 0 || totalDeductions < 0) {
    alert("Please enter numbers that are non-negative and not empty.");
    return;
  }

  if (age === 0) {
    alert("Age must be selected");
    return;
  }
  if (totalDeductions > grossIncome + extraIncome) {
    alert(
      "Deductions cannot be more the netIncome (Gross Income + Extra Income)"
    );
    return;
  }
  let netIncome = grossIncome + extraIncome - totalDeductions;
  let tax = netIncome > 800000 ? calculateTax(netIncome, age) : 0;
  let overallIncome = netIncome - tax;
  overallIncome = Number(overallIncome.toFixed(2));

  const threshold = 1000000000000000000000000;
  let overallIncomeDisplay;
  if (overallIncome > threshold) {
    overallIncomeDisplay = overallIncome.toExponential();
  } else {
    overallIncomeDisplay = overallIncome.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }

  document.getElementById("overallIncome").textContent = overallIncomeDisplay;

  let myModal = new bootstrap.Modal(
    document.getElementById("overallIncomeModal")
  );
  myModal.show();
}

function calculateTax(netIncome, age) {
  switch (age) {
    case 1:
      return 0.3 * (netIncome - 800000);
    case 2:
      return 0.4 * (netIncome - 800000);

    case 3:
      return 0.1 * (netIncome - 800000);
  }
}

function isSpaces(str) {
  return str.match(/^ *$/) !== null;
}

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
