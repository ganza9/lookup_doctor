var apiKey = require('./../.env').apiKey;
export class Find {
  constructor(){
  }

  callSymptom(symptom) {
    let promise = new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      let doctors = [];
      body.data.forEach(function(doctor){
        let fullName = doctor.profile.first_name + " " + doctor.profile.last_name + " " + doctor.profile.title;
        let addresses = [];
        let acceptingPatients;
        doctor.practices.forEach(function(practice){
          addresses.push([practice.visit_address.street, practice.visit_address.city, practice.visit_address.state]);
        });
        acceptingPatients = (doctor.practices[0].accepts_new_patients === true);
        doctors.push([fullName, addresses, acceptingPatients]);
      });
      $('#showDoctor').text('The doctors available in your area are:');
      doctors.forEach(function(doc){
        $('#doctorList').append(`<li><p>${doc[0]}, </p><ul><li>accepts new patients : ${doc[2].toString()}</li><br><li><p>${doc[1][0][0]}, </p><p>${doc[1][0][1]}, ${doc[1][0][2]}</p></li></ul></li><br>`);
      });
    }, function(error){
      $('#showErrors').text('There was an error processing your request: ${error.message}');
    });
  }
}
