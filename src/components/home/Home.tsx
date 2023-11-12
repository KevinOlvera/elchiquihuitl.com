import { Button, Card, CardBody, Link } from '@nextui-org/react'

import Slider from '../common/Slider'
import CouponCard from '../common/CouponCard'
import Schedule from '../common/Schedule'

import { type Coupon } from '../../types'
import DeliveryCard from '../common/DeliveryCard'

const sliderImages = [
  'https://picsur.kovin.dev/i/6856a5fb-3f8e-482c-91f1-104b3b73f457.jpg',
  'https://picsur.kovin.dev/i/ad27b1f3-438a-46b0-aa32-cf2545cf3f2e.jpg',
  'https://picsur.kovin.dev/i/498f218a-7aef-4b71-85f2-f9689f7ed8bc.jpg',
  'https://picsur.kovin.dev/i/5b00c62d-b57c-497e-8b08-40c046207900.jpg'
]

const coupons: Coupon[] = [
  {
    id: '1',
    title: 'Cupón 1',
    description: 'Descripción del cupón 1',
    code: 'COUPON1',
    image: 'https://picsur.kovin.dev/i/b87cee72-8cd4-49a0-b4e9-9718214e929b.jpg?width=1280&height=720',
    terms: 'Términos del cupón 1',
    expiration: '2021-12-31'
  },
  {
    id: '2',
    title: 'Cupón 2',
    description: 'Descripción del cupón 2',
    code: 'COUPON2',
    image: 'https://picsur.kovin.dev/i/a5ce0565-be4f-4754-9286-134f0e8ec422.jpg?width=1280&height=720',
    terms: 'Términos del cupón 2',
    expiration: '2021-12-31'
  },
  {
    id: '3',
    title: 'Cupón 3',
    description: 'Descripción del cupón 3',
    code: 'COUPON3',
    image: 'https://picsur.kovin.dev/i/5b3445d0-5fd9-435a-a4a9-eead4ac7d012.jpg?width=1280&height=720',
    terms: 'Términos del cupón 3',
    expiration: '2021-12-31'
  }
]

function Home() {
  return (
    <main className='flex flex-col gap-4'>
      <section className='p-4'>
        {/* TODO: Dependiendo el tamaño de pantalla cambiar el tamaño de las imágenes */}
        <Slider
          images={sliderImages}
          time={5000}
          // width={1280}
          // height={720}
          width={1920}
          height={1080}
        />
      </section>
      <section className='flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 py-16 gap-4'>
        <h1 className='text-3xl font-bold w-full'>Cupones</h1>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
          {
            coupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
              />
            ))
          }
        </div>
      </section>
      <section className='flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 py-16 gap-4'>
        <h1 className='text-3xl font-bold w-full'>Nuestra Historia</h1>
        <p
          className=' text-slate-600 text-xl text-left w-full tracking-wide'
        >
          Nuestra historia comenzó en 1999, en las calles de la Ciudad de México, en un modesto carrito de hamburguesas en la calle de Apango. Desde entonces, hemos recorrido un largo camino, mejorando constantemente nuestras recetas y sabores para servirte lo mejor. Durante todos estos años, nuestro compromiso ha sido simple: brindar auténticas y deliciosas hamburguesas a nuestros comensales.
        </p>
        <p
          className='text-slate-600 text-xl text-left w-full tracking-wide'
        >
          En 2023, tomamos la valiente decisión de cambiar nuestro nombre a "El Chiquihuitl" para reflejar mejor nuestra identidad. Esta transformación representó un nuevo capítulo en nuestra historia y un compromiso continuo con la autenticidad y la calidad.
        </p>
      </section>
      <section className='flex flex-col px-4 sm:px-8 md:px-16 lg:px-32 gap-4 pb-16'>
        <Card className='p-4 bg-travertine-50 border-2 border-citron-700 shadow-none'>
          <CardBody className='grid gap-6 grid-cols-1 sm:grid-cols-2 items-center'>
            <div className='flex flex-col items-center gap-6'>
              <h1 className='text-3xl font-bold text-citron-800 text-left w-full'>Ubicación</h1>
              <p
                className='text-citron-900 text-xl text-left w-full tracking-wide'
              >
                  Estamos ubicados en la calle Apango #20, Colonia Cuautepec Barrio Alto, C.P. 07100, GAM, CDMX.
              </p>
              <Button
                as={Link}
                className='text-white bg-citron-700 w-full md:1/2 lg:w-1/3 self-start'
                variant='flat'
                color='default'
                radius='lg'
                href='https://maps.app.goo.gl/v2v6AE8yCeEmJNj97?g_st=iw'
                target='_blank'
              >
                  Llévame
              </Button>
            </div>
            <iframe
              className='h-60 w-full rounded-lg border-2 border-citron-700 border-dashed'
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBRJOigbcKqhec-wZx__JjLXH_lp7z7hKs&q=place_id:ChIJCYikPBL30YURiuCnSglSwqY"
              allowFullScreen={true}
              loading="lazy"
            />
          </CardBody>
        </Card>
      </section>
      <section className='grid lg:grid-cols-6 px-4 sm:px-8 md:px-16 lg:px-32 lg:ml-28'>
        <img
          src="https://picsur.kovin.dev/i/cfb28ae4-e9bf-4c52-a622-3e89d98606de.jpg"
          alt="delivery"
          className='object-center col-span-3 pointer-events-none'
        />
        <DeliveryCard
          className='p-4 col-span-3 h-72'
        />
      </section>
      <section className='py-16'>
        <Schedule/>
      </section>
    </main>
  )
}

export default Home
