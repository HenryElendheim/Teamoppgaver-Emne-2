function viewDetailsPage() {
	const id = model.viewState.musicInfo.id;
	const album = model.data.musicInfo.find((item) => item.id === id);

	if (!album) {
		return /*HTML*/ `
		<p style="color: var(--text-muted)">Album ikke funnet.</p>
		<button class="btn btn-ghost" onclick="changePage('homePage')">← Tilbake</button>
		`;
	}

	const genre = getGenreNames(album.genre) || "—";
	const location = getLocationNames(album.location) || "—";
	const albumCover = album.coverImg
		? `<img src="${album.coverImg}" alt="Cover til ${escapeHtml(album.title)}">`
		: "🎵";

	return /*HTML*/ `
	<div class="detail-card">
		<div class="detail-top">
			<div class="detail-cover">${albumCover}</div>
			<div class="detail-fields">
				<div class="field-row">
					<div class="field-label">Artist</div>
					<div class="field-value">${escapeHtml(album.artist)}</div>
				</div>
				<div class="field-row">
					<div class="field-label">Album / Singel / EP</div>
					<div class="field-value">${escapeHtml(album.title)}</div>
				</div>
				<div class="field-row">
					<div class="field-label">Lokasjon</div>
					<div class="field-value">${escapeHtml(location)}</div>
				</div>
				<div class="field-row">
					<div class="field-label">Årstall</div>
					<div class="field-value">${album.releaseYear || "—"}</div>
				</div>
				<div class="field-row">
					<div class="field-label">Sjanger</div>
					<div class="field-value">${escapeHtml(genre)}</div>
				</div>
			</div>
		</div>

		<div class="field-row">
			<div class="field-label">Notater</div>
			<div class="field-value" style="color: var(--text-muted)">${escapeHtml(album.notes || "—")}</div>
		</div>

		<hr class="detail-divider">

		<label class="checkbox-row">
			<input
				type="checkbox"
				${isInWishlist(album.id) ? "checked" : ""}
				onchange="toggleWishlist(${album.id}, this.checked)">
			Ønskeliste
		</label>

		<div class="detail-actions">
			${
				isAdminUser()
					? `<button class="btn btn-accent" onclick="editAlbum(${album.id})">Rediger</button>
					   <button class="btn btn-danger" onclick="deleteAlbum(${album.id})">Slett</button>`
					: ""
			}
			<button class="btn btn-ghost" onclick="changePage('homePage')">Tilbake</button>
		</div>
	</div>
	`;
}
