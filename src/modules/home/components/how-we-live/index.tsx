'use client'

export function HowWeLive() {
  return (
    <section className="py-32 px-8 bg-on-background text-surface">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl medium:text-4xl font-bold tracking-tight mb-6">
          Stay Ahead of Time.
        </h2>
        <p className="text-zinc-400 mb-12 text-lg">
          Receive early access to new collections and technical breakthroughs.
        </p>
        <form className="relative" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-zinc-900 border-none text-surface p-6 rounded-full focus:outline-none focus:ring-1 focus:ring-primary-container/40 transition-all placeholder:text-zinc-600"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-8 bg-surface text-on-background font-bold rounded-full hover:bg-primary-container transition-colors"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  )
}
