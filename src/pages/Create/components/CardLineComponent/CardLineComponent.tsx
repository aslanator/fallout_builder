import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { ReactSortable } from 'react-sortablejs';
import { CardsStore, CardLine, Card, ItemCardOnLine, cardCanBeModded, getCardStretch, calculateCardLineSum, ItemCard } from "../../store"
import { CardComponent } from '../CardComponent/CardComponent';
import style from './CardLineComponent.module.css';
import classnames from 'classnames/bind'; 

type Props = {
    cardLine: CardLine;
    store: CardsStore;
    lineIndex: number;
}

const classNames = classnames.bind(style);

export const CardLineComponent = observer<Props>(({store, cardLine, lineIndex}) => {
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

    return <div className={classNames({
                'container': true, 
                'evenLine': lineIndex % 2, 
                'oddLine': !(lineIndex % 2),
            })}>
        <div className={classNames({'cardsContainer': true})}>
            <div className={classNames({'line': true})}>
                <CardComponent
                    buttons={[
                        {title: 'Add item', function: onAdd},
                        // {title: 'Duplicate'},
                        {title: 'Delete', function: onRemoveCharacter, isDelete: true},
                    ]} 
                    {...cardLine as Card}
                />
                <ReactSortable className={style.cards} list={cardLine.cards} setList={(cards) => {
                    store.setCardLineCards(cardLine.cardLineId, cards);
                }} >
                        {cardLine.cards.map((card, index) => (
                            <div 
                                className={classNames({'card': true, 'verticalCardWithMode': getCardStretch(card.type) === 'VERTICAL' && card.mod})}
                                key={`${card.id}${card.mod?.id}`}
                            >
                                <CardComponent
                                    buttons={[
                                        cardCanBeModded(card) && {title: card.mod ? 'Change mode' : 'Add mode', function: () => onAddMode(card)}, 
                                        {title: 'Delete', function: () => onRemoveItem(card), isDelete: true}
                                    ]} 
                                    key={`${index}${card.id}`} 
                                    {...card as Card}
                                />
                                {card.mod && (
                                    <CardComponent
                                        buttons={[
                                            {title: 'Delete', function: () => onRemoveMod(card), isDelete: true},
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
            Total: {sum} {cardLine.multiplier > 1 && <span>({sum / cardLine.multiplier})</span>}
            <div><Button disabled={cardLine.multiplier < 2} onClick={onMinusCardMultiplier}><MinusOutlined /></Button> x: {cardLine.multiplier} <Button onClick={onPlusCardMultiplier}><PlusOutlined /></Button></div>
        </div>
    </div>
});

CardLineComponent.displayName = 'CardLineComponent'