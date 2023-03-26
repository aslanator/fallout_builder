import { Img } from '../../../../features/components/Img/Img';
import { getCardStretch, Card } from '../../store';
import style from './CardComponent.module.css';
import classnames from 'classnames/bind';

type Props = Card & {
    type?: string,
    faction?: string,
    children?: React.ReactNode;
}

const classNames = classnames.bind(style);

export const CardComponent: React.FC<Props> = (itemCard) => {
    const { image, title, price, type = '', children } = itemCard;
    const stretch = getCardStretch(type);
    const isVertical = stretch === 'VERTICAL' || itemCard.faction;


    return <div className={classNames({'container': true, 'verticalContainer': isVertical})}>
        <div className={classNames({'image': true, 'verticalImage': isVertical})}>
            <Img src={image} title={title}/>
        </div>
        <div className={style.infoBlock}>
            <div className={style.price}>{price} points</div>
            <div className={style.buttons}>
                {children}
            </div>
        </div>
    </div>
}