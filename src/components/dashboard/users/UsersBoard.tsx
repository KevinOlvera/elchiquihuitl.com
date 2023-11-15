import { useCallback, useEffect, useState } from 'react'

import { Button, Chip, Input, Modal, ModalBody, ModalContent, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, User as UserNextUi, useDisclosure } from '@nextui-org/react'

import DeleteUserForm from './DeleteUserForm'
import UpdateUserForm from './UpdateUserForm'
import UserDetails from './DetailsUser'
import CreateUserForm from './CreateUserForm'

import { useDebounce } from '../../../hooks/useDebounce'
import { type User } from '../../../models/users'
import { mapStatusToColor } from '../../../consts'

import { EyeIcon, PencilSquareIcon, PlusIcon, SearchIcon, TrashIcon, UserIcon } from '../../common/Icons'
import { type UsersState } from '../../../store/users/slice'
import { useAppSelector } from '../../../hooks/store'
import { useUserActions } from '../../../hooks/useUserActions'
import { getUsers } from '../../../services/api/users'

function UsersBoard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [activeModal, setActiveModal] = useState('')

  const [user, setUser] = useState<User>()

  const users: UsersState = useAppSelector((state) => state.users)

  const { setUsers, setPagination, setCurrentPage } = useUserActions()

  const [filterValue, setFilterValue] = useState('')
  const debouncedFilterValue = useDebounce(filterValue, 500)

  const handleOpen = (modal: string, user?: User) => {
    if ((modal === 'delete' || modal === 'update' || modal === 'details') && user !== undefined) {
      setUser(user)
    }
    setActiveModal(modal)
    onOpen()
  }

  /* const onClear = useCallback(() => {
    setFilterValue('')
  }, []) */

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value)
  }, [])

  useEffect(() => {
    getUsers(users.pagination.currentPage, debouncedFilterValue)
      .then((result) => {
        const { data, pagination } = result.data
        setUsers(data)
        setPagination(pagination)
        setCurrentPage(pagination.currentPage > pagination.totalPages ? 1 : pagination.currentPage)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [debouncedFilterValue, users.pagination.currentPage])

  return (
    <div
      className='flex flex-col px-6 pt-6 gap-6 w-full h-full'
    >
      <div className='flex flex-row gap-6'>
        <Input
          // isClearable
          placeholder="Buscar usuario por nombre, email o teléfono ..."
          startContent={<SearchIcon />}
          value={filterValue}
          // onClear={onClear}
          onValueChange={onSearchChange}
          type='search'
        />
        <Button color="primary" endContent={<PlusIcon />} onPress={() => { handleOpen('create') }}
          className='lg:w-2/12 w-1/4 self-end justify-self-end'
        >
          Nuevo Usuario
        </Button>
      </div>

      <Table
        aria-label="Table of users"
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>TELÉFONO</TableColumn>
          <TableColumn>ROL</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          {/* <TableColumn>CREACIÓN</TableColumn> */}
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'}>
          {
            users.items.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <UserNextUi
                    avatarProps={{
                      radius: 'lg',
                      src: `https://unavatar.io/${user.username}`,
                      fallback: (<UserIcon className='w-5'/>),
                      showFallback: true
                    }}
                    description={user.email}
                    name={user.name}
                  >
                    {user.email}
                  </UserNextUi>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell>
                  <Chip className="capitalize" color={mapStatusToColor(user.status)} size="sm" variant="flat">
                    {user.status}
                  </Chip>
                </TableCell>
                {/* <TableCell>
                  {
                    new Date(user.createdAt).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })
                  }
                </TableCell> */}
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Detalles">
                      <Button isIconOnly size='sm' variant='light' onPress={() => { handleOpen('details', user) }}>
                        <EyeIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Editar">
                      <Button isIconOnly size='sm' variant='light' onPress={() => { handleOpen('update', user) }}>
                        <PencilSquareIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar">
                      <Button isIconOnly size='sm' variant='light' color='danger' onPress={() => { handleOpen('delete', user) }}>
                        <TrashIcon />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      <Modal
        isOpen={ isOpen }
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody className='py-6'>
              {activeModal === 'create' && (
                <CreateUserForm
                  onClose={onClose}
                />
              )}
              {activeModal === 'delete' && user !== undefined && (
                <DeleteUserForm
                  user={user}
                  onClose={onClose}
                />
              )}
              {activeModal === 'update' && user !== undefined && (
                <UpdateUserForm
                  user={user}
                  onClose={onClose}
                />
              )}
              {activeModal === 'details' && user !== undefined && (
                <UserDetails
                  user={user}
                  onClose={onClose}
                />
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <div className='flex flex-row justify-between px-4'>
        <span className="text-small text-default-400">
          Total {users.pagination.totalRecords} usuarios
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={users.pagination.currentPage}
          total={users.pagination.totalPages}
          onChange={(page) => { setCurrentPage(page) }}
        />
      </div>

    </div>
  )
}

export default UsersBoard
