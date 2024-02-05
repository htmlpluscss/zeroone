( youtube => {

	if( youtube.length ) {

		[...youtube].forEach( link => {

			const id = link.getAttribute('data-youtube');

			link.addEventListener('click', event => {

				event.preventDefault();

				if ( link.classList.contains('is-ready') ) {

					return;

				}

				link.classList.add('is-ready');

				const iframe = document.createElement('iframe');

				iframe.setAttribute('allowfullscreen', '');
				iframe.setAttribute('allow', 'autoplay');
				iframe.setAttribute('src', 'https://www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autoplay=1');

				link.append(iframe);

			});

		});

	}

})(document.querySelectorAll('[data-youtube]'));