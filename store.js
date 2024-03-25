import {atom} from 'jotai';

export const conditionsAtom = atom();

export const userAtom = atom({});

export const authAtom = atom(null);

export const cartItemsAtom = atom([/*{productName: 'ABC - abc hair product', quantity: 2, price: 19.99, primaryImageSmall: ""}, 
                                {productName: 'Sephora - sephora product', quantity: 1, price: 24.99, primaryImageSmall: ""}, 
{productName: 'Aveeno - Aveeno skincare product', quantity: 5, price: 89.99, primaryImageSmall: ""}*/]);

export const orderInfoAtom = atom({});