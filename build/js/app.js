(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "1039e7f9f83c42d112f2a2852a3812a5";

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = require('./../.env').apiKey;

var Find = exports.Find = function () {
  function Find() {
    _classCallCheck(this, Find);
  }

  _createClass(Find, [{
    key: "callSymptom",
    value: function callSymptom(symptom) {
      var promise = new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        var url = "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=" + apiKey;
        request.onload = function () {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        };
        request.open("GET", url, true);
        request.send();
      });

      promise.then(function (response) {
        var body = JSON.parse(response);
        var doctors = [];
        body.data.forEach(function (doctor) {
          var fullName = doctor.profile.first_name + " " + doctor.profile.last_name + " " + doctor.profile.title;
          var addresses = [];
          var acceptingPatients = void 0;
          doctor.practices.forEach(function (practice) {
            addresses.push([practice.visit_address.street, practice.visit_address.city, practice.visit_address.state]);
          });
          acceptingPatients = doctor.practices[0].accepts_new_patients === true;
          doctors.push([fullName, addresses, acceptingPatients]);
        });
        $('#showDoctor').text('The doctors available in your area are:');
        doctors.forEach(function (doc) {
          $('#doctorList').append("<li><p>" + doc[0] + ", </p><ul><li>accepts new patients : " + doc[2].toString() + "</li><br><li><p>" + doc[1][0][0] + ", </p><p>" + doc[1][0][1] + ", " + doc[1][0][2] + "</p></li></ul></li><br>");
        });
      }, function (error) {
        $('#showErrors').text('There was an error processing your request: ${error.message}');
      });
    }
  }]);

  return Find;
}();

},{"./../.env":1}],3:[function(require,module,exports){
'use strict';

var _doctor = require('./../js/doctor.js');

var apiKey = require('./../.env').apiKey;

$(document).ready(function () {
  $('#doctorLocator').click(function (event) {
    event.preventDefault();
    var symptom = $('#symptom').val();
    $('#symptom').val("");
    $('#doctorList').text("");

    var find = new _doctor.Find();
    find.callSymptom(symptom);
  });
});

},{"./../.env":1,"./../js/doctor.js":2}]},{},[3]);
