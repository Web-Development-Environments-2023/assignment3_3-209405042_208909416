<template>
    <div>       
        <div class="content-container"> 
          <div class="center-background">
        <div class="title">{{ preview.title }}</div>
        <div class="ready"><b-icon icon="clock"></b-icon>
          {{ preview.readyInMinutes }} minutes </div>
        <div class="serving"> <b-icon icon="person-circle"></b-icon>
          Servings: {{ servings }}<br></div>
        <table align="center">
          <tr>
              <th>
                <td v-show="preview.vegan">
                  <b-badge class="size-badge" pill id=vegaanB >Vegan</b-badge>
                </td>
                <td v-show="preview.vegetarian">
                  <b-badge class="size-badge" pill id=vegiB >Vegiterian</b-badge>
                </td>
                <td v-show="preview.glutenFree">
                  <b-badge class="size-badge" pill id=glutenFree >Gluten Free</b-badge>
                </td>
                <td v-show="!preview.glutenFree">
                  <b-badge class="size-badge" pill id=containGluten >Contain Gluten</b-badge>
                </td>
              </th> 
          </tr>
      </table>  
          <img :src="preview.image" class="image-recipe" />
          <div class="ingredients">
            <span class="labels">Ingredients:</span>
            <div class="table-container">
              <table class="ingredient-table">
                <tbody>
                  <tr v-for="ing in ingredients" :key="ing.name">
                    <td><b-icon icon="basket2-fill"></b-icon> {{ ing.name }}, {{ ing.quantity }} {{ ing.unit }}.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="instructions">
              <span class="labels">Instructions:</span>
              <div class="step-container" v-for="(ins, index) in instructions" :key="ins.id">
                <div>
                  <span class="labels2">Step {{ index + 1 }}:</span>
                </div>
                <div class="step">{{ ins.step }}</div>
              </div>
            </div>
            <div class="opt">
               <br><br>{{ optional }}
            </div>
            </div>
          </div>
        </div>
      
</template>

<script>
export default {
  name: "FamilyRecipePage",

  data() {
    return {
      ingredients: [],
      instructions: [],
      servings: 0,
      optional: "",
      preview: null,
    };
  },
  async created() {
    try {
      let response;

      try {
        response = await this.axios.get(
          this.$root.store.server_domain + `/users/myRecipes/family/${this.$route.params.recipeId}`
        );
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
      this.ingredients = response.data.ingredients;
      this.servings = response.data.servings;
      this.preview = response.data.recipeDetails;
      let _instructions = response.data.instructions;
      this.optional = response.data.optional;
      for (let i = 0; i < _instructions.length; i++)
      {
        this.instructions.push(
          {
            id: i + 1,
            step: _instructions[i]
          }
        )
      }


    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>

.opt {
  display: block;
  text-align: left;
}

.size-badge {
  font-size: 16px;
  padding: 8px 19px; 
  margin-bottom: 5px;
  margin-top: 5px;
}


</style>
