<script setup lang=ts>
import type { PropType } from 'vue';
import type { IUser } from '~/types';

const props = defineProps({
  modelValue: Boolean,
  user: {
    type: Object as PropType<IUser>,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
})
const emits = defineEmits(['update:modelValue', 'update:user'])

const modal = computed({
  set: (val) => emits('update:modelValue', val),
  get: () => props.modelValue
})

const email = ref(props.email)
const user = computed({
  set: (val) => emits('update:user', val),
  get: () => props.user
})

// console.log(user.value);



async function updateUser() {
  try {
    const payload = Object.fromEntries(Object.entries(user.value).filter(([x, y]) => y))
    const { } = await useCybandyClient().admin.users.update(props.id, payload)
    toastNotification('Invite Sent').success()
    modal.value = false
  } catch (error) {
    useToastFailure()
  }
}


</script>

<template>
  <ModalTitleButton v-model="modal" title="Edit User" @send="updateUser" button-confirm-label="Save">
    <div class="w-full sm:min-w-[500px]">
      <FormsUsersEditUser :user="user" :email="email" />
    </div>
  </ModalTitleButton>
</template>
