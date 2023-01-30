import GSheetReader from 'g-sheets-api';
import { Faction, ItemSubType } from '../globalTypes';
import { CharacterCard } from '../pages/Create/store';
import { googleApiKey } from './config';

export const options = {
    apiKey: googleApiKey,
    sheetId: '16dSEvu2dlFC2dNtAG2NqUtX7c3FEB5A4IBjrPTJ2OB4',
    sheetNumber: 1,
    returnAllResults: false
}

type RawCharacterCard = {
    id: number;
    faction: Faction;
    availableItems: string;
    title: string;
    image: string;
    lowResImage: string;
    defaultEquipment: string;
    price: string;
}

export const getCharacters = async (): Promise<CharacterCard[]> => {
    return new Promise((resolve, reject) => GSheetReader(options, (result: RawCharacterCard[]) => {
        console.log({result})
        resolve(result.map(item => {
            return {...item, price: Number(item.price), defaultEquipment: item.defaultEquipment?.split(', ') ?? [], availableItems: item.availableItems?.split(', ') as ItemSubType[] ?? [], cards: []};
        }).sort((a, b) => {
            if (a.faction < b.faction) {
                return -1;
            }
            if (a.faction > b.faction) {
                return 1;
            }
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        }));
    }, reject));
}
