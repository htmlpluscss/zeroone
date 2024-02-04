( time => {

	if ( time.length > 0 ) {

		const setTime = () => {

			[...time].forEach( el => {

				el.textContent = new Date().toLocaleString('en-US', { timeZone : el.getAttribute('data-timeZone'), hour12: false, hour: 'numeric', minute: 'numeric' });

			});

			const now = new Date();
			const millisecondsRemainingInMinute = 60000 - now.getMilliseconds();

			setTimeout( setTime, millisecondsRemainingInMinute );

		};

		setTime();

	}

})(document.querySelectorAll('.time'));