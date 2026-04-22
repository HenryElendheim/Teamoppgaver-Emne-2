const APP_DATA_KEY = "geirs-musikkbibliotek-data";
const APP_SESSION_KEY = "geirs-musikkbibliotek-session";
const APP_THEME_KEY = "geirs-musikkbibliotek-theme";

function createEmptyMusicInfo() {
	return {
		id: null,
		title: "",
		artist: "",
		location: [],
		releaseYear: null,
		genre: [],
		notes: "",
		wishlist: false,
		coverImg: null,
	};
}

function createEmptyEditMusicInfo() {
	return {
		genre: "",
		location: "",
	};
}

function createEmptyLoginState() {
	return {
		username: "",
		password: "",
	};
}

function createEmptyRegisterState() {
	return {
		username: "",
		password: "",
		repeatPassword: "",
	};
}

function getDefaultData() {
	return {
		genre: ["Rock", "Jazz", "Country", "Pop"],
		location: ["Stue", "Loft", "Boden"],
		musicInfo: [
			{
				id: 1,
				title: "Thriller",
				artist: "Michael Jackson",
				location: [0],
				releaseYear: 1982,
				genre: [3],
				notes:
					"As the best-selling album in history (estimated over 70 million copies), it revolutionized music videos and broke racial barriers in pop music.",
				wishlist: false,
				coverImg:
					"https://www.platekompaniet.no/pimcorecdn/Products/Music/LP/LPF/image-thumb__605110__Image800/1740380669.jpg?auto=webp&format=pjpg&width=160&height=160&fit=cover",
			},
			{
				id: 2,
				title: "The Dark Side of the Moon",
				artist: "Pink Floyd",
				location: [2],
				releaseYear: 1973,
				genre: [0],
				notes:
					"Widely praised for its sonic production, thematic cohesion, and massive popularity, it is regarded as a perfect rock album.",
				wishlist: false,
				coverImg:
					"https://imusic.b-cdn.net/images/item/original/024/0196587714024.jpg?pink-floyd-2025-the-dark-side-of-the-moon-50th-anniversary-edition-cd&class=original&v=1739720514",
			},
			{
				id: 3,
				title: "Abbey Road",
				artist: "The Beatles",
				location: [1],
				releaseYear: 1969,
				genre: [0],
				notes:
					"Often cited in critical polls as one of the best-produced and most influential albums in music history.",
				wishlist: false,
				coverImg:
					"https://imusic.b-cdn.net/images/item/original/439/0602508007439.jpg?the-beatles-2019-abbey-road-50th-anniversary-cd&class=original&v=1565271105",
			},
		],
		users: [
			{
				id: 1,
				username: "Geir",
				password: "geir",
				role: "admin",
				wishlist: [],
			},
			{
				id: 2,
				username: "Geir Andre",
				password: "geir2",
				role: "user",
				wishlist: [],
			},
		],
	};
}

function safeParse(json, fallback) {
	try {
		return JSON.parse(json) ?? fallback;
	} catch {
		return fallback;
	}
}

function cloneDeep(value) {
	return JSON.parse(JSON.stringify(value));
}

function migrateData(data) {
	const fallback = getDefaultData();
	const migrated = {
		genre: Array.isArray(data?.genre) ? data.genre : fallback.genre,
		location: Array.isArray(data?.location) ? data.location : fallback.location,
		musicInfo: Array.isArray(data?.musicInfo) ? data.musicInfo : fallback.musicInfo,
		users: Array.isArray(data?.users) ? data.users : fallback.users,
	};

	migrated.musicInfo = migrated.musicInfo.map((album) => ({
		...createEmptyMusicInfo(),
		...album,
		location: Array.isArray(album.location) ? album.location : [],
		genre: Array.isArray(album.genre) ? album.genre : [],
	}));

	migrated.users = migrated.users.map((user) => {
		const role = user.role
			? user.role
			: user.username?.toLowerCase() === "geir"
				? "admin"
				: "user";

		return {
			id: user.id,
			username: user.username,
			password: user.password,
			role,
			wishlist: Array.isArray(user.wishlist) ? user.wishlist : [],
		};
	});

	if (!migrated.users.some((user) => user.role === "admin")) {
		migrated.users[0] = {
			...migrated.users[0],
			role: "admin",
		};
	}

	return migrated;
}

const storedData = safeParse(localStorage.getItem(APP_DATA_KEY), null);
const storedSession = safeParse(sessionStorage.getItem(APP_SESSION_KEY), null);
const data = migrateData(storedData || getDefaultData());

const model = {
	app: {
		app: document.getElementById("app"),
		allPages: [
			"homePage",
			"searchPage",
			"wishList",
			"viewDetails",
			"addDetails",
			"editDetails",
			"profile",
			"login",
			"register",
		],
		currentPage: "homePage",
		mobileMenuToggle: false,
		loggedInID: Number.isInteger(storedSession?.loggedInID)
			? storedSession.loggedInID
			: null,
		isGuest: Boolean(storedSession?.isGuest),
		guestWishlist: Array.isArray(storedSession?.guestWishlist)
			? storedSession.guestWishlist
			: [],
		showGenreInput: false,
		showLocationInput: false,
		showDeleteGenreInput: false,
		showDeleteLocationInput: false,
		deleteConfirmation: false,
		flashMessage: "",
		flashMessageType: "info",
	},
	viewState: {
		editMusicInfo: createEmptyEditMusicInfo(),
		musicInfo: createEmptyMusicInfo(),
		login: createEmptyLoginState(),
		createProfile: createEmptyRegisterState(),
		searchBar: "",
	},
	data,
};

function persistData() {
	localStorage.setItem(APP_DATA_KEY, JSON.stringify(model.data));
}

function persistSession() {
	sessionStorage.setItem(
		APP_SESSION_KEY,
		JSON.stringify({
			loggedInID: model.app.loggedInID,
			isGuest: model.app.isGuest,
			guestWishlist: model.app.guestWishlist,
		}),
	);
}

function clearSession() {
	model.app.loggedInID = null;
	model.app.isGuest = false;
	model.app.guestWishlist = [];
	persistSession();
}

function clearAuthForms() {
	model.viewState.login = createEmptyLoginState();
	model.viewState.createProfile = createEmptyRegisterState();
}

function emptyGenreLocationList() {
	model.viewState.editMusicInfo = createEmptyEditMusicInfo();
}

function emptyList() {
	model.viewState.musicInfo = createEmptyMusicInfo();
}

function getCurrentUser() {
	return model.data.users.find((user) => user.id === model.app.loggedInID) || null;
}

function isAuthenticated() {
	return model.app.isGuest || !!getCurrentUser();
}

function isGuestUser() {
	return model.app.isGuest;
}

function isAdminUser() {
	const user = getCurrentUser();
	return !!user && user.role === "admin";
}

function getDisplayName() {
	if (isGuestUser()) return "Gjest";
	return getCurrentUser()?.username || "Ikke logget inn";
}

function getCurrentWishlistIds() {
	if (isGuestUser()) return model.app.guestWishlist;
	const user = getCurrentUser();
	return Array.isArray(user?.wishlist) ? user.wishlist : [];
}

function isInWishlist(albumId) {
	return getCurrentWishlistIds().includes(albumId);
}

function setWishlistState(albumId, checked) {
	if (isGuestUser()) {
		if (checked && !model.app.guestWishlist.includes(albumId)) {
			model.app.guestWishlist.push(albumId);
		}
		if (!checked) {
			model.app.guestWishlist = model.app.guestWishlist.filter((id) => id !== albumId);
		}
		persistSession();
		return true;
	}

	const user = getCurrentUser();
	if (!user) return false;

	if (!Array.isArray(user.wishlist)) {
		user.wishlist = [];
	}

	if (checked && !user.wishlist.includes(albumId)) {
		user.wishlist.push(albumId);
	}

	if (!checked) {
		user.wishlist = user.wishlist.filter((id) => id !== albumId);
	}

	persistData();
	persistSession();
	return true;
}

function getNextUserId() {
	if (!model.data.users.length) return 1;
	return Math.max(...model.data.users.map((user) => user.id)) + 1;
}

function getNextAlbumId() {
	if (!model.data.musicInfo.length) return 1;
	return Math.max(...model.data.musicInfo.map((album) => album.id)) + 1;
}

function getGenreNames(genreIndexes = []) {
	return genreIndexes
		.map((index) => model.data.genre[index])
		.filter(Boolean)
		.join(", ");
}

function getLocationNames(locationIndexes = []) {
	return locationIndexes
		.map((index) => model.data.location[index])
		.filter(Boolean)
		.join(", ");
}

function setFlashMessage(message, type = "info") {
	model.app.flashMessage = message;
	model.app.flashMessageType = type;
}

function clearFlashMessage() {
	model.app.flashMessage = "";
	model.app.flashMessageType = "info";
}

function renderFlashMessage() {
	if (!model.app.flashMessage) return "";

	return /*HTML*/ `
	<div class="notice notice-${model.app.flashMessageType}">
		${escapeHtml(model.app.flashMessage)}
	</div>`;
}

function closeMobileMenu() {
	model.app.mobileMenuToggle = false;
}

function escapeHtml(value) {
	return String(value ?? "")
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
}

persistData();
persistSession();
