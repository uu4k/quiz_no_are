<template>
  <div class="room">
    <h2>room: {{ $route.params.roomId }}</h2>
    <!-- presentation url表示 -->
    <div>{{ presentation_url }}</div>
    <!-- manage url表示 -->
    <div>{{ manage_url }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import RoomsRepository from "@/repositories/rooms-repository";
const roomsRepository = new RoomsRepository();

Component.registerHooks(["beforeRouteEnter"]);

@Component({
  computed: {
    presentation_url: {
      get(): String {
        return document.URL + "/presentation"
      }
    },
    manage_url: {
      get(): String {
        return document.URL + "/manage"
      }
    },
  }
})
export default class Room extends Vue {
  public async beforeRouteEnter(to: any, from: any, next: any) {
    if (to.params.roomId) {
      next((component: any) => {});
    } else {
      const roomId = await roomsRepository.createRoom();
      next("/rooms/" + roomId);
    }
  }
}
</script>

<style lang="sass" scoped></style>
