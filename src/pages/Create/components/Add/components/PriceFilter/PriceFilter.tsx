import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { CardsStore } from '../../../../store';
import style from './PriceFilter.module.css';

type Props = {
    store: CardsStore;
}

export const PriceFilter = observer<Props>(({store}) => {
    const [minPrice, setMinPrice] = useState(store.characterFilter.priceMin.toString());
    const [maxPrice, setMaxPrice] = useState(store.characterFilter.priceMax.toString());

    const onMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(event.target.value);
        const value = Number(event.target.value);
        store.changeCharacterFilter({...store.characterFilter, priceMax: value});
    };

    const onMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMinPrice(event.target.value);
        const value = Number(event.target.value);
        store.changeCharacterFilter({...store.characterFilter, priceMin: value});
    };

    return <div className={style.container}>
        <div className={style.field}>
            <div className={style.title}>Min price</div> 
            <Input maxLength={3} value={minPrice} onChange={onMinPriceChange} />
        </div>
        <div>
            -
        </div>
        <div className={style.field}>
            <div className={style.title}>Max price</div> 
            <Input maxLength={3} value={maxPrice} onChange={onMaxPriceChange} />
        </div>
    </div>
});

PriceFilter.displayName = 'PriceFilter';