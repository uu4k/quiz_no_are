<template>
  <div class="presentation">
    <div class="presentation__container">
      <Respondent
        v-for="r in respondents.asList()"
        :key="r.id"
        :name="r.name"
        :point="r.point"
        :avator="r.avator"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

Component.registerHooks(["beforeRouteEnter"]);

import RoomsRepository, {
  RespondentEntity,
  RespondentEntityCollection
} from "@/repositories/rooms-repository";
const roomsRepository = new RoomsRepository();

import Respondent from "@/components/Respondent.vue";

@Component({
  components: {
    Respondent
  }
})
export default class Presentation extends Vue {
  public respondents: RespondentEntityCollection = new RespondentEntityCollection();

  public async beforeRouteEnter(to: any, from: any, next: any) {
    if (to.params.roomId && roomsRepository.existsRoom(to.params.roomId)) {
      next((component: any) => {});
    } else {
      next("/rooms");
    }
  }

  public created() {
    roomsRepository.onRespondentsChanged(
      this.$route.params.roomId,
      (respondent: RespondentEntity) => {
        this.respondents = this.respondents.add(respondent);
      },
      (respondent: RespondentEntity) => {
        this.respondents = this.respondents.modify(respondent);
      },
      (respondent: RespondentEntity) => {
        this.respondents = respondents.remove(respondent);
      }
    );
  }
}
</script>

<style lang="sass" scoped>
div.presentation

  &__container
    min-height: 100vh
    height: 100vh
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    align-items: center
    align-content: space-around
</style>
