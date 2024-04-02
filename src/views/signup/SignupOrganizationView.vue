<script setup lang="ts">
// NPM

// Components
import { FieldAvatarUploader, FieldInput } from "magma-design-system-test";
import OrganizationPreview from "../../components/OrganizationPreview.vue";
</script>

<template>
  <div class="mx-32 mt-40 w-[600px] max-w-full box-content">
    <h1 class="text-mgm-txt-xl mb-6">
      {{ $t("signupOrganizationView.heading") }}
    </h1>

    <form class="mb-10">
      <FieldInput
        :label="$t('signupOrganizationView.form.organization')"
        type="text"
        required
        placeholder="Acme Inc."
        class="mb-4"
      />
      <FieldInput
        :label="$t('generic.website')"
        type="text"
        required
        placeholder="https://acme.com"
        class="mb-4"
      />
      <FieldAvatarUploader
        id="logo"
        :cta="$t('signupOrganizationView.form.logo.cta')"
        :description="$t('signupOrganizationView.form.logo.description')"
        label="Logo"
        placeholder-icon="image"
      />
    </form>
    <OrganizationPreview />
  </div>
</template>
