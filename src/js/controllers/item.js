angular.module('finalProject')
  .controller('ItemsIndexController', ItemsIndexController)
  .controller('ItemShowController', ItemShowController)
  .controller('ItemEditController', ItemEditController)
  .controller('ItemNewController', ItemNewController);

ItemsIndexController.$inject = ['Item', '$state', '$auth'];
function ItemsIndexController(Item, $state, $auth) {
  const itemsIndex = this;

  itemsIndex.all = Item.query();

  //random card size//
  let realRandom = undefined;
  let preRandom = Math.floor((Math.random() * 10) + 1);
  if (preRandom % 2 === 0) {
    realRandom = preRandom;
  }
  itemsIndex.random = 'col-' + realRandom ;
  console.log(itemsIndex.random);

}

ItemShowController.$inject = ['Item','$state', '$auth'];
function ItemShowController(Item, $state, $auth) {
  const itemShow = this;

  itemShow.item = Item.get($state.params);


  itemShow.isLoggedIn = $auth.isAuthenticated;
}


ItemEditController.$inject = ['Item','$state', '$auth'];
function ItemEditController(Item, $state, $auth) {
  const itemEdit = this;

  console.log('id source', $state.params);

  itemEdit.item = Item.get($state.params);
  console.log('showing item', itemEdit.item);

  function update() {
    Item.update({id: itemEdit.item.id}, itemEdit.item, () => {
      $state.go('itemShow', $state.params);
    });
  }
  function deleteItem() {
    console.log('removing', itemEdit.item);
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
