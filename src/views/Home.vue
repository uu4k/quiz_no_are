<template>
  <div class="home">
    <Respondent></Respondent>
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
  height: 100vh
</style>
