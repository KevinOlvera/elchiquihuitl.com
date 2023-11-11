import DeliveryCard from '../common/DeliveryCard'
import Schedule from '../common/Schedule'

function Order() {
  return (
    <main
      className='p-8 flex flex-col items-center justify-center h-[70vh] gap-16'
    >
      <DeliveryCard
        className='w-full sm:w-2/3 md:w-1/2'
      />
      <Schedule/>
    </main>
  )
}

export default Order
