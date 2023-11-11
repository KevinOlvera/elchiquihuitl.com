import { CATEGORIES_ENDPOINT, api } from '.'
import { type UpdateCategory, type CreateCategory, type Category } from '../../models/category'

interface GetCategoriesParams {
  page: number
  search?: string
}

export async function getCategories(page: number = 1, filter: string = '') {
  const params: GetCategoriesParams = {
    page
  }

  if (filter !== '') {
    params.search = filter
  }

  const response = await api.get(
    `${CATEGORIES_ENDPOINT}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      params
    }
  )

  return response
}

export async function createCategory (category: CreateCategory) {
  const response = await api.post(
    `${CATEGORIES_ENDPOINT}`,
    category,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function updateCategory(id: string, category: UpdateCategory) {
  const response = await api.patch(
    `${CATEGORIES_ENDPOINT}/${id}`,
    category,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function updateStatusCategory(id: string, status: Category['status']) {
  const response = await api.patch(
    `${CATEGORIES_ENDPOINT}/${id}`,
    { status },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function deleteCategory (id: string) {
  const response = await api.delete(
    `${CATEGORIES_ENDPOINT}/${id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}
