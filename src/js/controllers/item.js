angular.module('finalProject')
  .controller('ItemsIndexController', ItemsIndexController)
  .controller('ItemShowController', ItemShowController)
  .controller('ItemEditController', ItemEditController);

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
ItemEditController.$inject = ['Item','$state', '$auth'];
function ItemEditController(Item, $state, $auth) {
  const itemEdit = this;

  itemEdit.item = Item.get($state.params);

  function update() {
    Item.update({id: itemEdit.item.id}, itemEdit.item, () => {
      $state.go('itemShow', $state.params);
    });
  }

  itemEdit.update = update;
  itemEdit.isLoggedIn = $auth.isAuthenticated;
}
