<script setup lang=ts>
import type { Dict, AccountRequest } from '~/types';
import type { Note } from "@medusajs/medusa"

definePageMeta({
  title: 'Account Requests',
  layout: 'default',
  scrollToTop: true
});
useHead({
  title: useRoute().meta?.title as string
})
const id = useRoute().params.id as string
const data = ref({} as AccountRequest)
const information = computed({
  set: (val) => data.value = val,
  get: () => data.value
})

asyncComputed(async () => {
  const d = await useCustomersAccountRequestGetSingle(id)
  if (d) {
    information.value = d
  }
})

async function update(status: string) {
  const d = await useCustomersAccountRequestUpdate({
    status: status
  }, id)

  if (d?.data) {
    information.value = d.data
    const msg = status == 'review' ? 'Account under review' : `Account ${status}`
    useToastSuccess('', msg)
  }
}
async function confirm() {
  const d = await useCustomersAccountRequestConfirm(id)

  if (d?.data) {
    information.value = d.data
    // const msg = status =='review'? 'Account under review': `Account ${status}`
    useToastSuccess('', 'Account Confirmed')
  }
}

const items = [

  [
    {
      label: 'Requested',
      icon: 'i-carbon-intent-request-create',
      click: async () => await update('requested')
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
        await confirm()
      }
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: async () => {
        const d = await useCustomersAccountRequestDelete(id)
        if (d?.data) {
          if (d.data.deleted) {
            navigateTo('/customers/account_requests')
            return
          }
        }
        useToastFailure()
      }
    },
  ]
]

const confirmed_items = [
  [
    {
      label: 'Delete',
      icon: 'i-heroicons-trash',
      click: async () => {
        const d = await useCustomersAccountRequestDelete(id)
        if (d?.data) {
          if (d.data.deleted) {
            navigateTo('/customers/account_requests')
            return
          }
        }
        useToastFailure()
      }
    },
  ]
]

const notes = ref({
  notes: [] as Note[],
  offset: 0,
  limit: 50
})
const q_notes = ref('')

async function createNote() {
  await useLazyAsyncData('create-note', async () => {
    let { note: _note } = await useCybandyClient().admin.notes.create({
      resource_id: id,
      resource_type: 'order',
      value: q_notes.value,

    })
    if (_note) {
      _note.author = useNuxtApp().$currentUser.data.value as any
      notes.value.notes.push(_note)
      q_notes.value = ""
    }
  })

}

//  show notes on frontend
const disp_notes = computed(() => {
  const results = [] as Dict[]
  for (let index = notes.value.notes?.length; index > 0; index--) {
    const element = notes.value.notes[index - 1];
    results.push({
      author: `${element.author.first_name} ${element.author.last_name}`,
      time: element.created_at,
      content: element.value
    })
  }
  return results
})

async function fetchNotes() {
  await useLazyAsyncData(`notes_${id}`, async () => {
    const { notes: _notes } = await useCybandyClient().admin.notes.list({
      resource_id: id, limit: notes.value.limit, offset: notes.value.offset,
    })

    if (_notes) {
      notes.value.notes = _notes
    }
  })
}
await fetchNotes()


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

                  <UDropdown v-if="information.status !== 'confirmed'" :items="items">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                  <UDropdown v-else :items="confirmed_items">
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

        <div class="basis-2/5 space-y-6">
          <div class="space-y-2">
            <h5 class="title">Notes</h5>
            <p class="text-xs text-gray">Write anything you want to remember or others should take note of when handling
              this request</p>
          </div>

          <!-- write a notes -->
          <div>
            <UInput v-model="q_notes" placeholder="Write a note" :ui="{ icon: { trailing: { pointer: '' } } }">

              <template #trailing>
                <UIcon name="i-carbon-send-alt" class="w-4 h-4 cursor-pointer hover:text-primary" @click="createNote" />
              </template>
            </UInput>
          </div>

          <div class="space-y-4">
            <div v-for="note in disp_notes" class="space-y-3">
              <div class="relative flex justify-between">
                <span class="flex gap-2 w-full">
                  <UAvatar :alt="note.author" size="2xs" />
                  <div class="flex flex-col gap-1 w-full">
                    <span class="text-xs">{{ note.author }}</span>

                    <span class="w-full pl-2 py-1.5 bg-gray-200/80 dark:bg-gray-950/50 text-xs">
                      {{ note.content }}
                    </span>
                    <span class="text-xs leading-none text-end">{{ dateFormatter(note.time) }}</span>
                  </div>

                </span>

                <UPopover class="absolute right-0">
                  <UIcon name="i-heroicons-ellipsis-horizontal-20-solid"
                    class="w-4 h-4 cursor-pointer hover:text-primary" />

                  <template #panel>
                    <div class="p-4 flex items-center gap-5">
                      <UButton label="Delete" color="red" icon="i-heroicons-trash" />
                    </div>
                  </template>
                </UPopover>
              </div>

              <!-- <p class="w-full">
                  {{ note.content }}
                </p> -->
            </div>
          </div>
        </div>
      </div>
      <!-- <pre>{{ information }}</pre> -->
    </div>
  </div>
</template>
