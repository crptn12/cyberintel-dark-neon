import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Component {...pageProps} />
      </main>
    </div>
  )
}
