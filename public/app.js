//loads nyt articles onto page
function getArticles() {
    // Empty any results currently on the page
    $("#articles").empty();
    // Grab all of the current notes
    $.getJSON("/", function(data) {
      // For each note...
      for (var i = 0; i < data.length; i++) {
        $("#articles").prepend("<div class='container-fluid article-container</div>");
      }
    });
  }
  
  // Runs the getArticles function 
  getArticles();
  
  // When the #savedarticles button is clicked
  $(document).on("click", "#savedarticles", function() {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/saved",
      data: {
        title: $("#title").val(),
        link: $("#link").val(),
      }
    })

    .done(function(data) {
      // Add the title and delete button to the #articles section
      $("#articles").prepend("<<div class='container-fluid article-container</div>");
      // Clear the note and title inputs on the page
      $("#articlenotes").val("");
      $("#title").val("");
    }
    );
  });

  // When user clicks the deleter button for a note
  $(document).on("click", ".deleter", function() {
    var selected = $(this).parent();
    // deletes a specific note
    $.ajax({
      type: "GET",
      url: "/saved" + selected.attr("data-id"),
      success: function(response) {
        // Remove the p-tag from the DOM
        selected.remove();
        // Clear the note and title inputs
        $("#note").val("");
        $("#link").val("");
        $("#actionbutton").html("<button id='delete' class = 'btn btn-danger'>Delete from Saved</button>");
      }
    });
  });
  
