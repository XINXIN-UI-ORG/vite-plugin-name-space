<script lang="ts">
import { ref, defineComponent } from 'vue';


export default defineComponent({
  setup() {
    const msg = ref('ddsds');

    return {
      msg
    };
  },
});
</script>

<template>
  <div name-space="upload">
    {{ msg }}
  </div>
</template>

