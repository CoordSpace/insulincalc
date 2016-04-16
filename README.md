# Insulin Unit Calculator
A simple mobile-focused web interface for calculating short-acting insulin doses in accordance with basal-bolus insulin dosing equations as defined in the research articles and worksheets sourced below.

The app can be accessed in your mobile browser at: <strong> [cwearley.github.io/insulincalc](http://cwearley.github.io/insulincalc/) </strong>

# <strong> Obligatory WARNING </strong>

Although this app is using a widely-known, simple, and oft-used equation to calculate bolus insulin dosages, this app was in no way developed under the active-guidance of a medical professional. I (Chris Earley) have tested the app under numerous conditions but I will in no way be responsible for any negative health effects this app may cause.


Lastly, it's a good habit to be skeptical of any numbers that are presented by <strong>any and all</strong> medical apps/devices. After all, this is your health we're talking about and machines are not infallible.

## How to use

#### Setup
Upon loading the page, you will find the top inputs disabled and a red warning message telling you to fill out the settings at the bottom of the page. You must fill out these fields before you can use the app. The values requested should be provided to you by your physician or other relevant healthcare professional. Upon updating, the values are now stored in your browser's localStorage and should persist between app uses. You can also update these settings values at any time to match your current health situation.

Once all the fields are filled, the red warnings will vanish and the top inputs will be unlocked for use.

#### Calculating

With the settings constants filled out, you can now return to the top of the page and fill in your current info to see the recommended insulin units displayed in the two large text boxes below.

Your current blood sugar and the amount of carbohydrates in your next meal are the only values that you'll need to input with each use of the calculator.

#### Results

Located below the two top inputs is the results table showing the total short-acting insulin units you need for your next meal. Displayed is the raw decimal value and a value that has been rounded to the nearest 0.5 units.

## Equations

The calculator uses the basal-bolus insulin dosing equation outlined in the Analysis of Guidelines for Basal-Bolus Insulin Dosing whitepaper.<sup>1 (Eq. 1, 2)</sup> This equation is a "widely used method of care for persons with diabetes" that "pertains to both insulin pump therapy and multiple-dose insulin injection therapy." This equation is also mentioned in numerous worksheets<sup>2</sup> and patient training literature.<sup>3</sup>

The steps needed to calculate a patient's insulin units before a meal are in two parts.

First the total grams of carbohydrates in the upcoming meal and the physician-specified insulin-to-carb ratio are used to calculate the units of insulin needed for food.

![Food Dose](http://latex.codecogs.com/gif.latex?%5Cbg_white%20%5Cfn_phv%20Insulin%5C%20Dose_%7B%28food%29%7D%5C%20%3D%5C%20%5Cfrac%7BCarbs%5C%20in%5C%20Next%5C%20Meal%7D%7BInsulin%5C%20to%5C%20Carb%5C%20Ratio%7D)

Then the patient's current blood sugar levels, target blood sugar, and physician-specified correction factor are used to calculate the correction units of insulin needed to reach their target blood sugar.

![Correction Dose](http://latex.codecogs.com/gif.latex?%5Cbg_white%20%5Cfn_phv%20Insulin%5C%20Dose_%7B%28correction%29%7D%5C%20%3D%5C%20%5Cfrac%7BCurrent%5C%20Blood%5C%20Sugar%5C%20-%5C%20Target%5C%20Blood%5C%20Sugar%7D%7BCorrection%5C%20Factor%7D)

With those two values known, they are summed together to yield the total amount of insulin dosing units needed.

![Total Dose](http://latex.codecogs.com/gif.latex?%5Cbg_white%20%5Cfn_phv%20Insulin%5C%20Dose_%7B%28total%29%7D%20%3D%20Insulin%5C%20Dose_%7B%28food%29%7D%20&plus;%20Insulin%5C%20Dose_%7B%28correction%29%7D)

## Technologies used

1. [Bootstrap](http://getbootstrap.com/2.3.2/)

## sources

1. Davidson PC, et al. Analysis of guidelines for basal-bolus insulin dosing: basal insulin, correction factor, and carbohydrate-to-insulin ratio. Endocr Pract. 2008 Dec;14(9):1095-101.PMID: 19158048 <http://bit.ly/22knH5j>

2. "Calculation Sheet for Rapid Acting Insulin Bolus." Cincinnati Children’s. Web. <http://bit.ly/253b8xz>.

3. Cypress, Marjorie, RN, MSN, C-ANP, CDE. Your Insulin Adjustment Workbook Yes, You Can Do It! BD. Web. <http://bit.ly/1nMIw9Q>.

## License Information

The MIT License (MIT)

Copyright (c) 2016 Christopher Earley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
