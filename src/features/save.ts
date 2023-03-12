import { calculateCardLineSum, calculateTotalSum, CardLine, CharacterCard } from "../pages/Create/store";
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

export const saveAsTxt = (cardLines: CardLine[]) => {
    const totalSum = calculateTotalSum(cardLines);
    const content = cardLines.map(character => {
        const items = character.cards.map(card => `${card.title} (${card.price})`);
        const price = calculateCardLineSum(character);
        let text = `${character.title} (${character.price})\n${items.join('\n')}\n=${price}`;
        if(character.multiplier > 1) {
            text = `${text} (x${(character.multiplier)})`;
        }
        return text;
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