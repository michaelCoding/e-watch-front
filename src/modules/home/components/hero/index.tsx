import Image from 'next/image'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

type HeroConfig = {
  headline: string
  text: string
  cta: { text: string; link: string }
  image: { url: string; alt: string }
}

const Hero = ({ data }: { data: HeroConfig }) => {
  return (
    <section className="relative min-h-[921px] flex flex-col items-center justify-center px-8 overflow-hidden">
      <div className="max-w-7xl w-full grid grid-cols-1 large:grid-cols-12 gap-12 items-center">

        {/* Left: text */}
        <div className="large:col-span-6 z-10">
          <h1 className="text-6xl medium:text-8xl font-bold tracking-tight text-on-surface leading-[1.1] mb-6">
            The Art of <br />
            <span className="text-gradient">Precision.</span>
          </h1>
          <p className="text-xl medium:text-2xl text-on-surface-variant mb-10 max-w-lg leading-relaxed">
            {data.text}
          </p>
          <div className="flex flex-wrap gap-4">
            <LocalizedClientLink
              href={data.cta.link}
              className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold rounded-full glow-primary transition-all duration-300"
            >
              {data.cta.text}
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/heritage"
              className="px-8 py-4 bg-surface-container-highest text-on-surface font-semibold rounded-full hover:bg-surface-container-high transition-all duration-300 flex items-center gap-2"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Watch the Film
            </LocalizedClientLink>
          </div>
        </div>

        {/* Right: watch image with glow */}
        <div className="large:col-span-6 relative flex justify-center large:justify-end">
          <div className="absolute -z-10 w-[140%] h-[140%] bg-primary-fixed/20 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Image
            src={data.image.url}
            alt={data.image.alt}
            width={640}
            height={640}
            priority
            className="w-full max-w-2xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero
