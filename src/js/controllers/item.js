angular.module('finalProject')
  .controller('ItemsIndexController', ItemsIndexController)
  .controller('ItemShowController', ItemShowController);
  // .controller('DisplayEditController', DisplayEditController);

ItemsIndexController.$inject = ['Item'];
function ItemsIndexController(Item) {
  const itemsIndex = this;

  itemsIndex.all = Item.query();

}

ItemShowController.$inject = ['Item','$state', '$auth'];
function ItemShowController(Item, $state, $auth) {
  const itemShow = this;

  itemShow.item = Item.get($state.params);

  function deleteItem() {
    itemShow.item.$remove(() => {
      $state.go('ItemsIndex');
    });
  }

  // User.get({ id: $auth.getPayload()._id }, (user) => {
  //   userShow.user = user;
  // });

  itemShow.delete = deleteItem;
  itemShow.isLoggedIn = $auth.isAuthenticated;
}
//
// DisplayEditController.$inject = ['Display','$state', '$auth'];
// function DisplayEditController(Display, $state, $auth) {
//   const displayEdit = this;
//
//   displayEdit.user = Display.get($state.params);
//
//   function update() {
//     Display.update({id: displayEdit.user.id}, displayEdit.user, () => {
//       $state.go('displayShow', $state.params);
//     });
//   }
//
//   displayEdit.update = update;
//   displayEdit.isLoggedIn = $auth.isAuthenticated;
// }
