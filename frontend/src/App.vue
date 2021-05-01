<template>
	<div>
		<div id="nav">
			<div class="p-grid p-jc-between">
				<!-- div avec menu pour petit écran et nom loggé -->
				<div id="nav_small">
					<Button
						class="p-button-outlined p-button-help p-button-text"
						type="button"
						icon="pi pi-bars"
						@click="toggle"
						aria-haspopup="true"
						aria-controls="overlay_menu"
					/>
					<Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
				</div>
				<div v-if="logged">
					<p style="background-color:yellow;color:grey;">
						<i>Bonjour {{ prenom }}, tu es {{ connecte }}</i>
					</p>
				</div>
			</div>
			<div id="nav_big">
				<div class="p-grid p-jc-center p-ai-start">
					<TabMenu :model="items" />
				</div>
			</div>

			<!-- <router-view /> -->
			<router-view v-slot="slot">
				<transition name="slide" mode="out-in">
					<component :is="slot.Component"></component>
				</transition>
			</router-view>
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex"; // for authentification
import store from "./store/index.js";
export default {
	name: "Home",
	data() {
		return {
			isAdminLS: 0, // Data from localStorage
			prenom: "",
			connecte: "",
			items: [],
			noLog: [
				// { label: "Home", icon: "pi pi-home", to: "/" },

				{
					to: "/",
				},
				// { label: "Home", icon: "pi pi-home", to: "/" },
				// { label: "Mon compte", icon: "pi pi-id-card", to: "/signup" },
				// { label: "Les publications", icon: "pi pi-copy", to: "/publi" },
			],
			publish: [
				// { label: "Home", icon: "pi pi-home", to: "/" },
				{
					label: "Mon compte",
					icon: "pi pi-id-card",
					// command: () => {
					// 	window.location.reload();
					// },
					to: "/",
				},
				{ label: "Les publications", icon: "pi pi-copy", to: "/publi" },
				{
					label: "Je veux publier",
					icon: "pi pi-pencil",
					to: "/publier",
				},
				{
					label: "Me déconnecter",
					icon: "pi pi-power-off",
					command: () => {
						localStorage.clear();
						this.$store.dispatch("disconnect");
						window.location.reload();
					},
					to: "/",
				},
			],
			admin: [
				// { label: "Home", icon: "pi pi-home", to: "/" },
				{ label: "Mon compte", icon: "pi pi-id-card", to: "/" },
				{ label: "Les publications", icon: "pi pi-copy", to: "/publi" },
				// { label: "Créer publications", icon: "pi pi-pencil", to: "/publier" },
				{ label: "Utilisateurs", icon: "pi pi-star", to: "/admin/users" },
				{ label: "Publications", icon: "pi pi-star", to: "/admin/publications" },
				{ label: "Commentaires", icon: "pi pi-star", to: "/admin/comments" },
				{
					label: "Me déconnecter",
					icon: "pi pi-power-off",
					command: () => {
						localStorage.clear();
						window.location.reload();
					},
					to: "/",
				},
			],
		};
	},

	computed: {
		...mapState(["isAdmin", "logged"]),
		infoHome() {
			return store.getters.infoHome;
		},
	},

	methods: {
		...mapMutations(["setUserId", "setToken", "setAdmin"]),
		...mapActions(["checkConnect"]),

		toggle(event) {
			this.$refs.menu.toggle(event);
		},
	},
	beforeMount: function() {
		this.$store.dispatch("checkConnect");
		this.isAdminLS = parseInt(localStorage.getItem("Admin"));
		if (this.logged) {
			if (this.isAdminLS === 1) {
				this.items = this.admin;
			} else {
				this.items = this.publish;
			}
		} else {
			this.items = this.noLog;
		}
		this.prenom = localStorage.getItem("prenom");
		if (
			this.prenom === "Bertrand" ||
			this.prenom === "Christophe" ||
			this.prenom === "Axel" ||
			this.prenom === "Maxym" ||
			this.prenom === "Quentin" ||
			this.prenom === "Morgan"
		) {
			this.connecte = "connecté";
		} else {
			this.connecte = "connectée";
		}
	},
	beforeUpdate: function() {
		this.prenom = localStorage.getItem("prenom");
		if (
			this.prenom === "Bertrand" ||
			this.prenom === "Christophe" ||
			this.prenom === "Axel" ||
			this.prenom === "Maxym" ||
			this.prenom === "Quentin" ||
			this.prenom === "Morgan"
		) {
			this.connecte = "connecté";
		} else {
			this.connecte = "connectée";
		}
	},
	updated: function() {
		this.$store.dispatch("checkConnect");
		this.isAdminLS = parseInt(localStorage.getItem("Admin"));

		if (this.logged) {
			if (this.isAdminLS === 1) {
				this.items = this.admin;
			} else {
				this.items = this.publish;
			}
		} else {
			this.items = this.noLog;
		}
		this.prenom = localStorage.getItem("prenom");
	},
};
</script>

<style>
#id {
	margin: 0 0 0 0;
	padding: 0 0 0 0;
}
.slide-enter-from {
	transform: translateY(-100vw) skew(80deg);
}
.slide-leave-to {
	transform: translateY(+100vw) skew(-80deg);
}
.slide-enter-active,
.slide-leave-active {
	transition: all 1s ease-in-out;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #303030;
	/* background-image: url("./assets/fondVague.png");
	background-position: bottom;
	background-size: inherit; */
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #303030;
}

#nav a.router-link-exact-active {
	color: #673ab7;
}

#nav_small {
	visibility: collapse;
}
#nav_big {
	visibility: visible;
}

/* MEDIA QUERIES */

@media only screen and (max-width: 768px) {
	#nav_small {
		visibility: visible;
	}

	#nav_big {
		visibility: collapse;
	}
}
</style>
