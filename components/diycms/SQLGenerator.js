const SQLGenerator = {
  generateCreateTableQuery: (tableName, fields) => {
    let query = `CREATE TABLE ${tableName} (\n`;

    fields.forEach((field, index) => {
      query += `  ${field.name} ${mapFieldType(field.type)}`;
      if (field.required) query += " NOT NULL";
      if (field.unique) query += " UNIQUE";
      if (index < fields.length - 1) query += ",";
      query += "\n";
    });

    query += ");";
    return query;
  },
};

const mapFieldType = (type) => {
  switch (type) {
    case "string":
      return "VARCHAR(255)";
    case "number":
      return "INT";
    case "boolean":
      return "BOOLEAN";
    case "date":
      return "DATE";
    default:
      return "VARCHAR(255)";
  }
};

export default SQLGenerator;
