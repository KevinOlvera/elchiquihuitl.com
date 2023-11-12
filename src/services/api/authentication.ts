import { LOGIN_ENDPOINT, api } from '.'

export async function login(email: string, password: string) {
  const response = await api.post(
    `${LOGIN_ENDPOINT}`,
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}
