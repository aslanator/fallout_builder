import { getCardStretch, ItemCard } from '../../store';
import { HorizontalItem } from './components/HorizontalItem/HorizontalItem';
import { VerticalItem } from './components/VerticalItem/VerticalItem';

type Props = ItemCard & {
    children?: React.ReactNode;
}

export const CardComponent: React.FC<Props> = (itemCard) => {
    const stretch = getCardStretch(itemCard);

    if(stretch === 'HORIZONTAL') {
        return <HorizontalItem {...itemCard} price={itemCard.multiplier ? `x${itemCard.multiplier}` : itemCard.price} />
    }
    if(stretch === 'VERTICAL') {
        return <VerticalItem {...itemCard} price={itemCard.multiplier ? `x${itemCard.multiplier}` : itemCard.price} />
    }
    
    return null;
}