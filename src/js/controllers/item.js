angular.module('finalProject')
  .controller('ItemsIndexController', ItemsIndexController)
  .controller('ItemShowController', ItemShowController)
  .controller('ItemEditController', ItemEditController)
  .controller('ItemNewController', ItemNewController);

ItemsIndexController.$inject = ['Item'];
function ItemsIndexController(Item) {
  const itemsIndex = this;

  itemsIndex.all = Item.query();

}

ItemShowController.$inject = ['Item','$state', '$auth'];
function ItemShowController(Item, $state, $auth) {
  const itemShow = this;

  itemShow.item = Item.get($state.params);


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
  function deleteItem() {
    itemEdit.item.$remove(() => {
      $state.go('itemsIndex');
    });
  }

  itemEdit.delete = deleteItem;
  itemEdit.update = update;
  itemEdit.isLoggedIn = $auth.isAuthenticated;
}

ItemNewController.$inject = ['Item','$state'];
function ItemNewController(Item, $state) {

  const itemNew = this;

  function create () {
    Item.save(itemNew.item, (res) => {
      console.log('response', res);
      $state.go('itemsIndex');
    });
  }

  itemNew.create = create;
}
