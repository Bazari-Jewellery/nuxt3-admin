<script setup lang=ts>
import { defaultWindow } from '@vueuse/core';
import type { IUser } from '~/types';

useHead({
  title: 'Bazari Team'
})


// console.log(useRuntimeConfig());


const columns = [
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'role',
    label: 'Role'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'action',
  },
]
type tableType = {
  name: string,
  email: string,
  role: string,
  status?: string,
  data: any
}
const actions = (row: any) => [
  [
    {
      key: 'edit',
      label: 'Edit User',
      icon: 'i-heroicons-pencil-square',
      click: () => {
        currentUser_id.value = row.data.id
        currentUser_email.value = row.email
        currentUser.value = {
          first_name: row.data.first_name,
          last_name: row.data.last_name,
          role: row.data.role,
        }
        edit_user.value = true
      }
    },
    {
      key: 'remove',
      label: 'Remove User',
      icon: 'i-heroicons-trash',
      click: async () => {
        try {
          await useCybandyClient().admin.users.delete(row.data.id as string)
          toastNotification('User deleted').default_toast()
          refresh()
        } catch (error) {
          useToastFailure()
        }
      }
    },
  ]
]
const actions_invite = (row: any) => [
  [
    {
      key: 'resend',
      label: 'Resend invitation',
      icon: 'i-heroicons-arrow-path-rounded-square',
      click: async () => {
        try {
          await useUsersResendInvite(row.data.id)
          // await useCybandyClient().admin.invites.resend(row.data.id)
          toastNotification('Invitation sent').default_toast()
          refresh()
        } catch (error) {
          useToastFailure()
        }
      }
    },
    {
      key: 'copy',
      label: 'Copy invite link',
      icon: 'i-ph-copy',
      click: () => {
        const link = ref(`${defaultWindow?.origin}/invite?token=${row.data.token}&id=${row.data.id}&email=${row.email}`)
        const { copy, copied } = useClipboard({ source: link })
        copy()
        if (copied.value) {
          toastNotification('copied', '', 3000, 'i-heroicons-check').default_toast()
        }
      }
    },
    {
      key: 'delete',
      label: 'Cancel Invitation',
      icon: 'i-heroicons-no-symbol',
      click: async () => {
        alert("Test: so delete is disconnected")
        // try {
        //   await useCybandyClient().admin.invites.delete(row.data.id as string)
        //   toastNotification('Invitation canceled').default_toast()
        //   refresh()
        // } catch (error) {
        //   useToastFailure()
        // }
      }
    },
  ]
]

const rows = ref<Array<tableType>>([])
const isLoading = ref(true)
// const rows_ = asyncComputed(async () => {
//   const temp: tableType[] = []
//   await useLazyAsyncData(async () => {

//     const { users } = await useCybandyClient().admin.users.list()
//     const { invites } = await useCybandyClient().admin.invites.list()
//     if (users) {
//       users.map((x) => {
//         temp.push({
//           name: x.first_name + ' ' + x.last_name,
//           email: x.email,
//           role: x.role,
//           data:x

//         })
//       })
//     }

//     if (invites) {
//       invites.map((x) => {
//         temp.push({
//           name: x.user_email,
//           email: x.user_email,
//           role: x.role,
//           status: 'pending',
//           data:x
//         })
//       })
//     }
//   })
//   rows.value = temp
//   isLoading.value = false
//   return temp
// })
// rows_.value


const { refresh } = await useLazyAsyncData(async () => {
  const temp: tableType[] = []
  isLoading.value = true
  const { users } = await useCybandyClient().admin.users.list()
  const { invites } = await useCybandyClient().admin.invites.list()
  if (users) {
    users?.map((x) => {
      temp.push({
        name: x.first_name + ' ' + x.last_name,
        email: x.email,
        role: x.role,
        data: x

      })
    })
  }

  if (invites) {
    invites?.map((x) => {
      temp.push({
        name: x.user_email,
        email: x.user_email,
        role: x.role,
        status: 'pending',
        data: x
      })
    })
  }
  rows.value = temp
  isLoading.value = false
})


const is_invite = ref(false)
watch(is_invite, () => {
  if (!is_invite.value) {
    refresh()
  }
})


// edit user
const edit_user = ref(false)
const currentUser = ref({} as IUser)
const currentUser_id = ref('')
const currentUser_email = ref('')

watch(edit_user, () => {
  if (!edit_user.value) {
    refresh()
  }
})
</script>

<template>
  <div>
    <UButton to="/settings" variant="link" icon="i-heroicons-arrow-uturn-left" label="Back to settings" class="mb-8" />

    <UCard :ui="{ divide: '' }">
      <template #header>
        <div class="flex justify-between">
          <div class="space-y-1">
            <h1 class="text-base lg:text-lg highlight">The Team</h1>
            <p>Manage users of your store</p>
          </div>
          <UButton @click="() => is_invite = true" size="xs" variant="solid" color="gray" label="Invite users"
            icon="i-ph-plus" />
        </div>
      </template>

      <UTable :columns="columns" :rows="rows" :loading="isLoading">

        <template #action-data="{ row }">
          <UDropdown v-if="!row.status" :items="actions(row)">
            <UIcon name="i-heroicons-ellipsis-horizontal-20-solid" class="w-5 h-5 cursor-pointer" />
          </UDropdown>
          <UDropdown v-else :items="actions_invite(row)">
            <UIcon name="i-heroicons-ellipsis-horizontal-20-solid" class="w-5 h-5 cursor-pointer" />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
    <TemplateSettingsTeamInvite v-model="is_invite" />
    <TemplateSettingsTeamEditUser v-model="edit_user" :id="currentUser_id" :email="currentUser_email"
      :user="currentUser" />
  </div>
</template>
