import React, { useState } from 'react';
import { useSearchPastriesQuery } from '../../store/services/pastries';

const PastriesByKeyword = () => {
  const [inputWord, setInputWord] = useState('');
  const { data, error, isLoading } = useSearchPastriesQuery(inputWord);

  const handleChange = (e) => {
    e.preventDefault();
    setInputWord(e.target.value);
    console.log(data);
  };

  return (
    <>
      <div>
        <input type="text" value={inputWord} placeholder="Rechercher par mot-clé" onChange={handleChange} />
      </div>

      <ul className="pt-4">
        {error && inputWord !== '' && <li>Erreur : {error.data.message}</li>}
        {isLoading && <li>isLoading</li>}
        {!error && data && (
          <li>
            <p>ID: {data.id}</p>
            <p>Nom : {data.name}</p>
          </li>
        )}
      </ul>
    </>
  );
};

export default PastriesByKeyword;
