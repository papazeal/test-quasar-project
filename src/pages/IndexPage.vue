<template>
  <q-page class="flex flex-center">
    <div>
      <q-input outlined label="title" v-model="title" class="q-mb-md" />
      <q-input outlined label="body" v-model="body" class="q-mb-md" />
      <q-btn @click="pushNotification" class="q-mb-md">Push Notification</q-btn>
      <div>result: {{ result }}</div>
    </div>
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
      pushNotification() {
        fetch("https://pushnotification-tbv24iyd2a-as.a.run.app/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.value,
            body: body.value,
          }),
        }).then((res) => {
          res.text().then((r) => (result.value = r));
        });
      },
    };
  },
});
</script>
