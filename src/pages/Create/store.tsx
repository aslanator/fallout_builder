import { extendObservable, makeAutoObservable } from "mobx";
import { Faction, ItemSubType, ItemType } from "../../globalTypes";

export type Card = {
    id: number;
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
    defaultEquipment: string[];
}

export type CardLine = CharacterCard & {
    cards: Array<ItemCard>;
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
    cardLines: CardLine[];
    characterFilter: FilterCharacter;
    itemFilter: FilterItem;
    addMenuOpen: boolean;
    addForCharacter: number,
    setMenuOpen: (open: boolean, characterId?: number) => void;
    addNewCharacterCard: (characterCard: CharacterCard) => void;
    addItemCard: (itemCard: ItemCard, characterId: number) => void;
    removeCharacterCard: (characterId: number) => void;
    removeItemCard: (characterId: number, itemCardId: number) => void;
    changeCharacterFilter: (filter: FilterCharacter) => void;
    changeItemFilter: (filter: FilterItem) => void;
    setCardLines: (cardLines: CardLine[]) => void;
}

type Args = {
    cards: ItemCard[];
    characterCards: CharacterCard[];
    cardLines?: CardLine[];
}

export const createCardsStore = ({cards, characterCards, cardLines = []}: Args): CardsStore => {
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
        cardLines,
        characterFilter,
        itemFilter,
        addMenuOpen: false,
        addForCharacter: 0
    });

    return extendObservable(store, {
        changeCharacterFilter(filter: FilterCharacter) {
            store.characterFilter = filter;
        },
        changeItemFilter(filter: FilterItem) {
            store.itemFilter = filter;
        },
        setMenuOpen(open: boolean, characterId?: number) {
            store.addMenuOpen = open;
            if(open && characterId) {
                store.addForCharacter = characterId;
            } else {
                store.addForCharacter = 0;
            }
        },
        addNewCharacterCard(characterCard: CharacterCard) {
            store.cardLines.push({...characterCard, cards: []});
        },
        addItemCard(itemCard: ItemCard, characterId: number) {
            store.cardLines.find(line => line.id === characterId)?.cards.push(itemCard)
        },
        removeCharacterCard(characterId: number) {
            store.cardLines = store.cardLines.filter(line => line.id !== characterId);
        },
        removeItemCard(characterId: number, itemCardId: number) {
            const cardLine = store.cardLines.find(line => line.id === characterId);
            if(cardLine) {
                cardLine.cards = cardLine.cards.filter(card => card.id !== itemCardId);
            }
        },
        setCardLines(cardLines: CardLine[]) {
            store.cardLines = cardLines;
        }
    });
}