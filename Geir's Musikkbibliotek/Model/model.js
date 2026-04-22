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

		currentPage: "login",
		mobileMenuToggle: false,
		loggedInID: null,

		showGenreInput: true,
		showLocationInput: true,

		showDeleteGenreInput: true,
		showDeleteLocationInput: true,

		deleteConfirmation: false,
		authMessage: "",
	},

	viewState: {
		editMusicInfo: {
			genre: "",
			location: "",
		},

		musicInfo: {
			id: null,
			ownerId: null,
			title: "",
			artist: "",
			location: [],
			releaseYear: null,
			genre: [],
			notes: "",
			wishlist: false,
			coverImg: null,
		},

		login: {
			username: "",
			password: "",
		},

		createProfile: {
			username: "",
			password: "",
			repeatPassword: "",
			isUnderAge: false,
		},

		searchBar: "",
	},

	data: {
		genre: ["Rock", "Jazz", "Country", "Pop"],
		location: ["Stue", "Loft", "Boden"],

		musicInfo: [
			{
				id: 1,
				ownerId: 2,
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
				ownerId: 2,
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
				ownerId: 3,
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
				username: "admin",
				password: "admin",
				role: "admin",
			},
			{
				id: 2,
				username: "Geir",
				password: "geir",
				role: "user",
			},
			{
				id: 3,
				username: "GeirAndre",
				password: "geir2",
				role: "child",
			},
		],
	},
};
