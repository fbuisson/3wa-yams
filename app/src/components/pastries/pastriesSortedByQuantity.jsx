import React from 'react';
import { useState } from 'react';
import { useGetPastriesOrderedByQuantityQuery } from '../../store/services/pastries';

const PastriesSorted = ({ pastries }) => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(4);
  const { data, error, isLoading } = useGetPastriesOrderedByQuantityQuery({ offset, limit });
  console.log(pastries);

  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const handleNext = () => {
    if (offset + limit < pastries.length) {
      setOffset(offset + limit);
    }
  };

  return (
    <>
      <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
        {data?.map((pastry, index) => (
          <li key={index}>
            <span className="font-bold dark:text-gray-200">Nom : {pastry.name}</span>
            <ol className="ps-5 mt-2 space-y-1 list-inside">
              <li>ID: {pastry.id}</li>
              <li>Quantity : {pastry.quantity}</li>
            </ol>
          </li>
        ))}
      </ul>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </>
  );
};

export default PastriesSorted;
