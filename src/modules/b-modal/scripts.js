$(function(){
	$('.modal-trigger').click(function(){
		var target = $(this).data('target');
		$(target). fadeToggle();
	});

	$('.b-modal__close, .b-modal__overlay').click(function(){
		$(this).parents('.b-modal').fadeOut();
	});
});