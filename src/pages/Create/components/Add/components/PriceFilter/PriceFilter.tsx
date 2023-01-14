import { Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useEffect, useState } from 'react';
import { CardsStore } from '../../../../store';
import style from './PriceFilter.module.css';

type Props = {
    store: CardsStore;
}

export const PriceFilter = observer<Props>(({store}) => {
    const [minPrice, setMinPrice] = useState(store.filter.priceMin.toString());
    const [maxPrice, setMaxPrice] = useState(store.filter.priceMax.toString());

    const onMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(event.target.value);
        const value = Number(event.target.value);
        store.changeFilter({...store.filter, priceMax: value});
    };

    const onMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMinPrice(event.target.value);
        const value = Number(event.target.value);
        store.changeFilter({...store.filter, priceMin: value});
    };

    return <div className={style.container}>
        <div className={style.field}><div className={style.title}>min price</div> <Input maxLength={3} value={minPrice} onChange={onMinPriceChange} /></div>
        -
        <div className={style.field}><div className={style.title}>max price</div> <Input maxLength={3} value={maxPrice} onChange={onMaxPriceChange} /></div>
    </div>
});

PriceFilter.displayName = 'PriceFilter';