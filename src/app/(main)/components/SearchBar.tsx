'use client'
import { querySearch } from "@/lib/mongo/products"
import { Product } from "@/model/product"
import { ChangeEventHandler, useEffect, useState } from "react"
import ProductDialogCard from "./ProductDialogCard"
import ProductImage from "@/components/ProductImage"
import { useDebounceValue } from "usehooks-ts"
import { formatPrice } from "@/globalFunctions"


const SearchBar = () => {
    const [results, setResults] = useState<Product[]>([])
    const [query, setQuery] = useDebounceValue<string>("", 600);

    useEffect(() => {
        const fetchResults = async () => {
            if (query) {
                const response = await querySearch(query);
                const results = JSON.parse(response) as Product[];
                setResults(results);
            } else {
                setResults([]);
            }
        };
        fetchResults();
    }, [query]);




    return (
        <div className="bg-white relative flex-grow max-w-xl z-50 rounded-full border-gray-200 border-2 py-2">
            <input
                className="w-full outline-none px-5 bg-transparent text-2xl"
                placeholder="Qué quieres comprar ?"
                onChange={(e) => setQuery(e.target.value)}
            />
            {
                results.length > 0 &&
                <ul className="fixed left-0 md:absolute translate-y-5  w-full shadow-md " >

                    {results.map((result, index) => (
                        <ProductListItem key={result.barcode} product={result} index={index} />
                    ))}
                </ul>
            }
        </div>
    )
}

const ProductListItem = ({ product, index }: { product: Product, index: number }) => {
    const { name, brand, measure, price, image } = product;
    return (
        <li className="relative max-w-full w-full odd:bg-gray-100 even:bg-gray-50">
            <ProductDialogCard product={product} />
            <div className="flex size-full items-center">
                <div className="min-w-16 md:min-w-20">
                    <ProductImage src={image} alt={name} />
                </div>
                <div className="*:mx-2 items-baseline flex-grow max-w-full ">
                    <b className="line-clamp-1">{name}</b>
                    <span className="text-sm">{brand}</span>
                    <span className="text-sm">{measure}</span>
                </div>
                <b className="mx-2 text-nowrap text-sm">
                    {formatPrice(price)}
                </b>
            </div>
        </li>
    )
}
export default SearchBar;