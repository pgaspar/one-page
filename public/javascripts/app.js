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
    var section_code = "<section id=\"section-" + c + "\"><div class=\"page-header\"><h2>New Section</h2></div><p class=\"lead editable\">Write your content here.</p></section>";

    $(".nav-list li.add-section").before(nav_code);
    $("#section-container").append(section_code);
  });

  var $leftColor  = $('header').attr('data-gradient-left') || '#020031';
  var $rightColor = $('header').attr('data-gradient-right') || '#6D3353';

  function updateGradient() {
    $('.jumbotron').css('background-color', $leftColor); /* Old browsers */
    $('.jumbotron').css('background-image', '-moz-linear-gradient(45deg, '+$leftColor+' 0%, '+$rightColor+' 100%'); /* FF3.6+ */
    $('.jumbotron').css('background-image', '-webkit-gradient(linear, left bottom, right top, color-stop(0%,'+$leftColor+'), color-stop(100%,'+$rightColor+')'); /* Chrome,Safari4+ */
    $('.jumbotron').css('background-image', '-webkit-linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* Chrome10+,Safari5.1+ */
    $('.jumbotron').css('background-image', '-o-linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* Opera 11.10+ */
    $('.jumbotron').css('background-image', '-ms-linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* IE10+ */
    $('.jumbotron').css('background-image', 'linear-gradient(45deg, '+$leftColor+' 0%,'+$rightColor+' 100%)'); /* W3C */
    $('.jumbotron').css('filter', 'progid:DXImageTransform.Microsoft.gradient( startColorstr=\''+$leftColor+'\', endColorstr=\''+$rightColor+'\',GradientType=1 )'); /* IE6-9 fallback on horizontal gradient */

    $('header').attr('data-gradient-left', $leftColor);
    $('header').attr('data-gradient-right', $rightColor);
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
    
    var page_slug = $('header').attr('data-slug');
    var page = process_page_from_dom();

    $.ajax({
      type: page_slug ? "PUT" : "POST",
      url: (page_slug ? "/pages/" + page_slug : '/pages') + '.json',
      data: { page: page },
      success: function(data) {
        if (!page_slug) {
          $('header').attr('data-slug', data.page.slug);
        }
        console.log('saved.');
      }
    });

    e.preventDefault();
  });

});

function process_page_from_dom() {
  var page = {};
  var page_header = $('header');

  page.title = html_or_edit_form($('header h1'));
  page.subtitle = html_or_edit_form($('header p'));
  page.gradient_left = page_header.attr('data-gradient-left');
  page.gradient_right = page_header.attr('data-gradient-right');

  page.sections = [];
  $('#section-container section').each(function(){
    page.sections.push({
      id: $(this).attr('data-id'),
      title: html_or_edit_form($('h2',this)),
      content: html_or_edit_form($('p.lead',this))
    });
  });

  return page;
}

function html_or_edit_form(scope) {
  return $('textarea',scope).html() || $('input',scope).val() || scope.html();
}