( btns => {

	if ( btns.length > 0 ) {

		window.addEventListener('click', event => {

			const btn = event.target.closest('.lang__btn');

			if ( btn ) {

				btn.classList.toggle('is-open');

			} else {

				[...btns].forEach( btn => btn.classList.remove('is-open'));

			}

		});

	}

})(document.querySelectorAll('.lang__btn'));