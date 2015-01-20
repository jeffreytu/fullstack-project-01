// spec/api/accounts.spec.js

/* jshint quotmark:false */

// Add dependencies
var frisby = require('frisby');
// Set up variables for info you will use often
var url = 'http://localhost:3000/api/accounts/';
var initialRecord = {
  "cust_name": "David",
  "account_type": "commercial"
};
var changedRecord = {
  "cust_name": "Frances",
  "account_type": "enterprise"
};
var emptyRecord = {
  //no properties and values
};
var missingRecord = {
  //missing cust_name
  "account_type": "commercial"
};
var missingRecordTwo = {
  "cust_name": "What is my account type?",
  //missing account_type
};
var emptyPropertyValues = {
  "cust_name": "",
  "account_type": ""
};
var badPropertyName = {
  "ihaveaname": "Mr. Fail",
  "ihaveanaccount": "commercial"
};
var badPropertyValue = {
  "ihaveaname": "Mr. Invalid",
  "ihaveanaccount": "Seattle"
};
var badPropertyValueTwo = {
  "ihaveaname": "Mr. Invalid Two",
  "ihaveanaccount": ["commercial", "enterprise"]
};

// Create a record
function postRecord(){
  frisby.create('Create an account with post')
    .post(url, initialRecord, {json: true})
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON(initialRecord)
    .afterJSON(function(json){
      getRecord(json.id);
    })
    .toss();
}

// Read a record
function getRecord(id){
  frisby.create('Get account using id')
    .get(url + id)
    .expectStatus(200)
    .expectJSON(initialRecord)
    .afterJSON(function(json){
      putRecord(json.id);
    })
    .toss();
}

// Update a record
function putRecord(id){
  frisby.create('Put account using id')
    .put(url + id, changedRecord, {json: true})
    .expectStatus(200)
    .expectJSON(changedRecord)
    .afterJSON(function(json){
      deleteRecord(json.id);
    })
    .toss();
}

// Delete a record
function deleteRecord(id) {
  frisby.create('Delete account using id')
    .delete(url + id, {json: false})
    .expectStatus(204)
    .toss();
}

// Send something that should trigger an error
function postBadRecord(record){
  frisby.create('Validation: Enforce mandatory fields when creating')
    .post(url, record, {json: true})
    .expectStatus(422)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSON({
      error: {
        name: 'ValidationError',
        details: {
          codes: {
          }}}})
    .toss();
}

postRecord();
postBadRecord(initialRecord); //Validates unique name
postBadRecord(emptyRecord);
postBadRecord(missingRecord);
postBadRecord(missingRecordTwo);
postBadRecord(emptyPropertyValues);
postBadRecord(badPropertyName);
postBadRecord(badPropertyValue);
postBadRecord(badPropertyValueTwo);
