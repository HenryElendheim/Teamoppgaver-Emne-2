function editDetailsPage() {
    return /*HTML*/ `
    <input onchange="setInfo(this.value)" placeholder="Artist navn">
    <input onchange="setInfo(this.value)" placeholder="Album/Singel/EP">
    <input type="checkbox">Stue
    <input type="checkbox">Loft
    <input onchange="setInfo(this.value)" placeholder="Release Year">
    <button onclick="submitChanges()">Lagre</button>

    `;
}


function setArtist() {
    model.data.musicInfo = artistName;
}


function setInfo(artistName, albumName, location, releaseYear) {
    model.data.musicInfo.push({
        artist: artistName,
        album: albumName,
        lokasjon: location,
        yearOfRelease: releaseYear,
    });
}


function submitChanges() {
    updateView();
}