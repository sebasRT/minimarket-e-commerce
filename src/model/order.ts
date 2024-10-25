import { ObjectId } from "mongodb";

export interface OrderProduct {
    barcode: string;
    image: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
    name: string;
    category: string;
    
}

export interface Order {
    _id?: ObjectId | string;
    sessionId?: string;
    products: OrderProduct[];
    customerName: string;
    customerPhone: string;
    deliveryAddress: {
        building: number;
        apartment: number;
        unit: string;
    };
    createdAt: Date;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'delivered';
}
