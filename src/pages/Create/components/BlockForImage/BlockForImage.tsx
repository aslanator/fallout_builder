import { observer } from 'mobx-react-lite';
import React from 'react';
import { calculateCardLineSum, CardLine, getCardStretch } from '../../store';
import style from './BlockForImage.module.css';

type Props = {
    cardLines: CardLine[];
    sum: number;
}

export const BlockForImage: React.FC<Props> = observer(({cardLines, sum}) => {
    return <div className={style.container}>
        {cardLines.map((cardLine) => {
            const price = calculateCardLineSum(cardLine);
            return (
                <div className={style.line} key={cardLine.cardLineId}>
                    <div className={style.linePrice}>{price}{cardLine.multiplier > 1 && <p>(x{cardLine.multiplier})</p>}</div>
                    <div className={style.characterCard} style={{backgroundImage: `url("${cardLine.image}")`}}>
                        <div className={style.price}>{cardLine.price}</div>
                    </div>
                    <div className={style.cards}>
                        {cardLine.cards.map((card) => 
                            (<React.Fragment key={`${card.id}${card.mod?.id}`}>
                                <div className={`${style.card} ${getCardStretch(card.type) === 'HORIZONTAL' ? style.cardHorizontal : style.cardVertical}`}>
                                    <img src={card.image} alt="card"  />
                                    <div className={style.price}>{card.price}</div>
                                </div>
                                {card.mod && (
                                    <div className={`${style.card} ${getCardStretch(card.mod.type) === 'HORIZONTAL' ? style.cardHorizontal : style.cardVertical}`} >
                                        <img src={card.mod.image} alt="card"  />
                                        <div className={style.price}>{card.mod.price}</div>
                                    </div>
                                )}
                            </React.Fragment>)
                        )}
                    </div>
                </div>
            )
        })}
        <div className={style.total}>TOTAL: {sum}</div>
    </div>
});

BlockForImage.displayName = 'BlockForImage';