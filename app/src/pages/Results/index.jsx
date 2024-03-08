import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useGetWinPastriesQuery } from '../../store/services/game';

const Results = () => {
  const win = useSelector((state) => state.game.win);
  const [qty, setQty] = useState(null);
  const { data, error, isLoading } = useGetWinPastriesQuery(qty);

  useEffect(() => {
    if (win) {
      win === 3 ? setQty(1) : setQty(2);
    }
  }, [win]);

  return (
    <>
      {win ? (
        <div className="text-center my-8">
          <h1>Bravo, voici votre résultat :</h1>
          <div className="pt-8">
            <p>
              {qty} {qty >= 1 ? <>Pâtisserie gagnée</> : <>Pâtisseries gagnées</>} !
            </p>
            <ul className="mt-8">
              {data?.map((cake, index) => (
                <li key={index}>
                  <img src={cake.image} className="mx-auto py-4" alt="" />
                  <p>{cake.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center my-8">
          <h1>Vous n'avez pas gagné...</h1>
        </div>
      )}
    </>
  );
};

export default Results;
