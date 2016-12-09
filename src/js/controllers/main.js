angular.module('finalProject')
  .controller('MainController', MainController);


MainController.$inject = ['$auth', '$state', '$rootScope', 'User'];
function MainController($auth, $state, $rootScope, User) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('landing');
    });
  }

  if ($auth.getPayload()){
    main.currentUserId = $auth.getPayload().id;
  }

  main.currentUser = User.get({id: main.currentUserId });


  const protectedStates = ['usersIndex', 'userShow', 'userEdit'];

  function secureState(e, toState, toParams) {
    // console.log(toState, toParams);
    console.log('state id', toParams.id );
    // console.log('user id', $auth.getPayload().id );


    main.message = null;
    console.log(toState, e);
    if((!$auth.isAuthenticated() &&
    protectedStates.includes(toState.name)) ||
    (toState.name === 'userEdit' && parseFloat(toParams.id) !== $auth.getPayload().id)) {
      e.preventDefault();
      main.message = 'You must be logged in to go there!';
      if ($auth.isAuthenticated()) {
        $state.go('usersIndex');
      } else {
        $state.go('login');
      }
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
