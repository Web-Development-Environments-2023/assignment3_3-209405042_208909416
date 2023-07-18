import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/random",
    name: "RandomRecipes",
    component: () => import("./components/RecipePreviewList.vue"),
  },

  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage.vue"),
  },
  {
    path: "/favorites",
    name: "favorite",
    component: () => import("./pages/FavoritePage.vue"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyPage.vue"),
  },
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/MyPage.vue"),
  },

  {
    path: "/newSpell",
    name: "newSpell",
    component: () => import("./components/NewRecipeModal.vue"),
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
