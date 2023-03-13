import { Img } from '../../../../features/components/Img/Img';
import { getCardStretch, Card, CharacterCard } from '../../store';
import style from './CardComponent.module.css';
import classnames from 'classnames/bind'; 

type Props = Card & {
    children?: React.ReactNode;
    type?: string,
    faction?: string,
}

const classNames = classnames.bind(style);

export const CardComponent: React.FC<Props> = (itemCard) => {
    const { image, title, price, children, type = '' } = itemCard;
    const stretch = getCardStretch(type);
    const isVertical = stretch === 'VERTICAL' || itemCard.faction;

    return <div className={classNames({'container': true, 'verticalContainer': isVertical})}>
        <div className={classNames({'image': true, 'verticalImage': isVertical})}>
            <Img src={image} title={title}/>
        </div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}