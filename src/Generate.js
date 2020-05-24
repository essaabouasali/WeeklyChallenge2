const fs = require("fs");
const path = require("path");
const {DoctorDataReader , PatientDataReader } = require("./DataLayer");


const baseFilepath = path.join(__dirname,"../","JSONData");

if(!fs.existsSync(baseFilepath))
{
    fs.mkdirSync(baseFilepath);
}
let _DoctorDataReader = new DoctorDataReader(path.join(baseFilepath,"Doctors.json"));
let _PatientDataReader = new PatientDataReader(path.join(baseFilepath,"Patients.json"));
_DoctorDataReader.generateRandomDoctors();
let arrayofdoctorId = _DoctorDataReader.getArrayfromfile().map(d => d.id);
_PatientDataReader.generateRandomPatients(arrayofdoctorId);