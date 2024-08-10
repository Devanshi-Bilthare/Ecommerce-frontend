import React from 'react'
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

const HomeCategories = () => {
    const data =[
        {
            title:"Camera",
            quantity:10,
            img:""
        },
        {
            title:"Computer Laptop",
            quantity:10,
            img:""
        },
        {
            title:"Smart Telivision",
            quantity:10,
            img:""
        },
        {
            title:"Music & Gaming",
            quantity:10,
            img:""
        },
        {
            title:"Mobiles & Tablets",
            quantity:10,
            img:""
        },
        {
            title:"HeadPhones",
            quantity:10,
            img:""
        },
        {
            title:"Accessories",
            quantity:10,
            img:""
        },
        {
            title:"Portable Speakers",
            quantity:10,
            img:""
        },
    ]
  return (
    <div className='flex flex-wrap px-[5%] bg-[#F5F5F7] justify-center pt-10'>
    {
        data.map((item)=>(
            <Card className="py-8 md:w-[320px] w-[150px] border bg-[white]">
                <CardHeader className="pb-0 pt-2 items-start justify-center flex flex-col md:flex-row gap-5 ">
                <div>
                <p className="text-tiny uppercase font-bold">{item.title}</p>
                <small className="text-default-500">12 Tracks</small>
                </div>
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    width={100}
                />
                </CardHeader>
            </Card>
        ))
    }
    
    </div>
  )
}

export default HomeCategories