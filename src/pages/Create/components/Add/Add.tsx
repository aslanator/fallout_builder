import { observer } from 'mobx-react-lite';
import { Card, CardsStore } from '../../store';
import { CardComponent } from '../CardComponent/CardComponent';
import style from './Add.module.css';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { CharacterFilter } from './components/CharacterFilter/CharacterFilter';
import { filterCharacterCards, filterItemCards } from './filterCards';
import { ItemFilter } from './components/ItemFilter/ItemFilter';

type Props = {
    store: CardsStore;
}

export const Add = observer<Props>(({store}) => {
    const characterId = store.addForCharacter;
    const cards = characterId ? filterItemCards(store.cards, store.filter) : filterCharacterCards(store.characterCards, store.filter);
    const filter = characterId ? <ItemFilter store={store}/> : <CharacterFilter store={store} />
    const onClose = () => {
        store.setMenuOpen(false);
    }
    const addCard = (card: Card) => {
        if(characterId) {
            const addingCard = store.cards.filter(({title}) => card.title === title);
            if(addingCard.length === 0) {
                toast(`not found card with title "${card.title}"`);
                onClose();
                return;
            }
            if(addingCard.length > 1) {
                toast(`multiple cards with title "${card.title}"`);
            }
            const character = store.characters[characterId];
            if(!character) {
                toast(`trying to add card to character with id ${characterId} that does not exists`);
                onClose();
                return;
            }
            store.addItemCard({...addingCard[0]}, characterId);
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
            store.addCharacterCard({...addingCard[0], cards: []});
        }
        onClose();
    };
    return (
    <div className={style.container}>
        <Button onClick={onClose}>Close</Button>
        {filter}
        <div className={style.cards}>
            {cards.map(card => <button key={card.title} className={style.card} onClick={() => addCard(card)}><CardComponent type={characterId ? 'item' : 'character'} {...card} /></button>)}
        </div>
    </div>
    )
});

Add.displayName = 'Add';