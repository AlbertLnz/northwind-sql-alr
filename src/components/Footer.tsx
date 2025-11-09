import GitHub from '@/assets/svgs/GitHub'
import LinkedIn from '@/assets/svgs/LinkedIn'

const Footer = () => {
  return (
    <div className='flex items-center justify-around gap-4 p-4 bg-[#edfffe] border-2 border-[#39BEB780] rounded-3xl mt-12'>
      <p className='flex items-center justify-center gap-x-3'>
        Si has hecho todos los ejercicios ☺️, házmelo saber por:
        <a
          href='https://www.linkedin.com/in/albert-lanza-rio/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <LinkedIn className='size-6 transition-all hover:scale-110' />
        </a>
      </p>
      <p className='flex items-center justify-center gap-x-3'>
        Si te ha gustado 🌟, dale una estrella al repositorio:
        <a
          href='https://github.com/AlbertLnz/northwind-sql-alr'
          target='_blank'
          rel='noreferrer noopener'
        >
          <GitHub
            className='size-6 transition-all hover:scale-110'
            color='#000'
          />
        </a>
      </p>
    </div>
  )
}

export default Footer
