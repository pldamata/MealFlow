import { query } from '../src/lib/db';
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  try {
    // Read the SQL file
    const sql = fs.readFileSync(
      path.join(process.cwd(), 'scripts', 'setup-database.sql'),
      'utf8'
    );

    // Execute the SQL
    await query(sql);
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();