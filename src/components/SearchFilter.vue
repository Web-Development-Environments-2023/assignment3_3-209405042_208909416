<template >
    <div class="accordion" >

        <b-card no-body class="mb-2" >
              <b-card-header header-tag="header" class="p-1" role="tab" header="header-class"  >
                <b-button block v-b-toggle="id"  class="header">  {{ name }}</b-button>
              </b-card-header>
              <b-collapse :id="id" accordion="my-accordion" role="tabpanel" class="collapse">
                <b-card-body v-if="type=='radio'" >
                  <b-form-radio-group @input="$emit('update',transferString)"
                    v-model="transferString"
                    :options="options"
                  ></b-form-radio-group>
                </b-card-body>
                <b-card-body v-else-if="type=='checkbox'">
                    <b-form-checkbox-group @input="$emit('update',transferArr)"
                          v-model="transferArr"
                          :options="options"
                        ></b-form-checkbox-group>

                </b-card-body>
              </b-collapse>
            </b-card>

    </div>
</template>
  
  <script>

  export default {
    name: "SearchFilter",
    props:
    {
        name:
        {
            type: String,
            required: true
        },
        id:
        {
            type: String,
            required: true
        },
        type:
        {
            type: String,
            required: true
        },
        options:
        {
            type: Array,
            required: true
        },
        lastRes:
        {
          type: [String, Array],
          required: true
        }
    },
    data() {
    return {
      transferString: "",
      transferArr: []
      
      }
    },
    watch:
    {
      lastRes(newVal)
      {
        this.transferArr = newVal;
      }
    },
  }
  </script>

<style>
.accordion
{
    width: 30%;

}

.header:hover 
{
    background-color: #304e7a;

}

.header:focus
{
    background-color: #304e7a;

}

.collapse
{
  background-color: rgba(167, 211, 236, 0.185) ; 

}

.header
{
  background-color: #8cb9d4bd
}

.card 
{
  background-color: transparent;
  border-color: transparent;
  box-shadow: 0;
}


</style>
  