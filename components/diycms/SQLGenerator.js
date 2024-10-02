const SQLGenerator = {
  generateCreateTableQuery: (tableName, fields) => {
    let query = `Schema::create('${tableName}', function (Blueprint $table) {\n`;
    query += `  $table->id();\n`;

    fields.forEach((field) => {
      if (field.connection) {
        // Handle foreign keys
        query += `  $table->unsignedBigInteger('${field.name}')->nullable();\n`;
        query += `  $table->foreign('${field.name}')->references('${
          field.connection.field
        }')->on('${field.connection.model.toLowerCase()}').onDelete('cascade');\n`;
      } else if (field.type === "json") {
        query += `  $table->json('${field.name}')->nullable();\n`;
      } else {
        query += `  $table->${mapFieldType(field.type)}('${
          field.name
        }')->nullable();\n`;
      }
    });

    query += `  $table->timestamps();\n`;
    query += `});`;

    return query;
  },

  generateModel: (modelName, fields) => {
    let model = `<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass ${modelName} extends Model\n{\n`;
    model += `  protected $table = '${modelName.toLowerCase()}s';\n\n`;
    model += `  protected $fillable = [\n    ${fields
      .map((f) => `'${f.name}'`)
      .join(", ")}\n  ];\n\n`;

    // Relationships
    fields.forEach((field) => {
      if (field.connection) {
        const relationshipType =
          field.connection.type === "hasMany" ? "hasMany" : "belongsTo";
        model += `  public function ${field.name}()\n  {\n`;
        model += `    return $this->${relationshipType}(${capitalize(
          field.connection.model
        )}::class, '${field.name}', '${field.connection.field}');\n`;
        model += `  }\n\n`;
      }
    });

    model += "}";
    return model;
  },
};

const mapFieldType = (type) => {
  switch (type) {
    case "string":
      return "string";
    case "number":
      return "integer";
    case "boolean":
      return "boolean";
    case "date":
      return "date";
    case "json":
      return "json";
    default:
      return "string";
  }
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default SQLGenerator;
