module.exports.up = async db => {
  await db.schema.createTable('message', table => {
    table
      .uuid('id')
      .notNullable()
      .primary();
    table.text('content');
    table.timestamps(false, true);
  });
};

module.exports.down = async db => {
  await db.schema.dropTableIfExists('message');
};

module.exports.configuration = { transaction: true };
