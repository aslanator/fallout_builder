import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import { observer } from 'mobx-react-lite';
import { ChangeEvent } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { CardsStore, CardLine, Card, ItemCardOnLine, cardCanBeModded, getCardStretch, calculateCardLineSum } from "../../store"
import { CardComponent } from '../CardComponent/CardComponent';
import { CharacterCardComponent } from '../CharacterCardComponent/CharacterCardComponent';
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
                <CharacterCardComponent {...cardLine}>
                    <div className={style.buttons}>
                        <Button onClick={onAdd}>Add item</Button>
                        <Button onClick={onRemoveCharacter}>Remove character</Button>
                    </div>
                </CharacterCardComponent>
                <ReactSortable delay={500} delayOnTouchOnly={true} className={style.cards} list={cardLine.cards} setList={(cards) => {
                    store.setCardLineCards(cardLine.cardLineId, cards);
                }} >
                        {cardLine.cards.map((card, index) => (
                            <div className={`${getCardStretch(card) === 'VERTICAL' && card.mod ? style.verticalCardWithMode : style.card}`} key={`${card.id}${card.mod?.id}`}>
                                <CardComponent key={`${index}${card.id}`} {...card}>
                                    <div className={style.buttons}>
                                        {cardCanBeModded(card) && <Button onClick={() => onAddMode(card)}>{card.mod ? 'Change mode' : 'Add mode'}</Button>}
                                        <Button onClick={() => onRemoveItem(card)}>Remove item</Button>
                                    </div>
                                </CardComponent>
                                {card.mod && (
                                    <CardComponent key={`${index}${card.mod.id}`} {...card.mod}>
                                        <div className={style.buttons}>
                                            <Button onClick={() => onRemoveMod(card)}>Remove mod</Button>
                                        </div>
                                    </CardComponent>
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