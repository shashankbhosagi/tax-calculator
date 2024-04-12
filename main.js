document
  .getElementById("overallIncomeModal")
  .addEventListener("hidden.bs.modal", () => {
    window.location.reload();
  });

function triggerToolTip(inputID) {
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
  const nonTaxableIncome = 800000;

  if (isEmptyInput(grossIncome, extraIncome, totalDeductions)) {
    alert("Input cannot be left empty");
    return;
  }
  grossIncome = Number(grossIncome);
  extraIncome = Number(extraIncome);
  totalDeductions = Number(totalDeductions);

  if (isNonNegativeInput(grossIncome, extraIncome, totalDeductions)) {
    alert("Please enter numbers that are non-negative and not empty");
  }

  if (inputChecks(grossIncome, extraIncome, age, totalDeductions)) {
    return;
  }

  let netIncome = grossIncome + extraIncome - totalDeductions;
  let tax =
    netIncome > nonTaxableIncome
      ? calculateTax(netIncome, age, nonTaxableIncome)
      : 0;
  let overallIncome = netIncome - tax;
  overallIncome = Number(overallIncome.toFixed(2));

  const overallIncomeDisplay = formatOverallIncome(overallIncome);

  document.getElementById("overallIncome").textContent = overallIncomeDisplay;

  showModal();
}

function showModal() {
  let myModal = new bootstrap.Modal(
    document.getElementById("overallIncomeModal")
  );
  myModal.show();
}

function isEmptyInput(grossIncome, extraIncome, totalDeductions) {
  if (
    isSpaces(grossIncome) ||
    isSpaces(extraIncome) ||
    isSpaces(totalDeductions)
  ) {
    return true;
  }
  return false;
}

function isNonNegativeInput(grossIncome, extraIncome, totalDeductions) {
  if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(totalDeductions)) {
    alert("Please enter numbers that are non-negative and not empty.");
    return true;
  }
  if (grossIncome < 0 || extraIncome < 0 || totalDeductions < 0) {
    alert("Please enter numbers that are non-negative and not empty.");
    return true;
  }

  return false;
}

function inputChecks(grossIncome, extraIncome, age, totalDeductions) {
  if (age === 0) {
    alert("Age must be selected");
    return true;
  }
  if (totalDeductions > grossIncome + extraIncome) {
    alert(
      "Deductions cannot be more the netIncome (Gross Income + Extra Income)"
    );
    return true;
  }
  return false;
}

function calculateTax(netIncome, age, nonTaxableIncome) {
  switch (age) {
    case 1:
      return 0.3 * (netIncome - nonTaxableIncome);
    case 2:
      return 0.4 * (netIncome - nonTaxableIncome);
    case 3:
      return 0.1 * (netIncome - nonTaxableIncome);
  }
}

function isSpaces(str) {
  return str.match(/^ *$/) !== null;
}

//
function formatOverallIncome(overallIncome) {
  const threshold = 1000000000000000000000000;
  if (overallIncome > threshold) {
    return overallIncome.toExponential();
  } else {
    return overallIncome.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }
}

//For BootStrap ToolTip to work
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
