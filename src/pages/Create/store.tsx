import { extendObservable, makeAutoObservable } from "mobx";
import { generateUniqId } from "../../features/uniqId";
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
    cardLineId: number;
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
    adddForCardLineId: number,
    setMenuOpen: (open: boolean, cardLineId?: number) => void;
    addNewCharacterCard: (characterCard: CharacterCard) => void;
    addItemCard: (itemCard: ItemCard, cardLineId: number) => void;
    removeCharacterCard: (cardLineId: number) => void;
    removeItemCard: (cardLineId: number, itemCardId: number) => void;
    changeCharacterFilter: (filter: FilterCharacter) => void;
    changeItemFilter: (filter: FilterItem) => void;
    setCardLines: (cardLines: CardLine[]) => void;
    setCardLineCards: (cardLineId: number, itemCards: ItemCard[]) => void;
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
        adddForCardLineId: 0
    });

    return extendObservable(store, {
        changeCharacterFilter(filter: FilterCharacter) {
            store.characterFilter = filter;
        },
        changeItemFilter(filter: FilterItem) {
            store.itemFilter = filter;
        },
        setMenuOpen(open: boolean, cardLineId?: number) {
            store.addMenuOpen = open;
            if(open && cardLineId) {
                store.adddForCardLineId = cardLineId;
            } else {
                store.adddForCardLineId = 0;
            }
        },
        addNewCharacterCard(characterCard: CharacterCard) {
            store.cardLines.push({...characterCard, cards: [], cardLineId: generateUniqId()});
        },
        addItemCard(itemCard: ItemCard, cardLineId: number) {
            store.cardLines.find(line => line.cardLineId === cardLineId)?.cards.push(itemCard)
        },
        removeCharacterCard(cardLineId: number) {
            store.cardLines = store.cardLines.filter(line => line.cardLineId !== cardLineId);
        },
        removeItemCard(cardLineId: number, itemCardId: number) {
            const cardLine = store.cardLines.find(line => line.cardLineId === cardLineId);
            if(cardLine) {
                cardLine.cards = cardLine.cards.filter(card => card.id !== itemCardId);
            }
        },
        setCardLines(cardLines: CardLine[]) {
            store.cardLines = cardLines;
        },
        setCardLineCards(cardLineId: number, cards: ItemCard[]) {
            const cardLine = store.cardLines.find(line => line.cardLineId === cardLineId);
            if(cardLine) {
                cardLine.cards = cards;
            }
        }
    });
}