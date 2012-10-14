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

	$('.bs-docs-sidenav').affix({
      offset: {
        top: function () { return $(window).width() <= 980 ? 290 : 210 }
      , bottom: 270
      }
    })
});
