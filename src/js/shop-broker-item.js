( items => {

	[...items].forEach( item => {

		const btn = item.querySelector('.shop-broker-item__btn-details');

		if ( btn ) {

			btn.addEventListener('click', () => {

				document.querySelector('#modal-details-table').innerHTML = item.querySelector('.shop-broker-item__table-details').innerHTML;

				const eventModalShow = new CustomEvent("modalShow", {
					detail: {
						selector: "details"
					}
				});

				modal.dispatchEvent(eventModalShow);

			});

		}

	});

})(document.querySelectorAll('.shop-broker-item'));