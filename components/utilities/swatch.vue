<script setup>
const ui = useAppConfig().ui

const colors = ui.colors.filter((x) => x != 'primary')
const gray_colors = ['slate', 'zinc', 'cool', 'neutral', 'stone']
function changeColor(col) {
  useAppConfig().ui.primary = col
  // primaryThemeStore().clearStorage()
  primaryThemeStore().color.value = col
}
function changeGray(col) {
  useAppConfig().ui.gray = col
  // grayThemeStore().clearStorage()
  grayThemeStore().color.value = col
}
</script>

<template>
  <div>
    <UPopover>
        <UIcon name="i-heroicons-swatch-20-solid" class="text-primary cursor-pointer w-5 h-5" />
        <template #panel>
          <UCard :ui="{ background: 'bg-white dark:bg-gray-800', base: 'w-40 relative' }" class="">
            <div class="flex items-center gap-3 flex-wrap">
              <UBadge v-for="col of colors" @click="() => changeColor(col)" :color="col" size="sm"
                :ui="{ base: 'cursor-pointer w-3 h-3', rounded: 'rounded-full', size: { sm: 'px-0 py-0' } }"></UBadge>
            </div>

            <template #footer>
              <div class="flex items-center gap-3 flex-wrap">
              <UBadge  @click="() => changeGray('slate')" size="sm"
                :ui="{ base: 'cursor-pointer w-3 h-3', rounded: 'rounded-full', size: { sm: 'px-0 py-0' }, variant:{solid:`bg-slate-500 dark:bg-slate-400`} }"/>
              <UBadge  @click="() => changeGray('stone')" size="sm"
                :ui="{ base: 'cursor-pointer w-3 h-3', rounded: 'rounded-full', size: { sm: 'px-0 py-0' }, variant:{solid:`bg-stone-500 dark:bg-stone-400`} }"/>
              <UBadge  @click="() => changeGray('zinc')" size="sm"
                :ui="{ base: 'cursor-pointer w-3 h-3', rounded: 'rounded-full', size: { sm: 'px-0 py-0' }, variant:{solid:`bg-zinc-500 dark:bg-zinc-400`} }"/>
              <UBadge  @click="() => changeGray('neutral')" size="sm"
                :ui="{ base: 'cursor-pointer w-3 h-3', rounded: 'rounded-full', size: { sm: 'px-0 py-0' }, variant:{solid:`bg-neutral-500 dark:bg-neutral-400`} }"/>
              <UBadge  @click="() => changeGray('cool')" size="sm"
                :ui="{ base: 'cursor-pointer w-3 h-3', rounded: 'rounded-full', size: { sm: 'px-0 py-0' }, variant:{solid:`bg-cool-500 dark:bg-cool-400`} }"/>
            </div>

            </template>
          </UCard>
        </template>
      </UPopover>
  </div>
</template>
