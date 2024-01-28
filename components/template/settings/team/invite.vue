<script setup lang=ts>
const props = defineProps({
  modelValue:Boolean
})
const emits = defineEmits(['update:modelValue'])

const modal = computed({
  set:(val) => emits('update:modelValue',val),
  get:()=>props.modelValue
})

const email = ref('')
const role = ref('')

async function sendInvite(){
  try {
    const {} = await useCybandyClient().admin.invites.create({
      role:role.value as any,
      user:email.value
    })
    toastNotification('Invite Sent').success()
    modal.value = false
  } catch (error) {
    useToastFailure()
  }
}


</script>

<template>
  <ModalTitleButton v-model="modal" title="Invite User" @send="sendInvite" button-confirm-label="Send Invite" :disabled="!email || !role">
    <div class="w-full sm:min-w-[500px]">
      <FormsUsersInvite v-model:email="email" v-model:role="role" />
    </div>
  </ModalTitleButton>
</template>
