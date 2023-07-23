<template>
    
    <div>

        <div >
        <b-modal ref="modal" id="modal-1" hide-footer centered title="Add New Spell" title-class="titleC">
            <div style="max-height: 550px; overflow-y: auto;">
            <form>
                <div >
                    <b-input-group class="mb-2">
                        <b-form-button class="labelBut" disabled >Title</b-form-button>
                        <b-form-input v-model="title" placeholder="Enter recipe title..."  class="input-field"></b-form-input>

                        
                    </b-input-group>
                </div>
                <div>
                    <b-input-group class="mb-2">
                        <b-form-button class="labelBut" disabled >Type</b-form-button>
                        <b-form-select v-model="type" :options="typeOptions" placeholder="Pick a type" class="input-field"></b-form-select>
                    </b-input-group>

                </div>
                <div id="readyIn">
                    <b-input-group class="mb-2">
                        <b-form-button class="labelBut" disabled >Ready In</b-form-button>
                        <b-form-input v-model="readyInMintes" placeholder="Enter prepare time..." type="number" class="input-field"></b-form-input>
                        <b-form-button class="labelBut" disabled id="minutes">Minutes</b-form-button>

                    </b-input-group>
                </div>
                <div id="imgUrl">
                    <b-input-group class="mb-2">
                        <b-form-button class="labelBut" disabled >Image URL</b-form-button>
                        <b-form-input v-model="image" type="text"  placeholder="Enter image url..." class="input-field"></b-form-input>
                    </b-input-group>
                </div>
                <div id="servings">
                    <b-input-group class="mb-2">
                        <b-form-button class="labelBut" disabled >Servings</b-form-button>
                        <b-form-input v-model="servings" type="number" min="1" placeholder="Enter number of servings..." class="input-field"></b-form-input>
                    </b-input-group>
                </div>
                <br>


                <div>
                    <table align="center">
                        <tr>
                            <td class="group"><b-form-checkbox v-model="vegan" switch>Vegan</b-form-checkbox></td>
                            <td class="group"><b-form-checkbox v-model="vegeterian" switch>Vegiterian</b-form-checkbox></td>
                            <td class="group"><b-form-checkbox v-model="glutenFree" switch>Gluten Free</b-form-checkbox></td>
                        </tr>
                    </table>
                    

                </div>


                <br>

                <div  role="tablist">
                    <b-card no-body class="mb-1">
                    <b-card-header header-tag="header-class" class="p-1" role="tab">
                        <b-button class="header" block v-b-toggle.accordion-1 >Ingredients</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel" class="collapse">
                        <div v-for="(item, i) in ingredients" :key="item">
                        <ingredient :ing='item' :index="i"
                        @add-new-ing="addNewIng($event)" @del-ing="delIng($event)"> </ingredient>
                        </div>
                    </b-collapse>
                    </b-card>

                    <b-card no-body class="mb-2">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block v-b-toggle.accordion-2 class="header">Instructions</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" class="collapse">
                        <div v-for="(inst,index) in instructions" :key="inst">
                        <b-input-group class="inst">
                        <b-form-button class="labelBut" id="inst-but" disabled >{{ index + 1 }}</b-form-button>   
                        <b-form-input type="text" required v-model="inst.instruction" class="input-field"></b-form-input>
                        <b-form-button class="labelBut" disabled  id="icon-but">
                            <b-icon-plus-circle  scale="1.2" @click="addInstrction()" v-show="!disable">
                            </b-icon-plus-circle
                        ></b-form-button>   
                        <b-form-button class="labelBut" disabled id="icon-but">
                            <b-icon-x-circle v-show="index==instructions.length-1" scale="1.2" @click="delInstruction(index)" ></b-icon-x-circle>
                        </b-form-button>   
                        </b-input-group>
                    </div>
                    </b-collapse>
                    </b-card>

                    <b-card no-body class="mb-1" v-show="type=='Family'">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                        <b-button block v-b-toggle.accordion-3 class="header">Optional Description</b-button>
                    </b-card-header>
                    <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel" class="collapse">
                            <b-form-textarea
                            id="textarea"
                            v-model="optionalDescription"
                            placeholder="Enter something..."
                            rows="3"
                            max-rows="6"
                            ></b-form-textarea>
                    </b-collapse>
                    </b-card>
            </div>

            </form>
        </div>
            
            <br>


            <b-button @click="addRecipe()" id="add">Add Recipe</b-button>
            <b-button @click="resetData()" id="reset">Reset</b-button>

            <br>

            <b-alert show variant="danger" v-show="dangerAlert">Erorrcrux! fill all fields... <b-icon-emoji-angry variant="danger"></b-icon-emoji-angry></b-alert>

        </b-modal>
        </div>

</div>


</template>

<script>
import Ingredient from "./Ingredient.vue"
export default {
    name: "NewRecipeModal",
    components:
    {
        Ingredient,
    },
    props: ['open'],
    watch:
    {
        open()
        {
            if (this.open)
            {
                this.$refs.modal.show();
                this.$emit('close')
            }
        }
    },
    mounted()
    {
        $('#modal-1').on('hide', function () {
            this.$emit('close')
        })
    },
    data() {
    return {
    type: "",
    typeOptions: ["Private","Family"],
    title: "",
    readyInMintes: 30,
    image: "",
    vegan: false,
    vegeterian: false,
    ingredients: [
        {
            name: "",
            unit: "",
            quantity: ""
        }
    
    ],
    instructions: [{
        instruction: ""
    }],
    glutenFree: false,
    servings: "1",
    optionalDescription: " ",
    dangerAlert: false,
    currentInstruction: ""
    };
  },
  methods:
  {
    resetData() {
        this.type = "";
        this.title = "";
        this.readyInMintes = 30;
        this.image = "";
        this.vegan = false;
        this.vegeterian = false;
        this.ingredients = [{ name: "", unit: "", quantity: "" }];
        this.instructions = [{ instruction: "" }];
        this.glutenFree = false;
        this.servings = "1";
        this.optionalDescription = " ";
        this.dangerAlert = false;
        this.currentInstruction = "";
    },
    addNewIng()
    {
        this.ingredients.push
        (
            {
                name: "",
                quantity: "",
                unit: ""
            }
        )
    },
    delIng(index)
    {        
        // find index
        if (this.ingredients.length > 1)
        {
            this.ingredients.splice(index , 1);
        }
        else{
            this.ingredients = [
            {
                name: "",
                unit: "",
                quantity: ""
            } ]
        }
    },

    addInstrction()
    {
        this.instructions.push({ instruction: "" });
    },
    delInstruction(index)
    {        
        // find index
        if (this.instructions.length > 1)
        {
            this.instructions.splice(index , 1);
        }
    },
    async addRecipe()
    {
        let recipeIng = ""
        let recipeIngList = []
        for(let i=0;i< this.ingredients.length;i++){
            if(this.ingredients[i].name != "" && this.ingredients[i].quantity != "" && this.ingredients[i].unit != ""){
                recipeIngList.push (this.ingredients[i].name + "-" + this.ingredients[i].quantity + "-" + this.ingredients[i].unit)
            } 
        
        }
        recipeIng = recipeIngList.join(',')
        
        let instructionList = []
        for(let i=0; i< this.instructions.length;i++){
            if(this.instructions[i].instruction != "")
                instructionList.push(this.instructions[i].instruction)
        }
        let recipeInstructions = instructionList.join('^')
        try {
            const response = await this.axios.post(
            this.$root.store.server_domain + "/users/addRecipe", 
            {
                title: this.title,
                readyInMinutes: this.readyInMintes,
                image: this.image,
                vegan: this.vegan == false ? 0 : 1,
                vegetarian: this.vegeterian == false ? 0 : 1,
                glutenFree: this.glutenFree == false ? 0 : 1,
                ingredients: recipeIng,
                instructions: recipeInstructions,
                servings: this.servings,
                type: this.type,
                optionalDescription: this.optionalDescription
            }
            );

        if (response.status === 200) {
            this.$refs.modal.hide();
            this.resetData();
            if( this.type = "Family"){
                this.$router.push("/Family");
                location.reload();
            }
            else{
                this.$router.push("/myRecipes");
                location.reload();
            }
        }
        } catch (err) {
            console.log("RES", err.response);
            this.dangerAlert = true;
        }

    },
  },

};
</script>
    
<style>


/* For WebKit-based browsers */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-thumb {
  background-color: #8cb9d4bd;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: lightblue;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}


#readyIn
{
    width: 100%;
}
.group
{
    width: 35%
}

.labelBut
{
    border: 2px solid #8cb9d4bd;
    background-color: transparent;
    width: 25%;
    border-radius: 5px;
    text-align: center;
    align-content: center;
    padding-top: 1%;
}
.input-group .input-field
{
    border: 2px solid #8cb9d4bd;
    border-radius: 7px;

    /* background-color: #66ac6f; */
}


#inst-but
{
    width: 15%
}
#icon-but
{
    width: 10%
}
.inst
{
	float: left;
}
#reset
{
	float: right;
}

#add, #reset {
    background-color: #90c497;
    border-color: #37713f;
}

.card .header:hover 
{
    background-color: #304e7a;

}

.card .header:focus
{
    background-color: #304e7a;

}

.collapse
{
  background-color: rgba(167, 211, 236, 0.185) ; 

}
.card 
{
  background-color: transparent;
  border-color: transparent;
  box-shadow: 0;
}
.card .header
{
  background-color: #8cb9d4bd
}

#add:hover, #reset:hover
{
  background-color: #304e7a;
  border-color: #304e7a;
}

.titleC
{
    font-family: 'Harry Potter';
    font-size: 1.5vw;
    margin-left: 27%;
}
</style>

