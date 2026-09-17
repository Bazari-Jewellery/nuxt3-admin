<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
    layout: 'canvas'
});
useHead({
    title: "Password Reset"
})
const schema = z.object({
    email: z.string().email('Invalid email'),
})

type Schema = z.output<typeof schema>

const state = reactive({
    email: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log("Password reset request for email: ", event.data.email)
    const cybandy = useCybandyClient()
    await cybandy.admin.users.sendResetPasswordToken({ email: event.data.email })
        .then(() => {
            toastNotification('Success', "Password reset instructions have been sent to the email", 0).success()
        }).catch((err) => {
            toastNotification('Error', err.message, 0).error()
        })
}
</script>

<template>
    <div class="w-full h-screen flex flex-col items-center justify-center gap-14">
        <div class="flex justify-center">
            <LogoSvg />
        </div>

        <div class=" flex flex-col items-center justify-center space-y-5">

            <h1 class="text-xl sm:text-2xl font-semibold">Password Reset</h1>
            <div class="mx-auto min-w-[320px] sm:min-w-[450px]">
                <UCard class="bg-neutral-100 dark:bg-neutral-900">

                    <UForm :schema="schema" :state="state" class="space-y-4 w-full" @submit="onSubmit">
                        <UFormGroup label="Email" name="email">
                            <UInput v-model="state.email" placeholder="test@bazari.com" autocomplete="username"
                                icon="i-ph-at" />
                        </UFormGroup>

                        <UButton type="submit" color="black" variant="solid" block>
                            Send reset instructions
                        </UButton>
                        <div class="flex justify-center items-center">
                            <ULink to="/auth"
                                class="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200">
                                Go to Login
                            </ULink>
                        </div>
                    </UForm>
                </UCard>
            </div>
        </div>
    </div>
</template>