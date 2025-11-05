import { useEffect, useState } from 'react'

const Header = () => {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      // const seconds = String(now.getSeconds()).padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className='flex items-center justify-around gap-4 p-4 bg-[#fbf8d2] border-2 border-[#FFB40080] rounded-3xl mb-12'>
      <div className='flex gap-x-6'>
        <a
          href='https://sqlzoo.net/wiki/SQL_Tutorial'
          target='_blank'
          rel='noreferrer noopener'
          className='hover:underline'
        >
          Buena documentación de SQL
        </a>
        <a
          href='/Northwind_BDD.png'
          target='_blank'
          rel='noreferrer noopener'
          className='hover:underline'
        >
          Mirar la imagen de la DDBB
        </a>
        <a
          href='https://github.com/jpwhite3/northwind-SQLite3?tab=readme-ov-file'
          target='_blank'
          rel='noreferrer noopener'
          className='hover:underline'
        >
          Descarga la base de datos aquí
        </a>
      </div>
      <span className='font-bold text-lg'>{time} h.</span>
    </div>
  )
}

export default Header
