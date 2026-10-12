import { RiHome9Line } from 'react-icons/ri';
import { GoPeople } from 'react-icons/go';
export default function Sidebar() {
  return (
    <>
      <div className='pt-7 px-5 hidden is-drawer-open:block'>
        <h1 className='text-3xl font-bold text-white'>RuangBaca</h1>
        <span className='text-blue-300'>Library Dashboard App</span>
      </div>
      <div className='flex justify-center w-full pt-5'>
        <div className='text-center pt-2 font-bold w-10 h-10 bg-gray-300 rounded-full is-drawer-close:block is-drawer-open:hidden'>
          RB
        </div>
      </div>
      <ul className='menu w-full grow flex flex-col gap-3'>
        <li>
          <button
            className='is-drawer-close:tooltip is-drawer-close:tooltip-right text-white '
            data-tip='Homepage'
          >
            <RiHome9Line className='text-xl' />
            <span className='is-drawer-close:hidden'>Homepage</span>
          </button>
        </li>
        <li>
          <button
            className='is-drawer-close:tooltip is-drawer-close:tooltip-right text-white '
            data-tip='Settings'
          >
            <GoPeople className='text-xl' />
            <span className='is-drawer-close:hidden'>Authors</span>
          </button>
        </li>
      </ul>
    </>
  );
}
