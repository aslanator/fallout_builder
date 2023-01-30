import { CardLine } from '../../store';
import style from './BlockForImage.module.css';

type Props = {
    cardLines: CardLine[];
    sum: number;
}

export const BlockForImage: React.FC<Props> = ({cardLines, sum}) => {
    return <div className={style.container}>
        {cardLines.map((cardLine) => {
            const price = cardLine.cards.reduce((carry, card) => carry + card.price, 0) + cardLine.price;
            return (
                <div className={style.line} key={cardLine.cardLineId}>
                    <div className={style.linePrice}>{price}</div>
                    <div className={style.characterCard} style={{backgroundImage: `url("${cardLine.image}")`}}>
                        <div className={style.price}>{cardLine.price}</div>
                    </div>
                    <div className={style.cards}>
                        {cardLine.cards.map((card, index) => 
                        <div className={style.card} key={index}>
                            <img src={card.image} alt="card"  />
                            <div className={style.price}>{card.price}</div>
                        </div>
                        )}
                    </div>
                </div>
            )
        })}
        <div className={style.total}>TOTAL: {sum}</div>
    </div>
}