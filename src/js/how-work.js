( items => {

	if( items.length ) {

		[...items].forEach( item => {

			const video = item.querySelector('video');

			item.addEventListener('mouseenter', () => {

//				video.paused && video.play();

			});

			item.addEventListener('mouseleave', () => {

//				video.paused || video.pause();

			});

		});

	}

})(document.querySelectorAll('.how-work__item'));