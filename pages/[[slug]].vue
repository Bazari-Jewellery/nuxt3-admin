<script setup lang=ts>
definePageMeta({
    title: 'slug' ,
    layout: 'default'
});
useHead({
    title: useRoute().meta?.title as string
})

</script>

<template>
  <div>
    {{ $route.path }}
  </div>
</template>
