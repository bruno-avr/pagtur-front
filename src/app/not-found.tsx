import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="container d-flex align-items-center justify-content-center mt-5">
      <div className='mt-5'>
        <h2>Página não encontrada.</h2>
        <p>A página que você busca não foi encontrada.</p>
        <Link href="/">Retornar para a página principal.</Link>
      </div>
    </div>
  )
}