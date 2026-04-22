function requireLoginOrGuest(message = "Logg inn eller velg gjest for å fortsette.") {
	setFlashMessage(message, "error");
	changePage("login");
	return false;
}

function login() {
	clearFlashMessage();

	const username = model.viewState.login.username.trim();
	const password = model.viewState.login.password;

	if (!username || !password) {
		setFlashMessage("Skriv inn både brukernavn og passord.", "error");
		updateView();
		return;
	}

	const user = model.data.users.find(
		(item) => item.username.toLowerCase() === username.toLowerCase(),
	);

	if (!user || user.password !== password) {
		setFlashMessage("Feil brukernavn eller passord.", "error");
		updateView();
		return;
	}

	model.app.loggedInID = user.id;
	model.app.isGuest = false;
	model.app.guestWishlist = [];
	clearAuthForms();
	persistSession();
	setFlashMessage(`Velkommen, ${user.username}!`, "success");
	changePage("profile");
}

function continueAsGuest() {
	clearFlashMessage();
	model.app.loggedInID = null;
	model.app.isGuest = true;
	model.app.guestWishlist = [];
	clearAuthForms();
	persistSession();
	setFlashMessage(
		"Du tester nå som gjest. Ønskelisten lagres bare til nettleseren lukkes.",
		"success",
	);
	changePage("profile");
}

function logout() {
	clearFlashMessage();
	clearSession();
	clearAuthForms();
	setFlashMessage("Du er logget ut.", "info");
	changePage("homePage");
}
