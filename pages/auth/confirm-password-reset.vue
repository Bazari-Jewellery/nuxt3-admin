<script setup lang="ts">

useHead({
    title: 'Confirm Password Reset'
})
const { params, query } = useRoute()
onBeforeMount(() => {
    if (!query.email || !query.token) {
        navigateTo('/auth')
    }
})

async function onSubmit(pwd:string){
    const cybandy = useCybandyClient()
    await cybandy.admin.users.resetPassword({
        token: query.token as string,
        email: query.email as string,
        password: pwd
    }).then((res) => {
        if (res.response.status === 200) {
            
            navigateTo('/auth')
        }
    }).catch((err) => {
        toastNotification('error', 'Password reset failed. Please try again.').error()
        console.log(err)
    })
}
</script>

<template>
    <UContainer>
        <div class="py-8 min-w-[300px] sm:min-w-[450px] grid justify-center">
            <h2 class="font-LibreBaskerville text-center text-2xl sm:text-3xl py-8">Confirm Password Reset</h2>

            <AuthPasswordResetConfirm :email="(query.email as string)" @send="onSubmit" />
        </div>
    </UContainer>
</template>