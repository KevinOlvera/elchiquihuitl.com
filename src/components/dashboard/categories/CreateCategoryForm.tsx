import { useEffect, useState } from 'react'
import { type Company } from '../../../models/company'
import { useCategoryActions } from '../../../hooks/useCategoryActions'
import { getCompanies } from '../../../services/api/companies'
import { toast } from 'sonner'
import { type CreateCategory } from '../../../models/category'
import { toastWrapper } from '../../../services/api'
import { createCategory, getCategories } from '../../../services/api/categories'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'

interface CreateCategoryFormProps {
  onClose: () => void
}

function CreateCategoryForm(props: CreateCategoryFormProps) {
  const [companies, setCompanies] = useState<Company[]>([])

  const { setCategories, setPagination } = useCategoryActions()

  useEffect(() => {
    getCompanies()
      .then((result) => {
        setCompanies(result.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.group('[CreateCategoryForm][handleSubmit]')
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const data: Record<string, string> = {}

    form.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    if (data.name === '' || data.description === '' || data.companyId === '') {
      toast.error('Todos los campos son requeridos')
      console.error('Todos los campos son requeridos')
      console.groupEnd()
      return
    }

    const category: CreateCategory = {
      name: data.name,
      description: data.description,
      companyId: data.companyId
    }

    void toastWrapper(createCategory(category))
      .then((result) => {
        console.log('createUser', result)
        void getCategories()
          .then((response) => {
            console.log('getCategories', response)
            const { data, pagination } = response.data
            setCategories(data)
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
        Nueva Categoría
      </h1>
      <form
        action='submit'
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          autoFocus
          label="Nombre"
          placeholder="Categoría 1"
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

export default CreateCategoryForm
