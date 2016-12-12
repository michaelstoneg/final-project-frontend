angular.module('finalProject')
  .controller('DisplaysIndexController', DisplaysIndexController)
  .controller('DisplayShowController', DisplayShowController)
  .controller('DisplayEditController', DisplayEditController);

DisplaysIndexController.$inject = ['Display'];
function DisplaysIndexController(Display) {
  const displaysIndex = this;

  displaysIndex.all = Display.query();

}

DisplayShowController.$inject = ['Display','$state', '$auth'];
function DisplayShowController(Display, $state, $auth) {
  const displayShow = this;

  displayShow.display = Display.get($state.params);

  function deleteDisplay() {
    displayShow.user.$remove(() => {
      $state.go('displaysIndex');
    });
  }

  // User.get({ id: $auth.getPayload()._id }, (user) => {
  //   userShow.user = user;
  // });

  displayShow.delete = deleteDisplay;
  displayShow.isLoggedIn = $auth.isAuthenticated;
}

DisplayEditController.$inject = ['Display','$state', '$auth'];
function DisplayEditController(Display, $state, $auth) {
  const displayEdit = this;

  displayEdit.display = Display.get($state.params);

  function update() {
    Display.update({id: displayEdit.display.id}, displayEdit.display, () => {
      $state.go('displayShow', $state.params);
    });
  }

  displayEdit.update = update;
  displayEdit.isLoggedIn = $auth.isAuthenticated;
}
