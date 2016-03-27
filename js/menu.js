function animateMenuIcon(x) {
    x.classList.toggle("change");
    
	$( ".navbar-full" ).slideToggle( "slow", function() {
		if ($(this).is(':visible')){
			$(this).css('display','inline-block');
			$(document).bind('scroll',function () { 
			       window.scrollTo(0,0); 
			  });
		}
		else{
			$(document).unbind('scroll');
		}

	});
}


$(window).scroll(function () {
    if ($(window).scrollTop() > 45) {
        $('.dropdown-menu').addClass('dropdown-menu-fixed');
    }
    else{
    	$('.dropdown-menu').removeClass('dropdown-menu-fixed');
    }
});