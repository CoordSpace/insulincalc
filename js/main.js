window.onload = function () {
  if (typeof (Storage) !== 'undefined') {
    // reset the variable inputs
    document.getElementById('mealCarbs').value = '';
    document.getElementById('currentBloodSugar').value = '';
    // Code for window.localStorage/sessionStorage.
    var a = window.localStorage.getItem('targetBloodSugar');
    var b = window.localStorage.getItem('correctionFactor');
    var c = window.localStorage.getItem('insulinCarbRatio');

    // after page load, grab all the constants from the page's window.localStorage
    // if any of them are not present, run the lockdown function and quit out
    if (a) {
      document.getElementById('targetBloodSugar').value = a;
    } else {
      initial_alert();
      return;
    } if (b) {
      document.getElementById('correctionFactor').value = b;
    } else {
      initial_alert();
      return;
    } if (c) {
      document.getElementById('insulinCarbRatio').value = c;
    } else {
      initial_alert();
      return;
    }
  } else {
    // Sorry! No Web Storage support.
    // create the jumbotron message with error info
    var noStorageJumbo = document.createElement('div');
    noStorageJumbo.className = 'jumbotron col-md-6 col-md-offset-3';
    noStorageJumbo.innerHTML = '<h1>Uh Oh! :(</h1>\n <p>Seems your browser doesn\'t support a feature I need to work.</p>\n <p><a class=\"btn btn-primary btn-lg\" role=\"button\" href=\"http:\/\/caniuse.com/#feat=namevalue-storage\">Learn more</a></p>';
    // get the header so we maintain branding
    var header = document.createElement('div');
    header.className = 'panel-primary';
    header.appendChild(document.getElementById('heading'));
    // delete all the page contents and replace them with the error message
    var container = document.getElementById('container');
    container.innerHTML = '';
    container.appendChild(header);
    container.appendChild(noStorageJumbo);
  }
};

// Apple Safari iOS is a strange beast - http://stackoverflow.com/a/22409509

// update the insulin unit calculations if both values are supplied
function variableInput () {
  // grab the current user input values
  // if any of the inputs are empty, just return early
  var mealCarbs = document.getElementById('mealCarbs').value;
  var currentBloodSugar = document.getElementById('currentBloodSugar').value;
  if (currentBloodSugar === '') {
    return;
  }
  if (mealCarbs === '') {
    return;
  }
  // since we know the constants are filled in, we can just go ahread
  // and calculate the result
  calculate_units();
}

// update all the data stores upon user input
function storeConst () {
  // grab the current user input values and store them
  var insulinCarbRatio = document.getElementById('insulinCarbRatio').value;
  var correctionFactor = document.getElementById('correctionFactor').value;
  var targetBloodSugar = document.getElementById('targetBloodSugar').value;
  window.localStorage.setItem('insulinCarbRatio', insulinCarbRatio);
  window.localStorage.setItem('correctionFactor', correctionFactor);
  window.localStorage.setItem('targetBloodSugar', targetBloodSugar);
  // if any of the inputs are empty, just return early
  if (insulinCarbRatio === '') {
    initial_alert();
    return;
  }
  if (correctionFactor === '') {
    initial_alert();
    return;
  }
  if (targetBloodSugar === '') {
    initial_alert();
    return;
  }
  // check that all the values have been input and are valid
  if (isNumber(targetBloodSugar) && isNumber(correctionFactor) && isNumber(insulinCarbRatio)) {
    // remove all the alerts, focus coloring, and enable the top form
    document.getElementById('input_set').disabled = false;
    document.getElementById('settings').className = 'panel-default';
    document.getElementById('alert').className = 'alert alert-danger hidden';
    return;
  } else {
    initial_alert();
    return;
  }
}

// If the settings values are not present, we need to lock the calc form inputs
// alert the user and direct their attention to the bottom of the page.
function initial_alert () {
  // if the alert is already enabled, just quit out
  if (document.getElementById('settings').className === 'panel-danger') {
    return;
  }
  // disable all the top form elements
  document.getElementById('input_set').disabled = true;
  // make the red alert message become visible
  document.getElementById('alert').classList.remove('hidden');
  // make the bottom settings panel red to make the eye follow from the red
  // error alert message
  document.getElementById('settings').className = 'panel-danger';
}

function calculate_units () {
  // grab the current user input values, they should be all filled out now
  var insulinCarbRatio = window.localStorage.getItem('insulinCarbRatio');
  var correctionFactor = window.localStorage.getItem('correctionFactor');
  var targetBloodSugar = window.localStorage.getItem('targetBloodSugar');
  var mealCarbs = document.getElementById('mealCarbs').value;
  var currentBloodSugar = document.getElementById('currentBloodSugar').value;

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
function hospital_rounding (units) {
  // get just the decimal part of the units value
  var fraction = units % 1;
  if (fraction < 0.25) return Math.floor(units);
  if (fraction < 0.75) return Math.floor(units) + 0.5;
  return Math.ceil(units);
}

// Fantastic little check from http://stackoverflow.com/a/1421988
function isNumber (o) {
  return !isNaN(o - 0) && o !== null && o !== '' && o !== false;
}
