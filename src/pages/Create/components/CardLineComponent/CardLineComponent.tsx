import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CardsStore, CardLine, Card, ItemCardOnLine, cardCanBeModded, getCardStretch, calculateCardLineSum, ItemCard } from "../../store"
import { CardComponent } from '../CardComponent/CardComponent';
import style from './CardLineComponent.module.css';

type Props = {
    cardLine: CardLine;
    store: CardsStore;
}

export const CardLineComponent = observer<Props>(({store, cardLine}) => {
    const onAdd = () => {
        store.setMenuOpen(true, {cardLineId: cardLine.cardLineId});
    }
    const onRemoveCharacter = () => {
        store.removeCharacterCard(cardLine.cardLineId);
    }
    const onRemoveItem = (card: Card) => {
        store.removeItemCard(cardLine.cardLineId, card);
    }
    const onRemoveMod = (card: Card) => {
        store.removeItemMod(cardLine.cardLineId, card.id);
    }
    const onAddMode = (card: ItemCardOnLine) => {
        store.setMenuOpen(true, {cardLineItemId: card.id, cardLineId: cardLine.cardLineId});
    }
    const sum = calculateCardLineSum(cardLine);

    const onPlusCardMultiplier = () => {
        store.setCardLineMultiplier(cardLine.cardLineId, (cardLine.multiplier + 1))
    }

    const onMinusCardMultiplier = () => {
        store.setCardLineMultiplier(cardLine.cardLineId, Math.max(1, cardLine.multiplier - 1))
    }

    return <div className={style.container}>
        <div className={style.cardsContainer}>
            <div className={style.line}>
                <CardComponent
                    buttons={[
                        {title: 'Add item', function: onAdd}, 
                        {title: 'Remove character', function: onRemoveCharacter
                    }]} 
                    {...cardLine as Card}
                />
                <ReactSortable className={style.cards} list={cardLine.cards} setList={(cards) => {
                    store.setCardLineCards(cardLine.cardLineId, cards);
                }} >
                        {cardLine.cards.map((card, index) => (
                            <div className={`${getCardStretch(card.type) === 'VERTICAL' && card.mod ? style.verticalCardWithMode : style.card}`} key={`${card.id}${card.mod?.id}`}>
                                <CardComponent 
                                    buttons={[
                                        cardCanBeModded(card) && {title: card.mod ? 'Change mode' : 'Add mode', function: () => onAddMode(card)}, 
                                        {title: 'Remove item', function: () => onRemoveItem(card)
                                    }]} 
                                    key={`${index}${card.id}`} 
                                    {...card as Card}
                                />
                                {card.mod && (
                                    <CardComponent
                                        buttons={[
                                            {title: 'Remove mod', function: () => onRemoveMod(card)},
                                        ]}
                                        key={`${index}${card.mod.id}`}
                                        {...card.mod as Card}
                                    />
                                )}
                            </div>
                        ))}
                </ReactSortable>
            </div>
        </div>
        <div className={style.summary}>
            total: {sum} {cardLine.multiplier > 1 && <span>({sum / cardLine.multiplier})</span>}
            <div><Button disabled={cardLine.multiplier < 2} onClick={onMinusCardMultiplier}><MinusOutlined /></Button> x: {cardLine.multiplier} <Button onClick={onPlusCardMultiplier}><PlusOutlined /></Button></div>
        </div>
    </div>
});

CardLineComponent.displayName = 'CardLineComponent'