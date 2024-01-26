<script setup lang=ts>
definePageMeta({
  layout: 'canvas'
})

const title = ref('')
computed(() => useHead({ title: title.value }))
const route = useRoute()
const query = route.query
title.value = query.email ? `Invite - ${query.email}` : 'Invite'

const email = ref(query.email as string)
const id = query.id as string
const token = query.token as string
const status = query.status

onBeforeMount(async()=>{
  console.log(status,id);
  if(status=='false'){
  const {deleted} = await useCybandyClient().admin.invites.delete(id)
  navigateTo('https://bazari.it',{
    external:true
  })
}
})





import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  first_name: z.string().min(1,'Required'),
  last_name: z.string().min(1,'Required'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  first_name: undefined,
  last_name: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  
  try {
    const res = await useCybandyClient().admin.invites.accept({
    token:token,
    user:{
      first_name:state.first_name as any,
      last_name:state.last_name as any,
      password:state.password as any
    }
  })
  toastNotification('Welcome to the team', 'You are being redirected...')
  try {
    await useLogin(email.value, state.password as any)
    navigateTo('/orders')
    return
  } catch (error) {
    
  }
  navigateTo('/auth')
  } catch (error) {
    
  }
}



let passwordType = ref("password");
let isPassword = ref(true);
const togglePassword = () => {
  if (isPassword.value) {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
  isPassword.value = !isPassword.value;
};

watch(passwordType,()=>{
  if(passwordType.value=='text'){
    setTimeout(()=>{
      passwordType.value = 'password'
    },10000)
  }
})
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="flex items-center justify-center py-8">
      <LogoName />
    </div>

    <div class="flex flex-col items-center justify-center gap-8 flex-grow">
      <div class="text-center space-y-3">
        <h1 class="text-lg md:text-xl lg:text-2xl">
          Welcome
        </h1>
        <p class="text-base">
          Fill in the form below to accept the invite to join Bazari today
        </p>
      </div>
      <div class="min-w-full sm:min-w-[500px] md:min-w-[600px] max-w-[600px]">
        <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
          <div class="grid sm:grid-cols-2 gap-5">
            <UFormGroup label="First Name" required name="first_name">
              <UInput v-model="state.first_name" />
            </UFormGroup>
            <UFormGroup label="Last Name" required name="last_name">
              <UInput v-model="state.last_name" />
            </UFormGroup>
          </div>
          <UFormGroup label="Email" name="email">
            <UInput v-model="email" disabled icon="i-ph-at" />
          </UFormGroup>
          <UFormGroup label="Password" required name="password">
            <UInput v-model="state.password" :type="passwordType" icon="i-ph-lock" autocomplete="current-password"
              :ui="{ icon: { trailing: { pointer: '' } } }">
              <template #trailing>
                <span class="cursor-pointer" @click="togglePassword">
                  <UIcon v-if="passwordType == 'password'" name="i-ph-eye" />
                  <UIcon v-else name="i-ph-eye-slash" />
                </span>
              </template>
            </UInput>
          </UFormGroup>

          <UButton type="submit" block variant="solid">
            Confirm
          </UButton>
        </UForm>

      </div>
    </div>

    <div>
      <p class="text-center">Copyright &copy; 2024 | All rights reserved</p>
    </div>
  </div>
</template>






