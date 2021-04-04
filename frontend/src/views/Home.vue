<template>
	<div class="home">
		<h1>Réso' Mouto'</h1>
		<h2>Bienvenue sur votre Réseau Social Familial Mouto !</h2>
		<div v-if="infoHome" class="p-grid p-jc-center">
			<Message severity="warn">{{ infoHome }} </Message>
		</div>
		<h3>
			Réso' Mouto'<br />
			Il est jamais trop tôt<br />
			Pour écrire un mot !
		</h3>
		<img id="dedee" alt="dédee" src="../assets/dedee.png" />
		<img id="aurelie" alt="aurélie" src="../assets/aurelie.png" />
		<img id="delphine" alt="delphine" src="../assets/delphine.png" />
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Home",
	computed: {
		...mapState(["infoHome"]),
	},
};
</script>
<style>
#logo {
	width: 30rem;
}
/* MEDIA QUERIES */

@media only screen and (max-width: 768px) {
	/*tablettes et mobiles */
	h1 {
		font-size: 1.5rem;
	}
	#logo {
		width: 20rem;
	}
}
</style>
