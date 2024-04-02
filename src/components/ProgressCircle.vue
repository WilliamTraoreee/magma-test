<script setup lang="ts">
import { computed } from "vue";

interface Props {
  progress: number;
}

const props = defineProps<Props>();

const stepProgressLine = computed(() => {
  return {
    strokeDasharray: 300,
    strokeDashoffset:
      300 -
      ((props.progress > 5 ? 5 : props.progress < 0 ? 0 : props.progress) / 5) *
        300
  };
});
</script>

<template>
  <div class="relative">
    <svg
      width="126"
      height="102"
      viewBox="0 0 126 102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M111 99C118.535 88.9717 123 76.5054 123 62.9963C123 29.8613 96.1371 3 63 3C29.8629 3 3 29.8613 3 62.9963C3 76.5054 7.46507 88.9717 15 99"
        stroke="#A4BCFD"
        stroke-width="6"
        stroke-linecap="round"
        stroke-dasharray="12 12"
      />
      <path
        d="M111 99C118.535 88.9717 123 76.5054 123 62.9963C123 29.8613 96.1371 3 63 3C29.8629 3 3 29.8613 3 62.9963C3 76.5054 7.46507 88.9717 15 99"
        stroke="#fff"
        stroke-width="6"
        stroke-linecap="round"
        :stroke-dasharray="stepProgressLine.strokeDasharray"
        :stroke-dashoffset="-stepProgressLine.strokeDashoffset"
      />
    </svg>
    <p
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-mgm-dspl-lg text-white mt-2 inline-flex items-center leading-none w-full justify-center"
    >
      {{ props.progress }}
      <span
        class="text-mgm-txt-xl tracking-tighter text-background-brand-disabled leading-none ml-1 mt-4"
        >/ 5</span
      >
    </p>
  </div>
</template>
