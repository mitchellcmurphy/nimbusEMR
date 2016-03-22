function animateMenuIcon(x) {
    x.classList.toggle("change");
    
    if($('#menuIcon').hasClass("change")){
	    $( ".navbar-full" ).slideDown( "slow", function() {
		    // Animation complete.
		});
	}
	else{
		$( ".navbar-full" ).slideUp( "slow", function() {
		    // Animation complete.
		});
	}
}

$(".dropdown").hover(function() {
    $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
   },
   function() {
     $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
});