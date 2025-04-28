import mongoose from "mongoose";

const professionalsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true }, // не required, защото иначе няма да ни даде да създадем нов фиксър ако не е available
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} }, // при създаване slots_booked ще е празен обект и в default можем да добавим резервациите на работника, за да знаем кога точно е свободен и кой слот е вече резервиран
  },
  { minimize: false } // за да сторнем празният обект някъде, false, защото с празна бд няма да се създаде нов работник
);

const professionalModel =
  mongoose.models.professional ||
  mongoose.model("professional", professionalsSchema);

export default professionalModel;
