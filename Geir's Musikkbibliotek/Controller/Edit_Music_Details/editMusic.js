function toggleLocationCheckbox(checkbox, index) {
	const locations = model.viewState.musicInfo.location;
	if (checkbox.checked) {
		if (!locations.includes(index)) {
			locations.splice(0, 1);
			locations.push(index);
		}
	} else {
		const pos = locations.indexOf(index);
		if (pos !== -1) locations.splice(pos, 1);
	}
}

function toggleGenreCheckbox(checkbox, index) {
	const genre = model.viewState.musicInfo.genre;
	if (checkbox.checked) {
		if (!genre.includes(index)) genre.push(index);
	} else {
		const pos = genre.indexOf(index);
		if (pos !== -1) genre.splice(pos, 1);
	}
}

function rng() {
	const number = Math.floor(Math.random() * 999999);
	for (let i = 0; i < model.data.musicInfo.length; i++) {
		if (model.data.musicInfo[i].id === number) return rng();
	}
	return number;
}

function submitChanges(isEdit) {
	if (!isEdit) {
		model.viewState.musicInfo.id = rng();
		model.data.musicInfo.push({ ...model.viewState.musicInfo });
	} else {
		const index = model.data.musicInfo.findIndex(
			(item) => item.id == model.viewState.musicInfo.id,
		);
		if (index !== -1) {
			model.data.musicInfo[index] = model.viewState.musicInfo;
		}
	}

	changePage("homePage");
}


function newLocation(event) {
	event.preventDefault();
	const location = model.viewState.editMusicInfo.location

	if (location !== "") {
		model.data.location.push(location)
	};

	model.app.showLocationInput = !model.app.showLocationInput;

	emptyGenreLocationList();
	updateView();
}


function newGenre(event) {
	event.preventDefault();
	const genre = model.viewState.editMusicInfo.genre

	if (genre !== "") {
		model.data.genre.push(genre)
	};

	model.app.showGenreInput = !model.app.showGenreInput;

	emptyGenreLocationList();
	updateView();
}


function removeLocation(event) {
	event.preventDefault();
	const location = model.viewState.editMusicInfo.location

	if (location !== "") {
		model.data.location.splice(location, 1)
		console.log(location)
	};

	model.app.showDeleteLocationInput = !model.app.showDeleteLocationInput;

	emptyGenreLocationList();
	updateView();
}


function removeGenre(event) {
	event.preventDefault();
	const genre = model.viewState.editMusicInfo.genre

	if (genre !== "") {
		model.data.genre.splice(genre, 1)
		console.log(genre)
	};

	model.app.showDeleteGenreInput = !model.app.showDeleteGenreInput;

	emptyGenreLocationList();
	updateView();
}


function emptyList() {
	model.viewState.musicInfo = {
		id: null,
		title: "",
		artist: "",
		location: [],
		releaseYear: null,
		genre: [],
		notes: "",
		wishlist: false,
		coverImg: null,
	};
}


function emptyGenreLocationList() {
	model.viewState.editMusicInfo = {
		genre: "",
		location: "",
	};
}


function saveImage(image) {
	const file = image.files[0];
	if (!file) return;
	model.viewState.musicInfo.coverImg = URL.createObjectURL(file);
}


