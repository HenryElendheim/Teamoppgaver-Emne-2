function deleteAlbum(id) {
	if (!isAdminUser()) {
		setFlashMessage("Kun admin kan slette album.", "error");
		changePage("login");
		return;
	}

	const shouldDelete = confirm("Er du sikker på at du vil slette dette albumet?");
	if (!shouldDelete) return;

	model.data.musicInfo = model.data.musicInfo.filter((album) => album.id !== id);

	model.data.users.forEach((user) => {
		if (Array.isArray(user.wishlist)) {
			user.wishlist = user.wishlist.filter((albumId) => albumId !== id);
		}
	});

	model.app.guestWishlist = model.app.guestWishlist.filter((albumId) => albumId !== id);
	persistData();
	persistSession();
	setFlashMessage("Albumet ble slettet.", "success");
	changePage("homePage");
}
