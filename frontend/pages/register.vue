<template>
  <div class="auth-container">
    <h1 class="auth-title">Register</h1>
    <form @submit.prevent="handleSubmit" class="auth-form">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="auth-input"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="auth-input"
      />
      <button type="submit" class="auth-button">Register</button>
    </form>
    <p v-if="notification" class="auth-notification">{{ notification }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/composables/auth";

const email = ref("");
const password = ref("");
const { register, notification, clearNotification } = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    await register(email.value, password.value);
    router.push("/dashboard");
  } catch (error) {}
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-input {
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.auth-button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.auth-button:hover {
  background-color: #218838;
}

.auth-notification {
  margin-top: 15px;
  color: #d9534f;
}
</style>
