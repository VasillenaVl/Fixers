import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedProfs = ({ speciality, fixId }) => {
  const { professionals } = useContext(AppContext);

  const navigate = useNavigate();

  const [relProfs, setRelProfs] = useState([]);

  useEffect(() => {
    if (professionals.length > 0 && speciality) {
      const profsData = professionals.filter(
        (fix) => fix.speciality === speciality && fix._id !== fixId
      );
      setRelProfs(profsData);
    }
  }, [professionals, speciality, fixId]);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      {/*md:mx-10:
          При екрани със среден размер (md = medium, обикновено ширина ≥ 768px), задава хоризонтален margin от 2.5rem (40px). 
          my-16:
          Добавя вертикален margin от 4rem (64px) отгоре и отдолу на елемента.
          flex:
          Превръща елемента в flex контейнер (layout система за подравняване на съдържание).*/}
      <h1 className="text-3xl front-medium">Related Professionals</h1>
      <p className="sm:w-1/3 text-center text-sm">Check their availiability </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relProfs.slice(0, 5).map((item, index /*max 5 professionals*/) => (
          <div
            onClick={() => {
              {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
                {
                  /* когато натиснем някой от предложените работници ни връща в нач вече с инф за кликнатия работник */
                }
              }
            }}
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
      <button
        onClick={() => {
          navigate("/professionals");
          scrollTo(0, 0);
        }}
        className="bg-gray-300 border-primary text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default RelatedProfs;
