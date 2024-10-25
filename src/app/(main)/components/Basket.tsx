'use client'
import useCart from './useCart'
import { useState } from 'react'
import CartList from './CartList'
import { LuShoppingBasket } from 'react-icons/lu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

const Basket = () => {
    const pathname = usePathname()
    const [openCartList, setOpenCartList] = useState(false)
    const { itemsCount } = useCart()

    const moveBasketToCorner = pathname === "/checkout" || pathname.startsWith("/order")
    return (
        <>
            <section className='fixed bottom-0 text-6xl -translate-x-1/2 text-blue-900 p-1 my-2 bg-blue-100 rounded-full shadow-md' style={{ left: moveBasketToCorner ? "3rem" : "50%", transition: "left 0.5s ease-out" }} onClick={() => setOpenCartList(!openCartList)}>
                {
                    itemsCount > 0 &&
                    <div className='absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-7 aspect-square bg-green-500 grid place-items-center'>
                        <b className='text-lg font-mono text-white'>{itemsCount}</b>
                    </div>
                }

                <LuShoppingBasket />
            </section>
            <CartList openCartList={openCartList} setOpenCartList={setOpenCartList} />
            {
                moveBasketToCorner &&
                <Link href='/' className='fixed m-3 p-2 bottom-0 right-0 flex font-semibold items-center gap-3 bg-white rounded-full shadow-md' >
                    <IoIosArrowBack className='text-xl' />
                    <span>Seguir comprando</span>
                </Link>
            }
        </>
    )
}

export default Basket