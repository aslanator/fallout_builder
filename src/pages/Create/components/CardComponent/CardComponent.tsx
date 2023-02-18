import { Img } from '../../../../features/components/Img/Img';
import { getCardStretch, ItemCard } from '../../store';
import style from './CardComponent.module.css';
import { HorizontalItem } from './components/HorizontalItem/HorizontalItem';
import { VerticalItem } from './components/VerticalItem/VerticalItem';

type Props = ItemCard & {
    children?: React.ReactNode;
}

export const CardComponent: React.FC<Props> = (itemCard) => {
    const stretch = getCardStretch(itemCard);

    if(stretch === 'HORIZONTAL') {
        return <HorizontalItem {...itemCard} />
    }
    if(stretch === 'VERTICAL') {
        return <VerticalItem {...itemCard} />
    }
    
    return null;
}