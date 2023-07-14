<template>
  <q-page class="flex flex-center">
    <div>home</div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const title = ref("title");
    const body = ref("body");
    const result = ref("na");
    return {
      title: title,
      body: body,
      result: result,
    };
  },
});
</script>
