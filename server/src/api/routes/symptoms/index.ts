import { Router } from "express";
import { db } from "../../../db";
import { SymptomModel } from "../../../models/symptoms";
import * as helpers from "../../../helpers";
import * as _ from "lodash";

const symptomsRouter = Router();

symptomsRouter.get("/get-symptoms", async (req, res) => {
  const { startAt, endAt } = req.query;

  if (!startAt || !endAt)
    return res.status(400).json("Unable To Proccess Request");

  try {
    const start = helpers.getStartDayDate(startAt as string);
    const end = helpers.getEndDayDate(endAt as string);

    const symptoms = await db
      .collection("symptoms")
      .aggregate([
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
            symptoms: { $push: { meal: "$symptom", id: "$_id" } }
          }
        },
        { $sort: { "symptoms.symptom.date": -1 } }
      ])
      .toArray();

    return res.json(symptoms);
  } catch (err) {
    console.log(err.stack);
    return res.status(500).json("There was an Error while fetching meals");
  }
});

symptomsRouter.post("/add-symptom", (req, res) => {
  const { data: symptomData } = req.body;

  if (_.isEmpty(symptomData)) res.status(400).json("Unble to proccess request");

  symptomData.date = helpers.stringToDate(symptomData.date);

  try {
    const symptom = new SymptomModel({
      author: {
        uid: req.user?.uid,
        displayName: req.user?.name
      },
      symptom: symptomData
    });
    db.collection("symptoms").insertOne(symptom);
    res.json({ message: "Symptom Added Successfully" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json("There was an error while adding symptom");
  }
});

export default symptomsRouter;
