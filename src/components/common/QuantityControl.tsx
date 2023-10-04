import { Button } from '@nextui-org/react'
import { MinusIcon, PlusIcon } from './Icons'

interface QuantityControlProps {
  quantity: number
  onAdd: () => void
  onSub: () => void
  className?: string
}

function QuantityControl(props: QuantityControlProps) {
  return (
    <div className={'flex items-center ' + props.className}>
      <Button
        variant='light'
        size='sm'
        isIconOnly
        onClick={() => { props.onSub() }}
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
        onClick={() => { props.onAdd() }}
      >
        <PlusIcon className='w-4 h-4' />
      </Button>
    </div>
  )
}

export default QuantityControl
