var extra_more_collapse = false;

$('.extra-show-js').click(function(){
	let span=$(this).next('.extra-more');
	let anch=$(span).next('.extra-js-2');
	if (extra_more_collapse) {
		$('.extra-more').removeClass('extra-show-more');
		$('.extra-more').addClass('extra-hide-more');
		$('.extra-js').removeClass('extra-hide-js');
		$('.extra-js').addClass('extra-show-js');
		$('.extra-js-2').removeClass('extra-show-js');
		$('.extra-js-2').addClass('extra-hide-js');
	}
	$(anch).removeClass('extra-hide-js');
	$(anch).addClass('extra-show-js');
	$(this).removeClass('extra-show-js');
	$(this).addClass('extra-hide-js'); 
	$(span).removeClass('extra-hide-more');
	$(span).addClass('extra-show-more');
});

$('.extra-js-2').click(function(){
	let span=$(this).prev('.extra-more');
	let anch=$(span).prev('.extra-js');
	$(span).removeClass('extra-show-more');
	$(span).addClass('extra-hide-more');
	$(anch).removeClass('extra-hide-js');
	$(anch).addClass('extra-show-js');
	$(this).removeClass('extra-show-js');
	$(this).addClass('extra-hide-js'); 
});
