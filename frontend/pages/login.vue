<template>
  <v-row class="fill-height ma-0">
    <v-col class="d-flex align-start pt-15 border-e-sm" cols="12" sm="6" md="3">
      <v-card flat class="pa-8 w-100" align="center">
        <v-img
          src="https://depedph.com/wp-content/uploads/2024/01/deped-logo-philippines-1024x522.png"
          alt="Logo"
          class="mb-10"
          contain
          :height="150"
        />

        <h2 class="text-paragraph text-center mb-10">Login to your account</h2>
        <v-form @submit.prevent="handleSubmit" class="w-100">
          <div class="field-wrapper mb-4 text-start">
            <label for="email" class="text-paragraph font-weight-medium"
              >Email Address</label
            >
            <v-text-field
              v-model="email"
              hide-details="auto"
              label="Email address"
              placeholder="johndoe@gmail.com"
              type="email"
              class="mt-2"
              variant="outlined"
              dense
            />
          </div>
          <div class="field-wrapper mb-4 text-start">
            <label for="password" class="text-paragraph font-weight-medium"
              >Password</label
            >
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              class="mt-2"
              variant="outlined"
              dense
              hide-details
            />
          </div>
          <div class="text-right mb-14">
            <NuxtLink
              :to="{ name: 'forget-password' }"
              class="text-paragraph font-weight-medium"
              >Forgot Password?</NuxtLink
            >
          </div>
          <v-btn
            color="primary"
            class="pa-4 text-subtitle-1 rounded"
            block
            type="submit"
          >
            Sign In
          </v-btn>
        </v-form>
        <p>
          Dont have an account?
          <NuxtLink
            :to="{ name: 'register' }"
            class="text-paragraph font-weight-medium"
            >Register.</NuxtLink
          >
        </p>
      </v-card>
    </v-col>

    <v-col
      v-if="!isMobile"
      class="d-flex justify-center align-center fill-height"
    >
      <v-img
        class="rounded mb-5"
        src="/images/login/hero.svg"
        :max-height="isMobile ? '400px' : '574px'"
        width="100%"
        object-fit="cover"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

const display = useDisplay();
const isMobile = computed(() => display.smAndDown.value);

const { login, error, clearNotification } = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  try {
    clearNotification();
    await login(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    if (error.value) {
      alert(error.value);
    } else {
      alert("An unexpected error occurred. Please try again.");
    }
  }
};

const navigateToRegister = () => {
  clearNotification();
  router.push("/register");
};
</script>

<style scoped>
.custom-btn {
  width: 284px;
  height: 44px;
  border-radius: 5px;
  padding: 16px;
}
</style>
