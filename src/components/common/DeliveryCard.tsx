import { useState } from 'react'
import { Button, Card, CardBody } from '@nextui-org/react'

enum DeliveryService {
  uber_eats = 'uber_eats',
  rappi = 'rappi',
  didi_food = 'didi_food'
}

const deliveryServicesUrls = {
  uber_eats: 'https://www.ubereats.com/mx/store/la-citronela/6Q8Z6ZQrQX2Q4Z6ZQrQX2Q4',
  rappi: 'https://www.rappi.com.mx/restaurantes/6Q8Z6ZQrQX2Q4Z6ZQrQX2Q4',
  didi_food: 'https://food.didiglobal.com/store/la-citronela/6Q8Z6ZQrQX2Q4Z6ZQrQX2Q4'
}

function DeliveryCard({ ...restProps }) {
  const [deliveryServiceSelected, setDeliveryServiceSelected] = useState(DeliveryService.uber_eats)

  return (
    <Card
      {...restProps}
    >
      <CardBody className='gap-4'>
        <h1 className='text-2xl font-bold w-full'>Servicio a Domicilio</h1>
        <h2>Realiza tu pedido en linea</h2>
        <div className='grid grid-cols-3 gap-4'>
          <button
            className={'items-center justify-center flex rounded-lg shadow-md border-2 border-transparent transition-all duration-300 ' + (deliveryServiceSelected === DeliveryService.uber_eats ? 'border-citron-600' : '')}
            onClick={() => { setDeliveryServiceSelected(DeliveryService.uber_eats) }}
          >
            <img src="/images/delivery/a6d9f664-b010-4f81-b1f1-49d49c3691f6.png" alt="Uber Eats Logo"
              className='h-16 py-4'
            />
          </button>
          <button
            className={'items-center justify-center flex rounded-lg shadow-md border-2 border-transparent transition-all duration-300 ' + (deliveryServiceSelected === DeliveryService.rappi ? 'border-citron-600' : '')}
            onClick={() => { setDeliveryServiceSelected(DeliveryService.rappi) }}
          >
            <img
              src="/images/delivery/31d82add-790b-4e55-89eb-e0ff2dbfb66a.png"
              alt="Rappi Logo"
              className='h-16 py-4'
            />
          </button>
          <button
            className={'items-center justify-center flex rounded-lg shadow-md border-2 border-transparent transition-all duration-300 ' + (deliveryServiceSelected === DeliveryService.didi_food ? 'border-citron-600' : '')}
            onClick={() => { setDeliveryServiceSelected(DeliveryService.didi_food) }}
          >
            <img
              src="/images/delivery/99bf5fbc-ba84-4046-bcb5-d534dca77de2.png"
              alt="Uber Eats Logo"
              className='h-16 py-2'
            />
          </button>
        </div>
        <Button
          color='primary'
          radius='lg'
          onClick={() => { window.open(deliveryServicesUrls[deliveryServiceSelected], '_blank') }}
          isDisabled
        >
            Próximamente
        </Button>
      </CardBody>
    </Card>
  )
}

export default DeliveryCard
