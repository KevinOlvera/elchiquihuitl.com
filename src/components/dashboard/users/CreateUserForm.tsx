import { useEffect, useState } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { toast } from 'sonner'

import { type Company } from '../../../models/company'
import { toastWrapper } from '../../../services/api'
import { useUserActions } from '../../../hooks/useUserActions'
import { type CreateUser } from '../../../models/users'
import { createUser, getUsers } from '../../../services/api/users'
import { getCompanies } from '../../../services/api/companies'

interface CreateUserFormProps {
  onClose: () => void
}

function CreateUserForm(props: CreateUserFormProps) {
  const [companies, setCompanies] = useState<Company[]>([])

  const { setUsers, setPagination } = useUserActions()

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
    console.group('[CreateUserForm][handleSubmit]')
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const data: Record<string, string> = {}

    form.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    if (data.name === '' || data.username === '' || data.email === '' || data.phone === '' || data.companyId === '') {
      toast.error('Todos los campos son requeridos')
      console.error('Todos los campos son requeridos')
      console.groupEnd()
      return
    }

    const newPhone = (data.countryCode) + ' ' + (data.phone)

    const user: CreateUser = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: newPhone,
      companyId: data.companyId,
      password: newPhone
    }

    void toastWrapper(createUser(user))
      .then((result) => {
        console.log('createUser', result)
        void getUsers()
          .then((response) => {
            console.log('getUsers', response)
            const { data, pagination } = response.data
            setUsers(data)
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
        Nuevo usuario
      </h1>
      <form
        action='submit'
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          autoFocus
          label="Nombre"
          placeholder="John Doe"
          variant="bordered"
          type='text'
          name='name'
          isRequired
          minLength={3}
        />
        <Input
          label="Usuario"
          placeholder="john_doe"
          variant="bordered"
          type='text'
          name='username'
          isRequired
          minLength={3}
        />

        <Input
          label="Email"
          placeholder="john.doe@example.com"
          variant="bordered"
          type='email'
          name='email'
          isRequired
        />
        <Input
          label="Teléfono"
          placeholder="55 1234 5678"
          variant="bordered"
          type='tel'
          name='phone'
          isRequired
          startContent={
            <div
              className='flex justify-center items-center content-center'
            >
              <select
                name="countryCode"
                className='text-gray-500 text-sm'
                aria-label='Country code'
                style={{
                  WebkitAppearance: 'none'
                }}
              >
                <option key={'mx'}>+52</option>
                <option key={'usa'}>+1</option>
                <option key={'col'}>+57</option>
              </select>
            </div>
          }
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

export default CreateUserForm
