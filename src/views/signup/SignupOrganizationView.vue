<script setup lang="ts">
// NPM

// Components
import {
  FieldAvatarUploader,
  FieldInput,
  BaseButton
} from "magma-design-system-test";
import OrganizationPreview from "../../components/OrganizationPreview.vue";
import { computed, reactive } from "vue";
import { maxLength, minLength, required, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import router from "@/router";
import ProgressBar from "@/components/shell/ProgressBar.vue";

const state = reactive({
  organization: "",
  website: "",
  logo: null
});

const rules = computed(() => {
  const localRules = {
    organization: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(20)
    },
    website: { required, url }
  };

  return localRules;
});

const validation = useVuelidate(rules, state);

const logoPreview = computed(() => {
  if (state.logo) {
    return URL.createObjectURL(state.logo);
  } else {
    return null;
  }
});

const handleSubmit = async () => {
  if (validation.value.$error) {
    validation.value.$touch();
    return;
  }

  const formData = new FormData();
  formData.append(
    "organizationData",
    JSON.stringify({
      name: state.organization,
      website: state.website
    })
  );
  //state.logo && formData.append("logo", state.logo);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/test/organization`,
    {
      method: "POST",
      body: formData
    }
  );

  if (response.ok) {
    const data = await response.json();
    window.localStorage.setItem("organizationId", data.id);
    router.push("/sign-up/ambassadors");
  } else {
    console.error("Error submitting organization data");
  }
};
</script>

<template>
  <div
    class="px-6 xl:px-32 mt-40 w-full xl:w-[600px] max-w-full xl:box-content"
  >
    <h1 class="text-mgm-txt-xl mb-6">
      {{ $t("signupOrganizationView.heading") }}
    </h1>

    <form class="mb-10">
      <FieldInput
        v-model="validation.organization.$model"
        :label="$t('signupOrganizationView.form.organization')"
        type="text"
        required
        placeholder="Acme Inc."
        class="mb-4"
        :validation="validation.organization"
      />
      <FieldInput
        v-model="validation.website.$model"
        :label="$t('generic.website')"
        type="text"
        required
        placeholder="https://acme.com"
        class="mb-4"
        :validation="validation.website"
      />
      <FieldAvatarUploader
        id="logo"
        v-model="state.logo"
        :cta="$t('signupOrganizationView.form.logo.cta')"
        :description="$t('signupOrganizationView.form.logo.description')"
        label="Logo"
        placeholder-icon="image"
      />
    </form>
    <OrganizationPreview :name="state.organization" :logo="logoPreview" />

    <div
      class="absolute bottom-0 left-0 w-full h-20 flex justify-end border-t border-background-brand-default px-10 items-center"
    >
      <ProgressBar class="absolute top-0 left-0 w-full" />
      <div class="flex w-full justify-end">
        <BaseButton
          :disabled="validation.$error || !validation.$dirty"
          :text="$t('generic.continue')"
          size="lg"
          class="bg-background-brand-emphasis"
          icon="arrow-right"
          @click="handleSubmit"
        />
      </div>
    </div>
  </div>
</template>
