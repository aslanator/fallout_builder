import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import style from './index.module.css';
import { Error404 } from './pages/Error404/Error404';
import { Start } from './pages/Start/Start';
import { getCards } from './backend/cards';
import { Create } from './pages/Create/Create';
import { getCharacters } from './backend/characters';
import { createAppStore } from './store';
import { ExportJson } from './pages/ExportJson/ExportJson';

const store = createAppStore();

const createRouter = () => {

  return createHashRouter([
    {
      path: "/",
      element: <Start />,
      errorElement: <Error404 />,
    },
    {
      path: "export",
      element: <ExportJson appStore={store} />,
    },
    {
      path: "create",
      loader: async () => {
        const [cards, characterCards] = await Promise.all([getCards(), getCharacters()]);
        return {
          cards,
          characterCards
        };
      },
      element: <Create appStore={store} />
    },
  ]);
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className={style.container}>
      <div className={style.content}>
        <RouterProvider router={createRouter()} />
      </div>
    </div>
  </React.StrictMode>
);
