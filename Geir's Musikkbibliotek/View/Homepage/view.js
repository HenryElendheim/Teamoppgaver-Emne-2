function homeView() {
	const albums = model.data.musicInfo;
	const addButton = isAdminUser()
		? `<button class="btn btn-accent" onclick="changePage('addDetails')">+ Legg til album</button>`
		: "";

	if (albums.length === 0) {
		return /*HTML*/ `
		<div class="page-header">
			<span class="page-title">Bibliotek</span>
			${addButton}
		</div>
		<div class="empty-state">
			<div class="empty-state-icon">🎵</div>
			Ingen album ennå.
		</div>
		`;
	}

	const albumList = albums.map((album) => createAlbumCard(album)).join("");

	return /*HTML*/ `
	<div class="page-header">
		<span class="page-title">Bibliotek (${albums.length})</span>
		${addButton}
	</div>
	${renderFlashMessage()}
	${albumList}
	`;
}
