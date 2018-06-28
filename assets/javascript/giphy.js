// // Example queryURL for Giphy API
// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

var gifs = ["Ryan Gosling", "Bladerunner", "Cats"];

function displayGifInfo() {
  
  var gif = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=t7g7yUrxtzUTCzRMivzpDz0xgZcsHiDZ&limit=5";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

      var gifDiv = $("<div class='gif'>");

      var title = response.data[0].title;
      console.log(response.data[0].title);

      var pOne = $("<p>").text("Title: " + title);

      gifDiv.append(pOne);

      $("#gif-view").prepend(gifDiv);

  });
}

function renderButtons() {

  $("#buttons-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < gifs.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of gif-btn to our button
    a.addClass("gif-btn");
    // Adding a data-attribute
    a.attr("data-name", gifs[i]);
    // Providing the initial button text
    a.text(gifs[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  // Adding gif from the textbox to our array
  gifs.push(gif);

  // Calling renderButtons which handles the processing of our gif array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();