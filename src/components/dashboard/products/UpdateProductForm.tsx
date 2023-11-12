import { useEffect, useState } from 'react'
import { type UpdateProduct, type Product } from '../../../models/product'
import { type Company } from '../../../models/company'
import { type Category } from '../../../models/category'
import { useProductActions } from '../../../hooks/useProductActions'
import { getCompanies } from '../../../services/api/companies'
import { getCategories } from '../../../services/api/categories'
import { toastWrapper } from '../../../services/api'
import { getProducts, updateProduct } from '../../../services/api/products'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { ClockIcon } from '../../common/Icons'

interface UpdateProductFormProps {
  product: Product
  onClose: () => void
}

function UpdateProductForm(props: UpdateProductFormProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  const [companyId, setCompanyId] = useState<string>(props.product.companyId)
  const [categoryId, setCategoryId] = useState<string>(props.product.categoryId)

  const { setProducts, setPagination } = useProductActions()

  useEffect(() => {
    getCompanies()
      .then((result) => {
        setCompanies(result.data)
      })
      .catch((error) => {
        console.error(error)
      })
    getCategories()
      .then((result) => {
        setCategories(result.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleCompanyId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompanyId(event.target.value)
  }

  const handleCategoryId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryId(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.group('[UpdateProductForm][handleSubmit]')
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const data: Record<string, string> = {}

    form.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    const product: UpdateProduct = {
      name: data.name,
      description: data.description,
      price: +data.price,
      image: data.image,
      categoryId: data.categoryId,
      time: +data.time,
      calories: +data.calories,
      companyId: data.companyId
    }

    void toastWrapper(updateProduct(props.product.id, product))
      .then((result) => {
        console.log('updateProduct', result)
        void getProducts()
          .then((response) => {
            console.log('getProducts', response)
            const { data, pagination } = response.data
            setProducts(data)
            setPagination(pagination)
          })
        props.onClose()
      })

    console.groupEnd()
  }

  return (
    <div
      className='flex flex-col gap-4'
    >
      <h1
        className='text-2xl font-bold'
      >
        Actualizar Producto
      </h1>
      <form
        action='submit'
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          autoFocus
          label="Nombre"
          placeholder="Producto 1"
          variant="bordered"
          type='text'
          name='name'
          isRequired
          minLength={3}
          defaultValue={props.product.name}
        />
        <Textarea
          label="Description"
          placeholder="Escribe una descripción para la categoría"
          variant='bordered'
          name='description'
          isRequired
          minLength={10}
          defaultValue={props.product.description}
        />
        <div
          className='flex flex-row gap-4'
        >
          <Input
            type="number"
            label="Precio"
            variant='bordered'
            placeholder="0.00"
            name='price'
            isRequired
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            defaultValue={props.product.price.toString()}
          />
          <Input
            type="number"
            label="Tiempo"
            variant='bordered'
            placeholder="0"
            name='time'
            isRequired
            min={0}
            max={60}
            startContent={
              <ClockIcon className='w-4 text-gray-500 mt-[0px]' />
            }
            defaultValue={props.product.time.toString()}
          />
        </div>
        <Input
          type="url"
          label="Imagen"
          variant='bordered'
          placeholder="example.com/image.png"
          name='image'
          isRequired
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
          defaultValue={props.product.image}
        />

        {
          categories.filter((category) => category.id === props.product.categoryId).length > 0 && (
            <Select
              items={categories}
              label="Categoría"
              placeholder="Categoría 1"
              variant="bordered"
              name='categoryId'
              isRequired
              selectedKeys={[categoryId]}
              onChange={handleCategoryId}
            >
              {(category) => <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>}
            </Select>
          )
        }
        <Input
          label="Calorías"
          placeholder="100"
          variant="bordered"
          type='number'
          name='calories'
          isRequired
          min={0}
          defaultValue={props.product.calories.toString()}
        />

        {
          companies.filter((company) => company.id === props.product.companyId).length > 0 && (
            <Select
              items={companies}
              label="Empresa"
              placeholder="Acme Inc."
              variant="bordered"
              name='companyId'
              isRequired
              selectedKeys={[companyId]}
              onChange={handleCompanyId}
            >
              {(company) => <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>}
            </Select>
          )
        }

        <div
          className='flex flex-row gap-2 justify-end'
        >
          <Button color="danger" variant="flat" onPress={props.onClose}>
            Cancelar
          </Button>
          <Button
            color="primary"
            type='submit'
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProductForm
