
export default defineNuxtPlugin((nuxtApp) => {
  const isDark = useDark()
  const toggleDark = useToggle()
  const sidebarCollapse = ref(false)

  // change primary color based on dark/light mode
  function changePrimary(col='', gray='') {
    if(col){
      useAppConfig().ui.primary = col
    }
    if(gray){
      useAppConfig().ui.gray = gray
    }
  }
  // hook into page setup
  nuxtApp.hook("app:created", () => {
    // changePrimary()
  })

  // watch changes of isDark and toggle
  // watch(isDark, () => changePrimary())

  return {
    provide: {
      theme: {
        toggleDark: toggleDark,
        isDark: isDark,
        sidebar:{
          collapse: computed({
            set: (val) => sidebarCollapse.value = val,
            get: () => sidebarCollapse.value
          })
        }
      }
    }
  }
})
