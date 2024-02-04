( readmore => {

	if ( readmore.length > 0 ) {

		[...readmore].forEach( item => {

			const btn = item.querySelector('.readmore__btn'),
				  body = item.querySelector('.readmore__body'),
				  text = item.querySelector('.readmore__text'),
				  altText = btn.getAttribute('data-text'),
				  defaultText = btn.textContent;

			btn.addEventListener('click', () => {

				btn.textContent = item.classList.toggle('is-open') ? altText : defaultText;

				window.requestAnimationFrame( push );

			});

			const push = ()=> {

				const h = body.clientHeight,
					  lh = parseInt(window.getComputedStyle(text).getPropertyValue("line-height")),
					  row = Math.floor(h / lh);

				text.setAttribute('style','-webkit-line-clamp:' + row);
				text.style.maxHeight = (row * lh) + 'px';

			}

			push();

			item.addEventListener("resize", push);

		});

		// resize

		let windowWidthOLd = window.innerWidth,
			rtime,
			timeout = false,
			delta = 100;

		const resizeend = ()=> {

			if (new Date() - rtime < delta) {

				setTimeout(resizeend, delta);

			} else {

				timeout = false;

				if(windowWidthOLd !== window.innerWidth) {

					windowWidthOLd = window.innerWidth;

					[...readmore].forEach( item => item.dispatchEvent(new Event("resize")));

				}

			}

		}

		window.addEventListener("resize", () => {

			window.requestAnimationFrame( () => {

				rtime = new Date();

				if (timeout === false) {

					timeout = true;

					setTimeout(resizeend, delta);

				}

			});

		});
	}

})(document.querySelectorAll('.readmore'));