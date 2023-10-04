import { useState } from 'react'
import { Button, Image, Skeleton } from '@nextui-org/react'

import PriceText from '../common/PriceText'
import QuantityControl from '../common/QuantityControl'
import { type MenuItem } from '../../types'

import { ClockIcon, FireIcon, PlusIcon, StartIcon } from '../common/Icons'

interface ItemProps {
  data: MenuItem
  quantity: number
  onAdd: () => void
  onRemove: () => void
}

function Item(props: ItemProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      className="flex flex-col space-y-2"
    >
      <div className="flex space-x-4">
        <Skeleton isLoaded={isLoaded} className='rounded-xl'>
          <Image
            alt={props.data.name}
            /* Bordered or non */
            className="object-cover object-center border border-gray-200 dark:border-gray-500"
            width={96}
            height={96}
            src={props.data.image}
            isBlurred={false}
            onLoad={() => { setIsLoaded(true) }}
          />
        </Skeleton>
        <div className='flex flex-col w-full space-y-2'>
          <div className='flex justify-between'>
            <Skeleton isLoaded={isLoaded} className='rounded-md'>
              <span className='text-sm font-semibold text-gray-500 dark:text-gray-200 align-top'>{props.data.name}</span>
            </Skeleton>
            {
              (props.data.time != null)
                ? <div className='flex items-start justify-end w-20'>
                  <Skeleton isLoaded={isLoaded} className='rounded-md'>
                    <span className='flex items-center justify-end text-sm text-gray-400'>
                      <ClockIcon className='w-4 h-4 mr-1' /> {props.data.time} min
                    </span>
                  </Skeleton>
                </div>
                : ''
            }
          </div>
          <span className='text-sm text-gray-500 line-clamp-3'>
            <Skeleton isLoaded={isLoaded} className='rounded-md'>
              {props.data.description}
            </Skeleton>
          </span>
        </div>
      </div>
      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <div className="flex justify-between items-center">
          <PriceText
            value={props.data.price}
            currency='MXN'
            className='w-24'
          />
          <span className='flex text-sm items-center text-gray-500'>
            <StartIcon className='w-4 h-4 mr-1 text-warning-500' /> 4.5
          </span>
          <span className='flex text-sm items-center text-gray-500'>
            <FireIcon className='w-4 h-4 mr-1 text-danger-500' /> 86 kcal
          </span>
          {
            (props.quantity === 0)
              ? <div className='w-28 flex items-center justify-end space-x-2'>
                <Button
                  isIconOnly
                  color='primary'
                  variant='flat'
                  size='sm'
                  onClick={() => { props.onAdd() }}
                >
                  <PlusIcon className='w-4 h-4' />
                </Button>
              </div>
              : <div className='w-28 flex items-center justify-end'>
                <QuantityControl
                  quantity={props.quantity}
                  onAdd={() => { props.onAdd() }}
                  onSub={() => { props.onRemove() }}
                  className='flex md:hidden'
                />
                <Button
                  isIconOnly
                  color='primary'
                  variant='flat'
                  size='sm'
                  onClick={() => { props.onAdd() }}
                  className='hidden md:flex'
                >
                  <PlusIcon className='w-4 h-4' />
                </Button>
              </div>
          }
        </div>
      </Skeleton>
    </div>
  )
}

export default Item
