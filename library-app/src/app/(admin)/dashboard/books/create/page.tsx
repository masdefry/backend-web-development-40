import { IoArrowBack } from 'react-icons/io5';

export default function CreateBookPage() {
  return (
    <>
      <div className='p-10'>
        <div className='breadcrumbs text-sm'>
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
        <div className='flex items-center gap-3'>
          <IoArrowBack className='text-xl' />
          <div>
            <h1 className='text-3xl font-bold'>Create New Book</h1>
            <p className='text-gray-500'>
              Add a new book to the library catalog with essential book details.
            </p>
          </div>
        </div>

        {/* Section Form */}
        <div className='mt-10'>
          <div className='bg-gray-300 p-10 rounded-t-md'>
            <h1 className='text-2xl font-bold'>Book Information</h1>
            <p className='text-gray-500'>
              Core identification data for library ingestion.
            </p>
          </div>
          <form className='p-10 shadow-md'>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>ISBN</legend>
              <input
                type='text'
                className='input w-full'
                placeholder='Type ISBN number'
              />
              <p className='label text-red-600'>Error Message Here</p>
            </fieldset>
            <fieldset className='fieldset'>
              <legend className='fieldset-legend'>Title</legend>
              <input
                type='text'
                className='input w-full'
                placeholder='Type book title'
              />
              <p className='label text-red-600'>Error Message Here</p>
            </fieldset>
            <fieldset className='fieldset w-full'>
              <legend className='fieldset-legend'>Author</legend>
              <select defaultValue='Pick a browser' className='select w-full'>
                <option disabled={true}>Pick a browser</option>
                <option>Chrome</option>
                <option>FireFox</option>
                <option>Safari</option>
              </select>
              <p className='label text-red-600'>Error Message Here</p>
            </fieldset>
            <fieldset className='fieldset w-full'>
              <legend className='fieldset-legend'>Category</legend>
              <select defaultValue='Pick a browser' className='select w-full'>
                <option disabled={true}>Pick a browser</option>
                <option>Chrome</option>
                <option>FireFox</option>
                <option>Safari</option>
              </select>
              <p className='label text-red-600'>Error Message Here</p>
            </fieldset>
            <div className='flex justify-end mt-5'></div>
            <button type='submit' className='btn btn-primary'>
              Save as New Book
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
