$(document).ready(function() {

    $("#recipeSearch").on("click", function() {
        $("#recipesRow").append("<h3>Grilled Spanish Mustard Beef</h3><br>" + "<a href='http://allrecipes.com/recipe/237239/grilled-spanish-mustard-beef' target='blank'>http://allrecipes.com/recipe/237239/grilled-spanish-mustard-beef</a><br><br><br><h3>Chicken Broccoli Salad</h3><br>" + "<a href='http://allrecipes.com/recipe/221062/chicken-broccoli-salad' target='blank'>http://allrecipes.com/recipe/221062/chicken-broccoli-salad</a><br><br><br><h3>Simple Garlic Shrimp</h3><br>" + "<a href='http://allrecipes.com/recipe/220597/simple-garlic-shrimp' target='blank'>http://allrecipes.com/recipe/220597/simple-garlic-shrimp</a><br><br><br><h3>Marinated Veggies</h3><br>" + "<a href='http://allrecipes.com/recipe/14581/marinated-veggies' target='blank'>http://allrecipes.com/recipe/14581/marinated-veggies</a><br><br>");

    });

    $("#muscleSearch").on("click", function() {

        $("#exerciseSpace").append("<h4>Results:</h4>");

        $("#exerciseSpace").append("<br><button type='button' class='btn btn-info' id='glute'>Glute Bridges</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Deadlift</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Squat</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Kettle Bell Swing</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Calf Raise</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Blabla</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Blabla</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Blabla</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Blabla</button><br>");

        $("#exerciseSpace").append("<button type='button' class='btn btn-info' id='glute'>Blabla</button><br>");

    });


});
