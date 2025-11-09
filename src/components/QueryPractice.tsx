import React, { useState } from 'react'
import { format } from 'sql-formatter'
import { runSQLQuery } from '@/lib/SQLReader'
import type { SQLQueryResult } from '@/lib/SQLReader'

const QueryPractice = () => {
  const [queryInput, setQueryInput] = useState('')
  const [queryState, setQueryState] = useState<SQLQueryResult | null>(null)

  async function runQuery(evt: React.FormEvent, query: string) {
    evt.preventDefault()
    try {
      const result = await runSQLQuery(query)
      setQueryState(result)
    } catch (err: unknown) {
      console.error('Error al ejecutar la consulta:', err)
      setQueryState({
        query,
        table: 'unknown',
        columns: 'unknown',
        values: [['Error de consulta SQL, revisa la sintaxis']],
      })
    }
  }

  function cleanSingleQuery() {
    setQueryState(null)
    setQueryInput('')
  }

  function formatSQL() {
    try {
      const formatted = format(queryInput, { language: 'mysql' })
      setQueryInput(formatted)
    } catch (err) {
      console.error('Error al formatear SQL:', err)
    }
  }

  return (
    <div className='flex flex-col items-start gap-4 p-4 bg-[#effef4] border-2 border-[#73EAA480] rounded-3xl mb-12'>
      <div className='grid grid-cols-2 gap-4 w-full'>
        <h2>Consola de SQL:</h2>
        <p>Resultados:</p>
        <form
          onSubmit={(evt) => runQuery(evt, queryInput)}
          className='flex flex-col gap-y-2'
        >
          <textarea
            className='bg-white h-[180px] p-2 text-sm border border-gray-300 font-mono rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-300'
            onChange={(evt) => setQueryInput(evt.target.value)}
            value={queryInput}
            placeholder='Escribe tu consulta SQL aquí...'
          />
          <div className='flex gap-x-2 items-center justify-around px-16'>
            <button
              className='cursor-pointer border border-gray-400 rounded-lg px-2 py-1'
              onClick={cleanSingleQuery}
              type='button'
            >
              Limpiar
            </button>
            <button
              type='button'
              className='cursor-pointer border border-gray-400 rounded-lg px-2 py-1'
              onClick={formatSQL}
            >
              Format SQL
            </button>
            <button
              className='cursor-pointer border border-gray-400 rounded-lg px-2 py-1'
              type='submit'
            >
              Ejecutar
            </button>
          </div>
        </form>
        <div>
          {queryState && (
            <div
              className={` ${
                queryState.table === 'unknown' ? 'text-red-500 text-xl' : ''
              }`}
            >
              <small>
                {queryState.values.map((row) => row.join(' ')).join(', ')}
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QueryPractice
