//Set focus to first input field ("Name") at page load

$(function() {
    $( '#name' ).focus();
  });

  //Hide text input for 'other' element initially if JS is running



  $(function() {
    var 
    title = $('#title'),
    onChange = function(event) {
        if ($(this).val() === 'other') {
            $('#other-title').show();
            $('#other-title').focus().select();
        } else {
            $('#other-title').hide();
        }
    };
    onChange.apply(title.get(0)); // To show/hide the Other textbox initially
    title.change(onChange);
}); 