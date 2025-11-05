import { useState } from 'react'
import { format } from 'sql-formatter'
import { runSQLQuery } from '@/lib/SQLReader'
import type { SQLQueryResult } from '@/lib/SQLReader'

type Props = {
  queryNum: number
  queryTitle: string
  queryProp: string
}

const QueryConsultor = ({ queryNum, queryTitle, queryProp }: Props) => {
  const [queryState, setQueryState] = useState<SQLQueryResult | null>(null)

  async function runQuery(query: string) {
    const result = await runSQLQuery(query)
    setQueryState(result)
  }

  function cleanSingleQuery() {
    setQueryState(null)
  }

  // function randomBckgColor() {
  //   const colors = [
  //     'border-[#9896FF]',
  //     'border-[#FF3200]',
  //     'border-[#008AFF]',
  //     'border-[#00827B]',
  //     'border-[#FFB400]',
  //     'border-[#39D1F9]',
  //   ]
  //   return colors[Math.floor(Math.random() * colors.length)]
  // }
  // const bckgColor = randomBckgColor()

  return (
    <article className='relative bg-[#F7F7F6] border-2 border-[#00498B80] rounded-xl px-8 py-4 shadow-sm'>
      <span className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-10 text-lg flex items-center justify-center bg-[#00498B] text-white font-semibold rounded-full'>
        {queryNum}
      </span>
      <h3 className='text-xl'>{queryTitle}</h3>
      <div className='grid grid-cols-[0.2fr_0.8fr] gap-10 min-w-full pt-6'>
        <div className='flex flex-col gap-y-2'>
          <button
            className='cursor-pointer bg-[#00498B50] border border-[#5589C5] px-2 py-1 rounded-md hover:scale-105 transition-all'
            onClick={() => runQuery(queryProp)}
          >
            Resolver query
          </button>
          <button
            className='cursor-pointer bg-[#FFC38B] border border-[#FF3200] px-2 py-1 rounded-md hover:scale-105 transition-all'
            onClick={cleanSingleQuery}
          >
            Limpiar query
          </button>
        </div>
        {queryState && (
          <div className='flex flex-col flex-wrap'>
            <p>
              <strong>Query:</strong>
            </p>
            <pre className='bg-[#B6B6B660] border-2 border-[#B6B6B6] p-4 rounded text-sm whitespace-pre-wrap w-fit'>
              {format(queryState.query, { language: 'mysql' })}
            </pre>
            <p>
              <strong>Value:</strong>
            </p>
            {/* <small>{queryState.values.map((row) => row[0]).join(', ')}</small> */}
            <small>
              {queryState.values.map((row) => row.join(' ')).join(', ')}
            </small>
          </div>
        )}
      </div>
    </article>
  )
}

export default QueryConsultor
