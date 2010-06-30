// Example show how call selectbox with params
document.observe("dom:loaded", function() {	
	// replace with custom selectbox
	var languageBox = new SelectBox({
		id:'language-switch',	// * required
		animation_show:'slide', // slide, appear, blind
		animation_hide:'fade',  // slide, fade, blind
		select_width: 286, 		// new selectbox width
		options_top: 40, 		// options holder offset
		options_left: 0, 		// options holder offset
	});	
});