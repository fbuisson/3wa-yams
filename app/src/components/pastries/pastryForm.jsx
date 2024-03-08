import React, { useState } from 'react';
import { useAddPastryMutation, useUpdatePastryMutation, useDeletePastryMutation } from '../../store/services/pastries';

const PastryForm = () => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [choice, setChoice] = useState(false);

  const [addPastry, { isLoading: isAdding }] = useAddPastryMutation();
  const [updatePastry, { isLoading: isUpdating }] = useUpdatePastryMutation();
  const [deletePastry, { isLoading: isDeleting }] = useDeletePastryMutation();

  const handleSubmit = async (e) => {
    let formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', Number(quantity));
    formData.append('choice', Boolean(choice));
    if (image) formData.append('image', image, image.name);
    if (id) {
      formData.append('id', id);
      await updatePastry(formData);
    } else {
      await addPastry(formData);
    }
  };

  const handleDelete = async () => {
    if (id !== '') {
      try {
        await deletePastry(id);
      } catch (error) {
        console.error('### Une erreur est survenue', error);
      }
      setName('');
      setId('');
      setQuantity('');
      setImage('');
      setChoice(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Le nom de votre pâtisserie..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="id">Id</label>
          <input
            type="number"
            id="id"
            value={id}
            min="0"
            placeholder="L'Id de la pâtisserie..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label htmlFor="quantity">Quantité</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            placeholder="La quantité de pâtisserie..."
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
      </div>
      <div className="text-center">
        <label htmlFor="choice">Choix</label>
        <input
          type="checkbox"
          id="choice"
          value={choice}
          onChange={(e) => setChoice(e.target.checked)}
          className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
        <button type="submit">{id <= 0 ? 'Ajouter' : 'Mettre à jour'}</button>
        <button className="danger" type="submit" onClick={handleDelete}>
          Supprimer
        </button>
      </div>
    </form>
  );
};

export default PastryForm;
