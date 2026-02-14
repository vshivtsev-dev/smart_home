ALTER SYSTEM SET log_checkpoints = off;
ALTER SYSTEM SET log_min_messages = warning;
SELECT pg_reload_conf();
