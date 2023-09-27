/* import { useCartItemActions } from '../hooks/useCartItemActions' */

import { Button, Image } from '@nextui-org/react'

import { ClockIcon, FireIcon, MinusIcon, PlusIcon, StartIcon, TrashIcon } from './common/Icons'
import PriceText from './common/PriceText'
import { type MenuItem } from '../types'

interface ItemProps {
  data: MenuItem
  inCart: boolean
  quantity: number
}

function Item(props: ItemProps) {
  /*   const { addCartItem } = useCartItemActions() */
  return (
    <div
      className="flex flex-col space-y-4"
    >
      <div className="flex space-x-4">
        <Image
          alt={props.data.name}
          /* Bordered or non */
          className="object-cover object-center border border-gray-200 dark:border-gray-500"
          width={96}
          height={96}
          src={props.data.image}
          isBlurred={false}
        />
        <div className='flex flex-col w-full space-y-2'>
          <div className='flex justify-between'>
            <span className='text-sm font-semibold text-gray-500 dark:text-gray-200'>{props.data.name}</span>
            {
              (props.data.time != null)
                ? <span className='flex items-center justify-end text-sm text-gray-400'>
                  <ClockIcon className='w-4 h-4 mr-1' /> {props.data.time} min
                </span>
                : ''
            }
          </div>
          <span className='text-sm text-gray-500 line-clamp-3'>
            {props.data.description}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <PriceText
          value={props.data.price}
          currency='MXN'
        />
        <span className='flex text-sm items-center text-gray-500'>
          <StartIcon className='w-4 h-4 mr-1 text-warning-500' /> 4.5
        </span>
        <span className='flex text-sm items-center text-gray-500'>
          <FireIcon className='w-4 h-4 mr-1 text-danger-500' /> 86 kcal
        </span>
        <div className='flex items-center'>
          <Button
            variant='light'
            size='sm'
            isIconOnly
          >
            <MinusIcon className='w-4 h-4' />
          </Button>
          <span className="text-gray-600 dark:text-white w-10 text-center">
            {props.quantity}
          </span>
          <Button
            variant='light'
            size='sm'
            isIconOnly
          >
            <PlusIcon className='w-4 h-4' />
          </Button>
        </div>
      </div>
      {/* <img
        className="w-24 h-24 rounded-xl object-cover object-center border border-gray-200"
        src={props.data.image}
        style={{
          pointerEvents: 'none'
        }}
      />
      <div
        className='flex space-x-4 justify-between w-full'
      >
        <div
          className='flex flex-col space-y-2'
        >
          <span className="text-sm font-semibold text-gray-500">
            {props.data.name}
          </span>
          <span className="text-sm text-gray-500 line-clamp-3">
            {props.data.description}
          </span>
        </div>
        <div
          className='flex flex-col items-right justify-center space-y-2'
        >
          {
            props.inCart
              ? <>
                {
                  (props.data.time != null)
                    ? <span className='flex items-center justify-end text-sm text-gray-400'>
                      <ClockIcon className='w-4 h-4 mr-1' /> {props.data.time} min
                    </span>
                    : ''
                }
                <PriceText
                  value={props.data.price}
                  currency='MXN'
                  className='text-right'
                />
                <div
                  className='flex items-center justify-center space-x-2'
                >
                  <Button
                    variant='light'
                    size='sm'
                    isIconOnly
                  >
                    <MinusIcon className='w-4 h-4' />
                  </Button>
                  <span className="text-gray-600">
                    {props.quantity}
                  </span>
                  <Button
                    variant='light'
                    size='sm'
                    isIconOnly
                  >
                    <PlusIcon className='w-4 h-4' />
                  </Button>
                </div>
              </>
              : <>
                <Button
                  color='primary'
                  variant='flat'
                  size='sm'
                  isIconOnly
                >
                  <PlusIcon />
                </Button>
                <PriceText
                  value={props.data.price}
                  currency='MXN'
                />
              </>
          }
        </div>
      </div> */}
    </div>
  )
}

export default Item
