angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('landing', {
      url: '/landing',
      templateUrl: '/templates/landing.html'
      // controller: 'UsersIndexController as usersIndex'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('userShow', {
      url: '/users/:id',
      templateUrl: '/templates/userShow.html',
      controller: 'UserShowController as userShow'
    })
    .state('userEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/userEdit.html',
      controller: 'UserEditController as userEdit'
    })
    .state('displaysIndex', {
      url: '/displays',
      templateUrl: '/templates/displaysIndex.html',
      controller: 'DisplaysIndexController as displaysIndex'
    })
    .state('displayShow', {
      url: '/displays/:id',
      templateUrl: '/templates/displayShow.html',
      controller: 'DisplayShowController as displayShow'
    })
    .state('displayEdit', {
      url: '/displays/:id',
      templateUrl: '/templates/displayEdit.html',
      controller: 'DisplayEditController as displayEdit'
    })
    .state('itemsIndex', {
      url: '/items',
      templateUrl: '/templates/itemsIndex.html',
      controller: 'ItemsIndexController as itemsIndex'
    })
    .state('itemShow', {
      url: '/items/:id',
      templateUrl: '/templates/itemShow.html',
      controller: 'ItemShowController as itemShow'
    })
    ;

  $urlRouterProvider.otherwise('/users');
}
