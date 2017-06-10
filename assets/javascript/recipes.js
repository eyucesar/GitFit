var baseURL = "https://api.edamam.com/search?q="
var appKey = "4cb43262ed46d6be10b05df6cb89da13"
var app_ID = "875f4d15"
var resultCount = 30;
var inputVal = "";
var queryURL = "";

//function to clear results field
function resetSearchResults() {
    $("#input-field").val("");
};
//function to create the search query with users input
function createQuery() {
    inputVal = $("#input-field").val().trim();
    queryURL = baseURL + inputVal + "&limit=" + resultCount + "&app_ID" + app_ID + "&app_key=" + appKey;
}
//function to allow user to press enter instead of Search
function searchKeypress(event) {
    if (event.keyCode === 13) { //checks whether the pressed key is "Enter"
        fetchAndShowResults();
    }
}

function fetchAndShowResults() {
    $("#recipesRow").empty();
    createQuery();
    fetchResults();
    resetSearchResults();
};

function fetchResults() {
    $.ajax({
        url: queryURL,
        method: "GET"
            // Store all of the retrieved data inside of an object called "response"
    }).done(function(response) {
        if (response.hits.length === 0) return;

        // Log the queryURL
        console.log(queryURL);
        var resultsElem;
        for (var i = 0; i < Math.min(30, response.hits.length); i++) {
            recipeURL = response.hits[i].recipe.url;
            recipeName = response.hits[i].recipe.label;
            if (recipeName.length > 30) {
                var length = 30;
                recipeName = recipeName.substring(0, length);
                recipeName = recipeName + "...";
            } else {
                recipeName = response.hits[i].recipe.label;
            }
            recipeImage = response.hits[i].recipe.image;
            recipeYield = response.hits[i].recipe.yield;
            recipeCalories = Math.floor(response.hits[i].recipe.calories / recipeYield);

            if (recipeCalories < 500) {
                displayImage = "<a class='Recipe' href='" + recipeURL + "' target='_blank'><img class='recipes' src='" + recipeImage + "'/></a>";
                displayURL = "<a class='Recipe' href='" + recipeURL + "' target='_blank'>" + recipeName + "</a>";
                $("#recipesRow").prepend("<div class='col-md-3' class='recipe-inline'>" + displayImage + "<br><br>" + displayURL + "<br>Calories Per Serving: " + recipeCalories + "</div>");
            } 
        }
    });
};

//On click event to get recipes and list them to the recipesRow div
$(document).ready(function() {
    event.preventDefault();

    $("#input-field").on("keypress", searchKeypress);

    $("#recipeSearchButton").on("click", fetchAndShowResults);
});

//voice commands function
if (annyang) {
// defining commands
    var commands = {
        'recipes with *tag': function(tag) {
            console.log(tag);
            function voiceQuery() {
                queryURL = baseURL + tag + "&limit=" + resultCount + "&app_ID" + app_ID + "&app_key=" + appKey;
            }
            $("#recipesRow").empty();
            voiceQuery();
            fetchResults();
            resetSearchResults();
        }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);
 
    // Start listening. 
    annyang.start();
}
