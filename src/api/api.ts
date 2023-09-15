import { CreateClientParams, createClient } from 'contentful';
import {
    Product
} from '../models';

const spaceId: string = process.env.REACT_APP_CONTENTFUL_SPACE_ID ? process.env.REACT_APP_CONTENTFUL_SPACE_ID : '';
const accessToken: string = process.env.REACT_APP_CONTENT_DELIVERY_API_ACCESSTOKEN ? process.env.REACT_APP_CONTENT_DELIVERY_API_ACCESSTOKEN : '';
// console.log("accessToken", accessToken);
const clientParams: CreateClientParams = { space: spaceId, accessToken: accessToken };
// console.log("clientParams", clientParams);
const client = createClient(clientParams);

async function getEntries(contentType: string) {
    const cEntries: any = [];
    await client
        .getEntries({
            content_type: contentType,
        })
        .then(function (entries) {
            // // console.log(JSON.stringify(entries));
            entries.items.forEach(function (entry) {
                cEntries.push(entry.fields);
                // // console.log(JSON.stringify(entry.fields));
            });
        });
    // // console.log(cEntries)
    return cEntries;
}

export const getProducts = async () => {
    const products: Array<Product> = await getEntries('product');
    // console.log(products);
    return products;
}
