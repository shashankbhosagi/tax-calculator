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
