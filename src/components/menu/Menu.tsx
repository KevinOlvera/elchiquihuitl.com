import { useEffect, useState } from 'react'

import Item from '../Item'
import { Button, Card, CardBody, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs, useDisclosure } from '@nextui-org/react'
import { type Category, type MenuItem } from '../../types'
import { FunnelIcon, SearchIcon } from '../common/Icons'
import { useAppSelector } from '../../hooks/store'
import QuantityControl from '../common/QuantityControl'
import { useCartItemActions } from '../../hooks/useCartItemActions'

const categories: Category[] = [
  {
    id: '0ae101ac-5c10-11ee-8c99-0242ac120002',
    name: 'Hamburguesas',
    description: 'Deliciosas hamburguesas con carne de res 100% de la parrilla a la mesa',
    status: 'available'
  },
  {
    id: '1ee0e01e-5c10-11ee-8c99-0242ac120002',
    name: 'Snacks',
    description: 'Deliciosos snacks para acompañar tus hamburguesas',
    status: 'available'
  },
  {
    id: '2bd3e99c-5c10-11ee-8c99-0242ac120002',
    name: 'Ensaladas',
    description: 'Deliciosas ensaladas preparadas con los mejores y más frescos ingredientes',
    status: 'available'
  },
  {
    id: '45b88c64-5c10-11ee-8c99-0242ac120002',
    name: 'Postres',
    description: 'Deliciosos postres tradicionales',
    status: 'available'
  },
  {
    id: '6bfbde12-5c10-11ee-8c99-0242ac120002',
    name: 'Bebidas',
    description: 'Deliciosas bebidas para acompañar tus hamburguesas',
    status: 'available'
  },
  {
    id: '77b03f6e-5c10-11ee-8c99-0242ac120002',
    name: 'Combos',
    description: 'Conoce nuestros combos para toda la familia',
    status: 'unavailable'
  },
  {
    id: '93ea16be-5c10-11ee-8c99-0242ac120002',
    name: 'Promociones',
    description: 'Conoce nuestras promociones y ahorra conservando el mismo sabor',
    status: 'unavailable'
  }
]

const data: MenuItem[] = [
  {
    id: '1',
    name: 'Hamburguesa sencilla',
    description: 'Deliciosa hamburguesa con carne de res 100% de primera calidad',
    price: 100.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/84743a96a55cb36ef603c512d5b97c9141c40a33-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '0ae101ac-5c10-11ee-8c99-0242ac120002',
    time: 15
  },
  {
    id: '2',
    name: 'Hamburguesa doble',
    description: 'Deliciosa hamburguesa con doble carne de res 100% de primera calidad',
    price: 50.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/238e287aa4d92d6e0cc4783e397b6e7386cd2e47-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '0ae101ac-5c10-11ee-8c99-0242ac120002',
    time: 15
  },
  {
    id: '3',
    name: 'Hamburguesa triple',
    description: 'Deliciosa hamburguesa con triple carne de res 100% de primera calidad',
    price: 200.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/741f937b50b66ff1f6314046458cf3a4ffe30d8d-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '0ae101ac-5c10-11ee-8c99-0242ac120002',
    time: 20
  },
  {
    id: '4',
    name: 'Hamburguesa de pollo',
    description: 'Deliciosa hamburguesa con carne de pollo 100% de primera calidad',
    price: 100.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/e96ea0e377da353577698176c3fd84c6a137dcce-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '0ae101ac-5c10-11ee-8c99-0242ac120002',
    time: 15
  },
  {
    id: '5',
    name: 'Hamburguesa de Champiñones',
    description: 'Deliciosa hamburguesa con champiñones 100% de primera calidad',
    price: 100.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/60712f81a07316d3300b65823ab68b59def70c8e-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '0ae101ac-5c10-11ee-8c99-0242ac120002',
    time: 18
  },
  {
    id: '6',
    name: 'Papas fritas',
    description: 'Deliciosas papas fritas',
    price: 50.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/fbf45e184fdb17a53d7568936911ec92c3928d69-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '1ee0e01e-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '7',
    name: 'Aros de cebolla',
    description: 'Deliciosos aros de cebolla',
    price: 50.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/3cbd7749633784fd04096cf4a12d500280663c02-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '1ee0e01e-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '8',
    name: 'Papas fritas con queso',
    description: 'Deliciosas papas fritas con queso',
    price: 70.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/fbf45e184fdb17a53d7568936911ec92c3928d69-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '1ee0e01e-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '9',
    name: 'Nuggets',
    description: 'Deliciosos nuggets de pollo',
    price: 50.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c9b464392dc47170833906e5956f40d3b9b811dc-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '1ee0e01e-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '10',
    name: 'Alitas de pollo',
    description: 'Deliciosas alitas de pollo',
    price: 70.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/33c78e8b9637002065dd79c71d8f72899c4b4b6a-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '1ee0e01e-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '11',
    name: 'Palitos de queso',
    description: 'Deliciosos palitos de queso',
    price: 70.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/ee7f1bd6fe6ea57b4e5d03812c9cb027394197da-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '1ee0e01e-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '12',
    name: 'Ensalada de pollo',
    description: 'Deliciosa ensalada de pollo',
    price: 100.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/4080f333898d23b323e6e0227ba89feb03d2b7b0-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '2bd3e99c-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '13',
    name: 'Ensalada de atún',
    description: 'Deliciosa ensalada de atún',
    price: 100.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/ef0a13700b3beb3b3419834700383e14a5a57adb-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '2bd3e99c-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '14',
    name: 'Ensalada César',
    description: 'Deliciosa ensalada César',
    price: 100.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c30f8ed9889cc1579af7aee44d7812812c263305-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '2bd3e99c-5c10-11ee-8c99-0242ac120002',
    time: 10
  },
  {
    id: '15',
    name: 'Helado de vainilla',
    description: 'Delicioso helado de vainilla',
    price: 50.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/6e2dce514e8228f66b4931971d8428973ccbb410-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '45b88c64-5c10-11ee-8c99-0242ac120002'
  },
  {
    id: '16',
    name: 'Flan de vainilla',
    description: 'Delicioso flan de vainilla',
    price: 50.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/37078b3ec851acc9d27a8024cfeedb7c1ce23b46-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '45b88c64-5c10-11ee-8c99-0242ac120002'
  },
  {
    id: '17',
    name: 'Coca Cola',
    description: 'Deliciosa Coca Cola',
    price: 20.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c50b5e30f0afae6cea9ccdd8eeea069bed721ee9-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '6bfbde12-5c10-11ee-8c99-0242ac120002'
  },
  {
    id: '18',
    name: 'Dr. Pepper',
    description: 'Deliciosa Dr. Pepper',
    price: 20.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/262fb42757745d9726e932fe8fb29961cf1bbce3-1400x788.png?w=1800&q=80&fit=max&auto=format',
    category: '6bfbde12-5c10-11ee-8c99-0242ac120002'
  },
  {
    id: '19',
    name: 'Sprite',
    description: 'Deliciosa Sprite',
    price: 20.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/c3cbb54bc67b9b98523f9b335f927831fe28f47b-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '6bfbde12-5c10-11ee-8c99-0242ac120002'
  },
  {
    id: '20',
    name: 'Agua',
    description: 'Deliciosa agua',
    price: 10.00,
    image: 'https://cdn.sanity.io/images/czqk28jt/prod_bk_us/0eb2b054a736c089011dba19ad43876ea34af761-1333x1333.png?w=1800&q=80&fit=max&auto=format',
    category: '6bfbde12-5c10-11ee-8c99-0242ac120002'
  }
]

function Menu() {
  const [currentCategory, setCurrentCategory] = useState('')

  useEffect(() => {
    setCurrentCategory(categories[0].id)
  }, [])

  const [search, setSearch] = useState('')

  const [menuItems, setMenuItems] = useState<MenuItem[]>(data)

  const filterByCategory = (category: string) => {
    setMenuItems(data.filter((item) => item.category === category))
  }

  const filterBySearch = (search: string) => {
    if (search === '') {
      setMenuItems([])
      return
    }
    setMenuItems(data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())))
  }

  useEffect(() => {
    setMenuItems(data)
    if (currentCategory === 'filter') {
      filterBySearch(search)
    } else if (currentCategory === 'all') {
      setMenuItems(data)
    } else {
      filterByCategory(currentCategory)
    }
  }, [currentCategory, search])

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const cartItems = useAppSelector((state) => state.cartItems)

  const { addCartItem, removeCartItem } = useCartItemActions()

  return (
    <>
      <div className=" flex flex-col p-4 space-y-4 items-center">
        <Tabs
          aria-label="Categories tabs"
          color='primary'
          variant='solid'
          size='md'
          className='overflow-x-auto flex w-full justify-center'
          disabledKeys={
            categories.filter((category) => category.status === 'unavailable').map((category) => category.id)
          }
          onSelectionChange={(item) => { setCurrentCategory(item.toString()) }}
          defaultSelectedKey={categories[0].id}
        >
          <Tab
            key={'filter'}
            title={<FunnelIcon className='w-4 h-4' />}
          >
          </Tab>
          {
            categories.map((category) => (
              <Tab
                key={category.id}
                title={category.name}
              >
              </Tab>
            ))
          }
          <Tab
            key={'all'}
            title={'Todos'}
          >
          </Tab>
        </Tabs>

        {
          currentCategory === 'filter'
            ? <Input
              placeholder="Buscar..."
              size="md"
              startContent={<SearchIcon size={18} />}
              type="search"
              variant='flat'
              onChange={(e) => { setSearch(e.target.value) }}
              value={search}
              className='w-full'
            />

            : ''
        }

        <Card isBlurred className='mt-4 border-none bg-background/60 dark:bg-default-100 w-full'>
          <CardBody className='flex space-y-4'>
            {
              menuItems.length === 0
                ? (<span>No se encontraron resultados</span>)
                : (
                  menuItems.map((item) => (
                    <div key={'page-item-' + item.name.replace(' ', '-').toLowerCase()}>
                      <Item
                        data={item}
                        quantity={cartItems.find((cartItem) => cartItem.name === item.name)?.quantity ?? 0}
                        onAdd={() => { addCartItem(item) }}
                        onRemove={() => { removeCartItem(item) }}
                      />
                      <Divider className="my-4" />
                    </div>
                  ))
                )
            }
          </CardBody>
        </Card >

        <Button
          color='primary'
          variant='flat'
          size='lg'
          className='w-full'
          onPress={onOpen}
        >
          Ver Resumen
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement='auto'
          scrollBehavior='inside'
          backdrop='blur'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Carrito</ModalHeader>
                <ModalBody>
                  <>
                    {cartItems.map((item) => (
                      <div
                        key={'cart-item-' + item.id}
                        className=' flex flex-col'
                      >
                        <div className="flex">
                          <p>{item.name}</p>
                          <p>{item.price}</p>
                        </div>
                        <p>{item.quantity}</p>
                        <QuantityControl
                          quantity={item.quantity}
                          onAdd={() => { console.log('add' + item.id) }}
                          onSub={() => { console.log('remove' + item.id) }}
                        />
                      </div>
                    ))}
                  </>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

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
                      className='px-2 py-1 rounded-xl border text-citron border-citron focus:outline-none hover:bg-citron hover:text-white transition duration-300'
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
      </div >
    </>
  )
}

export default Menu
