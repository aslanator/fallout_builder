import { observer } from 'mobx-react-lite';
import { Card, CardsStore, CharacterCard, ItemCard } from '../../store';
import { CardComponent } from '../CardComponent/CardComponent';
import style from './Add.module.css';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { CharacterFilter } from './components/CharacterFilter/CharacterFilter';
import { filterCharacterCards, filterItemCards } from './filterCards';
import { ItemFilter } from './components/ItemFilter/ItemFilter';
import { CharacterCardComponent } from '../CharacterCardComponent/CharacterCardComponent';

type Props = {
    store: CardsStore;
}

export const Add = observer<Props>(({store}) => {
    const cardLineId = store.addMenuOptions.cardLineId;
    const cardLineItemId = store.addMenuOptions.cardLineItemId;
    const cards = cardLineId || cardLineItemId ? filterItemCards(store.cards, store.itemFilter) : filterCharacterCards(store.characterCards, store.characterFilter);
    const filter = cardLineId || cardLineItemId ? <ItemFilter store={store}/> : <CharacterFilter store={store} />
    const onClose = () => {
        store.setMenuOpen(false, {});
    }
    const addCard = (card: Card) => {
        if(cardLineItemId && cardLineId) {
            const addingCard = store.cards.filter(({title}) => card.title === title);
            store.addItemMod(addingCard[0], cardLineId, cardLineItemId);
        } else if(cardLineId) {
            const addingCard = store.cards.filter(({title}) => card.title === title);
            if(addingCard.length === 0) {
                toast(`not found card with title "${card.title}"`);
                onClose();
                return;
            }
            if(addingCard.length > 1) {
                toast(`multiple cards with title "${card.title}"`);
            }
            const character = store.cardLines.find(cardLine => cardLine.cardLineId === cardLineId);
            if(!character) {
                toast(`trying to add card to character with id ${cardLineId} that does not exists`);
                onClose();
                return;
            }
            store.addItemCard(addingCard[0], cardLineId);
        }
        else {
            const addingCard = store.characterCards.filter(({title}) => card.title === title);
            if(addingCard.length === 0) {
                toast(`not found card with title "${card.title}"`);
                onClose();
                return;
            }
            if(addingCard.length > 1) {
                toast(`multiple cards with title "${card.title}"`);
            }
            store.addNewCharacterCard(addingCard[0]);
        }
        onClose();
    };
    return (
    <div className={style.container}>
        <Button onClick={onClose}>Close</Button>
        {filter}
        <div className={style.cards}>
            {cards.map((card) => 
            <button key={card.id} className={style.card} onClick={() => addCard(card)}>
                {cardLineId || cardLineItemId  ? <CardComponent {...card as ItemCard} /> : <CharacterCardComponent {...card as CharacterCard} />}
            </button>)}
        </div>
    </div>
    )
});

Add.displayName = 'Add';