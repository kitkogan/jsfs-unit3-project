/////////Treehouse JSFS Unit 3 Project- Interactive Form///////////////

//Set focus to first input field ("Name") at page load

$(function(){
    $("#name").focus();
  
  
 //Hide text input for 'other' element initially, show textbox when 'other' is selected (change event)

    $("#other-title").hide();
    $("#title-label").hide();

    $("#title").change(function(){
        if ($("#title").val() == "other") {
        $("#other-title").show();
        } else {
        $("#other-title").hide();
        }
    });

////////T-shirt section//////////   

//Hide color label and select menu until theme is chosen
//Only allow user to view and select correct color options based on theme choice, starting with 1st option from each respective list
//Add un-selectable menu prompt instructing user to choose a T-shirt theme if none is selected, after color menu is revealed
  $("#colors-js-puns").hide();
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
//Don't allow user to select conflicting activities

    $(":checkbox").change(function(){

    //Clears activity conflict messages

         $(".conflict").remove();
         $("#activityerror").remove();
  
  
    //Prevent scheduling copnflicts

        let jsframeworks = $("input[name='js-frameworks']");
        let express = $("input[name='express']");
        let jslibs= $("input[name='js-libs']");
        let node = $("input[name='node']");
  
  
    function activityConflict(activity, conflict){
        if (activity.is(":checked")) {
            conflict.attr("disabled", true);
            conflict.parent().after("<b><p class='conflict'>This activity conflicts with your selection.</p></b>");
  
          //This will gray out options that conflict with current selection
  
          conflict.parent().css('color','gray');
  
        } else {
          conflict.attr("disabled", false);
          conflict.parent().css('color','#000');
  
        }
      }
  
  
    activityConflict(jsframeworks, express);
    activityConflict(express, jsframeworks);
    activityConflict(jslibs, node);
    activityConflict(node, jslibs);
  
  });
  
  //Create new DOM element to display total cost and append it to ' .activities' section
  //Update and display the total cost of the activities selected

  $(":checkbox").change(function(){
      let total = 0;
       $("#cost").remove();
  
            if ($("input[name='all']").is(":checked"))  {
              total += 200;
            }
          $(".activities input:not([name='all'])").each(function(){
              if ($(this).is(":checked")) {
              total += 100;
            }
            });
  
      if (total > 0) {
      $(".activities").append("<b><p id='cost'>Total activity cost: $" + total + " </p></b>");
      }
  });

/////////Payment Info/////////

 //Display payment sections based on the payment option chosen from select menu
 //CC payment option shown by default, hide PP and BC options

 //'Select Payment Method' should be hidden from dropdown
 //Credit Card option is default selection

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


/////////Form Validation//////////
  
//Name field must contain at leasst one letter, 
//If it does not pass validation the Name field text and border will turn red, error message generated

    function validName() {
        const inputName = $('#name');
        const regexName = /^[a-zA-Z]+$/;

        if (!(regexName.test($("#name").val()))) {
            
            inputName.css('border-color', '#B20000');
            $('[for="name"] span').remove(); 
            $('[for="name"]').append('<span><b> Please type your name </b></span>').css('color', '#B20000');
            return false;
        } else {
            inputName.css('border-color', '#794880'); 
            $('[for="name"] span').remove(); 
            $('[for="name"]').css('color', '#000000');
            return true;
        }
    }

    //Event handler listens for changes in Name field
    //Displays error message if validation rejected
    //Displays error message if user clicks out of blank textbox (will engage before user submits form)

    $('#name').on('focusout', function () {
        validName();
    });

    //A validly formatted email address is required
    //If it does not pass validation the Email field text and border will turn red, error message generated
    //Displays tooltip in box if input is not valid (will engage before user submits form)

    function validEmail() {
        const regexEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!(regexEmail.test($("#mail").val()))) {
            $('#mail').css('border-color', '#B20000');
            $('[for="mail"] span').remove();
            $('[for="mail"]').append('<span><b> Valid email address required to proceed </b></span>').css('color', '#B20000');
            return false;
        } else {
            $('#mail').css('border-color', '#794880');
            $('[for="mail"] span').remove();
            $('[for="mail"]').css('color', '#000000');
            return true;
        }
    }

    //Event handler listens for changes in Email field
    //Displays error message if a valid email is not provided
    //Displays error message as user types, until valid format is supplied 
    //Displays error message if user clicks out of blank textbox (will engage before user submits form)

    $('#mail').on('focusout keyup', function () {
        validEmail();
    });

    
   //At least one item from Activities list must be selected
   //If criteria not met the Activities text will turn red, error message generated
   //If user deselects all activities, error message will occur until new selection is made (will engage before user submits form)

    function validActivities() {
        if($('input[type="checkbox"]').is(':checked')) {
            $('.activities legend span').remove();
            $('.activities legend').css('color', '#000000');
            return true;
        } else {
            $('.activities legend span').remove();
            $('.activities legend').append('<span><b>: Please select at least one activity from list </b></span>').css('color', '#B20000');
            return false;
        }

    }
  

    //Event handler listens for changes in Activities list
    //Displays error message if validation rejected

    $('.activities').on('click', function () {
        validActivities();
    });


    //CC requires >= 13 numbers, <= 16 numbers
    //If validation not passed, CC text and border will turn red, error messages generated
        //Seperate errors for: < 13 nums, > 16 nums, and input left blank

    function validCC() {
        const regexCC = /^(?:[0-9]{13,16})?$/;

        if ($('#cc-num').val().length < 13) {
            $('#cc-num').css('border-color', '#B20000');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').append('<span><b> Credit card number should be at least 13 digits long </span>').css('color', '#B20000');
            return false;
        } else if ($('#cc-num').val().length > 16) {
            $('#cc-num').css('border-color', '#B20000');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').append('<span><b> Credit card number should be no more than 16 digits long </b></span>').css('color', '#B20000');
            return false;
        }
        else {
            if (regexCC.test($('#cc-num').val())) {
            $('#cc-num').css('border-color', '#794880');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').css('color', '#000000');
            return true;
        } else {
            $('#cc-num').css('border-color', '#B20000');
            $('[for="cc-num"] span').remove();
            $('[for="cc-num"]').append('<span><b> Please enter a valid credit card number </b></span>').css('color', '#B20000');
        return false;
            }
        }
    }

    //Event handler listens for changes in CC field
    //Displays error message if validation rejected
    //Displays error message if user clicks out of blank textbox (will engage before user submits form)

    $('#cc-num').on('focusout', function () {
        validCC();
    });

    //Zip code requires 5 digits
    //If validation not passed Zip text and border will turn red, error message generated

    function validZip() {
        const regexZip = /^\d{5}$/;

        if (!(regexZip.test($('#zip').val()))) {
            $('#zip').css('border-color', '#B20000');
            $('[for="zip"] span').remove();
            $('[for="zip"]').append('<span><b> Please enter a valid zip code </b></span>').css('color', '#B20000');
            return false;
        } else {
            $('#zip').css('border-color', '#794880;');
            $('[for="zip"] span').remove();
            $('[for="zip"]').css('color', '#000000');
            return true;
        }
    }

    //Event handler listens for changes is Zip code field
    //Displays error message if validation rejected
    //Displays error message if user clicks out of blank textbox (will engage before user submits form)

    $('#zip').on('focusout', function () {
        validZip();
    });


    //CVV requires 3 numbers for validation
    //If validation not passed CVV text and border will turn red, error message generated

    function validCVV() {
        const regexCVV = /^[0-9]{3}$/;

        if (!(regexCVV.test($('#cvv').val()))) { 
            $('#cvv').css('border-color', '#B20000');
            $('[for="cvv"] span').remove();
            $('[for="cvv"]').append('<span><b> Please enter a valid CVV </b></span>').css('color', '#B20000');
            return false;
        } else {
            $('#zip').css('border-color', '#794880');
            $('[for="cvv"] span').remove();
            $('[for="cvv"]').css('color', '#000000');
            return true;
        }
    }

     
    //Event handler listens for changes in CVV field
    //Displays error message if CVV validation is rejected
    //Displays error message if user clicks out of blank textbox (will engage before user submits form)
   
    $('#cvv').on('focusout', function () {
            validCVV();
    });
    
    
    //Tests to ensure conditions for form validation on submit, preventing default behaviors
    //CC form fields only required when CC payment option is selected

  
    const validForm = $('form');

    validForm.on('submit', function(event){

        if (validName() === false) { 
            event.preventDefault();
        } 
        
        if (validEmail() === false) {
            event.preventDefault();
        }

        if (validActivities() === false) {
            event.preventDefault();
        }

        if ($('[value="Credit Card"]').is(':selected')) { 
            if (validCC() === false) {
                event.preventDefault();
            }
            if (validZip() === false) {
                event.preventDefault();
            }
            if (validCVV() === false) {
                event.preventDefault();
            }
        }
          
    });
    
});