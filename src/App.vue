<template>
  <div id="app">
    
    <div>
      <b-navbar toggleable="lg" type="dark" class="navbar navbar-custom" >
      <router-link :to="{ name: 'main' }" class="navbar-brand mb-0" id="navTitle">
      Hungry Potter
    </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-navbar-nav>
        <b-nav-item class="nav-links" active-class="active"><router-link :to="{ name: 'main' }">Food Spells</router-link></b-nav-item>
        <b-nav-item class="nav-links" active-class="active"><router-link :to="{ name: 'search' }">Search</router-link></b-nav-item>
        <b-nav-item class="nav-links" active-class="active"><router-link :to="{ name: 'about' }">About</router-link></b-nav-item>

        <b-nav-item class="nav-links" active-class="active" v-show="$root.store.shared_data.username">
          <a class="nav-links" @click="show">Add New Recipe</a>
        </b-nav-item>
        <b-nav-item-dropdown right v-show="$root.store.shared_data.username" toggle-class="nav-link-custom">
          
          <template #button-content >
          <label id="label-hey">Personal Zone</label>
          </template>
          <b-dropdown-item class="drop-down-link"><router-link :to="{ name: 'myRecipes' }">My Food Spells</router-link></b-dropdown-item>
          <b-dropdown-item class="drop-down-link"><router-link :to="{ name: 'family' }">Family Food Spells</router-link></b-dropdown-item>
          <b-dropdown-item class="drop-down-link"><router-link :to="{ name: 'favorite' }">Favorite Spells</router-link></b-dropdown-item>
        </b-nav-item-dropdown>


      </b-navbar-nav>


      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" >

        <span class="login-class">
          <b-nav-form right v-show="!$root.store.shared_data.username">
          <login-nav-bar>
          </login-nav-bar>
          <b-navbar-nav>
            <b-nav-item class="nav-links" id="reg"> <router-link :to="{ name: 'register' }">Register</router-link></b-nav-item>
          </b-navbar-nav>
          </b-nav-form>
  

          <b-nav-item-dropdown right v-show="$root.store.shared_data.username">
          <!-- Using 'button-content' slot -->
          <template #button-content >
          <label id="label-hey">Hey {{ $root.store.shared_data.firstname}}</label>
          </template>
          <b-dropdown-item class="drop-down-link" @click="Logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </span>


      </b-navbar-nav>
  
</b-navbar>

</div>
<router-view />

<new-recipe-modal :open="showAddRecipe" @close="showAddRecipe=!showAddRecipe"></new-recipe-modal>

  </div>
</template>

<script>
import LoginNavBar from './components/LoginNavBar.vue';
import NewRecipeModal from './components/NewRecipeModal.vue';
export default {
  name: "App",
  components:
  {
    LoginNavBar,
    NewRecipeModal
  },
  data() {
    return {
      showAddRecipe: false,

    }
  },

  methods: {

    show: function()
    {
      this.showAddRecipe = !this.showAddRecipe 
    },


    Logout() {
      this.$root.store.shared_data.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      location.reload();

    },

  }
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  font-size: larger;
}
.navbar-custom {
    background-color: rgb(102, 177, 112, 0.7);
    fill-opacity: 0.7;
    font-weight: bold;

}



#nav {
  padding: 30px;
}


.nav-links a
{
  color: #37713f;
  text-decoration: none;
}

.nav-links a:active
{
  color: #304e7a;
}


.nav-links a::after
{
	content: '';
	width: 0%;
	height: 2px;
	display: block;
	margin: auto;
	background: #965b38ab;
	transition: 0.5s;
}

.nav-links a:hover::after
{
	width: 100%;
}


#nav a {
  font-weight: bold;
  color: #37713f;
}

.nav-links a.router-link-exact-active {
  color: #304e7a;

}

#navTitle
{
  font-size: 1.1vw;
  margin-left: 1.5%;
}

#label-hey
{
  color: #37713f;
}

.dropdown-menu.dropdown-menu { 
    background-color: rgba(167, 211, 236, 0.829) ; 
}

.drop-down-link a
{
  color: #37713f;
  text-decoration: none;

}

.drop-down-link a:hover
{
  color: #965b38ab;
  background-color: rgb(167, 211, 236, 0.4) ; 

}


</style>
