import { supabase } from './supabase'

export async function validateSupabaseSetup() {
  const results = {
    connection: false,
    tables: [] as string[],
    tableDetails: {} as Record<string, any>,
    errors: [] as string[]
  }

  try {
    // Test basic connection
    const { data: healthCheck, error: healthError } = await supabase.from('profiles').select('count')
    results.connection = !healthError

    if (healthError) {
      results.errors.push(`Connection error: ${healthError.message}`)
      return results
    }

    // Get list of all tables
    const { data: tablesData, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')

    if (tablesError) {
      results.errors.push(`Error fetching tables: ${tablesError.message}`)
    } else if (tablesData) {
      results.tables = tablesData.map(t => t.table_name)

      // Check each expected table
      for (const table of results.tables) {
        const { data: tableData, error: tableError } = await supabase
          .from(table)
          .select('count')
        
        results.tableDetails[table] = {
          exists: true,
          rowCount: tableData?.[0]?.count || 0,
          error: tableError?.message
        }

        // Get table structure
        const { data: columns, error: columnError } = await supabase
          .from('information_schema.columns')
          .select('column_name, data_type, is_nullable')
          .eq('table_name', table)
          .eq('table_schema', 'public')

        if (columnError) {
          results.errors.push(`Error fetching columns for ${table}: ${columnError.message}`)
        } else {
          results.tableDetails[table].columns = columns
        }
      }
    }

    // Validate specific requirements
    // Check profiles table
    if (results.tables.includes('profiles')) {
      const { data: profileSample, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)

      if (!profileError && profileSample) {
        results.tableDetails.profiles.sample = profileSample
      }
    }

    // Check demo_budgets table
    if (results.tables.includes('demo_budgets')) {
      const { data: demoSample, error: demoError } = await supabase
        .from('demo_budgets')
        .select('*')
        .limit(1)

      if (!demoError && demoSample) {
        results.tableDetails.demo_budgets.sample = demoSample
      }
    }

    return results
  } catch (error) {
    results.errors.push(`Unexpected error: ${error.message}`)
    return results
  }
} 