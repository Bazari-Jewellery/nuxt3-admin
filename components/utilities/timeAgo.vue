<script setup lang=ts>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import it from 'javascript-time-ago/locale/it'
const props = defineProps({
  time_date:{
    type:Date||String,
    required:true
  }
})

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(it)
const timeAgo = new TimeAgo('en-us')

const time = computed(()=> timeAgo.format(props.time_date))
</script>

<template>
  <span></span>
</template>
