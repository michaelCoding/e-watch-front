const features = [
  {
    icon: 'monitor_heart',
    title: 'Bio-Metric Tracking',
    body: 'Sophisticated sub-dermal sensors track vitals with hospital-grade accuracy, providing real-time data without compromising battery life.',
  },
  {
    icon: 'battery_charging_full',
    title: '7-Day Battery Life',
    body: 'Our proprietary energy-harvesting chipset allows for a full week of heavy usage on a single 30-minute charge.',
  },
  {
    icon: 'water_drop',
    title: '50m Water Resistance',
    body: 'The unibody titanium case is vacuum-sealed to ensure precision operation even in the most extreme conditions.',
  },
]

interface QuietMomentProps {
  products?: unknown[]
}

export function QuietMoment({ products: _ }: QuietMomentProps) {
  return (
    <section className="py-32 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 large:grid-cols-2 gap-20 items-center">

        {/* Left: atmospheric image */}
        <div className="relative order-2 large:order-1">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1495584816685-4bdbf1b5057e?w=800&q=80"
            alt="Watch movement macro"
            className="rounded-xl w-full h-[600px] object-cover shadow-2xl"
          />
        </div>

        {/* Right: feature list */}
        <div className="order-1 large:order-2">
          <h2 className="text-4xl medium:text-5xl font-bold tracking-tight mb-12 leading-tight">
            Engineering the Invisible.
          </h2>
          <div className="space-y-12">
            {features.map((f) => (
              <div key={f.title} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-3xl">{f.icon}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{f.title}</h4>
                  <p className="text-on-surface-variant leading-relaxed">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
