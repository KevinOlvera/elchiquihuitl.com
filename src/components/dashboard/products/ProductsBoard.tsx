import { Button, Chip, Input, Image, Modal, ModalBody, ModalContent, Pagination, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { type Product } from '../../../models/product'
import { type ProductsState } from '../../../store/products/slice'
import { useAppSelector } from '../../../hooks/store'
import { useProductActions } from '../../../hooks/useProductActions'
import { useDebounce } from '../../../hooks/useDebounce'
import { getProducts, updateStatusProduct } from '../../../services/api/products'
import { toastWrapper } from '../../../services/api'
import { PencilSquareIcon, PlusIcon, SearchIcon, TrashIcon } from '../../common/Icons'
import CreateProductForm from './CreateProductForm'
import StarRating from '../../common/StarRating'
import UpdateProductForm from './UpdateProductForm'
import DeleteProductForm from './DeleteProductForm'

function ProductsBoard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [activeModal, setActiveModal] = useState('')

  const [product, setProduct] = useState<Product>()

  const products: ProductsState = useAppSelector((state) => state.products)

  const { setProducts, setPagination, setCurrentPage } = useProductActions()

  const [filterValue, setFilterValue] = useState('')
  const debouncedFilterValue = useDebounce(filterValue, 500)

  const handleOpen = (modal: string, product?: Product) => {
    if ((modal === 'delete' || modal === 'update') && product !== undefined) {
      setProduct(product)
    }
    setActiveModal(modal)
    onOpen()
  }

  const onSearchChange = useCallback((value: string) => {
    setFilterValue(value)
  }, [])

  useEffect(() => {
    getProducts(products.pagination.currentPage, debouncedFilterValue)
      .then((result) => {
        const { data, pagination } = result.data
        setProducts(data)
        setPagination(pagination)
        setCurrentPage(pagination.currentPage > pagination.totalPages ? 1 : pagination.currentPage)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [debouncedFilterValue, products.pagination.currentPage])

  const handleStatusChange = (product: Product) => {
    console.group('[ProductsBoard][handleStatusChange]')

    void toastWrapper(updateStatusProduct(product.id, product.status === 'available' ? 'unavailable' : 'available'))
      .then((result) => {
        console.log('updateStatusProduct', result)
        void getProducts()
          .then((response) => {
            console.log('getProducts', response)
            const { data, pagination } = response.data
            setProducts(data)
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
          placeholder="Buscar producto ..."
          startContent={<SearchIcon />}
          value={filterValue}
          onValueChange={onSearchChange}
          type='search'
        />
        <Button color="primary" endContent={<PlusIcon />} onPress={() => { handleOpen('create') }}
          className='lg:w-2/12 w-1/4 self-end justify-self-end'
        >
          Nuevo Producto
        </Button>
      </div>

      <Table
        aria-label="Table of products"
        selectionMode="single"
      >
        <TableHeader>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>PRECIO</TableColumn>
          <TableColumn>CATEGORÍA</TableColumn>
          <TableColumn>PUNTUACIÓN</TableColumn>
          <TableColumn>ESTADO</TableColumn>
          <TableColumn>ACCIONES</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'}>
          {
            products.items.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div
                    className='flex flex-row items-center gap-2'
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      radius='lg'
                      className='border-2 border-default-100 w-10 h-10 object-cover'
                      fallbackSrc={'https://via.placeholder.com/40'}
                    />
                    {product.name}
                  </div>
                </TableCell>
                <TableCell>
                  <span>
                  $ {product.price.toFixed(2)}
                  </span>
                </TableCell>
                <TableCell>
                  {product.category.name}
                </TableCell>
                <TableCell>
                  <StarRating rating={product.rating} />
                </TableCell>
                <TableCell>
                  <Chip className="capitalize" color={product.status === 'available' ? 'success' : 'warning'} size="sm" variant="flat">
                    {product.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Switch
                      isSelected={product.status === 'available'}
                      aria-label="Enable Product"
                      size='sm'
                      onChange={() => { handleStatusChange(product) }}
                    />
                    <Tooltip content="Editar">
                      <Button isIconOnly size='sm' variant='light' onPress={() => { handleOpen('update', product) }}>
                        <PencilSquareIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar">
                      <Button isIconOnly size='sm' variant='light' color='danger' onPress={() => { handleOpen('delete', product) }}>
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
                <CreateProductForm onClose={onClose} />
              )}
              {activeModal === 'delete' && product !== undefined && (
                <DeleteProductForm product={product} onClose={onClose} />
              )}
              {activeModal === 'update' && product !== undefined && (
                <UpdateProductForm product={product} onClose={onClose} />
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>

      <div className='flex flex-row justify-between px-4'>
        <span className="text-small text-default-400">
          Total {products.pagination.totalRecords} productos
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color='primary'
          page={products.pagination.currentPage}
          total={products.pagination.totalPages}
          onChange={(page) => { setCurrentPage(page) }}
        />
      </div>

    </div>
  )
}

export default ProductsBoard
