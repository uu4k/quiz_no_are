<template>
  <div class="respondent">
    <div class="respondent__avator">
      <img src="@/assets/avators/animal_neko.png" alt="avator">
    </div>
    <div class="respondent__table">
      <div class="respondent__table__name">yamada太郎</div>
      <div class="respondent__table__panel">200000</div>
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

$panel_width: 400px
$panel_height: 300px
$padding: 20px
$name_height: 60px

.respondent
  font-family: 'Noto Sans JP'

  &__avator
    img
      width: $panel_width + ($padding * 2)
      height: $panel_width + ($padding * 2)

  &__table
    background-color: gold
    padding: $padding
    width: $panel_width
    text-align: center

    &__name
      background-color: white
      height: $name_height
      line-height: $name_height
      overflow: hidden
      text-overflow: ellipsis
      font-size: $name_height * 0.8
      white-space: nowrap
      width: $panel_width
      margin-bottom: $padding

    &__panel
      background-color: white
      height: $panel_height
      line-height: $panel_height
      overflow: hidden
      text-overflow: ellipsis
      font-size: $panel_height * 0.4
      white-space: nowrap
      width: $panel_width
</style>
