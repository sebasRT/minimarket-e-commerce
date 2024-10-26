import { getPendingOrders } from "@/lib/mongo/orders"
import { Order } from "@/model/order"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, response: NextResponse) {
    const res = await getPendingOrders() 
    const pendingOrders = JSON.parse(res) as Order[]
    return NextResponse.json(pendingOrders,
        {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, application/json',
            },
        }
    )
}