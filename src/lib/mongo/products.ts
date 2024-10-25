'use server'
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "."
import { Category, Product, Subcategories } from "@/model/product";
import { formatName } from "@/globalFunctions";

let client: MongoClient;
let db: Db;
let products: Collection<Product>;


export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
        products = db.collection('products')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}

;
(async () => {
    await init()
})

export async function querySearch(query: string) {
    try {
        if (query.length < 3) return JSON.stringify([])
        await init()
        const result = await products.aggregate([
            {
                $search: {
                    index: "default",
                    compound: {
                        should: [
                            {
                                autocomplete: {
                                    query: query,
                                    path: "searchString",
                                    fuzzy: {
                                        maxEdits: 1
                                    }
                                }
                            },
                            {
                                text: {
                                    query: query,
                                    path: "name",
                                    score: { boost: { value: 2 } } // Increase the score for exact matches
                                }
                            }
                        ]
                    }
                }
            }
        ]).toArray();
        console.log(result.length);
                
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }  
}

export async function findByBarcode(barcode: string) {
    try {
        await init()
        
        const result = await products.findOne({ _id: ObjectId.createFromTime(parseInt(barcode)) })

        return result?.barcode && JSON.stringify(result)
        
    } catch (error: any) {
        throw new Error(error)
    }  
}


export async function uploadProduct(product: Product) {
    const { barcode, name, price, description, brand, category, image, measure, subcategory } = product
    const searchString = `${name} ${brand} ${measure}`.toLowerCase().trim()

    const productPayload = {
        _id: ObjectId.createFromTime(parseInt(barcode)),
        searchString,
        barcode,
        name: formatName(name),
        price,
        brand: formatName(brand),
        description,
        image,
        measure,
        category,
        subcategory,
        stock: 0
    }

    try {
        await init()
        const result = await products.insertOne(productPayload)
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }  
}

export async function getProductsByCategory (category: Category) {

try {
    await init()
    const result = await products.find({ category },{projection:{_id: 0}}).toArray();
    return result
} catch (error: any) {
    throw new Error(error)
    
}
}
export async function getProductsBySubcategory (subcategory: Subcategories[Category]){
 
    try {
        await init()
        const result = await products.find({ subcategory },{projection:{_id: 0}}).toArray();
        return result
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function editProduct (product: Product) {
    const { barcode, name, price, description, brand, category, image, measure, subcategory } = product
    const searchString = `${name} ${brand} ${measure}`.toLowerCase().trim()

    const productPayload = {
        searchString,
        barcode,
        name: formatName(name),
        price,
        brand: formatName(brand),
        description,
        image,
        measure,
        category,
        subcategory,
        stock: 0
    }
    try {
        await init()
        const result = await products.updateOne({_id: ObjectId.createFromTime(parseInt(barcode)), barcode }, {$set: productPayload})
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }  
}