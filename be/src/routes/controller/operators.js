import {
  deleteImage,
  passwordEncrypt,
  url,
  userEmailAndDelImage,
} from "../../utils/beHelpers.js";

export async function getter(req, res, model, mess, single = true) {
  try {
    if (single) {
      const { id } = req.params;
      const data = await model.findById(id);
      if (!data) return res.status(404).send(`${mess} not found`);
      return res.status(200).send({ data });
    }
    if (!single) {
      const data = await model.find();
      if (!data) return res.status(404).send(`${mess} not found`);
      return res.status(200).send({ data });
    }
  } catch (error) {
    return res.status(500).send(error.message + mess);
  }
}

export async function poster(req, res, model, mess, simple = false, secModel) {
  try {
    if (simple) {
      const data = await model.create(req.body);
      // return res.status(200).send(data._id);
    }

    if (mess === "apiUserPostUser") {
      const { email, password } = req.body;
      //check if email exist and delete image
      const { conflict, confMess } = await userEmailAndDelImage(
        req,
        email,
        model
      );
      if (conflict) return res.status(409).send(confMess);
      //check if email exist and delete image

      //encrypt password
      const encryptedPassword = await passwordEncrypt(password);
      //encrypt password

      const data = await model.create({
        ...req.body,
        password: encryptedPassword,
        repeatPassword: encryptedPassword,
        image: url + req.file.filename,
      });
      return res.status(200).send({ data });
    }

    if (mess === "apiConfirmUserPost") {
      const { email, _id } = req.body;
      //check if email exist and delete image
      const { conflict, confMess } = await userEmailAndDelImage(
        req,
        email,
        model,
        false
      );
      if (conflict) return res.status(409).send(confMess);
      //check if email exist and delete image

      const user = await secModel.findByIdAndDelete(_id);
      if (!user) {
        return res.status(404).send(mess + " not found");
      } else {
        const data = await model.create(req.body);
        return res.status(200).send({ data });
      }
    }

    if (mess === "apiAttendancesPost") {
      const uniqueNo = new Set(req.body.map((item) => item.No));
      const existingNo = await model.find({
        No: { $in: Array.from(uniqueNo) },
      });

      if (existingNo.length > 0) {
        const existingNoArray = existingNo.map((item) => item.No);
        const uniqueNoArray = Array.from(uniqueNo);
        const uniqueNonExistingNo = uniqueNoArray.filter(
          (no) => !existingNoArray.includes(no)
        );
        if (uniqueNonExistingNo.length > 0) {
          const filteredBody = req.body.filter((item) =>
            uniqueNonExistingNo.includes(item.No)
          );
          const data = await model.insertMany(filteredBody);
          return res.status(200).send({ data });
        } else {
          return res.status(409).send("All (No) data already exists" + mess);
        }
      } else {
        const data = await model.insertMany(req.body);
        return res.status(200).send({ data });
      }
    }
  } catch (error) {
    deleteImage(req?.file?.path);
    return res.status(500).send(error.message + mess);
  }
}
