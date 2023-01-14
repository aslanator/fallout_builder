import {Button} from "antd"
import TextArea from "antd/es/input/TextArea"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import { AppStore } from "../../store";

import style from './ExportJson.module.css';

type Props = {
    appStore: AppStore;
}

export const ExportJson: React.FC<Props> = ({appStore}) => {
    const [json, setJson] = useState('');
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setJson(event.target.value);
    }

    const onExport = () => {
        appStore.setJson(json);
        navigate("/create");
    }

    return <div className={style.container}>
        <TextArea onChange={onChange} value={json} />
        <Button onClick={onExport} disabled={!json}>Export</Button>
    </div>
}