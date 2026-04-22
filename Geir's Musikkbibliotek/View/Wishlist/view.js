function wishListPage() {
	const wishlist = model.data.musicInfo.filter((album) => isInWishlist(album.id));
	const helpText = isGuestUser()
		? "Ønskelisten lagres bare så lenge nettleseren er åpen."
		: !isAuthenticated()
			? "Logg inn eller velg gjest for å bruke ønskelisten."
			: "Album du har merket som ønskeliste vises her.";

	if (wishlist.length === 0) {
		return /*HTML*/ `
		<div class="page-header">
			<span class="page-title">Ønskeliste</span>
		</div>
		<p class="search-result-count">${helpText}</p>
		<div class="empty-state">
			<div class="empty-state-icon">⭐</div>
			Ønskelisten er tom.
		</div>
		`;
	}

	return /*HTML*/ `
	<div class="page-header">
		<span class="page-title">Ønskeliste (${wishlist.length})</span>
	</div>
	<p class="search-result-count">${helpText}</p>
	${wishlist.map((album) => createAlbumCard(album)).join("")}
	`;
}
