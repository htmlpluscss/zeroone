window.selects = select => {

	if(select.querySelector('.select__list')) {

		return;

	}

	const value = document.createElement('div');

	value.className = 'select__value';
	value.innerHTML = '<span class="select__value-inner"></span>';

	value.insertAdjacentHTML('beforeend', '<svg width="24" height="24" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="round" stroke-width="1.5" d="M18.75 9 12 15.75 5.25 9"/></svg>');
	select.append(value);

	const form = select.closest('form'),
		control = select.querySelector('select'),
		option = select.querySelectorAll('option'),
		valueText = select.querySelector('.select__value-inner'),
		list = document.createElement('div');

	list.className = 'select__list';

	let selected = control.querySelector('[value="' + control.value + '"]');

	// в мобиле системный контрол

	control.addEventListener("change", () => {

		valueText.textContent = control.querySelector('option[value="' + control.value + '"]').textContent;

		// d мобиле кнопки не нужены
		list.remove();

	});

	const valueDefault = selected.textContent;

	if( control.disabled || control.value === 'none' || control.value === '' ){

		select.classList.add('is-default');

	}

	if ( control.value !== '' ) {

		valueText.textContent = select.querySelector('option[value="' + control.value + '"]').textContent;

	}

	[...option].forEach( el => {

		const btn = document.createElement('label'),
			  label = document.createElement('span'),
			  input = document.createElement('input');

		btn.className = 'select__list-item';

		input.type = 'radio';
		input.className = 'visuallyhidden';
		input.name = control.name;
		input.value = el.value;

		label.textContent = el.textContent;

		if ( control.value === el.value ) {

			input.checked = true;

		}

		control.addEventListener('change', () => {

			select.classList.remove('is-open');

		});

		input.addEventListener('change', () => {

			valueText.textContent = el.textContent;

			setTimeout( ()=> select.classList.remove('is-open'));

			// не мобиле системный контрол не нужен
			control.remove();

		});

		btn.addEventListener('click', () => {

			setTimeout( ()=> select.classList.remove('is-open'));

		});

		btn.append(input);
		btn.append(label);
		list.append(btn);

	});

	select.append(list);

	// возврат в дефолтное состояние, при резет формы

	form && form.addEventListener("reset", () => {

		select.classList.add('is-default');
		valueText.textContent = valueDefault;

	});

	select.classList.add('is-ready');

};

( () => {

	window.selectsCollection = document.querySelectorAll('.select');

	if(window.selectsCollection.length) {

		[...window.selectsCollection].forEach( select => window.selects(select));

	}

	window.addEventListener("click", event => {

		const isSelect = event.target.closest('.select');

		[...window.selectsCollection].forEach( select => {

			select.classList.toggle('is-open', select === isSelect && isSelect.classList.contains('is-open') === false);

		});

	});

})();