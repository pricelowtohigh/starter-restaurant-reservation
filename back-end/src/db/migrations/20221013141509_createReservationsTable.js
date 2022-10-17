exports.up = function (knex) {
    return knex.schema.createTable("reservations", (table) => {
      table.increments("reservation_id").primary();
      table.string("first_name");
      table.string("last_name");
      table.string("mobile_number");
      table.date("reservation_date");       // may need to change to integer? how to do dates in SQL?
      table.time("reservation_time");       // may need to change to integer? how to do time in SQL?
      table.integer("people");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("reservations");
  };
  