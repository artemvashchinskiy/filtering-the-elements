'use strict'

// $(document).ready(function() {
//     const elements = $('.elements');
//     const color = $('.filters__color');
//     function generateElement() {
//         $.ajax({
//             url: 'pictures.json',
//             dataType: 'json',

//         })
//         .done(function(data){
//             $.each(data, function(index, element) {
//                 let li = `<li class="elements__item">
//                 <img src="${element.url}">
//                 </li>`
//                 elements.append(li);
//             })
//             console.log(data);
//         })
//         .file(function(data) {
//             console.error('error')
//         });
//     };
//     generateElement()
//     let col = [];
//         color.delegate('li', 'click', function() {
//         $(this).toggleClass('active');
//         let c = [];
//         $('.active').each(function(){
//             c.push($(this).data('color'))
//         });
//         col = [...c]
//         console.log(col);
//     })
//     $('.add').on('click', function(){});
//     $('.elments__item').each(function(){
//         $(this).ad
//     })
// })

// c = 1
// b = [4,6,7,3,1,3,5,76,2,1,2,3,7]
// t = [];
// b.forEach(elem => {
//     if(c[0] ===b[i]) {
//         t = [...t , b [i]]
//     }
// })


$(document).ready(function() {
    var jsonData; // Variable to store the loaded JSON data
    var selectedColors = []; // Array to store the selected colors
    var selectedShapes = []; // Array to store the selected shapes
  
    // Load JSON data using AJAX
    $.ajax({
      url: "pictures.json",
      dataType: "json",
      success: function(data) {
        jsonData = data; // Store the loaded JSON data
        populateElements(jsonData); // Populate the elements initially
      },
      error: function() {
        console.log("Error loading JSON data");
      }
    });
  
    // Handle click on filter button
    $('.button.add').click(function() {
      if (selectedColors.length > 0 || selectedShapes.length > 0) {
        // Filter the elements based on selected colors and shapes
        var filteredData = jsonData.filter(function(item) {
          var colorMatch = selectedColors.length === 0 || selectedColors.includes(item.color);
          var shapeMatch = selectedShapes.length === 0 || selectedShapes.includes(item.shape);
          return colorMatch && shapeMatch;
        });
  
        // Clear the elements list
        $('.elements').empty();
  
        // Populate the filtered elements
        populateElements(filteredData);
      }
    });
  
    // Handle click on clear button
    $('.button.clear').click(function() {
      // Remove the active class from color and shape filters
      $('.filters__color li, .filters__shape li').removeClass('active');
      selectedColors = [];
      selectedShapes = [];
  
      // Clear the elements list
      $('.elements').empty();
  
      // Populate all elements
      populateElements(jsonData);
    });
  
    // Handle click on color filters
    $('.filters__color li').click(function() {
      var color = $(this).data('color');
      $(this).toggleClass('active');
  
      if ($(this).hasClass('active')) {
        selectedColors.push(color);
      } else {
        var index = selectedColors.indexOf(color);
        if (index > -1) {
          selectedColors.splice(index, 1);
        }
      }
    });
  
    // Handle click on shape filters
    $('.filters__shape li').click(function() {
      var shape = $(this).data('shape');
      $(this).toggleClass('active');
  
      if ($(this).hasClass('active')) {
        selectedShapes.push(shape);
      } else {
        var index = selectedShapes.indexOf(shape);
        if (index > -1) {
          selectedShapes.splice(index, 1);
        }
      }
    });
  
    // Populate the elements
    function populateElements(data) {
      var elementsList = $('.elements');
  
      $.each(data, function(index, item) {
        var listItem = $('<li class="elements__item"></li>').attr('data-color', item.color).attr('data-shape', item.shape);
        var image = $('<img>').attr('src', item.url).attr('alt', '');
        listItem.append(image);
        elementsList.append(listItem);
      });
  
      updateTotalCount();
    }
  
    // Update the total count of elements
    function updateTotalCount() {
      var totalCount = $('.elements__item').length;
      $('.total span').text(totalCount);
    }
  });