function getSearchResults() {
	const query = (model.viewState.searchBar || "").toLowerCase().trim();
	const allAlbums = model.data.musicInfo;

	if (!query) return allAlbums;

	return allAlbums.filter((album) => {
		const title = album.title.toLowerCase();
		const artist = album.artist.toLowerCase();
		const notes = (album.notes || "").toLowerCase();
		const genres = getGenreNames(album.genre).toLowerCase();
		const locations = getLocationNames(album.location).toLowerCase();

		return (
			title.includes(query) ||
			artist.includes(query) ||
			notes.includes(query) ||
			genres.includes(query) ||
			locations.includes(query)
		);
	});
}
