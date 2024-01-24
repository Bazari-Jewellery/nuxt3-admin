<script setup lang=ts>
import type { Dict, AccountRequest } from '~/types';

definePageMeta({
  title: 'Account Requests',
  layout: 'default',
  scrollToTop:true
});
useHead({
  title: useRoute().meta?.title as string
})
const id = useRoute().params.id as string
const data = ref({} as AccountRequest)
const information = computed({
  set:(val)=>data.value=val,
  get:()=>data.value
})

asyncComputed(async () => {
  const d = await useCustomersAccountRequestGetSingle(id)
  if(d){
    information.value = d
  }
})

async function update(status:string){
  const d = await useCustomersAccountRequestUpdate({
    status: status
  }, id)

  if(d?.data){
    information.value = d.data
    const msg = status =='review'? 'Account under review': `Account ${status}`
    useToastSuccess('',msg)
  }
}

const items = [

  [
    {
      label: 'Requested',
      icon: 'i-carbon-intent-request-create',
      click: async()=> await update('requested')
    },
    {
      label: 'Review',
      icon: 'i-carbon-intent-request-create',
      click: async () => {
        await update('review')
      }
    },
    {
      label: 'Confirmed',
      icon: 'i-heroicons-check-circle',
      click: async () => {
        await update('confirmed')
      }
    },
  ]
]
</script>

<template>
  <div>
    <div>
      <UButton variant="link" label="Back to Account requests" icon="i-heroicons-arrow-uturn-left"
        to="/customers/account_requests" />
    </div>

    <div v-if="information">
      <div class="flex gap-5">
        <div class="basis-3/5">
          <UCard :ui="{ divide: '' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h5 class="title">Company Information</h5>
                <div class="flex gap-5 items-center">
                  <UBadge variant="soft" :label="information?.status" :ui="{ font: ' font-medium capitalize' }" />

                  <UDropdown :items="items">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                </div>
              </div>
            </template>

            <div class="space-y-3">

              <div class="flex justify-between items-center">
                <span class="w-1/2">Company Name:</span><span class="w-1/2">{{ information?.company_name }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="w-1/2">VAT Number:</span><span class="w-1/2">{{ information?.vat_id }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="w-1/2">Address:</span>
                <span class="w-1/2 capitalize flex items-center gap-1">
                  <span>
                    {{ information?.street_address }}, {{ information?.postal_code }}, {{ information?.city }} 
                  </span>
                  <span class="uppercase">
                    {{ information?.country_code }}
                  </span>

                  <UAvatar v-if="information.country_code" :src="`https://flagcdn.com/${information?.country_code}.svg`"
                    size="3xs" :ui="{ rounded: 'rounded-none' }" />
                </span>
              </div>


            </div>

          </UCard>


          <UCard :ui="{ divide: '' }">
            <template #header>
              <div class="flex items-center justify-between">
                <h5 class="title">Requester Information</h5>
              </div>
            </template>

            <div class="space-y-3">

              <div class="flex justify-between items-center">
                <span class="w-1/2">Name:</span><span class="w-1/2">{{ information?.first_name }} {{
                  information?.last_name }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="w-1/2">Position:</span><span class="w-1/2">{{ information?.position }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="w-1/2">E-mail:</span><a v-if="information?.email" :href="`mailto:${information?.email}`"
                  class="w-1/2">{{ information?.email }}</a> <span v-else>-</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="w-1/2">Phone:</span><a v-if="information?.phone" :href="`tel:${information?.phone}`"
                  class="w-1/2">{{ information?.phone }}</a> <span v-else>-</span>
              </div>


            </div>

          </UCard>
        </div>

        <div class="basis-2/5">
          <h4>Timeline</h4>
        </div>
    </div>
    <!-- <pre>{{ information }}</pre> -->
  </div>
</div></template>
