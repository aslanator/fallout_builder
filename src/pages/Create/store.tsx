import { extendObservable, makeAutoObservable } from "mobx";
import { Faction, ItemType } from "../../globalTypes";

export type OnTable = {
    id: string;
}

export type Card = {
    title: string;
    price: number;
    image: string;
}

export type ItemCard = Card & {
    itemType: ItemType;
}

export type CharacterCard = Card & {
    faction: Faction;
    availableItems: ItemType[];
    cards: Array<ItemCard & OnTable>;
    defaultEquipment: string[];
}

export type FilterModel = {
    factions: Faction[];
    itemTypes: ItemType[];
    priceMin: number;
    priceMax: number;
    search: string;
}

export type CardsStore = {
    cards: ItemCard[];
    characterCards: CharacterCard[];
    characters: Record<string, CharacterCard & OnTable>;
    filter: FilterModel;
    addMenuOpen: boolean;
    addForCharacter: string,
    setMenuOpen: (open: boolean, characterId?: string) => void;
    addCharacterCard: (characterCard: CharacterCard) => void;
    addItemCard: (itemCard: ItemCard, characterId: string) => void;
    removeCharacterCard: (characterId: string) => void;
    removeItemCard: (characterId: string, itemCardId: string) => void;
    changeFilter: (filter: FilterModel) => void;
}

type Args = {
    cards: ItemCard[];
    characterCards: CharacterCard[];
    characters?: Record<string, CharacterCard & OnTable>;
}

export const createCardsStore = ({cards, characterCards, characters = {}}: Args): CardsStore => {
    const filter: FilterModel = {
        factions: [],
        itemTypes: [],
        priceMin: 0,
        priceMax: 0,
        search: '',
    };

    const store = makeAutoObservable({
        cards,
        characterCards,
        characters,
        filter,
        addMenuOpen: false,
        addForCharacter: ''
    });

    return extendObservable(store, {
        changeFilter(filter: FilterModel) {
            store.filter = filter;
        },
        setMenuOpen(open: boolean, characterId?: string) {
            store.addMenuOpen = open;
            if(open && characterId) {
                store.addForCharacter = characterId;
            } else {
                store.addForCharacter = '';
            }
        },
        addCharacterCard(characterCard: CharacterCard) {
            const id = Date.now().toString();
            store.characters[id] = {...characterCard, id};
        },
        addItemCard(itemCard: ItemCard, characterId: string) {
            const id = Date.now().toString();
            store.characters[characterId].cards.push({...itemCard, id})
        },
        removeCharacterCard(characterId: string) {
            delete store.characters[characterId];
        },
        removeItemCard(characterId: string, itemCardId: string) {
            store.characters[characterId].cards = store.characters[characterId].cards.filter(card => card.id !== itemCardId);
        }
    });
}