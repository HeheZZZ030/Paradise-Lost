// Function to be executed when the document is ready
$(document).ready(function() {
	// Initial call to draw the navigation dots
	redrawDotNav();
	
	/* Scroll event earler */
    $(window).bind('scroll',function(e){
		// Call the parallax scrolling function
    	parallaxScroll();
		// Redraw the navigation dots based on scroll position
		redrawDotNav();
    });
    
	/* Next/prev and primary nav button click event handlers */
	$('a.The-protagonist').click(function(){
    	$('html, body').animate({
    		scrollTop:0
    	}, 1000, function() {
			// Callback is required for iOS
	    	parallaxScroll(); 
		});
    	return false;
	});
    $('a.The-Alien-Star').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#The-Alien-Star').offset().top
    	}, 1000, function() {
			// Callback is required for iOS
	    	parallaxScroll(); 
		});
    	return false;
    });
    $('a.Destiny').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#Destiny').offset().top
    	}, 1000, function() {
			 // Callback is required for iOS
	    	parallaxScroll(); 
		});
    	return false;
    });
	$('a.About').click(function(){
    	$('html, body').animate({
    		scrollTop:$('#About').offset().top
    	}, 1000, function() {
			 // Callback is required for iOS
	    	parallaxScroll();
		});
    	return false;
    });
    
       /* Show/hide dot nav labels on hover */
    $('nav#primary a').hover(
    	function () {
			$(this).prev('h1').show();
		},
		function () {
			$(this).prev('h1').hide();
		}
    );
    
});

/* Scroll the background layers */
function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#parallax-bg3').css('top',(0-(scrolled*.75))+'px');
}

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#The-Alien-Star').offset().top - (($('#Destiny').offset().top - $('#The-Alien-Star').offset().top) / 2);
	var section3Top =  $('#Destiny').offset().top - (($('#About').offset().top - $('#Destiny').offset().top) / 2);
	var section4Top =  $('#About').offset().top - (($(document).height() - $('#About').offset().top) / 2);;
	// Remove 'active' class from all navigation dots
	$('nav#primary a').removeClass('active');
	// Add 'active' class to the corresponding navigation dot
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.The-protagonist').addClass('active');
	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.The-Alien-Star').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.Destiny').addClass('active');
	} else if ($(document).scrollTop() >= section4Top){
		$('nav#primary a.About').addClass('active');
	}
	
}
