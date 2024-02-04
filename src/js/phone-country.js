( elements => {

	if(elements.length === 0) {

		return;

	}

	[...elements].forEach( dropdown => {

		const mask = dropdown.querySelector('.phone-country__mask'),
			  code = dropdown.querySelector('.phone-country__code'),
			  flag = dropdown.querySelector('.phone-country__toggle-flag'),
			  item = dropdown.querySelectorAll('.phone-country__item');

		[...item].forEach( btn => {

			btn.addEventListener("click", () => {

				let placeholder = btn.getAttribute('data-mask');
				placeholder = placeholder.replace(/\\9/g, '$');
				placeholder = placeholder.replace(/9/g, '0');
				placeholder = placeholder.replace(/\$/g, '9');

				mask.setAttribute('placeholder', placeholder);
				mask.value = '';

				Inputmask(btn.getAttribute('data-mask')).mask(mask);

				let maskInput;

				maskInput = new Inputmask({
					mask: btn.getAttribute('data-mask'),
					placeholder: '0'
				});

				maskInput.mask(mask);

				mask.focus();

				code.value = btn.getAttribute('data-code');

				flag.innerHTML = btn.querySelector('.phone-country__item-flag').innerHTML;

			});

		});

	});

	window.addEventListener("click", event => {

		const isDropdown = event.target.closest('.phone-country__toggle') ? event.target.closest('.phone-country') : null;

		[...elements].forEach( dropdown => {

			dropdown.classList.toggle('is-open', dropdown === isDropdown && isDropdown.classList.contains('is-open') === false );

		});

	});

})(document.querySelectorAll('.phone-country'));