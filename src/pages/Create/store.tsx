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


export type ItemCardOnLine = ItemCard & {
    id: number;
    mod?: ItemCard
}

export type CharacterCard = Card & {
    faction: Faction;
    availableItems: ItemSubType[];
    defaultEquipment: string[];
}

export type CardLine = CharacterCard & {
    cards: Array<ItemCardOnLine>;
    cardLineId: number;
    multiplier: number;
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

type AddMenuOptionsArg = { cardLineId: number; cardLineItemId: number;} 
| {cardLineId: number, cardLineItemId?: undefined}
| {cardLineId?: undefined, cardLineItemId?: undefined};

export type CardsStore = {
    cards: ItemCard[];
    characterCards: CharacterCard[];
    cardLines: CardLine[];
    characterFilter: FilterCharacter;
    itemFilter: FilterItem;
    addMenuOpen: boolean;
    addMenuOptions: {
        cardLineId: number;
        cardLineItemId: number;
    },
    setMenuOpen: (open: boolean, options: AddMenuOptionsArg) => void;
    addNewCharacterCard: (characterCard: CharacterCard) => void;
    addItemCard: (itemCard: ItemCard, cardLineId: number) => void;
    removeCharacterCard: (cardLineId: number) => void;
    removeItemCard: (cardLineId: number, card: Card) => void;
    changeCharacterFilter: (filter: FilterCharacter) => void;
    changeItemFilter: (filter: FilterItem) => void;
    setCardLines: (cardLines: CardLine[]) => void;
    setCardLineCards: (cardLineId: number, itemCards: ItemCard[]) => void;
    addItemMod: (itemCard: ItemCard, cardLineId: number, cardLineItemId: number) => void;
    removeItemMod: (cardLineId: number, cardLineItemId: number) => void;
    setCardLineMultiplier: (cardLineId: number, multiplier: number) => void;
}

type Args = {
    cards: ItemCard[];
    characterCards: CharacterCard[];
    cardLines?: CardLine[];
}

type Stretch = 'VERTICAL' | 'HORIZONTAL';

export const getCardStretch = (type: string): Stretch => {
    if(["Alcohol", "Chem", "Power Armor"].includes(type)){
        return 'VERTICAL';
    }
    return 'HORIZONTAL';
}

export const cardCanBeModded = (card: ItemCard): boolean => {
    return ['Armor', 'Clothes', 'Melee','Pistol', 'Rifle', 'Heavy Weapon', 'Thrown Weapon', 'Power Armor'].includes(card.type);
}

export const calculateCardLineSum = (cardLine: CardLine) => {
    return (cardLine.price + cardLine.cards.reduce((carry, item) => carry + item.price + (item.mod?.price || 0), 0)) * cardLine.multiplier;
}

export const calculateTotalSum = (cardLines: CardLine[]) => {
    return cardLines.reduce((carry, cardLine) => carry + calculateCardLineSum(cardLine), 0);
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
        addMenuOptions: {
            cardLineId: 0,
            cardLineItemId: 0
        }
    });

    return extendObservable(store, {
        changeCharacterFilter(filter: FilterCharacter) {
            store.characterFilter = filter;
        },
        changeItemFilter(filter: FilterItem) {
            store.itemFilter = filter;
        },
        setMenuOpen(open: boolean, {cardLineId, cardLineItemId}: AddMenuOptionsArg) {
            store.addMenuOpen = open;
            if (open && cardLineItemId) {
                store.addMenuOptions = {
                    cardLineId,
                    cardLineItemId
                }
                store.itemFilter = {...store.itemFilter, types: ["Mod"]};
            } else if(open && cardLineId) {
                store.addMenuOptions = {
                    cardLineId,
                    cardLineItemId: 0
                }
                const defaultItems = store.cardLines.find(cardLine => cardLine.cardLineId === cardLineId)?.availableItems || [];
            
                store.itemFilter = {...store.itemFilter, subTypes: defaultItems, types: []};

            } else {
                store.addMenuOptions = {
                    cardLineId: 0,
                    cardLineItemId: 0
                }
            }
        },
        addNewCharacterCard(characterCard: CharacterCard) {
            store.cardLines.push({...characterCard, cards: [], cardLineId: generateUniqId(), multiplier: 1});
            for(const defaultEquipment of characterCard.defaultEquipment) {
                const itemCard = store.cards.find(card => card.title === defaultEquipment);
                if(itemCard) {
                    store.cardLines[store.cardLines.length - 1].cards.push({...itemCard, id: generateUniqId(), price: 0})
                } else {
                    console.error(`Can\'t find equipment with name ${defaultEquipment}`);
                }
            }
        },
        addItemCard(itemCard: ItemCard, cardLineId: number) {
            store.cardLines.find(line => line.cardLineId === cardLineId)?.cards.push({...itemCard, id: generateUniqId()})
        },
        removeCharacterCard(cardLineId: number) {
            store.cardLines = store.cardLines.filter(line => line.cardLineId !== cardLineId);
        },
        removeItemCard(cardLineId: number, card: Card) {
            const cardLine = store.cardLines.find(line => line.cardLineId === cardLineId);
            if(cardLine) {
                cardLine.cards = cardLine.cards.filter(filteredCard => card !== filteredCard);
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
        },
        addItemMod: (itemCard: ItemCard, cardLineId: number, cardLineItemId: number) => {
            const cardLine = store.cardLines.find(line => line.cardLineId === cardLineId);
            if(cardLine) {
                const card = cardLine.cards.find(card => card.id === cardLineItemId);
                if(card) {
                    card.mod = itemCard;
                }
            }
        },
        removeItemMod: (cardLineId: number, cardLineItemId: number) => {
            const cardLine = store.cardLines.find(line => line.cardLineId === cardLineId);
            if(cardLine) {
                const card = cardLine.cards.find(card => card.id === cardLineItemId);
                if(card) {
                    card.mod = undefined;
                }
            }
        },
        setCardLineMultiplier: (cardLineId: number, multiplier: number) => {
            const cardLine = store.cardLines.find(line => line.cardLineId === cardLineId);
            if(cardLine) {
                cardLine.multiplier = multiplier;
            }
        }
    });
}