function editDetailsPage() {
    return /*HTML*/ `
    <input onchange="setArtist(this.value)">

    `;
}

function setArtist(artistName) {
    model.viewState.musicInfo.artist = artistName;
    model.data.musicInfo.push(artistName);
    updateView();
}