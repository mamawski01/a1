import fs from "fs";
import bcrypt from "bcryptjs";

export function deleteImage(path) {
  return fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("File deleted successfully.");
    }
  });
}

export function schemaModel() {
  return {
    firstName: { type: String, required: [true, "First Name is required."] },
    middleName: { type: String, required: [true, "Middle Name is required."] },
    lastName: { type: String, required: [true, "Last Name is required."] },
    position: { type: String, required: [true, "Position is required."] },
    birthdate: { type: String, required: [true, "Birthdate is required."] },
    employmentDate: {
      type: String,
      required: [true, "Birthdate is required."],
    },
    email: { type: String, unique: true },
    street: { type: String },
    purok: { type: String },
    brgy: { type: String, required: [true, "Barangay is required."] },
    city: { type: String, required: [true, "City is required."] },
    province: { type: String, required: [true, "Province is required."] },
    country: { type: String, required: [true, "Country is required."] },
    contactNumber1: {
      type: String,
      required: [true, "1 Contact Number is required."],
    },
    contactNumber2: { type: String },
    contactNumber3: { type: String },
    password: { type: String },
    repeatPassword: { type: String },
    SSS: { type: String },
    PagIbig: { type: String },
    PhilHealth: { type: String },
    TIN: { type: String },
    contactPersonNameInEmergency: {
      type: String,
      required: [true, "Contact Person Name In Emergency is required."],
    },
    contactPersonNumberInEmergency: {
      type: String,
      required: [true, "Contact Person Number In Emergency is required."],
    },
    image: { type: String, required: [true, "Image is required."] },
  };
}

const url = "http://localhost:8000/uploads/images/";

export async function passwordEncrypt(password) {
  return await bcrypt.hash(password, 10);
}

export async function getters(res, model, mess) {
  try {
    const data = await model.find();
    if (!data) return res.status(404).send(`${mess} not found`);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send(error.message + mess);
  }
}

export async function getter(req, res, model, mess) {
  const { id } = req.params;
  try {
    const data = await model.findById(id);
    if (!data) return res.status(404).send(`${mess} not found`);
    return res.status(200).send({ data });
  } catch (error) {
    return res.status(500).send(error.message + mess);
  }
}

export async function poster(req, res, model, mess) {
  const { email, password } = req.body;
  try {
    // userEmailExist
    const userEmailExist = await model.exists({ email });
    if (userEmailExist) {
      deleteImage(req.file.path);
      return res.status(409).send("Email already exists");
    }
    const encryptedPassword = await passwordEncrypt(password);
    //userEmailExist
    const data = await model.create({
      ...req.body,
      password: encryptedPassword,
      repeatPassword: encryptedPassword,
      image: url + req.file.filename,
    });
    return res.status(200).send({ data });
  } catch (error) {
    deleteImage(req.file.path);
    return res.status(500).send(error.message + mess);
  }
}

export async function patcher(req, res, model, mess) {
  const { email, password } = req.body;
  const { id } = req.params;
  try {
    const userEmailExist = await model.exists({ email });
    if (userEmailExist) {
      deleteImage(req.file.path);
      return res.status(409).send("Email already exists");
    }
    const encryptedPassword = await passwordEncrypt(password);
    //userPrevImg
    const userPrevImg = await model.findById(id);
    if (!userPrevImg) {
      deleteImage(req.file.path);
      return res.status(404).send("User not found");
    }
    const imageUrl = userPrevImg.image.substring(
      userPrevImg.image.lastIndexOf("/") + 1
    );
    deleteImage(location + "/" + imageUrl);
    //userPrevImg

    const user = await model.findByIdAndUpdate(
      id,
      {
        ...req.body,
        password: encryptedPassword,
        repeatPassword: encryptedPassword,
        image: url + req.file.filename,
      },
      { new: true }
    );

    if (!user) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User updated", user });
  } catch (error) {
    return res.status(500).send(error.message + mess);
  }
}

export async function deleter() {
  const { id } = req.params;
  try {
    const userPrevImg = await User.findById(id);
    const imageUrl = userPrevImg.image.substring(
      userPrevImg.image.lastIndexOf("/") + 1
    );
    deleteImage(location + "/" + imageUrl);
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).send("User not found");
    return res.status(200).send({ message: "User deleted", user });
  } catch (error) {
    console.log(error);
    return res.status(500).send("deleteUser Error");
  }
}
