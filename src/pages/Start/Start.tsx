import { Button } from 'antd';
import { Link } from 'react-router-dom';
import style from './Start.module.css';

export const Start = () => {
    return <div className={style.container}>
        <Link to={'/create'} className={style.link}><Button type="primary">New</Button></Link>
        {/* <Link to={'/export'} className={style.link}><Button>Export json</Button></Link> */}

        <div className={style.footer}>
            Special thanks to <a href="https://vk.com/tgmleo" target="_blank" rel="noreferrer">Leonid Lupanov</a> and <a href="https://vk.com/id168809740" target="_blank" rel="noreferrer">Nikolay Puchinin</a>
        </div>
    </div>
};