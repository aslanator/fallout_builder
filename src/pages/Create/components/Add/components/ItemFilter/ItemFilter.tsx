import { observer } from 'mobx-react-lite';
import { CardsStore } from '../../../../store';
import { ItemSubTypeFilter } from '../ItemSubTypeFilter/ItemSubTypeFilter';
import { ItemTypeFilter } from '../ItemTypeFilter/ItemTypeFilter';
import { PriceFilter } from '../PriceFilter/PriceFilter';
import { TitleFilter } from '../TitleFilter/TitleFilter';
import { Button } from 'antd';
import style from './ItemFilter.module.css';

type Props = {
    store: CardsStore;
    onClose: () => void;
}

export const ItemFilter = observer<Props>(({store, onClose}) => {

    const onTitleChange = (value: string) => {
        store.changeItemFilter({...store.itemFilter, search: value});
    }

    return <div className={style.controllers}>
        <TitleFilter value={store.itemFilter.search} onChange={onTitleChange} />
        <PriceFilter store={store} />
        <ItemTypeFilter store={store} />
        <ItemSubTypeFilter store={store} />
        <Button onClick={onClose}>Close</Button>
    </div>
});

ItemFilter.displayName = 'ItemFilter';