<template>
  <div class="searchDiv">

    <h1 class="title">Looking for a spell?</h1>
    <div class="search-container">
    <br>
      <div align="center">
        <b-list-group>
          <div id="search">
            <b-list-group-item>
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="search"></b-icon>
                </b-input-group-prepend>
                <b-form-input type="search" placeholder="Find a spell..." v-model="query" id="queryInput"></b-form-input>
                <b-button class="buttons-search" @click="lastSearch">Last Search</b-button>
              </b-input-group>
            </b-list-group-item>
          </div>

          <b-list-group-item>
            <search-filter name="Cuisines" id="cuisines" type="checkbox" :options="filters.cuisine" :lastRes="cuisine"  @update="(res) => {cuisine = res; console.log(res)}"></search-filter>
          </b-list-group-item>

          <b-list-group-item>
            <search-filter name="Diet" id="diet" type="checkbox" :options="filters.diet" :lastRes="diet" @update="(res) => {diet = res}"></search-filter>
          </b-list-group-item>


          <b-list-group-item>
            <search-filter name="Intolerances" id="intolerances" type="checkbox" :options="filters.intolerance"  :lastRes="intolerance" @update="(res) => {intolerance = res}"></search-filter>
          </b-list-group-item>

          <b-list-group-item>
            <search-filter name="Sortinghat" id="sort" type="radio" :options="sortOptions" :lastRes="sort" @update="(res) => sort = res"></search-filter>
          </b-list-group-item>

          <b-list-group-item>
            <search-filter name="Result" id="result" type="radio" :options="resOptions" :lastRes="numOfRes" @update="(res) => numOfRes = res"></search-filter>
          </b-list-group-item>

          <b-list-group-item>
            <b-button class="buttons-search" @click="search" :disabled="!query">Search</b-button>
          </b-list-group-item>
        </b-list-group>

      </div>
      <div align="center" class="recipeList">
        <br>
        <recipe-preview-list :recipes="results" :user="user"></recipe-preview-list>
        <div v-if="noRes">
            No Results Found.
        </div>
    </div>
  </div>


  </div>
</template>

<script>

import SearchFilter from '../components/SearchFilter.vue';
import RecipePreviewList from '../components/RecipePreviewList.vue';
export default {
  name: "Search",
  components: {
    RecipePreviewList,
    SearchFilter,
    },
  data() {
    return {
      query: "",
      numOfRes: "",
      cuisine: [],
      diet: [],
      intolerance: [],
      sort: "",
      filters: [],
      results: [],
      noRes: false,
      user: "",
      lastSearchQuery : "",
      sortOptions: [
          { text: 'Time', value: 'time' },
          { text: 'Popularity', value: 'popularity' },
      ],
      resOptions: [
          { text: '5', value: '5' },
          { text: '10', value: '10' },
          { text: '15', value: '15' }
      ],
      checkVar: [],

      
      
      }
    },
    mounted()
    {
      this.setFilters()
      this.user = this.$root.store.shared_data.username;
      if(this.$root.store.shared_data.lastsearch != "")
      {
        this.lastSearchQuery = JSON.parse(this.$root.store.shared_data.lastsearch);
      }
      
    },

    methods: {
      lastSearch()
      {
        this.query = this.lastSearchQuery.query
        if (this.lastSearchQuery.cuisine != "")
        {
          this.cuisine = this.lastSearchQuery.cuisine.split(',')
        }
        if (this.lastSearchQuery.diet != "")
        {
          this.diet = this.lastSearchQuery.diet.split(',')
        }
        if (this.lastSearchQuery.intolerances != "")
        {
          this.intolerance = this.lastSearchQuery.intolerances.split(',')
        }
        if (this.lastSearchQuery.sort != "")
        {
          this.sort = this.lastSearchQuery.sort
        }
        if (this.lastSearchQuery.number != "")
        {
          this.numOfRes = this.lastSearchQuery.number
        }
  
        
        
      },
      setFilters: async function()
      {
        try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/getFilters",        
        );
        
        this.filters = response.data;
        
        
      } catch (error) {

        console.log(error);
      }
      },
      search: async function()
      {

        this.noRes = false;
        
        let queryParams = 
        {
          query: this.query,
          cuisine: this.cuisine.toString(),
          diet: this.diet.toString(),
          intolerances: this.intolerance.toString(),
          number: this.numOfRes,
          sort: this.sort.toLowerCase()
        }


        try {
        const response =  await this.axios.get(this.$root.store.server_domain + "/search",{
          params:
          queryParams
        });
        
        

        this.$root.store.shared_data.search(JSON.stringify(queryParams));

        this.lastSearchQuery = JSON.parse(this.$root.store.shared_data.lastsearch);
        this.query = ""
        this.numOfRes = ""
        this.diet = []
        this.cuisine = []
        this.intolerance = []
        this.results = response.data;
        for (let i = 0; i < this.results.length; i++)
        {
          this.results[i].image = `https://spoonacular.com/recipeImages/${this.results[i].id}-556x370.jpg`
        }
        
        

     if (this.results.length == 0)
          {
            this.noRes = true
          }
          
        } catch (error) {
          console.log(error);
        }
      }
      
    },

} 

</script>

<style>

#search
{
  width: 30%;
  align-content: center;
  margin-bottom: 0.3%;
}
.accordion 
{
  width: 30%;
}

#queryInput
{
  text-align: center;
}

.buttons-search
{
  background-color: #37713f;
}

.buttons-search:hover
{
  background-color: #304e7a;
  border-color: #304e7a;
}

.buttons-search:disabled {
    background-color: #66ac6f;
    border-color: #37713f;
}

.b-form-input
{
  background-color: #37713f;
}



</style>