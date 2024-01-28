<script setup lang=ts>
const props = defineProps({
  email:String,
  role:String
})
const emits = defineEmits(['update:email','update:role'])
const email = computed({
  set:(val) => emits('update:email',val),
  get:()=>props.email
})
const role = computed({
  set:(val) => emits('update:role',val),
  get:()=>props.role
})

const roles = [
  {label:'Admin',value:'admin'},
  {label:'Member', value:'member'},
  {label:'Developer', value:'developer'}
]
</script>

<template>
  <form class="space-y-1">
    <UFormGroup label="Email">
      <UInput v-model="email" icon="i-ph-at"/>
    </UFormGroup>
    <UFormGroup label="Role">
      <USelect v-model="role" :options="roles" value-attribute="value"/>
    </UFormGroup>
  </form>
</template>
