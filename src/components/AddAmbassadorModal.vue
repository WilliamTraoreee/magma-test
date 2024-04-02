<script setup lang="ts">
import { Dialog } from "@ark-ui/vue";
import { BaseIcon, BaseButton, FieldInput } from "magma-design-system-test";
import { ref, computed, reactive } from "vue";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import type { Ambassador } from "@/types/Signup";

const emit = defineEmits(["ambassadorAdded"]);

defineOptions({
  inheritAttrs: false
});

const open = ref(false);

const state = reactive({
  firstName: "",
  lastName: "",
  email: ""
});

const rules = computed(() => {
  const localRules = {
    firstName: {
      required
    },
    lastName: { required },
    email: { required, email }
  };

  return localRules;
});

const validation = useVuelidate(rules, state);

const handleSubmit = async () => {
  if (validation.value.$error) {
    validation.value.$touch();
    return;
  }

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/test/ambassador`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        organizationId: localStorage.getItem("organizationId"),
        firstname: state.firstName,
        lastname: state.lastName,
        email: state.email
      })
    }
  );

  if (response.ok) {
    const data: Ambassador = await response.json();
    open.value = false;
    emit("ambassadorAdded", data);
    state.email = "";
    state.firstName = "";
    state.lastName = "";
  } else {
    console.error("Error submitting organization data");
  }
};
</script>

<template>
  <Dialog.Root v-model:open="open">
    <Dialog.Trigger as-child>
      <BaseButton
        :text="$t('signupAmbassadorsView.cta')"
        state="scdr"
        icon="plus"
      />
    </Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop
        class="backdrop fixed top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm z-10"
      />
      <Dialog.Positioner>
        <Dialog.Content
          class="bg-background-default absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-2xl p-6 w-[480px]"
        >
          <div
            class="w-12 h-12 bg-[#E0EAFF] rounded-full flex items-center justify-center border-8 border-[#EEF4FF] mb-4"
          >
            <BaseIcon icon="users-plus" color="#444CE7" />
          </div>
          <h3 class="text-mgm-txt-lg font-semibold mb-4">
            {{ $t("signupAmbassadorsView.cta") }}
          </h3>
          <form>
            <div class="grid grid-cols-2 gap-4 items-start mb-3">
              <FieldInput
                v-model="validation.firstName.$model"
                :label="$t('generic.firstname')"
                required
                placeholder="Nelson"
                :validation="validation.firstName"
              />
              <FieldInput
                v-model="validation.lastName.$model"
                :label="$t('generic.lastname')"
                required
                placeholder="Mandela"
                :validation="validation.lastName"
              />
            </div>
            <div>
              <FieldInput
                v-model="validation.email.$model"
                :label="$t('generic.email')"
                required
                placeholder="nelson.mandela@gmail.com"
                icon="mail"
                :validation="validation.email"
              />
            </div>
          </form>
          <div class="h-16 flex justify-end items-end gap-3">
            <Dialog.CloseTrigger as-child>
              <BaseButton :text="$t('generic.cancel')" state="scdr" />
            </Dialog.CloseTrigger>
            <BaseButton
              :disabled="validation.$error || !validation.$dirty"
              :text="$t('generic.add')"
              class="bg-background-brand-emphasis"
              @click="handleSubmit"
            />
          </div>
          <Dialog.CloseTrigger
            class="outline-none absolute top-6 right-6 w-6 h-6"
          >
            <BaseIcon icon="close" color="#94A3B8" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>

<style>
[data-part="backdrop"][data-state="open"] {
  animation: backdropReveal 0.2s ease-in-out forwards;
}

[data-part="content"][data-state="open"] {
  animation: modalReveal 0.4s ease-in-out forwards;
}

@keyframes backdropReveal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalReveal {
  0% {
    transform: translateY(-40%) translateX(-50%);
    opacity: 0;
  }
  100% {
    transform: translateY(-50%) translateX(-50%);
  }
}
</style>
