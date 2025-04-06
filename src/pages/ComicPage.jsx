import React from 'react';
import { useParams } from 'react-router-dom';
import ComicReader from '../components/ComicReader';

const ComicPage = () => {
  const { comicPath } = useParams();

  if (!comicPath) {
    return <div>Ошибка: Путь к комиксу не найден.</div>;
  }

  const decodedPath = decodeURIComponent(comicPath);

  return (
    <div>
      <ComicReader
        comicPath={decodedPath}
        title="Комикс"
        description="Описание временно отсутствует"
      />
    </div>
  );
};

export default ComicPage;