import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'warmad_api_jcwdbsd40',
  password: 'abc12345',
});

export default pool;
