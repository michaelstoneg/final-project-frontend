angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UserShowController', UserShowController)
  .controller('UserEditController', UserEditController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();

}

UserShowController.$inject = ['User','$state', '$auth'];
function UserShowController(User, $state, $auth) {
  const userShow = this;

  userShow.user = User.get($state.params);
  console.log(userShow.user);

  function deleteUser() {
    userShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }

  // User.get({ id: $auth.getPayload()._id }, (user) => {
  //   userShow.user = user;
  // });

  userShow.delete = deleteUser;
  userShow.isLoggedIn = $auth.isAuthenticated;
}

UserEditController.$inject = ['User','$state', '$auth'];
function UserEditController(User, $state, $auth) {
  const userEdit = this;

  userEdit.user = User.get($state.params);

  function update() {
    User.update({id: userEdit.user.id}, userEdit.user, () => {
      $state.go('userShow', $state.params);
    });
  }

  userEdit.update = update;
  userEdit.isLoggedIn = $auth.isAuthenticated;
}
