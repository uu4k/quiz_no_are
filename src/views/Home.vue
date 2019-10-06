<template>
  <div class="home">
    <div class="home__container">
      <Respondent></Respondent>
      <Respondent></Respondent>
      <Respondent></Respondent>
      <Respondent></Respondent>
      <Respondent></Respondent>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Respondent from "@/components/Respondent.vue";

@Component({
  components: {
    Respondent
  }
})
export default class Home extends Vue {}
</script>

<style lang="sass" scoped>
div.home

  &__container
    min-height: 100vh
    height: 100vh
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-items: center
    align-content: space-around
</style>
