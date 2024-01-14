<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email'),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string(),
  company_name: z.string(),
  street_address: z.string(),
  vat_id: z.string(),
  country_code: z.string(),
  postal_code: z.string(),
  city: z.string(),
  position: z.string(),
})

type Schema = z.output<typeof schema>

const state = reactive({
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  phone: undefined,
  company_name: undefined,
  street_address: undefined,
  vat_id: undefined,
  country_code: undefined,
  postal_code: undefined,
  city: undefined,
  position: undefined,

})

const tnc = ref(false)
const additional_information = ref('')

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  const payload = {
    ...event.data,
    metadata:{
      tnc:tnc.value,
      additional_information:additional_information.value
    }
  }
  const d = await useCustomersAccountRequestCreate(payload)
  if(d?.data){
    toastNotification().success()
    navigateTo(`/customers/account_requests/${d.data.id}`)
  }else{
    toastNotification().error()
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-10 min-w-[500px] " @submit="onSubmit">
    <div class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-lg">Personal Information</h2>
        <p class=" text-gray-500 dark:text-gray-400 text-xs">All information should be legitimate</p>
      </div>
      <div>
        <div class="space-y-6">
          <div>
            <UFormGroup class="" label="Position" name="position">
              <UInput v-model="state.position" />

              <template #hint>
                <UTooltip text="Position in the company" :popper="{
                  arrow: true,
                  placement: 'top'
                }">
                  <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
                </UTooltip>
              </template>
            </UFormGroup>
          </div>

          <div class="flex gap-5 justify-between">
            <UFormGroup class="w-1/2" label="First Name" name="first_name">
              <UInput v-model="state.first_name" />

              <template #hint>
                <UTooltip text="First name as shown on your ID" :popper="{
                  arrow: true,
                  placement: 'top'
                }">
                  <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
                </UTooltip>
              </template>
            </UFormGroup>
            <UFormGroup class="w-1/2" label="Last Name" name="last_name">
              <UInput v-model="state.last_name" />

              <template #hint>
                <UTooltip text="Last name as shown on your ID" :popper="{
                  arrow: true,
                  placement: 'top'
                }">
                  <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
                </UTooltip>
              </template>
            </UFormGroup>
          </div>
        </div>

      </div>
    </div>
    <div class="space-y-6">
      <div class="space-y-2">
        <h2 class="text-lg">Company Information</h2>
        <p class="max-w-lg text-gray-500 dark:text-gray-400 text-xs">The official information of the company. This will be
          used to confirm legitimacy and ensure compliance with regulations and our company policies</p>
      </div>

      <div class="space-y-4">
        <div>
          <UFormGroup label="Company Name" name="company_name">
            <UInput v-model="state.company_name" icon="i-ph-identification-card" />
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="VAT Number" name="vat_id">
            <UInput v-model="state.vat_id" />

            <template #hint>
              <UTooltip text="VAT number of the company" :popper="{
                arrow: true,
                placement: 'top'
              }">
                <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
              </UTooltip>
            </template>
          </UFormGroup>
        </div>
        <div class="flex gap-5">
          <UFormGroup class="basis-1/2" label="Email" name="email">
            <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
            <template #hint>
              <UTooltip text="Username and contact email for the account" :popper="{
                arrow: true,
                placement: 'top'
              }">
                <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
              </UTooltip>
            </template>
          </UFormGroup>
          <UFormGroup class="basis-1/2" label="Phone" name="phone">
            <UInput v-model="state.phone" placeholder="+39xxxxxxxxxx" icon="i-heroicons-phone" />
            <template #hint>
              <UTooltip text="Company or requester's telephone number" :popper="{
                arrow: true,
                placement: 'top'
              }">
                <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
              </UTooltip>
            </template>
          </UFormGroup>
        </div>
        <div class="flex gap-5">
          <UFormGroup class="basis-2/3" label="Street Address" name="street_address">
            <UInput v-model="state.street_address" placeholder="" icon="i-ph-map-trifold" />
            <template #hint>
              <UTooltip text="Company address" :popper="{
                arrow: true,
                placement: 'top'
              }">
                <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
              </UTooltip>
            </template>
          </UFormGroup>

          <UFormGroup class="basis-1/3" label="Postal Code" name="postal_code">
            <UInput v-model="state.postal_code" />
          </UFormGroup>
        </div>
        <div class="flex gap-5">
          <UFormGroup class="basis-1/2" label="City" name="city">
            <UInput v-model="state.city" />
          </UFormGroup>

          <UFormGroup class="basis-1/2" label="Country" name="country_code">
            <!-- <UInput v-model="state.country_code" /> -->
            <UtilitiesCountriesList v-model="state.country_code" />
          </UFormGroup>
        </div>
        <div>
          <UFormGroup label="Additional Information" name="additional_information">
           <UTextarea :rows="5" v-model="additional_information" placeholder="Any further information relevant to your account request including social media links or website"/>

            <template #hint>
              <UTooltip text="Any further information relevant to your account request including social media links or website" :popper="{
                arrow: true,
                placement: 'top'
              }">
                <UIcon name="i-ph-question" class="w-4 h-4 cursor-pointer" />
              </UTooltip>
            </template>
          </UFormGroup>
        </div>
        <div>
          <UFormGroup name="tnc">
            <UCheckbox v-model="tnc">
              <template #label>
                <span>Agree to our <NuxtLink class="underline" to='/tnc'>Terms and Condition</NuxtLink> & <NuxtLink
                    class="underline" to="/policies">company policies</NuxtLink></span>
              </template>
            </UCheckbox>
          </UFormGroup>
        </div>
      </div>
    </div>
    

    <UButton type="submit" block variant="solid" :disabled="!tnc">
      Submit
    </UButton>
  </UForm>
</template>

