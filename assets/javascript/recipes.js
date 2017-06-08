var baseURL = "https://api.edamam.com/search?q="
var appKey = "4cb43262ed46d6be10b05df6cb89da13"
var app_ID = "875f4d15"
var resultCount = 8;
var inputVal = "";
var queryURL = "";
var imgURL = "";
var cardIndex = 1;

//function to clear results field
function resetSearchResults() {
    $("#input-field").empty();
    cardIndex = 0;
};

//function to create the search query with users input
function getInput() {
    inputVal = $("#input-field").val().trim();
    queryURL = baseURL + inputVal + "&limit=" + resultCount + "&app_ID" + app_ID + "&app_key=" + appKey;
}

//function to allow user to press enter instead of Search
function searchKeypress(event) {
    if (event.keyCode === 13) { //checks whether the pressed key is "Enter"
        getResults(event);
    }
}

// scroll recipe cards
function showDivs(n) {
    cardIndex += n;
    var x = document.getElementsByClassName("card");
    if (cardIndex > x.length - 1) {
        cardIndex = 0;
    }
    if (cardIndex < 0) {
        cardIndex = x.length - 1;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[cardIndex].style.display = "block";
}

//On click event to get recipes and list them to the recipesRow div
$(document).ready(function() {
    event.preventDefault();

    $("button").on("click", function(event) {
        event.preventDefault();
        getInput();
        $("#recipesRow").empty();

        $.ajax({
            url: queryURL,
            method: "GET"
            // Store all of the retrieved data inside of an object called "response"
        }).done(function(response) {
            if (response.hits.length === 0) return;

            // Log the queryURL
            var resultsElem, image, container, label, calories, link;
            for (var i = 0; i < Math.max(8, response.hits.length); i++) {
                recipeURL = response.hits[i].recipe.url;

                resultsElem = $("<div>");
                resultsElem.addClass("card");
                if (i === 0) {
                    resultsElem.show();
                } else {
                    resultsElem.hide();
                }

                image = $("<img>");
                image.addClass("image");
                image.attr("src", response.hits[i].recipe.image);
                image.attr("alt", "Img");
                resultsElem.append(image);

                container = $("<div>");
                container.addClass("recipeContainer");
                resultsElem.append(container);

                label = $("<p>");
                label.text(response.hits[i].recipe.label);
                label.addClass("label");
                container.append(label);
                // console.log("i= " + i + " label= " + response.hits[i].recipe.label);
                calories = $("<p>Calories: " + Math.round(response.hits[i].recipe.calories) + "</p>");
                calories.addClass("calories");
                container.append(calories);

                link = $("<a>");
                link.attr("href", response.hits[i].recipe.url);
                link.attr("target", "_blank");

                link.addClass("link");
                link.text(response.hits[i].recipe.url)
                container.append(link);

                // add cards to recipes row
                $("#recipesRow").append(resultsElem);

                // add buttons
                buttonLeft = $("<button class='w3-button w3-black w3-display-left' onclick='showDivs(-1)'>&#10094</button>");
                $("#recipesRow").append(buttonLeft);

                buttonRight = $("<button class='w3-button w3-black w3-display-right' onclick='showDivs(1)'>&#10095;</button>");
                $("#recipesRow").append(buttonRight);

            }
        });
        resetSearchResults();
    })
});
