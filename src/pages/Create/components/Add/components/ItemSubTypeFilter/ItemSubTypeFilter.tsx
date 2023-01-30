import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { ItemSubType, itemSubTypes } from "../../../../../../globalTypes";
import { CardsStore } from "../../../../store";

import style from './ItemSubTypeFilter.module.css';

type Props = {
    store: CardsStore;
    cardLineId: number;
}

type Option = {
    label: string;
    value: ItemSubType;
}

export const ItemSubTypeFilter = observer<Props>(({store, cardLineId}) => {

    const onSubTypeChange = (value: ItemSubType[]) => {
        store.changeItemFilter({...store.itemFilter, subTypes: value});
    }

    const defaultItems = useMemo(() =>  store.cardLines.find(cardLine => cardLine.cardLineId === cardLineId)?.availableItems ?? [], [cardLineId, store.cardLines])

    useEffect(() => {
        store.changeItemFilter({...store.itemFilter, subTypes: defaultItems});
    }, [defaultItems, store]);

    const options: Option[] = itemSubTypes.map((itemType) => ({value: itemType, label: itemType}));

    return <div className={style.container}>
        <div className={style.field}>
            <div>Item sub types</div>
            <Select
                className={style.select}
                mode="multiple"
                allowClear
                placeholder="Please select"
                defaultValue={defaultItems}
                onChange={onSubTypeChange}
                options={options}
                />
        </div>
    </div>
});

ItemSubTypeFilter.displayName = 'ItemSubTypeFilter';