import { useEffect, useRef } from 'react';
import { Img } from '../../../../features/components/Img/Img';
import { CharacterCard } from '../../store';

import style from './CharacterCardComponent.module.css';

type Props = CharacterCard & {
    children?: React.ReactNode;
}



export const CharacterCardComponent: React.FC<Props> = ({ price, image, lowResImage, children, title }) => {

    return <div className={`${style.container} ${style.character}`}>
        <div className={style.image}><Img src={image} alt={title} title={title} /></div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}