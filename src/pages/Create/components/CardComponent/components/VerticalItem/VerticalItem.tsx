
import { Img } from '../../../../../../features/components/Img/Img';
import { ItemCard } from '../../../../store';
import style from './VerticalItem.module.css';

type Props = Omit<ItemCard, 'price'> & {
    price: string | number;
    children?: React.ReactNode;
}

export const VerticalItem: React.FC<Props> = ({ price, image, children, title }) => {
    return <div className={style.container}>
        <div className={style.image}><Img src={image} title={title} alt={title}/></div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}