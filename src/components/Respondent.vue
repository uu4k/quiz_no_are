<template>
  <div class="respondent">
    <div class="respondent__inner">
      <div class="respondent__inner__avatar">
        <img :src="avatar_image" alt="avatar" />
      </div>
      <div class="respondent__inner__table">
        <div class="respondent__inner__table__name">{{ name }}</div>
        <div class="respondent__inner__table__panel">{{ point }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  computed: {
    avatar_image: {
      get(): String {
        return require("@/assets/avatars/" + this.$props.avatar + ".png");
      }
    }
  }
})
export default class Respondent extends Vue {
  @Prop({ required: true }) name!: String;
  @Prop({ required: true }) avatar!: String;
  @Prop({ required: true }) point!: Number;
}
</script>

<style lang="sass" scoped>
@import url(http://fonts.googleapis.com/css?family=Noto+Sans+JP)

.respondent
  font-family: 'Noto Sans JP'
  flex-basis: 25%
  background: #EEE

  &__inner
    &__avatar
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
