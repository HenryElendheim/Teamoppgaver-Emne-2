function loginPage() {
	if (isAuthenticated()) {
		return /*HTML*/ `
		<div class="auth-wrapper auth-wrapper-wide">
			<div class="auth-card">
				<div class="auth-title">Du er allerede inne</div>
				<p class="auth-subtitle">Logget inn som ${escapeHtml(getDisplayName())}.</p>
				${renderFlashMessage()}
				<div class="auth-actions-stack">
					<button class="btn btn-accent btn-full" onclick="changePage('profile')">Gå til profil</button>
					<button class="btn btn-ghost btn-full" onclick="logout()">Logg ut</button>
				</div>
			</div>
		</div>
		`;
	}

	return /*HTML*/ `
	<div class="auth-wrapper auth-wrapper-wide">
		<div class="auth-card">
			<div class="auth-title">Velkommen, kom i gang</div>
			<p class="auth-subtitle">Lag en bruker, logg inn eller velg gjestebruker for å teste appen.</p>
			${renderFlashMessage()}

			<div class="auth-actions-inline">
				<button class="btn btn-accent" onclick="continueAsGuest()">Fortsett som gjest</button>
				<button class="btn btn-ghost" onclick="changePage('register')">Lag bruker</button>
			</div>

			<hr class="form-divider">

			<div class="form-row">
				<label class="form-label">Brukernavn</label>
				<input
					class="form-input"
					type="text"
					placeholder="Brukernavn"
					value="${escapeHtml(model.viewState.login.username)}"
					oninput="model.viewState.login.username = this.value">
			</div>

			<div class="form-row">
				<label class="form-label">Passord</label>
				<input
					class="form-input"
					type="password"
					placeholder="••••••"
					value="${escapeHtml(model.viewState.login.password)}"
					oninput="model.viewState.login.password = this.value"
					onkeydown="if(event.key === 'Enter') login()">
			</div>

			<button class="btn btn-accent btn-full" onclick="login()">Logg inn</button>

			<p class="auth-footer">
				Ingen konto? <a href="#" onclick="changePage('register')">Registrer deg</a>
			</p>
		</div>
	</div>
	`;
}
