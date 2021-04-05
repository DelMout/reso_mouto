<template>
	<div>
		<p>Nombre utilisateurs dans la base : {{ this.qtyUsers }}.</p>
		<div class="p-grid p-jc-center p-my-3">
			<!-- display for medium screen -->
			<div class="p-lg-3 p-md-8 p-d-none p-d-md-inline">
				<div class="p-grid p-jc-center">
					<!-- <Button class="" label="Recherche par email" @click="wantFindUser" /> -->

					<!-- <Button class="" label="Voir tous les comptes" @click="seeAllUsers" /> -->
					<Button class="" label="Créer un compte utilisateur" @click="wantCreate" />
				</div>
			</div>
			<!-- display for small screen -->
			<div class="p-lg-3 p-md-8 p-d-md-none p-d-sm-inline">
				<div class="p-grid p-jc-center">
					<!-- <Button class="" label="Recherche par email" @click="wantFindUser" /> -->

					<Button
						class="p-mt-2"
						label="Créer un compte utilisateur"
						@click="wantCreate"
					/>
				</div>
			</div>
		</div>
		<!-- display for medium screen -->
		<!-- <div v-if="findUser" class="p-grid p-jc-center p-text-left ">
			<div class="p-lg-3 p-col-8 p-d-none p-d-md-inline">
				<div class="p-grid  p-float-label">
					<InputText id="email" type="text" v-model="emailReq" /><label for="email">
						Email recherché</label
					>
					<Button class="p-ml-2" label="Valider la recherche" @click="findByEmail" />
				</div>
			</div>
		</div> -->
		<!-- display for small screen -->
		<!-- <div v-if="findUser" class="p-grid p-jc-center  p-d-md-none p-d-sm-inline">
			<div class="p-col">
				<div class="p-grid  ">
					<div class="p-float-label">
						<InputText id="email" type="text" v-model="emailReq" /><label for="email">
							Email recherché</label
						>
					</div>
					<Button class="p-mt-2" label="Valider la recherche" @click="findByEmail" />
				</div>
			</div>
		</div> -->
		<div class="p-grid p-jc-center">
			<Message v-if="noFound" severity="info"
				>Cet email ne correspond à aucun compte.</Message
			>
		</div>
		<!-- Create or Modify a account user-->
		<div>
			<h1 v-if="mod">Fiche informations du compte "{{ prenom }}"</h1>
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
							<InlineMessage class="p-lg-6 p-12 " v-if="prenomInfo" severity="error"
								>{{ prenomInfo }}
							</InlineMessage>
						</div>
					</div>

					<div class="p-grid p-jc-center p-py-0">
						<div class=" p-lg-4 p-md-5 p-col-11 vertical-container" v-if="mod || creat">
							<p class="p-float-label p-my-0">
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
								v-if="emailInfo && mod"
								severity="error"
								>{{ emailInfo }}
							</InlineMessage>
							<InlineMessage class="" v-if="mod" severity="info"
								>Saisir un autre email, modifiera votre adresse
								email.</InlineMessage
							>
						</div>
					</div>

					<div class="p-grid p-jc-center p-py-0">
						<div
							class=" p-lg-4 p-md-5 p-col-11 vertical-container"
							v-if="!logged || mod || creat"
						>
							<p class="p-float-label  p-mb-0">
								<span class="p-float-label  ">
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
								v-if="(mod && passwordInfo) || (creat && passwordInfo)"
								severity="error"
							>
								{{ passwordInfo }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-5 p-12 "
								v-if="(mod && min) || (creat && min)"
								severity="error"
							>
								{{ min }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-5 p-12 "
								v-if="(mod && up) || (creat && up)"
								severity="error"
							>
								{{ up }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-5 p-12"
								v-if="(mod && low) || (creat && low)"
								severity="error"
							>
								{{ low }}
							</InlineMessage>
							<InlineMessage
								class="p-lg-4 p-12"
								v-if="(mod && num) || (creat && num)"
								severity="error"
							>
								{{ num }}
							</InlineMessage>
							<InlineMessage class="" v-if="mod" severity="info"
								>Saisir un autre mot de passe, modifiera votre mot de
								passe.</InlineMessage
							>
						</div>
					</div>

					<div class="p-grid p-jc-center p-py-0">
						<div class=" p-lg-4 p-md-5 p-col-11 vertical-container" v-if="mod || creat">
							<p class="">
								Photo :<input type="file" name="image" @change="onFileChange" />
							</p>
						</div>
					</div>

					<div class="p-grid p-jc-center " v-if="photo != null && mod">
						<div class=" p-lg-4 p-md-5 p-col-11 vertical-container">
							<span>Votre photo actuelle : </span
							><img id="photoUser" :src="photo" alt="photo utilisateur" />
						</div>
					</div>
					<div class="p-grid p-jc-center p-mt-2 " v-if="photo === null && mod">
						<InlineMessage class="p-lg-4 p-md-5 p-col-10" severity="info"
							>Vous n'avez pas de photo actuellement.</InlineMessage
						>
					</div>
					<!-- <div v-if="!logged && !creat" class="p-grid p-jc-center p-my-5">
						<Button
							class="p-md-4 p-col-6"
							label="Entrer dans le réso' Mouto' !"
							@click="loginUser"
						/>
					</div> -->
					<div v-if="creat" class="p-grid p-jc-center p-my-2">
						<Button label="Valider" @click="createUser" /><br />
					</div>
				</div>
			</div>
			<div class="p-grid p-jc-center">
				<div class="p-col p-py-0 p-my-5 ">
					<Button label="Valider les modifications" v-if="mod" @click="modifUser" /><br />
					<ConfirmPopup></ConfirmPopup>
				</div>
			</div>
		</div>
		<!-- List of cards of all users -->
		<div class="p-grid vertical-container" v-for="user in users" :key="user.index">
			<div class="p-mx-auto p-col p-mt-3">
				<div class="p-grid p-jc-center">
					<div class="p-card p-shadow-6 p-col-12 p-md-6 p-lg-3 p-p-5 p-m-2">
						<div class="p-card-content p-text-left">
							<i
								><span class="intitut">Dernière connexion : </span
								>{{ user.last_connect }}</i
							>
							<p>
								<span class="intitut"> Utilisateur : </span>{{ user.nom }}
								{{ user.prenom }}
							</p>
							<p><span class="intitut">Email : </span>{{ user.email }}</p>
							<!-- <p><span class="intitut">Service : </span>{{ user.service }}</p>
							<p class="p-mb-2">
								<span class="intitut ">Description : </span>{{ user.description }}
							</p> -->
							<img
								v-if="user.photo"
								style="width:100px;"
								:src="user.photo"
								alt="identity user"
							/>
						</div>
						<div class="p-card-footer p-grid p-jc-between">
							<Message v-if="user.info" severity="success">{{ user.info }}</Message>
							<ConfirmPopup></ConfirmPopup>
							<Button
								class="p-button-warning p-button-raised p-mt-2"
								label="Modifier le compte"
								v-if="logged"
								@click="demandModifUser(user)"
							/>
							<Button
								class="p-button-danger p-button-raised p-mt-2 "
								label="Supprimer le compte"
								v-if="user.demandDelete === 1"
								@click="deleteUser($event, user)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import moment from "moment";
import axios from "axios";

export default {
	name: "AdminUsers",
	data() {
		return {
			users: [],
			qtyUsers: "",
			findUser: false,
			emailReq: "",
			noFound: false,
			creat: false,
			theInfo: "",
			userIndex: "",
			prenom: "",
			email: "",
			password: "",
			photo: "",
			image: null,
			prenomInfo: "Merci de renseigner ce champ",
			emailInfo: "Merci de renseigner ce champ",
			passwordInfo: "Merci de renseigner ce champ",
			mod: false,
			type: "password",
			hide: "pi pi-eye",
			prenomTest: "",
			serviceTest: "",
			emailTest: "",
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
		...mapState(["token", "userId", "isAdmin", "logged"]),
	},
	created: function() {
		this.seeAllUsers();
	},
	methods: {
		...mapMutations(["setUserId", "setToken", "setAdmin"]),
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
		//* DISPLAY ALL USERS
		seeAllUsers: function() {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				this.noFound = false;
				this.findUser = false;
				this.users = [];
				axios
					.get("http://localhost:3001/api/auth/users")
					.then((resp) => {
						this.qtyUsers = resp.data.length;
						for (let i = 0; i < this.qtyUsers; i++) {
							this.users.push({
								index: resp.data[i].id,
								nom: resp.data[i].nom,
								prenom: resp.data[i].prenom,
								email: resp.data[i].email,
								service: resp.data[i].service,
								description: resp.data[i].description,
								photo: resp.data[i].photo,
								last_connect: moment(resp.data[i].last_connect).format(
									"DD/MM/YYYY"
								),
								demandDelete: 1,
								info: "",
							});
						}
					})
					.catch((err) => {
						if (err.response.data.message === "jwt expired") {
							this.setInfo;
							this.$router.push("/");
						}
					});
			}
		},

		//* CREATE a new USER
		wantCreate: function() {
			this.creat = true;
		},
		createUser: function() {
			this.theInfo = "";
			// this.setEmail(this.email);
			const formData = new FormData();
			formData.append("image", this.$data.image);
			formData.append("prenom", this.$data.prenom);
			formData.append("email", this.$data.email);
			formData.append("password", this.$data.password);
			axios({
				method: "post",
				url: "http://localhost:3001/api/auth/signup",
				data: formData,
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			})
				.then((resp) => {
					this.theInfo = "Le compte a été créé.";
					this.severity = "success";
					this.creat = false;
				})
				.catch((err) => {
					this.theInfo =
						"Le compte n'a pas pu être créé. Merci de corriger les paramètres demandés dans le formulaire.";
					this.severity = "error";
				});
		},

		//* DEMAND modification  USER datas
		demandModifUser: function(user) {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				this.theInfo = "";
				this.userIndex = user.index;
				this.mod = true;
				this.type = "password";
				this.hide = "pi pi-eye";
				axios({
					method: "get",
					url: "http://localhost:3001/api/auth/modif/" + user.index,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.prenom = resp.data.prenom;
						this.email = resp.data.email;
						this.photo = resp.data.photo;
						this.checkData();
						window.scrollTo(0, 0);
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
					url: "http://localhost:3001/api/auth/modif/" + this.userIndex,
					data: formData,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.mod = false;
						this.theInfo = "Les modifications ont été prises en compte";
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
							this.theInfo =
								"Ces conditions pour le mot de passe ne sont pas respectées : " +
								this.notStrong +
								".";
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
		deleteUser: function(event, user) {
			this.$confirm.require({
				target: event.currentTarget,
				message:
					"Attention, la suppression de ce compte supprimera aussi les publications et les commentaires créés par cet utilisateur.",
				icon: "pi pi-exclamation-triangle",
				accept: () => {
					this.confDeleteUser(user);
				},
				reject: () => {},
			});
		},
		confDeleteUser: function(user) {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				axios({
					method: "delete",
					url: "http://localhost:3001/api/auth/delete/" + user.index,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						user.info = "Ce compte vient d'être supprimé.";
						user.demandDelete = 0;
					})
					.catch((err) => {
						if (err.response.data.message === "jwt expired") {
							this.setInfo;
							this.$router.push("/");
						}
					});
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

		//* FIND by Email
		wantFindUser: function() {
			this.noFound = false;
			this.findUser = true;
		},
		findByEmail: function() {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				this.noFound = false;
				this.users = [];
				axios({
					method: "get",
					url: "http://localhost:3001/api/auth/find/" + this.emailReq,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.users.push({
							index: resp.data.id,
							nom: resp.data.nom,
							prenom: resp.data.prenom,
							email: resp.data.email,
							service: resp.data.service,
							description: resp.data.description,
							photo: resp.data.photo,
							last_connect: moment(resp.data.last_connect).format("DD/MM/YYYY"),
							demandDelete: 1,
							info: "",
						});
						// }
					})
					.catch((err) => {
						this.noFound = true;
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
.intitut {
	color: #303030;
	font-weight: bold;
}
</style>
