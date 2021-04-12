<template>
	<div>
		<Button class="p-mt-5" :label="mesLes" v-if="logged" @click="mesOuLes" />
		<!-- revenir à visu des publi ou un seul bouton en toggle qui change d'intitulé une fois cliqué dessus-->

		<h1 class="p-mt-5 p-mb-0">{{ theInfo }}</h1>
		<div class="p-grid p-jc-center p-mb-6">
			<div class=" p-lg-2 p-md-6 p-col-10 p-toast ">
				<div class="">
					<div
						class="p-shadow-3 p-py-1 p-grid p-jc-between p-text-left"
						style="background-color:green;color:white;"
						v-if="infoDelete"
					>
						<div class="p-col-11">
							<i class="pi pi-check"></i>
							<span> Votre publication a été supprimée.</span>
						</div>
						<div class="p-col-1">
							<i @click="closeInfo" class="pi pi-times-circle"></i>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- loop to display all publications -->

		<div v-for="pub in publica" :key="pub.index" class=" p-grid vertical-container p-mt-3 ">
			<div class="p-mx-auto p-col">
				<div class="p-grid p-jc-center">
					<div
						class=" p-card p-shadow-6  p-lg-4 p-md-8 p-col-12  p-p-lg-5 p-py-3 p-my-2 "
					>
						<Author class="p-mx-0 p-text-left" :item="pub" />
						<h2 class="p-card-title p-mx-auto ">{{ pub.titre }}</h2>
						<div class="p-card-content p-mx-auto">
							<p class="p-text-justify p-mb-3">{{ pub.contenu }}</p>
							<img
								id="photoPub"
								v-if="pub.photo != null"
								:src="pub.photo"
								alt="publication picture"
								title="pub-img"
							/>
						</div>
						<div class="p-card-footer p-mx-auto">
							<div class="p-grid">
								<Like class=" p-col-6 p-ml-2" :pub="pub" />
							</div>
							<div class="p-grid">
								<Comment class="p-col-12 " :pub="pub" />
							</div>

							<ConfirmPopup></ConfirmPopup>
							<Button
								label="Supprimer cette publication"
								class="p-button-danger p-button-raised "
								v-if="seeDel"
								@click="deletePub($event, pub)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <Button
			class="p-m-2"
			label="Revenir sur les publications"
			v-if="seePub"
			v-on:click="backToPublications"
		/> -->

		<Button
			class="p-m-2"
			label="Voir plus de publications"
			v-if="more"
			v-on:click="seeMorePublications"
		/>
	</div>
</template>

<script>
import Like from "@/components/Like";
import Comment from "@/components/Comment";
import Author from "@/components/Author";
import axios from "axios";
import { mapState, mapActions } from "vuex"; // for authentification

export default {
	name: "Publication",
	components: {
		Like,
		Comment,
		Author,
	},
	data() {
		return {
			theInfo: "Les publications du Réso' Mouto'",
			qtyPub: 0,
			qtyMore: 0,
			publica: [],
			more: false,
			mine: true,
			seePub: false,
			seeDel: false,
			photo: "",
			infoDelete: false,
			mesLes: "Seulement mes publications",
		};
	},

	created: function() {
		this.qtyMore = 0;
		this.seePublications();
		this.infoDelete = false;
	},
	computed: {
		...mapState(["token", "userId", "logged"]),
		...mapActions(["checkConnect"]),
	},
	methods: {
		//* Mine OR All publications
		mesOuLes: function() {
			if (this.mine) {
				this.mesLes = "Seulement mes publications";
				this.seeMinePublications();
			} else {
				this.mesLes = "Toutes les publications";
				this.publica = [];
				this.qtyMore = 0;
				this.seePublications();
				this.infoDelete = false;
			}
		},

		//* SELECT MORE publications
		seeMorePublications: function() {
			this.qtyMore += 1;
			this.seePublications();
		},
		//* BACK to PUBLICATIONS
		backToPublications: function() {
			this.publica = [];
			this.qtyMore = 0;
			this.mine = true;
			this.seePublications();
			this.theInfo = "Les publications du Réso' Mouto'";
			this.seeDel = false;
		},
		//* SELECT 5 PUBLICATIONS
		seePublications: function() {
			this.mine = true;
			this.mesLes = "Seulement mes publications";
			this.seePub = false;
			this.del = false;
			this.seeDel = false;
			this.theInfo = "Les publications du Réso' Mouto'";
			axios.get("http://localhost:3001/api/pub").then((resp) => {
				this.qtyPub = resp.data.length;
				if (resp.data.length > parseInt(5 + 5 * this.qtyMore)) {
					this.more = true;
					this.qtyPub = parseInt(5 * this.qtyMore + 5);
				} else {
					this.more = false;
				}
				//* Get total of hearts
				for (let i = parseInt(5 * this.qtyMore); i < this.qtyPub; i++) {
					axios
						.get("http://localhost:3001/api/pub/" + resp.data[i].id + "/count/heart")
						.then((respHeart) => {
							//* Get total of thumbs
							axios
								.get(
									"http://localhost:3001/api/pub/" +
										resp.data[i].id +
										"/count/thumb"
								)
								.then((respThumb) => {
									//* Get total of grins
									axios
										.get(
											"http://localhost:3001/api/pub/" +
												resp.data[i].id +
												"/count/grin"
										)
										.then((respGrin) => {
											//* Get total of sads
											axios
												.get(
													"http://localhost:3001/api/pub/" +
														resp.data[i].id +
														"/count/sad"
												)
												.then((respSad) => {
													// 		//* get total of comments
													axios
														.get(
															"http://localhost:3001/api/pub/" +
																resp.data[i].id +
																"/comm/"
														)
														.then((rep) => {
															//* get symbol selected by user
															axios
																.get(
																	"http://localhost:3001/api/pub/" +
																		resp.data[i].id +
																		"/user/" +
																		this.$store.state.userId
																)
																.then((repSymb) => {
																	this.publica.push({
																		index: resp.data[i].id,
																		titre: resp.data[i].titre,
																		contenu:
																			resp.data[i].texte_pub,
																		date:
																			resp.data[i]
																				.date_crea_pub,
																		userId: resp.data[i].userId,
																		photo: resp.data[i].photo,
																		comm: rep.data.length,
																		heart: respHeart.data.count,
																		thumb: respThumb.data.count,
																		grin: respGrin.data.count,
																		sad: respSad.data.count,
																		symbol: repSymb.data,
																	});
																});
														});
												});
										});
								});
						});
				}
			});
		},
		//* SELECT my PUBLICATIONS
		seeMinePublications: function() {
			this.infoDelete = false;
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				this.mine = false;
				this.mesLes = "Toutes les publications";
				this.more = false;
				this.theInfo = "Tes publications ";
				this.publica = [];
				this.seePub = true;
				this.del = false;
				this.seeDel = true;

				axios({
					method: "get",
					url: "http://localhost:3001/api/pub/user/" + this.$store.state.userId,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.qtyPub = resp.data.length;
						if (resp.data.length === 0) {
							this.theInfo =
								"Tu n'as pas encore de publications sur le Réso' Mouto' !";
						}
						for (let i = 0; i < this.qtyPub; i++) {
							//* Get total of likes
							axios
								.get("http://localhost:3001/api/pub/" + resp.data[i].id + "/like/")
								.then((respo) => {
									//* get total of comments
									axios
										.get(
											"http://localhost:3001/api/pub/" +
												resp.data[i].id +
												"/comm/"
										)
										.then((rep) => {
											this.publica.push({
												index: resp.data[i].id,
												titre: resp.data[i].titre,
												contenu: resp.data[i].texte_pub,
												userId: resp.data[i].userId,
												date: resp.data[i].date_crea_pub,
												photo: resp.data[i].photo,
												comm: rep.data.length,
												likes: respo.data.length,
											});
										});
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
		//* DELETE a PUBLICATION
		deletePub: function(event, pub) {
			this.indexDel = pub.index;
			this.$confirm.require({
				target: event.currentTarget,
				message:
					"Attention, cette suppression supprimera aussi les commentaires liés à cette publication.",
				icon: "pi pi-exclamation-triangle",
				accept: () => {
					this.confDeletePub(pub);
				},
				reject: () => {},
			});
		},
		confDeletePub: function(pub) {
			this.$store.dispatch("checkConnect");
			if (!this.logged) {
				this.$router.push("/");
			} else {
				axios({
					method: "delete",
					url:
						"http://localhost:3001/api/pub/" +
						this.indexDel +
						"/" +
						this.$store.state.userId,
					headers: {
						Authorization: `Bearer ${this.token}`,
					},
				})
					.then((resp) => {
						this.seePub = true;
						this.mine = true;
						this.publica = [];
						this.seeMinePublications();
						this.infoDelete = true;
					})
					.catch((err) => {
						if (err.response.data.message === "jwt expired") {
							this.setInfo;
							this.$router.push("/");
						}
					});
			}
		},
		//* Close toast information publication deleted
		closeInfo: function() {
			this.infoDelete = false;
		},
	},
};
</script>
<style>
.p-card {
	background-color: beige;
}
.p-card-content {
	max-width: 100%;
}
#photoPub {
	max-width: 100%;
	max-height: 100%;
}

@media only screen and (max-width: 768px) {
	/*mobiles et tablettes*/
}
@media only screen and (max-width: 576px) {
	/*mobiles */
}
</style>
