import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

const Home = () => {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 overflow-hidden hero-pattern">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Column: Centered on mobile, left-aligned on desktop */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs uppercase tracking-widest font-semibold shadow-sm">
              Ancient Tradition
            </div>
            <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-primary leading-tight font-bold">
              Heavenly Abode of <br />
              <span className="text-secondary italic">Lord Ayyappa</span>
            </h2>
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed">
              Step into a sanctuary where divine energy meets timeless devotion. Discover a path to the sacred, where your soul finds its facets answering the call of spiritual bliss.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto items-center sm:justify-center lg:justify-start">
              <Link 
                to={ROUTES.ABOUT}
                className="bg-primary text-white px-8 py-4 rounded-xl font-label-md text-sm shadow-xl shadow-primary/20 hover:bg-tertiary transition-all duration-300 transform hover:-translate-y-0.5 text-center min-w-[200px] font-bold"
              >
                Explore Temple
              </Link>
              <Link 
                to={ROUTES.POOJA_DETAILS}
                className="border border-outline-variant text-on-surface bg-white px-8 py-4 rounded-xl font-label-md text-sm hover:bg-surface-container-low transition-all text-center min-w-[200px] font-bold"
              >
                View Poojas
              </Link>
            </div>
          </div>

          {/* Right Image Column: stacks below on mobile */}
          <div className="relative group w-full lg:mt-0 mt-8">
            <div className="absolute inset-0 bg-primary/10 rounded-xl transform rotate-3 scale-105 blur-2xl group-hover:rotate-1 transition-transform duration-500"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] max-w-lg mx-auto lg:mr-0">
              <img
                alt="Sri Kainari Ayyappan Kavu Temple"
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                src="/images/temple9.jpg"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Quick Links Section - directly below Hero */}
      <section className="py-16 px-6 bg-surface-container-low border-y border-outline-variant/10">
        <div className="max-w-[1200px] mx-auto space-y-6">
          
          {/* Mobile View Layout (hidden on lg screens) */}
          <div className="block lg:hidden space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* About Card */}
              <Link 
                to={ROUTES.ABOUT} 
                className="bg-white p-6 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">info</span>
                </div>
                <span className="font-label-md text-sm font-semibold text-on-surface">About</span>
              </Link>

              {/* Donation Card */}
              <Link 
                to={ROUTES.DONATION} 
                className="bg-white p-6 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">volunteer_activism</span>
                </div>
                <span className="font-label-md text-sm font-semibold text-on-surface">Donations</span>
              </Link>

              {/* Pooja Services Card */}
              <Link 
                to={ROUTES.POOJA_DETAILS} 
                className="bg-white p-6 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">temple_hindu</span>
                </div>
                <span className="font-label-md text-sm font-semibold text-on-surface">Pooja Services</span>
              </Link>

              {/* Gallery Card */}
              <Link 
                to={ROUTES.GALLERY} 
                className="bg-white p-6 rounded-2xl border border-outline-variant/30 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all"
              >
                <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">image</span>
                </div>
                <span className="font-label-md text-sm font-semibold text-on-surface">Gallery</span>
              </Link>
            </div>

            {/* Contact Us Horizontal Bar Card */}
            <Link 
              to={ROUTES.CONTACT} 
              className="bg-white p-4 rounded-2xl border border-outline-variant/30 flex items-center justify-between shadow-sm active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                </div>
                <span className="font-label-md text-sm font-semibold text-on-surface">Contact Us</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </Link>
          </div>

          {/* Desktop View Layout (hidden on mobile) */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6">
            {/* About Card */}
            <Link 
              to={ROUTES.ABOUT} 
              className="group bg-white p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/30 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white">info</span>
              </div>
              <h4 className="font-headline-md text-base text-on-surface font-semibold mb-2">About</h4>
              <p className="font-body-md text-xs text-on-surface-variant">Learn our temple history and sacred heritage.</p>
            </Link>

            {/* Donations Card */}
            <Link 
              to={ROUTES.DONATION} 
              className="group bg-white p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/30 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white">volunteer_activism</span>
              </div>
              <h4 className="font-headline-md text-base text-on-surface font-semibold mb-2">Donations</h4>
              <p className="font-body-md text-xs text-on-surface-variant">Support temple activities and welfare projects.</p>
            </Link>

            {/* Pooja Services Card */}
            <Link 
              to={ROUTES.POOJA_DETAILS} 
              className="group bg-white p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/30 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white">temple_hindu</span>
              </div>
              <h4 className="font-headline-md text-base text-on-surface font-semibold mb-2">Pooja Services</h4>
              <p className="font-body-md text-xs text-on-surface-variant">Book your spiritual ceremonies and offerings.</p>
            </Link>

            {/* Gallery Card */}
            <Link 
              to={ROUTES.GALLERY} 
              className="group bg-white p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/30 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white">image</span>
              </div>
              <h4 className="font-headline-md text-base text-on-surface font-semibold mb-2">Gallery</h4>
              <p className="font-body-md text-xs text-on-surface-variant">View divine moments captured through the lens.</p>
            </Link>

            {/* Contact Card */}
            <Link 
              to={ROUTES.CONTACT} 
              className="group bg-white p-8 rounded-2xl border border-outline-variant/20 hover:border-primary/30 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white">location_on</span>
              </div>
              <h4 className="font-headline-md text-base text-on-surface font-semibold mb-2">Contact</h4>
              <p className="font-body-md text-xs text-on-surface-variant">Get in touch with us for inquiries and support.</p>
            </Link>
          </div>

        </div>
      </section>

      {/* Feature Items Section - white background and clean stacked text list */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-start text-left space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">
                temple_hindu
              </span>
              <h3 className="font-display-lg text-xl text-primary font-bold">
                Sacred Traditions
              </h3>
              <p className="font-body-md text-base text-on-surface-variant italic leading-relaxed">
                "Walk within the soul to the fragrant bliss you'd buy yourself through ancient wisdom."
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start text-left space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <h3 className="font-display-lg text-xl text-primary font-bold">
                Divine Energy
              </h3>
              <p className="font-body-md text-base text-on-surface-variant italic leading-relaxed">
                "Embrace the divine energy that flows through sacred traditions and celestial architecture."
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start text-left space-y-4">
              <span className="material-symbols-outlined text-primary text-4xl">
                brightness_high
              </span>
              <h3 className="font-display-lg text-xl text-primary font-bold">
                Keepers of Light
              </h3>
              <p className="font-body-md text-base text-on-surface-variant italic leading-relaxed">
                "Find peace in devotion and strength in faith's eternal light that guides every seeker."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Divine Quote Callout - inside light gray container with line dividers */}
      <section className="py-16 px-6 bg-surface-container-low border-y border-outline-variant/10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="w-16 h-[1.5px] bg-primary/20 mx-auto"></div>
          <p className="font-display-lg text-xl md:text-2xl lg:text-3xl italic text-primary leading-relaxed">
            "Swamiye Saranam Ayyappa - In surrender, we find our ultimate strength."
          </p>
          <div className="w-16 h-[1.5px] bg-primary/20 mx-auto"></div>
        </div>
      </section>
    </div>
  )
}

export default Home
