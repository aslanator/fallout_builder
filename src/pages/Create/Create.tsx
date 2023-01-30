import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useMemo, useRef } from "react";
import {Link, useLoaderData, useOutlet} from "react-router-dom";
import { saveAsJson, saveAsPng, saveAsTxt } from "../../features/save";
import { AppStore } from "../../store";
import { BlockForImage } from "./components/BlockForImage/BlockForImage";
import { CardLineComponent } from "./components/CardLineComponent/CardLineComponent";
import style from './Create.module.css';
import { CardLine, CharacterCard, createCardsStore, ItemCard } from "./store";
import { ReactSortable } from "react-sortablejs";

type Props = {
    appStore: AppStore;
}

export const Create = observer<Props>(({appStore}) => {
    const forImageRef = useRef(null);
    const {cards, characterCards}  = useLoaderData() as {cards: ItemCard[], characterCards: CharacterCard[]};
    const cardLines = useMemo(() => {
        let cardLines: CardLine[] = [];
        if(appStore.json) {
            try {
                cardLines = JSON.parse(appStore.json);
            } catch(e) {
                console.error(e);
            }
        }
        return cardLines;
    }, [appStore.json])

    const store = useMemo(() => createCardsStore({cards, characterCards, cardLines}), [cards, characterCards, cardLines]);
    const outlet = useOutlet({store});

    const sum = store.cardLines.reduce((carry, character) => {
        const sum = character.price + character.cards.reduce((carry, item) => carry + item.price, 0);
        return carry + sum;
    }, 0);

    const onSaveAsTxt = () => {
        saveAsTxt(store.cardLines);
    }

    const onSaveAsPng = async () => {
        await saveAsPng(forImageRef.current!);
    }

    const onSaveAsJson = async () => {
        await saveAsJson(store.cardLines);
    }
    
    return (<div className={style.container}>
        <div className={style.characters}>
            <ReactSortable list={store.cardLines} setList={store.setCardLines}>
                {store.cardLines.map(cardLine => <CardLineComponent key={cardLine.cardLineId} cardLine={cardLine} store={store} />)}
            </ReactSortable>
        </div>
        <Link to="/create/addCharacter"><Button className={style.addCharacter} type="primary">Add character</Button></Link>
        {outlet}
        <div>
        total: {sum}
        </div>
        { Object.values(store.cardLines).length > 0 && (
            <div className={style.save}>
                <Button onClick={onSaveAsJson}>Save as json</Button>
                <Button onClick={onSaveAsPng}>Save as png</Button>
                <Button onClick={onSaveAsTxt}>Save as txt</Button>
            </div>
        )}
        <div className={style.forImage} ref={forImageRef}>
            <BlockForImage cardLines={Object.values(store.cardLines)} sum={sum} />
        </div>
    </div>);
})

Create.displayName = 'Create';