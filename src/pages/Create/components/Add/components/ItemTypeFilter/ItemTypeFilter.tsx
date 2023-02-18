import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { ItemType, itemTypes } from "../../../../../../globalTypes";
import { CardsStore } from "../../../../store";

import style from './ItemTypeFilter.module.css';

type Props = {
    store: CardsStore;
}

type Option = {
    label: string;
    value: ItemType;
}

export const ItemTypeFilter = observer<Props>(({store}) => {

    const onTypeChange = (value: ItemType[]) => {
        store.changeItemFilter({...store.itemFilter, types: value});
    }

    const options: Option[] = itemTypes.map((itemType) => ({value: itemType, label: itemType}));

    return <div className={style.container}>
        <div className={style.field}>
            <div>Item types</div>
            <Select
                className={style.select}
                mode="multiple"
                allowClear
                placeholder="Please select"
                defaultValue={store.itemFilter.types}
                onChange={onTypeChange}
                options={options}
                />
        </div>
    </div>
});

ItemTypeFilter.displayName = 'ItemTypeFilter';