const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

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
  const grossIncome = Number(document.getElementById("grossIncome").value);
  const extraIncome = Number(document.getElementById("extraIncome").value);
  const age = Number(document.getElementById("age-select").value);
  const totalDeductions = Number(
    document.getElementById("totalDeductions").value
  );

  if (age === 0) {
    alert("Age must be selected");
    return;
  } else {
    let netIncome = grossIncome + extraIncome - totalDeductions;
    let tax = netIncome > 800000 ? calculateTax(netIncome, age) : 0;

    let overallIncome = netIncome - tax;

    document.getElementById("overallIncome").textContent = overallIncome;
    var myModal = new bootstrap.Modal(
      document.getElementById("overallIncomeModal")
    );
    myModal.show();
  }
}

function calculateTax(taxableIncome, age) {
  switch (age) {
    case 1:
      //age is less than 40 so tax 30%
      return 0.3 * (taxableIncome - 800000);
    case 2:
      //age is age ≥ 40 but < 60 so tax 40%
      return 0.4 * (taxableIncome - 800000);

    case 3:
      //age is greater than 60 so tax 10%
      return 0.1 * (taxableIncome - 800000);

    default:
      //no age selected show error
      return -1;
  }
}

// 1) 8 lakh ke upar hai kya dekho Gross Annual Income + Extra Income - Deductions
// 2) 8 lakh ke kitna upar hai => () - 8
// 3) () - 8 * %tax = tax
// Overall income = Gross_Annual_Income + Extra_Income-deductions - tax
