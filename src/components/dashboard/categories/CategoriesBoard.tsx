import { useCallback, useEffect, useState } from 'react'
import { getCategories, updateStatusCategory } from '../../../services/api/categories'
import { type Category } from '../../../models/category'
import { Button, Chip, Input, Modal, ModalBody, ModalContent, Pagination, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react'
import { PencilSquareIcon, PlusIcon, SearchIcon, TrashIcon } from '../../common/Icons'
import { useAppSelector } from '../../../hooks/store'
import { type CategoriesState } from '../../../store/categories/slice'
import { useCategoryActions } from '../../../hooks/useCategoryActions'
import { useDebounce } from '../../../hooks/useDebounce'
import CreateCategoryForm from './CreateCategoryForm'
import UpdateCategoryForm from './UpdateCategoryForm'
import DeleteCategoryForm from './DeleteCategoryForm'
import { toastWrapper } from '../../../services/api'

function CategoriesBoard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [activeModal, setActiveModal] = useState('')

  const [category, setCategory] = useState<Category>()

  const categories: CategoriesState = useAppSelector((state) => state.categories)

  const { setCategories, setPagination, setCurrentPage } = useCategoryActions()

  const [filterValue, setFilterValue] = useState('')
  const debouncedFilterValue = useDebounce(filterValue, 500)

  const handleOpen = (modal: string, category?: Category) => {
    if ((modal === 'delete' || modal === 'update') && category !== undefined) {
      setCategory(category)
    }
    setActiveModal(modal)
    onOpen()
  }

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value)
  }, [])

  useEffect(() => {
    getCategories(categories.pagination.currentPage, debouncedFilterValue)
      .then((result) => {
        const { data, pagination } = result.data
        setCategories(data)
        setPagination(pagination)
        setCurrentPage(pagination.currentPage > pagination.totalPages ? 1 : pagination.currentPage)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [debouncedFilterValue, categories.pagination.currentPage])

  const handleStatusChange = (category: Category) => {
    console.group('[CategoriesBoard][handleStatusChange]')

    void toastWrapper(updateStatusCategory(category.id, category.status === 'available' ? 'unavailable' : 'available'))
      .then((result) => {
        console.log('updateStatusCategory', result)
        void getCategories()
          .then((response) => {
            console.log('getCategories', response)
            const { data, pagination } = response.data
            setCategories(data)
            setPagination(pagination)
          })
      })

    console.groupEnd()
  }

  return (
    <div
      className='flex flex-col px-6 pt-6 gap-6 w-full h-full'
    >
      <div className='flex flex-row gap-6'>
        <Input
          // isClearable
          placeholder="Buscar categoría ..."
          startContent={<SearchIcon />}
          value={filterValue}
          // onClear={onClear}
          onValueChange={onSearchChange}
          type='search'
        />
        <Button color="primary" endContent={<PlusIcon />} onPress={() => { handleOpen('create') }}
          className='lg:w-2/12 w-1/4 self-end justify-self-end'
        >
          Nueva Categoría
        </Button>
      </div>

      <Table
        aria-label="Table of categories"
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>PRODUCTOS</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'}>
          {
            categories.items.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.products.length}</TableCell>
                <TableCell>
                  <Chip className="capitalize" color={category.status === 'available' ? 'success' : 'warning'} size="sm" variant="flat">
                    {category.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Switch
                      isSelected={category.status === 'available'}
                      aria-label="Enable Category"
                      size='sm'
                      onChange={() => { handleStatusChange(category) }}
                    />
                    <Tooltip content="Editar">
                      <Button isIconOnly size='sm' variant='light' onPress={() => { handleOpen('update', category) }}>
                        <PencilSquareIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar">
                      <Button isIconOnly size='sm' variant='light' color='danger' onPress={() => { handleOpen('delete', category) }}>
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
                <CreateCategoryForm onClose={onClose} />
              )}
              {activeModal === 'delete' && category !== undefined && (
                <DeleteCategoryForm category={category} onClose={onClose} />
              )}
              {activeModal === 'update' && category !== undefined && (
                <UpdateCategoryForm category={category} onClose={onClose} />
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <div className='flex flex-row justify-between px-4'>
        <span className="text-small text-default-400">
          Total {categories.pagination.totalRecords} categorías
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={categories.pagination.currentPage}
          total={categories.pagination.totalPages}
          onChange={(page) => { setCurrentPage(page) }}
        />
      </div>

    </div>
  )
}

export default CategoriesBoard
