import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { ItemSubType, itemSubTypes } from "../../../../../../globalTypes";
import { CardsStore } from "../../../../store";

import style from './ItemSubTypeFilter.module.css';

type Props = {
    store: CardsStore;
}

type Option = {
    label: string;
    value: ItemSubType;
}

export const ItemSubTypeFilter = observer<Props>(({store}) => {

    const onSubTypeChange = (value: ItemSubType[]) => {
        store.changeItemFilter({...store.itemFilter, subTypes: value});
    }

    const options: Option[] = itemSubTypes.map((itemType) => ({value: itemType, label: itemType}));

    return <div className={style.container}>
        <div className={style.field}>
            <div>Item sub types</div>
            <Select
                className={style.select}
                mode="multiple"
                allowClear
                placeholder="Please select"
                defaultValue={store.itemFilter.subTypes}
                onChange={onSubTypeChange}
                options={options}
                />
        </div>
    </div>
});

ItemSubTypeFilter.displayName = 'ItemSubTypeFilter';