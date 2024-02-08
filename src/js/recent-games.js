( box => {

	if ( box ) {

		const rowsCount = parseInt(box.getAttribute('data-rows'));

		const templateTable = box.querySelector('#recent-games-table-template').innerHTML;
		const templateColumn = box.querySelector('#recent-games-column-template').innerHTML;
		const columnBody = box.querySelectorAll('.recent-games-column__body');

		// отделяем тысячи
		function sepNumber(str){
			str = parseInt(str).toString();
			return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
		}

		// Get random value
		function getRandomValue(min, max) {
		    // Generate a random floating-point number between 0 and 1
		    var randomValue = Math.random();

		    // Scale and shift the random value to fit the desired range
		    var scaledValue = min + randomValue * (max - min);

		    return scaledValue;
		}

		// Get dates for the single row

		const currentDate = new Date();

		function getDate() {

			currentDate.setMinutes( currentDate.getMinutes() - getRandomValue(0, 20) );
			var year = currentDate.getFullYear();
			var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
			var day = ('0' + currentDate.getDate()).slice(-2);
			var hours = ('0' + currentDate.getHours()).slice(-2);
			var minutes = ('0' + currentDate.getMinutes()).slice(-2);
			return `${day}.${month}.${year} ${hours}:${minutes}`;

		}

		// Get nickname
		var adjectives = ["Shadow", "Frosty", "xXIron", "Neon", "Blaze", "Rogue", "Thunder", "Mystic", "Viper", "Eternal", "Dark", "Apex", "Savage", "Phantom", "Night", "Cyber", "Doom", "Rapid", "Toxic", "Lunar", "Ghost", "Firestorm", "Blizzard", "Iron", "Omega", "Twilight", "Spectral"];
		var nouns = ["Slayer", "Ninja", "Fist", "Nemesis", "Blaster", "Rebel", "Rider", "Marauder", "Venom", "Ember", "Dragon", "Assassin", "Spartan", "Phoenix", "Hawk", "Crusader", "Dancer", "Raptor", "Terror", "Lynx", "Gunner", "Storm", "Blast", "Inferno", "Oracle", "Titan", "Slayer", "Flare", "Fury", "Cobra", "Vanguard", "Dragon", "Slash", "Rebel", "Maelstrom", "Cyclone", "Sorcerer", "Barrage", "Striker", "Viper", "Raven", "Eclipse", "Specter", "Tiger", "Reaper", "Tempest", "Shade", "Grenade", "Marauder", "Serpent"];

		function getRandomNickname() {
		    var isAdjectiveNone = Math.random() < 0.5; // 50% chance to follow adjective-none structure
		    if (isAdjectiveNone) {
		        var randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);
		        var randomNounIndex = Math.floor(Math.random() * nouns.length);
		        return adjectives[randomAdjectiveIndex] + nouns[randomNounIndex];
		    } else {
		        var nicknameLength = Math.floor(Math.random() * 5) + 5; // Random length between 5 to 10 characters
		        var nickname = '';
		        var characters = 'abcdefghijklmnopqrstuvwxyz';
		        var numbers = '0123456789';
		        var numberPosition = Math.random() < 0.5 ? 'start' : 'end'; // Decide where to place the number
		        if (numberPosition === 'start') {
		            nickname += numbers.charAt(Math.floor(Math.random() * numbers.length));
		        }
		        for (var i = 0; i < nicknameLength - 2; i++) { // Adjusted loop to ensure space for the number at the end
		            nickname += characters.charAt(Math.floor(Math.random() * characters.length));
		        }
		        if (numberPosition === 'end') {
		            nickname += numbers.charAt(Math.floor(Math.random() * numbers.length));
		        }
		        return nickname;
		    }
		}

		const appendUsers = ( table, index ) => {

			const users = [];

			for (let i = 0; i < rowsCount; i++) {

				// Get bet value
				let bet = Math.round(getRandomValue(100, 10000) / 100) * 100;

				// Get multiplier value
				let multiplier = getRandomValue(1.7, 6.4).toFixed(1);

				// Get outcome value
				let win = (bet * multiplier).toFixed(0);

				users.push({
					name   : getRandomNickname(),
					avatar : Math.round(getRandomValue(0, 200)),
					date   : getDate(),
					bet    : sepNumber(bet),
					multiplier,
					win: sepNumber(win)
				});

			}

			return users;

		}

		[...box.querySelectorAll('.recent-games-table')].forEach( ( table, index ) => {

			const users = appendUsers();

			table.querySelector('tbody').innerHTML = Mustache.render( templateTable, { users } );
			columnBody[index].innerHTML = Mustache.render( templateColumn, { users } );

		});

		// Load more

		const loadMore = ( el, loading, template ) => {

			loading.classList.add('is-anim');

			setTimeout( ()=> {

				loading.classList.remove('is-anim');

				const users = appendUsers();

				el.insertAdjacentHTML('beforeend', Mustache.render( template, { users } ));

			}, getRandomValue(256, 1024) );

		}

		box.addEventListener('click', event => {

			if ( event.target.closest('.recent-games-table__more') ){

				const table = event.target.closest('.recent-games-table'),
					  tbody = table.querySelector('tbody');

				loadMore( tbody, event.target.closest('.recent-games__loading'), templateTable );

			}

			if ( event.target.closest('.recent-games-column__more') ){

				const column = event.target.closest('.recent-games-column'),
					  columnBody = column.querySelector('.recent-games-column__body');

				loadMore( columnBody, event.target.closest('.recent-games__loading'), templateColumn );

			}

		});

	}

})(document.querySelector('.recent-games'));