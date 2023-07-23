<template>
  <div class="container">
    <not-found text="Missed your way?"></not-found>
    <br><br><span class="span"><label class="nav-links-not"  ><router-link  to="/" exact>
            Back to hogwarts
          </router-link></label></span>
  </div>
</template>
<script>
import NotFound from '../components/NotFound.vue';

export default {
  components: {
    NotFound,
  },
}
</script>

<style>

#msg
{
  font-family: "Harry Potter";
  font-size: 2.7vw;
  color: #37713f;
}

.span{
  margin-left: 39%;
}


.nav-links-not a
{
  
  color: #37713f;
  text-decoration: none;
  font-size: 1.5vw;
}

.nav-links-not a:active
{
  color: #304e7a;
}


.nav-links-not a.router-link-exact-active {
  color: #304e7a;

}


.nav-links-not a:hover
{
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;
  animation: glow 1s ease-in-out infinite alternate;

}
</style>