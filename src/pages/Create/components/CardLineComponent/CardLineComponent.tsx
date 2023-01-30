import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReactSortable } from 'react-sortablejs';
import { CardsStore, CardLine, Card } from "../../store"
import { CardComponent } from '../CardComponent/CardComponent';
import style from './CardLineComponent.module.css';
import {Link} from "react-router-dom";

type Props = {
    cardLine: CardLine;
    store: CardsStore;
}

export const CardLineComponent = observer<Props>(({store, cardLine}) => {
    const onRemoveCharacter = () => {
        store.removeCharacterCard(cardLine.cardLineId);
    }
    const onRemoveItem = (card: Card) => {
        store.removeItemCard(cardLine.cardLineId, card);
    }
    const sum = cardLine.price + cardLine.cards.reduce((carry, item) => carry + item.price, 0);

    return <div className={style.container}>
        <div className={style.cardsContainer}>
            <div className={style.cards}>
            <CardComponent {...cardLine} view="character">
                <div className={style.buttons}>
                    <Link to={`/create/addItem/${cardLine.cardLineId}`}><Button>Add item</Button></Link>
                    <Button onClick={onRemoveCharacter}>Remove character</Button>
                </div>
            </CardComponent>
            <ReactSortable className={style.cards} list={cardLine.cards} setList={(cards) => {
                store.setCardLineCards(cardLine.cardLineId, cards);
            }} >
                    {cardLine.cards.map((card, index) => 
                    <CardComponent key={`${index}${card.id}`} {...card} view="item">
                        <div>
                            <Button onClick={() => onRemoveItem(card)}>Remove item</Button>
                        </div>
                    </CardComponent>)}
            </ReactSortable>
            </div>
        </div>
        <div className={style.summary}>
            total: {sum}
        </div>
    </div>
});

CardLineComponent.displayName = 'CardLineComponent'