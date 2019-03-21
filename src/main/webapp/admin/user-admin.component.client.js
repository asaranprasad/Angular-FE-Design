(function() {
  var $usernameFld, $passwordFld;
  var $removeBtn, $editBtn, $createBtn;
  var $firstNameFld, $lastNameFld;
  var $roleFld;
  var $userRowTemplate, $tbody;
  var userService = new AdminUserServiceClient();
  $(main);

  /* Executes on document load, when the browser is done parsing 
  the html page and the dom is ready. Retrieved the dom elements 
  needed later in the component such as the form elements, 
  action icons, and templates. Binds action icons, such as create, 
  update, select, and delete, to respective event handlers */
  function main() {
    $idFld = $("#idFld");
    $usernameFld = $("#usernameFld");
    $passwordFld = $("#passwordFld");
    $firstNameFld = $("#firstNameFld");
    $lastNameFld = $("#lastNameFld");
    $roleFld = $("#roleFld");

    $userRowTemplate = $(".wbdv-template");
    $tbody = $("tbody");
    $idFld.val("");

    /* Click event bindings */
    $(".wbdv-search").click(function() {
      searchUsers();
    });
    $(".wbdv-create").click(function() {
      createUser();
    });
    $(".wbdv-update").click(function() {
      updateUser();
    });

    /* On document load - Load all users */
    findAllUsers();
  }

  /* Handles create user event when user clicks on 
    plus icon. Reads from the form elements and creates 
    a user object. Uses the user service createUser() 
    function to create the new user. Updates the list 
    of users on server response */
  function createUser() {
    user = gatherDataFromInputFields(0);
    if (user != null) {
      userService.createUser(user).then(renderUser);
      clearInputFields();
    }
  }

  /* called whenever the list of users needs to be refreshed. 
  Uses user service findAllUsers() to retrieve all the users 
  and passes response to renderUsers */
  function findAllUsers() {
    // refresh User Table
    $tbody.find("tr:not(.wbdv-hidden)").remove();
    userService.findAllUsers().then(renderUsers);
  }

  /* called whenever a particular user needs to be retrieved 
  by their id, as in when a user is selected for editing. 
  Reads the user id from the icon id attribute. Uses user 
  service findUserById() to retrieve user and then updates 
  the form on server response */
  function findUserById(id) {
    userService.findUserById(id).then(renderUser);
  }

  function searchUsers() {
    var username = $usernameFld.val();
    var pass = $passwordFld.val();
    var fname = $firstNameFld.val();
    var lname = $lastNameFld.val();
    var role = $roleFld.val();

    $(".wbdv-user").each(function(i) {
      var el = $(this);
      var u = el.find(".wbdv-username").html();
      var p = el.find(".wbdv-password").html();
      var f = el.find(".wbdv-first-name").html();
      var l = el.find(".wbdv-last-name").html();
      var r = el.find(".wbdv-role").html();
      var searchCond =
        (isNull(username) ? true : u.includes(username)) &&
        (isNull(pass) ? true : p.includes(pass)) &&
        (isNull(fname) ? true : f.includes(fname)) &&
        (isNull(lname) ? true : l.includes(lname)) &&
        (isNull(role) ? true : r.includes(role));

      if (searchCond) el.attr("class", "wbdv-user");
      else el.attr("class", "wbdv-user wbdv-hidden");
    });
  }

  function isNull(val) {
    return val == "" || val == null;
  }

  /* handles delete user event when user clicks the cross icon. 
  Reads the user id from the icon id attribute. Uses user service 
  deleteUser() to send a delete request to the server. Updates 
  user list on server response */
  function deleteUser(id) {
    userService.deleteUser(id).then(findAllUsers);
  }

  /* selects user for editing */
  function selectUser(id) {
    $targetRow = $("#user" + id);
    $idFld.val(id);
    $usernameFld.val($targetRow.find(".wbdv-username").html());
    $passwordFld.val($targetRow.find(".wbdv-password").html());
    $firstNameFld.val($targetRow.find(".wbdv-first-name").html());
    $lastNameFld.val($targetRow.find(".wbdv-last-name").html());
    $roleFld.val($targetRow.find(".wbdv-role").html()).change();
  }

  /* handles update user event when user clicks on check mark 
  icon. Reads the user id from the icon id attribute. Reads 
  new user values form the form, creates a user object and 
  then uses user service updateUser() to send the new user 
  data to server. Updates user list on server response */
  function updateUser() {
    if ($idFld.val() == "") {
      alert(
        "Does not seem to be a row originally selected for editing. Try adding this as a new row."
      );
      return;
    }
    user = gatherDataFromInputFields($idFld.val());

    if (user != null) {
      userService.updateUser($idFld.val(), user).then(findAllUsers);
      clearInputFields();
    }
    $idFld.val("");
  }

  /* accepts a user object as parameter and updates the 
  form with the user properties */
  function renderUser(user) {
    var clone = $userRowTemplate.clone();
    clone.attr("class", "wbdv-user");
    clone.attr("id", "user" + user.id);
    clone.find(".wbdv-username").html(user.username);
    clone.find(".wbdv-password").html(user.password);
    clone.find(".wbdv-first-name").html(user.firstName);
    clone.find(".wbdv-last-name").html(user.lastName);
    clone.find(".wbdv-role").html(user.role);
    clone.on("click", ".wbdv-remove", function() {
      deleteUser(user.id);
    });
    clone.on("click", ".wbdv-edit", function() {
      selectUser(user.id);
    });
    $tbody.append(clone);
  }

  /* accepts an array of user instances, clears the current 
  content of the table body, iterates over the array of users, 
  clones a table row template for each user instance, populates 
  the table row with the user object properties, adds the table 
  row to the table body */
  function renderUsers(users) {
    for (var u = 0; u < users.length; u++) {
      renderUser(users[u]);
    }
  }

  /* Input Validation - Only required inputs */
  function inputValidation(user, pass, fname, lname, role) {
    if (
      user == null ||
      pass == null ||
      fname == null ||
      lname == null ||
      role == null ||
      user == "" ||
      pass == "" ||
      fname == "" ||
      lname == "" ||
      role == ""
    ) {
      alert("All fields required");
      return false;
    }

    return true;
  }

  /* Generate a random Id for a new user */
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /* Get the form field values, do a basic input validation and 
  return a new User object */
  function gatherDataFromInputFields(id) {
    var username = $usernameFld.val();
    var pass = $passwordFld.val();
    var fname = $firstNameFld.val();
    var lname = $lastNameFld.val();
    var role = $roleFld.val();

    // validating if all field values present
    if (!inputValidation(username, pass, fname, lname, role)) return null;

    if (id == 0) id = randomInt(100, 999);

    return new User(id, username, pass, fname, lname, role);
  }

  /* Clears all the input field values */
  function clearInputFields() {
    $usernameFld.val("");
    $passwordFld.val("");
    $firstNameFld.val("");
    $lastNameFld.val("");
    $roleFld.val("");
  }
})();
