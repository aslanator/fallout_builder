import GSheetReader from 'g-sheets-api';
import { ItemSubType, ItemType } from '../globalTypes';
import { ItemCard } from '../pages/Create/store';
import { googleApiKey } from './config';

export const options = {
    apiKey: googleApiKey,
    sheetId: '1oFGcv4k3raSgPB33V534Reausf8hTZ5PjocrLiW1V0A',
    sheetNumber: 1,
    returnAllResults: false
}

type RawItemCard = {
    title: string;
    price: string;
    image: string;
    lowResImage: string;
    type: ItemType;
    subType: ItemSubType;
}

export const getCards = async (): Promise<ItemCard[]> => {
    return new Promise((resolve, reject) => GSheetReader(options, (result: RawItemCard[]) => {
        resolve(result.map(item => {
            return {...item, price: Number(item.price)};
        }));
    }, reject));}
