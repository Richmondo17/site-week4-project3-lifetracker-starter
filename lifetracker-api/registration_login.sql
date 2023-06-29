\echo 'Delete and recreate registration_login db?'
\prompt 'Return for yes or control-C to cancel > ' answer 

DROP DATABASE registration_login;
CREATE DATABASE registration_login;
\connect registration_login;

