import { Button } from '@nextui-org/react'
import { useProductActions } from '../../../hooks/useProductActions'
import { type Product } from '../../../models/product'
import { toastWrapper } from '../../../services/api'
import { deleteProduct, getProducts } from '../../../services/api/products'
import { ExclamationTriangleIcon } from '../../common/Icons'

interface DeleteProductFormProps {
  product: Product
  onClose: () => void
}

function DeleteProductForm(props: DeleteProductFormProps) {
  const { setProducts, setPagination } = useProductActions()

  const handleDelete = () => {
    console.group('[DeleteProductForm][handleDelete]')
    void toastWrapper(deleteProduct(props.product.id))
      .then((result) => {
        console.log('deleteProduct', result)
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
      className='flex flex-col gap-2 py-4'
    >
      <ExclamationTriangleIcon
        className='text-yellow-500 w-24 h-24 align-middle mx-auto'
      />
      <p
        className='text-center'
      >
        ¿Seguro que quieres eliminar este producto?
      </p>

      <span className='text-2xl text-center uppercase'>{props.product.name}</span>

      <div
        className='flex flex-row gap-4 justify-center pt-4 pb-2'
      >
        <Button onPress={props.onClose} color='danger' variant='flat'>Cancelar</Button>
        <Button color='primary' onPress={handleDelete}>Continuar</Button>
      </div>
    </div>
  )
}

export default DeleteProductForm
