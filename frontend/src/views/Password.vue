<template>
	<div>
		<h3>Bonjour {{ prenom }}</h3>
		<div class="p-grid p-jc-center">
			<div class="p-lg-4 p-md-6 p-col-10">
				<Message v-if="theInfo" :severity="severity" :sticky="true">{{ theInfo }}</Message>
			</div>
		</div>
		<div class=" p-text-left ">
			<div class=" p-input-filled  " enctype="multipart/form-data">
				<div class="p-grid p-jc-center p-py-0">
					<div class=" p-lg-4 p-md-5 p-col-11 vertical-container">
						<p class="p-float-label p-my-0">
							<InputText
								class=""
								id="email"
								type="text"
								@keyup="checkData"
								v-model="email"
							/><label for="email">Email</label>
						</p>
						<InlineMessage class="p-lg-6 p-12 " v-if="emailInfo" severity="error"
							>{{ emailInfo }}
						</InlineMessage>
						<InlineMessage class="" severity="info"
							>Saisir un autre email, modifiera ton adresse email.</InlineMessage
						>
					</div>
				</div>

				<div class="p-grid p-jc-center p-py-0">
					<div class=" p-lg-4 p-md-5 p-col-11 vertical-container">
						<p class="p-float-label  p-mb-0">
							<span class="p-float-label  ">
								<InputText
									class=""
									id="password"
									:type="type"
									@keyup="checkData"
									v-model="password"/><label for="password">Mot de passe</label
								><Button
									class=" p-ml-1 p-pl-auto p-button-outlined p-button-help p-button-text "
									@click="visibility"
									:icon="hide"
								></Button
							></span>
						</p>
						<InlineMessage
							class="p-lg-6 p-12 "
							v-if="passwordInfo || passwordInfo"
							severity="error"
						>
							{{ passwordInfo }}
						</InlineMessage>
						<InlineMessage class="p-lg-5 p-12 " v-if="min || min" severity="error">
							{{ min }}
						</InlineMessage>
						<InlineMessage class="p-lg-5 p-12 " v-if="up || up" severity="error">
							{{ up }}
						</InlineMessage>
						<InlineMessage class="p-lg-5 p-12" v-if="low || low" severity="error">
							{{ low }}
						</InlineMessage>
						<InlineMessage class="p-lg-4 p-12" v-if="num || num" severity="error">
							{{ num }}
						</InlineMessage>
						<!-- <InlineMessage class="" v-if="mod" severity="info"
							>Saisir un autre mot de passe, modifiera votre mot de
							passe.</InlineMessage
						> -->
					</div>
				</div>
			</div>
		</div>

		<Button
			class="p-button p-button-raised p-mt-5"
			label="Valider les modifications"
			@click="modifPassword"
		/>
	</div>
</template>
<script>
import axios from "axios";

export default {
	name: "Password",
	data() {
		return {
			prenom: "",
			userId: "",
			email: "",
			password: "",
			type: "password",
			hide: "pi pi-eye",
			theInfo: "",
			notStrong: [],
			passwordInfo: "Merci de renseigner ce champ",
			emailInfo: "",
			min: "",
			up: "",
			low: "",
			num: "",
			convers: {
				min: "10 caractères minimum",
				uppercase: " manque majuscule",
				lowercase: " manque minuscle",
				digits: " manque chiffre",
				not: 'les symboles "$.=" et apostrophe sont interdits',
			},
		};
	},
	beforeMount: function() {
		this.findDatas();
	},
	updated: function() {
		if (
			!this.min &&
			!this.up &&
			!this.low &&
			!this.num &&
			(this.theInfo !== "L'adresse email saisie n'est pas correcte." ||
				(this.emailInfo !== "Adresse email non accéptée." &&
					this.theInfo === "L'adresse email saisie n'est pas correcte."))
		) {
			this.theInfo = "";
		}
	},
	methods: {
		//* Find user datas from jeton
		findDatas: function() {
			axios({
				method: "get",
				url: "http://localhost:3001/api/auth/user/" + this.$route.params.jeton,
			})
				.then((resp) => {
					this.prenom = resp.data.prenom;
					this.userId = resp.data.id;
					this.email = resp.data.email;
				})
				.catch((err) => console.log(err));
		},

		//* Validate datas modification
		modifPassword: function() {
			axios
				.put("http://localhost:3001/api/auth/modifpassword/" + this.userId, {
					email: this.$data.email,
					password: this.$data.password,
				})
				.then((resp) => {
					this.$router.push("/");
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
								"Les conditions pour le mot de passe ne sont pas respectées : Voir les messages ci-dessous.";
							// this.theInfo =
							// 	"Les conditions pour le mot de passe ne sont pas respectées : " +
							// 	this.notStrong +
							// 	".";
						} else {
							this.theInfo = "L'adresse email saisie n'est pas correcte.";
						}
						this.severity = "error";
					}
				});
		},

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
	},
};
</script>
