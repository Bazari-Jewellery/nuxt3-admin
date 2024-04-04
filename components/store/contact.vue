<script setup lang='ts'>
import type { SocialMedia } from '~/types';
import type { Address } from "@medusajs/medusa"
const store = useNuxtApp().$store.store
// console.log(store);

const social_media: SocialMedia = reactive(store.value?.social_media ?? {})
const address: Address = reactive(store.value?.address_id ? store.value.address : {}) as Address



// update social media
const cybandy = useCybandyClient()
async function updateSocial() {

  if (store.value?.social_media_id) {
    const res = await cybandy.customMethods.socialMedia.update(social_media, store.value?.social_media_id as string)

    if (res && store.value) {
      store.value.social_media = res
    }
  } else {
    const res = await cybandy.customMethods.socialMedia.create(social_media, store.value?.id as string)

    if (res) {
      const __pp = { social_media_id: res.id as string } as any
      await useNuxtApp().$store.updateStoreDetails(__pp)
    }

    toastNotification('Updated').default_toast()
  }
}

// update address

async function updateAddress() {

  const res = await cybandy.customMethods.updateStoreAddress(address)

  if (!store.value?.address_id) {
    await useNuxtApp().$store.updateStoreDetails({ address_id: res.id } as any)
  }

  if (res && store.value) {
    useToastSuccess('Address updated')
    store.value.address = res
  } else {
    useToastFailure('Sorry, try again later. Or contact developer')
  }
}


</script>

<template>
  <div class="space-y-8">
    <!-- social media section -->
    <form v-if="store" @submit.prevent="updateSocial" class="space-y-5">
      <div class="space-y-1">
        <span class="text-base highlight">Social media</span>
        <p>This are the links that will appear on the store front</p>
      </div>
      <div class="grid grid-cols-2 items-center gap-5">
        <UFormGroup label="WhatsApp">
          <UInput v-model="social_media.whatsapp" />
        </UFormGroup>
        <UFormGroup label="Facebook">
          <UInput v-model="social_media.facebook" />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-2 items-center gap-5">
        <UFormGroup label="Instagram">
          <UInput v-model="social_media.instagram" />
        </UFormGroup>
        <UFormGroup label="Pinterest">
          <UInput v-model="social_media.pinterest" />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-2 items-center gap-5">
        <UFormGroup label="Etsy">
          <UInput v-model="social_media.etsy" />
        </UFormGroup>
        <UFormGroup label="Shopify">
          <UInput v-model="social_media.shopify" />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-2 items-center gap-5">
        <UFormGroup label="LinkedIn">
          <UInput v-model="social_media.linkedin" />
        </UFormGroup>

      </div>
      <div class="flex justify-start items-center">
        <UButton label="Update Social Media Links" type="submit" />
      </div>
    </form>

    <!-- address -->
    <form v-if="store" @submit.prevent="updateAddress" class="space-y-5">
      <div class="space-y-1">
        <span class="text-base highlight">Address</span>
        <p>This is the address of your shop that will appear on the store front</p>
      </div>
      <div class="grid grid-cols-2 items-center gap-5">
        <UFormGroup label="Street Address">
          <UInput v-model="address.address_1" />
        </UFormGroup>
        <UFormGroup label="Second Street Address">
          <UInput v-model="address.address_2" />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-2 items-center gap-5">
        <UFormGroup label="Postal Code">
          <UInput v-model="address.postal_code" />
        </UFormGroup>
        <UFormGroup label="City">
          <UInput v-model="address.city" />
        </UFormGroup>
      </div>
      <div class="grid grid-cols-2 items-center gap-5">
        <UFormGroup label="Country">
          <!-- <UInput v-model="address.country_code" /> -->
          <UtilitiesCountriesList v-model="(address.country_code as string)" />
        </UFormGroup>
        <UFormGroup label="Phone">
          <UInput v-model="address.phone" placeholder="+39 xxxx xxx xxx" />
        </UFormGroup>

      </div>
      <div class="flex justify-start items-center">
        <UButton label="Update Address" type="submit" />
      </div>
    </form>
  </div>
</template>
