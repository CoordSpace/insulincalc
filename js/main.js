window.onload=function(){

  // after page load, grab all the constants from the page's cookies
  // if any of them are not-present, run the lockdown function and quit out
  if(a = getCookie("targetBloodSugar")) {
    document.constants.targetBloodSugar.value = a;
  }
  else {
    initial_alert();
    return;
  }
  if(b = getCookie("correctionFactor")) {
    document.constants.correctionFactor.value = b;
  }
  else {
    initial_alert();
    return;
  }
  if(c = getCookie("insulinCarbRatio")) {
    document.constants.insulinCarbRatio.value = c;
  }
  else {
    initial_alert();
    return;
  }
};

// If the settings values are not present, we need to lock the calc form inputs
// alert the user and direct their attention to the bottom of the page.
function initial_alert(){
  // disable all the top form elements
  document.getElementById("input_set").disabled = true;
  // make the red alert message become visible
  document.getElementById("alert").classList.remove("hidden");
  // make the bottom settings panel red to make the eye follow from the red
  // error alert message
  document.getElementById("settings").className = "panel-danger";
}

function calculate_units (form) {
  // get all the needed variables from the input form
  var currentBloodSugar = form.currentBloodSugar.value;
  var mealCarbs = form.mealCarbs.value;

  // get all the constants from the settings area
  var targetBloodSugar = document.constants.targetBloodSugar.value;
  var correctionFactor = document.constants.correctionFactor.value;
  var insulinCarbRatio = document.constants.insulinCarbRatio.value;

  // calculate the units needed for a meal
  mealUnits = mealCarbs / insulinCarbRatio;

  // calculate the nominal adjustment units
  correctionUnits = (currentBloodSugar - targetBloodSugar) / correctionFactor;

  // add them together to get the final value as a float
  finalUnits = mealUnits + correctionUnits;

  // get the DOM elements for the final value display
  var decimal = document.getElementById('decimal');
  var rounded = document.getElementById('rounded');
  decimal.textContent = finalUnits.toFixed(2);
  rounded.textContent = hospital_rounding(finalUnits);
}

function hospital_rounding(units){
  // get just the decimal part of the units value
  fraction = units % 1;
  if (fraction < 0.25) return Math.floor(units);
  if (fraction < 0.75) return Math.floor(units) + 0.5;
  return Math.ceil(units);
}

function storeValues(form)
{
  setCookie("targetBloodSugar", form.targetBloodSugar.value);
  setCookie("correctionFactor", form.correctionFactor.value);
  setCookie("insulinCarbRatio", form.insulinCarbRatio.value);
  // remove all the alerts, focus coloring, and enable the top form
  document.getElementById("input_set").disabled = false;
  document.getElementById("settings").className = "panel-default";
  document.getElementById("alert").className = "alert alert-danger hidden";
  return true;
}

// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.
var today = new Date();
var expiry = new Date(today.getTime() + 100 * 24 * 3600 * 1000); // plus 100 days
function setCookie(name, value)
{
  document.cookie=name + "=" + escape(value) + "; path=/; expires=" + expiry.toGMTString();
}


function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}
