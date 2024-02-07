( forms => {

	//reCaptcha v3

	const PUBLIC_KEY = '6LcMlS8lAAAAAJgCJggfIyKopNr4NYq8CSS0dEZz';

	const reCaptcha = () => {

		[...forms].forEach( form => {

			form.removeEventListener('input', reCaptcha);

		});

		const script = document.createElement('script');

		script.src = 'https://www.google.com/recaptcha/api.js?render=' + PUBLIC_KEY;

		document.head.appendChild(script);

	}

	[...forms].forEach( form => {

//		form.addEventListener('input', reCaptcha);

		form.addEventListener('submit', event => {

			event.preventDefault();

/*
			if (typeof(grecaptcha) === 'undefined') {

				alert('Error! Google reCaptcha');

			} else {

				grecaptcha.ready( () => {

					grecaptcha.execute(PUBLIC_KEY).then( token => {
*/


						const formData = new FormData(form),
							  btn = form.querySelector('.form__submit');

						// Google Sheets

						fetch( 'http://80.90.191.111:6000/set_data' , {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(formData)
						});

//						formData.append('recaptcha_response', token);

						btn.disabled = true;

						fetch(form.getAttribute('action'), {
							method: 'POST',
							body: formData
						})
						.then(response => response.json())
						.then(result => {

							console.log(result);

							if ( form.elements.subject.value === 'modal-login' ) {

								form.querySelector('.form__error-text').classList.remove('hide');

								return;

							}

							btn.disabled = false;

							document.querySelector('.modal-done__title').innerHTML = result.title;
							document.querySelector('.modal-done__message').innerHTML = result.message;

							document.querySelector('.modal-done__ico-ok').classList.add('hide');
							document.querySelector('.modal-done__ico-reg').classList.add('hide');
							document.querySelector('.modal-done__ico-error').classList.add('hide');

							if ( result.status === "ok" ) {

								document.querySelector('.modal-done__ico-ok').classList.remove('hide');

							}
							else if ( result.status === "reg" ) {

								document.querySelector('.modal-done__ico-reg').classList.remove('hide');

							}
							else {

								document.querySelector('.modal-done__ico-error').classList.remove('hide');

							}

							const eventModalShow = new CustomEvent("modalShow", {
								detail: {
									selector: "done"
								}
							});

							modal.dispatchEvent(eventModalShow);

							form.reset();

						});
/*
					});

				});

			}
*/
		});

	});

})(document.querySelectorAll('.form'));