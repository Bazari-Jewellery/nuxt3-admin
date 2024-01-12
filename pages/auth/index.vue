<script setup lang=ts>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})
// const cookie = useCookie('X-Bazari-Token')
// const trial_cookie = ref([] as String[])
async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  // await useFetch('/api/auth/login',{
  //   key:'login',
  //   query:{
  //     email: state.email,
  //     password: state.password
  //   },
  //   watch:false,
  //   onResponse({response}){
  //     if(response.ok){
  //       // useNuxtApp().$user.data.value = response._data
  //       useToastSuccess('Logged In', 'Redirecting you ...')
  //       // isCustomerLoggedIn().value = true
  //       // trial_cookie.value = response.headers.getSetCookie()
  //       navigateTo('/orders')
  //     }else{
  //       useToastFailure()
  //     }
  //   }
  // })
  const res = await useLogin(event.data.email, event.data.password)
  if(res?.status){
    navigateTo('/orders')
  }
}

watchEffect(()=>{
  // console.log(trial_cookie.value);
  
})

definePageMeta({
    title: 'Authentication' ,
    layout: 'canvas'
});
useHead({
    title: useRoute().meta?.title as string
})

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
</script>

<template>
  <div class="w-full h-screen flex flex-col items-center justify-center space-y-5">

    <h1 class="text-xl sm:text-2xl font-semibold">Login</h1>
    <div class="mx-auto min-w-[320px] sm:min-w-[450px]">
      <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" placeholder="test@bazari.com" autocomplete="username" icon="i-ph-at"/>
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" :type="passwordType" icon="i-ph-lock" autocomplete="current-password" :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
            <span class="cursor-pointer" @click="togglePassword">
                <UIcon v-if="passwordType == 'password'" name="i-ph-eye" />
                <UIcon v-else name="i-ph-eye-slash" />
            </span>
        </template>
        </UInput>
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
    </div>
  </div>
</template>
