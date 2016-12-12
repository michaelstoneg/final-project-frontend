angular.module('finalProject')
  .factory('Display', Display);

Display.$inject = ['$resource', 'API_URL'];
function Display($resource, API_URL) {
  return new $resource(`${API_URL}/displays/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
