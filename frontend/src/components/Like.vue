<template>
	<div class="p-grid" style="background-color:yellow;">
		<!-- 4 symbols with score -->
		<div>
			<div>
				<span v-if="pub.heart > 0" class="p-m-1">heart</span
				><span v-if="pub.heart > 0" class="p-mr-2"> {{ pub.heart }} </span
				><span v-if="pub.thumb > 0" class="p-m-1">thumb</span
				><span v-if="pub.thumb > 0" class="p-mr-2">{{ pub.thumb }}</span
				><span v-if="pub.grin > 0" class="p-m-1">grin</span
				><span v-if="pub.grin > 0" class="p-mr-2">{{ pub.grin }}</span
				><span v-if="pub.sad > 0" class="p-m-1">sad</span
				><span v-if="pub.sad > 0" class="p-mr-2">{{ pub.sad }}</span>
			</div>
		</div>

		<!-- Display 4  symbols for selecting-->
		<div>
			<Button
				@click="aimer($event, pub)"
				:label="jaime"
				class="p-button-rounded p-button-help p-button-outlined p-m-2"
			/>
			<OverlayPanel id="over" ref="op">
				<!-- Select the symbol -->
				<div id="symb" class="p-my-0">
					<Button @click="heart(pub)" label="heart" class="p-button-text p-m-0 p-px-0" />
					<Button @click="thumb(pub)" label="thumb" class="p-button-text p-m-0 p-px-0" />
					<Button @click="grin(pub)" label="grin" class="p-button-text p-m-0 p-px-0" />
					<Button @click="sad(pub)" label="sad" class="p-button-text p-m-0 p-px-0" />
				</div>
			</OverlayPanel>
		</div>
		<!-- <div>
			<Button
				@click="liker(pub)"
				:label="pub.likes.toString()"
				icon="pi pi-heart"
				class="p-button-rounded p-button-help p-button-outlined p-m-2"
			/>
		</div> -->
		<!-- <div v-if="noConnect" class="p-toast p-col-10 p-md-7 p-lg-3">
			<div id="noLike" class="p-shadow-3 p-py-1 p-grid p-jc-between">
				<div class="p-col-10">
					<i class="pi pi-exclamation-triangle"></i>
					<span> Vous devez être connecté.e pour "liker".</span>
				</div>
				<div class="p-col-1">
					<i @click="closeAlert" class="pi pi-times-circle"></i>
				</div>
			</div>
		</div> -->
	</div>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "vuex"; // for authentification

export default {
	name: "Like",
	data() {
		return {
			noConnect: false,
			like: "",
			jaime: "J'aime ?",
			symbolClic: "",
			score: "",
			result: "",
		};
	},

	props: ["pub"],
	computed: {
		...mapState(["token", "logged", "userId"]),
	},
	updated: function() {},

	methods: {
		...mapActions(["checkConnect"]),

		//* Close message if box user is not connected
		closeAlert: function() {
			this.noConnect = false;
		},

		//!!! A REVOIR !!
		//* Want choose a symbol
		aimer(event, pub) {
			this.$refs.op.toggle(event);
		},
		grin(event) {
			this.$refs.op.hide();
		},
		//* Add a THUMB
		thumb(event, pub) {
			this.symbolClic = "thumb";
			axios({
				method: "post",
				url:
					"http://localhost:3001/api/pub/" +
					this.pub.index +
					"/like/" +
					this.$store.state.userId +
					"/symbol/" +
					this.symbolClic,
				data: { symbol: this.symbolClic },
				// headers: {
				// 	Authorization: `Bearer ${this.token}`,//! A debloquer !
				// },
			}).then((resp) => {
				// if previous selection
				if (resp.data === "heart") {
					this.pub.heart -= 1;
					this.pub.thumb += 1;
				} else if (resp.data === "grin") {
					this.pub.grin -= 1;
					this.pub.thumb += 1;
				} else if (resp.data === "sad") {
					this.pub.sad -= 1;
					this.pub.thumb += 1;
					// if the same symbol already selected
				} else if (resp.data === "like deleted") {
					this.pub.thumb -= 1;
				} else {
					// if no previous selection
					this.pub.thumb += 1;
				}
			});

			this.$refs.op.hide();
		},

		//* Add a HEART
		heart(event, pub) {
			this.symbolClic = "heart";
			axios({
				method: "post",
				url:
					"http://localhost:3001/api/pub/" +
					this.pub.index +
					"/like/" +
					this.$store.state.userId +
					"/symbol/" +
					this.symbolClic,
				data: { symbol: this.symbolClic },
				// headers: {
				// 	Authorization: `Bearer ${this.token}`,//! A debloquer !
				// },
			}).then((resp) => {
				// if previous selection
				if (resp.data === "thumb") {
					this.pub.thumb -= 1;
					this.pub.heart += 1;
				} else if (resp.data === "grin") {
					this.pub.grin -= 1;
					this.pub.heart += 1;
				} else if (resp.data === "sad") {
					this.pub.sad -= 1;
					this.pub.heart += 1;
					// if the same symbol already selected
				} else if (resp.data === "like deleted") {
					this.pub.heart -= 1;
				} else {
					// if no previous selection
					this.pub.heart += 1;
				}
			});

			this.$refs.op.hide();
		},

		//* Add a GRIN
		grin(event, pub) {
			this.symbolClic = "grin";
			axios({
				method: "post",
				url:
					"http://localhost:3001/api/pub/" +
					this.pub.index +
					"/like/" +
					this.$store.state.userId +
					"/symbol/" +
					this.symbolClic,
				data: { symbol: this.symbolClic },
				// headers: {
				// 	Authorization: `Bearer ${this.token}`,//! A debloquer !
				// },
			}).then((resp) => {
				// if previous selection
				if (resp.data === "thumb") {
					this.pub.thumb -= 1;
					this.pub.grin += 1;
				} else if (resp.data === "heart") {
					this.pub.heart -= 1;
					this.pub.grin += 1;
				} else if (resp.data === "sad") {
					this.pub.sad -= 1;
					this.pub.grin += 1;
					// if the same symbol already selected
				} else if (resp.data === "like deleted") {
					this.pub.grin -= 1;
				} else {
					// if no previous selection
					this.pub.grin += 1;
				}
			});

			this.$refs.op.hide();
		},

		//* Add a SAD
		sad(event, pub) {
			this.symbolClic = "sad";
			axios({
				method: "post",
				url:
					"http://localhost:3001/api/pub/" +
					this.pub.index +
					"/like/" +
					this.$store.state.userId +
					"/symbol/" +
					this.symbolClic,
				data: { symbol: this.symbolClic },
				// headers: {
				// 	Authorization: `Bearer ${this.token}`,//! A debloquer !
				// },
			}).then((resp) => {
				// if previous selection
				if (resp.data === "thumb") {
					this.pub.thumb -= 1;
					this.pub.sad += 1;
				} else if (resp.data === "heart") {
					this.pub.heart -= 1;
					this.pub.sad += 1;
				} else if (resp.data === "grin") {
					this.pub.grin -= 1;
					this.pub.sad += 1;
					// if the same symbol already selected
				} else if (resp.data === "like deleted") {
					this.pub.sad -= 1;
				} else {
					// if no previous selection
					this.pub.sad += 1;
				}
			});

			this.$refs.op.hide();
		},

		//! A SUPPRIMER
		//* Add a LIKE
		liker: function(pub) {
			if (!this.token) {
				this.noConnect = true;
			} else {
				this.$store.dispatch("checkConnect");
				if (!this.logged && this.token) {
					this.$router.push("/");
				} else {
					axios({
						method: "post",
						url:
							"http://localhost:3001/api/pub/" +
							this.pub.index +
							"/like/" +
							this.$store.state.userId,
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					})
						.then((resp) => {
							if (resp.data === "like deleted") {
								this.pub.likes -= 1;
							} else {
								this.pub.likes += 1;
							}
						})
						.catch((err) => {
							if (err.response.data.message === "jwt expired") {
								this.setInfo;
								this.$router.push("/");
							}
						});
				}
			}
		},
	},
};
</script>
<style>
#noLike {
	background-color: orange;
}

OverlayPanel {
	color: yellow;
}

#over {
	background-color: yellow;
}

#symb {
	background-color: pink;
}
</style>
