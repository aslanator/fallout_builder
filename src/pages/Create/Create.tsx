import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useMemo, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { saveAsJson, saveAsPng, saveAsTxt } from "../../features/save";
import { AppStore } from "../../store";
import { Add } from "./components/Add/Add";
import { BlockForImage } from "./components/BlockForImage/BlockForImage";
import { CardLineComponent } from "./components/CardLineComponent/CardLineComponent";
import style from './Create.module.css';
import { calculateTotalSum, CardLine, CharacterCard, createCardsStore, ItemCard } from "./store";
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

    const onAddCharacter = () => {
        store.setMenuOpen(true, {});
    }

    const sum = calculateTotalSum(store.cardLines);

    const onSaveAsTxt = () => {
        saveAsTxt(store.cardLines);
    }

    const onSaveAsPng = async () => {
        await saveAsPng(forImageRef.current!);
    }

    const onSaveAsJson = async () => {
        await saveAsJson(store.cardLines);
    }
    
    return (
    <div className={style.container}>
        <div className={style.controllers}>
            <Button className={style.addCharacterButton} type="primary" onClick={onAddCharacter}>Add character</Button>
            <div>
                {sum} points
            </div>
            <div className={style.saveBlock}>
                <Button className={style.addCharacterButton} disabled={!store.cardLines.length} onClick={onSaveAsPng}>Save as png</Button>
                <Button style={{marginLeft: 5}} className={style.addCharacterButton} disabled={!store.cardLines.length} onClick={onSaveAsTxt}>Save as txt</Button>
            </div>
        </div>
        <div className={style.characters}>
            {store.cardLines.map((cardLine, index) => <CardLineComponent lineIndex={index} key={cardLine.cardLineId} cardLine={cardLine} store={store} />)}
        </div>
        {store.addMenuOpen &&
            <div className={style.add}>
                <Add store={store} />
            </div>
        }
        <div className={style.forImage} ref={forImageRef}>
            <BlockForImage cardLines={store.cardLines} sum={sum} />
        </div>
    </div>);
})

Create.displayName = 'Create';