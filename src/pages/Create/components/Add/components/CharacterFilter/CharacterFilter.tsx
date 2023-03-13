import { observer } from 'mobx-react-lite';
import { CardsStore } from '../../../../store';
import { FactionFilter } from '../FactionFilter/FactionFilter';
import { PriceFilter } from '../PriceFilter/PriceFilter';
import { TitleFilter } from '../TitleFilter/TitleFilter';
import style from './CharacterFilter.module.css';
import { Button } from 'antd';

type Props = {
    store: CardsStore;
    onClose: () => void;
}

export const CharacterFilter = observer<Props>(({store, onClose}) => {
    const onTitleChange = (value: string) => {
        store.changeCharacterFilter({...store.characterFilter, search: value});
    }

    return <div className={style.controllers}>
        <TitleFilter onChange={onTitleChange} value={store.characterFilter.search}/>
        <PriceFilter store={store} />
        <FactionFilter store={store} />
        <Button onClick={onClose}>Close</Button>
    </div>
});

CharacterFilter.displayName = 'CharacterFilter';