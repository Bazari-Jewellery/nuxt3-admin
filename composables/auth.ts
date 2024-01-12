import type { Dict } from "~/types"


export async function useLogin(email: string, password: string) {
  const cybandy = useCybandyClient()
  type Results = {
    status: boolean,
    error: Error | undefined,
    data: Dict | undefined
  }
  const res = {} as Results
  try {
    const { access_token } = await cybandy.admin.auth.getToken({ email, password })
    if (access_token) {
      useCookie('x-bazari-token', { httpOnly: true, sameSite: true, secure: true })

      res.status = true
      useToastSuccess('Successfully logged in')
      return res
    }
  } catch (error: any) {
    res.status = false
    res.error = error
    useToastFailure()
    return res
  }
}
