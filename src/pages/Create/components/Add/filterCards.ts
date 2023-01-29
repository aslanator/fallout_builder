import { CharacterCard, FilterCharacter, FilterItem, ItemCard } from "../../store"

export const filterCharacterCards = (cards: CharacterCard[], {priceMin, priceMax, search, factions}: FilterCharacter) => {
    const searchRegexp = new RegExp(`${search.replace('.', '\\.').replace('*', '.*')}`, 'i');
    const filteredCards = cards.filter(card => {
        if(priceMin && card.price < priceMin) {
            return false;
        }
        if(priceMax && card.price > priceMax) {
            return false;
        }
        if(search && !searchRegexp.test(card.title)) {
            return false;
        }
        if(factions.length > 0 && !factions.includes(card.faction)) {
            return false;
        }
        return true;
    })
    
    return filteredCards;
}

export const filterItemCards = (cards: ItemCard[], {priceMin, priceMax, types, subTypes, search}: FilterItem) => {
    const filteredCards = cards.filter(card => {
        if(priceMin && card.price < priceMin) {
            return false;
        }
        if(priceMax && card.price > priceMax) {
            return false;
        }
        if(search && !new RegExp(`${search}`).test(card.title)) {
            return false;
        }
        if(types.length > 0 && !types.includes(card.type)) {
            return false;
        }
        if(subTypes.length > 0 && !subTypes.includes(card.subType)) {
            return false;
        }
        return true;
    })
    return filteredCards;
}