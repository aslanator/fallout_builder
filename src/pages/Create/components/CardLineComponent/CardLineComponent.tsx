import { MinusOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { CardsStore, CardLine, Card, ItemCardOnLine, calculateCardLineSum, ItemCard } from "../../store"
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

    const onOpenCardModal = (card : ItemCard | undefined) => {
        store.openCardModal(true, card);
    }

    return <div className={classNames({
                'container': true,
            })}>
        <div className={classNames({'cardsContainer': true})}>
            <div className={classNames({'line': true})}>
                <CardComponent
                    {...cardLine as Card}
                >
                    <Button className={classNames({'button': true})} onClick={onAdd}>{'Add item'}</Button>
                    <Button className={classNames({'button': true, 'deleteButton': true})} onClick={onRemoveCharacter}>{'Delete'}</Button>
                    <div className={style.summary}>
                        Total: {sum} {cardLine.multiplier > 1 && <span>({sum / cardLine.multiplier})</span>}
                        <div><Button disabled={cardLine.multiplier < 2} onClick={onMinusCardMultiplier}><MinusOutlined /></Button> x: {cardLine.multiplier} <Button onClick={onPlusCardMultiplier}><PlusOutlined /></Button></div>
                    </div>
                </CardComponent>
                <div 
                    className={classNames({'equipments': true, 'hidden': !cardLine.cards.length})}
                >
                    <div className={classNames({'oddLine': lineIndex % 2, 'evenLine': !(lineIndex % 2), 'equipmentTitle': true})}>
                        EQUIPMENT
                    </div>
                    {cardLine.cards.map((card, index) => {
                        return (
                            <div key={card.id} className={classNames({
                                'equipment': true,
                                'evenLine': (index + lineIndex % 2) % 2, 
                                'oddLine': !((index + lineIndex % 2) % 2),
                            })}>
                                <div className={classNames({'equipmentItem': true})}>
                                    <div 
                                        onClick={() => onOpenCardModal(card)} 
                                        className={classNames({
                                        'equipmentIcon': true,
                                    })}>
                                        <EyeOutlined style = {{ fontSize:'30px' }} />
                                    </div>
                                    <div className={classNames({
                                        'equipmentText': true,
                                    })}>
                                        {card.title}
                                    </div>
                                    <Button className={classNames({'button': true})} onClick={() => onAddMode(card)}>{card.mod ? 'Change mode' : 'Add mode'}</Button>
                                    <Button className={classNames({'button': true, 'deleteButton': true})} onClick={() => onRemoveItem(card)}>{'Delete'}</Button>
                                    <div className={classNames({
                                        'equipmentText': true,
                                    })}>
                                        {card.price} points
                                    </div>
                                </div>
                                {card.mod && (
                                    <div className={classNames({'equipmentItem': true, 'equipmentMod': true})}>
                                        <div
                                            onClick={() => onOpenCardModal(card.mod)} 
                                            className={classNames({
                                                'equipmentIcon': true,
                                        })}>
                                            <EyeOutlined style = {{ fontSize:'30px' }} />
                                        </div>
                                        <div className={classNames({
                                            'equipmentText': true,
                                        })}>
                                            {card.mod.title}
                                        </div>
                                        <Button className={classNames({'button': true, 'deleteButton': true})} onClick={() => onRemoveMod(card)}>{'Delete'}</Button>
                                        <div className={classNames({
                                            'equipmentText': true,
                                        })}>
                                            {card.price} points
                                        </div>
                                    </div>
                                )}
                            </div>
                        )})}
                </div>
            </div>
        </div>
    </div>
});

CardLineComponent.displayName = 'CardLineComponent'