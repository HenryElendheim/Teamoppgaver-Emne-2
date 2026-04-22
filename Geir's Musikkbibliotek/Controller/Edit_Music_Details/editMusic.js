function toggleLocationCheckbox(checkbox, index) {
	const locations = model.viewState.musicInfo.location;

	if (checkbox.checked) {
		model.viewState.musicInfo.location = [index];
		return;
	}

	const position = locations.indexOf(index);
	if (position !== -1) {
		locations.splice(position, 1);
	}
}

function toggleGenreCheckbox(checkbox, index) {
	const genres = model.viewState.musicInfo.genre;

	if (checkbox.checked) {
		if (!genres.includes(index)) genres.push(index);
		return;
	}

	const position = genres.indexOf(index);
	if (position !== -1) {
		genres.splice(position, 1);
	}
}

function toggleLocationInput(mode) {
	model.app.showLocationInput = mode === "add" ? !model.app.showLocationInput : false;
	model.app.showDeleteLocationInput = mode === "remove" ? !model.app.showDeleteLocationInput : false;
	model.viewState.editMusicInfo.location = "";
	updateView();
}

function toggleGenreInput(mode) {
	model.app.showGenreInput = mode === "add" ? !model.app.showGenreInput : false;
	model.app.showDeleteGenreInput = mode === "remove" ? !model.app.showDeleteGenreInput : false;
	model.viewState.editMusicInfo.genre = "";
	updateView();
}

function submitChanges(isEdit) {
	if (!isAdminUser()) {
		setFlashMessage("Kun admin kan lagre endringer i biblioteket.", "error");
		changePage("login");
		return;
	}

	const info = model.viewState.musicInfo;
	const title = info.title.trim();
	const artist = info.artist.trim();

	if (!title || !artist) {
		setFlashMessage("Artist og tittel må fylles ut.", "error");
		updateView();
		return;
	}

	const albumToSave = {
		...createEmptyMusicInfo(),
		...info,
		id: isEdit ? info.id : getNextAlbumId(),
		title,
		artist,
		notes: info.notes.trim(),
		location: [...info.location],
		genre: [...info.genre],
		wishlist: false,
	};

	if (!isEdit) {
		model.data.musicInfo.push(albumToSave);
	} else {
		const index = model.data.musicInfo.findIndex((album) => album.id === albumToSave.id);
		if (index === -1) return;
		model.data.musicInfo[index] = albumToSave;
	}

	setWishlistState(albumToSave.id, Boolean(info.wishlist));
	persistData();
	emptyList();
	emptyGenreLocationList();
	setFlashMessage(isEdit ? "Albumet ble oppdatert." : "Albumet ble lagt til.", "success");
	changePage("homePage");
}

function newLocation(event) {
	event.preventDefault();
	const location = model.viewState.editMusicInfo.location.trim();

	if (!location) {
		setFlashMessage("Skriv inn en lokasjon først.", "error");
		updateView();
		return;
	}

	const alreadyExists = model.data.location.some(
		(item) => item.toLowerCase() === location.toLowerCase(),
	);
	if (alreadyExists) {
		setFlashMessage("Lokasjonen finnes allerede.", "error");
		updateView();
		return;
	}

	model.data.location.push(location);
	persistData();
	model.app.showLocationInput = false;
	emptyGenreLocationList();
	setFlashMessage("Lokasjonen ble lagt til.", "success");
	updateView();
}

function newGenre(event) {
	event.preventDefault();
	const genre = model.viewState.editMusicInfo.genre.trim();

	if (!genre) {
		setFlashMessage("Skriv inn en sjanger først.", "error");
		updateView();
		return;
	}

	const alreadyExists = model.data.genre.some(
		(item) => item.toLowerCase() === genre.toLowerCase(),
	);
	if (alreadyExists) {
		setFlashMessage("Sjanger finnes allerede.", "error");
		updateView();
		return;
	}

	model.data.genre.push(genre);
	persistData();
	model.app.showGenreInput = false;
	emptyGenreLocationList();
	setFlashMessage("Sjanger ble lagt til.", "success");
	updateView();
}

function remapIndexesAfterDelete(key, removedIndex) {
	model.data.musicInfo.forEach((album) => {
		album[key] = album[key]
			.filter((index) => index !== removedIndex)
			.map((index) => (index > removedIndex ? index - 1 : index));
	});

	model.viewState.musicInfo[key] = model.viewState.musicInfo[key]
		.filter((index) => index !== removedIndex)
		.map((index) => (index > removedIndex ? index - 1 : index));
}

function removeLocation(event) {
	event.preventDefault();
	const location = model.viewState.editMusicInfo.location.trim();
	const locationIndex = model.data.location.findIndex(
		(item) => item.toLowerCase() === location.toLowerCase(),
	);

	if (locationIndex === -1) {
		setFlashMessage("Fant ikke lokasjonen du prøvde å fjerne.", "error");
		updateView();
		return;
	}

	const shouldDelete = confirm(`Vil du fjerne lokasjonen \"${location}\"?`);
	if (!shouldDelete) return;

	model.data.location.splice(locationIndex, 1);
	remapIndexesAfterDelete("location", locationIndex);
	persistData();
	model.app.showDeleteLocationInput = false;
	emptyGenreLocationList();
	setFlashMessage("Lokasjonen ble fjernet.", "success");
	updateView();
}

function removeGenre(event) {
	event.preventDefault();
	const genre = model.viewState.editMusicInfo.genre.trim();
	const genreIndex = model.data.genre.findIndex(
		(item) => item.toLowerCase() === genre.toLowerCase(),
	);

	if (genreIndex === -1) {
		setFlashMessage("Fant ikke sjangeren du prøvde å fjerne.", "error");
		updateView();
		return;
	}

	const shouldDelete = confirm(`Vil du fjerne sjangeren \"${genre}\"?`);
	if (!shouldDelete) return;

	model.data.genre.splice(genreIndex, 1);
	remapIndexesAfterDelete("genre", genreIndex);
	persistData();
	model.app.showDeleteGenreInput = false;
	emptyGenreLocationList();
	setFlashMessage("Sjanger ble fjernet.", "success");
	updateView();
}

function saveImage(input) {
	const file = input.files[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = function onLoad(event) {
		model.viewState.musicInfo.coverImg = event.target.result;
		updateView();
	};
	reader.readAsDataURL(file);
}
