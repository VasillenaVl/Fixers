import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios, { spread } from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const AddFixer = () => {
  const [fixImg, setFixImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("@fixbuddy.com");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("Electrician");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("Plovdiv, Bulgaia");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    console.log("Backend URL:", backendUrl);

    try {
      if (!fixImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();

      formData.append("image", fixImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      // console log formdata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-professional", // from adminRoute
        formData,
        { headers: { aToken } } // it will be converted to smaller case atoken
      );
      if (data.success) {
        toast.success(data.message);
        setFixImg(false);
        setName("");
        setPassword("");
        setAddress1("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} action="" className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium">Add Fixer</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="fix-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={fixImg ? URL.createObjectURL(fixImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setFixImg(e.target.files[0])} // when an image is uploaded it wll be stored in this state variable fixImg, [0] it takes the first file
            type="file"
            id="fix-img"
            hidden
          />
          <p className="text-xs">
            Upload <br />
            picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-9 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <p>Add name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-primary rounded px-3 py-2"
                type="text"
                name=""
                id=""
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border border-primary rounded px-3 py-2"
                type="email"
                name=""
                id=""
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border border-primary rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border border-primary rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-3">
            <div className="flex-1 flex flex-col gap-1">
              <p>Fees BGN</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border border-primary rounded px-3 py-2"
                type="fees"
                placeholder="Fees"
                required
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border border-primary rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="Electrician">Electrician</option>
                <option value="Plumber">Plumber</option>
                <option value="Painter">Painter</option>
                <option value="Gardener">Gardener</option>
                <option value="Cleaner">Cleaner</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Handyman">Handyman</option>
              </select>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border border-primary rounded px-3 py-4"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border border-primary rounded px-3 py-4 mt-1"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About </p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border border-primary rounded"
            placeholder="more info about the professional fixer"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Fixer
        </button>
      </div>
    </form>
  );
};

export default AddFixer;
