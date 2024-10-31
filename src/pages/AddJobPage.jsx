import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJobPage = ({addJobSubmit}) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Full-Time');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('Under Shs500K');
    const [description, setDescription] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const navigate = useNavigate();

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const newJob = {
          title,
          type,
          location,
          salary,
          description,
          company: {
            name: companyName,
            description: companyDescription,
            contactEmail,
            contactPhone,
          },
        };

        
        // Add new job to the API or local storage
        addJobSubmit(newJob);

        // Reset form inputs
        setTitle('');
        setType('');
        setLocation('');
        setSalary('');
        setDescription('');
        setCompanyName('');
        setCompanyDescription('');
        setContactEmail('');
        setContactPhone('');

        toast.success("Job added successfully")
        return navigate('/jobs')
    };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={handleSubmitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Job Type</label
              >
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Job Listing Name</label
              >
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Software Developer for Bugema Univ"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Salary per month</label
              >
              <select
                id="salary"
                name="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              >
                <option value="Under Shs500K">Under Shs500K</option>
                <option value="Shs500K - Shs800K">Shs500K - Shs800K</option>
                <option value="Shs800K - Shs900K">Shs800K - Shs900K</option>
                <option value="Shs1M - Shs1.2M">Shs1M - Shs1.2M</option>
                <option value="Shs1.2M - Shs1.4M">Shs1.2M - Shs1.4M</option>
                <option value="Shs1.4M - Shs1.6M">Shs1.4M - Shs1.6M</option>
                <option value="Shs1.6M - Shs2M">Shs1.6M - Shs1.8M</option>
                <option value="Shs2M - Shs2.2M">Shs2M - Shs2.2M</option>
                <option value="Shs2.2M - Shs2.5M">Shs2.2M - Shs2.5M</option>
                <option value="Shs2.5M - Shs3M">Shs2.5M - Shs3M</option>
                <option value="Over Shs3M">Over Shs3M</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required           
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-2"
                >Company Name</label
              >
              <input
                type="text"
                id="company"
                name="company"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
                >Company Description</label
              >
              <textarea
                id="company_description"
                name="company_description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
                >Contact Email</label
              >
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
                >Contact Phone</label
              >
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddJobPage