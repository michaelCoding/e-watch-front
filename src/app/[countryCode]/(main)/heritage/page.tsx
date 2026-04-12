export const runtime = 'edge';

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Heritage — Aevum',
  description: "The architecture of time. Aevum's story of precision craftsmanship since 1892.",
}

const values = [
  {
    icon: 'diamond',
    title: 'Swiss Precision',
    body: 'Every movement is assembled by master watchmakers with decades of experience, tolerances measured in microns.',
  },
  {
    icon: 'eco',
    title: 'Sustainable Craft',
    body: 'Responsibly sourced titanium and sapphire crystal, with a commitment to net-zero production by 2030.',
  },
  {
    icon: 'verified',
    title: 'Lifetime Guarantee',
    body: 'Every Aevum timepiece is guaranteed for life. A watch should outlast its owner — ours do.',
  },
]

export default function HeritagePage() {
  return (
    <main className="bg-surface">

      {/* Hero */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?w=1600&q=80"
            alt="Watch movement macro photography"
            className="w-full h-full object-cover grayscale opacity-85 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface" />
        </div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-6">
            Established 1892
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-on-surface leading-none mb-8">
            The Architecture <br /> of Time
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            For over a century, Aevum has been at the intersection of art and engineering, crafting timepieces that transcend function.
          </p>
        </div>
      </header>

      {/* Story */}
      <section className="py-32 px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-6">Our Story</p>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-10 leading-tight">
            Precision is not a feature. It is a philosophy.
          </h2>
          <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
            <p>
              Aevum was founded in 1892 in Geneva by Heinrich Voss, a mechanical engineer who believed that a watch was not merely a device for measuring time, but a physical embodiment of human mastery over it.
            </p>
            <p>
              Today, we combine the heritage of that founding philosophy with the precision of modern materials science — titanium unibodies, sapphire crystals, and the industry&apos;s most advanced biometric sensor arrays.
            </p>
            <p>
              Each timepiece leaves our atelier only when it has passed 72 hours of continuous accuracy testing. We do not ship a watch; we ship a commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">{v.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-4">{v.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
