import React from 'react';
import { useMeQuery } from '../../store/services/auth';
import { useGetPastriesQuery, useGetPastriesCountQuery } from '../../store/services/pastries';
import PastryForm from '../../components/pastries/pastryForm';
import PastriesById from '../../components/pastries/pastriesById';
import PastriesByKeyword from '../../components/pastries/pastriesByKeyword';
import PastriesSorted from '../../components/pastries/pastriesSortedByQuantity';
const Admin = () => {
  const { data: user, error, isLoading } = useMeQuery();
  const { data: pastries } = useGetPastriesQuery();
  const { data: pastriesCount } = useGetPastriesCountQuery();
  const totalPastries = pastries?.reduce((sum, pastry) => sum + pastry.quantity, 0);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Vous devez être connecté pour accéder à cette page.</div>;

  return (
    <div className="p-8">
      <h1 className="text-center ">Centre de contrôle des pâtisseries</h1>
      <h2 className="pt-4 text-2xl text-center ">
        Nombre de pâtisseries : <span>{pastriesCount}</span>
      </h2>
      <h2 className="pt-4 text-2xl text-center ">
        Quantité totale : <span>{totalPastries}</span>
      </h2>
      <h2 className="py-8 text-4xl text-center ">Ajout/Modification de pâtisserie</h2>
      <PastryForm />
      <h2 className="py-8 text-4xl text-center ">Liste des pâtisseries triées par quantité</h2>
      <PastriesSorted pastries={pastries} />
      <h2 className="py-8 text-4xl text-center ">Recherche</h2>
      <div className="flex justify-center text-center">
        <div className="w-2/6 px-4">
          <h3>Recherche par ID</h3>
          <PastriesById />
        </div>
        <div className="w-2/6 px-4">
          <h3>Recherche par mot-clé</h3>
          <PastriesByKeyword />
        </div>
      </div>
    </div>
  );
};

export default Admin;
