window.onload=function(){
  // after page load, grab all the constants from the page's cookies
  // if any of them are not present, run the lockdown function and quit out
  if(a = Cookies.get("targetBloodSugar")) {
    document.constants.targetBloodSugar.value = a;
  }
  else {
    initial_alert();
    return;
  }
  if(b = Cookies.get("correctionFactor")) {
    document.constants.correctionFactor.value = b;
  }
  else {
    initial_alert();
    return;
  }
  if(c = Cookies.get("insulinCarbRatio")) {
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
  var mealUnits = mealCarbs / insulinCarbRatio;

  // calculate the correction adjustment units
  var correctionUnits = (currentBloodSugar - targetBloodSugar) / correctionFactor;

  // add them together to get the final value as a float
  var finalUnits = mealUnits + correctionUnits;

  // get the DOM elements for the final value display
  var decimal = document.getElementById('decimal');
  var rounded = document.getElementById('rounded');
  decimal.textContent = finalUnits.toFixed(2);
  rounded.textContent = hospital_rounding(finalUnits);
}

// Round the decimal value calculated to the nearest half-value.
// This is the recommended method of rounding as shown in the worksheet source.
function hospital_rounding(units){
  // get just the decimal part of the units value
  fraction = units % 1;
  if (fraction < 0.25) return Math.floor(units);
  if (fraction < 0.75) return Math.floor(units) + 0.5;
  return Math.ceil(units);
}

function storeValues(form)
{
  var targetBloodSugar = form.targetBloodSugar.value;
  var correctionFactor = form.correctionFactor.value;
  var insulinCarbRatio = form.insulinCarbRatio.value;

  // check that all the values have been input and are valid!
  if(isNumber(targetBloodSugar) && isNumber(correctionFactor) && isNumber(insulinCarbRatio)){
    // remove all the alerts, focus coloring, and enable the top form
    document.getElementById("input_set").disabled = false;
    document.getElementById("settings").className = "panel-default";
    document.getElementById("alert").className = "alert alert-danger hidden";
    // Lets try a solid jquery plugin and see if it helps with Apple's stupid full
    // screen app data persistence decisions. I swear Tim Cook hates me.
    Cookies.set('targetBloodSugar', form.targetBloodSugar.value, { expires: 10000 });
    Cookies.set('correctionFactor', form.correctionFactor.value, { expires: 10000 });
    Cookies.set('insulinCarbRatio', form.insulinCarbRatio.value, { expires: 10000 });
    return true;
  }
  else {
    initial_alert();
    return false;
  }
}
// Fantastic little check from http://stackoverflow.com/a/1421988
function isNumber (o) {
  return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
}
