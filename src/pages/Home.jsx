import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

const Home = () => {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden hero-pattern">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-widest font-semibold shadow-sm">
              Ancient Tradition
            </div>
            <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-primary leading-tight font-bold">
              Heavenly Abode of <br />
              <span className="text-secondary italic">Lord Ayyappa</span>
            </h2>
            <p className="font-body-lg text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Step into a sanctuary where divine energy meets timeless devotion. Discover a path to the sacred, where your soul finds its facets answering the call of spiritual bliss.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to={ROUTES.ABOUT}
                className="bg-primary text-white px-8 py-3.5 rounded-full font-label-md text-sm shadow-xl shadow-primary/20 hover:bg-tertiary transition-all duration-300 transform hover:-translate-y-1 text-center min-w-[160px] font-semibold"
              >
                Explore Temple
              </Link>
              <Link 
                to={ROUTES.POOJA_DETAILS}
                className="border-2 border-primary text-primary px-8 py-3 rounded-full font-label-md text-sm hover:bg-primary/5 transition-all text-center min-w-[160px] font-semibold"
              >
                View Timings
              </Link>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative group lg:mt-0 mt-8">
            <div className="absolute inset-0 bg-primary/10 rounded-xl transform rotate-3 scale-105 blur-2xl group-hover:rotate-1 transition-transform duration-500"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                alt="Sri Kainari Ayyappan Kavu Temple"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                src="/images/temple9.jpg"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 px-6 bg-surface-container-low">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-8 rounded-lg text-center card-hover-effect border border-outline-variant/30">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">temple_hindu</span>
            </div>
            <h3 className="font-headline-md text-xl text-primary font-bold mb-4">Sacred Traditions</h3>
            <p className="font-body-md text-sm text-on-surface-variant italic leading-relaxed">
              "Walk within the soul to the fragrant bliss you'd buy yourself through ancient wisdom."
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-lg text-center card-hover-effect border border-outline-variant/30 shadow-xl shadow-primary/5">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <h3 className="font-headline-md text-xl text-primary font-bold mb-4">Divine Energy</h3>
            <p className="font-body-md text-sm text-on-surface-variant italic leading-relaxed">
              "Embrace the divine energy that flows through sacred traditions and celestial architecture."
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-lg text-center card-hover-effect border border-outline-variant/30">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">brightness_high</span>
            </div>
            <h3 className="font-headline-md text-xl text-primary font-bold mb-4">Eternal Light</h3>
            <p className="font-body-md text-sm text-on-surface-variant italic leading-relaxed">
              "Find peace in devotion and strength in faith's eternal light that guides every seeker."
            </p>
          </div>

        </div>
      </section>

      {/* Quick Links Bento Grid */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto bg-surface-container-highest/40 rounded-xl p-8 md:p-12 border border-outline-variant/20">
          <div className="text-center mb-12">
            <h2 className="font-display-lg text-3xl md:text-4xl text-primary font-bold">Quick Links</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            
            {/* About Link */}
            <Link 
              to={ROUTES.ABOUT} 
              className="col-span-1 md:col-span-2 group bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 card-hover-effect flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                <span className="material-symbols-outlined text-2xl">history_edu</span>
              </div>
              <h4 className="font-headline-md text-lg text-on-surface font-semibold mb-2">About</h4>
              <p className="font-body-md text-xs text-on-surface-variant hidden md:block">Learn our temple history and sacred heritage.</p>
            </Link>

            {/* Donation Link */}
            <Link 
              to={ROUTES.DONATION} 
              className="col-span-1 md:col-span-2 group bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 card-hover-effect flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 bg-secondary-container/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors duration-200">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>
              <h4 className="font-headline-md text-lg text-on-surface font-semibold mb-2">Donations</h4>
              <p className="font-body-md text-xs text-on-surface-variant hidden md:block">Support temple activities and welfare projects.</p>
            </Link>

            {/* Pooja Link */}
            <Link 
              to={ROUTES.POOJA_DETAILS} 
              className="col-span-1 md:col-span-2 group bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 card-hover-effect flex flex-col items-center justify-center text-center"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                <span className="material-symbols-outlined text-2xl">spa</span>
              </div>
              <h4 className="font-headline-md text-lg text-on-surface font-semibold mb-2">Pooja Services</h4>
              <p className="font-body-md text-xs text-on-surface-variant hidden md:block">Book your spiritual ceremonies and offerings.</p>
            </Link>

            {/* Gallery Link */}
            <Link 
              to={ROUTES.GALLERY} 
              className="col-span-1 md:col-span-3 group bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 card-hover-effect flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                <span className="material-symbols-outlined text-2xl">photo_library</span>
              </div>
              <div>
                <h4 className="font-headline-md text-lg text-on-surface font-semibold mb-1">Gallery</h4>
                <p className="font-body-md text-xs text-on-surface-variant hidden md:block">View divine moments captured through the lens.</p>
              </div>
            </Link>

            {/* Contact Link */}
            <Link 
              to={ROUTES.CONTACT} 
              className="col-span-2 md:col-span-3 group bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 card-hover-effect flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-200">
                <span className="material-symbols-outlined text-2xl">contact_support</span>
              </div>
              <div>
                <h4 className="font-headline-md text-lg text-on-surface font-semibold mb-1">Contact</h4>
                <p className="font-body-md text-xs text-on-surface-variant hidden md:block">Get in touch with us for inquiries and support.</p>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Divine Quote Callout */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="material-symbols-outlined text-primary text-5xl opacity-30">format_quote</span>
          <p className="font-display-lg text-xl md:text-2xl lg:text-3xl italic text-on-surface-variant leading-relaxed">
            "Swamiye Saranam Ayyappa - In surrender, we find our ultimate strength."
          </p>
          <div className="pt-4">
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Home
