import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

async function runDemoData() {
  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'populate-demo-data.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    // Split the SQL into separate statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    // Execute each statement
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { sql: statement })
      if (error) {
        console.error('Error executing SQL:', error)
        process.exit(1)
      }
    }

    console.log('Demo data populated successfully!')
  } catch (error) {
    console.error('Error running demo data script:', error)
    process.exit(1)
  }
}

runDemoData() 