import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { Faction, factionKeyToLabelMap } from "../../../../../../globalTypes";
import { CardsStore } from "../../../../store";

import style from './FactionFilter.module.css';

type Props = {
    store: CardsStore;
}

type Option = {
    label: string;
    value: Faction;
}

export const FactionFilter = observer<Props>(({store}) => {

    const onFactionChange = (value: Faction[]) => {
        store.changeFilter({...store.filter, factions: value});
    }

    const factionEntries =  Object.entries(factionKeyToLabelMap) as [Faction, string][];

    const options: Option[] = factionEntries.map(([value, label]) => ({value, label}));

    return <div className={style.container}>
        <div className={style.field}>
            <div>Factions</div>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={store.filter.factions}
                onChange={onFactionChange}
                options={options}
                />
        </div>
    </div>
});

FactionFilter.displayName = 'FactionFilter';