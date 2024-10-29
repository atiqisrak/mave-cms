const RouteGenerator = {
  generateRoutes: (modelName) => {
    const lowerModel = modelName.toLowerCase();
    const routes = `
  Route::get('/${lowerModel}', [${modelName}Controller::class, 'index']);
  Route::get('/${lowerModel}/{id}', [${modelName}Controller::class, 'show']);
  Route::post('/${lowerModel}', [${modelName}Controller::class, 'store']);
  Route::put('/${lowerModel}/{id}', [${modelName}Controller::class, 'update']);
  Route::delete('/${lowerModel}/{id}', [${modelName}Controller::class, 'destroy']);
      `;
    return routes;
  },
};

export default RouteGenerator;
