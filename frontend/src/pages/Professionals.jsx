import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Professionals = () => {
  const { speciality } = useParams();

  const [filterProf, setFilterProf] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { professionals } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterProf(
        professionals.filter((prof) => prof.speciality === speciality)
      );
    } else {
      setFilterProf(professionals);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [professionals, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the list of professionals.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* този бутон е за филтрите при малките екрани */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-primary text-white" : " "
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        {/* взимаме previous state value и ще върнем not of previous, т.е. ако е вярно ще го направи грешно и обратното*/}
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() =>
              speciality === "Electrician"
                ? navigate("/professionals")
                : navigate("/professionals/Electrician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-2 border-primary transition-all cursor-pointer ${
              speciality == "Electrician" ? "bg-primary text-gray-100" : ""
            }`}
          >
            Electrician
          </p>
          <p
            onClick={() =>
              speciality === "Plumber"
                ? navigate("/professionals")
                : navigate("/professionals/Plumber")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-2 border-primary transition-all cursor-pointer ${
              speciality == "Plumber" ? "bg-primary text-gray-100" : ""
            }`}
          >
            Plumber
          </p>
          <p
            onClick={() =>
              speciality === "Painter"
                ? navigate("/professionals")
                : navigate("/professionals/Painter")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-2 border-primary transition-all cursor-pointer ${
              speciality == "Painter" ? "bg-primary text-gray-100" : ""
            }`}
          >
            Painter
          </p>
          <p
            onClick={() =>
              speciality === "Gardener"
                ? navigate("/professionals")
                : navigate("/professionals/Gardener")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-2 border-primary transition-all cursor-pointer ${
              speciality == "Gardener" ? "bg-primary text-gray-100" : ""
            }`}
          >
            Gardener
          </p>
          <p
            onClick={() =>
              speciality === "Cleaner"
                ? navigate("/professionals")
                : navigate("/professionals/Cleaner")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-2 border-primary transition-all cursor-pointer ${
              speciality == "Cleaner" ? "bg-primary text-gray-100" : ""
            }`}
          >
            Cleaner
          </p>
          <p
            onClick={() =>
              speciality === "Carpenter"
                ? navigate("/professionals")
                : navigate("/professionals/Carpenter")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-2 border-primary transition-all cursor-pointer ${
              speciality == "Carpenter" ? "bg-primary text-gray-100" : ""
            }`}
          >
            Carpenter
          </p>
          <p
            onClick={() =>
              speciality === "Handyman"
                ? navigate("/professionals")
                : navigate("/professionals/Handyman")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border-2 border-primary transition-all cursor-pointer ${
              speciality == "Handyman" ? "bg-primary text-gray-100" : ""
            }`}
          >
            Handyman
          </p>
        </div>
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterProf.map((item, index /*max 10 professionals*/) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="max-w-72 border border-primary rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition duration-500"
            >
              <img
                className="bg-green-900 size-72 max-h-52"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Availiable</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Professionals;
