import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { CardsStore, CharacterCard, OnTable } from "../../store"
import { CardComponent } from '../CardComponent/CardComponent';
import style from './Character.module.css';

type Props = {
    character: CharacterCard & OnTable;
    store: CardsStore;
}

export const Character = observer<Props>(({store, character}) => {
    const onAdd = () => {
        store.setMenuOpen(true, character.id);
    }
    const onRemoveCharacter = () => {
        store.removeCharacterCard(character.id);
    }
    const onRemoveItem = (itemCardId: string) => {
        store.removeItemCard(character.id, itemCardId);
    }
    const sum = character.price + character.cards.reduce((carry, item) => carry + item.price, 0);

    return <div className={style.container}>
        <div className={style.cardsContainer}>
            <div className={style.cards}>
            <CardComponent {...character} view="character">
                <div className={style.buttons}>
                    <Button onClick={onAdd}>Add item</Button>
                    <Button onClick={onRemoveCharacter}>Remove character</Button>
                </div>
            </CardComponent>
            {character.cards.map(card => 
            <CardComponent key={card.id} {...card} view="item">
                <div>
                    <Button onClick={() => onRemoveItem(card.id)}>Remove item</Button>
                </div>
            </CardComponent>)}
            </div>
        </div>
        <div className={style.summary}>
            total: {sum}
        </div>
    </div>
});

Character.displayName = 'Character'