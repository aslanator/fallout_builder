import { Img } from '../../../../features/components/Img/Img';
import { getCardStretch, Card } from '../../store';
import style from './CardComponent.module.css';
import classnames from 'classnames/bind'; 
import { Button } from 'antd';

type Props = Card & {
    type?: string,
    faction?: string,
    buttons?: Array<any>,
}

const classNames = classnames.bind(style);

export const CardComponent: React.FC<Props> = (itemCard) => {
    const { image, title, price, type = '', buttons } = itemCard;
    const stretch = getCardStretch(type);
    const isVertical = stretch === 'VERTICAL' || itemCard.faction;


    return <div className={classNames({'container': true, 'verticalContainer': isVertical})}>
        <div className={classNames({'image': true, 'verticalImage': isVertical})}>
            <Img src={image} title={title}/>
        </div>
        <div className={style.infoBlock}>
            <div className={style.price}>{price} points</div>
            <div className={style.buttons}>
                {buttons && (buttons.filter(Boolean).map(el => (
                    <Button className={classNames({'button': true, 'deleteButton': el.isDelete})} onClick={el.function}>{el.title}</Button>
                )))}
            </div>
        </div>
    </div>
}