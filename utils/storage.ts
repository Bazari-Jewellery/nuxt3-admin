import { useStorage } from "@vueuse/core"
export const isCustomerLoggedIn = () => useState('login_status', ()=>false)

export const primaryThemeStore = (col='') =>{
  if(process.server) return

  const accepted_keys = useAppConfig().ui.colors
  if(!accepted_keys.includes(col)){
    col='primary'
  }

  const _col = useStorage('bazari_primary', col, localStorage)
  const color = computed({
    get:()=> _col.value,
    set:(val)=>_col.value = val
  })

  function clearStorage(){
    if(process.server)return
    _col.value = null
  }
  return {color, clearStorage}
}



export const grayThemeStore = (col='') =>{
  if(process.server) return

  const accepted_keys = ['slate', 'zinc', 'cool', 'neutral', 'stone']
  if(!accepted_keys.includes(col)){
    col='gray'
  }
  const _col = useStorage('bazari_gray', col, localStorage)
  const color = computed({
    get:()=> _col.value,
    set:(val)=>_col.value = val
  })

  function clearStorage(){
    if(process.server)return
    _col.value = null
  }
  return {color, clearStorage}
}
