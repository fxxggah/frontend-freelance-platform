import { Navbar } from '@/components/navbar'

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </>
  )
}