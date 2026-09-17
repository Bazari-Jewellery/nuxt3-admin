<script setup lang="ts">
definePageMeta({
    layout: 'canvas'
});

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
    <div class="w-full h-screen flex flex-col items-center justify-center gap-14">
        <div class="flex justify-center">
            <LogoSvg />
        </div>

        <div class=" flex flex-col items-center justify-center space-y-5">

            <h1 class="text-xl sm:text-2xl font-semibold">Confirm Password Reset</h1>
            <div class="mx-auto min-w-[320px] sm:min-w-[450px]">
                <UCard class="bg-neutral-100 dark:bg-neutral-900">

                   <AuthPasswordResetConfirm :email="(query.email as string)" @send="onSubmit" />
                </UCard>
            </div>
        </div>
    </div>
</template>