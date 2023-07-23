<template>
<div>

    <div class="ing">
        <b-input-group class="mb-2">

          <b-form-input v-model="ing.name" id="name" type="text" placeholder="Name" :disabled="disable" class="input-field"></b-form-input>
          <b-form-input type="number" min="1"  placeholder="Quantity" id="quantity" v-model="ing.quantity"   :disabled="disable" class="input-field"></b-form-input>
          <b-form-select v-model="ing.unit" id="unit" type="text" :disabled="disable" :options="units" class="input-field"></b-form-select>
          <b-form-button class="labelBut" disabled  id="icon-but">
            <b-icon-plus-circle  scale="1.2" @click="submit()" v-show="!disable"></b-icon-plus-circle>
          </b-form-button>   
          <b-form-button class="labelBut" disabled id="icon-but">
            <b-icon-x-circle scale="1.2" @click="$emit('del-ing', index)"></b-icon-x-circle>
          </b-form-button>   
        </b-input-group>
    </div>
</div>
</template>

<script>
import { required, alpha, numeric, sameAs } from 'vuelidate/lib/validators'

export default {
    name: "Ingredient",
    props: ['index', 'ing'],
    data() {
    return {
    units: [],
    validationState: {
        name: false,
        quantity: false,
        unit: false,
      },
      disable: false,

    };
    },
  validations: {
    ing: {
    name:
    {
        required,
        alpha
    },
    quantity:
    {
        required,
        numeric
    },
    unit:
    {
        required,
    } 
  },
},

  mounted()
  {
    this.setUnit();
  },
  methods: {

    setUnit: async function()
      {
        try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/getUnits",        
        );
        
        this.units = response.data;
        
        
      } catch (error) {

        console.log(error);
      }
      

    },
    newIng()
    {
        this.$emit('new-ing',ingredient)
    },
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.disable = true;
        this.$emit('add-new-ing')
      }

    },
  }
}
</script>

<style>
#icon-but
{
    width: 10%
}
.ing
{
  margin-top: 2%;
}

</style>