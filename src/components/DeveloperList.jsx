import { Link } from "react-router-dom";

const DeveloperList = () => {
  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Developed By
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="badge-base LI-profile-badge"
            data-locale="en_US"
            data-size="large"
            data-theme="light"
            data-type="HORIZONTAL"
            data-vanity="mutagubya-jonathan-9a8083221"
            data-version="v1"
          >
            <Link
              class="badge-base__link LI-simple-link"
              to="https://ug.linkedin.com/in/mutagubya-jonathan-9a8083221?trk=profile-badge"
            ></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperList;
