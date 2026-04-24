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
		genre: ["Rock", "Jazz", "Country", "Pop", "EDM", "Diverse Sjangere"],
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
				ownerId: 2,
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
			{
				id: 4,
				ownerId: 3,
				title: "Hits For Kids 8",
				artist: "Flere Artister",
				location: [1],
				releaseYear: 2002,
				genre: [0,4,5],
				notes:
					"Beste hits for kids (nostalgi går crazy)",
				wishlist: false,
				coverImg:
					"https://media.discordapp.net/attachments/1483106447586885848/1497162937096343692/Hits_For_Kids_8.png?ex=69ec8524&is=69eb33a4&hm=9f039035720caa6066f2c51fe65e832e2e14a739d7872bfd4e8b551394bd9804&=&format=webp&quality=lossless&width=540&height=540",
			},
		],

		users: [
			{
				id: 1,
				username: "admin",
				password: "123",
				role: "admin",
			},
			{
				id: 2,
				username: "Geir",
				password: "123",
				role: "user",
			},
			{
				id: 3,
				username: "Barn",
				password: "123",
				role: "child",
			},
		],
	},
};
