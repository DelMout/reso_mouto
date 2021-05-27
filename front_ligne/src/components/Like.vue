<template>
	<div>
		<!-- 4 symbols with score -->
		<div class="p-grid p-ai-start vertical-container">
			<span v-if="pub.heart > 0" class="p-m-1 symbol heart"><i class="fas fa-heart"></i></span
			><span v-if="pub.heart > 0" class="p-mr-2 p-my-auto heart "> {{ pub.heart }} </span
			><span v-if="pub.thumb > 0" class="p-m-1 symbol thumb"
				><i class="fas fa-thumbs-up"></i></span
			><span v-if="pub.thumb > 0" class="p-mr-2 p-my-auto thumb">{{ pub.thumb }}</span
			><span v-if="pub.grin > 0" class="p-m-1 symbol grin"
				><i class="fas fa-grin-beam"></i></span
			><span v-if="pub.grin > 0" class="p-mr-2 p-my-auto grin">{{ pub.grin }}</span
			><span v-if="pub.sad > 0" class="p-m-1 symbol sad"><i class="fas fa-sad-tear"></i></span
			><span v-if="pub.sad > 0" class="p-mr-2 p-my-auto sad">{{ pub.sad }}</span>
		</div>

		<!-- Display 4  symbols for selecting-->
		<div class="p-grid p-ai-start vertical-container p-mt-2">
			<Button
				@click="aimer($event, pub)"
				label="J'aime ?"
				class="p-button-raised
			p-button-help p-button-text p-my-2"
			/>
			<OverlayPanel id="over" ref="op">
				<!-- Select the symbol -->
				<!-- mult=1 while origin page -->
				<div class="p-my-0 ">
					<Button
						v-if="(pub.symbol === 'heart' && mult) || jaime === 'heart'"
						@click="heart(pub)"
						icon="fas fa-heart"
						class="p-button-outlined  p-button-danger  p-px-0 p-mx-2 symbol "
					/><Button
						v-if="(pub.symbol !== 'heart' && mult) || (jaime !== 'heart' && !mult)"
						@click="heart(pub)"
						icon="fas fa-heart"
						class=" p-button-text p-button-danger p-px-0 p-mx-2 symbol "
					/>
					<Button
						v-if="(pub.symbol === 'thumb' && mult) || jaime === 'thumb'"
						@click="thumb(pub)"
						icon="fas fa-thumbs-up"
						class="p-button-outlined p-button-info p-px-0 p-mx-2 symbol "
					/>
					<Button
						v-if="(pub.symbol !== 'thumb' && mult) || (jaime !== 'thumb' && !mult)"
						@click="thumb(pub)"
						icon="fas fa-thumbs-up"
						class="p-button-text p-button-info p-px-0 p-mx-2 symbol "
					/>
					<Button
						v-if="(pub.symbol === 'grin' && mult) || jaime === 'grin'"
						@click="grin(pub)"
						icon="fas fa-grin-beam"
						class="p-button-outlined p-button-success p-mx-2 p-px-0 symbol"
					/>
					<Button
						v-if="(pub.symbol !== 'grin' && mult) || (jaime !== 'grin' && !mult)"
						@click="grin(pub)"
						icon="fas fa-grin-beam"
						class="p-button-text p-button-success p-mx-2 p-px-0 symbol"
					/>
					<Button
						v-if="(pub.symbol === 'sad' && mult) || jaime === 'sad'"
						@click="sad(pub)"
						icon="fas fa-sad-tear"
						class="p-button-outlined p-button-help p-mx-2 p-px-0 symbol"
					/>
					<Button
						v-if="(pub.symbol !== 'sad' && mult) || (jaime !== 'sad' && !mult)"
						@click="sad(pub)"
						icon="fas fa-sad-tear"
						class="p-button-text p-button-help p-mx-2 p-px-0 symbol"
					/>
				</div>
			</OverlayPanel>
		</div>
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
			jaime: "",
			symbolClic: "",
			score: "",
			result: "",
			mult: 1,
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

		//* Want choose a symbol
		aimer(event, pub) {
			this.$refs.op.toggle(event);
		},

		//* Add a THUMB
		thumb(event, pub) {
			if (!this.token) {
				this.noConnect = true;
			} else {
				this.$store.dispatch("checkConnect");
				if (!this.logged && this.token) {
					this.$router.push("/");
				} else {
					this.symbolClic = "thumb";
					axios({
						method: "post",
						url:
							"https://apiresomouto.delmout.com/api/pub/" +
							this.pub.index +
							"/like/" +
							this.$store.state.userId +
							"/symbol/" +
							this.symbolClic,
						data: { symbol: this.symbolClic },
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					}).then((resp) => {
						this.mult = 0; // Cancel the value from request origin
						// if previous selection
						if (resp.data === "heart") {
							this.pub.heart -= 1;
							this.pub.thumb += 1;
							this.jaime = "thumb";
						} else if (resp.data === "grin") {
							this.pub.grin -= 1;
							this.pub.thumb += 1;
							this.jaime = "thumb";
						} else if (resp.data === "sad") {
							this.pub.sad -= 1;
							this.pub.thumb += 1;
							this.jaime = "thumb";
							// if the same symbol already selected
						} else if (resp.data === "like deleted") {
							this.pub.thumb -= 1;
							this.jaime = "";
						} else {
							// if no previous selection
							this.pub.thumb += 1;
							this.jaime = "thumb";
						}
					});

					this.$refs.op.hide();
				}
			}
		},

		//* Add a HEART
		heart(event, pub) {
			if (!this.token) {
				this.noConnect = true;
			} else {
				this.$store.dispatch("checkConnect");
				if (!this.logged && this.token) {
					this.$router.push("/");
				} else {
					this.symbolClic = "heart";
					axios({
						method: "post",
						url:
							"https://apiresomouto.delmout.com/api/pub/" +
							this.pub.index +
							"/like/" +
							this.$store.state.userId +
							"/symbol/" +
							this.symbolClic,
						data: { symbol: this.symbolClic },
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					}).then((resp) => {
						// if previous selection
						this.mult = 0; // Cancel the value from request origin
						if (resp.data === "thumb") {
							this.pub.thumb -= 1;
							this.pub.heart += 1;
							this.jaime = "heart";
						} else if (resp.data === "grin") {
							this.pub.grin -= 1;
							this.pub.heart += 1;
							this.jaime = "heart";
						} else if (resp.data === "sad") {
							this.pub.sad -= 1;
							this.pub.heart += 1;
							this.jaime = "heart";
							// if the same symbol already selected
						} else if (resp.data === "like deleted") {
							this.pub.heart -= 1;
							this.jaime = "";
						} else {
							// if no previous selection
							this.pub.heart += 1;
							this.jaime = "heart";
						}
					});

					this.$refs.op.hide();
				}
			}
		},

		//* Add a GRIN
		grin(event, pub) {
			if (!this.token) {
				this.noConnect = true;
			} else {
				this.$store.dispatch("checkConnect");
				if (!this.logged && this.token) {
					this.$router.push("/");
				} else {
					this.symbolClic = "grin";
					axios({
						method: "post",
						url:
							"https://apiresomouto.delmout.com/api/pub/" +
							this.pub.index +
							"/like/" +
							this.$store.state.userId +
							"/symbol/" +
							this.symbolClic,
						data: { symbol: this.symbolClic },
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					}).then((resp) => {
						this.mult = 0; // Cancel the value from request origin
						// if previous selection
						if (resp.data === "thumb") {
							this.pub.thumb -= 1;
							this.pub.grin += 1;
							this.jaime = "grin";
						} else if (resp.data === "heart") {
							this.pub.heart -= 1;
							this.pub.grin += 1;
							this.jaime = "grin";
						} else if (resp.data === "sad") {
							this.pub.sad -= 1;
							this.pub.grin += 1;
							this.jaime = "grin";
							// if the same symbol already selected
						} else if (resp.data === "like deleted") {
							this.pub.grin -= 1;
							this.jaime = "";
						} else {
							// if no previous selection
							this.pub.grin += 1;
							this.jaime = "grin";
						}
					});

					this.$refs.op.hide();
				}
			}
		},

		//* Add a SAD
		sad(event, pub) {
			if (!this.token) {
				this.noConnect = true;
			} else {
				this.$store.dispatch("checkConnect");
				if (!this.logged && this.token) {
					this.$router.push("/");
				} else {
					this.symbolClic = "sad";
					axios({
						method: "post",
						url:
							"https://apiresomouto.delmout.com/api/pub/" +
							this.pub.index +
							"/like/" +
							this.$store.state.userId +
							"/symbol/" +
							this.symbolClic,
						data: { symbol: this.symbolClic },
						headers: {
							Authorization: `Bearer ${this.token}`,
						},
					}).then((resp) => {
						this.mult = 0; // Cancel the value from request origin
						// if previous selection
						if (resp.data === "thumb") {
							this.pub.thumb -= 1;
							this.pub.sad += 1;
							this.jaime = "sad";
						} else if (resp.data === "heart") {
							this.pub.heart -= 1;
							this.pub.sad += 1;
							this.jaime = "sad";
						} else if (resp.data === "grin") {
							this.pub.grin -= 1;
							this.pub.sad += 1;
							this.jaime = "sad";

							// if the same symbol already selected
						} else if (resp.data === "like deleted") {
							this.pub.sad -= 1;
							this.jaime = "";
						} else {
							// if no previous selection
							this.pub.sad += 1;
							this.jaime = "sad";
						}
					});

					this.$refs.op.hide();
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
#over {
	background-color: beige;
}

.symbol {
	font-size: 1.5em;
}
.heart {
	color: rgb(224, 9, 9);
}
.thumb {
	color: rgb(36, 100, 240);
}
.grin {
	color: rgb(12, 158, 12);
}
.sad {
	color: rgb(156, 39, 176);
}
</style>
