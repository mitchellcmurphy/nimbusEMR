function animateMenuIcon(x) {
    x.classList.toggle("change");
    
    if($('#menuIcon').hasClass("change")){
    	
	    $( ".navbar-full" ).slideDown( "slow", function() {
	    	$( ".navbar-full" ).addClass('navbar-full-mobile');
		});
	}
	else{
		$( ".navbar-full" ).slideUp( "slow", function() {
		    $( ".navbar-full" ).removeClass('navbar-full-mobile');
		});
	}
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