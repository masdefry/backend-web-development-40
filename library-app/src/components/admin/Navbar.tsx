'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import { HiMenuAlt1 } from 'react-icons/hi';

export default function Navbar() {
  const { fullName, role } = useAuthStore();
  return (
    <nav className='navbar w-full bg-base-300'>
      <label
        htmlFor='my-drawer-4'
        aria-label='open sidebar'
        className='btn btn-square btn-ghost drawer-button'
      >
        <HiMenuAlt1 />
      </label>
      <div className='px-4 ml-auto'>
        <div className='flex items-center gap-3'>
          <span className='text-gray-800'>{fullName}{role}</span>
          <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
        </div>
      </div>
    </nav>
  );
}
