( forms => {

	[...forms].forEach( form => {

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

				btn.disabled = false;

				form.reset();

			});

		});

	});

})(document.querySelectorAll('.form'));