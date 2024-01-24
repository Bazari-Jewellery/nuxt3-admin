import { grayThemeStore, primaryThemeStore } from "~/utils/storage"

export default defineNuxtPlugin((nuxtApp) => {
  const isDark = useDark()
  const toggleDark = useToggle()
  const sidebarCollapse = ref(false)

  // change primary color based on dark/light mode
  function changePrimary(col='', gray='') {
    try {
      if(col){
        useAppConfig().ui.primary = col
        primaryThemeStore('col')
      }
      if(gray){
        useAppConfig().ui.gray = gray
        grayThemeStore(gray)
      }
    } catch (error:any) {
      
    }
  }
  // hook into page setup
  nuxtApp.hook("app:created", () => {
    // changePrimary()
  })

  // watch changes of isDark and toggle
  // watch(isDark, () => changePrimary())
  nuxtApp.hook('app:beforeMount',()=>{
    const primary = primaryThemeStore()?.color
    if(primary){
      if(primary.value =='primary') return
      changePrimary(primary.value)
    }
    const gray = grayThemeStore()?.color
    if(gray){
      if(gray.value=='gray') return
      changePrimary('',gray.value)
    }
  })

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
