<template>
  <div class="container">
    <table>
      <tr>
        <td class="td1">
          <label class="title" id="explore"> Explore the spells... </label>
          <recipe-preview-list :recipes="randomRecipes" :user="username" ></recipe-preview-list>  
          <b-icon-arrow-repeat font-scale="5" @click="random()" id="rand-icon"></b-icon-arrow-repeat>
        </td>
        <td class="td2">
          <div v-if="username" class="div2">
          <label class="title" id="explore"> Last watched... </label>
          <recipe-preview-list :user="username" :recipes="lastWatched" ></recipe-preview-list>
        </div>
        <div v-else class="div2">
          <router-link to="/login" ><label id="msg" class="floating" style="position: sticky" >
            Hey Muggle! <br>
          Forgot to login?
          </label></router-link>
        </div>
        </td>
      </tr>
    </table>

</div>
</template>

<script>
import RecipePreviewList from '../components/RecipePreviewList.vue';
export default {
  components: {
    RecipePreviewList,
  },
  name: "Login",
  data(){
  return {
    username: "",
    randomRecipes: "",
    lastWatched: "",
    };
  },
mounted()
{
  if (this.$root.store.shared_data.username != "")
  {
    this.username = this.$root.store.shared_data.username
    this.getLastWatched();
  }
  this.random()
  this.isFavorite()

},
methods:
{
    async random() {
    try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/randomRecipes");
        
        let arrayRecipes = response.data.randRecipes;
        this.randomRecipes = arrayRecipes;
    } catch (error) {

        console.log(error);
    }
    },
    async getLastWatched() {
    try {
        const response = await this.axios.get(
        this.$root.store.server_domain + "/users/lastViews");
        this.lastWatched = response.data.reverse().splice(-3).reverse();
    } catch (error) {

        console.log(error);
    }
    }, 

}
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); 
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}


@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 20px #fff, 0 0 30px #856330e7, 0 0 40px #965b38ab, 0 0 50prgb(161, 100, 49)a6, 0 0 60px #885423, 0 0 70px #a57315, 0 0 80px #bd771c;
  }
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff4800, 0 0 40px #52190b, 0 0 50px #99793d, 0 0 60px #4d372a, 0 0 70px #573100;

  }
}

.msg-style a
{
  text-decoration: none;

}

#msg
{
  font-family: "Harry Potter";
  font-size: 2.5vw;
  margin-top: 80%;
  margin-left: 30%;
  text-align: center;
  text-decoration: none;
    color: #37713f;
    cursor: grab;


}

#msg:hover
{
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;

}

#rand-icon
{
  margin-left: 28%;
  cursor: grab;
}

#explore
{
  margin-left: 10%;
  text-align: center;

}
table
{
  width: 100%;
  margin: 0px;
}
.td1
{
  float: left;
  width: 50%;
}
.td2
{
  float: right;
  width: 50%;
}
.div2
{
  margin-left: 30%;

}

</style>
