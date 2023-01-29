import { CharacterCard } from '../../store';
import style from './BlockForImage.module.css';

type Props = {
    characters: CharacterCard[];
    sum: number;
}

export const BlockForImage: React.FC<Props> = ({characters, sum}) => {
    return <div className={style.container}>
        {characters.map(character => {
            const price = character.cards.reduce((carry, card) => carry + card.price, 0) + character.price;
            return (
                <div className={style.line}>
                    <div className={style.linePrice}>{price}</div>
                    <div className={style.characterCard} style={{backgroundImage: `url("${character.image}")`}}>
                        <div className={style.price}>{character.price}</div>
                    </div>
                    <div className={style.cards}>
                        {character.cards.map(card => 
                        <div className={style.card}><img src={card.image} alt="card" />
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