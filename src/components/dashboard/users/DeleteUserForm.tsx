import { Button, User as UserNextUi } from '@nextui-org/react'

import { ExclamationTriangleIcon } from '../../common/Icons'
import { type User } from '../../../models/users'
import { toastWrapper } from '../../../services/api'
import { useUserActions } from '../../../hooks/useUserActions'
import { deleteUser, getUsers } from '../../../services/api/users'

interface DeleteUserFormProps {
  user: User
  onClose: () => void
}

function DeleteUserForm(props: DeleteUserFormProps) {
  const { setUsers, setPagination } = useUserActions()

  const handleDelete = () => {
    console.group('[DeleteUserForm][handleDelete]')
    void toastWrapper(deleteUser(props.user.id))
      .then((result) => {
        console.log('deleteUser', result)
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
      className='flex flex-col gap-2 py-4'
    >
      <ExclamationTriangleIcon
        className='text-yellow-500 w-24 h-24 align-middle mx-auto'
      />
      <p
        className='text-center'
      >
        ¿Seguro que quieres eliminar este usuario?
      </p>

      <UserNextUi
        avatarProps={{ radius: 'lg', src: `https://unavatar.io/${props.user.username}` }}
        description={props.user.email}
        name={props.user.name}
      >
        {props.user.email}
      </UserNextUi>

      <div
        className='flex flex-row gap-4 justify-center pt-4 pb-2'
      >
        <Button onPress={props.onClose} color='danger' variant='flat'>Cancelar</Button>
        <Button color='primary' onPress={handleDelete}>Continuar</Button>
      </div>
    </div>
  )
}

export default DeleteUserForm
