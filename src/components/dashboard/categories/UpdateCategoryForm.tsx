import { useEffect, useState } from 'react'
import { type UpdateCategory, type Category } from '../../../models/category'
import { type Company } from '../../../models/company'
import { useCategoryActions } from '../../../hooks/useCategoryActions'
import { getCompanies } from '../../../services/api/companies'
import { toastWrapper } from '../../../services/api'
import { getCategories, updateCategory } from '../../../services/api/categories'
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'

interface UpdateCategoryFormProps {
  category: Category
  onClose: () => void
}

function UpdateCategoryForm(props: UpdateCategoryFormProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [companyId, setCompanyId] = useState<string>(props.category.companyId)

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

  const handleCompanyId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompanyId(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.group('[UpdateCategoryForm][handleSubmit]')
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const data: Record<string, string> = {}

    form.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    const category: UpdateCategory = {
      name: data.name,
      description: data.description,
      companyId: data.companyId
    }

    void toastWrapper(updateCategory(props.category.id, category))
      .then((result) => {
        console.log('updateCategory', result)
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
        Actualizar categoría
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
          defaultValue={props.category?.name}
        />
        <Textarea
          label="Description"
          placeholder="Escribe una descripción para la categoría"
          variant='bordered'
          name='description'
          isRequired
          minLength={10}
          defaultValue={props.category?.description}
        />

        {
          companies.filter((company) => company.id === props.category.companyId).length > 0 && (
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

export default UpdateCategoryForm
