function toggleWishlist(id, checked) {
	if (!isAuthenticated()) {
		requireLoginOrGuest("Logg inn eller velg gjest for å bruke ønskelisten.");
		return;
	}

	const success = setWishlistState(id, checked);
	if (!success) return;

	if (
		model.app.currentPage === "wishList" ||
		model.app.currentPage === "viewDetails" ||
		model.app.currentPage === "profile"
	) {
		updateView();
	}
}
