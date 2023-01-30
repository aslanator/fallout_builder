import { observer } from 'mobx-react-lite';
import { Card, CardsStore, CharacterCard } from '../../store';
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
    const cardLineId = store.adddForCardLineId;
    const cards = cardLineId ? filterItemCards(store.cards, store.itemFilter) : filterCharacterCards(store.characterCards, store.characterFilter);
    const filter = cardLineId ? <ItemFilter store={store}/> : <CharacterFilter store={store} />
    const onClose = () => {
        store.setMenuOpen(false);
    }
    const addCard = (card: Card) => {
        if(cardLineId) {
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
            console.log(cardLineId)
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
                {cardLineId ? <CardComponent view={'item'} {...card} /> : <CharacterCardComponent {...card as CharacterCard} />}
            </button>)}
        </div>
    </div>
    )
});

Add.displayName = 'Add';