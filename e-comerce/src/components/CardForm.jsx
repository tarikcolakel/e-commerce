import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from '../redux/actions/cardActions';
import { toggleCardForm } from '../redux/reducers/cardReducer';

const CardForm = ({ existingCard }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingCard) {
      setFormData({
        card_no: existingCard.card_no,
        expire_month: existingCard.expire_month,
        expire_year: existingCard.expire_year,
        name_on_card: existingCard.name_on_card,
        cvv: ''
      });
    }
  }, [existingCard]);

  const validateForm = () => {
    const newErrors = {};
    
    // Kart numarası kontrolü
    if (!/^\d{16}$/.test(formData.card_no)) {
      newErrors.card_no = '16 haneli kart numarası giriniz';
    }

    // Son kullanma ay kontrolü
    if (!/^(0?[1-9]|1[0-2])$/.test(formData.expire_month)) {
      newErrors.expire_month = 'Geçerli bir ay giriniz (1-12)';
    }

    // Son kullanma yıl kontrolü
    const currentYear = new Date().getFullYear();
    if (formData.expire_year < currentYear || formData.expire_year > currentYear + 10) {
      newErrors.expire_year = 'Geçerli bir yıl giriniz';
    }

    // İsim kontrolü
    if (formData.name_on_card.length < 5) {
      newErrors.name_on_card = 'Kart üzerindeki ismi giriniz';
    }

    // CVV kontrolü
    if (!/^\d{3}$/.test(formData.cvv)) {
      newErrors.cvv = 'Geçerli bir CVV giriniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      card_no: formData.card_no,
      expire_month: parseInt(formData.expire_month),
      expire_year: parseInt(formData.expire_year),
      name_on_card: formData.name_on_card
    };

    const result = existingCard
      ? await dispatch(updateCard({ ...submitData, id: existingCard.id }))
      : await dispatch(addCard(submitData));

    if (result.success) {
      dispatch(toggleCardForm());
    } else {
      alert(result.error || 'Kart işlemi başarısız oldu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Kart Numarası</label>
        <input
          type="text"
          maxLength="16"
          value={formData.card_no}
          onChange={(e) => setFormData({ ...formData, card_no: e.target.value.replace(/\D/g, '') })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="1234 5678 9012 3456"
          required
        />
        {errors.card_no && <p className="text-red-500 text-sm mt-1">{errors.card_no}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Kart Üzerindeki İsim</label>
        <input
          type="text"
          value={formData.name_on_card}
          onChange={(e) => setFormData({ ...formData, name_on_card: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Ad Soyad"
          required
        />
        {errors.name_on_card && <p className="text-red-500 text-sm mt-1">{errors.name_on_card}</p>}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ay</label>
          <select
            value={formData.expire_month}
            onChange={(e) => setFormData({ ...formData, expire_month: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Ay</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>{month.toString().padStart(2, '0')}</option>
            ))}
          </select>
          {errors.expire_month && <p className="text-red-500 text-sm mt-1">{errors.expire_month}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Yıl</label>
          <select
            value={formData.expire_year}
            onChange={(e) => setFormData({ ...formData, expire_year: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Yıl</option>
            {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.expire_year && <p className="text-red-500 text-sm mt-1">{errors.expire_year}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">CVV</label>
          <input
            type="text"
            maxLength="3"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '') })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="123"
            required
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => dispatch(toggleCardForm())}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          İptal
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {existingCard ? 'Güncelle' : 'Kaydet'}
        </button>
      </div>
    </form>
  );
};

export default CardForm; 