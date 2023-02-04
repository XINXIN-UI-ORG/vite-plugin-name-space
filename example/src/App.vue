<script lang="ts">
import { ref, defineComponent } from 'vue';


export default defineComponent({
  setup() {
    const msg = ref('ddsds');
    const msg1 = ref('hhhh');

    return {
      msg,
      msg1,
      isRed: true,
    };
  },
});
</script>

<template>
  <div
    x-base="upload"
    :class="[msg, msg ? 'yellow' : 'blue']"
    :x-is="{
      drag: msg,
      test: msg1,
    }"
    :x-bm="[msg, msg1]"
  >
    <div
      x-space="default"
      :class="{
        red: isRed,
        blue: true,
      }"
    >
      <div
        :x-is="{
          drag: msg,
          test: msg1,
        }"
      >
        <span x-space="icon" class="hhhhhggg" :x-bm="msg">
          text
        </span>
      </div>
    </div>
  </div>
</template>

