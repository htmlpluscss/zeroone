/*!

© kovrigin
Все права разрешены
красивый дизайн должен иметь красивый код®

https://github.com/htmlpluscss/

*/

( () => {

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

				document.documentElement.style.setProperty('--vh', document.documentElement.clientHeight + 'px');

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

	window.addEventListener("load", () => {

		localStorage.setItem('fastLoadScript', true);

		document.documentElement.style.setProperty('--transitionDefault', '.3s');

	});

	// обработчик анимаций
	window.cssAnimation = a=>{let b,c,d=document.createElement("cssanimation");switch(a){case'animation':b={"animation":"animationend","OAnimation":"oAnimationEnd","MozAnimation":"animationend","WebkitAnimation":"webkitAnimationEnd"};break;case'transition':b={"transition":"transitionend","OTransition":"oTransitionEnd","MozTransition":"transitionend","WebkitTransition":"webkitTransitionEnd"}}for(c in b)if(d.style[c]!==undefined)return b[c]}

	// Determine if an element is in the visible viewport
	window.isInViewport = el => {
		const rect = el.getBoundingClientRect();
		return (rect.top >= 0 && rect.bottom <= window.innerHeight);
	}

})();