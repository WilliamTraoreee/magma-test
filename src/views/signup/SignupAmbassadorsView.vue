<script setup lang="ts">
// Components
import { BaseIcon, BaseButton } from "magma-design-system-test";
import ProgressCircle from "@/components/ProgressCircle.vue";
import AddAmbassadorModal from "@/components/AddAmbassadorModal.vue";
import { ref } from "vue";
import type { Ambassador } from "@/types/Signup";
import ProgressBar from "@/components/shell/ProgressBar.vue";

const ambassadors = ref<Ambassador[]>([]);

const handleAmbassadorAdded = (ambassador: Ambassador) => {
  ambassadors.value.push(ambassador);
};

const handleAmbassadorRemoved = async (ambassador: Ambassador) => {
  const removed = await fetch(
    `${import.meta.env.VITE_API_URL}/api/test/ambassador/${ambassador.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (removed.ok) {
    ambassadors.value = ambassadors.value.filter((a) => a.id !== ambassador.id);
  }
};
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
      class="bg-gradient-to-b from-[#6269EB] to-[#454DE7] p-6 rounded-lg border border-[#8287EF] outline-[#0610CC] outline-1 outline shadow-[0px_1px_2px_rgba(14,16,65,0.4)] flex items-center gap-8 mb-10"
    >
      <ProgressCircle :progress="ambassadors.length" />
      <div>
        <p class="text-mgm-txt-sm text-white mb-4">
          {{ $t("signupAmbassadorsView.description") }}
        </p>
        <AddAmbassadorModal @ambassador-added="handleAmbassadorAdded" />
      </div>
    </div>

    <div v-if="ambassadors.length">
      <h4 class="text-mgm-txt-md font-medium mb-4">
        {{ $t("generic.added") }}
      </h4>
      <div
        class="rounded-lg border border-border-default divide-y divide-border-default"
      >
        <section
          v-for="ambassador in ambassadors"
          :key="ambassador.id"
          class="px-4 flex h-12 items-center gap-3"
        >
          <div
            class="w-7 h-7 bg-background-subtle rounded-full flex items-center justify-center text-mgm-txt-xs"
          >
            {{ ambassador.firstname[0] }}{{ ambassador.lastname[0] }}
          </div>
          <p class="text-mgm-txt-md w-60">
            {{ ambassador.firstname }} {{ ambassador.lastname }}
          </p>
          <p class="text-mgm-txt-md text-foreground-default flex-1">
            {{ ambassador.email }}
          </p>
          <button @click="handleAmbassadorRemoved(ambassador)">
            <BaseIcon
              icon="trash"
              color="#5F6C85
"
            />
          </button>
        </section>
      </div>
    </div>
  </div>
  <div
    class="absolute bottom-0 left-0 w-full h-20 flex justify-end border-t border-background-brand-default px-10 items-center"
  >
    <ProgressBar class="absolute top-0 left-0 w-full" />
    <div class="flex w-full justify-between">
      <BaseButton
        :text="$t('generic.back')"
        size="lg"
        state="scdr"
        class="bg-background-brand-emphasis"
        icon="arrow-left"
        @click="$router.push('/sign-up/organization')"
      />
      <BaseButton
        :text="$t('generic.continue')"
        size="lg"
        class="bg-background-brand-emphasis"
        icon="arrow-right"
        @click="console.log('Continue to next step')"
      />
    </div>
  </div>
</template>
