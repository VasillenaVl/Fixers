import React, { useState } from "react";
import { assets } from "../assets/assets";

const Account = () => {
  const [userData, setUserData] = useState({
    name: "Kiril Kirilov",
    image: assets.profile_pic,
    email: "kircho1@gmail.com",
    phone: "+359 882 3456",
    address: {
      line1: "Aleksandar Makedonski Str, 57",
      line2: "Plovdiv, Bulgaria",
    },
    gender: "Male",
    dob: "1998-01-20",
  });

  const [isEdited, setIsEdited] = useState(true);
  {
    /*ako e true можем да редактираме инфорацията*/
  }

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-44 rounded-sm center" src={userData.image} alt="" />

      {isEdited ? (
        <input
          className=" text-3xl font-medium max-w-60 mt-4 px-6"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email address:</p>
          <p className="text-green-700">{userData.email}</p>
          <p className="font-medium">Phone number:</p>
          {isEdited ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-primary">{userData.phone}</p>
          )}
          <p className="font-medium">Address</p>
          {isEdited ? (
            <p>
              <input
                className="bg-gray-100"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
              />
              <br />
              <input
                className="bg-gray-100"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">GENERAL INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          {" "}
          {/* fr === fractional unit, което е стойност в CSS Grid */}
          <p className="font-medium">Gender: </p>
          {isEdited ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}
          <p className="font-medium">Birthday:</p>
          {isEdited ? (
            <input
              className="max-w-28 bg-gray-100 "
              type="date"
              name=""
              id=""
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>
      <div className="mt-10">
        {isEdited ? (
          <button
            className="border-2 border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdited(false)}
          >
            Save
          </button>
        ) : (
          <button
            className="border-2 border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdited(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;
