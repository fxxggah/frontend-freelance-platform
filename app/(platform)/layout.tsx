import { Navbar } from '@/components/navbar'

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Navbar />
      
      {/* pt-24 (96px) é o "ponto doce": 80px da nav + 16px de margem interna */}
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}