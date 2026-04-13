function addDetailsPage() {
	return buildMusicForm(false);
}

function editDetailsPage() {
	return buildMusicForm(true);
}

function buildMusicForm(isEdit) {
	const info = model.viewState.musicInfo;

	const locationCheckboxes = model.data.location
		.map(
			(loc, i) => /*HTML*/ `
        <label class="checkbox-option">
            <input type="checkbox"
                   ${info.location.includes(i) ? "checked" : ""}
                   onchange="toggleLocationCheckbox(this, ${i})">
            ${loc}
        </label>
    `,
		)
		.join("");

	const coverHTML = info.coverImg
		? `<img src="${info.coverImg}" alt="Cover" style="width:100%;height:100%;object-fit:cover;border-radius:8px">`
		: `<span class="form-cover-icon">🎵</span><span>Endre cover</span>`;

	return /*HTML*/ `
    <div class="page-header">
        <span class="page-title">${isEdit ? "Rediger album" : "Legg til album"}</span>
    </div>

    <div class="form-card">
        <div class="form-top">
            <div class="form-cover-slot" title="Endre coverbilde">
                ${coverHTML}
            </div>

            <div class="form-fields">
                <div class="form-row">
                    <label class="form-label">Artist</label>
                    <input class="form-input"
                           type="text"
                           placeholder="Artistnavn"
                           value="${info.artist}"
                           oninput="model.viewState.musicInfo.artist = this.value">
                </div>
                <div class="form-row">
                    <label class="form-label">Album / Singel / EP</label>
                    <input class="form-input"
                           type="text"
                           placeholder="Tittel"
                           value="${info.title}"
                           oninput="model.viewState.musicInfo.title = this.value">
                </div>
            </div>
        </div>

        <div class="form-row">
            <label class="form-label">Lokasjon</label>
            <div class="checkbox-group">
                ${locationCheckboxes}
            </div>
        </div>

        <div class="form-row">
            <label class="form-label">Årstall</label>
            <input class="form-input"
                   type="number"
                   placeholder="f.eks. 1997"
                   value="${info.releaseYear || ""}"
                   oninput="model.viewState.musicInfo.releaseYear = parseInt(this.value) || null"
                   style="max-width: 140px">
        </div>

        <div class="form-row">
            <label class="form-label">Sjanger</label>
            <input class="form-input"
                   type="text"
                   placeholder="f.eks. Rock, Jazz"
                   value="${info.genre.map((i) => model.data.genre[i]).join(", ")}"
                   oninput="model.viewState.musicInfo.genre = this.value">
        </div>

        <div class="form-row">
            <label class="form-label">Notater</label>
            <textarea class="form-textarea"
                      placeholder="Egne notater om albumet…"
                      oninput="model.viewState.musicInfo.notes = this.value">${info.notes}</textarea>
        </div>

        <label class="checkbox-row">
            <input type="checkbox"
                   ${info.wishlist ? "checked" : ""}
                   onchange="model.viewState.musicInfo.wishlist = this.checked">
            Ønskeliste
        </label>

        <hr class="form-divider">

        <div class="form-actions">
            <div class="form-actions-left">
                <button class="btn btn-accent" onclick="submitChanges()">Lagre</button>
            </div>
            <div class="form-actions-right">
                ${isEdit ? `<button class="btn btn-danger" onclick="deleteAlbum(model.viewState.musicInfo.id)">Slett</button>` : ""}
                <button class="btn btn-ghost" onclick="changePage('homePage')">Avbryt</button>
            </div>
        </div>
    </div>
    `;
}

function toggleLocationCheckbox(checkbox, index) {
	const locations = model.viewState.musicInfo.location;
	if (checkbox.checked) {
		if (!locations.includes(index)) locations.push(index);
	} else {
		const pos = locations.indexOf(index);
		if (pos !== -1) locations.splice(pos, 1);
	}
}

function rng() {
	const number = Math.floor(Math.random() * 999999);
	for (let i = 0; i < model.data.musicInfo.length; i++) {
		if (model.data.musicInfo[i].id === number) return rng();
	}
	return number;
}

function submitChanges() {
	model.viewState.musicInfo.id = rng();
	model.data.musicInfo.push({ ...model.viewState.musicInfo });
	changePage("homePage");
}
