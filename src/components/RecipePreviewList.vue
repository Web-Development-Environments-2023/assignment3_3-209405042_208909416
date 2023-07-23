<template>
  <div>
    <table>
      <tr v-for="r in recipes" :key="r.id">
        <recipe-preview :recipe="r" :user="user"></recipe-preview>
      </tr>
    </table>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreviewPage.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  methods:
  {

  },
  props: ['recipes','favorites', 'watched','user'],
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 320px;
}

</style>
