function User(id, username, password, firstName, lastName, role) {
  this.id = id;
  this.username = username;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.role = role;
  // this.phone = phone;
  // this.dateOfBirth = dateOfBirth;

  this.setId = setId;
  this.getId = getId;
  this.setUsername = setUsername;
  this.getUsername = getUsername;
  this.setPassword = setPassword;
  this.getPassword = getPassword;
  this.setFirstName = setFirstName;
  this.getFirstName = getFirstName;
  this.setLastName = setLastName;
  this.getLastName = getLastName;
  this.setRole = setRole;
  this.getRole = getRole;
  // this.setPhone = setPhone;
  // this.setDateOfBirth = setDateOfBirth;
  // this.getPhone = getPhone;
  // this.getDateOfBirth = getDateOfBirth;

  function setId(id) {
    this.id = id;
  }
  function getId() {
    return this.id;
  }

  function setUsername(username) {
    this.username = username;
  }
  function getUsername() {
    return this.username;
  }
  function setPassword(password) {
    this.password = password;
  }
  function getPassword() {
    return this.password;
  }

  function setFirstName(firstName) {
    this.firstName = firstName;
  }
  function getFirstName() {
    return this.firstName;
  }

  function setLastName(lastName) {
    this.lastName = lastName;
  }
  function getLastName() {
    return this.lastName;
  }

  function setRole(role) {
    this.role = role;
  }
  function getRole() {
    return this.role;
  }
  // function setPhone(phone) {
  //   this.phone = phone;
  // }
  // function getPhone() {
  //   return this.phone;
  // }

  // function setDateOfBirth(dateOfBirth) {
  //   this.dateOfBirth = dateOfBirth;
  // }

  // function getDateOfBirth() {
  //   return this.dateOfBirth;
  // }
}
