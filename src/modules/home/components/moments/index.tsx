import LocalizedClientLink from '@modules/common/components/localized-client-link'

const watches = [
  {
    name: 'Stealth Titanium',
    edition: 'Midnight Black Edition',
    price: '$1,290.00',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80',
    href: '/store',
  },
  {
    name: 'Origin Silver',
    edition: 'Brushed Steel Edition',
    price: '$1,150.00',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1548171915-f38b7035c296?w=600&q=80',
    href: '/store',
  },
  {
    name: 'Horizon Gold',
    edition: '24k Rose Plated',
    price: '$1,850.00',
    badge: null,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80',
    href: '/store',
  },
  {
    name: 'Aero Carbon',
    edition: 'Racing Weave Series',
    price: '$1,490.00',
    badge: null,
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
    href: '/store',
  },
]

export default function Moments() {
  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col medium:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
              Curated Selection
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-on-surface">Precision Pieces</h2>
          </div>
          <LocalizedClientLink
            href="/store"
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 font-semibold"
          >
            View All Collections
            <span className="material-symbols-outlined">arrow_forward</span>
          </LocalizedClientLink>
        </div>

        {/* 4-up grid */}
        <div className="grid grid-cols-2 large:grid-cols-4 gap-8">
          {watches.map((w) => (
            <LocalizedClientLink
              key={w.name}
              href={w.href}
              className="group relative flex flex-col bg-surface-container-lowest rounded-xl p-6 transition-all duration-500 hover:shadow-[-20px_0_40px_rgba(0,0,0,0.03)]"
            >
              {w.badge && (
                <div className="absolute top-6 right-6 z-10">
                  <span className="px-3 py-1 bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {w.badge}
                  </span>
                </div>
              )}
              <div className="aspect-square mb-8 overflow-hidden rounded-lg flex items-center justify-center p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="text-lg font-bold text-on-surface">{w.name}</h3>
              <p className="text-sm text-on-surface-variant mb-4 tracking-tight">{w.edition}</p>
              <p className="text-xl font-bold text-on-background mt-auto">{w.price}</p>
            </LocalizedClientLink>
          ))}
        </div>

      </div>
    </section>
  )
}
