'use server'
import { Collection, Db, MongoClient, ObjectId } from "mongodb";
import clientPromise from "."
import { Order } from "@/model/order";
import { cookies } from "next/headers";

let client: MongoClient;
let db: Db;
let orders: Collection<Order>;

export async function init() {
    if (db) return
    try {
        client = await clientPromise
        db = client.db("minimarket")
        orders = db.collection('orders')
    } catch (error) {
        throw new Error('Failed to stablish connection to database')
    }
}
;
(async () => {
    await init()
})

export async function uploadOrder(order: Order) {

    const getSessionId = () => {
        const sessionId = cookies().get('sessionId')?.value
        if (!sessionId) {const id = crypto.randomUUID(); cookies().set('sessionId', id); return id}
        return sessionId
    }

    try {
        await init()
        const result = await orders.insertOne({ sessionId: getSessionId(), ...order })
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function getOrdersByCustomerPhone() {
    const phone = cookies().get('customerPhone')?.value
    if (!phone) return JSON.stringify([]);
    try {
        await init()
        const result = await orders.find({ customerPhone: phone }).toArray()
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}
export async function getOrdersBySessionId() {
    const sessionId = cookies().get('sessionId')?.value
    if (!sessionId) return JSON.stringify([]);
    try {
        await init()
        const result = await orders.find({ sessionId }).toArray()
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}
export async function getOrderById(id: string) {
    try {
        await init()
        const result = await orders.findOne({ _id: new ObjectId(id) })
        return JSON.stringify(result)
    } catch (error: any) {
        throw new Error(error)
    }
}