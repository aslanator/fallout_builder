import { useEffect, useRef } from 'react';
import { CharacterCard } from '../../store';

import style from './CharacterCardComponent.module.css';

type Props = CharacterCard & {
    children?: React.ReactNode;
}



export const CharacterCardComponent: React.FC<Props> = ({ price, image, lowResImage, children, title }) => {

    const imageRef = useRef(null);

    useEffect(() => {
      let observer: IntersectionObserver | undefined;
      if(imageRef.current) {

        let options = {
          root: null,
          rootMargin: "100px"
        };
      
        observer = new IntersectionObserver((entries) => {
          for(const entry of entries) {
            console.log(entry.isIntersecting)
            if(entry.isIntersecting) {
              const target =  (entry.target as HTMLImageElement);
              target.src = String(target.dataset.image);
              target.classList.remove(style.blur);
            }
          }
        }, options);
        observer.observe(imageRef.current);
      }
      return () => {
        if(observer) {
          observer.disconnect();
        }
      }
    }, [imageRef])

    return <div className={`${style.container} ${style.character}`}>
        <div className={style.image}><img className={style.blur} ref={imageRef} src={lowResImage} data-image={image} alt="card" title={title} /></div>
        <div className={style.price}>{price}</div>
        {children}
    </div>
}