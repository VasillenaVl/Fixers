import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.png";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";
import Fix1 from "./Fix1.jpg";
import Fix2 from "./Fix2.jpg";
import Fix3 from "./Fix3.jpg";
import Fix4 from "./Fix4.jpg";
import Fix5 from "./Fix5.jpg";
import Fix6 from "./Fix6.jpg";
import Fix7 from "./Fix7.jpg";
import Fix8 from "./Fix8.jpg";
import Fix9 from "./Fix9.jpg";
import Fix10 from "./Fix10.jpg";
import Fix11 from "./Fix11.jpg";
import Fix12 from "./Fix12.jpg";
import Fix13 from "./Fix13.jpg";
import Fix14 from "./Fix14.jpg";
import Fix15 from "./Fix15.jpg";
import Fix16 from "./Fix16.jpg";
import Fix17 from "./Fix17.jpg";
import Fix18 from "./Fix18.jpg";
import Painter from "./Painter.png";
import Gardener from "./Gardener.png";
import Handyman from "./Handyman.png";
import Plumber_1 from "./Plumber_1.png";
import Electrician from "./Electrician.png";
import Carpenter from "./Carpenter.png";
import Cleaner from "./Cleaner.png";

export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "Electrician",
    image: Electrician,
  },
  {
    speciality: "Plumber",
    image: Plumber_1,
  },
  {
    speciality: "Painter",
    image: Painter,
  },
  {
    speciality: "Gardener",
    image: Gardener,
  },
  {
    speciality: "Cleaner",
    image: Cleaner,
  },
  {
    speciality: "Carpenter",
    image: Carpenter,
  },
  {
    speciality: "Handyman",
    image: Handyman,
  },
];

export const professionals = [
  {
    _id: "fix1",
    name: "Ivan Ivanov",
    image: Fix1,
    speciality: "Electrician",
    experience: "5 Years",
    about:
      "Ivan specializes in electrical installations, repairs, and troubleshooting, providing safe and reliable solutions for all electrical needs.",
    fees: 70,
    address: {
      line1: "Ivan Vazov, 13",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix2",
    name: "Andrey Andreev",
    image: Fix2,
    speciality: "Electrician",
    experience: "3 Years",
    about:
      "Andrey provides comprehensive electrical services, from installing lighting fixtures to repairing complex wiring systems. ",
    fees: 80,
    address: {
      line1: "Vasil Aprilov, 8",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix3",
    name: "Mihail Yordanov",
    image: Fix3,
    speciality: "Cleaner",
    experience: "6 Years",
    about:
      "Mihail provides expert gardening services, from landscais a professional cleaner dedicated to delivering high-quality cleaning services. From regular housekeeping to post-construction cleaning, his services leave your space fresh and sanitized.pe design to maintenance, ensuring lush and healthy gardens.",
    fees: 65,
    address: {
      line1: "Ruski, 5",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix4",
    name: "Georgi Georgiev",
    image: Fix4,
    speciality: "Plumber",
    experience: "8 Years",
    about:
      "Georgi is a master plumber who takes pride in providing high-quality plumbing services. He can tackle everything from simple repairs to large-scale installations, always ensuring that water systems are functioning flawlessly.",
    fees: 90,
    address: {
      line1: "Bogomil, 20",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix5",
    name: "Anna Dalova",
    image: Fix5,
    speciality: "Gardener",
    experience: "4 Years",
    about:
      "Anna is known for his attention to detail and high-quality painting services for both interiors and exteriorsis a professional gardener who creates lush landscapes and maintains beautiful outdoor spaces.",
    fees: 60,
    address: {
      line1: "Boris I, 7",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix6",
    name: "Emil Emilov",
    image: Fix6,
    speciality: "Plumber",
    experience: "5 Years",
    about:
      "Emil offers expert plumbing services, specializing in emergency repairs, drain cleaning, and pipe replacements.",
    fees: 100,
    address: {
      line1: "Pirotska, 1",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix7",
    name: "Elena Angelova",
    image: Fix7,
    speciality: "Painter",
    experience: "7 Years",
    about:
      "Elena is a trusted painting professional who specializes in delivering flawless results. Whether you are refreshing a single room or completing a full home makeover, she provides a clean, professional finish every time.",
    fees: 50,
    address: {
      line1: "Bunardzhik, 4",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix8",
    name: "Ognyan Atanasov",
    image: Fix8,
    speciality: "Painter",
    experience: "3 Years",
    about:
      "Ognyan is a meticulous painter who delivers high-quality painting services for both interiors and exteriors. With years of experience, he transforms spaces with smooth finishes, providing professional results that last.",
    fees: 75,
    address: {
      line1: "Maria Luiza, 25",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix9",
    name: "Radomir Dobrev",
    image: Fix9,
    speciality: "Gardener",
    experience: "6 Years",
    about:
      "Radomir is a talented landscaper and gardener, specializing in creating personalized garden designs.",
    fees: 110,
    address: {
      line1: "6ti Septemvri, 26",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix10",
    name: "Dimitar Dimov",
    image: Fix10,
    speciality: "Carpenter",
    experience: "4 Years",
    about:
      "Dimitar is an expert carpenter with years of experience in crafting bespoke furniture and home improvements. He combines traditional craftsmanship with modern techniques to create functional and beautiful woodwork.",
    fees: 85,
    address: {
      line1: "Osvobozhdenie, 151",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix11",
    name: "Daniel Paskalev",
    image: Fix11,
    speciality: "Painter",
    experience: "1 Year",
    about:
      "Daniel is known for his attention to detail and precision in every painting project.",
    fees: 25,
    address: {
      line1: "Pencho Slaveykov, 23",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix12",
    name: "Kostadinovi Family",
    image: Fix12,
    speciality: "Carpenter",
    experience: "2 Years",
    about:
      "They are skilled flooring expert specializing in the installation of hardwood, tile, vinyl, laminate and carpet. ",
    fees: 40,
    address: {
      line1: "Laleburgaz, 24",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix13",
    name: "Lychezar Stoyanov",
    image: Fix13,
    speciality: "Electrician",
    experience: "7 Years",
    about:
      "Lychezar is a skilled electrician specializing in residential and commercial wiring installations, repairs, and troubleshooting.",
    fees: 120,
    address: {
      line1: "Peshtersko Shose, 23",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix14",
    name: "Chavdar Iliev",
    image: Fix14,
    speciality: "Handyman",
    experience: "3 Years",
    about:
      "Chavdar is a versatile handyman, skilled in various repairs and maintenance tasks around the house.",
    fees: 55,
    address: {
      line1: "Mendeleev, 22",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix15",
    name: "Miro Hristov",
    image: Fix15,
    speciality: "Gardener",
    experience: "3 Years",
    about:
      "Miro is offering expert services in landscape design, tree trimming, and seasonal garden maintenance to ensure your garden flourishes year-round.",
    fees: 65,
    address: {
      line1: "Gladston, 21",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix16",
    name: "Mariya Atanasova",
    image: Fix16,
    speciality: "Plumber",
    experience: "3 Years",
    about:
      "Mariya offers expert plumbing services, specializing in emergency repairs, drain cleaning, and pipe replacements.",
    fees: 75,
    address: {
      line1: "Gladston, 21",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix17",
    name: "Petar Petrov",
    image: Fix17,
    speciality: "Carpenter",
    experience: "4 Years",
    about:
      "Petar is an expert carpenter with years of experience in crafting bespoke furniture and home improvements. He combines traditional craftsmanship with modern techniques to create functional and beautiful woodwork.",
    fees: 55,
    address: {
      line1: "zh.kv. Hristo Smirnenski 5",
      line2: "Plovdiv, Bulgaria",
    },
  },
  {
    _id: "fix18",
    name: "Yordan Petkov",
    image: Fix18,
    speciality: "Electrician",
    experience: "3 Years",
    about:
      "Yordan provides comprehensive electrical services, from installing lighting fixtures to repairing complex wiring systems. ",
    fees: 80,
    address: {
      line1: "Makedonia, 11",
      line2: "Plovdiv, Bulgaria",
    },
  },
];
