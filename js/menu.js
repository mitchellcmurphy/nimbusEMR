function animateMenuIcon(x) {
    x.classList.toggle("change");
    
	$( ".navbar-full" ).slideToggle( "slow", function() {
		if ($(this).is(':visible')){
			$(this).css('display','inline-block');
			$.scrollLock(true);
			// $(document).bind('scroll',function () { 
			//        window.scrollTo(0,0); 
			//        $.scrollLock(true);
			//   });
		}
		else{
			$.scrollLock(false);
		}

	});
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar-header').outerHeight();

$(window).scroll(function (event) {
	didScroll = true;
    if ($(window).scrollTop() > 45) {
        $('.dropdown-menu').addClass('dropdown-menu-fixed');
    }
    else{
    	$('.dropdown-menu').removeClass('dropdown-menu-fixed');
    }
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.navbar-header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.navbar-header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

$.scrollLock = ( function scrollLockSimple(){
	var locked   = false;
	var $body;
	var previous;

	function lock(){
	  if( !$body ){
	    $body = $( 'body' );
	  }
	  
	  previous = $body.css( 'overflow' );
		
	  $body.css( 'overflow', 'hidden' );

	  locked = true;
	}

	function unlock(){
	  $body.css( 'overflow', previous );

	  locked = false;
	}

	return function scrollLock( on ) {
		// If an argument is passed, lock or unlock depending on truthiness
		if( arguments.length ) {
			if( on ) {
				lock();
			}
			else {
				unlock();
			}
		}
		// Otherwise, toggle
		else {
			if( locked ){
				unlock();
			}
			else {
				lock();
			}
		}
	};
}() );