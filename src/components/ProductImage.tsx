'use client'
import { CldImage } from "next-cloudinary"

const ProductImage = ({src, alt}:{src: string, alt: string}) => {
  return (
    <figure className="w-full relative aspect-square rounded-md overflow-clip ">
    <CldImage src={src} fill alt={alt}  className="object-center object-contain py-1"/>
  </figure>  )
}

export default ProductImage