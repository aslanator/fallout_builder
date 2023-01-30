import { Img } from '../../../../features/components/Img/Img';
import { Card } from '../../store';
import style from './CardComponent.module.css';

type Props = Card & {
    children?: React.ReactNode;
    view: 'character' | 'item';
}

export const CardComponent: React.FC<Props> = ({ price, image, children, view, title }) => {
    return <div className={`${style.container} ${view === 'character' ? style.character : style.item}`}>
        <div className={style.image}><Img src={image} title={title}/></div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}