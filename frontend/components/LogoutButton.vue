<template>
    <button @click="logoutUser">Logout</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const { logout } = useAuthStore();
const router = useRouter();

const logoutUser = () => {
    logout();
    router.push('/login');
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
