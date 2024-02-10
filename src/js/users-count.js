( items => {

	if ( items.length > 0 ) {

		const start = parseInt( items[0].getAttribute('data-start') );
		const startDate = new Date( items[0].getAttribute('data-date') );
		const currentDate = new Date();
		const difference = currentDate - startDate;
		const daysPassed = parseInt( Math.floor(difference / (1000 * 60 )) / 50 );

		const options = {

			startVal: start,
			duration: 1,
			separator: ' ',

		};

		items.forEach( el => {

			el.textContent = ( daysPassed + start ).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

			const countUpEl = new countUp.CountUp(el, daysPassed + start, options);

			if ( !countUpEl.error ) {

				countUpEl.start();

			}

		});

	}

})(document.querySelectorAll('.last-screen__users-count'));