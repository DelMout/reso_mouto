import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";

const routes = [
	// {
	// 	path: "/home",
	// 	name: "Home",
	// 	component: Home,
	// },
	{
		path: "/",
		name: "Signup",
		component: () => import(/* webpackChunkName: "signup" */ "../views/Signup.vue"),
	},
	{
		path: "/setpassword/:jeton",
		name: "Password",
		component: () => import(/* webpackChunkName: "password" */ "../views/Password.vue"),
	},
	{
		path: "/publi",
		name: "Publication",
		component: () => import(/* webpackChunkName: "publication" */ "../views/Publication.vue"),
		meta: { requiresAuth: true },
	},

	{
		path: "/publier",
		name: "Publier",
		component: () => import(/* webpackChunkName: "publier" */ "../views/Publier.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/admin/users",
		name: "AdminUsers",
		component: () => import(/* webpackChunkName: "users" */ "../views/AdminUsers.vue"),
		beforeEnter: (to, from, next) => {
			store.dispatch("checkConnect");
			if (!store.state.logged) {
				next({ name: "Signup" });
			} else {
				if (localStorage.getItem("Admin") === 0) {
					next({ name: "Signup" });
				} else {
					next();
				}
			}
		},
	},
	{
		path: "/admin/publications",
		name: "AdminPubs",
		component: () => import(/* webpackChunkName: "publications" */ "../views/AdminPubs.vue"),
		beforeEnter: (to, from, next) => {
			store.dispatch("checkConnect");
			if (!store.state.logged) {
				next({ name: "Signup" });
			} else {
				if (localStorage.getItem("Admin") === 0) {
					next({ name: "Signup" });
				} else {
					next();
				}
			}
		},
	},
	{
		path: "/admin/comments",
		name: "AdminComms",
		component: () => import(/* webpackChunkName: "comments" */ "../views/AdminComms.vue"),
		beforeEnter: (to, from, next) => {
			store.dispatch("checkConnect");
			if (!store.state.logged) {
				next({ name: "Signup" });
			} else {
				if (localStorage.getItem("Admin") === 0) {
					next({ name: "Signup" });
				} else {
					next();
				}
			}
		},
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	store.dispatch("checkConnect");
	if (to.meta.requiresAuth) {
		if (!store.state.logged) {
			next({ name: "Signup" });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
