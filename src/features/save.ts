import { CharacterCard } from "../pages/Create/store";
import { toPng } from 'html-to-image';
import html2canvas from "html2canvas";

const saveBlobAs = (blob: Blob, file_name: string) => {
    var saver = document.createElementNS("http://www.w3.org/1999/xhtml", "a") as HTMLAnchorElement;
    var blobURL = saver.href = URL.createObjectURL(blob), 
        body = document.body;

    saver.download = file_name;

    body.appendChild(saver);
    saver.dispatchEvent(new MouseEvent("click"));
    body.removeChild(saver);
    URL.revokeObjectURL(blobURL);
}

export const saveAsTxt = (characters: CharacterCard[]) => {
    const totalSum = characters.reduce((carry, character) => {
        const sum = character.price + character.cards.reduce((carry, item) => carry + item.price, 0);
        return carry + sum;
    }, 0);
    const content = characters.map(character => {
        const items = character.cards.map(card => `${card.title} (${card.price})`);
        const price = character.cards.reduce((carry, card) => carry + card.price, 0) + character.price;
        return `${character.title} (${character.price})\n${items.join('\n')}\n=${price}`;
    })
    const file = new Blob([`${content.join('\n\n')}\n\nTotal:${totalSum}`], { type: 'text/plain' });
    saveBlobAs(file, `fallout_builder_${new Date().toString()}.txt`);
}

export const saveAsJson = (characters: CharacterCard[]) => {
    const file = new Blob([JSON.stringify(characters)], { type: 'text/plain' });
    saveBlobAs(file, `fallout_builder_${new Date().toString()}.json`);
}



export const saveAsPng = async (element: HTMLElement) => {
    try {
        const canvas = await html2canvas(element, {useCORS: true, width: element.offsetWidth});
        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        saveBlobAs(blob as Blob, `fallout_builder_${new Date().toString()}.png`);
    } catch(e) {
        console.error(e);
    }
}