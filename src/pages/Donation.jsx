import React, { useState } from 'react'
import DonationForm from '../components/DonationForm'

const Donation = () => {
  const [showForm, setShowForm] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState('')

  const handleDonateClick = (amount = '') => {
    setSelectedAmount(amount)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (showForm) {
    return (
      <div className="bg-background text-on-background font-body-md min-h-screen py-12 px-6">
        <div className="max-w-[600px] mx-auto bg-white p-8 rounded-xl shadow-xl border border-outline-variant/20 relative">
          <button
            className="absolute top-6 left-6 text-primary hover:text-tertiary flex items-center gap-1 font-semibold text-sm transition-colors"
            onClick={() => setShowForm(false)}
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
          <div className="pt-8">
            <DonationForm initialAmount={selectedAmount} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative overflow-x-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full border-[40px] border-primary-container blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full border-[40px] border-secondary-container blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-16 pb-20 px-6 text-center max-w-[1200px] mx-auto">
          <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-md text-xs font-semibold tracking-widest mb-6 shadow-sm">
            DIVINE SERVICE & SEVA
          </span>
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-primary leading-tight font-bold mb-6 max-w-3xl mx-auto">
            Support Our Temple
          </h2>
          <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Your generous contributions help preserve our sacred traditions, maintain our holy grounds, and continue serving the community with daily rituals and spiritual guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleDonateClick('')}
              className="bg-primary text-white px-8 py-4 rounded-full font-label-md text-sm font-bold shadow-lg shadow-primary/20 hover:bg-tertiary transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">volunteer_activism</span>
              DONATE NOW
            </button>
            <a
              href="#seva-info"
              className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-label-md text-sm font-bold hover:bg-primary/5 transition-all text-center"
            >
              LEARN ABOUT SEVA
            </a>
          </div>
        </section>

        {/* The Power of Giving Section */}
        <section className="bg-surface-container-lowest py-20 px-6 scroll-mt-20" id="seva-info">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <img
                className="w-full h-full object-cover"
                alt="Temple Interior"
                src="/images/donation.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-headline-md italic text-lg md:text-xl">
                  "Danam param dharmam - Charity is the highest virtue."
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-secondary">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  energy_savings_leaf
                </span>
                <h3 className="font-headline-lg text-2xl md:text-3xl font-bold">The Power of Giving</h3>
              </div>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                In the spirit of <strong className="text-primary font-semibold">seva</strong> (selfless service), your donations help maintain our temple, support daily rituals, organize festivals, and provide spiritual guidance to devotees. Every contribution, no matter the size, makes a meaningful difference in keeping our traditions alive for future generations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-background rounded-lg border border-outline-variant/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">verified</span>
                  <div>
                    <h4 className="font-label-md text-sm text-on-surface font-semibold">Tax Exempt</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Eligible for 80G deductions.</p>
                  </div>
                </div>
                <div className="p-4 bg-background rounded-lg border border-outline-variant/30 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">security</span>
                  <div>
                    <h4 className="font-label-md text-sm text-on-surface font-semibold">Secure Payment</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Fully encrypted transactions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Grid Section */}
        <section className="py-20 px-6">
          <div className="max-w-[1200px] mx-auto text-center mb-16 space-y-4">
            <h3 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
              Your Donation Helps:
            </h3>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Impact Item 1 */}
            <div className="card-hover-effect bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary-fixed-dim/30 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
              </div>
              <h4 className="font-headline-md text-lg font-bold mb-3">Daily Pooja & Rituals</h4>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Supports the materials required for daily abhishekam, nivedyam, and deeparadhana.
              </p>
            </div>

            {/* Impact Item 2 */}
            <div className="card-hover-effect bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>temple_hindu</span>
              </div>
              <h4 className="font-headline-md text-lg font-bold mb-3">Temple Maintenance</h4>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Preserving the structural integrity and cleanliness of our historic temple premises.
              </p>
            </div>

            {/* Impact Item 3 */}
            <div className="card-hover-effect bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed/30 flex items-center justify-center text-tertiary mb-6">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>celebration</span>
              </div>
              <h4 className="font-headline-md text-lg font-bold mb-3">Festival Celebrations</h4>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Ensuring grand celebrations of Mandala Kalam, Makaravilakku, and Prathishta Dinam.
              </p>
            </div>

            {/* Impact Item 4 */}
            <div className="card-hover-effect bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary-fixed-dim/30 flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <h4 className="font-headline-md text-lg font-bold mb-3">Spiritual Education</h4>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Conducting Vedic classes, discourse sessions, and spiritual workshops for devotees.
              </p>
            </div>

            {/* Impact Item 5 */}
            <div className="card-hover-effect bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed/30 flex items-center justify-center text-secondary mb-6">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
              </div>
              <h4 className="font-headline-md text-lg font-bold mb-3">Prasadam Distribution</h4>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Providing free meals (Annadanam) and holy prasadam to all visitors and pilgrims.
              </p>
            </div>

            {/* Impact Item 6 */}
            <div className="card-hover-effect bg-surface-container-lowest p-8 rounded-lg border border-outline-variant/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed/30 flex items-center justify-center text-tertiary mb-6">
                <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>diversity_3</span>
              </div>
              <h4 className="font-headline-md text-lg font-bold mb-3">Community Services</h4>
              <p className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Extending support to local community initiatives and social welfare activities.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA with quick amounts */}
        <section className="max-w-[1200px] mx-auto px-6 mb-24">
          <div className="shrine-gradient rounded-xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 pointer-events-none hero-pattern"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="font-headline-lg text-2xl md:text-3xl font-bold">
                Make a Divine Contribution Today
              </h3>
              <p className="font-body-lg text-sm md:text-base max-w-2xl mx-auto opacity-90 leading-relaxed">
                Your support keeps the lamp of divinity burning bright. Choose an amount that resonates with your intent of seva.
              </p>
              <div className="flex flex-wrap justify-center gap-4 py-4">
                <button
                  onClick={() => handleDonateClick('501')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                >
                  ₹501
                </button>
                <button
                  onClick={() => handleDonateClick('1001')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                >
                  ₹1001
                </button>
                <button
                  onClick={() => handleDonateClick('5001')}
                  className="bg-white/20 hover:bg-white/30 border border-white/40 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                >
                  ₹5001
                </button>
                <button
                  onClick={() => handleDonateClick('')}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md px-6 py-2.5 rounded-full text-sm font-bold transition-all"
                >
                  Custom
                </button>
              </div>
              <button
                onClick={() => handleDonateClick('')}
                className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-full font-label-md text-sm font-extrabold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                PROCEED TO SECURE PAYMENT
              </button>
              <p className="text-xs opacity-70 flex items-center justify-center gap-2 pt-2">
                <span className="material-symbols-outlined text-sm">lock</span>
                Secure online payment • Tax benefits available
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Donation
