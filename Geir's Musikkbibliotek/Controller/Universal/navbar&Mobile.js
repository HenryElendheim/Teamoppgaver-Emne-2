function updateSearchValue(value) {
	model.viewState.searchBar = value;
}

function handleSearchKeydown(event) {
	if (event.key === "Enter") {
		changePage("searchPage");
	}
}

function getSearchMarkup(isMobile = false) {
	return /*HTML*/ `
		<input
			placeholder="Søk i biblioteket"
			value="${escapeHtml(model.viewState.searchBar)}"
			oninput="updateSearchValue(this.value)"
			onkeydown="handleSearchKeydown(event)">
		<button onclick="changePage('searchPage')">Søk</button>
	`;
}

function getAuthButtonsMarkup() {
	if (isAuthenticated()) {
		return /*HTML*/ `
			<span class="nav-user">${escapeHtml(getDisplayName())}</span>
			<button onclick="changePage('profile')">Profil</button>
			<button onclick="logout()">Logg ut</button>
		`;
	}

	return /*HTML*/ `<button onclick="changePage('login')">Kom i gang</button>`;
}

function getAdminButtonMarkup() {
	if (!isAdminUser()) return "";
	return /*HTML*/ `<button onclick="changePage('addDetails')">+ Legg til album</button>`;
}

function renderNavbar() {
	const desktop = document.getElementById("nav-desktop");
	const mobile = document.getElementById("nav-mobile");

	if (!desktop || !mobile) return;

	desktop.innerHTML = /*HTML*/ `
		<button onclick="changePage('homePage')">Hjem</button>
		<button onclick="changePage('wishList')">Ønskeliste</button>
		${getAdminButtonMarkup()}
		${getSearchMarkup()}
		${getAuthButtonsMarkup()}
	`;

	mobile.className = `nav-mobile ${model.app.mobileMenuToggle ? "open" : ""}`;
	mobile.innerHTML = /*HTML*/ `
		<div class="nav-mobile-top">
			${getSearchMarkup(true)}
			<button class="navBurger" onclick="toggleMobileMenu()">☰</button>
		</div>
		<div class="mobile-menu-show">
			<button onclick="changePage('homePage')">Hjem</button>
			<button onclick="changePage('wishList')">Ønskeliste</button>
			${getAdminButtonMarkup()}
			${
				isAuthenticated()
					? `<button onclick="changePage('profile')">Profil</button>
					   <button onclick="logout()">Logg ut</button>`
					: `<button onclick="changePage('login')">Kom i gang</button>`
			}
		</div>
	`;
}

function toggleMobileMenu() {
	model.app.mobileMenuToggle = !model.app.mobileMenuToggle;
	renderNavbar();
}
