$(document).ready(function() {
	$('header .editable').inlineEdit({
	    save: function(e, data) {
	    	target = $(this).data('target');
	    	$('#'+target).val(data.value);
	    },
	    //saveOnBlur: true,
	    buttons: ''
	});

	$('h2.editable').inlineEdit({
	    save: function(e, data) {
	    	target = $(this).data('target');
	    	$('#'+target).val(data.value);
	    },
	    //saveOnBlur: true,
	    buttons: ''
	});

	$('.container .editable').inlineEdit({
	    save: function(e, data) {
	    	target = $(this).data('target');
	    	$('#'+target).val(data.value);
	    },
	    control: 'textarea',
	    saveOnBlur: true,
	    buttons: ''
	});

  $('.add-section').on('click', function(){
    c = $("section").size();
    var nav_code     = "<li><a href=\"#section-" + c + "\"><i class=\"icon-chevron-right\"></i> New Section</a></li>";
    var section_code = "<section id=\"section-" + c + "\"><div class=\"page-header\"><h1>New Section</h1></div><p class=\"editable\">Write your content here.</p></section>";
    var form_code    = "<input id=\"page_sections_attributes_"+c+"_title\" name=\"page[sections_attributes]["+c+"][title]\" type=\"hidden\" value=\"New Section\"><input id=\"page_sections_attributes_"+c+"_content\" name=\"page[sections_attributes]["+c+"][content]\" type=\"hidden\" value=\"Write your content here.\">";

    $(".nav-list li.add-section").before(nav_code);
    $("#section-container").append(section_code);
    $('span.form-sections').append(form_code);
  });

  var $leftColor  = $('form input#page_gradient_left').val() || '#020031';
  var $rightColor = $('form input#page_gradient_right').val() || '#6D3353';

  function updateGradient() {
    $('.jumbotron').css('background-color', $leftColor); /* Old browsers */
    $('.jumbotron').css('background-image', '-moz-linear-gradient(45deg, '+$leftColor+' 0%, '+$rightColor+' 100%'); /* FF3.6+ */
    $('.jumbotron').css('background-image', '-webkit-gradient(linear, left bottom, right top, color-stop(0%,'+$leftColor+'), color-stop(100%,'+$rightColor+')'); /* Chrome,Safari4+ */
    $('.jumbotron').css('background-image', '-webkit-linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* Chrome10+,Safari5.1+ */
    $('.jumbotron').css('background-image', '-o-linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* Opera 11.10+ */
    $('.jumbotron').css('background-image', '-ms-linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* IE10+ */
    $('.jumbotron').css('background-image', 'linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* W3C */
    $('.jumbotron').css('filter', 'progid:DXImageTransform.Microsoft.gradient( startColorstr=\''+$leftColor+'\', endColorstr=\''+$rightColor+'\',GradientType=1 )'); /* IE6-9 fallback on horizontal gradient */

    $('form input#page_gradient_left').val($leftColor);
    $('form input#page_gradient_right').val($rightColor);
  };

  updateGradient();

  $('#gradient-left-color').spectrum({
    showInitial: true,
    flat: true,
    showButtons: false,
    color: $leftColor,

    move: function(color) {
      $leftColor = color.toHexString();
      updateGradient();
    }
  });

  $('#gradient-right-color').spectrum({
    showInitial: true,
    flat: true,
    showButtons: false,
    color: $rightColor,

    move: function(color) {
      $rightColor = color.toHexString();
      updateGradient();
    }
  });

  $('#save-link').on('click', function(e) {
    $('form').submit();
    e.preventDefault();
  });
});
