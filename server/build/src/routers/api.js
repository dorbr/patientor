"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = require("../../db/diagnoses");
const patients_1 = require("../../db/patients");
const router = express_1.default.Router();
router.get('/diagnoses', (_req, res) => {
    const diagnoses = diagnoses_1.diagnosesData;
    res.json(diagnoses);
});
router.get('/patients ', (_req, res) => {
    console.log(patients_1.patientsData);
    const patients = patients_1.patientsData;
    res.json(patients);
});
exports.default = router;
