import { Brand } from "../model/Brand";

export type PopularProductWithCat =  {
    id: number;
    name: string;
    imageUrl: string;
    subCategories : Partial<SubCategory>[]
}


export type SubCategory = {
    id: number;
    name: string;
    imageUrl: string;
    parentId: number;
    products : Partial<ProductWithCat> []
}
 export type ProductWithCat = {
    id: number;
    name: string;
    images : string[];
    price: number;
    discount: number;
    brand: Partial<Brand>
 }