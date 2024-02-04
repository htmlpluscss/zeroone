( elems => {

	if(!elems.length) {

		return;

	}

	[...elems].forEach( swipe => {

		let mySwipe = null,
			toggleSwipe = null,
			resetSwipe = null;

		const swipeControls = document.createElement('div'),
			  swipeNav = document.createElement('div'),
			  swipeBtns = document.createElement('div'),
			  swipeNext = document.createElement('button'),
			  swipePrev = document.createElement('button'),
			  scrollbar = swipe.querySelector('.swiper-scrollbar'),
			  items = swipe.querySelectorAll('.swiper-slide'),
			  count = items.length,
			  event = swipe.classList.contains('swiper--event'),
			  expert = swipe.classList.contains('swiper--expert'),
			  investments = swipe.classList.contains('swiper--investments'),
			  shopBroker = swipe.classList.contains('swiper--shop-broker');

		swipeNav.className = 'swiper-pagination';
		swipeControls.className = 'swiper-controls';

		swipeBtns.className = 'swiper-navigation';
		swipePrev.className = 'swiper-button-prev button';
		swipeNext.className = 'swiper-button-next button';

		swipePrev.setAttribute('aria-label','Previous slide');
		swipeNext.setAttribute('aria-label','Next slide');

		swipePrev.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36"><path stroke-width="1.5" d="M20.7 10.8 13.5 18l7.2 7.2"/></svg>';
		swipeNext.innerHTML = '<svg width="36" height="36" viewBox="0 0 36 36"><path stroke-width="1.5" d="m15.3 10.8 7.2 7.2-7.2 7.2"/></svg>';

		swipeBtns.append(swipePrev);
		swipeBtns.append(swipeNext);
		swipeControls.append(swipeBtns);
		swipeControls.append(swipeNav);

		resetSwipe = () => {

			if(mySwipe) {

				mySwipe.destroy(false,true);
				mySwipe = undefined;

			}

			swipeNav.classList.add('hide');
			swipeBtns.classList.add('hide');
			swipeControls.classList.add('hide');

			if ( swipe.closest('.swiper-container-style') ) {

				swipe.closest('.swiper-container-style').classList.remove('swiper-container-style');

			}

		}

		if (expert) {

			let left = null,
				speed = items[0].clientWidth * 48;

			const setTransformLeft = l => {

				mySwipe.wrapperEl.style.transform = mySwipe.wrapperEl.style.transform.includes('translateX') ? 'translate3d('+l+'px, 0, 0)' : 'translateX('+l+'px)';

			}

			swipe.addEventListener('mouseenter', ()=> {

				left = mySwipe.wrapperEl.getBoundingClientRect().left - swipe.getBoundingClientRect().left;

				mySwipe.wrapperEl.style.transitionDuration = ( ( left - mySwipe.translate ) / mySwipe.slidesSizesGrid[0] * speed ) + 'ms';

				mySwipe.wrapperEl.style.transform = 'translateX('+left+'px)';

			});

			swipe.addEventListener('mouseleave', ()=> {

				setTransformLeft(swipe.swiper.translate);

			});

			swipeBtns.addEventListener('mouseenter', ()=> {

				mySwipe.params.speed = speed;
				swipe.classList.add('swiper--autoplay');
				swipe.swiper.autoplay.start();

			});

			swipeBtns.addEventListener('mouseleave', ()=> {

				mySwipe.params.speed = speed;
				swipe.classList.add('swiper--autoplay');
				swipe.swiper.autoplay.start();

			});

			toggleSwipe = () => {

				resetSwipe();

				swipe.parentNode.append(swipeControls);

				swipe.parentNode.classList.add('swiper-container-style');
				swipeBtns.classList.remove('hide');
				swipeControls.classList.remove('hide');

				if ( document.documentElement.clientWidth < 728 ) {

					if ( investments ) {

						swipeNav.classList.remove('hide');
						swipeBtns.classList.add('hide');

						mySwipe = new Swiper(swipe, {
							loop: true,
							autoplay: {
								delay: 1
							},
							pagination: {
								el: swipeNav,
								clickable: false,
								bulletClass: 'button',
								bulletActiveClass: 'is-active'
							},
							speed: speed,
							on: {
								navigationNext(){
									swipe.swiper.autoplay.stop();
								},
								navigationPrev(){
									swipe.swiper.autoplay.stop();
								},
								autoplayResume(){
									console.log(swipe.swiper.params.speed);
								},
								autoplayStop() {
									swipe.classList.remove('swiper--autoplay');
									mySwipe.params.speed = 300;
									mySwipe.wrapperEl.style.transitionDuration = '300ms';
									setTransformLeft(mySwipe.translate);
								}
							}
						});

					}
					else {

						mySwipe = new Swiper(swipe, {
							loop: false,
							rewind: true,
							slidesPerView: 'auto',
							autoplay: {
								delay: 1
							},
							scrollbar: {
								el: scrollbar,
								draggable: false
							},
							speed: speed,
							on: {
								navigationNext(){
									swipe.swiper.autoplay.stop();
								},
								navigationPrev(){
									swipe.swiper.autoplay.stop();
								},
								reachBeginning(){
									if(swipe.classList.contains('swiper--autoplay')) {
										mySwipe.params.speed = speed;
									}
								},
								reachEnd(){
									mySwipe.params.speed = 300;
								},
								autoplayStop() {
									swipe.classList.remove('swiper--autoplay');
									mySwipe.params.speed = 300;
									mySwipe.wrapperEl.style.transitionDuration = '300ms';
									setTransformLeft(mySwipe.translate);
								}
							}
						});

					}

				}
				else {

					mySwipe = new Swiper(swipe, {
						loop: true,
						slidesPerView: 'auto',
						navigation: {
							nextEl: swipeNext,
							prevEl: swipePrev
						},
						autoplay: {
							delay: 1
						},
						speed: speed,
						on: {
							navigationNext(){
								swipe.swiper.autoplay.stop();
							},
							navigationPrev(){
								swipe.swiper.autoplay.stop();
							},
							autoplayResume(){
								console.log(swipe.swiper.params.speed);
							},
							autoplayStop() {
								swipe.classList.remove('swiper--autoplay');
								mySwipe.params.speed = 300;
								mySwipe.wrapperEl.style.transitionDuration = '300ms';
								setTransformLeft(mySwipe.translate);
							}
						}
					});

				}

			}

		}

		if (shopBroker) {

			swipePrev.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="m9.83 12 4.95-4.95-1.42-1.41L7 12l6.36 6.36 1.42-1.41L9.83 12Z"/></svg>';
			swipeNext.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M14.17 12 9.22 7.05l1.42-1.41L17 12l-6.36 6.36-1.42-1.41L14.17 12Z"/></svg>';

			toggleSwipe = () => {

				toggleSwipe = false;

				swipeNav.classList.remove('hide');
				swipeBtns.classList.remove('hide');
				swipeControls.classList.remove('hide');

				mySwipe = new Swiper(swipe, {
					loop: true,
					navigation: {
						nextEl: swipeNext,
						prevEl: swipePrev
					},
					pagination: {
						el: swipeNav,
						clickable: false,
						bulletClass: 'button',
						bulletActiveClass: 'is-active'
					}
				});

			}

		}

		if (event) {

			toggleSwipe = () => {

				resetSwipe();

				if ( document.documentElement.clientWidth < 1199 ) {

					swipe.parentNode.classList.add('swiper-container-style');

					mySwipe = new Swiper(swipe, {
						loop: false,
						slidesPerView: 'auto',
						scrollbar: {
							el: scrollbar
						},
						on: {
							progress(){
								if( mySwipe ) {
									swipe.classList.toggle('is-progress-finish', mySwipe.progress >= 1);
								}
							}
						}
					});

				}

			}

			swipe.addEventListener("swiperResize",toggleSwipe);

		}

		swipe.addEventListener('swiperJsLoad', () => {

			swipe.append(swipeControls);

			// eager
			[...swipe.querySelectorAll('[loading="lazy"]')].forEach( img => img.setAttribute('loading','eager') );

			// hide
			[...items].forEach( el => el.classList.remove('hide') );

			toggleSwipe();

		});

	});

	let resizeTimeout = null,
		windowWidthOLd = window.innerWidth;

	window.addEventListener("resize", () => {

		window.requestAnimationFrame( () => {

			if (resizeTimeout === null) {

				resizeTimeout = setTimeout( () => {

					resizeTimeout = null;

					if(windowWidthOLd !== window.innerWidth) {

						windowWidthOLd = window.innerWidth;

						if (window.Swiper) {

							[...elems].forEach( swipe => swipe.dispatchEvent(new Event("swiperResize")) );

						}

					}

				}, 1000);

			}

		});

	});

	const script = document.createElement('script');

	script.src = '/js/swiper.min.js';

	script.onload = () => [...elems].forEach( swipe => swipe.dispatchEvent(new Event("swiperJsLoad")) );


	// fastLoadScript

	if ( localStorage.getItem('fastLoadScript') ) {

		document.head.append(script);

	}
	else {

		let fastLoadScriptTimeout = true;

		const appendScript = () => {

			if ( fastLoadScriptTimeout ) {

				fastLoadScriptTimeout = null;
				document.head.append(script);

			}

			window.removeEventListener('scroll',appendScript);
			window.removeEventListener('click',appendScript);

		}

		const observer = new IntersectionObserver((entries, observer) => {

			let isInViewport = false;

			isInViewport = [...entries].some( entry => {

				observer.unobserve(entry.target);

				return entry.isIntersecting;

			});

			if ( isInViewport ) {

				appendScript();

			}
			else {

				fastLoadScriptTimeout = setTimeout( appendScript, 30000 );

			}

		});

		[...elems].forEach( el => observer.observe(el) );

		window.addEventListener('scroll',appendScript);
		window.addEventListener('click',appendScript);

	}

})(document.querySelectorAll('.swiper'));