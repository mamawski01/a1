import {
  deleteImage,
  passwordEncrypt,
  prevImgAndDelImg,
  url,
  userEmailAndDelImage,
} from "../../utils/beHelpers.js";

export async function getter(
  req,
  res,
  model,
  mess,
  single = true,
  children = false
) {
  try {
    const { id, id2nd } = req.params;
    if (single && !children) {
      const data = await model.findById(id);
      if (!data) return res.status(404).send(`${mess} not found`);
      return res.status(200).send({ data });
    }
    if (single && children) {
      const data = await model.findById(id);
      const data2nd = data?.schedule.find(
        (data) => data._id.toString() === id2nd
      );
      if (!data) return res.status(404).send(`${mess} not found`);
      if (!data2nd) return res.status(404).send(`${mess} not found`);
      return res.status(200).send({ data2nd });
    }
    if (!single) {
      const data = await model.find();
      if (!data) return res.status(404).send(`${mess} not found`);
      return res.status(200).send({ data });
    }
  } catch (error) {
    return res.status(500).send(error.message + " " + mess);
  }
}

export async function poster(
  req,
  res,
  model,
  mess,
  simple = "",
  secModel,
  trdModel,
  children = false
) {
  try {
    if (simple === "simple") {
      const data = await model.create(req.body);
      return res.status(200).send({ data });
    }

    if (children) {
      const { id } = req.params;

      const data = await model.findByIdAndUpdate(
        id,
        { $push: req.body },
        { new: true }
      );
      return res.status(200).send({ data });
    }

    if (mess === "apiSchedulesPostPatch") {
      const { id } = req.params;

      const existingSchedule = await model.findById(id);
      if (!existingSchedule) {
        return res.status(404).send("Schedule not found");
      }

      const array = existingSchedule.schedule || [];
      const isDuplicate = array.some(
        (item) => item.date === req.body.schedule[0].date
      );
      if (!isDuplicate) {
        const data = await model.findByIdAndUpdate(
          id,
          { $push: req.body },
          { new: true }
        );
        return res.status(200).send({ data });
      } else {
        return res.status(409).send("Duplicate Date");
      }
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

      const newSchedule = await trdModel.create({});
      const user = await secModel.findByIdAndDelete(_id);
      if (!user) {
        return res.status(404).send(mess + " not found");
      } else {
        const data = await model.create({
          ...req.body,
          schedules: newSchedule._id,
        });
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
    return res.status(500).send(error.message + " " + mess);
  }
}

export async function patcher(req, res, model, mess, simple = false) {
  const { id, id2nd } = req.params;
  try {
    if (simple) {
      const data = await model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!data) return res.status(404).send(mess + " not found");
      return res.status(200).send({ data });
    }

    if (mess === "apiSchedulesChildrenPatch") {
      const data = await model.findOneAndUpdate(
        { _id: id, "schedule._id": id2nd },
        {
          $set: {
            "schedule.$.date": req.body.schedule[0].date,
            "schedule.$.timeIn": req.body.schedule[0].timeIn,
            "schedule.$.timeOut": req.body.schedule[0].timeOut,
          },
        },
        { new: true }
      );

      if (!data) return res.status(404).send(mess + " not found");
      return res.status(200).send({ data });
    }

    if (mess === "apiConfirmUserPatchUser" || mess === "apiUserPatchUser") {
      const { password } = req.body;

      //encrypt password
      const encryptedPassword = await passwordEncrypt(password);
      //encrypt password

      //userPrevImg
      const { success, sucMess } = prevImgAndDelImg(req, model, id);
      if (success) return res.status(404).send(mess + sucMess);
      //userPrevImg

      const data = await model.findByIdAndUpdate(
        id,
        {
          ...req.body,
          password: encryptedPassword,
          repeatPassword: encryptedPassword,
          image: url + req.file.filename,
        },
        { new: true }
      );

      if (!data) {
        deleteImage(req?.file?.path);
        return res.status(404).send(mess + " not found");
      }
      return res.status(200).send({ data });
    }
  } catch (error) {
    deleteImage(req?.file?.path);
    return res.status(500).send(error.message + " " + mess);
  }
}

export async function deleter(req, res, model, mess, simple = false, secModel) {
  const { id, id2nd } = req.params;
  try {
    if (mess === "apiConfirmUserDelete") {
      //userPrevImg
      const { success, sucMess } = prevImgAndDelImg(req, model, id, false);
      if (success) return res.status(404).send(sucMess);
      //userPrevImg

      const data = await model.findByIdAndDelete(id);
      const data2 = await secModel.findByIdAndDelete(id2nd);
      if (!model) return res.status(404).send(mess + " not found");
      return res.status(200).send({ data, data2 });
    }

    if (mess === "apiUserDeleteUser") {
      //check if email exist and delete image
      const { conflict, confMess } = await userEmailAndDelImage(
        req,
        false,
        model
      );
      if (conflict) return res.status(409).send(confMess);
      //check if email exist and delete image

      //userPrevImg
      const { success, sucMess } = prevImgAndDelImg(req, model, id, true);
      if (success) return res.status(404).send(sucMess);
      //userPrevImg

      const data = await model.findByIdAndDelete(id);
      if (!data) return res.status(404).send(mess + " not found");
      return res.status(200).send({ data });
    }
  } catch (error) {
    return res.status(500).send(error.message + " " + mess);
  }
}
