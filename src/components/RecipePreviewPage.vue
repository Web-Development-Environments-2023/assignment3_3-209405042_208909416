<template>

  <div class="container" >
    


      <img :src="recipe.image" class="image" width="500px" height="300px">


    <div class="middle">
        <b-icon-eye font-scale="1.6" opacity="0.7" v-show="recipe.watched && user"  class="watch-icon"></b-icon-eye>
        <b-icon-eye-slash font-scale="1.6" opacity="0.7" v-show="!recipe.watched && user" class="watch-icon"></b-icon-eye-slash>
        <b-icon-heart font-scale="1.6" opacity="0.7" v-show="!recipe.favorite && user && faveSign" @click="addToFavorite()" class="fave-icon" ></b-icon-heart>
        <b-icon-heart-fill font-scale="1.6" opacity="0.7" variant="danger" v-show="recipe.favorite && user && faveSign" class="fave-icon"></b-icon-heart-fill>
  <br>
  <label class="recipe-title"><b>{{  recipe.title }} </b></label>
  <br>
       <table align="center">
    <tr>
        <th>
          <td v-show="recipe.vegan">
            <b-badge pill id=vegaanB >Vegan</b-badge>
          </td>
          <td v-show="recipe.vegetarian">
            <b-badge pill id=vegiB >Vegiterian</b-badge>
          </td>
          <td v-show="recipe.glutenFree">
            <b-badge pill id=glutenFree >Gluten Free</b-badge>
          </td>
          <td v-show="!recipe.glutenFree">
            <b-badge pill id=containGluten >Contain Gluten</b-badge>
          </td>
        </th> 
    </tr>
    </table>
    <table align="center">
      <br>
      <tr >
      <td><b-icon-alarm font-scale="1.5" ></b-icon-alarm>  </td>
      <td> {{ recipe.readyInMinutes }} Minutes </td>
    </tr>
    <tr>
      <td><b-icon-hand-thumbs-up font-scale="1.5" ></b-icon-hand-thumbs-up>  </td>
      <td> {{ recipe.popularity }} Likes </td>
    </tr>

    </table>
      <br>
      <div>
    <router-link v-if="/^\d+$/.test(recipe.id)" :to="'/recipe/' + recipe.id">
      <b-button id="goTo" variant="outline-secondary" >Go to spell ></b-button>
    </router-link>
    <router-link v-else-if="/^FA\d+$/.test(recipe.id)" :to="'/family/' + recipe.id" exact class="go-to-but">
      <b-button id="goTo1" variant="outline-secondary" >Go to spell ></b-button>
    </router-link>
    <router-link v-else :to="'/myRecipes/' + recipe.id" exact class="go-to-but">
      <b-button id="goTo2" variant="outline-secondary" >Go to spell ></b-button>
    </router-link>
  </div>
      

      </div>
  </div>

</template>

<script>
export default {
    name: "RecipePreview",
    mounted() {
    this.axios.get(this.recipe.image).then((i) => {
      this.image_load = true;
    });
    this.setLogos();
    },
    data() {
        return {
        image_load: false,
        nutritionBagesArray: [],
        isHovered: false,
        faveSign: /^[0-9]+$/.test(this.recipe.id),
        };
    },
    props: {
        recipe: {
        type: Object,
        required: true
        },
        isHover:
        {
          type: Boolean,
          required: true
        },
        user:
        {
          type: String,
          required: true
        },

    },
    methods:
    {
        async addToFavorite()
        {

              try {
              const response = await this.axios.post(
              this.$root.store.server_domain + "/users/favorites/",
              {
                recipeid: this.recipe.id
              });

              let arrayRecipes = response.data.randRecipes;
              this.randomRecipes = arrayRecipes;
              this.recipe.favorite = true;
              } catch (error) {
              console.log(error);
              }
          }


    },
};

</script>

<style>

.container {
  position: relative;
  
}



.image {
  opacity: 1;
  display: block;
  width: 100%;
  transition: .5s ease;
  backface-visibility: hidden;
  margin: auto;
  border: 3px solid #27374e;
  border-radius: 3%;

}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  width: 94%;
  height: 93%;
  align-items: start;
  place-items: last baseline normal;
  background-color: rgba(202, 193, 181, 0.603) ;
  border-radius: 15px;
}

.container:hover > .image {
  opacity: 1;
}

.container:hover > .middle {
  opacity: 1;
}

.text {
  background-color: #04AA6D;
  color: rgba(255, 255, 255, 0.808);
  font-size: 16px;
  padding: 16px 32px;
}

.recipe-title
{
  font-family: 'Harry Potter';
}

#goTo, #goTo1, #goTo2
{
  background-color: #965b38ab;
  border-color: #965b38ab;
  color: white;

}

#goTo:hover, #goTo1:hover, #goTo2:hover
{
  background-color: #66ac6f;
  border-color: #66ac6f;

}


.watch-icon
{
  float: right;
  margin-left: 10%;
}
.fave-icon
{
  float: left;
}


</style>