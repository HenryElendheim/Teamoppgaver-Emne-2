function registerPage() {
	return /*HTML*/ `
	<div class="auth-wrapper auth-wrapper-wide">
		<div class="auth-card">
			<div class="auth-title">Lag bruker</div>
			<p class="auth-subtitle">Opprett en vanlig bruker for å lagre ønskelisten din permanent.</p>
			${renderFlashMessage()}

			<div class="form-row">
				<label class="form-label">Brukernavn</label>
				<input
					class="form-input"
					type="text"
					placeholder="Velg brukernavn"
					value="${escapeHtml(model.viewState.createProfile.username)}"
					oninput="model.viewState.createProfile.username = this.value">
			</div>

			<div class="form-row">
				<label class="form-label">Passord</label>
				<input
					class="form-input"
					type="password"
					placeholder="Minst 4 tegn"
					value="${escapeHtml(model.viewState.createProfile.password)}"
					oninput="model.viewState.createProfile.password = this.value">
			</div>

			<div class="form-row">
				<label class="form-label">Gjenta passord</label>
				<input
					class="form-input"
					type="password"
					placeholder="Gjenta passord"
					value="${escapeHtml(model.viewState.createProfile.repeatPassword)}"
					oninput="model.viewState.createProfile.repeatPassword = this.value"
					onkeydown="if(event.key === 'Enter') registerUser()">
			</div>

			<button class="btn btn-accent btn-full" onclick="registerUser()">Opprett bruker</button>

			<p class="auth-footer">
				Har du allerede konto? <a href="#" onclick="changePage('login')">Til innlogging</a>
			</p>
		</div>
	</div>
	`;
}
