'use client';
import Navbar from '@/components/admin/Navbar';
import Sidebar from '@/components/admin/Sidebar';
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <div className='drawer lg:drawer-open'>
        <input
          id='my-drawer-4'
          type='checkbox'
          className='drawer-toggle inline'
        />
        <div className='drawer-content'>
          <Navbar />
          <div className='p-10'>{children}</div>
        </div>
        <div className='drawer-side is-drawer-close:overflow-visible'>
          <label
            htmlFor='my-drawer-4'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <div className='flex min-h-full flex-col items-start bg-blue-700 is-drawer-close:w-14 is-drawer-open:w-64'>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
