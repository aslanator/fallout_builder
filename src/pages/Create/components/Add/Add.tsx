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
    const characterId = store.addForCharacter;
    const cards = characterId ? filterItemCards(store.cards, store.itemFilter) : filterCharacterCards(store.characterCards, store.characterFilter);
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
            const character = store.cardLines[characterId];
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
            store.addNewCharacterCard({...addingCard[0]});
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
                {characterId ? <CardComponent view={'item'} {...card} /> : <CharacterCardComponent {...card as CharacterCard} />}
            </button>)}
        </div>
    </div>
    )
});

Add.displayName = 'Add';