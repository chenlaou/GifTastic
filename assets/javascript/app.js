// Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
$(document).ready(function(){
    // inital array of gif examples
    var gifs = ["afk", "jk", "bff", "ftw", "idk", "imo", "lol"];
    console.log(gifs.length);

    //display gif function re-renders the HTML to display the appropriate content
    function displaygifview() {
        var gifs = $(this).attr("data-name")
        var apikey = JBkrVcPFLEYehopwCd9kAfZ6hfkbSVrH
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + apikey;

        // We create an AJAX call for specific gif button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            $("#gifview").empty();

            // storing the data from the AJAX request in the results variable
            var results = response.data;
            console.log(response);

            //Loop the gifs to 10 total limit
            for(var i = 0; i < results.length; i++) {

                // Div to hold gifs
                var gifDiv = $("<div>");
                // style.css class
                gifDiv.addClass("gifs");
                // Creates ratings to be displayed
                var rating = results[i].rating;
                var p = $("<h2>").text("Rating: " + rating);

                // Gif images to remain still or animate
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass('gifImage');
            }
            //display the rating
            gifDiv.prepend(p);
            //display the gif image
            gifDiv.prepend(gifImage);
            $("#gifview")
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            // Then, set the image's data-state to animate
            // Else set src to the data-still value
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            // function for displaying gif data
            function renderButtons() {
                $("#gifbuttons").empty();
                for(var i = 0; i < gifs.length; i++) {
                    //generate buttons using jQuery
                    var gifAdd = $("<button>");
                    gifAdd.addClass("trending")
                    //adding data-attr
                    gifAdd.attr("data-name", gifs[i]);
                    // button text   
                    gifAdd.text(gifs[i]);
                    // appending to buttons view div
                    $("#gifbuttons").append(gifAdd)
                }
            }
            // Gif Button on-click function
            $("add-gif").on("click"), function (event) {
                event.preventDefault();
                // Grabbing the input plus cutting out white space (.trim)
                var gif = $("#gif-input").val().trim();
                // adding a new input into the array
                gifs.push(gif);

                // Calling on the renderButtons to process our gifs on click
                renderButtons();
            };
            // event click lisenter for all elements for .gif
            $(document).on("click", ".gif", displaygifview);

            // display for inital buttons
            renderButtons();

        });
    };
})
