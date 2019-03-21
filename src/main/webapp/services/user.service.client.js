function AdminUserServiceClient() {
  this.createUser = createUser;
  this.findAllUsers = findAllUsers;
  this.findUserById = findUserById;
  this.deleteUser = deleteUser;
  this.updateUser = updateUser;
  // this.url = "https://young-shore-20354.herokuapp.com/api/user";
  this.url = "http://localhost:8080/api/user";
  var self = this;

  /* accepts a user object and adds it to a collection of users */
  function createUser(user, callback) {
    return fetch(self.url, {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      return response.json();
    });
  }

  /* retrieves all users as an array of JSON objects */
  function findAllUsers() {
    return fetch(self.url).then(function(response) {
      return response.json();
    });
  }

  /* retrieves a single user object whose id is equal to the id parameter */
  function findUserById(userId, callback) {
    return fetch(self.url + "/" + userId, {
      method: "get",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      return response.json();
    });
  }

  /* accepts a user id and user object with new property values 
  for the user with user id. Finds the user whose id matches he 
  id parameter and updates it with the values in the user parameter */
  function updateUser(userId, user, callback) {
    return fetch(self.url + "/" + userId, {
      method: "put",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json"
      }
    }).then(function(response) {
      return response.json();
    });
  }

  /* removes the user whose id matches the id parameter */
  function deleteUser(userId, callback) {
    return fetch(self.url + "/" + userId, {
      method: "delete"
    }).then(function(response) {});
  }
}
