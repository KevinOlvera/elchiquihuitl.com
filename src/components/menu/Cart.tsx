import { Button, Card, CardBody, CardHeader, Divider } from '@nextui-org/react'

import { TrashIcon } from '../common/Icons'
import QuantityControl from '../common/QuantityControl'
import PriceText from '../common/PriceText'
import { useAppSelector } from '../../hooks/store'
import { useCartItemActions } from '../../hooks/useCartItemActions'
import { IVA } from '../../consts'

function Cart() {
  const cartItems = useAppSelector((state) => state.cartItems)

  const { addCartItem, subCartItem, removeCartItem } = useCartItemActions()
  return (
    <Card isBlurred className='py-4 border-none bg-background/60 dark:bg-default-100'>
      <CardHeader className="flex-col">
        <p className="text-tiny uppercase font-bold hidden">#00023</p>
        <h4 className=" font-medium text-large">Resumen de Orden</h4>
        <span className='text-small'>
          {
            new Date().toLocaleDateString('es-MX', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          }
        </span>
      </CardHeader>
      <CardBody className='flex space-y-2'>

        {
          cartItems.length === 0
            ? (<span>No hay productos en tu carrito</span>)
            : ''
        }

        {cartItems.map((item) => (
          <div
            key={'cart-item-' + item.id}
            className=' flex flex-col'
          >
            <div className="flex space-x-4 justify-between items-center text-small">
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

        <Button
          color='primary'
          variant='flat'
          size='lg'
          className='w-full'
          /* onPress={onOpen} */
        >
                  Ordenar
        </Button>

      </CardBody>
    </Card>

  )
}

export default Cart
