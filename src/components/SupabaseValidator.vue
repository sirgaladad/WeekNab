<template>
  <div class="validator-container">
    <h2>Supabase Validation Results</h2>
    
    <div v-if="loading" class="loading">
      Validating Supabase setup...
    </div>

    <div v-else>
      <!-- Connection Status -->
      <div class="status-section">
        <h3>Connection Status</h3>
        <div :class="['status', results.connection ? 'success' : 'error']">
          {{ results.connection ? 'Connected' : 'Not Connected' }}
        </div>
      </div>

      <!-- Errors -->
      <div v-if="results.errors.length > 0" class="error-section">
        <h3>Errors</h3>
        <ul>
          <li v-for="(error, index) in results.errors" :key="index" class="error">
            {{ error }}
          </li>
        </ul>
      </div>

      <!-- Tables -->
      <div v-if="results.tables.length > 0" class="tables-section">
        <h3>Tables Found</h3>
        <div v-for="table in results.tables" :key="table" class="table-details">
          <h4>{{ table }}</h4>
          <div v-if="results.tableDetails[table]">
            <p>Row Count: {{ results.tableDetails[table].rowCount }}</p>
            
            <!-- Columns -->
            <div v-if="results.tableDetails[table].columns">
              <h5>Columns</h5>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Nullable</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="col in results.tableDetails[table].columns" :key="col.column_name">
                    <td>{{ col.column_name }}</td>
                    <td>{{ col.data_type }}</td>
                    <td>{{ col.is_nullable }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Sample Data -->
            <div v-if="results.tableDetails[table].sample">
              <h5>Sample Data</h5>
              <pre>{{ JSON.stringify(results.tableDetails[table].sample, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { validateSupabaseSetup } from '@/lib/supabase-validator'

const loading = ref(true)
const results = ref({
  connection: false,
  tables: [] as string[],
  tableDetails: {} as Record<string, any>,
  errors: [] as string[]
})

onMounted(async () => {
  try {
    results.value = await validateSupabaseSetup()
  } catch (error) {
    results.value.errors.push(`Validation error: ${error.message}`)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.validator-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-style: italic;
}

.status-section {
  margin-bottom: 2rem;
}

.status {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: inline-block;
}

.success {
  background-color: #4ade80;
  color: #064e3b;
}

.error {
  background-color: #f87171;
  color: #7f1d1d;
}

.error-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 4px;
}

.tables-section {
  margin-top: 2rem;
}

.table-details {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

th, td {
  padding: 0.5rem;
  text-align: left;
  border: 1px solid #e5e7eb;
}

th {
  background-color: #f3f4f6;
}

pre {
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}
</style> 