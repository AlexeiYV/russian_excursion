$('.b-sidebar-item__section-heading-toggler').click(function(){
	$(this).parents('.b-sidebar-item__section').find('.b-sidebar-item__section-content').slideToggle();
});