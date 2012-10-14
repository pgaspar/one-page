var saved_page;

$(document).ready(function() {
	$('#account-menu a').tooltip();

  // UI-UX

	$('header .editable').inlineEdit({
	    save: function(e, data) {
	    	target = $(this).data('target');
	    	$('#'+target).val(data.value);
	    },
	    saveOnBlur: true,
	    buttons: ''
	});

	$('h2.editable').inlineEdit({
	    save: function(e, data) {
	    	target = $(this).data('target');
	    	$('#'+target).val(data.value);
	    },
	    saveOnBlur: true,
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
    var nav_code     = "<li><div class=\"remove-section\"><b class=\"icon-remove\"></b></div><a href=\"#section-" + c + "\"><i class=\"icon-chevron-right\"></i> New Section</a></li>";
    var section_code = "<section id=\"section-" + c + "\"><div class=\"page-header editable\"><h2>New Section</h2></div><p class=\"lead editable\">Write your content here.</p></section>";

    $(".nav-list.section-nav").append(nav_code);
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


  // Menu ---
  $('#edit-header').on('click', function(e){

  	$('#gradient-editor').toggleClass('open');
  	

  	e.preventDefault();
  });

  //--- Menu

  $('#save-link').on('click', function(e) {
    save_page(null);
    e.preventDefault();
  });

  $('form#new_user').submit(function(e){
    var user = {
      email: $('#user_email').val(),
      password: $('#user_password').val()
    };
    save_page(user);
    e.preventDefault();
  });

  $(".nav-list").sortable({
    placeholder: "drag-highlight",
    axis: "y",
    cursor: "move",
    delay: "200",

    update: function(e, ui) {
      var i = ui.item.index() + 1;
      id = $("a", ui.item).attr("href");
      var section = $(id);

      if (section.index()+1 > i) {
        $("#section-container section:nth-child(" + i + ")").before(section);
      } else {
        $("#section-container section:nth-child(" + i + ")").after(section);  
      }

      $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh')
      });
    }
  });

  $('.remove-section').live('click', function(){
    var section = $( $(this).parent().children("a").attr("href") );
    $(this).parent("li").remove();
    section.remove();
  });

  // Save first page state
  if ($('#page').size() > 0) {
    saved_page = process_page_from_dom();
  }

});

$(window).bind('beforeunload', function(){
  if ($('#page').size() > 0 && page_changed()) {
    return 'There are unsaved changes on this page.';
  }
});

// FUNCTIONS

function process_page_from_dom() {
  var page = {};
  var page_header = $('header');
  var page_slug = $('header').attr('data-slug');

  page.title = html_or_edit_form($('header h1'));
  page.subtitle = html_or_edit_form($('header p'));
  page.gradient_left = page_header.attr('data-gradient-left');
  page.gradient_right = page_header.attr('data-gradient-right');

  page.sections_attributes = [];
  $('#section-container section').each(function(){
    page.sections_attributes.push({
      title: html_or_edit_form($('h2',this)),
      content: html_or_edit_form($('p.lead',this))
    });
  });

  return page;
}

function html_or_edit_form(scope) {
  return $.trim($('textarea',scope).html() || $('input',scope).val() || scope.html());
}

function page_changed() {
  return JSON.stringify(saved_page) !== JSON.stringify(process_page_from_dom());
}

function save_page(user) {
  var page_slug = $('header').attr('data-slug');
  var page = process_page_from_dom();
  var data = {page: page};
  if (user) {
    data.user = user;
  }

  $.ajax({
    type: page_slug ? "PUT" : "POST",
    url: (page_slug ? "/pages/" + page_slug : '/pages') + '.json',
    data: data,
    success: function(data) {
      if (!page_slug) {
        if (user) {
          window.location = "/pages/" + data.slug;
        } else {
          history.pushState({}, page.title, "/pages/" + data.slug);
        }
      }
      saved_page = page;
      $('title').html(page.title);
      $('meta[name=description]').attr('content', page.subtitle);
      console.log('saved.');
    },
    error: function(data) {
      if (user) {
        $('form#new_user .alert').remove();
        $('form#new_user').prepend('<div class="alert alert-error">' + data.responseText + '</div>');
      }      
    }
  });
}
