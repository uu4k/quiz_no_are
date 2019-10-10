<template>
  <div class="manage">
    <div class="manage__container">
      <RespondentManager v-for="r in respondents.asList()" :key="r.id" :id="r.id" :name="r.name" :point="r.point">
      </RespondentManager>
      <b-form-input v-model="name" placeholder="回答者名を入力してください"></b-form-input>
      <b-button variant="success" @click="createRespondent">回答者追加</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RespondentManager from "@/components/RespondentManager.vue";

Component.registerHooks(["beforeRouteEnter"]);

import RoomsRepository, {
  RespondentEntity,
  RespondentEntityCollection
} from "@/repositories/rooms-repository";
const roomsRepository = new RoomsRepository();

@Component({
  components: {
    RespondentManager
  }
})
export default class Manage extends Vue {
  public respondents: RespondentEntityCollection = new RespondentEntityCollection();
  public name: string = "";

  private createRespondent() {}

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
        this.respondents = this.respondents.remove(respondent);
      }
    );
  }
}
</script>

<style lang="sass" scoped>
div.manage

  &__container
    display: flex
    flex-direction: column
    flex-wrap: wrap
    justify-content: space-between
    align-items: center
    align-content: space-around
</style>
