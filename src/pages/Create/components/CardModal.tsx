import { Img } from '../../../features/components/Img/Img';
import { getCardStretch, CardsStore } from '../store';
import style from './CardModal.module.css';
import classnames from 'classnames/bind'; 

type Props = {
    store: CardsStore;
}

const classNames = classnames.bind(style);

export const CardModal: React.FC<Props> = ({store}) => {
    const { cardModalCard } = store;
    const { image, title, type } = cardModalCard;
    const stretch = getCardStretch(type);
    const isVertical = stretch === 'VERTICAL';


    return <div className={classNames({'container': true, 'verticalContainer': isVertical})}>
        <div className={classNames({'image': true, 'verticalImage': isVertical})}>
            <Img src={image} title={title}/>
        </div>
    </div>
}