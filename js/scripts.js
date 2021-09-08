$(document).ready(function(){
	$(".owl-carousel").owlCarousel({
		loop:true,
		margin:30,
		nav:true,
		dots:false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			1000:{
				items:2
			}
		}
	});
});


$(document).ready(function(){
	$('button.navbar-toggle').click(function(){
		$('.navbar-collapse').toggle();
	})
});