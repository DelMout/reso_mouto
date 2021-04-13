<template>
	<div>
		<!-- Quand non connecté -->
		<div v-if="!logged">
			<h1>Réso' Mouto'</h1>
			<h2>Bienvenue sur ton Réseau Social Familial Mouto !</h2>
			<div v-if="infoHome" class="p-grid p-jc-center">
				<Message severity="warn">{{ infoHome }} </Message>
			</div>
			<h3>
				Réso' Mouto'<br />
				Il est jamais trop tôt<br />
				Pour écrire un mot !
			</h3>

			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="dedee"
				alt="dédee"
				src="../assets/dedee.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="aurelie"
				alt="aurélie"
				src="../assets/aurelie.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="delphine"
				alt="delphine"
				src="../assets/delphine.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="axel"
				alt="axel"
				src="../assets/axel.png"
			/>
		</div>
		<!-- Formulaire "login" ou "modif" -->
		<div>
			<h1 v-if="mod && logged">{{ prenom }}, Tu peux ici modifier tes données</h1>
			<div class="p-grid p-jc-center">
				<div class="p-lg-4 p-md-6 p-col-10">
					<Message v-if="theInfo" :severity="severity" :life="7000" :sticky="false">{{
						theInfo
					}}</Message>
				</div>
			</div>
			<div class=" p-text-left ">
				<div class=" p-input-filled  " enctype="multipart/form-data">
					<div class="p-grid p-jc-center  p-py-0">
						<div
							class=" p-lg-4 p-md-5 p-col-11 vertical-container"
							v-if="!logged || creat"
						>
							<p class=" p-float-label">
								<InputText
									class=""
									type="text"
									id="firstname"
									@keyup="checkData"
									v-model="prenom"
								/><label for="firstname">Prénom</label>
							</p>
						</div>
					</div>

					<div class="p-grid p-jc-center p-py-0">
						<div
							class=" p-lg-4 p-md-5 p-col-11 vertical-container"
							v-if="(mod && logged) || creat & logged"
						>
							<p class="p-float-label ">
								<InputText
									class=""
									id="email"
									type="text"
									@keyup="checkData"
									v-model="email"
								/><label for="email">Email</label>
							</p>
							<InlineMessage
								class="p-lg-6 p-12 "
								v-if="emailInfo && mod & logged"
								severity="error"
								>{{ emailInfo }}
							</InlineMessage>
							<InlineMessage class="" v-if="mod && logged" severity="info"
								>Saisir un autre email, modifiera ton adresse email.</InlineMessage
							>
						</div>
					</div>

					<div class="p-grid p-jc-center p-py-0">
						<div
							class=" p-lg-4 p-md-5 p-col-11 vertical-container"
							v-if="!logged || (mod && logged) || (creat && logged)"
						>
							<p class="">
								<span class="p-float-label  p-p-0">
									<InputText
										class=""
										id="password"
										:type="type"
										@keyup="checkData"
										v-model="password"/><label for="password"
										>Mot de passe</label
									><Button
										class=" p-ml-1 p-pl-auto p-button-outlined p-button-help p-button-text "
										@click="visibility"
										:icon="hide"
									></Button
								></span>
							</p>
							<InlineMessage
								class="p-lg-6 p-12 "
								v-if="
									(mod && passwordInfo && logged) ||
										(creat && passwordInfo && logged)
								"
								severity="error"
							>
								{{ passwordInfo }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-5 p-12 "
								v-if="(mod && min && logged) || (creat && min && logged)"
								severity="error"
							>
								{{ min }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-5 p-12 "
								v-if="(mod && up && logged) || (creat && up && logged)"
								severity="error"
							>
								{{ up }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-5 p-12"
								v-if="(mod && low && logged) || (creat && low && logged)"
								severity="error"
							>
								{{ low }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-4 p-12"
								v-if="(mod && num && logged) || (creat && num && logged)"
								severity="error"
							>
								{{ num }}
							</InlineMessage>
							<InlineMessage class="" v-if="mod && logged" severity="info"
								>Saisir un autre mot de passe, modifiera ton mot de
								passe.</InlineMessage
							>
						</div>
					</div>

					<div class="p-grid p-jc-center p-py-0">
						<div
							class=" p-lg-4 p-md-5 p-col-11 vertical-container"
							v-if="(mod && logged) || (creat && logged)"
						>
							<p class="">
								Photo :<input type="file" name="image" @change="onFileChange" />
							</p>
						</div>
					</div>

					<div class="p-grid p-jc-center " v-if="photo != null && mod && logged">
						<div class=" p-lg-4 p-md-5 p-col-11 vertical-container">
							<span>Ta photo actuelle : </span
							><img id="photoUser" :src="photo" alt="photo utilisateur" />
						</div>
					</div>
					<div class="p-grid p-jc-center p-mt-2 " v-if="photo === null && mod && logged">
						<InlineMessage class="p-lg-4 p-md-5 p-col-10" severity="info"
							>Vous n'avez pas de photo actuellement.</InlineMessage
						>
					</div>
					<div v-if="!logged && !creat" class="p-grid p-jc-center p-my-5">
						<Button
							class="p-md-4 p-col-6"
							label="Par ici pour rentrer dans le Réso' Mouto' !"
							@click="loginUser"
						/>
					</div>
					<div v-if="creat" class="p-grid p-jc-center p-my-2">
						<Button label="Valider" @click="createUser" /><br />
					</div>
				</div>
			</div>
			<div class="p-grid p-jc-center">
				<div class="p-col p-py-0 p-my-5 ">
					<Button
						label="Valider les modifications"
						v-if="mod && logged"
						@click="modifUser"
					/><br />

					<ConfirmPopup></ConfirmPopup>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import axios from "axios";
export default {
	name: "Signup",

	data() {
		return {
			theInfo: "",
			severity: "info",
			prenom: "",
			nom: "",
			email: "",
			service: "",
			password: "",
			description: "",
			photo: "",
			image: null,
			creat: false, //phase user creation
			mod: false, //phase modification user
			admin: false, //true if administrator profil
			type: "password",
			hide: "pi pi-eye",
			paramUser: {
				prenom: "prénom",
				nom: "nom",
				email: "email",
				service: "service",
				description: "description",
				password: "mot de passe",
			},
			notStrong: [],
			prenomTest: "",
			nomTest: "",
			serviceTest: "",
			emailTest: "",
			prenomInfo: "Merci de renseigner ce champ",
			emailInfo: "Merci de renseigner ce champ",
			passwordInfo: "Merci de renseigner ce champ",
			min: "",
			up: "",
			low: "",
			num: "",
			convers: {
				min: "10 caractères minimum",
				uppercase: "manque majuscule",
				lowercase: "manque minuscle",
				digits: "manque chiffres",
				not: 'les symboles "$.=" et apostrophe sont interdits',
			},
		};
	},
	computed: {
		...mapState(["infoHome", "token", "userId", "isAdmin", "logged"]),
	},
	beforeMount: function() {
		this.$store.dispatch("checkConnect");
		if (this.logged) {
			this.demandModifUser();
			if (this.isAdmin === 1) {
				this.admin = true;
			} else {
				this.admin = false;
			}
		} else {
			this.admin = false;
		}
	},
	methods: {
		...mapMutations(["setUserId", "setToken", "setAdmin", "setEmail"]),
		...mapActions(["checkConnect"]),
		//* Hide or show password
		visibility() {
			if (this.type === "password") {
				this.type = "text";
				this.hide = "pi pi-eye-slash";
			} else {
				this.type = "password";
				this.hide = "pi pi-eye";
			}
		},

		//* Check datas in form
		checkData: function() {
			if (this.prenom !== "") {
				this.prenomTest = !/[^_a-zA-ZÀ-ÿ-]/.test(this.prenom); // Renvoie true qd bonne saisie
				if (this.prenomTest === false) {
					this.prenomInfo = "Caractère non accépté.";
				} else {
					this.prenomInfo = "";
				}
				// } else(this.prenom !== null) {
			} else if (this.prenom === "") {
				this.prenomInfo = "Merci de renseigner ce champ";
			}

			if (this.password !== "") {
				let passwordMin = this.password.length >= 10;
				let passwordUp = /[A-Z]/.test(this.password);
				let passwordLow = /[a-z]/.test(this.password);
				let passwordNum = /[0-9]/.test(this.password);
				if (passwordMin === false) {
					this.min = "10 caractères minimum";
				} else {
					this.min = "";
				}

				if (passwordUp === false) {
					this.up = "1 majuscule requise";
				} else {
					this.up = "";
				}
				if (passwordLow === false) {
					this.low = "1 minuscule requise";
				} else {
					this.low = "";
				}
				if (passwordNum === false) {
					this.num = "1 chiffre requis";
				} else {
					this.num = "";
				}
				this.passwordInfo = "";
			} else if (this.password === "") {
				this.passwordInfo = "Merci de renseigner ce champ";
			}

			if (this.email !== "") {
				this.emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
					this.email
				);
				if (this.emailTest === false) {
					this.emailInfo = "Adresse email non accéptée.";
				} else {
					this.emailInfo = "";
				}
			} else if (this.email === "") {
				this.emailInfo = "Merci de renseigner ce champ";
			}
		},

		//* Select a photo
		onFileChange: function(event) {
			this.image = event.target.files[0];
		},

		//* LOGIN a USER

		loginUser: function() {
			this.theInfo = "";
			axios
				.post("http://localhost:3001/api/auth/login", {
					prenom: this.prenom,
					password: this.password,
				})
				.then((resp) => {
					const { userId, token, isAdmin } = resp.data;
					localStorage.setItem("token", token);
					localStorage.setItem("userId", userId);
					localStorage.setItem("Admin", isAdmin);
					console.log(this.prenom);
					localStorage.setItem("prenom", this.prenom);
					this.setAdmin(isAdmin);
					console.log("isadmin :" + isAdmin);
					this.$store.dispatch("checkConnect");
					//update last connection date in users table
					axios({
						method: "put",
						url: "http://localhost:3001/api/auth/login/" + this.$store.state.userId,
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					}).then(() => {
						this.$router.push("http://localhost:8080/publi");
					});
				})
				.catch((err) => {
					if (err.response.data === "Password not OK") {
						this.theInfo = "Mot de passe incorrect !! !!";
						this.severity = "error";
					} else if (err.response.data === "Firstname not OK") {
						this.theInfo = "Prénom incorrect !!";
						this.severity = "error";
					}
				});
		},

		//* DEMAND modification  USER datas
		demandModifUser: function() {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				this.theInfo = "";
				this.mod = true;
				this.type = "password";
				this.hide = "pi pi-eye";
				axios({
					method: "get",
					url: "http://localhost:3001/api/auth/modif/" + this.$store.state.userId,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.prenom = resp.data.prenom;
						this.nom = resp.data.nom;
						this.email = resp.data.email;
						this.description = resp.data.description;
						this.photo = resp.data.photo;
						this.checkData();
					})
					.catch((err) => {
						if (err.response.data.message === "jwt expired") {
							this.setInfo;
							this.$router.push("/");
						}
					});
			}
		},

		//* MODIFY a USER
		modifUser: function() {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				this.theInfo = "";
				const formData = new FormData();
				formData.append("image", this.$data.image);
				formData.append("email", this.$data.email);
				formData.append("password", this.$data.password);
				axios({
					method: "put",
					url: "http://localhost:3001/api/auth/modif/" + this.$store.state.userId,
					data: formData,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.mod = false;
						this.theInfo = "Vos modifications ont été prises en compte";
						this.severity = "success";
					})
					.catch((err) => {
						if (err.response.data === "notEmpty") {
							this.theInfo = "Les champs non optionnels doivent être remplis.";
							this.severity = "info";
						} else {
							const issues = err.response.data;
							for (let n in issues) {
								let issue = issues[n];
								this.notStrong.push(this.convers[issue]);
							}
							if (this.passwordInfo || this.min || this.up || this.low || this.num) {
								this.theInfo =
									"Ces conditions pour le mot de passe ne sont pas respectées : " +
									this.notStrong +
									".";
							} else {
								this.theInfo = "L'adresse email saisie n'est pas correcte.";
							}
							this.severity = "error";
						}
						if (err.response.data.message === "jwt expired") {
							this.setInfo;
							this.$router.push("/");
						}
					});
			}
		},
		//* DELETE a USER
		demandDeleteUser: function(event) {
			this.$confirm.require({
				target: event.currentTarget,
				message: "Êtes vous sûre de vouloir supprimer votre compte ?",
				icon: "pi pi-exclamation-triangle",
				accept: () => {
					this.deleteUser();
				},
				reject: () => {
					this.hom = false;
				},
			});
		},
		deleteUser: function() {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				axios({
					method: "delete",
					url: "http://localhost:3001/api/auth/delete/" + this.$store.state.userId,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.$store.state.infoHome = "Votre compte a été supprimé !";
						this.$store.state.userId = null;
						this.$store.state.token = null;
						this.$router.push("/");
					})
					.catch((err) => {
						if (err.response.data.message === "jwt expired") {
							this.setInfo;
							this.$router.push("/");
						}
					});
			}
		},
	},
};
</script>
<style>
InlineMessage {
	color: black;
}
p {
	margin-bottom: 0px;
}
InlineMessage {
	margin-top: 0px;
}
#photoUser {
	width: 200px;
}

/* MEDIA QUERIES */

@media only screen and (max-width: 768px) {
	/*mobiles et tablettes*/
	h1 {
		font-size: 1rem;
	}
}
@media only screen and (max-width: 576px) {
	/*mobiles */

	h1 {
		font-size: 0.9rem;
	}
}
</style>
