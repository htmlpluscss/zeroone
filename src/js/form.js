( forms => {

	const doneResult = document.querySelector('.modal-done');
	const templateError = doneResult.querySelector('.form-template-error').innerHTML;

	[...forms].forEach( form => {

		const templateDone = form.querySelector('.form-template-done').innerHTML;

		form.addEventListener('submit', event => {

			event.preventDefault();

			location.assign(form.elements.redirect.value);

			const formData = new FormData(form),
				  formDataJSON = {},
				  btn = form.querySelector('.form__submit');

			formData.forEach( (value, key) => formDataJSON[key] = value );

			btn.disabled = true;

			fetch(form.getAttribute('action'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formDataJSON)
			})
			.then(response => response.json())
			.then(result => {

				console.log(result);

				if ( form.elements.subject.value === 'modal-login' ) {

					form.querySelector('.form__error-text').classList.remove('hide');

					return;

				}

				btn.disabled = false;

				if ( result.status === "ok" ) {

					doneResult.innerHTML = templateDone;

				}
				else {

					doneResult.innerHTML = templateError;

					doneResult.querySelector('.modal-done__message').innerHTML = result.message;

				}

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "done"
					}
				});

				modal.dispatchEvent(eventModalShow);

				form.reset();

			});

		});

	});

})(document.querySelectorAll('.form'));