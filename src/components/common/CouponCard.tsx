import { Card, CardHeader, CardFooter, Button, Image } from '@nextui-org/react'
import { type Coupon } from '../../types'

interface CouponProps {
  coupon: Coupon
}

function CouponCard(props: CouponProps) {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-60"
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">{props.coupon.title}</p>
        <h4 className="text-white/90 font-medium text-xl">{props.coupon.description}</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src={props.coupon.image}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80 w-full">* {props.coupon.terms}</p>
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
          Reclamar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CouponCard
