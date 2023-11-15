import { PRODUCTS_ENDPOINT, api } from '.'
import { type UpdateProduct, type CreateProduct, type Product } from '../../models/product'

interface GetProductsParams {
  page: number
  search?: string
}

export async function getProducts(page: number = 1, filter: string = '') {
  const params: GetProductsParams = {
    page
  }

  if (filter !== '') {
    params.search = filter
  }

  const response = await api.get(
    `${PRODUCTS_ENDPOINT}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      params
    }
  )

  return response
}

export async function createProduct (category: CreateProduct) {
  const response = await api.post(
    `${PRODUCTS_ENDPOINT}`,
    category,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function updateProduct(id: number, category: UpdateProduct) {
  const response = await api.patch(
    `${PRODUCTS_ENDPOINT}/${id}`,
    category,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function updateStatusProduct(id: number, status: Product['status']) {
  const response = await api.patch(
    `${PRODUCTS_ENDPOINT}/${id}`,
    { status },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function updateProductImage(id: number, imageId: string) {
  const response = await api.patch(
    `${PRODUCTS_ENDPOINT}/${id}`,
    { image: imageId },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}

export async function deleteProduct (id: number) {
  const response = await api.delete(
    `${PRODUCTS_ENDPOINT}/${id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  return response
}
