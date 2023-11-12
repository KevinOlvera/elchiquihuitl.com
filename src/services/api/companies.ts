import { COMPANIES_ENDPOINT, api } from '.'

export async function getCompanies () {
  const response = await api.get(
    `${COMPANIES_ENDPOINT}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}
