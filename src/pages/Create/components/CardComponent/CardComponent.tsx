import { Img } from '../../../../features/components/Img/Img';
import { getCardStretch, ItemCard, CharacterCard } from '../../store';
import style from './CardComponent.module.css';
import classnames from 'classnames/bind'; 

type Props = any & ItemCard & {
    children?: React.ReactNode;
}

const classNames = classnames.bind(style);

export const CardComponent: React.FC<Props> = (itemCard) => {
    const { image, title, price, children } = itemCard;
    const stretch = getCardStretch(itemCard);
    const isHorisontal = stretch === 'HORIZONTAL' && !itemCard.faction;

    return <div className={classNames({'container': true, 'horisontalContainer': isHorisontal})}>
        <div className={classNames({'image': true, 'horisontalImage': isHorisontal})}>
            <Img src={image} title={title}/>
        </div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}