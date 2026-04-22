function createProfileAlbumGrid(albums) {
	if (!albums.length) {
		return `<div class="empty-state"><div class="empty-state-icon">🎵</div>Ingen album å vise.</div>`;
	}

	return /*HTML*/ `<div class="profile-grid">${albums
		.map((album) => {
			const albumCover = album.coverImg
				? `<img src="${album.coverImg}" alt="Cover til ${escapeHtml(album.title)}">`
				: "🎵";
			return /*HTML*/ `
			<div class="profile-album-card" onclick="viewMusicDetails(${album.id})">
				<div class="profile-album-img">${albumCover}</div>
				<div class="profile-album-info">
					<div class="profile-album-title">${escapeHtml(album.title)}</div>
					<div class="profile-album-artist">${escapeHtml(album.artist)}</div>
				</div>
			</div>
			`;
		})
		.join("")}</div>`;
}

function profilePage() {
	if (!isAuthenticated()) {
		return /*HTML*/ `
		<div class="page-header">
			<span class="page-title">Profil</span>
		</div>
		<div class="empty-state">
			<div class="empty-state-icon">👤</div>
			Logg inn eller velg gjest for å åpne profil.
		</div>
		`;
	}

	const user = getCurrentUser();
	const allAlbums = model.data.musicInfo;
	const wishlistAlbums = allAlbums.filter((album) => isInWishlist(album.id));
	const accountType = isGuestUser()
		? "Gjest"
		: user?.role === "admin"
			? "Admin"
			: "Bruker";
	const introText = isGuestUser()
		? "Du tester nå appen som gjest. Ønskelisten lagres bare til nettleseren lukkes."
		: isAdminUser()
			? "Du er logget inn som admin og kan legge til, redigere og slette album i biblioteket."
			: "Du er logget inn som vanlig bruker og kan bruke søk og ønskeliste.";
	const sectionTitle = isAdminUser() ? "Hele biblioteket" : "Min ønskeliste";
	const sectionAlbums = isAdminUser() ? allAlbums : wishlistAlbums;

	return /*HTML*/ `
	<div class="page-header">
		<span class="page-title">Profil</span>
		${isAdminUser() ? `<button class="btn btn-accent" onclick="changePage('addDetails')">+ Legg til album</button>` : ""}
	</div>
	${renderFlashMessage()}
	<div class="profile-summary-card">
		<div>
			<div class="profile-name">${escapeHtml(getDisplayName())}</div>
			<div class="profile-role">${accountType}</div>
			<p class="profile-copy">${introText}</p>
		</div>
		<div class="profile-kpis">
			<div class="profile-kpi">
				<strong>${allAlbums.length}</strong>
				<span>Album</span>
			</div>
			<div class="profile-kpi">
				<strong>${wishlistAlbums.length}</strong>
				<span>Ønsker</span>
			</div>
		</div>
	</div>

	<div class="page-header profile-section-header">
		<span class="page-title">${sectionTitle}</span>
	</div>
	${createProfileAlbumGrid(sectionAlbums)}
	`;
}
