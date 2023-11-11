import { Avatar, Button, Chip, Image } from '@nextui-org/react'

import { type User } from '../../../models/users'
import { mapStatusToColor } from '../../../consts'
import { EnvelopeIcon, PhoneIcon, UserIcon } from '../../common/Icons'
import { toastWrapper } from '../../../services/api'
import { useUserActions } from '../../../hooks/useUserActions'
import { useState } from 'react'
import { getUsers, updateStatusUser } from '../../../services/api/users'

interface UserDetailsProps {
  user: User
  onClose: () => void
}

function UserDetails (props: UserDetailsProps) {
  const [status, setStatus] = useState<User['status']>(props.user.status)
  const { setUsers, setPagination } = useUserActions()

  const handleStatusChange = () => {
    console.group('[UserDetails][handleStatusChange]')
    // TODO: Al activar el usuario se debe generar también una tarjeta virtual unica para el usuario si es que no tiene una
    //       con el siguiente formato:
    //       55[year(4)[1-2]] [year(4)[3-4]][month(2)] [day(2)][card(6)[1-2]] [card(6)[3-6]]
    //       Ejemplo: 5520 2310 2700 0101

    void toastWrapper(updateStatusUser(props.user.id, status === 'active' ? 'inactive' : 'active'))
      .then((result) => {
        console.log('updateStatusUser', result)
        void getUsers()
          .then((response) => {
            console.log('getUsers', response)
            const { data, pagination } = response.data
            setUsers(data)
            setPagination(pagination)
          })
        setStatus(status === 'active' ? 'inactive' : 'active')
      })

    console.groupEnd()
  }

  return (
    <div className='flex flex-col gap-4' >
      <div className='h-[260px] w-full'>
        <Image
          src={'https://picsur.kovin.dev/i/6fd5f47f-5c78-43c6-8b38-28b649977016.jpg?height=240&quality=100'}
          alt={props.user.name}
          isBlurred
          className='w-auto object-cover rounded-md h-full relative'
        />
        <Avatar
          src={`https://unavatar.io/${props.user.username}`}
          size='lg'
          radius='lg'
          name={props.user.name}
          isBordered
          color={mapStatusToColor(status)}
          className='-top-8 left-6'
        />
      </div>

      <div className='py-2 rounded-md flex flex-col gap-2'>
        <span className='flex flex-col'>
          <span className='flex justify-between'>
            <span>{props.user.name}</span>
            <Chip
              radius='lg'
              variant='flat'
              color='primary'
              classNames={{
                base: 'capitalize bg-blue-100 text-blue-400'
              }}
            >
              {props.user.role}
            </Chip>
          </span>
          <span
            className='capitalize text-xs text-gray-500'
          >{status}</span>
        </span>
        <span className='flex gap-2 items-center text-sm'><UserIcon/>{props.user.username}</span>
        <span className='flex gap-2 items-center text-sm'><EnvelopeIcon/>{props.user.email}</span>
        <span className='flex gap-2 items-center text-sm'><PhoneIcon/>{props.user.phone}</span>

        <div className='flex flex-col items-center py-2'>
          <Image
            src={'https://picsur.kovin.dev/i/78d1a931-55fd-4309-a543-8edf1cba930b.png'}
            width={150}
            alt={props.user.name}
          />
          <span className='text-xs text-gray-500'>5520 2310 1000 0001</span>
        </div>

        <span className='text-center text-sm'>
          Miembro desde {new Date(props.user.createdAt).toLocaleDateString(
            'es-MX',
            {
              year: 'numeric',
              month: 'long'
            /* day: 'numeric' */
            }
          )}
        </span>
      </div>

      <div className='flex gap-4 justify-end'>
        <Button onClick={props.onClose}>Close</Button>
        <Button
          color={status === 'active' ? 'warning' : 'success'}
          variant='flat'
          onPress={handleStatusChange}
        >
          {status === 'active' ? 'Desactivar' : 'Activar'}
        </Button>
      </div>
    </div>
  )
}

export default UserDetails
