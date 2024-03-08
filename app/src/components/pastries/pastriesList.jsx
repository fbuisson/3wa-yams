import React from 'react';
const PastriesList = ({ pastries }) => {
  return (
    <>
      <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
        {pastries?.map((pastry, index) => (
          <li key={index}>
            <span className="font-bold dark:text-gray-200">Nom : {pastry.name}</span>
            <ol className="ps-5 mt-2 space-y-1 list-inside">
              <li>ID: {pastry.id}</li>
              <li>Quantity : {pastry.quantity}</li>
            </ol>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PastriesList;
