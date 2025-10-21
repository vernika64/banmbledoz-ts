interface Products {
    id?: number;
    productId: string;
    productName: string;
    productPrice: number;
    productCategory: string;
}

interface ProductForms {
    PRODUCT_ID: string;
    NAME: string;
    PRICE: number;
    CATEGORY: string;
}


export { Products, ProductForms };