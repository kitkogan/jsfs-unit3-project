//Set focus to first input field ("Name") at page load

$(function() {
    $( '#name' ).focus();
  

  //Hide text input for 'other' element initially, show textbox when 'other' is selected (change event)
    
  $(function() {
    var title = $('#title'),
    onChange = function(event) {
        if ($(this).val() === 'other') {
            $('#other-title').show();
            $('#other-title').focus().select();
        } else {
            $('#other-title').hide();
        }
    };
    onChange.apply(title.get(0));
    title.change(onChange);
}); 

//Hide color menu so that user can only select valid option combinations for "Design" and "Color" fields 
//add HTML prompt instructing user to choose a T-shirt theme
 $('#color').html("<option value='none'>Please select a T-shirt Theme</option>");
 var themeSelected = false;
$( "#design").change(function() {
  // if "Theme- JS Puns" is selected show relevant color options
      if ($("#design option:selected").text() == "Theme - JS Puns") {
          $('#colors-js-puns').show();
          $("#color").html("<option value='cornflowerblue'>Cornflower Blue</option><option value='darkslategrey'>Dark Slate Grey</option><option value='gold'>Gold</option>");
          themeSelected = true;
          return themeSelected
          }
          // if "Theme - I ♥ JS" has been selected show relevant color options
      else if ($("#design option:selected").text() == 'Theme - I ♥ JS') {
              $('#colors-js-puns').show();
              $("#color").html("<option value='tomato'>Tomato</option><option value='steelblue'>Steel Blue</option><option value='dimgrey'>Dim Grey</option>");
              themeSelected = true;
              return themeSelected;
          }
          // if user has not made a selection show HTML prompt instructing user to choose a T-shirt theme
      else {
              $('#colors-js-puns').show();
              $('#color').html("<option value='none'>Please select a T-shirt Theme</option>");
              themeSelected = true;
              return $('#color').html("<option value='none'>Please select a T-shirt Theme</option>");
      }
});

});
