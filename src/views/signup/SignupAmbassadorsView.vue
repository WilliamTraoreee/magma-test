<script setup lang="ts">
// Components
import { BaseIcon } from "magma-design-system-test";
import ProgressCircle from "@/components/ProgressCircle.vue";
</script>

<template>
  <div
    class="px-6 xl:px-32 mt-40 w-full xl:w-[600px] max-w-full xl:box-content"
  >
    <h1 class="text-mgm-txt-xl mb-6">
      {{ $t("signupAmbassadorsView.heading") }}
    </h1>

    <div
      class="bg-background-warning-default p-4 rounded-lg flex gap-2 items-start mb-6"
    >
      <BaseIcon icon="alert-triangle" color="#B25504" class="mt-1" />
      <p
        class="mgm-txt-sm text-foreground-emphasis"
        v-html="$t('signupAmbassadorsView.advice')"
      />
    </div>

    <div
      class="bg-gradient-to-b from-[#6269EB] to-[#454DE7] p-6 rounded-lg border border-[#8287EF] outline-[#0610CC] outline-1 outline shadow-[0px_1px_2px_rgba(14,16,65,0.4)] flex items-center gap-8"
    >
      <ProgressCircle :progress="2" />
      <div>
        <p class="text-mgm-txt-sm text-white mb-4">
          {{ $t("signupAmbassadorsView.description") }}
        </p>
      </div>
    </div>
  </div>
</template>
