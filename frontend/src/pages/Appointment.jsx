import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets, professionals } from "../assets/assets";
import RelatedProfs from "../components/RelatedProfs";

const Appointment = () => {
  const { fixId } = useParams();
  const { professionals, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [fixInfo, setFixInfo] = useState();
  const [fixSlots, setFixSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchFixInfo = async () => {
    const fixInfo = professionals.find((fix) => fix._id === fixId);
    setFixInfo(fixInfo);
  };

  const getAvailiableSlots = async () => {
    setFixSlots([]);

    // днешна дата
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // взимаме датата от индекса
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // от днес до след 7 дена

      // задаваме крайна дата с индекса
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // задаваме часовете
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // добавяме слот в масива
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // инкрементирамер сегашното време с 30 минути
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setFixSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchFixInfo();
  }, [professionals, fixId]);

  useEffect(() => {
    getAvailiableSlots();
  }, [fixInfo]);

  useEffect(() => {
    console.log(fixSlots);
  }, [fixSlots]);

  console.log("component ");

  return (
    fixInfo && (
      <div>
        {/* Details about the fixers */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* по този начин снимката застава от едната страна, а текста от другата */}
          <div>
            <img
              className="w-56 h-64 sm:max-w-72 rounded-lg"
              src={fixInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border-4 border-primary rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/*   Name, experience */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {fixInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-700">
              <p>{fixInfo.speciality}</p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {fixInfo.experience}
              </button>
            </div>

            {/*   About   */}
            <div>
              <p className="flex  items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {fixInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-normal mt-4">
              Service fee:{" "}
              <span className="text-gray-700">
                {currencySymbol}
                {fixInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking slots  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {/* overflow в CSS е свойство, което управлява какво да се случи, ако съдържанието на елемент излезе извън неговата зададена област Ще се появят скрол ленти (и хоризонтални, и вертикални), независимо дали съдържанието излиза извън границите.*/}
            {fixSlots.length &&
              fixSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-3 w-full overflow-scroll mt-4">
            {fixSlots.length &&
              fixSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border-gray-700"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ml-60">
            Book Me
          </button>
        </div>
        {/* Работници със същата професия */}
        <RelatedProfs fixId={fixId} speciality={fixInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
