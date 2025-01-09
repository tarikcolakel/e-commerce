import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAddress, updateAddress } from '../redux/actions/addressActions';
import { toggleAddressForm } from '../redux/reducers/addressReducer';

const AddressForm = ({ existingAddress }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: ''
  });

  useEffect(() => {
    if (existingAddress) {
      setFormData(existingAddress);
    }
  }, [existingAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = existingAddress
      ? await dispatch(updateAddress({ ...formData, id: existingAddress.id }))
      : await dispatch(addAddress(formData));

    if (result.success) {
      dispatch(toggleAddressForm());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Adres Başlığı</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ad</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Soyad</label>
          <input
            type="text"
            value={formData.surname}
            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Telefon</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">İl</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">İlçe</label>
        <input
          type="text"
          value={formData.district}
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Mahalle ve Adres Detayı</label>
        <textarea
          value={formData.neighborhood}
          onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => dispatch(toggleAddressForm())}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {existingAddress ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
};

export default AddressForm; 