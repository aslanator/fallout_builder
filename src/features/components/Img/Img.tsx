import { Spin } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import style from './Img.module.css';

type Props = {
  src: string;
  alt?: string;
  title: string;
}

export const Img: React.FC<Props> = ({src, alt, title}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if(imageRef.current) {

      let options = {
        root: null,
        rootMargin: "100px"
      };
    
      observer = new IntersectionObserver((entries) => {
        for(const entry of entries) {
          if(entry.isIntersecting) {
            const target =  (entry.target as HTMLImageElement);
            target.src = String(target.dataset.src);
            setLoading(true);
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
  }, []);

  return (
    <div className={style.container}>
      <Spin className={`${loading ? style.loading : style.loaded}`} size={'large'}  indicator={<LoadingOutlined style={{color: "white", fontSize: '50px'}} />}/>
      <img data-src={src} src={''} alt={alt ?? 'alt'} title={title} ref={imageRef} onLoad={() => {
        setLoading(false);
      }} />
  </div>
  )
}