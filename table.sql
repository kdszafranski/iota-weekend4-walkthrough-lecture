CREATE TABLE tasks
(
  id SERIAL PRIMARY KEY,
  task_content character varying(250) NOT NULL,
  created_date timestamp without time zone NOT NULL DEFAULT now(),
  completed_date timestamp without time zone,
);