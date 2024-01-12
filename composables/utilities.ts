
export function useToastSuccess(title='Success', description=''){
  const toast = useToast()
  toast.add({
    title:title,
    description:description,
    icon: 'i-heroicons-check-badge-20-solid',
    timeout: 2000,
    color: 'emerald'
  })
}
export function useToastFailure(title='Oops!!', description='Something unexpected occurred'){
  const toast = useToast()
  toast.add({
    title:title,
    description:description,
    icon: 'i-heroicons-exclamation-triangle-20-solid',
    timeout: 2000,
    color: 'red'
  })
}


export function useMedusaHeader(){
  const token = useCookie('x-bazari-token')
  return {
    headers:{
      authorization: `Bearer ${token.value}`
    }
  }
}
