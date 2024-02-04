( modal => {

	if(!modal) {

		return;

	}

	const items = modal.querySelectorAll('.modal__item'),
		  btns = document.querySelectorAll('[data-modal]'),
		  wrapper = document.querySelector('.wrapper');

	let activeModal = null,
		windowScroll = window.pageYOffset;

	modal.addEventListener('hide', () => {

		document.body.classList.remove('modal-show');
		wrapper.style.top = 0;
		window.scrollTo(0,windowScroll);
		activeModal = false;

		window.requestAnimationFrame( () => document.documentElement.classList.remove('scroll-behavior-off'));

	});

	modal.addEventListener('keyup', event => {

		if(event.key === "Escape") {

			modal.dispatchEvent(new Event("hide"));

		}

	});

	const modalShow = (selector,title,btn,subject,object) => {

		if(!activeModal){

			windowScroll = window.pageYOffset;

		}

		activeModal = modal.querySelector('.modal__item--' + selector);

		if ( activeModal.querySelector('.form__title') ) {

			activeModal.querySelector('.form__title').innerHTML = title;

		}

		if ( activeModal.querySelector('.form__submit') ) {

			activeModal.querySelector('.form__submit').textContent = btn;

		}

		if ( activeModal.elements && activeModal.elements.subject ) {

			activeModal.elements.subject.value = subject ? subject : '';

		}

		if ( activeModal.elements && activeModal.elements.object ) {

			activeModal.elements.object.value = object ? object : '';

		}

		[...items].forEach( el => el.classList.toggle('visuallyhidden', el !== activeModal) );

		document.documentElement.classList.add('scroll-behavior-off');

		window.requestAnimationFrame( () => {

			wrapper.style.top = -windowScroll + 'px';
			document.body.classList.add('modal-show');
			window.scrollTo(0,0);

			activeModal.focus();

		});

	};

	modal.addEventListener('click', event => {

		if( event.target.classList.contains('modal') || event.target.closest('.modal__close')){

			modal.dispatchEvent(new Event("hide"));

		}

	});

	document.addEventListener('click', event => {

		let target = event.target;

		while (target !== document && target !== null) {

			if (target.hasAttribute('data-modal')) {

				modalShow(
					target.getAttribute('data-modal'),
					target.getAttribute('data-title'),
					target.getAttribute('data-btn'),
					target.getAttribute('data-subject'),
					target.getAttribute('data-object')
				);

			}

			target = target.parentNode;

		}

	});

	modal.addEventListener('modalShow', event => modalShow(event.detail.selector));

})(document.querySelector('.modal'));