const ControllerGenerator = {
  generateController: (modelName, fields) => {
    const controllerName = `${modelName}Controller`;
    const lowerModel = modelName.toLowerCase();

    const controller = `
  <?php
  
  namespace App\\Http\\Controllers;
  
  use App\\Models\\${modelName};
  use Illuminate\\Http\\Request;
  
  class ${controllerName} extends Controller
  {
      // Get all ${modelName}s
      public function index() {
          return ${modelName}::all();
      }
  
      // Show a single ${modelName}
      public function show(\$id) {
          return ${modelName}::findOrFail(\$id);
      }
  
      // Store a new ${modelName}
      public function store(Request \$request) {
          \$this->validate(\$request, ${ControllerGenerator.generateValidationRules(
            fields
          )});
          return ${modelName}::create(\$request->all());
      }
  
      // Update a ${modelName}
      public function update(Request \$request, \$id) {
          \$this->validate(\$request, ${ControllerGenerator.generateValidationRules(
            fields
          )});
          \$${lowerModel} = ${modelName}::findOrFail(\$id);
          \$${lowerModel}->update(\$request->all());
          return \$${lowerModel};
      }
  
      // Delete a ${modelName}
      public function destroy(\$id) {
          ${modelName}::destroy(\$id);
          return response(null, 204);
      }
  }
      `;
    return controller;
  },

  generateValidationRules: (fields) => {
    let rules = "{\n";
    fields.forEach((field) => {
      rules += `            '${field.name}' => 'required',\n`;
    });
    rules += "        }";
    return rules;
  },
};

export default ControllerGenerator;
