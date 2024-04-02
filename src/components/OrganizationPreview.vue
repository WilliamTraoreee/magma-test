<script setup lang="ts">
import { BaseIcon } from "magma-design-system-test";

const props = defineProps({
  logo: {
    type: String,
    default: null
  },
  name: {
    type: String,
    default: "Acme Inc."
  }
});
</script>

<template>
  <div class="bg-background-subtle w-full h-72 rounded-2xl pt-10 pl-36">
    <div class="rounded-tl-lg overflow-hidden h-full flex">
      <div class="w-1/2 h-full bg-background-emphasis pt-8 px-6">
        <div class="flex items-center gap-2 mb-12">
          <div
            class="w-8 h-8 bg-background-subtle rounded-full flex items-center justify-center"
          >
            <BaseIcon v-if="!props.logo" icon="image" />
            <img
              v-else
              :src="props.logo"
              alt="Organization logo"
              class="w-8 h-8 rounded-full"
            />
          </div>
          <span class="text-white mgm-txt-sm">{{ props.name }}</span>
        </div>
        <div>
          <div class="flex gap-2 mb-6">
            <BaseIcon icon="image" color="#CBD5E1" />
            <div class="w-20 h-4 bg-[#808286] rounded"></div>
          </div>
          <div class="flex gap-2 mb-6">
            <BaseIcon icon="image" color="#CBD5E1" />
            <div class="w-20 h-4 bg-[#808286] rounded"></div>
          </div>
          <div class="flex gap-8">
            <div class="w-[1px] h-52 bg-foreground-default"></div>
            <div>
              <div class="w-14 h-4 bg-[#808286] rounded mb-6"></div>
              <div class="w-12 h-4 bg-[#808286] rounded"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white w-1/2 border-t border-border-subtle">
        <div class="p-8 w-[500px] border-b border-border-subtle">
          <div class="w-full h-5 bg-background-subtle rounded mb-4"></div>
          <div class="w-full h-8 bg-background-subtle rounded"></div>
        </div>
        <div class="p-8 w-[500px]">
          <div
            class="w-full h-40 bg-background-subtle rounded-lg border border-border-subtle"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
