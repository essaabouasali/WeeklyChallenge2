const readline = require(`readline`);
const uuid = require("uuid");
const { PatientService, DoctorService } = require("./Services");
const { DoctorDataReader, PatientDataReader } = require("./DataLayer");
const { Doctor, Patient } = require("./Models");

const path = require("path");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}


async function Program() {
    const baseFilePath = path.join(__dirname, "../", "JSONData");
    const _doctordatareader = new DoctorDataReader(path.join(baseFilePath, "Doctors.json"));
    const _patientdatareader = new PatientDataReader(path.join(baseFilePath, "Patients.json"));
    const _doctorservice = new DoctorService(_doctordatareader, _patientdatareader);
    const _patientservice = new PatientService(_patientdatareader, _doctordatareader);
    let patientid, patient;
    let doctorid, doctor,doctorfirstname,doctorlastname,doctorage;

    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Patients");
        console.log("[2] Doctors");
        console.log("[3] Exit");
        let userInput = await askQuestion("Select an option from above: ");
        switch (userInput) {
            case "1":
                console.log("[1] Add Patient");
                console.log("[2] Search For Patient");
                console.log("[3] Update Patient");
                console.log("[4] Delete Patient");
                console.log("[5] find doctor's patient.");
                console.log("[6] Patients Effeted by COVID19..");
                console.log("[7] Go Back");
                let userInputpatient = await askQuestion("Select an option from above: ");
                switch (userInputpatient) {
                    case "1":
                        let PatientFirstName = await askQuestion("Enter Patient First Name: ");
                        let PatientLastName = await askQuestion("Enter Patient Last Name: ");
                        let PatientAge = await askQuestion("Enter Patient Age: ");
                        let parsedPatientAge = parseInt(PatientAge);
                        let patientDisease = new Array();
                        let patientinput = await askQuestion("Enter Patient Disease: (,) for more than disease\n");
                        patientDisease = patientinput.split("\,");
                        let DoctorId = _patientservice.assigndoctorforpatient();
                        let newpatinet = new Patient(PatientFirstName, PatientLastName, parsedPatientAge, patientDisease, DoctorId);
                        _patientservice.addPatient(newpatinet);
                        console.log("Patient has been added");
                        break;
                    case "2":
                        let patientfullname = await askQuestion("Enter patient full name : ");
                        let patientsarray = _patientservice.searchbyname(patientfullname);
                        if (patientsarray.length == 0) {
                            console.log("No Matching..");
                        }
                        console.log(patientsarray);
                        if (patientsarray.length > 1) {
                            console.log("more than one Patient has been found: ");
                            let age = await askQuestion("ente patient age: ");
                            let patientfound = patientsarray.find(p => p.age == age);
                            if (patientfound) {
                                console.log("Patient has been found \n" +patientfound.getinfo());
                            }
                            else {
                                console.log("PATIENT IS NOT EXIST..");
                            }
                        }
                        break;
                    case "3":
                        patientid = await askQuestion("Enter Patient ID: ");
                        patient = _patientservice.getPatient(patientid);
                        if (patient) {
                            console.log("Patient has been found as: " + patient.getinfo());
                            let patintnewgivenname = await askQuestion("Enter Patient new name: ");
                            let patientnewlastname = await askQuestion("Enter new Surname: ");
                            patient.firstName = patintnewgivenname;
                            patient.lastName = patientnewlastname;
                            _patientservice.updatePatient(patient);
                            console.log("Patient Details has been updated");
                        } else {
                            console.log("patient not found.. ");
                        }
                        break;
                    case "4":
                        patientid = await askQuestion("Enter Patient ID: ");
                        patient = _patientservice.getPatient(patientid);
                        if (patient) {
                            console.log("Patient has been found as: " + patient.getinfo());
                            _patientservice.deletePatient(patientid);
                            console.log("Patient has been deleted...");
                        } else {
                            console.log("patient not found.. ");
                        }
                        break;
                    case "5":
                        patientid = await askQuestion("Enter Patient ID: ");
                        patient = _patientservice.getPatient(patientid);
                        if (patient) {
                            console.log("\nPatient has been found as: " + patient.getinfo());
                            let result = _doctorservice.getDoctorsPatient(patient);
                            if (result) {
                                console.log("\ndoctor has been found as " + result.getinfo());
                            }
                        } else {
                            console.log("patient not found.. ");
                        }
                        break;
                    case "6":
                        let patientsefficted = _patientservice.patienteffectedcovid19();
                        if (patientsefficted) {
                            console.log("Patient are Efficted by Covid19 : \n");
                            for (let i = 0; i < patientsefficted.length; i++) {
                                const element = patientsefficted[i];
                                console.log(element.getinfo() + "\n");
                            }
                        }
                    case "7": break;
                    default:
                        console.log("Going back to main menu");
                }
                break;
            case "2":
                console.log("[1] Add Doctor.");
                console.log("[2] Doctors menu.");
                console.log("[3] back to main menu.");
                let userinputdoctor = await askQuestion("select from the list above: ");
                switch (userinputdoctor) {
                    case "1":
                        doctorfirstname = await askQuestion("Enter Doctor first name: ");
                        doctorlastname = await askQuestion("Enter Doctor Las Name: ");
                        doctorage = await askQuestion("Enter Doctor age: ");
                        let specilaisation = await askQuestion("Enter Doctor specialisation: ");
                        doctor = new Doctor(doctorfirstname,doctorlastname,doctorage,specilaisation);
                        _doctorservice.addDoctor(doctor);
                        console.log("Doctor has been added");
                        break;
                    case "2":
                        console.log("Search for the doctor..");
                        let doctorfullname = await askQuestion("Enter Doctor full name: ");
                        let doctorsarray = _doctorservice.searchbyname(doctorfullname);
                        if (doctorsarray[0] != undefined) {
                            console.log(doctorsarray);
                            if(doctorsarray.length > 1)
                            {
                                console.log("More than one Doctor has been found..");
                                doctorage= await askQuestion("Enter Doctor's age: ");
                                doctor = doctorsarray.find(d => d.age == doctorage);
                                if(doctor == undefined)
                                {
                                    console.log("Doctor is not Exist..");
                                    break;
                                }
                            }else{
                                doctor = doctorsarray[0];
                            }
                            console.log("Doctor has been found as : " + doctor.getinfo());
                            console.log("[1] delete the Doctor.");
                            console.log("[2] change doctor's name.");
                            console.log("[3] change Doctor's Specialisation.")
                            console.log("[4] list of doctor's patient.");
                            console.log("[5] back to main menu.");

                            
                            let seconddoctorinput = await askQuestion("Select from the list above: ");
                            switch(seconddoctorinput)
                            {
                                case "1":
                                    _doctorservice.deleteDoctor(doctor.id);
                                    console.log("\n Doctor has been Deleted.");
                                    break;
                                case "2":
                                    let doctornewname = await askQuestion("Enter Doctor new Name:");
                                    let doctornewsurname = await askQuestion("Enter Doctor new family name: ");
                                    doctor.firstName = doctornewname;
                                    doctor.lastName = doctornewsurname;
                                    _doctorservice.updateDoctor(doctor);
                                    console.log("Doctor has been updated..");
                                    break;
                                case "3":
                                    let newSpecialisation = await askQuestion("Enter doctor Specialisation: ");
                                    doctor.specialization = newSpecialisation;
                                    _doctorservice.updateDoctor(doctor);
                                    console.log("Doctor has been updated..");
                                    break;
                                case "4":
                                    let patientsrelatedtodoctor = _patientservice.getPatientsRealtedToDoctor(doctor.id);
                                    if(patientsrelatedtodoctor[0] == undefined)
                                    {
                                        console.log("this doctor has no Patients..");
                                    }else{
                                        console.log("\nList of the Patients\n");
                                        for(let i=0; i<patientsrelatedtodoctor.length;i++)
                                        {
                                            console.log(`Patient ${i+1} is ${patientsrelatedtodoctor[i].getinfo()}`);
                                        }
                                    }
                                    break;
                                default:                
                            }
                        } else {
                            console.log("Doctor not found..")
                        }
                        break
                    case "3":
                        break;
                    default: break;
                }
                break;
            case "3":
                shouldLoop = false;
                break;
            default:
                console.log("Error: Could not read user input. Please enter a number from 1 to 3");
        }
    }
}

Program().then(() => {
    process.exit(0);
});