//Set focus to first input field ("Name") at page load

$(function() {
  $( '#name' ).focus();
  

  //Hide text input for 'other' element initially, show textbox when 'other' is selected (change event)
    
  $(function() {
    var title = $('#title'),
    onChange = function() {
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

////////T-shirt section//////////   

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

//////////Activities section/////////////
//create new DOM element to display total cost and append it to ' .activities' section
    let totalCostCalc = 0;
    var totalCostCalcElem = $('<span></span>').html('<b>Total: $' + totalCostCalc + '</b>');

    $('.activities').append(totalCostCalcElem);
 
 //Update and display the total cost of the activities selected
    $('.activities').change(function(event) {
        const checked = event.target;
        let cost = parseInt($(checked).attr('data-cost').replace(/\D(\d+)/, '$1'));
    if( $(checked).is(':checked')) {
        totalCostCalc += cost;
        totalCostCalcElem.html('<b>Total: $' + totalCostCalc + '</b>');
    } else {
        totalCostCalc -= cost;
     totalCostCalcElem.html('<b>Total: $' + totalCostCalc + '</b>');
    }

 //Don't allow user to select conflicting activities
        var activitiesList = $('.activities input');

        $(activitiesList).each(function(index) {
 
        if( $(activitiesList[index]).attr('data-day-and-time') === $(checked).attr('data-day-and-time') && checked != activitiesList[index] ) {
            if($(activitiesList[index]).attr('disabled')) { 
                $(activitiesList[index]).attr('disabled', false);
            } else {
                $(activitiesList[index]).attr('disabled', true); 
            }
        }
        });
    });

/////////Payment Info/////////

 //Display payment sections based on the paymeny option chosen from select menu
 //CC payment option shown by default and hide PP and BC options

 //'Select Payment Method' should be hidden from dropdown, credit Card option is default selection
 $('option[value="select method"]').attr('hidden', true);

 $('option[value="Credit Card"]').attr('selected', true);
 const ccPayDiv = $('#credit-card');
 const bitPayDiv = $('#bitcoin').hide();
 const ppPayDiv = $('#paypal').hide();

 //Event handler listens for changes in payment selection
 //Shows info for chosen method and hides others

 $('#payment').on('change', function (event) {
     const selected = $(event.target);
     
     if (selected.val() === "Credit Card") {
         ccPayDiv.show();
         bitPayDiv.hide();
         ppPayDiv.hide();
     } else if (selected.val() === "PayPal") {
         ppPayDiv.show();
         ccPayDiv.hide();
         bitPayDiv.hide();    
     } else if (selected.val() === "Bitcoin") {
         bitPayDiv.show();
         ccPayDiv.hide();
         ppPayDiv.hide();
     }

 });


});
