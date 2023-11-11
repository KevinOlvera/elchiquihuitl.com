import { useEffect, useState } from 'react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'

import { type Company } from '../../../models/company'
import { toastWrapper } from '../../../services/api'
import { type UpdateUser, type User } from '../../../models/users'
import { CountryCode } from '../../../consts'
import { useUserActions } from '../../../hooks/useUserActions'
import { getUsers, updateUser } from '../../../services/api/users'
import { getCompanies } from '../../../services/api/companies'

interface UpdateUserFormProps {
  user: User
  onClose: () => void
}

function UpdateUserForm(props: UpdateUserFormProps) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [companyId, setCompanyId] = useState<string>(props.user.companyId)

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

  const handleCompanyId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCompanyId(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.group('[UpdateUserForm][handleSubmit]')
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const data: Record<string, string> = {}

    form.forEach((value, key) => {
      if (typeof value === 'string') {
        data[key] = value
      }
    })

    const newPhone = (data.countryCode) + ' ' + (data.phone)

    const user: UpdateUser = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: newPhone,
      companyId: data.companyId
    }

    void toastWrapper(updateUser(props.user.id, user))
      .then((result) => {
        console.log('updateUser', result)
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
        Actualizar usuario
      </h1>
      <form
        action='submit'
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <Input
          label="Nombre"
          placeholder="John Doe"
          variant="bordered"
          type='text'
          name='name'
          isRequired
          minLength={3}
          defaultValue={props.user?.name}
        />
        <Input
          label="Usuario"
          placeholder="john_doe"
          variant="bordered"
          type='text'
          name='username'
          isRequired
          minLength={3}
          defaultValue={props.user?.username}
        />

        <Input
          label="Email"
          placeholder="john.doe@example.com"
          variant="bordered"
          type='email'
          name='email'
          isRequired
          defaultValue={props.user?.email}
        />
        <Input
          label="Teléfono"
          placeholder="55 1234 5678"
          variant="bordered"
          type='tel'
          name='phone'
          isRequired
          defaultValue={props.user?.phone.split(' ')[1]}
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
                defaultValue={props.user.phone.split(' ')[0]}
              >
                {
                  Object.entries(CountryCode).map(([key, value]) => (
                    <option
                      key={key}
                    >
                      {value}
                    </option>
                  ))
                }
              </select>
            </div>
          }
        />
        {
          companies.filter((company) => company.id === props.user.companyId).length > 0 && (
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

export default UpdateUserForm
