$(document).ready(function() {
	$('header .editable').inlineEdit({
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
	    //saveOnBlur: true,
	    buttons: ''
	});

  $('.add-section').on('click', function(){
    var nav_code     = "<li><a href=\"#section-" + $("section").size() + "\"><i class=\"icon-chevron-right\"></i> New Section</a></li>";
    var section_code = "<section id=\"section-" + $("section").size() + "\"><div class=\"page-header\"><h1>New Section</h1></div><p class=\"editable\">Write your content here.</p></section>";

    $(".nav-list li:not(.add-section)").last().after(nav_code);
    $("section").last().after(section_code);
  });
  
});
