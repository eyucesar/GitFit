$(document).ready(function() {

    var muscleName = ["Biceps", "Shoulders", "Ribs", "Chest", "Triceps",
        "Abs", "Calves", "Glutes", "Traps", "Quads",
        "Hamstrings", "Lats", "Brachialis", "Obliques", "Soleus"
    ];

    var equipmentName = ["Barbell", "SZ-Bar", "Dumbbell", "Gym Mat", "None",
        "Pull-up Bar", "None", "Bench", "Incline Bench",
        "Kettlebell"
    ];

    var muscle = "";
    var muscleIndex = 0;
    // wger API
    var baseURL = "https://wger.de/api/v2/exercise/?";
    var key = "d847f4de1299dad25a4bd31b15e5c5a3";
    var queryURLBefore = "https://wger.de/api/v2/exercise/?key=7984176e785d9a22346cacb2840d8ddb961748d3&language=2&muscles=";
    var queryURL = "";

    // Take muscle name and query and display exercises
    function displayExercise(muscle) {

        queryURL = "";
        $("#exerciseSpace").empty();
        muscleIndex = parseInt(muscleName.indexOf(muscle)) + 1;

        queryURL = queryURLBefore + muscleIndex;

        $.ajax({
            crossDomain: false,
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            for (var i = 0; i < Math.min(10, response.results.length); i++) {
                var name = (response.results[i].name);
                var des = (response.results[i].description);
                var secMuscles = response.results[i].muscles_secondary;
                var equipment = response.results[i].equipment;
                var idName = "exercise" + (i + 1);

                // Display exercise info 
                // Below if is needed since some of the exercises have no description
                if (des) {
                    $("#exerciseSpace").append("<button type='button' class='btn btn-info exercise-name' data-toggle='collapse' data-target='#" + idName + "'>" + name + "</button>");
                    $("#exerciseSpace").append("<br><br>");
                    $("#exerciseSpace").append("<div id=" + idName + " class='collapse collapse-div'></div>");

                    $("#" + idName).append("<h5 class='descHeader'>Description</h5><br>");
                    $("#" + idName).append("<p>" + des + "</p><br>");

                    if (secMuscles.length > 0) {
                        $("#" + idName).append("<h5 class='descHeader'>Also works</h5><br>");
                        for (var j = 0; j < secMuscles.length; j++) {
                            $("#" + idName).append("<p>" + muscleName[secMuscles[j] - 1] + "</p>");
                        }
                    }

                    if (equipment.length > 0) {
                        $("#" + idName).append("<br><h5 class='descHeader'>Equipment</h5><br>");
                        for (var j = 0; j < equipment.length; j++) {
                            $("#" + idName).append("<p>" + equipmentName[equipment[j] - 1] + "</p>");
                        }
                    }
                } // if (des)
            }

        });

    }

    //the function that will display the exercises when the user clicks a muscle group on the body
    function imageMuscles() {
        event.preventDefault();

        for (var i = 0; i < muscleName.length; i++) {
            if (this.className === muscleName[i]) {
                //testing
                // console.log("loop is running");
                muscle = this.className;
                $('#muscleMenu').text(this.className);
                displayExercise(muscle);
            }
        }
    };

    // When muscle groups on the body are clicked, imageMuscles function will fire
    $("area").on("click", imageMuscles);

    // When MuscleGroup button is clicked
    $("#menu li a").on('click', function() {
        event.preventDefault();
        $('#muscleMenu').text($(this).text());
        muscle = $(this).text();
        displayExercise(muscle);
    });



    //toggle button function
    //saves the button itself as a variable and applies three data attribute
    var toggleBtn = $('.toggle.btn.btn-success');
    toggleBtn.attr("data-male", "assets/images/male-body.png");
    toggleBtn.attr("data-female", "assets/images/female-body.png");
    toggleBtn.attr("data-state", "male");

    //function that changes the male coordinates to female coordinates
    function femaleCoord() {
        $("#anatomy").html("<map id='ImageMapmapAreas' name='ImageMapmapAreas'><area target='' alt='trap' title='' href='#trap1' class='Traps' coords='108,86,110,79,114,93,115,100,108,96,102,93,96,92' shape='poly'/><area target='' alt='trap' title='' href='#trap2' class='Traps' coords='137,78,138,84,143,90,149,94,140,95,132,98,133,90' shape='poly'><area target='' alt='trap' title='' href='#trap3' class='Traps' coords='404,87,414,80,420,68,431,71,442,66,446,77,463,88,458,98,466,104,473,111,475,118,470,128,469,135,456,133,445,130,432,128,420,131,409,135,395,133,392,121,392,110,403,100' shape='poly'><area target='' alt='shoulder' title='' href='#shoulder1' class='Shoulders' coords='94,95,92,102,86,106,80,115,76,119,70,123,63,126,62,120,64,113,66,105,71,99,78,96,86,94' shape='poly'><area target='' alt='shoulder' title='' href='#shoulder2' class='Shoulders' coords='152,93,162,92,169,93,175,98,179,105,181,112,182,120,181,127,176,126,170,122,167,115,163,111,159,105,154,102' shape='poly'><area target='' alt='shoulder' title='' href='#shoulder3' class='Shoulders' coords='375,99,382,94,390,91,397,90,403,88,405,94,405,100,398,102,393,107,390,112,389,118,382,119,376,121,369,121,368,115,369,108' shape='poly'><area target='' alt='shoulder' title='' href='#shoulder4' class='Shoulders' coords='460,90,468,91,476,91,483,95,490,98,493,105,496,112,496,118,495,124,489,120,484,119,476,118,475,111,470,106,464,102,458,96' shape='poly'><area target='' alt='chest' title='' href='#pec1' class='Chest' coords='96,101,104,101,112,104,117,110,119,118,119,125,121,133,116,138,110,141,105,140,100,136,95,132,89,126,84,124,79,123,81,117,85,111,90,105' shape='poly'><area target='' alt='chest' title='' href='#pec2' class='Chest' coords='133,106,139,102,147,100,155,103,160,109,165,114,165,124,159,127,154,131,150,136,145,139,138,138,132,139,127,136,124,129,125,123,127,114' shape='poly'><area target='' alt='bicep' title='' href='#bicep1' class='Biceps' coords='67,128,73,126,81,125,82,132,83,141,81,149,78,154,74,160,69,163,63,164,58,159,58,153,57,146,58,138,63,132' shape='poly'><area target='' alt='bicep' title='' href='#bicep2' class='Biceps' coords='162,125,168,124,174,127,181,129,184,135,185,141,185,148,186,155,186,163,181,164,175,161,171,156,167,151,164,145,162,140,161,131' shape='poly'><area target='' alt='abs' title='' href='#abs' class='Abs' coords='103,142,109,143,116,141,122,138,129,140,135,142,141,140,143,146,144,154,143,161,145,168,146,176,146,184,144,191,144,199,143,206,141,213,138,219,136,224,133,231,129,237,123,241,117,238,113,233,109,228,107,220,105,215,103,209,103,202,102,195,100,190,99,183,98,176,98,169,98,162,98,156,100,150' shape='poly'><area target='' alt='oblique' title='' href='#oblique1' class='Obliques' coords='84,126,91,129,99,137,101,146,98,156,98,167,98,176,99,188,100,198,102,206,105,216,109,225,114,233,116,244,104,236,99,232,93,227,87,225,81,223,83,213,89,203,92,194,93,183,91,165,86,151,84,139' shape='poly'><area target='' alt='oblique' title='' href='#oblique2' class='Obliques' coords='141,141,149,137,160,127,160,133,161,139,158,147,154,156,151,166,151,174,153,183,155,190,158,198,161,204,163,211,164,217,157,219,152,223,145,229,137,235,130,242,137,221,141,211,144,202,146,192,144,153' shape='poly'><area target='' alt='quad' title='' href='#quad1' class='Quads' coords='88,226,96,228,101,232,107,236,112,241,116,246,115,253,115,261,116,268,116,275,115,282,115,289,115,300,114,307,113,314,111,322,109,330,102,334,96,333,92,328,90,320,88,311,86,304,84,298,82,292,81,286,79,278,77,272,77,265,79,258,84,251,87,241,87,235' shape='poly'><area target='' alt='quad' title='' class='Quads' href='#quad2' coords='130,244,135,237,142,231,148,227,155,224,157,232,158,241,160,249,164,256,169,262,167,268,167,277,166,284,164,292,162,299,161,307,158,314,158,320,152,329,146,330,140,333,137,327,134,321,132,312,130,303,129,291,127,284,128,274,128,265,129,254' shape='poly'><area target='' alt='calf' title='' href='#calf1' class='Calves' coords='101,374,102,385,102,394,101,402,100,412,98,420,97,427,93,432,91,440,88,426,88,419,88,412,89,403,90,393,92,385,96,379' shape='poly'><area target='' alt='calf' title='' href='#calf2' class='Calves' coords='146,372,149,378,152,385,155,394,156,402,157,411,158,418,157,426,156,432,152,420,149,413,146,408,145,400,144,390,145,382' shape='poly'><area target='' alt='calf' title='' href='#calf3' class='Calves' coords='398,343,398,350,402,358,406,363,413,368,415,374,414,381,415,389,414,397,411,403,402,402,390,400,385,396,386,389,385,382,386,373,387,363,387,353,393,348' shape='poly'><area target='' alt='calf' title='' href='#calf4' class='Calves' coords='469,339,473,346,477,355,478,364,480,375,482,382,480,390,478,396,473,399,466,399,462,403,456,399,450,398,450,390,450,383,450,375,455,368,464,356,467,344' shape='poly'><area target='' alt='tricep' title='' href='#tricep1' class='Triceps' coords='370,124,380,121,390,120,390,128,389,138,388,147,387,156,383,163,379,167,376,159,367,169,366,162,365,153,366,145,366,135' shape='poly'><area target='' alt='tricep' title='' href='#tricep2' class='Triceps' coords='477,119,486,119,493,122,495,130,498,139,499,146,500,153,500,160,500,166,495,169,493,163,494,157,489,153,487,160,487,166,487,172,482,169,478,162,477,154,475,146,473,137,473,127' shape='poly'><area target='' alt='lat' title='' href='#lat' class='Lats' coords='395,136,406,135,417,132,426,129,433,127,441,129,448,132,458,135,470,134,467,141,464,150,463,159,462,169,462,179,463,189,460,199,455,203,456,211,449,198,448,188,447,179,443,173,437,169,431,167,426,171,421,176,418,181,417,189,416,195,411,206,408,211,408,199,402,193,402,185,403,176,402,164,399,154,396,145' shape='poly'><area target='' alt='glute' title='' href='#glute' class='Glutes' coords='409,215,419,214,427,217,432,220,433,227,439,221,445,218,452,215,459,216,465,220,469,224,473,231,477,238,477,244,476,251,472,259,467,265,462,271,455,273,448,273,442,272,436,266,431,260,429,267,425,272,416,273,410,273,404,271,397,267,393,261,390,256,389,248,391,240,393,232,396,225,403,219' shape='poly'><area target='' alt='hamstring' title='' href='#hamstring1' class='Hamstrings' coords='388,246,390,255,392,264,399,271,408,274,417,275,426,272,423,278,422,286,419,296,419,308,418,315,418,324,418,333,417,340,418,347,418,356,415,369,408,364,403,360,400,352,399,342,392,346,388,353,387,333,384,318,383,302,381,281,384,259' shape='poly'><area target='' alt='hamstring' title='' href='#hamstring2' class='Hamstrings' coords='440,273,449,274,461,270,469,263,475,255,479,247,479,241,481,258,482,269,482,281,482,292,482,305,482,319,481,330,481,339,477,346,471,340,466,333,466,345,463,355,458,362,451,369,446,362,449,345,448,329,445,302,441,281' shape='poly'></map>");
    };

    //function that changes the female coordinates back to male coordinates
    function maleCoord() {
        $("#anatomy").html("<map id='ImageMapmapAreas' name='ImageMapmapAreas'><area target='' alt='traps' title='traps' href='#traps1' class='Traps' coords='117,73,121,81,125,93,118,90,111,90,99,88,109,81' shape='poly'><area target='' alt='traps' title='traps' href='#traps2' class='Traps' coords='146,70,148,79,153,84,161,85,147,91,136,94,139,83' shape='poly'><area target='' alt='traps' title='traps' href='#traps3' class='Traps' coords='387,79,403,58,419,59,428,70,440,78,446,92,459,101,456,118,445,117,433,114,425,118,410,116,400,117,391,116,384,119,374,119,368,119,366,107,372,94,382,87' shape='poly'><area id='shoulder1' target='' alt='shoulder' title='shoulder' class='Shoulders' href='#' coords='72,100,78,94,88,90,96,88,107,91,100,97,93,105,88,114,85,121,78,122,74,127,67,128,68,112' shape='poly'><area id='shoulder2' target='' alt='shoulder' title='shoulder' class='Shoulders' href='#' coords='155,95,158,89,165,88,173,88,183,92,191,101,193,113,192,121,183,121,177,120,173,109,167,100' shape='poly'><area id='shoulder3' target='' alt='shoulder' title='shoulder' class='Shoulders' href='#' coords='352,93,357,88,365,85,373,82,384,81,383,89,376,94,370,99,366,106,361,110,355,112,348,117,348,110,348,102' shape='poly'><area id='shoulder4' target='' alt='shoulder' title='shoulder' href='#' class='Shoulders' coords='442,80,450,78,458,78,468,84,475,93,477,105,479,120,473,116,468,112,461,109,459,101,455,96,446,92,442,87' shape='poly'><area target='' alt='chest' title='chest' href='#chest1' class='Chest' coords='108,96,115,96,124,102,129,115,130,125,123,130,113,131,101,131,92,127,87,123,90,115,94,107,99,100' shape='poly'><area target='' alt='chest' title='chest' href='#chest2' class='Chest' coords='142,98,150,95,160,97,169,103,175,111,176,120,169,127,159,131,150,132,140,130,135,126,134,118,134,110,137,104' shape='poly'><area target='' alt='abs' title='abs' href='#abs' class='Abs' coords='131,133,136,130,142,131,151,132,153,141,154,152,154,162,154,171,151,183,148,197,147,207,146,225,140,232,133,234,124,231,116,221,114,207,113,195,111,183,108,172,106,159,106,149,107,140,110,133,122,131' shape='poly'><area target='' alt='bicep' title='bicep' href='#bicep1' class='Biceps' coords='66,130,72,130,77,126,82,121,88,125,89,134,89,144,86,151,80,159,72,162,64,167,62,160,61,154,60,146,62,139' shape='poly'><area target='' alt='bicep' title='bicep' href='#bicep2' class='Chest' coords='172,126,176,122,182,119,191,124,198,130,200,139,201,149,198,166,189,162,182,159,177,153,175,143' shape='poly'><area target='' alt='oblique' title='oblique' href='#oblique1' class='Obliques' coords='90,128,97,130,110,131,106,143,106,150,107,163,109,174,112,185,114,197,114,208,115,218,110,213,103,208,95,203,93,197,93,187,94,178,96,162,94,149,90,142,89,135' shape='poly'><area target='' alt='oblique' title='oblique' href='#oblique2' class='Obliques' coords='153,132,164,128,171,125,173,132,175,141,169,149,167,159,167,170,169,183,171,197,165,204,159,208,154,215,149,222,147,213,150,194,155,172,155,150' shape='poly'><area target='' alt='oblique' title='oblique' href='#oblique3' class='Obliques' coords='374,162,383,172,388,184,388,193,377,195,377,181' shape='poly'><area target='' alt='oblique' title='oblique' href='#oblique4' class='Obliques' coords='439,176,444,167,450,165,449,183,450,195,444,193,437,195,436,185' shape='poly'><area target='' alt='quads' title='quads' href='#quad1' class='Quads' coords='101,209,109,215,117,224,127,233,126,255,122,282,117,307,107,305,100,298,93,304,87,295,81,281,78,268,78,247,87,240,96,229' shape='poly'><area target='' alt='quads' title='quads' href='#quad2' class='Quads' coords='136,236,145,228,151,219,162,209,163,221,170,232,181,242,182,259,182,275,176,293,169,303,163,296,154,306,147,311,147,303,140,289,136,270,134,255' shape='poly'><area target='' alt='calves' title='calves' href='#calves1' class='Calves' coords='111,336,111,351,108,365,103,381,96,400,95,382,95,367,100,349' shape='poly'><area target='' alt='calves' title='calves' href='#calves2' class='Calves' coords='154,337,162,349,168,365,170,384,170,400,161,386,152,372,151,352' shape='poly'><area target='' alt='calves' title='calves' href='#calves3' class='Calves' coords='361,320,374,314,379,330,384,338,382,349,382,377,379,383,368,381,364,373,353,381,350,371,354,351,359,340' shape='poly'><area target='' alt='calves' title='calves' href='#calves4' class='Calves' coords='442,339,446,364,445,375,447,382,454,381,460,371,467,376,476,378,471,356,464,339,467,324,453,311' shape='poly'><area target='' alt='lat' title='lat' href='#lat1' class='Lats' coords='368,122,379,123,391,120,403,121,410,122,412,149,403,154,398,164,395,181,389,188,386,175,375,163,371,144' shape='poly'><area target='' alt='lat' title='lat' href='#lat2' class='Lats' coords='412,123,424,121,433,118,442,121,455,123,453,139,451,162,443,170,439,177,437,189,431,184,432,168,427,160,421,153,413,152,413,139' shape='poly'><area target='' alt='tricep' title='tricep' href='#tricep1' class='Triceps' coords='347,117,354,111,364,107,370,132,361,151,350,157,350,149,350,141,343,143,342,152,340,160,336,151,342,132' shape='poly'><area target='' alt='tricep' title='tricep' href='#tricep2' class='Triceps' coords='460,109,471,110,479,118,485,131,489,145,483,160,480,148,478,139,472,140,474,149,478,156,473,162,463,152,455,133,458,120' shape='poly'><area target='' alt='glutes' title='glutes' href='#glutes' class='Glutes' coords='392,195,400,197,410,204,413,210,418,202,427,198,437,195,447,201,451,213,454,226,453,238,449,248,436,251,425,251,417,251,413,243,408,252,394,254,380,251,375,242,371,229,370,220,379,206' shape='poly'><area target='' alt='hamstring' title='hamstring' href='#hamstring1' class='Hamstrings' coords='370,228,372,239,379,249,394,252,406,254,406,274,404,289,400,296,396,313,393,328,387,337,375,321,376,312,361,319,366,308,365,290,363,271,363,246,365,237' shape='poly'><area target='' alt='hamstring' title='hamstring' href='#hamstring2' class='Hamstrings' coords='416,253,447,251,457,228,461,237,461,267,460,291,466,320,459,317,452,312,449,324,441,338,431,323,426,296,418,278' shape='poly'></map>");
    };

    $(toggleBtn).click(function() {
        var state = $(this).attr("data-state");
        //on click, if the data-state is male, change the image to the female image and change the data-state to female
        //if the data-state is female, change the image to male and the data-state to male
        if (state === "male") {
            $("#anatomy").attr("src", "assets/images/female-body.png");
            //changes the map coordinates for the female body
            femaleCoord();
            $(this).attr("data-state", "female");
            //call the exercise display function when a muscle is clicked
            $("area").on("click", imageMuscles);
        } else {
            $("#anatomy").attr("src", "assets/images/male-body.png");
            //changes the map coordinates for the male body
            maleCoord();
            $(this).attr("data-state", "male");
            //call the exercise display function when a muscle is clicked
            $("area").on("click", imageMuscles);
        }
    });

     //voice detection code starts here
    if (annyang) {
  
        // defining commands
        var commands = {
            'exercises for *tag': function(tag) {
            tag = tag.charAt(0).toUpperCase() + tag.slice(1);
                if ($.inArray(tag, muscleName) != -1) {
                    muscle = tag;
                    $("#errorMessage").empty();
                    displayExercise(muscle);
                } else {
                    $("#errorMessage").empty();
                    $("#errorMessage").append("<br><i class='fa fa-exclamation fa-lg' aria-hidden=true'></i>&nbsp;&nbsp;Muscle group is not detected. Please try again.");
                    $("#exerciseSpace").empty();
                }
            }

        };

        // Add our commands to annyang
        annyang.addCommands(commands);

        // Start listening. 
        annyang.start();

    }

});
