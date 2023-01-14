import { CharacterCard, FilterModel, ItemCard } from "../../store"

export const filterCharacterCards = (cards: CharacterCard[], {priceMin, priceMax, search, factions}: FilterModel) => {
    console.log({priceMin, priceMax})
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
        if(factions.length > 0 && !factions.includes(card.faction)) {
            return false;
        }
        return true;
    })
    
    return filteredCards;
}

export const filterItemCards = (cards: ItemCard[], {priceMin, priceMax, itemTypes, search}: FilterModel) => {
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
        if(itemTypes.length > 0 && !itemTypes.includes(card.itemType)) {
            return false;
        }
        return true;
    })
    return filteredCards;
}