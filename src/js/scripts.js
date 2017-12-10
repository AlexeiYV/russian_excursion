$(function(){
	$('.js-site-menu-trigger').click(function(){
		$('.b-site-menu').slideToggle('slow');

	});

	$('.b-site-menu__list-item.has-children a').click(function(e){
		e.preventDefault();
		$(this).siblings('.b-site-menu__submenu').slideToggle();
	});

	$(document).click(function(e){
		if(!$(e.target).closest('.b-site-menu__list-item.has-children').length) {
			$('.b-site-menu__submenu').slideUp();
		}
	});

	$('[data-fancybox]').fancybox();
});
