<script setup lang='ts'>
import { z } from 'zod'
import type { FormSubmitEvent, FormErrorEvent } from '#ui/types'

const props = defineProps({
    email: {
        type: String,
        required: true,
    },
})
const emits = defineEmits<{ send: [password: string] }>()

const schema = z
    .object({
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/\d/, 'Password must contain at least one digit')
            .regex(/[@$_#()!%*?&]/, 'Password must contain at least one special character'),
        confirmPassword: z
            .string()
            .min(1, 'required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'], // Attaches the error specifically to confirmPassword
    })

type Schema = z.infer<typeof schema>

const state = reactive({
    password: undefined,
    confirmPassword: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    // Do something with event.data
    // // console.log(event.data)
    emits("send", event.data.password);
}
const email = ref(props.email)
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Email" name="email">
            <UInput v-model="email" disabled icon="i-ph-at" />
        </UFormGroup>

        <FormsPasswordInput v-model="state.password" label="Password" name="password" />

        <FormsPasswordInput v-model="state.confirmPassword" name="confirmPassword" label="Confirm Password" />

        <UButton type="submit" variant="solid" block> Confirm Password Reset </UButton>
    </UForm>
</template>