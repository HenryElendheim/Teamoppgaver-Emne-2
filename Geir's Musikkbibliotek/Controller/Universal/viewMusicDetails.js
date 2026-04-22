function viewMusicDetails(id) {
	const album = model.data.musicInfo.find((item) => item.id === id);
	if (!album) return;

	model.viewState.musicInfo = {
		...createEmptyMusicInfo(),
		...album,
		location: [...album.location],
		genre: [...album.genre],
		wishlist: isInWishlist(album.id),
	};

	changePage("viewDetails");
}
