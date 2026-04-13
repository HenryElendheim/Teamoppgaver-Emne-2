// viewMusicDetails — henter album fra data, kopierer til viewState, bytter side
function viewMusicDetails(id) {
	const album = model.data.musicInfo.find((a) => a.id === id);
	if (!album) return;
	model.viewState.musicInfo = { ...album };
	changePage("viewDetails");
}
