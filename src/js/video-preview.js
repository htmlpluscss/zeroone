( box => {

	if( box ) {

		const video = box.querySelector('video');

		video.addEventListener('click', () => {

			if ( video.paused ) {

				video.play();

			}
			else {

				video.pause();

			}

		});

		box.querySelector('.video-preview__box').addEventListener('click', () => {

			box.querySelector('.video-preview__box').remove();

			box.querySelector('.video-preview__video').classList.remove('hide');

			video.play();

		});

	}

})(document.querySelector('.video-preview'));