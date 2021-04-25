<template>
	<div>
		<!-- Quand non connecté -->
		<div v-if="!logged">
			<h1>Réso' Mouto'</h1>
			<h2>Bienvenue sur ton Réseau Social Familial Mouto !</h2>
			<div v-if="infoHome || sent" class="p-grid p-jc-center">
				<Message severity="warn">{{ infoHome }} {{ sent }} </Message>
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
				src="../assets/dedeeVis.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="aurelie"
				alt="aurélie"
				src="../assets/aurelieVis.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="delphine"
				alt="delphine"
				src="../assets/delphineVis.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="axel"
				alt="axel"
				src="../assets/axel.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="lucie"
				alt="lucie"
				src="../assets/lucie.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="nina"
				alt="nina"
				src="../assets/nina.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="maxym"
				alt="maxym"
				src="../assets/maxym.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="bertrand"
				alt="bertrand"
				src="../assets/bertrand.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="gosia"
				alt="gosia"
				src="../assets/gosia.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="justine"
				alt="justine"
				src="../assets/justine.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="morgan"
				alt="morgan"
				src="../assets/morgan.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="christ"
				alt="christ"
				src="../assets/christ.png"
			/>
			<img
				class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
				id="quentin"
				alt="quentin"
				src="../assets/quentin.png"
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
							v-if="(!logged || (mod && logged) || (creat && logged)) && !forget"
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
					<!-- case à cocher pour choix envoi email auto -->
					<div class="p-grid p-jc-center p-my-5 ">
						<div
							class=" p-lg-4 p-md-5 p-col-11 vertical-container"
							v-if="mod && logged"
						>
							<div class="p-field-checkbox">
								<Checkbox id="newPub" value="emailPub" v-model="checkPub" />
								<label for="newPub"
									>Je veux recevoir un mail à chaque nouvelle publication.</label
								>
							</div>
							<div class="p-field-checkbox">
								<Checkbox id="newCom" value="emailCom" v-model="checkCom" />
								<label for="newCom"
									>Je veux recevoir un mail lorsque mes publications sont
									commentées.</label
								>
							</div>
						</div>
					</div>
					<!-- choix photo -->
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
					<div v-if="!logged && !creat && !forget" class="p-grid p-jc-center p-my-5">
						<Button
							class="p-md-4 p-col-6"
							label="Par ici pour rentrer dans le Réso' Mouto' !"
							@click="loginUser"
						/>
					</div>
					<div v-if="!logged && !creat && !forget" class="p-grid p-jc-center p-my-5">
						<Button
							id="oups"
							class="p-button-text p-underline p-md-4 p-col-6"
							label="Oups ! J'ai perdu mon mot de passe."
							@click="forgotPass"
						/>
					</div>
					<div v-if="forget" class="p-grid p-jc-center p-my-5">
						<Button
							class="p-md-4 p-col-6"
							label="Demander un nouveau mot de passe"
							@click="askPass"
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
			forget: false, // true if user request new password
			checkPub: false, // for radio button
			checkCom: false, // for radio button
			emailPub: 0,
			emailCom: 0,

			sent: localStorage.getItem("emailSent"), // true if email sent while password forgotten
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
			emailInfo: "",
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
		checkData: function(event) {
			if (event.keyCode === 13) {
				// Validate on touch Enter
				this.loginUser();
			}
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
			if (event.keyCode === 13) {
				// Validate on touch Enter
				this.loginUser();
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
				if (this.checkPub) {
					this.emailPub = 1;
				}
				if (this.checkCom) {
					this.emailCom = 1;
				}

				this.theInfo = "";
				const formData = new FormData();
				formData.append("image", this.$data.image);
				formData.append("email", this.$data.email);
				formData.append("password", this.$data.password);
				formData.append("emailPub", this.emailPub);
				formData.append("emailCom", this.emailCom);
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

		//* Password forgotten
		forgotPass: function() {
			if (!this.prenom) {
				this.theInfo = "Merci de renseigner ton prénom";
			}
			this.forget = true;
		},

		//* Ask new Password
		askPass: function() {
			this.theInfo = "";
			axios({
				method: "post",
				url: "http://localhost:3001/api/auth/emailpassword/" + this.prenom + "/forgot",
			})
				.then((resp) => {
					window.location.reload();
					localStorage.setItem("emailSent", "Email envoyé !");
				})
				.catch((err) => {
					if (!this.prenom) {
						this.theInfo = "Merci de renseigner ton prénom";
					} else {
						this.theInfo = "L'email n'a pas pu être envoyé. Es-tu sûre du prénom ?";
					}
					this.severity = "error";
				});
		},
	},
};
</script>
<style>
/* .dedee-enter-from {
	transform: translateY(-100vw) skew(80deg);
}
.dedee-leave-to {
	transform: translateY(+100vw) skew(-80deg);
}
.dedee-enter-active,
.dedee-leave-active {
	transition: all 1s ease-in-out;
}
.dedee {
	animation-iteration-count: 3;
} */

@keyframes tete1 {
	0% {
		transform: scale(2) translateY(12vw) translateX(-7vw);
	}
	65% {
		transform: scale(2) translateY(12vw) translateX(8vw);
	}
	100% {
		transform: scale(2) translateY(12vw) translateX(-7vw);
	}
}
@keyframes tete2 {
	0% {
		transform: translateY(0vw) translateX(-15vw) rotate(0deg) scale(1);
	}

	65% {
		transform: translateY(0vw) translateX(-15vw) rotate(-360deg) scale(3);
	}
	100% {
		transform: translateY(0vw) translateX(-15vw) rotate(0deg) scale(1);
	}
}
@keyframes tete3 {
	0% {
		transform: scale(2);
	}
	20% {
		transform: translateY(-15vw) translateX(20vw) scale(2);
	}
	80% {
		transform: translateY(+30vw) scale(4);
	}
	100% {
		transform: scale(2);
	}
}
@keyframes tete4 {
	0% {
		transform: translateX(-27vw) translateY(-15vw) rotate(+30deg) scale(2);
	}
	23% {
		transform: translateX(68vw) translateY(-15vw) scale(2);
	}
	25% {
		transform: translateX(68vw) translateY(-15vw) rotate(-60deg) scale(2);
	}
	48% {
		transform: translateX(68vw) translateY(+29vw) scale(2);
	}
	50% {
		transform: translateX(68vw) translateY(+29vw) rotate(-30deg) scale(2);
	}
	73% {
		transform: translateX(-27vw) translateY(+29vw) scale(2);
	}
	75% {
		transform: translateX(-27vw) translateY(+29vw) rotate(+60deg) scale(2);
	}
	100% {
		transform: translateX(-27vw) translateY(-15vw) scale(2);
	}
}
@keyframes tete5 {
	0% {
		transform: translateX(-40vw) translateY(+25vw) scale(2);
	}
	15% {
		transform: translateX(-20vw) translateY(+10vw) scale(2);
	}

	30% {
		transform: translateX(-5vw) translateY(+25vw) scale(2);
	}

	40% {
		transform: translateX(+10vw) translateY(+10vw) scale(2);
	}

	50% {
		transform: translateX(+20vw) translateY(+25vw) scale(2);
	}
	65% {
		transform: translateX(+30vw) translateY(+10vw) scale(2);
	}
	75% {
		transform: translateX(+40vw) translateY(+25vw) scale(2);
	}
	90% {
		transform: translateX(+50vw) translateY(+10vw) scale(2);
	}
	100% {
		transform: translateX(+65vw) translateY(+25vw) scale(2);
	}
}
@keyframes tete6 {
	0% {
		transform: translateX(-38vw) translateY(-8vw) rotate(-0deg) scale(2);
	}
	50% {
		transform: translateX(+75vw) translateY(-8vw) rotate(+360deg) scale(2);
	}
	100% {
		transform: translateX(-35vw) translateY(-8vw) rotate(-360deg) scale(2);
	}
}
@keyframes tete7 {
	0% {
		transform: translateX(+25vw) translateY(-20vw) scale(1);
	}
	50% {
		transform: translateX(+25vw) translateY(+5vw) scale(4);
	}
	100% {
		transform: translateX(+25vw) translateY(+35vw) scale(1);
	}
}
@keyframes tete8 {
	0% {
		transform: translateX(-15vw) translateY(+15vw) rotate(-30deg) scale(2);
	}
	50% {
		transform: translateX(-15vw) translateY(+15vw) rotate(+30deg) scale(2);
	}

	100% {
		transform: translateX(-15vw) translateY(+15vw) rotate(-30deg) scale(2);
	}
}
@keyframes tete9 {
	0% {
		transform: scaleX(0.8);
	}
	50% {
		transform: scaleX(2.4) scaleY(3);
	}

	100% {
		transform: scaleX(0.8);
	}
}
@keyframes tete10 {
	0% {
		transform: translateX(-50vw) translateY(0vw) scale(2);
	}
	15% {
		transform: translateX(-20vw) translateY(-10vw) scale(2);
	}

	35% {
		transform: translateX(-5vw) translateY(+25vw) scale(2);
	}

	50% {
		transform: translateX(+10vw) translateY(+10vw) scale(2);
	}

	65% {
		transform: translateX(+20vw) translateY(+25vw) scale(2);
	}
	75% {
		transform: translateX(+30vw) translateY(+15vw) scale(2);
	}
	85% {
		transform: translateX(+40vw) translateY(+25vw) scale(2);
	}
	95% {
		transform: translateX(+50vw) translateY(+20vw) scale(2);
	}
	100% {
		transform: translateX(+65vw) translateY(+25vw) scale(2);
	}
}
@keyframes tete11 {
	0% {
		transform: translateX(-50vw) translateY(-20vw) scale(2);
	}
	15% {
		transform: translateX(-50vw) translateY(-10vw) scale(2);
	}

	35% {
		transform: translateX(-50vw) translateY(+25vw) scale(2);
	}

	50% {
		transform: translateX(-50vw) translateY(+10vw) scale(2);
	}

	65% {
		transform: translateX(-50vw) translateY(+25vw) scale(2);
	}
	75% {
		transform: translateX(-50vw) translateY(+15vw) scale(2);
	}
	85% {
		transform: translateX(-50vw) translateY(+25vw) scale(2);
	}
	95% {
		transform: translateX(-50vw) translateY(+20vw) rotate(-360deg) scale(2);
	}
	100% {
		transform: translateX(-50vw) translateY(+25vw) rotate(0deg) scale(2);
	}
}
@keyframes tete12 {
	0% {
		transform: translateX(+10vw) translateY(-20vw) rotate(+360deg) scale(2);
	}
	15% {
		transform: translateX(+15vw) translateY(-10vw) rotate(0) scale(2);
	}

	35% {
		transform: translateX(+5vw) translateY(+0vw) scale(2);
	}

	50% {
		transform: translateX(+15vw) translateY(+5vw) rotate(-360deg) scale(2);
	}

	65% {
		transform: translateX(+5vw) translateY(+15vw) rotate(0deg) scale(2);
	}
	75% {
		transform: translateX(+15vw) translateY(+15vw) scale(2);
	}
	85% {
		transform: translateX(+5vw) translateY(+25vw) scale(2);
	}
	95% {
		transform: translateX(+15vw) translateY(+30vw) rotate(-360deg) scale(2);
	}
	100% {
		transform: translateX(+5vw) translateY(+35vw) rotate(0deg) scale(2);
	}
}
@keyframes tete13 {
	0% {
		transform: translateX(-10vw) translateY(5vw) rotate(+10deg) scale(2);
	}
	50% {
		transform: translateX(-12vw) translateY(5vw) rotate(-10deg) scale(2);
	}

	100% {
		transform: translateX(-10vw) translateY(5vw) rotate(+10deg) scale(2);
	}
}
#dedee {
	animation: tete4 10s infinite linear;
}
#aurelie {
	animation: tete6 10s infinite linear;
}
#axel {
	animation: tete5 10s infinite linear;
}
#delphine {
	animation: tete8 2s infinite ease-in-out;
}
#lucie {
	animation: tete2 4s infinite ease-in-out;
}
#justine {
	animation: tete7 10s infinite ease-in-out;
}

#nina {
	animation: tete3 10s infinite linear;
}
#quentin {
	animation: tete9 4s infinite ease-in-out;
}
#maxym {
	animation: tete1 4s infinite ease-in-out;
}
#bertrand {
	animation: tete10 6s infinite linear;
}
#gosia {
	animation: tete11 6s infinite linear;
}
#morgan {
	animation: tete12 6s infinite linear;
}
#christ {
	animation: tete13 0.6s infinite linear;
}
/* .slide-leave-to {
	transform: translateY(+100vw) skew(-80deg);
} */
/* .slide-enter-active,
.slide-leave-active {
	transition: all 1s ease-in-out;
} */

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

#oups {
	text-decoration: underline;
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
