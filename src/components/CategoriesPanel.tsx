import { useEffect, useState } from 'react'

import { type MenuItem, type CartItem, type MenuCategory } from '../types'
import Item from './Item'
import { useAppSelector } from '../hooks/store'

const menu: MenuCategory[] = [
  {
    id: '1',
    category: 'Hamburguesas',
    description: 'Deliciosas hamburguesas con carne de res 100% de la parrilla a la mesa',
    items: [
      {
        id: '1',
        name: 'Hamburguesa sencilla',
        description: 'Deliciosa hamburguesa con carne de res 100% de primera calidad',
        price: 10.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '2',
        name: 'Hamburguesa doble',
        description: 'Deliciosa hamburguesa con doble carne de res 100% de primera calidad',
        price: 5.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/238e287aa4d92d6e0cc4783e397b6e7386cd2e47-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '3',
        name: 'Hamburguesa triple',
        description: 'Deliciosa hamburguesa con triple carne de res 100% de primera calidad',
        price: 20.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/741f937b50b66ff1f6314046458cf3a4ffe30d8d-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '4',
        name: 'Hamburguesa de pollo',
        description: 'Deliciosa hamburguesa con carne de pollo 100% de primera calidad',
        price: 10.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/e96ea0e377da353577698176c3fd84c6a137dcce-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '5',
        name: 'Hamburguesa de Champiñones',
        description: 'Deliciosa hamburguesa con champiñones 100% de primera calidad',
        price: 10.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/60712f81a07316d3300b65823ab68b59def70c8e-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      }
    ]
  },
  {
    id: '2',
    category: 'Snacks',
    description: 'Deliciosos snacks para acompañar tus hamburguesas',
    items: [
      {
        id: '6',
        name: 'Papas fritas',
        description: 'Deliciosas papas fritas',
        price: 5.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/fbf45e184fdb17a53d7568936911ec92c3928d69-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '7',
        name: 'Aros de cebolla',
        description: 'Deliciosos aros de cebolla',
        price: 5.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/3cbd7749633784fd04096cf4a12d500280663c02-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '8',
        name: 'Papas fritas con queso',
        description: 'Deliciosas papas fritas con queso',
        price: 7.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/fbf45e184fdb17a53d7568936911ec92c3928d69-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '9',
        name: 'Nuggets',
        description: 'Deliciosos nuggets de pollo',
        price: 5.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c9b464392dc47170833906e5956f40d3b9b811dc-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '10',
        name: 'Alitas de pollo',
        description: 'Deliciosas alitas de pollo',
        price: 7.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/33c78e8b9637002065dd79c71d8f72899c4b4b6a-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '11',
        name: 'Palitos de queso',
        description: 'Deliciosos palitos de queso',
        price: 7.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/ee7f1bd6fe6ea57b4e5d03812c9cb027394197da-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      }
    ]
  },
  {
    id: '3',
    category: 'Ensaladas',
    description: 'Deliciosas ensaladas para acompañar tus hamburguesas',
    items: [
      {
        id: '12',
        name: 'Ensalada de pollo',
        description: 'Deliciosa ensalada de pollo',
        price: 10.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/4080f333898d23b323e6e0227ba89feb03d2b7b0-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '13',
        name: 'Ensalada de atún',
        description: 'Deliciosa ensalada de atún',
        price: 10.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/ef0a13700b3beb3b3419834700383e14a5a57adb-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '14',
        name: 'Ensalada César',
        description: 'Deliciosa ensalada César',
        price: 10.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c30f8ed9889cc1579af7aee44d7812812c263305-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      }
    ]
  },
  {
    id: '4',
    category: 'Postres',
    description: 'Deliciosos postres para acompañar tus hamburguesas',
    items: [
      {
        id: '15',
        name: 'Helado de vainilla',
        description: 'Delicioso helado de vainilla',
        price: 5.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/6e2dce514e8228f66b4931971d8428973ccbb410-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '16',
        name: 'Flan de vainilla',
        description: 'Delicioso flan de vainilla',
        price: 5.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/37078b3ec851acc9d27a8024cfeedb7c1ce23b46-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      }
    ]
  },
  {
    id: '5',
    category: 'Bebidas',
    description: 'Deliciosas bebidas para acompañar tus hamburguesas',
    items: [
      {
        id: '17',
        name: 'Coca Cola',
        description: 'Deliciosa Coca Cola',
        price: 2.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c50b5e30f0afae6cea9ccdd8eeea069bed721ee9-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '18',
        name: 'Dr. Pepper',
        description: 'Deliciosa Dr. Pepper',
        price: 2.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/262fb42757745d9726e932fe8fb29961cf1bbce3-1400x788.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '19',
        name: 'Sprite',
        description: 'Deliciosa Sprite',
        price: 2.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c3cbb54bc67b9b98523f9b335f927831fe28f47b-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      },
      {
        id: '20',
        name: 'Agua',
        description: 'Deliciosa agua',
        price: 1.00,
        image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/0eb2b054a736c089011dba19ad43876ea34af761-1333x1333.png?w=1800&q=80&fit=max&auto=format'
      }
    ]
  }
]

function CategoriesPanel() {
  const [currentCategory, setCurrentCategory] = useState<string>()

  const handleCategory = (category: string) => {
    setCurrentCategory(category)
  }

  useEffect(() => {
    setCurrentCategory(menu[0].category)
  }, [])

  const cartItems = useAppSelector((state) => state.cartItems)

  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: MenuItem) => {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id)
    if (index !== -1) {
      cart[index].quantity++
      setCart([...cart.slice(0, index), cart[index], ...cart.slice(index + 1)])
      return
    }
    const newCartItem: CartItem = { ...item, quantity: 1 }
    setCart([...cart, newCartItem])
  }

  const removeFromCart = (item: MenuItem) => {
    const index = cart.findIndex((cartItem) => cartItem.name === item.name)
    if (index !== -1) {
      if (cart[index].quantity === 0) {
        setCart([...cart.slice(0, index), ...cart.slice(index + 1)])
        return
      }
      cart[index].quantity--
      setCart([...cart.slice(0, index), cart[index], ...cart.slice(index + 1)])
    }
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <>
      <div className="p-4">
        <nav
          className='container mx-auto flex justify-around pb-4'
        >
          {
            menu.map((category) => (
              <div
                className="flex flex-col items-center"
                key={'category-nav-' + category.id}
              >
                <button
                  className={`text-sm font-semibold ${currentCategory === category.category ? 'text-pistachio-600 border-pistachio-600' : 'text-gray-500 border-transparent'} transition duration-300 border-b-2 focus:outline-none`}
                  onClick={() => { handleCategory(category.category) }}
                >
                  {category.category}
                </button>
              </div>
            ))
          }
        </nav>

        {
          menu.map((category) => (
            <div
              key={'category-page-' + category.id}
              className="flex flex-col justify-between p-4 space-y-4"
              style={{
                display: currentCategory === category.category ? 'flex' : 'none'
              }}>
              {
                category.items.map((item) => (
                  <Item
                    key={'page-item-' + item.name.replace(' ', '-').toLowerCase()}
                    data={item}
                    inCart={cart.find((cartItem) => cartItem.name === item.name) != null}
                    quantity={cart.find((cartItem) => cartItem.name === item.name)?.quantity ?? 0}
                  />
                ))
              }
            </div>
          ))
        }

        {/* <div
                  key={'menu-item' + item.id}
                  className="flex space-x-4 justify-between p-4 transition duration-300 border-t"
                  style={{
                    display: currentCategory === category.category ? 'flex' : 'none'
                  }}
                >
                  <img
                    className="w-24 h-24 rounded-xl object-cover object-center border border-gray-200"
                    src={item.image}
                    style={{
                      pointerEvents: 'none'
                    }}
                  />
                  <div className="flex flex-col space-y-2 w-full">
                    <span className="text-sm font-semibold text-gray-500">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.description}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <button
                      className='px-2 py-1 rounded-xl border text-pistachio-600 border-pistachio-600 focus:outline-none hover:bg-pistachio-600 hover:text-white transition duration-300'
                      onClick={() => { addToCart(item) }}
                    >
                      <Plus />
                    </button>
                    <div>
                      <span className="text-gray-600">
                        {item.price.toFixed(2).split('.')[0]}
                      </span>
                      <span className="text-sm text-gray-400">
                        .{item.price.toFixed(2).split('.')[1]}&nbsp;
                      </span>
                      <span className="text-sm text-gray-400">
                        MXN
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {
                    (cart.find((cartItem) => cartItem.name === item.name) != null)
                      ? <div className="text-sm space-x-2 flex px-4 py-2 items-center justify-center text-gray-400" key={'cart-controls' + item.id}>
                        <Clock />
                        <span className="text-sm">15 - 20 min</span>
                        <button
                          onClick={() => { removeFromCart(item) }}
                          style={
                            cart.find((cartItem) => cartItem.quantity === 1) != null
                              ? {
                                pointerEvents: 'none'
                              }
                              : {}
                          }
                        >
                          <Minus />
                        </button>
                        <span className='text-gray-600'>
                          {cart.find((cartItem) => cartItem.name === item.name)?.quantity}
                        </span>
                        <button
                          onClick={() => { addToCart(item) }}
                          className='text-gray-600'
                        >
                          <Plus />
                        </button>
                      </div>
                      : ''
                  }
                </div> */}
      </div>
    </>
  )
}

export default CategoriesPanel
