import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu } from '@headlessui/react';
import { User as UserIcon, ChevronDown as ChevronDownIcon, ShoppingBag as ShoppingBagIcon } from 'lucide-react';
import { logoutUser } from '../redux/actions/authActions';

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!isAuthenticated) return null;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
        <UserIcon className="w-5 h-5" />
        <span className="hidden sm:inline">{user?.name || 'Kullanıcı'}</span>
        <ChevronDownIcon className="w-4 h-4" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
        <Menu.Item>
          {({ active }) => (
            <Link
              to="/orders"
              className={`${
                active ? 'bg-gray-100' : ''
              } flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
            >
              <ShoppingBagIcon className="w-4 h-4" />
              Siparişlerim
            </Link>
          )}
        </Menu.Item>
        
        <Menu.Item>
          {({ active }) => (
            <button
              onClick={handleLogout}
              className={`${
                active ? 'bg-gray-100' : ''
              } flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600`}
            >
              Çıkış Yap
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default HeaderMenu; 