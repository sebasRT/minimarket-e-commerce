import { ObjectId } from "mongodb";

export type Brand = "Alpina" | "Colanta" | "Pepsi" | "Coca Cola" | "Bavaria" | "Postobon" | "Nestle" | "Doria" | "Quala" | "Nutresa" | "Mondelez" | "Unilever" | "Johnson & Johnson" | "Bayer" | "Bimbo" | "Grupo Familia" | "Ramo";

export type Subcategories = {
    canastaFamiliar: 'parva' | 'arepas' | 'granos' | 'lácteos' | 'enlatados' | 'aceites' | 'matequillas'  | 'condimentos' | 'otros';
    higienePersonal: 'crema dental' | 'jabón' | 'shampoo' | 'desodorante' | 'talco' | 'toallas higiénicas' | 'cepillo de dientes' | 'papel higiénico'  ;
    mecato: 'paquetes' | 'helados' | 'gomitas' | 'chocolates' | 'galletas'| 'snacks' | 'dulces' | 'otros' ;
    licor: 'vino' | 'whisky'  | 'tequila' | 'vodka' | 'cerveza' | 'ron' | 'aguardiente' | 'otros';
    aseo: 'jabón en polvo' | 'lavaloza' | 'limpiadores' | 'esponjas' | 'detergente' | 'cloro' | 'suavizante' | 'otros';
    bebidas: 'gaseosas' | 'jugos' | 'agua' | 'té' | 'café' | 'leche' | 'bebidas energéticas' | 'otros';
    mascotas: 'juguetes' | 'alimento' | 'accesorios' | 'higiene' | 'otros';   
};

export type Category = keyof Subcategories;

export interface Product {
    barcode: string;
    name: string;
    measure: string;
    price: number;
    brand: Brand | string;
    description: string;
    image: string;
    category: Category;
    subcategory: Subcategories[Category];
    stock?: number;
}

export interface ProductByCategory<T extends Category> {
    _id?: ObjectId | string;
    barcode: string;
    name: string;
    quantity: string;
    price: number;
    brand: Brand | string;
    description: string;
    image: string;
    category: T;
    subcategory: Subcategories[T];
}
