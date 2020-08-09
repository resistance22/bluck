document.addEventListener( 'DOMContentLoaded', function() {
	const elem = document.querySelector( '.bluck-slide-inner' );
	const flkty = new Flickity( elem, {
		// options
		cellAlign: 'left',
		contain: true,
		wrapAround: true,
		autoPlay: 2500,
	} );
} );
