( tabs => {

	if ( tabs.length > 0 ) {

		const set = ()=> {

			const hash = location.hash;

			const next = document.querySelector(hash),
				  tab = next.closest('.tabs');

			const nav = tab.querySelectorAll('.tabs__nav-item'),
				  items = tab.querySelectorAll('.tabs__item');

			[...items].forEach( (item,index) => {

				if ( item === next ) {

					item.classList.add('is-active');
					nav[index].classList.add('is-active');

				}
				else {

					item.classList.remove('is-active');
					nav[index].classList.remove('is-active');

				}

			});

		}

		if ( location.hash && document.querySelector(location.hash) ) {

			set();

		}

		window.addEventListener( "hashchange", set );

	}

})(document.querySelectorAll('.tabs'));