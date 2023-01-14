import { Card } from '../../store';
import style from './CardComponent.module.css';

type Props = Card & {
    children?: React.ReactNode;
    type: 'character' | 'item';
}

export const CardComponent: React.FC<Props> = ({ price, image, children, type }) => {
    return <div className={`${style.container} ${type === 'character' ? style.character : style.item}`}>
        <div className={style.image}><img src={image} alt="card" /></div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}