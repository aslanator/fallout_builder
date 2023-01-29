import { observer } from 'mobx-react-lite';
import { CardsStore } from '../../../../store';
import { ItemSubTypeFilter } from '../ItemSubTypeFilter/ItemSubTypeFilter';
import { ItemTypeFilter } from '../ItemTypeFilter/ItemTypeFilter';
import { PriceFilter } from '../PriceFilter/PriceFilter';
import { TitleFilter } from '../TitleFilter/TitleFilter';
import style from './ItemFilter.module.css';

type Props = {
    store: CardsStore;
}

export const ItemFilter = observer<Props>(({store}) => {
    return <div className={style.container}>
        <TitleFilter store={store} />
        <PriceFilter store={store} />
        <ItemTypeFilter store={store} />
        <ItemSubTypeFilter store={store} />
    </div>
});

ItemFilter.displayName = 'ItemFilter';