
import { Img } from '../../../../../../features/components/Img/Img';
import { ItemCard } from '../../../../store';
import style from './HorizontalItem.module.css';

type Props = Omit<ItemCard, 'price'> & {
    children?: React.ReactNode;
    price: string | number;
}

export const HorizontalItem: React.FC<Props> = ({ price, image, children, title }) => {
    return <div className={style.container}>
        <div className={style.image}><Img src={image} title={title} alt={title}/></div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}