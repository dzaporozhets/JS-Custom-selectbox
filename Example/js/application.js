// Example show how call selectbox with params
document.observe("dom:loaded", function() {	
	// replace with custom selectbox
	var languageBox = new SelectBox({
		id:'language-switch',	// * required
		animation_show:'slide', // slide, appear, blind
		animation_show_interval: 0.1, // 0.1 ... infinity
		animation_hide:'fade',  // slide, fade, blind
		animation_hide_interval: 2.1, // 0.1 ... infinity
		select_width: 286, 		// new selectbox width
		options_top: 40, 		// options holder offset
		options_left: 0, 		// options holder offset
	});	
});