<template>
  <div class="home">
    <div class="home__container">
      <Respondent name="yamada太郎" point="100" avator="animal_neko" />
      <Respondent name="山田hanako" point="300" avator="animal_buta" />
      <Respondent name="スズキ太郎" point="1000" avator="animal_kuma" />
      <Respondent name="大空saburo" point="600" avator="animal_panda" />
      <Respondent name="大空ichiro" point="800" avator="animal_inu" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
