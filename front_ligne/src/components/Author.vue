<template>
	<div id="author" class="p-grid  vertical-container nested-grid">
		<div class="p-col p-mx-auto p-py-0">
			<div class="p-col p-mb-1 p-py-0 p-grid p-ai-center">
				<img
					class=" p-avatar p-avatar-image p-avatar-circle p-avatar-xl "
					:src="photo"
					alt="author picture"
					title="user-img"
				/>

				<i class="p-py-auto p-pl-2"
					>{{ prenom }} {{ nom }} <span v-if="publie">a publié</span
					><span v-else>a commenté</span> {{ dateFr(item.date) }}
				</i>
			</div>
		</div>
	</div>
</template>
<script>
import moment from "moment";
import axios from "axios";
export default {
	name: "Author",
	data() {
		return {
			prenom: "",
			nom: "",
			service: "",
			description: "",
			photo: "",
			publie: true,
			hover: false,
		};
	},
	props: ["item"],
	methods: {
		dateFr: function(date) {
			moment.locale("fr");
			const dateFct = moment(date).calendar({
				sameDay: "[aujourd'hui]",
				lastDay: "[hier]",
			});
			if (dateFct === "hier" || dateFct === "aujourd'hui") {
				return dateFct;
			} else {
				return `le ${moment(date).format("DD MMMM YYYY")}`;
			}
		},
	},
	created: function(item) {
		axios({
			method: "get",
			url: "https://apiresomouto.delmout.com/api/auth/ident/" + this.item.userId,
		}).then((respon) => {
			this.prenom = respon.data.prenom;
			if (respon.data.photo != null) {
				this.photo = respon.data.photo;
			} else {
				this.photo = "https://apiresomouto.delmout.com/images/photo_defaut.jpg";
			}
			if (this.item.index >= 0) {
				this.publie = true; // Corresponding to publication
			} else {
				this.publie = false; // Corresponding to comment
			}
		});
	},
};
</script>
<style>
#author {
	color: #474444;
}
</style>
