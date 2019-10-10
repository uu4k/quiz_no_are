<template>
  <div class="respondent_manager">
    {{name}}:{{point}}
    <b-button variant="outline-primary" @click="updatePointValue(point - 100)">-100</b-button>
    <b-button variant="outline-primary" @click="updatePointValue(point - 10)">-10</b-button>
    <b-button variant="outline-primary" @click="updatePointValue(point - 1)">-1</b-button>
    <b-button variant="outline-primary" @click="updatePointValue(point + 1)">+1</b-button>
    <b-button variant="outline-primary" @click="updatePointValue(point + 10)">+10</b-button>
    <b-button variant="outline-primary" @click="updatePointValue(point + 100)">+100</b-button>
    <b-button variant @click="updatePointValue(0)">reset</b-button>
    <b-button variant="danger" @click="removeResopndent">delete</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RoomsRepository from "@/repositories/rooms-repository";
const roomsRepository = new RoomsRepository();

@Component
export default class RespondentManager extends Vue {
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) point!: number;

  private updatePointValue(point: number) {
    roomsRepository.updateRespondentPoint(
      this.$route.params.roomId,
      this.id,
      point
    );
  }
  private removeResopndent() {}
}
</script>

<style lang="sass" scoped>
div.respondent_manager

  button
    margin: 3px
</style>
