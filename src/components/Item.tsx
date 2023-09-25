import { useCartItemActions } from '../hooks/useCartItemActions'
import { type MenuItem } from '../types'
import { Clock, Minus, Plus, Trash } from './Icons'

interface ItemProps {
  data: MenuItem
  inCart: boolean
  quantity: number
}

function Item(props: ItemProps) {
  const { addCartItem } = useCartItemActions()

  return (
    <div
      className="flex justify-between space-x-4 border-b pb-6 border-gray-200 py-2"
    >
      <img
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
          {
            props.inCart
              ? <>
                <hr />
                <span className='flex items-center py-2 text-sm text-gray-400'>
                  <Clock /> &nbsp; 15 - 20 min
                </span>
              </>
              : ''
          }
        </div>
        <div
          className='flex flex-col items-center justify-between'
        >
          {
            props.inCart
              ? <>
                <div>
                  <span className="text-gray-600">
                    {props.data.price.toFixed(2).split('.')[0]}
                  </span>
                  <span className="text-sm text-gray-400">
                    .{props.data.price.toFixed(2).split('.')[1]}&nbsp;
                  </span>
                  <span className="text-sm text-gray-400">
                    MXN
                  </span>
                </div>
                <button
                  className='px-2 py-1 rounded-xl border text-[#dc2626] border-[#dc2626] focus:outline-none hover:bg-[#dc2626] hover:text-white transition duration-300'
                >
                  <Trash />
                </button>
                <div
                  className='flex space-x-2 py-2'
                >
                  <button
                    className='disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={props.quantity <= 1}
                  >
                    <Minus />
                  </button>
                  <span className="text-gray-600">
                    {props.quantity}
                  </span>
                  <button>
                    <Plus />
                  </button>
                </div>
              </>
              : <>
                <button
                  className='px-2 py-1 rounded-xl border text-pistachio-600 border-pistachio-600 focus:outline-none hover:bg-pistachio-600 hover:text-white transition duration-300'
                  onClick={() => { addCartItem(props.data) }}
                >
                  <Plus />
                </button>
                <div
                  className='pb-4'
                >
                  <span className="text-gray-600 text-sm">
                    {props.data.price.toFixed(2).split('.')[0]}
                  </span>
                  <span className="text-xs text-gray-400">
                    .{props.data.price.toFixed(2).split('.')[1]}&nbsp;
                  </span>
                  <span className="text-xs text-gray-400">
                    MXN
                  </span>
                </div>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Item
