function editAlbum(id) {
	if (!isAdminUser()) {
		setFlashMessage("Kun admin kan redigere album.", "error");
		changePage("login");
		return;
	}

	const album = model.data.musicInfo.find((item) => item.id === id);
	if (!album) return;

	model.viewState.musicInfo = {
		...createEmptyMusicInfo(),
		...album,
		location: [...album.location],
		genre: [...album.genre],
		wishlist: isInWishlist(album.id),
	};

	emptyGenreLocationList();
	changePage("editDetails");
}
