import {productDataBuilder} from '@utils/productDataBuilder';

// TODO: add integration with GET product endpoint
export const GET_products = (): Array<ProductType> => productDataBuilder();
