<script setup lang="ts">
// Components
import SignupSidebar from "@/components/shell/SignupSidebar.vue";
</script>

<template>
  <div :class="[{ flex: true }]">
    <SignupSidebar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
