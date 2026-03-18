export function Header() {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-white tracking-tight">My Tasks</h1>
      <p className="mt-1 text-slate-400 text-sm">{today}</p>
    </div>
  )
}
