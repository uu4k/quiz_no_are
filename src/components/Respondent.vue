<template>
  <div class="respondent">
    <div class="respondent__inner">
      <div class="respondent__inner__avator">
        <img src="@/assets/avators/animal_neko.png" alt="avator" />
      </div>
      <div class="respondent__inner__table">
        <div class="respondent__inner__table__name">yamada太郎</div>
        <div class="respondent__inner__table__panel">200000</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class Respondent extends Vue {}
</script>

<style lang="sass" scoped>
@import url(http://fonts.googleapis.com/css?family=Noto+Sans+JP)

.respondent
  font-family: 'Noto Sans JP'
  flex-basis: 25%
  background: #EEE

  &__inner
    &__avator
      text-align: center

      img
        width: 60%
        height: auto

    &__table
      background-color: gold
      padding: 5%
      text-align: center
  
      &__name
        background-color: white
        overflow: hidden
        text-overflow: ellipsis
        font-size: 2.52vw
        white-space: nowrap
        margin-bottom: 5%

      &__panel
        background-color: white
        overflow: hidden
        text-overflow: ellipsis
        font-size: 4vw
        white-space: nowrap

</style>
