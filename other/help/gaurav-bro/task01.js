
function validate() {
  "use strict";
  let flag,
    flagFirstName,
    flagLastName,
    flagContact,
    flagEmailId,
    flagAddress;

  // regular expressions
  const REG_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,6}$/;
  const REG_CONTACT = /^\d{10}$/;
  const REG_NAME = /^[a-zA-Z]{2,15}$/;
  const REG_ADDRESS = /^[a-zA-Z]{2,50}$/;

  let eleFirstName = document.querySelector("#first_name");
  let errFirstName = document.querySelector("#error_first_name");
  let firstName = eleFirstName.value;
  // console.log("TCL: validate -> firstName", firstName);

  let eleLastName = document.querySelector("#last_name");
  let errLastName = document.querySelector("#error_last_name");
  let lastName = eleLastName.value;
  // console.log("TCL: validate -> lastName", lastName);

  let eleEmailId = document.querySelector("#email_id");
  let errEmailId = document.querySelector("#error_email_id");
  let emailId = eleEmailId.value;
  // console.log("TCL: validate -> emailId", emailId);

  let eleContact = document.querySelector("#contact");
  let errContact = document.querySelector("#error_contact");
  let contact = eleContact.value;
  // console.log("TCL: validate -> contact", contact);

  let eleAddress = document.querySelector("#address");
  let errAddress = document.querySelector("#error_address");
  let address = eleAddress.value;
  // console.log("TCL: validate -> address", address);

  if (firstName === "") {
    flagFirstName = false;
    errFirstName.innerHTML = "Please Enter The first_name !";
    errFirstName.style.color = "red";
  } else if (!REG_NAME.test(firstName)) {
    flagFirstName = false;
    errFirstName.innerHTML = "Invalid First Name !, Please try again.";
    errFirstName.style.color = "red";
  } else {
    flagFirstName = true;
    errFirstName.innerHTML = "";
  }

  if (lastName === "") {
    flagLastName = false;
    errLastName.innerHTML = "Please Enter The last Name !";
    errLastName.style.color = "red";
  } else if (!REG_NAME.test(lastName)) {
    flagLastName = false;
    errLastName.innerHTML = "Invalid Last Name !, Please try again.";
    errLastName.style.color = "red";
  } else {
    flagLastName = true;
    errLastName.innerHTML = "";
  }

  if (emailId === "") {
    flagEmailId = false;
    errEmailId.innerHTML = "Please Enter The Email_id !";
    errEmailId.style.color = "red";
  } else if (!REG_EMAIL.test(emailId)) {
    flagEmailId = false;
    errEmailId.innerHTML = "Invalid Email id !, Please try again.";
    errEmailId.style.color = "red";
  } else {
    flagEmailId = true;
    errEmailId.innerHTML = "";
  }

  if (contact === "") {
    errContact.innerHTML = "Please Enter The contact";
    errContact.style.color = "red";
    flagContact = false;
  } else if (!REG_CONTACT.test(contact)) {
    flagContact = false;
    errContact.innerHTML = "Invalid Mobile no. !, Please try again.";
    errContact.style.color = "red";
  } else {
    flagContact = true;
    errContact.innerHTML = "";
  }

  if (address === "") {
    flagAddress = false;
    errAddress.innerHTML = "Please Enter The address !";
    errAddress.style.color = "red";
  } else if (!REG_ADDRESS.test(address)) {
    flagAddress = false;
    errAddress.innerHTML = "Invalid Address !, Please try again.";
    errAddress.style.color = "red";
  } else {
    flagAddress = true;
    errAddress.innerHTML = "";
  }

  flag = flagFirstName && flagLastName && flagContact && flagEmailId && flagAddress ? true : false;
  return flag;

  // return flag = flagFirstName && flagLastName && flagContact && flagEmailId && flagAddress ? true : false;
  // console.log("TCL: validate -> flag", flag);
  // console.log("TCL: validate -> flagAddress", flagAddress);
  // console.log("TCL: validate -> flagEmailId", flagEmailId);
  // console.log("TCL: validate -> flagContact", flagContact);
  // console.log("TCL: validate -> flagLastName", flagLastName);
  // console.log("TCL: validate -> flagFirstName", flagFirstName);
}
