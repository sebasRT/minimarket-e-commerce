'use client'

import { Product } from "@/model/product"
import { IoIosAddCircle } from "react-icons/io"
import ProductDialogCard from "./ProductDialogCard"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { addProduct, CartProduct } from "@/lib/redux/reducers/cart"
import { IoAdd } from "react-icons/io5"

const AddToCart = ({ product }: { product: Product }) => {
    const { name, barcode, price, brand, image, measure,category } = product

    const dispatch = useAppDispatch()

    const cartProduct: CartProduct = {
        name,
        barcode,
        price,
        brand,
        image,
        category,
        measure,
        quantity: 1
    }

    const addToCart = () => {

        dispatch(addProduct(cartProduct))
    }
    const quantity = useAppSelector(state => state.cart.value.find((v) => v.barcode === barcode))?.quantity

    return (
        <>

            {quantity &&
                <div className="absolute start-0 bg-green-500 z-20 w-6 aspect-square rounded-full grid place-items-center">
                    <b className="text-white font-mono">{quantity}</b>
                </div>
            }
            <IoAdd className="opacity-50 active:scale-75 lg:opacity-0 group-hover:opacity-100 transition bg-blue-500 rounded-full absolute z-20 text-3xl end-0 translate-x-2 -translate-y-2 stroke-white cursor-pointer select-none"
                title="Añadir al carrito"
                onClick={() => addToCart()}
            />
            <ProductDialogCard product={product} />
        </>
    )
}

export default AddToCart