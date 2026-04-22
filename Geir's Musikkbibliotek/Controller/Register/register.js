function registerUser() {
	clearFlashMessage();

	const username = model.viewState.createProfile.username.trim();
	const password = model.viewState.createProfile.password;
	const repeatPassword = model.viewState.createProfile.repeatPassword;

	if (!username || !password || !repeatPassword) {
		setFlashMessage("Fyll ut alle feltene.", "error");
		updateView();
		return;
	}

	if (password.length < 4) {
		setFlashMessage("Passordet må være minst 4 tegn.", "error");
		updateView();
		return;
	}

	if (password !== repeatPassword) {
		setFlashMessage("Passordene er ikke like.", "error");
		updateView();
		return;
	}

	const usernameExists = model.data.users.some(
		(user) => user.username.toLowerCase() === username.toLowerCase(),
	);

	if (usernameExists) {
		setFlashMessage("Brukernavnet er allerede i bruk.", "error");
		updateView();
		return;
	}

	const newUser = {
		id: getNextUserId(),
		username,
		password,
		role: "user",
		wishlist: [],
	};

	model.data.users.push(newUser);
	persistData();

	model.app.loggedInID = newUser.id;
	model.app.isGuest = false;
	model.app.guestWishlist = [];
	persistSession();
	clearAuthForms();
	setFlashMessage(`Brukeren ${username} ble opprettet.`, "success");
	changePage("profile");
}
