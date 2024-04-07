export type Product = {
    id: number;
    name: string;
    description: string;
    technicalInfo: string;
    productInfo: string;
    price: number;
    categoryId: number;
    brandId: number;
    images: string[];
    status: string;
    quantity: number;
    discount: number;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
}