import { type UpdateUser, type CreateUser, type User } from '../../models/users'
import { USERS_ENDPOINT, api } from '.'

export async function getUser (id: string) {
  const response = await api.get(
    `${USERS_ENDPOINT}/${id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function createUser (user: CreateUser) {
  const response = await api.post(
    `${USERS_ENDPOINT}`,
    user,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function updateUser(id: string, user: UpdateUser) {
  const response = await api.patch(
    `${USERS_ENDPOINT}/${id}`,
    user,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function updateStatusUser(id: string, status: User['status']) {
  const response = await api.patch(
    `${USERS_ENDPOINT}/${id}`,
    { status },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function deleteUser (id: string) {
  const response = await api.delete(
    `${USERS_ENDPOINT}/${id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

interface GetUsersParams {
  page: number
  search?: string
}

export async function getUsers(page: number = 1, filter: string = '') {
  const params: GetUsersParams = {
    page
  }

  if (filter !== '') {
    params.search = filter
  }

  const response = await api.get(
    `${USERS_ENDPOINT}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      params
    }
  )

  return response
}
