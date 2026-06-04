export default function CISSPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', marginTop: '-2.5rem' }}>
      {children}
    </div>
  )
}
