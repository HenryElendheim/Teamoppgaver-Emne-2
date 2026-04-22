function searchPage() {
	const query = (model.viewState.searchBar || "").toLowerCase().trim();
	const results = getSearchResults();

	const resultHTML = results.length
		? results.map((album) => createAlbumCard(album)).join("")
		: `<div class="empty-state"><div class="empty-state-icon">🔍</div>Ingen treff for \"${escapeHtml(query)}\"</div>`;

	const countHTML = query
		? `<p class="search-result-count">Søkt: \"${escapeHtml(query)}\" — ${results.length} treff</p>`
		: `<p class="search-result-count">Viser hele biblioteket.</p>`;

	return /*HTML*/ `
	<div class="page-header">
		<span class="page-title">Søk</span>
	</div>
	${countHTML}
	${resultHTML}
	`;
}
