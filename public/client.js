// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  
  $('#add-more').click(function(e){
    e.preventDefault();

    //create and add new option element
    var newOption = $.parseHTML('<div class="form-group"><div class="input-group"><input class="form-control" type="text" autocomplete="off"><span class="input-group-btn"><button class="remove-me btn btn-danger">-</button></span></div></div>');
    $('#options').append(newOption);
    
    //remove option handler
    $('.remove-me').click(function(e){
        e.preventDefault();
        $(this).closest(".form-group").remove();
    });
  });
  
  //poll form submission handler
  $('#poll form').submit(function(event) {
    event.preventDefault();
        
    var formData = {
      options: []
    };
    
    //collect all data from form for submission
    $('#poll form').find('input').each(function() {
      if (this.name == "votename") formData.votename = this.value;
      else formData.options.push(this.value);
    });
        
    $.post('/add?' + $.param(formData), function(url) {
      
      //FIXME handle errors
      
      console.log("poll saved");
      //hide poll form on callback from server
      $('#poll').hide();
      
      //show url of the submitted poll
      var pollUrl = $.parseHTML("<h4><a href=" + url + ">" + url + "</a><h4>");
      $('#polllink').show();
      $('#polllink h4').append(pollUrl);
    });
  });
});
