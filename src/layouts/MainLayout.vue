<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title></q-toolbar-title>

        <q-chip clickable @click="$router.replace('user')">
          <q-avatar size="sm" color="primary" text-color="white"
            ><img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
          /></q-avatar>
          {{ store.user.phoneNumber || "Login" }}
        </q-chip>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUserStore } from "src/stores/user";

const linksList = [
  {
    title: "Home",
    icon: "home",
    link: "/",
  },
  // {
  //   title: "Login",
  //   icon: "key",
  //   link: "/login",
  // },
  {
    title: "Notification",
    icon: "alarm",
    link: "/notification",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(true);
    const store = useUserStore();

    return {
      essentialLinks: linksList,
      store: store,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      gotoLoginPage() {
        console.log("login");
        this.router.replace("/login");
      },
    };
  },
});
</script>
