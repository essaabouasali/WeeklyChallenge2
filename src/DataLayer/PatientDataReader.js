const Patient = require("../Models/Patient");
const fs = require("fs");

module.exports = class PatientDataReader
{
    constructor(FileName)
    {
        this.FileName= FileName;
    }

    getArrayfromfile()
    {
        return JSON.parse(fs.readFileSync(this.FileName).toString()).map(p => new Patient(
            p.firstName,
            p.lastName,
            p.age,
            p.diseases,
            p.doctorId,
            p.id
        ));
    }

    writeArrayToFile(arrayvalue)
    {
        fs.writeFileSync(this.FileName,JSON.stringify(arrayvalue));
    }
    getPatient(id)
    {
        return this.getArrayfromfile().find(p => p.id == id);
    }
    updatePatient(patient)
    {
        this.writeArrayToFile(this.getArrayfromfile().map(p => {
            if(p.id == patient.id)
            {
                return patient;
            }else{
                return p;
            }
        }));       
    }
    addPatient(patient)
    {
        this.writeArrayToFile(this.getArrayfromfile().concat([patient]));
    }
    deletePatient(id)
    {
        this.writeArrayToFile(this.getArrayfromfile().filter(p => p.id != id));
    }

    getPatientsRealtedToDoctor(doctorId)
    {
        return this.getArrayfromfile().filter(p => p.doctorId == doctorId);
    }
    patienteffectedcovid19()
    {
       return this.getArrayfromfile().filter(p => p.diseases.includes("Covid19"));
    }
    //warning
    generateRandomPatients(arrayofdoctorid)
    {
        this.writeArrayToFile(Patient.generateRandomPeople(10,arrayofdoctorid));
    }
    
}