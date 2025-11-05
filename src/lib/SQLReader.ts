import type { SqlValue } from 'sql.js'
import type initSqlJs from 'sql.js'

declare global {
  interface Window {
    initSqlJs?: (
      config?: initSqlJs.SqlJsConfig
    ) => Promise<initSqlJs.SqlJsStatic>
  }
}

export interface SQLQueryResult {
  query: string
  table: string
  columns: string
  values: SqlValue[][]
}

/**
 * Ejecuta una consulta SQL sobre la base de datos `/northwind.db`
 * usando sql.js desde CDN.
 *
 * @param query - Consulta SQL a ejecutar.
 * @returns Promise<SQLQueryResult> con la query, nombre de la tabla y los valores.
 */
export async function runSQLQuery(query: string): Promise<SQLQueryResult> {
  try {
    if (!window.initSqlJs) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src =
          'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/sql-wasm.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Error loading sql.js'))
        document.body.appendChild(script)
      })
    }

    const response = await fetch('/northwind.db')
    if (!response.ok) throw new Error(`Cannot fetch DB at /northwind.db`)
    const bytes = new Uint8Array(await response.arrayBuffer())

    const SQL = await window.initSqlJs({
      locateFile: () =>
        'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/sql-wasm.wasm',
    })
    const db = new SQL.Database(bytes)

    const res = db.exec(query)

    if (res.length === 0) {
      db.close()
      return { query, table: 'unknown', columns: 'unknown', values: [] }
    }

    const { columns, values } = res[0]

    const match = query.match(/from\s+([^\s;]+)/i)
    const tableName = match ? match[1].replace(/["'`]/g, '') : 'unknown'

    db.close()

    return {
      query,
      table: tableName,
      columns: columns[0],
      values,
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message)
    }
    throw new Error('Unknown error occurred')
  }
}
