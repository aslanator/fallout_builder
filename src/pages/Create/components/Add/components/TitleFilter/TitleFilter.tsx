import { Input } from "antd";
import { observer } from "mobx-react-lite";
import { ChangeEvent } from "react";

import style from './TitleFilter.module.css';

type Props = {
    onChange: (value: string) => void;
    value: string;
}

export const TitleFilter= observer<Props>(({value, onChange}) => {

    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return <div className={style.container}>
        <div className={style.field}>
            <div>Search</div> <Input value={value} onChange={onTitleChange}/>
        </div>
    </div>
});

TitleFilter.displayName = 'TitleFilter';