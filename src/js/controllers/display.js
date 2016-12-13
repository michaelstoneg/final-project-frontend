angular.module('finalProject')
  .controller('DisplaysIndexController', DisplaysIndexController)
  .controller('DisplayShowController', DisplayShowController)
  .controller('DisplayEditController', DisplayEditController)
  .controller('DisplayNewController', DisplayNewController);

DisplaysIndexController.$inject = ['Display', '$auth'];
function DisplaysIndexController(Display, $auth) {
  const displaysIndex = this;

  displaysIndex.all = Display.query();

  function isOwnDisplay(display) {
    return display.user.id === $auth.getPayload().id;
  }

  displaysIndex.isOwnDisplay = isOwnDisplay;
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

DisplayEditController.$inject = ['Display','$state', '$auth', 'Item'];
function DisplayEditController(Display, $state, $auth, Item) {
  const displayEdit = this;

  displayEdit.display = Display.get($state.params);
  displayEdit.allItems = Item.query();

  // if(displayEdit.display.user.id !== $auth.getPayload().id) {
  //   $state.go('displaysIndex');
  // }

  function update() {
    Display.update({id: displayEdit.display.id}, displayEdit.display, () => {
      $state.go('displayShow', $state.params);
    });
  }

  displayEdit.update = update;
  displayEdit.isLoggedIn = $auth.isAuthenticated;
}

DisplayNewController.$inject = ['Display','$state' ];
function DisplayNewController(Display, $state) {

  const displayNew = this;

  function create () {
    Display.save(displayNew.display, (res) => {
      console.log('response', res);
      $state.go('displaysIndex');
    });
  }

  displayNew.create = create;
}
