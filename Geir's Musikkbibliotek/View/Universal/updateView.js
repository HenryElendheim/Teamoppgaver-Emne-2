function resolvePageAccess(page) {
	const adminOnlyPages = ["addDetails", "editDetails"];

	if (adminOnlyPages.includes(page) && !isAdminUser()) {
		setFlashMessage("Kun admin kan redigere biblioteket.", "error");
		return "login";
	}

	if (page === "profile" && !isAuthenticated()) {
		setFlashMessage("Logg inn eller fortsett som gjest for å åpne profil.", "info");
		return "login";
	}

	return page;
}

function updateView() {
	let html = "";

	renderNavbar();

	if (model.app.currentPage === "homePage") html = homeView();
	else if (model.app.currentPage === "searchPage") html = searchPage();
	else if (model.app.currentPage === "wishList") html = wishListPage();
	else if (model.app.currentPage === "viewDetails") html = viewDetailsPage();
	else if (model.app.currentPage === "addDetails") html = addDetailsPage();
	else if (model.app.currentPage === "editDetails") html = editDetailsPage();
	else if (model.app.currentPage === "profile") html = profilePage();
	else if (model.app.currentPage === "login") html = loginPage();
	else if (model.app.currentPage === "register") html = registerPage();

	model.app.app.innerHTML = html;
}

function changePage(page) {
	const resolvedPage = resolvePageAccess(page);

	if (resolvedPage === "addDetails" && model.app.currentPage !== "addDetails") {
		emptyList();
		emptyGenreLocationList();
	}

	if (resolvedPage !== page) {
		clearAuthForms();
	}

	model.app.currentPage = resolvedPage;
	closeMobileMenu();
	updateView();
}

function initializeApp() {
	updateView();
}
