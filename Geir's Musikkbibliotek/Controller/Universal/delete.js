// deleteAlbum — fjerner album fra model.data.musicInfo og går til hjem
function deleteAlbum(id) {
	model.data.musicInfo = model.data.musicInfo.filter((a) => a.id !== id);
	changePage("homePage");
}
