import { Brand } from "../model/Brand";
import { Product } from "../model/Product";

export type CatTree = {
    id: number;
    name: string;
    imageUrl: string;
    subCategory: [],
    productWithCat: Product[],
    brandList: Brand[]
}