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
    id: number;
    title: string;
    price: string;
    image: string;
    lowResImage: string;
    type: ItemType;
    subType: ItemSubType;
    stretch?: 'HORIZONTAL' | 'VERTICAL';
}

export const getCards = async (): Promise<ItemCard[]> => {
    return new Promise((resolve, reject) => GSheetReader(options, (result: RawItemCard[]) => {
        resolve(result.map(item => {
            const multiplierMatch = item.price.match(/^[x|х](\d\.\d+)$/);
            return {...item, price: multiplierMatch ? 0 : Number(item.price), multiplier: multiplierMatch ? Number(multiplierMatch[1]) : 1};
        }));
    }, reject));}
