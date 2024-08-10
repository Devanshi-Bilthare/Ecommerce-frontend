import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const FamousProductsCard = () => {
  return (
    <Card className="py-4 bg-black rounded-xl md:w-[20vw]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start text-white">
        <small className="text-default-500 uppercase">BIG screen</small>
        <p className="text-2xl capitalize font-bold">Smart  Watch Series 7</p>

        <h4 className="text-large">From $999 to &16/mo for 24 mo*</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex w-full items-center justify-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl w-full object-cover"
          src="/images/smartwatch.png"
          width={270}
        />
      </CardBody>
    </Card>
  )
}

export default FamousProductsCard