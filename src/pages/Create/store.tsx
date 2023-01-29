import { extendObservable, makeAutoObservable } from "mobx";
import { Faction, ItemSubType, ItemType } from "../../globalTypes";

export type OnTable = {
    id: string;
}

export type Card = {
    title: string;
    price: number;
    image: string;
    lowResImage: string;
}

export type ItemCard = Card & {
    type: ItemType;
    subType: ItemSubType;
}

export type CharacterCard = Card & {
    faction: Faction;
    availableItems: ItemSubType[];
    cards: Array<ItemCard & OnTable>;
    defaultEquipment: string[];
}

export type FilterCharacter = {
    factions: Faction[];
    priceMin: number;
    priceMax: number;
    search: string;
}

export type FilterItem = {
    types: ItemType[];
    subTypes: ItemSubType[];
    priceMin: number;
    priceMax: number;
    search: string;
}

export type CardsStore = {
    cards: ItemCard[];
    characterCards: CharacterCard[];
    characters: Record<string, CharacterCard & OnTable>;
    characterFilter: FilterCharacter;
    itemFilter: FilterItem;
    addMenuOpen: boolean;
    addForCharacter: string,
    setMenuOpen: (open: boolean, characterId?: string) => void;
    addCharacterCard: (characterCard: CharacterCard) => void;
    addItemCard: (itemCard: ItemCard, characterId: string) => void;
    removeCharacterCard: (characterId: string) => void;
    removeItemCard: (characterId: string, itemCardId: string) => void;
    changeCharacterFilter: (filter: FilterCharacter) => void;
    changeItemFilter: (filter: FilterItem) => void;
}

type Args = {
    cards: ItemCard[];
    characterCards: CharacterCard[];
    characters?: Record<string, CharacterCard & OnTable>;
}

export const createCardsStore = ({cards, characterCards, characters = {}}: Args): CardsStore => {
    const characterFilter: FilterCharacter = {
        factions: [],
        priceMin: 0,
        priceMax: 0,
        search: '',
    };

    const itemFilter: FilterItem = {
        types: [],
        subTypes: [],
        priceMin: 0,
        priceMax: 0,
        search: '',
    };

    const store = makeAutoObservable({
        cards,
        characterCards,
        characters,
        characterFilter,
        itemFilter,
        addMenuOpen: false,
        addForCharacter: ''
    });

    return extendObservable(store, {
        changeCharacterFilter(filter: FilterCharacter) {
            store.characterFilter = filter;
        },
        changeItemFilter(filter: FilterItem) {
            store.itemFilter = filter;
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