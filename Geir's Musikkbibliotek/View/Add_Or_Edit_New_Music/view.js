function editDetailsPage() {
    return /*HTML*/ `
    <input onchange="model.viewState.musicInfo.artist=this.value" placeholder="Artist navn">
    <input onchange="model.viewState.musicInfo.title=this.value" placeholder="Album/Singel/EP">
    ${displayLocation()}
    <input onchange="model.viewState.musicInfo.releaseYear=this.value" placeholder="Årstall">
    <input onchange="model.viewState.musicInfo.genre=this.value" placeholder="Sjanger">
    <input onchange="model.viewState.musicInfo.coverImg=this.value" type="file">
    <br>
    <button onclick="submitChanges()">Lagre</button>
    `;
}


function addDetailsPage() {
    return /*HTML*/ `
    <input onchange="model.viewState.musicInfo.artist=this.value" placeholder="Artist navn">
    <input onchange="model.viewState.musicInfo.title=this.value" placeholder="Album/Singel/EP">
    ${displayLocation()}
    <input onchange="model.viewState.musicInfo.releaseYear=this.value" placeholder="Årstall">
    <input onchange="model.viewState.musicInfo.genre=this.value" placeholder="Sjanger">
    <br>
    <button onclick="submitChanges()">Lagre</button>
    `;
}


function displayLocation() {
    let html = "";
    for (let i = 0; i < model.data.location.length; i++) {
        html += /*HTML*/ `
        <input 
        onchange="model.viewState.musicInfo.location=this.value" 
        type="checkbox" 
        value="${model.data.location[i]}">${model.data.location[i]}
        `;
    }
    return html;
}


function rng() {
    const number = Math.floor(Math.random() * 999999);
    for (let i = 0; i < model.data.musicInfo.length; i++) {
        if (model.data.musicInfo[i].id === number) {
            rng();
        }
    }
    return number;
}


function emptyViewStateValues() {
    model.viewState.musicInfo =
    {
        id: null,
        title: '',
        artist: '',
        location: [],
        releaseYear: null,
        genre: [],
        notes: '',
        wishlist: false,
        coverImg: null,
    }
}


function submitChanges() {
    model.viewState.musicInfo.id = rng();
    model.data.musicInfo.push({ ...model.viewState.musicInfo });
    emptyViewStateValues();
    console.log(model.data.musicInfo);
    console.log(model.viewState.musicInfo);
}