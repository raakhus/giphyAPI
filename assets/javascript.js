
$(document).ready(function(){


var topic = ['great white shark','mako shark','hammerhead shark','thrasher shark'];
function addGif() {

    var gifs = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gifs + '&limit=10&api_key=sDFY3y8NP5cViKKbRyT4XtLYnHB3L2TU';

    
    $.ajax({
      url: queryURL,
      method: "GET",
     
    }).then(function(response) {
      console.log(response);
      var results =  response.data;
     for (var i = 0; i < response.data.length; i ++){

      // Creating a div to hold the gifs
      var gifDiv = $("<div class='gif'>");

      // Storing the rating data
      var rating = response.data[i].rating;

      // Creating an element to have the rating displayed
      var p = $("<p>").text("Rating: " + rating);
      // create our image with the proper attributes
      var img = $('<img>').attr('src', results[i].images.originial_still.url)
      .attr('data-still', results[i].images.originial_still.url)
      .attr('data-animate', results[i].images.originial.url)
      .attr('data-state', 'still')
      .attr('class', 'actualGif')
      console.log(results[i].images.originial_still)

      ;

      // Displaying the rating and image
      gifDiv.append(p).append(img);


      // putting gifs above the previous gifs
      $(".gifs").prepend(gifDiv);
     }
    });

  }

  // Function for displaying movie data
  function renderButtons() {

    // empty the created buttons to avooid making repeated buttons 
    $(".gifbtns").empty();

    // Looping through the array of movies
    for (var i = 0; i < topic.length; i++) {
      var a = $("<button>");
      // adding a class of gifbtn to our button
      a.addClass("gifbtn");
      // Adding a data-attribute
      a.attr("data-name", topic[i]);
      // sets gif to still when loading it
      
      // Providing the initial button text
      a.text(topic[i]);
      // Adding the button to the buttons-view div
      $(".gifbtns").append(a);
    }
  }

//   add gif button to gif div
//  how to change this to on search ???? 
  $(".btn-search").on("click", function(event) {
    event.preventDefault();
// gets the info from search
    var gifs = $(".form-control").val().trim();

    // Adding topic to topic array
    topic.push(gifs);

    // makes our topic buttons trying to make enter activate our button create function enter = key 13
    renderButtons();
});
//   adding click event with all buttons with a gifs class
  $(document).on("click", ".gifbtns", addGif);
//   when clicking a gif changes from still to animate ... vice versa
$(".actualGif").on("click", function() {
    
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    });

//   display original array as buttons
  renderButtons();
});