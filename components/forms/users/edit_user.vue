<script setup lang=ts>
import type { PropType } from 'vue';
import type { IUser } from '~/types';


const props = defineProps({
  email: String,
  user: {
    type: Object as PropType<IUser>,
    required: true
  }
})
const emits = defineEmits(['update:email', 'update:user'])
const email = computed({
  set: (val) => emits('update:email', val),
  get: () => props.email
})


const roles = [
  { label: 'Admin', value: 'admin' },
  { label: 'Member', value: 'member' },
  { label: 'Developer', value: 'developer' }
]
console.log(props.user);

</script>

<template>
  <form v-if="user" class="space-y-1">
    <div class="flex items-center gap-5">
      <UFormGroup label="First name">
        <UInput v-model="user.first_name" />
      </UFormGroup>
      <UFormGroup label="Last name">
        <UInput v-model="user.last_name" />
      </UFormGroup>
    </div>
    <UFormGroup label="Email">
      <UInput v-model="email" icon="i-ph-at" disabled />
    </UFormGroup>
    <UFormGroup label="Role">
      <USelect v-model="user.role" :options="roles" value-attribute="value" />
    </UFormGroup>
  </form>
</template>
