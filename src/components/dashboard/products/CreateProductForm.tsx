import { useEffect, useState } from 'react'
import { type Company } from '../../../models/company'
import { useProductActions } from '../../../hooks/useProductActions'
import { getCompanies } from '../../../services/api/companies'
import { type Category } from '../../../models/category'
import { getCategories } from '../../../services/api/categories'
import { type CreateProduct } from '../../../models/product'
import { toast } from 'sonner'
import { toastWrapper } from '../../../services/api'
import { createProduct, getProducts } from '../../../services/api/products'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import { ClockIcon } from '../../common/Icons'

interface CreateProductFormProps {
  onClose: () => void
}

function CreateProductForm(props: CreateProductFormProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [categories, setCategories] = useState<Category[]>([])

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.group('[CreateProductForm][handleSubmit]')
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const data: Record<string, string> = {}

    form.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    if (data.name === '' || data.description === '' || data.price === '' || data.image === '' || data.categoryId === '' || data.time === '' || data.calories === '' || data.companyId === '') {
      toast.error('Todos los campos son requeridos')
      console.error('Todos los campos son requeridos')
      console.groupEnd()
      return
    }

    const product: CreateProduct = {
      name: data.name,
      description: data.description,
      price: +data.price,
      image: data.image,
      categoryId: data.categoryId,
      time: +data.time,
      calories: +data.calories,
      companyId: data.companyId
    }

    void toastWrapper(createProduct(product))
      .then((result) => {
        console.log('createProduct', result)
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
        Nuevo Producto
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
        />
        <Textarea
          label="Description"
          placeholder="Escribe una descripción para la categoría"
          variant='bordered'
          name='description'
          isRequired
          minLength={10}
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
        />

        <Select
          items={categories}
          label="Categoría"
          placeholder="Categoría 1"
          variant="bordered"
          name='categoryId'
          isRequired
        >
          {categories.map((item) => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          label="Calorías"
          placeholder="100"
          variant="bordered"
          type='number'
          name='calories'
          isRequired
          min={0}
        />

        <Select
          items={companies}
          label="Empresa"
          placeholder="Acme Inc."
          variant="bordered"
          name='companyId'
          isRequired
        >
          {companies.map((item) => (
            <SelectItem key={item.id} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </Select>
        <div
          className='flex flex-row gap-2 justify-end'
        >
          <Button color="danger" variant="flat" onPress={props.onClose}>
          Cerrar
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

export default CreateProductForm
