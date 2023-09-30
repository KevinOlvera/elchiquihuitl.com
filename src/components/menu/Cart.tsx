import { Modal, ModalContent, ModalHeader, ModalBody, Button, Divider, ModalFooter } from '@nextui-org/react'
import { IVA } from '../../consts'
import { TrashIcon } from '../common/Icons'
import PriceText from '../common/PriceText'
import QuantityControl from '../common/QuantityControl'
import { useAppSelector } from '../../hooks/store'
import { useCartItemActions } from '../../hooks/useCartItemActions'

interface CartProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

function Cart(props: CartProps) {
  const cartItems = useAppSelector((state) => state.cartItems)

  const { addCartItem, subCartItem, removeCartItem } = useCartItemActions()
  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      placement='auto'
      scrollBehavior='inside'
      backdrop='blur'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Resumen de Orden</ModalHeader>
            <ModalBody>
              {
                new Date().toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }

              {
                cartItems.length === 0
                  ? (<span>No hay productos en el carrito</span>)
                  : ''
              }

              {cartItems.map((item) => (
                <div
                  key={'cart-item-' + item.id}
                  className=' flex flex-col space-y-2'
                >
                  <div className="flex space-x-4 justify-between items-center">
                    <p>{item.name}</p>
                    <Button
                      isIconOnly
                      color='danger'
                      variant='light'
                      size='sm'
                      onPress={() => { removeCartItem(item) }}
                    >
                      <TrashIcon className='w-4 h-4' />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <QuantityControl
                      quantity={item.quantity}
                      onAdd={() => { addCartItem(item) }}
                      onSub={() => { subCartItem(item) }}
                    />
                    <PriceText className='text-right' value={item.price * item.quantity} currency={'MXN'} />
                  </div>
                </div>
              ))}
              <Divider />
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <PriceText className='text-right' value={cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) * (1 - IVA)} currency={'MXN'} />
                </div>
                <div className="flex justify-between">
                  <span>IVA</span>
                  <PriceText className='text-right' value={cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0) * IVA} currency={'MXN'} />
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <PriceText className='text-right' value={cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)} currency={'MXN'} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
              </Button>
              <Button color="primary" onPress={onClose}>
                    Ordenar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default Cart
