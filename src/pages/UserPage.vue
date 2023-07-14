<template>
  <q-page class="flex flex-center">
    <div>
      <div v-if="!store.user.uid">
        <div v-if="step == 'get_otp'">
          <q-input
            outlined
            label="Phone Number"
            v-model="phone"
            class="q-mb-md"
          />
          <q-btn @click="getOTP" class="">GET OTP</q-btn>
        </div>

        <div v-if="step == 'verify_otp'">
          <q-input outlined label="OTP" v-model="otp" class="q-mb-md" />
          <q-btn @click="verifyOTP" class="">Verify</q-btn>
        </div>

        <div class="q-mt-md" v-if="error">error: {{ error }}</div>
      </div>

      <div v-if="store.user.uid">
        <div>User:</div>
        <div>uid:{{ store.user.uid }}</div>
        <div class="q-mb-md">phoneNumber:{{ store.user.phoneNumber }}</div>
        <q-btn @click="logout" class="">Logout</q-btn>
      </div>

      <div id="recaptcha-container"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  getAuth,
  signOut,
} from "firebase/auth";
import { useUserStore } from "src/stores/user";

export default defineComponent({
  setup() {
    const phone = ref("");
    const otp = ref("");
    const userStore = useUserStore();
    const step = ref("get_otp");
    const error = ref("");
    return {
      phone: phone,
      otp: otp,
      store: userStore,
      step: step,
      error: error,
      verifyOTP() {
        window.confirmationResult
          .confirm(otp.value)
          .then((result) => {
            console.log(result);
          })
          .catch((e) => {
            error.value = e;
            console.log(e);
          });
      },
      getOTP() {
        console.log("login");
        signInWithPhoneNumber(getAuth(), phone.value, window.recaptchaVerifier)
          .then((confirmationResult) => {
            console.log(confirmationResult);
            window.confirmationResult = confirmationResult;
            step.value = "verify_otp";
          })
          .catch((e) => {
            console.log(e);
            error.value = e;
            window.recaptchaVerifier.render().then(function (widgetId) {
              grecaptcha.reset(widgetId);
            });
          });
      },
      initReCaptcha() {
        setTimeout(() => {
          window.recaptchaVerifier = new RecaptchaVerifier(
            getAuth(),
            "recaptcha-container",
            {
              size: "invisible",
            },
          );
        }, 500);
      },
      logout() {
        step.value = "get_otp";
        signOut(getAuth());
      },
    };
  },
  created() {
    this.initReCaptcha();
  },
});
</script>
