import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
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

    const characterId = store.addForCharacter;
    const defaultItems = store.characters[characterId]?.availableItems ?? [];

    useEffect(() => {
        store.changeFilter({...store.filter, itemTypes: defaultItems});
    });

    const onFactionChange = (value: ItemType[]) => {
        store.changeFilter({...store.filter, itemTypes: value});
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
                defaultValue={defaultItems}
                onChange={onFactionChange}
                options={options}
                />
        </div>
    </div>
});

ItemTypeFilter.displayName = 'ItemTypeFilter';