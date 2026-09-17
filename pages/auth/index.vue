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
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const res = await useLogin(event.data.email, event.data.password)

}


definePageMeta({
  title: 'Authentication',
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
  <div class="w-full h-screen flex flex-col items-center justify-center gap-14">
    <div class="flex justify-center">
      <LogoSvg />
    </div>

    <div class=" flex flex-col items-center justify-center space-y-5">

      <h1 class="text-xl sm:text-2xl font-semibold">Login</h1>
      <div class="mx-auto min-w-[320px] sm:min-w-[450px]">
        <UCard class="bg-neutral-100 dark:bg-neutral-900">
          <UForm :schema="schema" :state="state" class="space-y-6 w-full" @submit="onSubmit">
            <UFormGroup label="Email" name="email">
              <UInput v-model="state.email" placeholder="test@bazari.com" autocomplete="username" icon="i-ph-at" />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
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

            <UButton type="submit" color="black" variant="solid" block>
              Login
            </UButton>
            <div class="flex justify-center items-center">
              <ULink to="/auth/password-reset" class="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
                Forgot Password?
              </ULink>
            </div>
          </UForm>
        </UCard>
      </div>
    </div>
  </div>
</template>
