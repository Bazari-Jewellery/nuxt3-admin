<script setup lang='ts'>
import type { PublishableApiKey } from '@medusajs/medusa';

const props = defineProps({
  refresh: Boolean
})
const keys = ref<PublishableApiKey[]>([])

const rows = computed(() => {
  return keys.value?.map((x) => {
    return {
      name: x.title,
      token: x.id,
      created: dateFormatter(x.created_at),
      status: x.revoked_at ? 'Offline' : 'Live',
      data: x
    }
  })
})
const columns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'token',
    label: 'Token'
  },
  {
    key: 'created',
    label: 'Created',
    sortable: true
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true
  },
  {
    key: 'action',
    slot: 'action'
  },
]


const q = ref('')
const limit = ref(10)
const offset = ref(0)
const count = ref(1)


const { data, execute, pending } = await useLazyAsyncData('get-publishable-api-keys', async () => {
  const { publishable_api_keys, count: _count } = await useCybandyClient().admin.publishableApiKeys.list({
    q: q.value,
    limit: limit.value,
    offset: offset.value
  })
  if (publishable_api_keys) {
    keys.value = publishable_api_keys
    count.value = _count
  }
})



const emits = defineEmits(['createKey', 'update:refresh'])
const refresh = computed({
  get: () => props.refresh,
  set: (val) => emits('update:refresh', val)
})

watchDeep(refresh, async () => {
  await execute()
})

const actionMenu = (row: any) => [
  [
    {
      label: 'Edit API key details',
      icon: 'i-heroicons-pencil-square',
      click: () => {

      }
    },
    {
      label: 'Edit sales channels',
      icon: 'i-heroicons-pencil-square',
      click: () => {

      }
    },
    {
      label: 'Copy token',
      icon: 'i-ph-copy',
      click: async () => {
        const source = ref(row.token)
        const { copy, copied } = useClipboard({ source })
        await copy()
        if (copied.value) {
          toastNotification('Token copied').default_toast()
        } else {
          useToastFailure()
        }
      }
    },
    {
      label: 'Revoke token',
      icon: 'i-heroicons-no-symbol',
      click: async () => {
        const { publishable_api_key: _key } = await useCybandyClient().admin.publishableApiKeys.revoke(row.token)
        if (_key) {
          await execute()
          toastNotification('Key Revoked').default_toast()
        } else {
          useToastFailure('Not Revoked', 'Try again later or contact admin')
        }
      }
    },
    {
      label: 'Delete API Key',
      icon: 'i-heroicons-trash',
      click: async () => {
        const { id: _id } = await useCybandyClient().admin.publishableApiKeys.delete(row.token)
        if (_id) {
          await execute()
          toastNotification('Key Deleted').default_toast()
        } else {
          useToastFailure('Not deleted', 'Try again later or contact admin')
        }
      }
    },
  ]
]
</script>

<template>
  <UTable class="w-full h-full" :columns="columns" :rows="rows" :ui="{
    tr: {
      base: 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
    },
    th: {
      size: 'text-sm capitalize text-black dark:text-white'
    }
  }">

    <template #status-data="{ row }">
      <span class="truncate capitalize"
        :class="[row.status.toLowerCase() == 'live' && 'text-emerald-500 dark:text-emerald-400', row.status.toLowerCase() == 'offline' && 'text-rose-500 dark:text-rose-400',]">
        {{ row.status }}
      </span>
    </template>
    <template #action-data="{ row }">
      <UDropdown :items="actionMenu(row)">
        <UButton variant="ghost" color="black" icon="i-heroicons-ellipsis-horizontal" />
      </UDropdown>
    </template>


    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-6 gap-3">
        <span class="italic text-sm">No API Key created</span>
        <UButton @click="() => emits('createKey')" label="Create Key" />
      </div>
    </template>

  </UTable>
</template>
