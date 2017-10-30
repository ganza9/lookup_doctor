import { Find } from './../js/doctor.js';
var apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  $('#doctorLocator').click(function(event){
    event.preventDefault();
    let symptom = $('#symptom').val();
    $('#symptom').val("");
    $('#doctorList').text("");

    let find = new Find();
    find.callSymptom(symptom);
  });
});
