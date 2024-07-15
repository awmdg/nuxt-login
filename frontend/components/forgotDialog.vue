<template>
  <v-dialog v-model="visible" persistent max-width="518px" max-height="465px">
    <v-card :style="{ padding: '60px 39px' }" class="rounded-lg">
      <v-card-text class="text-center d-flex flex-column align-center gap-6">
        <v-icon class="icon-background mb-4" size="54">
          mdi-email-outline
        </v-icon>
        <h2 class="text-h4 font-weight-black text-fontcolor mb-4">
          Email Sent!
        </h2>
        <p class="font-weight-400 text-fontgray text-subtitle-1">
          We have sent you an email at
          <span class="text-blue">[email address]</span>. Check your inbox and
          follow the instructions to reset your account password.
        </p>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-icon icon="mdi-arrow-left-circle-outline"></v-icon>
        <v-btn class="font-weight-normal" text @click="closeDialog">
          Back to login
        </v-btn>
      </v-card-actions>

      <!-- uncomment nalang to pag llink na para nababack natin or exit yung modal -->
      <!-- <div class="d-flex justify-center align-center mt-4">
        <v-icon icon="mdi-arrow-left-circle-outline"></v-icon>
        <NuxtLink class="ml-2">Back To Login</NuxtLink>
      </div> -->
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const closeDialog = () => {
  visible.value = false;
};
</script>

<style scoped>
.icon-background {
  background-color: rgba(8, 70, 131, 0.25);
  color: #084683;
  border-radius: 15px;
  padding: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
