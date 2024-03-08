import React, { useState } from 'react';
import { useGetPastryByIdQuery } from '../../store/services/pastries';

const PastriesById = () => {
  const [inputId, setInputId] = useState('');
  const { data, error, isLoading } = useGetPastryByIdQuery(inputId);

  const handleChange = (e) => {
    e.preventDefault();
    setInputId(e.target.value);
    console.log(error);
  };

  return (
    <>
      <div>
        <input type="number" value={inputId} placeholder="Entrer id" min="1" onChange={handleChange} />
      </div>

      <ul className="pt-4">
        {error && inputId !== '' && <li>Erreur : {error.data.message}</li>}
        {isLoading && <li>isLoading</li>}
        {data && !error && (
          <li>
            <p>ID: {data.id}</p>
            <p>Nom: {data.name}</p>
          </li>
        )}
      </ul>
    </>
  );
};

export default PastriesById;
