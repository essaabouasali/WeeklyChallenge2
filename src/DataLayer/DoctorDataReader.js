const Doctor = require("../Models/Doctor");
const fs = require("fs");
const Random = require("../Common/Random");

module.exports = class DoctorDataReader
{
    constructor(FileName)
    {
        this.FileName = FileName;
    }

    getArrayfromfile(){
        return JSON.parse(fs.readFileSync(this.FileName).toString()).map(doctor => new Doctor(
            doctor.firstName,
            doctor.lastName,
            doctor.age,
            doctor.specialization,
            doctor.id
        ));
    }

    writeArrayToFile(arrayvalue)
    {
        fs.writeFileSync(this.FileName,JSON.stringify(arrayvalue));
    }

    getDoctor(id)
    {
       return this.getArrayfromfile().find(d => d.id == id);
    }
    updateDoctor(doctor)
    {
        this.writeArrayToFile(this.getArrayfromfile().map(d => {
            if(d.id == doctor.id)
            {
                return doctor;
            }else{
                return d;
            }
        }));       
    }
    addDoctor(doctor)
    {
        this.writeArrayToFile(this.getArrayfromfile().concat([doctor]));
    }
    deleteDoctor(id)
    {
        this.writeArrayToFile(this.getArrayfromfile().filter(d => d.id != id));
    }

    getDoctorsPatient(patient)
    {
        return this.getArrayfromfile().find(d => d.id == patient.doctorId);
    }

    assigndoctorforpatient()
    {
        
        let doctorsid = this.getArrayfromfile().map(d => d.id);
        return doctorsid[Random.getRandomNumber(doctorsid.length)];
    }
    // warning
    generateRandomDoctors()
    {
        this.writeArrayToFile(Doctor.generateRandomPeople(10));
    }

}