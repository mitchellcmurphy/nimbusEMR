function animateMenuIcon(x) {
    x.classList.toggle("change");
    
	$( ".navbar-full" ).slideToggle( "slow", function() {
		if ($(this).is(':visible'))
			$(this).css('display','inline-block');
	});
    /* if($('#menuIcon').hasClass("change")){
    	
	    $( ".navbar-full" ).slideDown( "slow", function() {
	    	
		});
	}
	else{
		$( ".navbar-full" ).slideUp( "slow", function() {
		    
		});
	} */
}

// $(".dropdown").hover(function() {
//     $('.dropdown-menu', this).stop( true, true ).slideDown("fast");
//    },
//    function() {
//      $('.dropdown-menu', this).stop( true, true ).slideUp("fast");
// });

$(window).scroll(function () {
    if ($(window).scrollTop() > 45) {
        $('.dropdown-menu').addClass('dropdown-menu-fixed');
    }
    else{
    	$('.dropdown-menu').removeClass('dropdown-menu-fixed');
    }
});