//######################################################################################################################
// array for button creation
//######################################################################################################################
var gifs = ["Fifth Element", "Bladerunner", "The Matrix", "2001 Space Oddessy", "Starship Troopers"];

//######################################################################################################################
// function to get the JSON from giphy API and create new HTML elements from the response
//######################################################################################################################
function displayGifInfo() {
//create gif variable
  var gif = $(this).attr("data-name");
  var limitNum = Math.floor(Math.random() * 5)*10;
  console.log(limitNum);
//create variable to contain the API query URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=t7g7yUrxtzUTCzRMivzpDz0xgZcsHiDZ&limit=" + limitNum;
//AJAX call to retreive jSON from API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
//Set API response to apiRespone variable
    var apiResponse = response.data;
//console log the response 
    console.log(apiResponse);
//loop through response object 
    for (var i = 0; i < apiResponse.length; i++) {
//set rating variable to hold the gif rating
      var rating = apiResponse[i].rating;
//console log the rating from the response to confirm it's parsing correctly
      console.log(rating);
//set variable to create a paragraph to render the gif rating to the DOM

      var gifStillUrl = apiResponse[i].images.fixed_width_still.url;
      console.log(gifStillUrl);
      var gifAniUrl = apiResponse[i].images.fixed_width.url;
      console.log(gifAniUrl);
      var image = `
        <div class='col-md-4'>
          <img src="${gifStillUrl}" data-still="${gifStillUrl}" data-animate="${gifAniUrl}" data-state="still" class="gifImage"/>
          <p>Rating: ${rating}</p>
        </div>
      `;

      // var image = $("<img>").attr({
      //   "src": gifStillUrl,
      //   "data-still": gifStillUrl,
      //   "data-animate": gifAniUrl,
      //   "data-state": "still", 
      //   "class": "gifImage"
      // });

      console.log(image);
      $(".gifImage").on("click", function() {
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
      });

    $("#gif-view").prepend(image);
  }
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
if(indexOf(gif) === -1 && gif) {
  gifs.push(gif);
} 
else {
  alert("enter valid button");
}
  // Calling renderButtons which handles the processing of our gif array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".btn-info", displayGifInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();