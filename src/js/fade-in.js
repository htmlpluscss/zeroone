(() => {

	if ('IntersectionObserver' in window) {

		const callback = (entries, observer) => {

			[...entries].forEach( entry => {

				if (entry.isIntersecting) {

					entry.target.classList.add('is-show');
					observer.unobserve(entry.target);

					setTimeout( () => entry.target.classList.remove('fade-in', 'is-show'), 3000);

				}

			});

		};

		const observer = new IntersectionObserver(callback);

		window.addEventListener("load", () => {

			[...document.querySelectorAll('.fade-in')].forEach( el => observer.observe(el) );

		});

	} else {

		[...document.querySelectorAll('.fade-in')].forEach( el => el.classList.remove('fade-in') );

	}

})();