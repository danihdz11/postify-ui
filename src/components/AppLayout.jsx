import BottomNav from './BottomNav'

export default function AppLayout({ children, showNav = true }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <main className={`flex flex-1 flex-col ${showNav ? 'pb-20' : ''}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  )
}
