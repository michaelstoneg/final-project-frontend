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
    ;

  $urlRouterProvider.otherwise('/users');
}
