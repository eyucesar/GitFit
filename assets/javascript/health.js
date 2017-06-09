//with the append that takes care of having things appear, but if they click for results in the same calculator more than once, those appear also
$("#bmi-results").hide();
$("#body-fat-results").hide();
$("#lean-mass-results").hide();
$("#heart-rate-results").hide();
$("#cal-intake-results").hide();
$("#protein-results").hide();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB_JQagylAT6I5kjHi0lx34v_PTvXMG8Dw",
    authDomain: "gitfit-58bb2.firebaseapp.com",
    databaseURL: "https://gitfit-58bb2.firebaseio.com",
    projectId: "gitfit-58bb2",
    storageBucket: "gitfit-58bb2.appspot.com",
    messagingSenderId: "536732614585"
};
firebase.initializeApp(config);

//set variable to refer to database
var database = firebase.database();

$(document).ready(function() {

    //BMI calculator
    $("#bmiSubmit").on("click", function(event) {

        //adding the if statement for form validation. The number will be calculated only if an input was entered by the user.
        if ($("#bmiWeight").val().length > 0 && $("#bmiHeight").val().length > 0) {
            event.preventDefault();

            //grab the value from the input field and convert it into an integer
            var bmiWeight = parseInt($("#bmiWeight").val().trim());
            var bmiHeight = parseInt($("#bmiHeight").val().trim());
            //convert the height into meters
            bmiHeight = bmiHeight / 100;
            //the logic for the calculation
            var bmi = bmiWeight / (bmiHeight * bmiHeight);
            //end up only with one decimal
            bmi = Math.round(bmi * 10) / 10;
            //write the result to the screen
            $("#bmiResult").val(bmi);

            //show results in the results data window
            $("#bmi-results").show().val("BMI: " + bmi);

            //object for holding bmi data
            var bmiData = {
                    bmiObj: bmi
                }
                //console.log(bmiData);
                //push to database
            database.ref().push(bmiData);
        } else {
            $("#bmiWeight").css("border", "1px solid red");
            $("#bmiHeight").css("border", "1px solid red");
        }
    });

    // Body Fat % Calculator
    // Formula from: http://www.bmi-calculator.net/body-fat-calculator/body-fat-formula.php
    // -----------------------------------------------
    $("#bodyFatSubmit").on("click", function(event) {
        // Operate only if all inputs are added
        if ($("#bodyFatWeight").val().length > 0 && $("#waistCir").val().length > 0 && $("#wristCir").val().length > 0 && $("#hipCir").val().length > 0 && $("#forearm-cir").val().length > 0) {
            event.preventDefault();
            // Grabbing (metric) values from input boxes
            var bodyFatWeight = parseInt($("#bodyFatWeight").val().trim());
            var waistCir = parseInt($("#waistCir").val().trim());
            var wristCir = parseInt($("#wristCir").val().trim());
            var hipCir = parseInt($("#hipCir").val().trim());
            var forearmCir = parseInt($("#forearm-cir").val().trim());

            // Converting variable values from metric to imperial since our formula is imperial (I could not find one in metric)
            bodyFatWeight = bodyFatWeight * 2.20462262;
            waistCir = waistCir * 0.39370079;
            wristCir = wristCir * 0.39370079;
            hipCir = hipCir * 0.39370079;
            forearmCir = forearmCir * 0.39370079;

            // Converting variables into factors for the body fat formula
            // We have a new weight variable because we will need to grab the original weight input later
            var weight = (bodyFatWeight * 0.732) + 8.897;
            wristCir = wristCir / 3.140;
            waistCir = waistCir * 0.157;
            hipCir = hipCir * 0.249;
            forearmCir = forearmCir * 0.434;

            // Lean Body Mass
            var bodyMass = weight + wristCir - waistCir - hipCir + forearmCir;
            // Body Fat Weight
            var bodyFat = bodyFatWeight - bodyMass;
            // Body Fat Percentage
            var bodyFatPercentage = (Math.round((bodyFat * 100) / bodyFatWeight) + "%");
            // Reflect Result
            $("#bodyFatResult").val(bodyFatPercentage);

            //show results in results data window
            $("#body-fat-results").show().val("Body Fat Percentage: " + bodyFatPercentage);

            //object for holding data
            var bodyFatData = {
                    bodyFatObj: bodyFatPercentage
                }
                //push to database
            database.ref().push(bodyFatData);
        } else {
            $("#bodyFatWeight").css("border", "1px solid red");
            $("#waistCir").css("border", "1px solid red");
            $("#wristCir").css("border", "1px solid red");
            $("#hipCir").css("border", "1px solid red");
            $("#forearm-cir").css("border", "1px solid red");
        }
    });

    //Lean Body Mass Kg Calculator
    $("#leanMassSubmit").on("click", function(event) {
        //adding the if statement for form validation. The number will be calculated only if an input was entered by the user.
        if ($("#leanMassWeight").val().length > 0 && $("#fatPercentage").val().length > 0) {
            event.preventDefault();
            var leanMassWeight = parseInt($("#leanMassWeight").val().trim());
            var fatPercentage = parseInt($("#fatPercentage").val().trim());
            var leanMassKg = leanMassWeight - ((leanMassWeight * fatPercentage) / 100);
            leanMassKg = Math.round(leanMassKg * 10) / 10;

            $("#leanMassResult").val(leanMassKg + " kg");

            //show results in results data window
            $("#lean-mass-results").show().val("Lean Mass: " + leanMassKg + " kg");
            //object to hold data
            var leanMassData = {
                    leanMassObj: leanMassKg
                }
                //push to database
            database.ref().push(leanMassData);
        } else {
            $("#leanMassWeight").css("border", "1px solid red");
            $("#fatPercentage").css("border", "1px solid red");
        }
    });

    //Maximum Heart Rate Calculator
    $("#maxHRSubmit").on("click", function(event) {
        //adding the if statement for form validation. The number will be calculated only if an input was entered by the user.
        if ($("#maxHRage").val().length > 0 && $("#exerciseIntensity").val().length > 0) {
            event.preventDefault();
            var maxHrAge = parseInt($("#maxHRage").val().trim());
            var exerciseIntensity = parseInt($("#exerciseIntensity").val().trim());
            exerciseIntensity = exerciseIntensity / 100;
            var maxHR = (220 - maxHrAge) * exerciseIntensity;
            maxHR = Math.round(maxHR);

            $("#maxHRresult").val(maxHR + " beats per minute");

            //show results in results data window
            $("#heart-rate-results").show().val("Max HR: " + maxHR + " bpm");
            //object to hold data
            var maxHRData = {
                    maxHRObj: maxHR
                }
                //push to database
            database.ref().push(maxHRData);
        } else {
            $("#maxHRage").css("border", "1px solid red");
            $("#exerciseIntensity").css("border", "1px solid red");
        }
    });

    // Daily Caloric Intake Calculator
    // ----------------------------------------------
    // Mifflin-St. Jeor Equation - http://www.livestrong.com/article/178764-caloric-intake-formula/ 
    // The physical activity factors are 1.2 for sedentary people, 1.3 for moderately active people and 1.4 for active people.

    $("#caloricIntakeSubmit").on("click", function(event) {
        // Form validation
        if ($("#caloricAge").val().length > 0 && $("#caloricWeight").val().length > 0 && $("#caloricHeight").val().length > 0) {
            event.preventDefault();
            // Grabbing variables
            var radioValue = $("input[name='sex']:checked").val();
            var caloricAge = parseInt($("#caloricAge").val().trim());
            var caloricWeight = parseInt($("#caloricWeight").val().trim());
            var caloricHeight = parseInt($("#caloricHeight").val().trim());
            var caloricExercise = $("#caloricExercise").val(); // Does not need trim since there is already a value from the HTML

            // If female is selected
            if (radioValue === "F") {
                var caloricIntake = (10 * caloricWeight) + (6.25 * caloricHeight) - (5 * caloricAge) - 161;
                caloricIntake = caloricIntake * caloricExercise;
                caloricIntake = Math.round(caloricIntake);
                $("#caloricIntakeResult").val(caloricIntake + " calories");
                // Show results to results data window
                $("#cal-intake-results").show().val("Caloric Intake: " + caloricIntake + " cal");
            }
            // If male is selected
            if (radioValue === "M") {
                var caloricIntake = (10 * caloricWeight) + (6.25 * caloricHeight) - (5 * caloricAge) + 5;
                caloricIntake = caloricIntake * caloricExercise;
                caloricIntake = Math.round(caloricIntake);
                $("#caloricIntakeResult").val(caloricIntake + " calories");
                // Show results to results data window
                $("#cal-intake-results").show().val("Caloric Intake: " + caloricIntake + " cal");
            }

        } else {
            $("#caloricAge").css("border", "1px solid red");
            $("#caloricWeight").css("border", "1px solid red");
            $("#caloricHeight").css("border", "1px solid red");
            $("#caloricExercise").css("border", "1px solid red");
        }

        //object to save data
        var caloricIntakeData = {
                caloricIntakeObj: caloricIntake
            }
            //push to database
        database.ref().push(caloricIntakeData);
    });


    // Protein RDA Calculator
    // ----------------------------------------------
    $("#proteinSubmit").on("click", function() {
        if ($("#proteinWeight").val().length > 0) {

            event.preventDefault();

            // Grabbing variables
            var proteinWeight = parseInt($("#proteinWeight").val().trim());
            var proteinRDA = Math.round(proteinWeight * 0.8);

            $("#proteinResult").val(proteinRDA + " g");
            //show results in results data window
            $("#protein-results").show().val("Protein: " + proteinRDA + " g");
            //object to save data
        } else {
            $("#proteinWeight").css("border", "1px solid red");
        }

        var proteinData = {
                proteinObj: proteinRDA
            }
            //push to database
        database.ref().push(proteinData);
    });

    // Conversion Chart
    // weight conversion
    $("#convWeightSubmit").on("click", function() {
        if ($("#conversionWeight").val().length > 0) {
            var radioValue = $("input[name='weight']:checked").val();
            if (radioValue === "Kg") {
                event.preventDefault();
                var convWeight = parseInt($("#conversionWeight").val().trim());
                convWeight = convWeight * 0.453592;
                convWeight = Math.round(convWeight * 10) / 10;
                $("#convWeightResult").val(convWeight + " kg");
            }
            if (radioValue === "Lbs") {
                event.preventDefault();
                var convWeight = parseInt($("#conversionWeight").val().trim());
                convWeight = convWeight * 2.20462;
                convWeight = Math.round(convWeight * 10) / 10;
                $("#convWeightResult").val(convWeight + " lbs");
            }
        } else {
            $("#conversionWeight").css("border", "1px solid red");
        }
    });

    // height conversion
    $("#convHeightSubmit").on("click", function() {
        if ($("#conversionHeightFt").val().length > 0 && $("#conversionHeightIn").val().length > 0) {
            event.preventDefault();
            var convHeightFt = parseInt($("#conversionHeightFt").val().trim());
            var feetConvertedCm = convHeightFt * 30.48;
            var convHeightIn = parseInt($("#conversionHeightIn").val().trim());
            var inchConvertedCm = convHeightIn * 2.54;
            var convertedHeight = feetConvertedCm + inchConvertedCm;
            convertedHeight = Math.round(convertedHeight);
            $("#convHeightResult").val(convertedHeight + " cm");
        } else {
            $("#conversionHeightFt").css("border", "1px solid red");
            $("#conversionHeightIn").css("border", "1px solid red");
        }
    });
});
