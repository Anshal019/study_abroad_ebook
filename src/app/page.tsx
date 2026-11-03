import { BuyProvider } from '@/components/landing/buy'
import { Nav } from '@/components/landing/nav'
import { Hero } from '@/components/landing/hero'
import { WhatsInside } from '@/components/landing/inside'
import { Picker } from '@/components/landing/picker'
import { Preview } from '@/components/landing/preview'
import { Audience } from '@/components/landing/audience'
import { Pricing } from '@/components/landing/pricing'
import { Faq } from '@/components/landing/faq'
import { Disclaimer } from '@/components/landing/disclaimer'
import { Footer } from '@/components/landing/footer'
import { StickyBar } from '@/components/landing/sticky-bar'

export default function Home() {
  return (
    <BuyProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <Nav />
        <main className="flex-1">
          <Hero />
          <WhatsInside />
          <Picker />
          <Preview />
          <Audience />
          <Pricing />
          <Faq />
          <Disclaimer />
        </main>
        <Footer />
        <StickyBar />
      </div>
    </BuyProvider>
  )
}
