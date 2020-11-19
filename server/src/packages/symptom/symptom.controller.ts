import { Request, Response } from "express";
import { Symptom } from "./symptom.model";
import * as helpers from "../../helpers";
import * as _ from "lodash";

export const addSymptom = async (req: Request, res: Response) => {
  const { data: symptomData } = req.body;

  if (_.isEmpty(symptomData)) res.status(400).json("Unble to Proccess Request");

  symptomData.date = helpers.stringToDate(symptomData.date);

  try {
    const symptom = new Symptom({
      author: {
        uid: req.user?.uid,
        displayName: req.user?.name
      },
      symptom: symptomData
    });
    await symptom.save();
    res.json({ message: "Symptom Added Successfully" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json("There was an error while adding symptom");
  }
};

export const getSymptoms = async (req: Request, res: Response) => {
  const { startAt, endAt } = req.query;

  if (!startAt || !endAt)
    return res.status(400).json("Unable To Proccess Request");

  try {
    const start = helpers.getStartDayDate(startAt as string);
    const end = helpers.getEndDayDate(endAt as string);

    const symptoms = await Symptom.aggregate([
      {
        $match: {
          $and: [
            {
              "symptom.date": { $gte: start, $lte: end }
            },
            { "author.uid": req.user?.uid }
          ]
        }
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d/%m/%Y",
              date: "$symptom.date"
            }
          },
          symptoms: { $push: { symptom: "$symptom", id: "$_id" } }
        }
      },
      { $sort: { "symptoms.symptom.date": -1 } }
    ]);

    return res.json(symptoms);
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json("There was an Error while fetching symptoms");
  }
};

export const deleteSymptom = async (req: Request, res: Response) => {
  const { docId: _id } = req.query;

  if (!_id || typeof _id !== "string")
    return res.status(400).json("Unable To Proccess Request");

  try {
    const doc: any = await Symptom.findOne({ _id });

    if (doc.author.uid !== req.user?.uid)
      return res.status(403).json("unauthorized request");

    await Symptom.deleteOne(doc);

    return res.json({ message: "Symptom Deleted Successfully", docId: _id });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json("There was an Error while deleting symptom");
  }
};

export const editSymptom = async (req: Request, res: Response) => {
  const {
    data: { symptom, docId: _id }
  } = req.body;

  if (!_id || _.isEmpty(symptom))
    res.status(400).json("Unable To Proccess Request");

  try {
    symptom.date = helpers.stringToDate(symptom?.date);

    await Symptom.updateOne(
      { _id, "author.uid": req.user.uid },
      {
        $set: {
          symptom: symptom
        }
      }
    );

    return res.json({
      message: "Symptom Updated Successfully",
      docId: _id,
      symptom
    });
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json("There was an Error while updating symptom");
  }
};