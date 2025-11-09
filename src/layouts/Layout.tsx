import Header from '../components/Header'
import QueryPractice from '../components/QueryPractice'
import Footer from '../components/Footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <p className='md:hidden flex text-center absolute top-1/2 -translate-y-1/2 text-lg px-8'>
        Esta web está diseñada actualmente para dispositivos más grandes, se
        está trabajando para adaptarla a dispositivos más pequeños.
      </p>
      <main className='min-h-screen max-w-[75%] p-10 mx-auto hidden md:block'>
        <h1 className='text-4xl font-extrabold pb-10 text-[#221d1d]'>
          Northwind SQL Practice{' '}
          <span className='text-2xl text-[#8f8e8e]'>by Albert Lanza</span>
        </h1>
        <Header />
        <QueryPractice />
        <section className='flex flex-col gap-y-8 max-w-screen'>
          {children}
        </section>
        <Footer />
      </main>
    </>
  )
}

export default Layout
