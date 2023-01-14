import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useMemo, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { saveAsJson, saveAsPng, saveAsTxt } from "../../features/save";
import { AppStore } from "../../store";
import { Add } from "./components/Add/Add";
import { BlockForImage } from "./components/BlockForImage/BlockForImage";
import { Character } from "./components/Character/Character";
import style from './Create.module.css';
import { CharacterCard, createCardsStore, ItemCard, OnTable } from "./store";

type Props = {
    appStore: AppStore;
}

export const Create = observer<Props>(({appStore}) => {
    const forImageRef = useRef(null);
    const {cards, characterCards}  = useLoaderData() as {cards: ItemCard[], characterCards: CharacterCard[]};
    const characters = useMemo(() => {
        let characters: Record<string, CharacterCard & OnTable> = {};
        if(appStore.json) {
            try {
                characters = JSON.parse(appStore.json);
            } catch(e) {
                console.error(e);
            }
        }
        return characters;
    }, [appStore.json])

    const store = useMemo(() => createCardsStore({cards, characterCards, characters}), [cards, characterCards]);

    const charactersList = Object.values(store.characters);

    const onAddCharacter = () => {
        store.setMenuOpen(true);
    }

    const sum = charactersList.reduce((carry, character) => {
        const sum = character.price + character.cards.reduce((carry, item) => carry + item.price, 0);
        return carry + sum;
    }, 0);

    const onSaveAsTxt = () => {
        saveAsTxt(charactersList);
    }

    const onSaveAsPng = async () => {
        await saveAsPng(forImageRef.current!);
    }

    const onSaveAsJson = async () => {
        await saveAsJson(charactersList);
    }
    
    return (<div className={style.container}>
        <div className={style.characters}>
            {charactersList.map(character => <Character key={character.id} character={character} store={store} />)}
        </div>
        <Button className={style.addCharacter} type="primary" onClick={onAddCharacter}>Add character</Button>
        {store.addMenuOpen && 
        <div className={style.add}>
            <Add store={store} />
        </div>}
        <div>
        total: {sum}
        </div>
        { Object.values(store.characters).length > 0 && (
            <div className={style.save}>
                <Button onClick={onSaveAsJson}>Save as json</Button>
                <Button onClick={onSaveAsPng}>Save as png</Button>
                <Button onClick={onSaveAsTxt}>Save as txt</Button>
            </div>
        )}
        <div className={style.forImage} ref={forImageRef}>
            <BlockForImage characters={Object.values(store.characters)} sum={sum} />
        </div>
    </div>);
})

Create.displayName = 'Create';