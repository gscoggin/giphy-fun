// // Example queryURL for Giphy API
// var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

var gifs = ["Fifth Element", "Bladerunner", "The Matrix", "2001 Space Oddessy", "Starship Troopers"];

function displayGifInfo() {
  
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=t7g7yUrxtzUTCzRMivzpDz0xgZcsHiDZ&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var gifDiv = $("<div class='gif'>");

    for (var i = 0; i < response.data.length; i++) {
      var rating = response.data[i].rating;
      console.log(rating);
      var images = response.data[i].images.fixed_height.url;
      console.log(images);
      
      var pOne = $("<p>").text("Rating: " + rating);
      gifDiv.append(pOne);
    
      var gif = $("<img>").attr("src", images);
      gifDiv.append(gif);
    }
  
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
    
    a.addClass("btn btn-info");
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
$(document).on("click", ".btn-info", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();