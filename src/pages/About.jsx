import React, { useState } from 'react'

const About = () => {
  const [language, setLanguage] = useState('en')

  const handleScroll = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  const textContent = {
    en: {
      heroTitle: "Legacy of Sri Kainari Ayyappan Kavu",
      heroSubtitle: "A SACRED JOURNEY THROUGH TIME AND DIVINE GRACE",
      navOrigins: "Historical Origins",
      navDiscovery: "The Divine Discovery",
      navHeritage: "Architecture & Rituals",
      navHistory: "Detailed History",
      originsTitle: "Historical Origins",
      origins1: "Centuries ago, the renowned Kadampot Kovilakam existed in the Valluvanad region at Valaamkulam Desam. The Kovilakam had a traditional four-block structure (Nalukettu), central courtyard, granary, well, and extensive agricultural land.",
      origins2: "The men of the Kovilakam were known by the title Unni Vellodi and the women as Kovilamma. Kalam Pattu was performed on the southern floor for Thirumandhamkunnilamma, the family deity of the Kovilakam.",
      discoveryTitle: "The Divine Discovery",
      discoverySubtitle: "A PROPHETIC BEGINNING",
      discovery1: "Legend speaks of a divine manifestation during a routine harvest. An elderly worker's sickle struck a stone that began to bleed, leading the Kovilakam elders to consult the royal astrologers.",
      discovery2: "The Devaprashnam revealed the presence of Lord Ayyappa, marking the exact spot where the current sanctum sanctorum stands.",
      heritageTitle: "Architecture & Sanctity",
      heritageText: "The temple follows the traditional Kerala architectural style, with a circular sanctum (Sreekovil) built in stone. The intricate wood carvings on the ceilings depict various episodes from the Puranas, created by craftsmen whose lineage has served the Kovilakam for generations.",
      ctaTitle: "Experience the Spiritual Essence",
      ctaText: "Join us for the daily rituals and feel the divine presence of Lord Ayyappa in our sacred grove.",
      sections: [
        {
          title: "Establishment of the Temple",
          content: "As a solution to the divine consultation, it was decided to install Lord Ayyappa with his family in the Kavu concept. Lord Ayyappa was installed with his family in the northwest part of the Kovilakam, and with the addition of a serpent shrine, it came to be known as Kainari Kavu. During this period, it is said that Kavu songs and Thalappoli were performed."
        },
        {
          title: "Times of Transition",
          content: "After many years, the Kovilakam was divided into three branches and they moved away. Subsequently, worship activities ceased, no renovation work was carried out, and gradually the Kavu deteriorated. It is said that the local people used to offer Pongkala with offerings like ada and payasam, which are Lord Bhootanath's favorite prasadam, on the thirty-first Saturday of Vrischika month, and the belief was that the Lord would come for Deshapradakshina to meet the local people."
        },
        {
          title: "Revival and Renovation",
          content: "In the 1990s, under the leadership of Sri Ramachandran Nedungadi, son of one of the Kovilakam administrators, with the help and cooperation of the family and local people, the temples were renovated. According to divine will, Sri Nelliyode Mana Vishnu Narayanan Namboothiri was the chief priest. During the renovation period, when our land was facing severe water scarcity, two days before the re-consecration that took place in the scorching summer, heavy rains fell, and the large pond and stream overflowed - these were signs of the consciousness and blessings shown to us by Kainari Devan."
        },
        {
          title: "Modern Era and Trust Formation",
          content: "In 2019, a committee of devotees was formed for the renovation work of Kainari Ayyappan Kavu. With the help and cooperation of devotees, the temples were renovated with copper roofing while maintaining the spiritual energy of the Kavu. In 2022, under the chief priesthood of Sri Nelliyode Mana Vishnu Namboothiri, the renovation Dravya Kalasham was performed, daily rituals were organized, and it was decided to celebrate festivals for spiritual enhancement. Subsequently, a trust was formed under the name 'Sri Kainari Ayyappan Kavu Trust Valaamkulam' for the daily worship, festivals, and continued renovation activities of Kainari Ayyappan Kavu."
        },
        {
          title: "The Sacred Tradition",
          content: "Swamiye Sharanam Ayyappa... As the benevolent deity of Kaliyuga, Lord Dharmasastha resides here with Prabha Devi and Satyakan. Devotees offer Ada Pongala to Ayyappa Swamy here during the festival celebrations. Unlike the Pongala ceremonies held in other temples, the ritual performed here for the Lord is Ada Pongala. When devotees who come with true vows devotionally offer Ada Pongala to Sastha, it becomes extremely special. The Aarattu Mahotsavam is a day of celebration when the Lord leaves the temple to inquire about the welfare of his devotees and to bless them directly during the Nagara Pradakshinam."
        },
        {
          title: "The Grand Festival",
          content: "Swamiye Sharanam Ayyappa. The land is ready, hearts are filled with the blessing of joy. The Aarattu Mahotsavam is celebrated with grandeur. On the second day of the festival, the rare among rarities - Ada Pongala - is offered at the Lord's holy presence. The majestic Pandi Melam and Panchavadyam are performed under the leadership of renowned masters, welcoming all good-hearted devotees to participate."
        }
      ]
    },
    ml: {
      heroTitle: "ശ്രീ കൈനാറി അയ്യപ്പൻകാവിന്റെ പാരമ്പര്യം",
      heroSubtitle: "കാലാതിവർത്തിയായ ഒരു പവിത്ര യാത്ര",
      navOrigins: "ചരിത്രപരമായ ഉത്ഭവം",
      navDiscovery: "ദൈവിക കണ്ടെത്തൽ",
      navHeritage: "വാസ്തുവിദ്യയും ആചാരങ്ങളും",
      navHistory: "വിശദമായ ചരിത്രം",
      originsTitle: "ചരിത്രപരമായ ഉത്ഭവം",
      origins1: "നൂറ്റാണ്ടുകൾക്ക് മുമ്പ്, വള്ളുവനാട് മേഖലയിലെ വാളാകുളം ദേശത്ത് പ്രശസ്തമായ കടമ്പോട്ട് കോവിലകം ഉണ്ടായിരുന്നു. നാലുകെട്ട്, നടുമുറ്റം, പത്തായപ്പുര, കിണർ, വിസ്തൃതമായ കൃഷിഭൂമി എന്നിവയുള്ളതായിരുന്നു ഈ കോവിലകം.",
      origins2: "കോവിലകത്തെ പുരുഷന്മാർ ഉണ്ണി വെള്ളോടി എന്നും സ്ത്രീകൾ കോവിലമ്മ എന്നും അറിയപ്പെട്ടിരുന്നു. കോവിലകത്തെ കുടുംബപരദേവതയായ തിരുമാന്ധാംകുന്നിലമ്മയ്ക്കായി തെക്കേ തളത്തിൽ കളമെഴുത്തും പാട്ടും നടത്തിവന്നിരുന്നു.",
      discoveryTitle: "ദൈവിക കണ്ടെത്തൽ",
      discoverySubtitle: "പ്രവചനപരമായ തുടക്കം",
      discovery1: "വിളവെടുപ്പിനിടെയുണ്ടായ ദൈവികമായ വെളിപ്പെടുത്തലിനെക്കുറിച്ച് ഐതിഹ്യം പറയുന്നു. ഒരു വൃദ്ധനായ തൊഴിലാളിയുടെ അരിവാൾ ഒരു കല്ലിൽ തട്ടി രക്തം വരാൻ തുടങ്ങുകയും അത് കോവിലകത്തെ കാരണവർ ജ്യോതിഷികളെ സമീപിക്കാൻ കാരണമാവുകയും ചെയ്തു.",
      discovery2: "ദേവപ്രശ്നത്തിലൂടെ അയ്യപ്പസ്വാമിയുടെ ചൈതന്യം അവിടെ വെളിപ്പെട്ടു, ഇന്ന് കാണുന്ന ശ്രീകോവിൽ അതേ സ്ഥാനത്താണ് നിർമ്മിച്ചിരിക്കുന്നത്.",
      heritageTitle: "വാസ്തുവിദ്യയും ആചാരങ്ങളും",
      heritageText: "കേരളീയ വാസ്തുവിദ്യയുടെ പാരമ്പര്യം അനുസരിച്ചാണ് ക്ഷേത്രം നിർമ്മിച്ചിരിക്കുന്നത്. കല്ലിൽ നിർമ്മിച്ച വട്ടശ്രീകോവിലും മേൽക്കൂരയിലെ മനോഹരമായ ദാരുശില്പങ്ങളും പുരാണ കഥകളെ ആസ്പദമാക്കിയുള്ളതാണ്, കോവിലകത്തെ തലമുറകളായി സേവിച്ച ആശാരിമാരാണ് ഇത് നിർമ്മിച്ചത്.",
      ctaTitle: "ആത്മീയ അനുഭൂതി നേടൂ",
      ctaText: "ഞങ്ങളുടെ ദൈനംദിന ആചാരങ്ങളിൽ പങ്കുചേരൂ, പവിത്രമായ ഈ കാവിൽ അയ്യപ്പസ്വാമിയുടെ ദൈവിക ചൈതന്യം അനുഭവിക്കൂ.",
      sections: [
        {
          title: "കാവ് സ്ഥാപനം",
          content: "പ്രശ്ന‌പരിഹാരമായി കുടുംബസമേതനായ അയ്യപ്പനെ കാവ് സങ്കൽപത്തിൽ കുടിവെക്കണമെന്ന് കാണുകയും ചെയ്‌തു. കോവിലകത്തിന്റെ വടക്ക് പടിഞ്ഞാറ് ഭാഗത്ത് കുടുംബ സമേതനായ അയ്യപ്പനെ കുടിവെക്കുകയും നാഗകാവും ആയതോടെ കൈനാറി കാവായി അറിയപ്പെടാൻ തുടങ്ങി. ഈ കാലയളവിൽ കാവിൽ പാട്ട് താലപ്പൊലി നടന്നിരുന്നതായി പറയ പ്പെടുന്നു."
        },
        {
          title: "പരിവർത്തന കാലം",
          content: "കാലങ്ങൾക്ക് ശേഷം കോവിലകം മൂന്ന് താവഴികളായി പിരിഞ്ഞു താമസംമാറി, തുടർന്ന് പൂജാകാര്യങ്ങൾ മുടങ്ങി, നവീകരണ പ്രവൃത്തികളൊന്നും നടക്കാതെയായി ക്രമേണ കാവ് ജീർണിക്കപ്പെട്ടു. ശ്രീഭൂതനാഥ സാന്നിധ്യമായ ഭഗവാന് ദേശവാസികൾ വൃശ്ചിക മാസത്തിലെ മുപ്പെട്ട് ശനി ദിവസം ഭഗവാന്റെ ഇഷ്ടപ്രസാദമായ അട, പായസം തുടങ്ങിയ നിവേദ്യ ങ്ങൾ പൊങ്കാലയായി അർപ്പിച്ചിരുന്നു."
        },
        {
          title: "പുനരുജ്ജീവനവും നവീകരണവും",
          content: "1990 കാലഘട്ടത്തിൽ കോവിലകത്തെ ഒരു കാരണവരുടെ മകനായ ശ്രീ രാമചന്ദ്രൻ നെടുങ്ങാടിയുടെ നേത്യത്വത്തിൽ കുടുംബത്തിൻ്റെയും നാട്ടുകാരുടേയും സഹായസഹകര ണത്തോടെ ശ്രീകോവിലുകളുടെ പുന:രുദ്ധാരണം നടത്തി. പുനരുദ്ധാരണ കാലത്ത് അതികഠിനമായ ജലക്ഷാമം നേരിട്ടിരുന്ന നമ്മുടെ നാട്ടിൽ, കൊടും വേനലിൽ നടന്ന പുനഃപ്രതിഷ്‌ഠക്ക് രണ്ടു ദിവസം മുൻപ് ശക്തമായ മഴ പെയ്ത്‌ത്, വലിയ കുളവും തോടും നിറഞ്ഞു കവിഞ്ഞൊഴുകിയ കാര്യങ്ങൾ കൈനാറി ദേവൻ്റെ ചൈതന്യവും അനുഗ്രഹങ്ങളും നമുക്ക് കാണിച്ചുതന്ന അടയാള പെടുത്തലുകൾ ആയിരുന്നു."
        },
        {
          title: "ആധുനിക കാലവും ട്രസ്റ്റ് രൂപീകരണവും",
          content: "2019 ൽ കൈനാറി അയ്യപ്പൻകാവ് പുനഃരുദ്ധാരണ പ്രവർത്തികൾക്കായി ഭക്തജനങ്ങളുടെ ഒരു കമ്മറ്റി രൂപീകരിച്ചു. ഭക്തജനങ്ങളുടെ സഹായ സഹകരണങ്ങളോടെ കാവ് ചൈതന്യം നിലനിർത്തികൊണ്ട് ശ്രീകോവിലുകൾ ചെമ്പോല പതിച്ചു നവീകരിച്ചു. തുടർന്ന് കൈനാറി അയ്യപ്പൻകാവിൻ്റെ നിത്യപൂജ, ഉത്സവം, തുടർ നവീകരണ പ്രവർത്തനങ്ങൾ എന്നിവക്കായി 'ശ്രീ കൈനാറി അയ്യപ്പൻകാവ് ട്രസ്റ്റ് വളാംകുളം' എന്ന പേരിൽ ട്രസ്റ്റ് രൂപീകരിച്ചു."
        },
        {
          title: "പവിത്ര പാരമ്പര്യം",
          content: "കലിയുഗവരദനായി... പ്രഭാദേവിയോടും സത്യകനോടും ഒന്നിച്ച്.... സത്യസ്വരൂപനായ ശ്രീധർമ്മശാസ്താവ് വാണരുളുന്ന പുണ്യഭൂമി. അപൂർവങ്ങളിൽ അപൂർവമായി... അതിവശിഷ്ടമായ വഴിപാടായി ഭക്തർ ഇവിടെ അയ്യപ്പ സ്വാമിക്ക് സമർപ്പിക്കുന്നു ഉത്സവ മഹാമഹത്തോടനുബന്ധിച്ച് അട പൊങ്കാല. ഭക്തർ ഭഗവാനെ നിറപറയും താലപ്പൊലിയുമായി സ്വീകരിക്കുന്നതും ആറാട്ട് എഴുന്നള്ളിപ്പും നഗരപ്രദക്ഷിണവും ഈ മണ്ണിൻ്റെ പ്രത്യേകതയാണ്."
        },
        {
          title: "മഹോത്സവം",
          content: "പ്രഭാസത്യക സമേതനായി അനന്തകോടി ചൈതന്യത്തോടെ വാണരുളുന്ന കലിയുഗവരദന് മഹോത്സവമായി ആറാട്ട് മഹോത്സവം വന്നെത്തിച്ചേരുകയായി. നവംബർ മാസത്തിൽ ആഘോഷത്തിന്റെ സുദിനങ്ങൾ ഒരുങ്ങുമ്പോൾ ഭഗവാൻറെ തിരുസന്നിധിയിൽ നടക്കും അട പൊങ്കാല. ഗംഭീര പാണ്ടിമേളവും പഞ്ചവാദ്യവും ഭക്തിഗാനമേളയും കൊണ്ട് ദേശം ഉണരും."
        }
      ]
    }
  }

  const currentContent = textContent[language]

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img
          alt="Legacy of Sri Kainari Ayyappan Kavu"
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/t2.jpg"
        />
        <div className="absolute inset-0 hero-overlay flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-3xl space-y-6">
            <span className="text-secondary-fixed font-label-md tracking-widest uppercase text-xs md:text-sm font-bold">
              Sacred Heritage
            </span>
            <h2 className="text-white font-display-lg text-3xl md:text-4xl lg:text-5xl leading-tight font-bold">
              {currentContent.heroTitle}
            </h2>
            <p className="text-white/90 font-headline-md text-sm md:text-lg italic tracking-wider">
              {currentContent.heroSubtitle}
            </p>
            <div className="pt-6">
              <div className="inline-flex bg-surface-container-lowest/10 backdrop-blur-md p-1.5 rounded-full border border-white/20">
                <button
                  className={`px-6 py-2 rounded-full font-label-md text-xs md:text-sm transition-all duration-300 ${language === 'en'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-white hover:bg-white/10'
                    }`}
                  onClick={() => setLanguage('en')}
                >
                  English
                </button>
                <button
                  className={`px-6 py-2 rounded-full font-label-md text-xs md:text-sm transition-all duration-300 ${language === 'ml'
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-white hover:bg-white/10'
                    }`}
                  onClick={() => setLanguage('ml')}
                >
                  മലയാളം
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Navigator (Sticky Sub-nav) */}
      <div className="sticky top-[72px] bg-surface-container-low/80 backdrop-blur-xl border-b border-outline-variant/20 z-40">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-center gap-6 md:gap-12 py-4 text-xs md:text-sm font-semibold">
          <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#origins" onClick={(e) => handleScroll(e, 'origins')}>
            {currentContent.navOrigins}
          </a>
          <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#discovery" onClick={(e) => handleScroll(e, 'discovery')}>
            {currentContent.navDiscovery}
          </a>
          <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#heritage" onClick={(e) => handleScroll(e, 'heritage')}>
            {currentContent.navHeritage}
          </a>
          <a className="font-label-md text-on-surface-variant hover:text-primary transition-colors" href="#detailed-history" onClick={(e) => handleScroll(e, 'detailed-history')}>
            {currentContent.navHistory}
          </a>
        </div>
      </div>

      {/* Historical Origins Section */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto scroll-mt-32" id="origins">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden parchment-glow border-8 border-white">
              <img
                alt="Historical Nalukettu"
                className="w-full h-full object-cover"
                src="/images/temple5.jpg"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-container rounded-lg -z-10"></div>
          </div>
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-12 bg-primary"></div>
                <h3 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
                  {currentContent.originsTitle}
                </h3>
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-lg parchment-glow border border-outline-variant/10 space-y-6">
                <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                  {currentContent.origins1}
                </p>
                <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                  {currentContent.origins2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Divine Discovery Section */}
      <section className="py-20 bg-surface-container/30 scroll-mt-32" id="discovery">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h3 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
              {currentContent.discoveryTitle}
            </h3>
            <div className="w-24 h-1 bg-secondary-container mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Item 1 */}
            <div className="md:col-span-2 bg-white p-8 md:p-10 rounded-lg parchment-glow border border-outline-variant/10 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <span className="material-symbols-outlined">auto_stories</span>
                  <span>{currentContent.discoverySubtitle}</span>
                </div>
                <h4 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface">A Prophetic Beginning</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                  {currentContent.discovery1}
                </p>
              </div>
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-surface-container flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  alt="Ritual Sila"
                  src="/images/temple3.jpg"
                />
              </div>
            </div>

            {/* Bento Item 2 */}
            <div className="bg-primary text-on-primary p-8 md:p-10 rounded-lg shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <span className="material-symbols-outlined text-secondary-fixed text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                <h4 className="font-headline-md text-xl font-bold">Divine Presence</h4>
                <p className="font-body-md text-sm md:text-base text-on-primary-container leading-relaxed">
                  {currentContent.discovery2}
                </p>
              </div>
              <div className="mt-8 border-t border-white/20 pt-6">
                <a className="text-secondary-container font-label-md flex items-center gap-2 group text-sm font-semibold" href="#detailed-history">
                  Read Full Legend
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Sanctity Section */}
      <section className="py-20 px-6 max-w-[1200px] mx-auto scroll-mt-32" id="heritage">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="font-headline-lg text-2xl md:text-3xl text-primary font-bold">
                {currentContent.heritageTitle}
              </h3>
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                {currentContent.heritageText}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-primary">
                <span className="font-headline-md text-2xl font-bold text-primary block">100+</span>
                <span className="font-label-md text-xs md:text-sm text-on-surface-variant">Devotees Daily</span>
              </div>
              <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-secondary">
                <span className="font-headline-md text-2xl font-bold text-secondary block">Tradition</span>
                <span className="font-label-md text-xs md:text-sm text-on-surface-variant">Pristine Rituals</span>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <img
              className="w-full h-[400px] object-cover rounded-lg parchment-glow"
              alt="Temple Courtyard"
              src="/images/temple-bg.jpg"
            />
            <div className="absolute inset-0 border-[24px] border-white/20 pointer-events-none rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Detailed Timeline History Sections */}
      <section className="py-20 bg-surface-container-low px-6 scroll-mt-32" id="detailed-history">
        <div className="max-w-[1000px] mx-auto space-y-12">
          <div className="text-center mb-8">
            <h2 className="font-display-lg text-2xl md:text-3xl text-primary font-bold">
              {currentContent.navHistory}
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
          </div>

          {/* History Category Pills Navigation */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 py-2 px-1 max-w-3xl mx-auto">
            {currentContent.sections.map((section, idx) => (
              <button
                key={idx}
                onClick={(e) => handleScroll(e, `history-section-${idx}`)}
                className="px-4 py-2 text-xs md:text-sm font-semibold rounded-full bg-white text-primary border border-outline-variant/30 hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300 shadow-sm"
              >
                {section.title}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {currentContent.sections.map((section, idx) => (
              <div
                key={idx}
                id={`history-section-${idx}`}
                className="bg-white p-6 md:p-8 rounded-xl border border-outline-variant/20 shadow-md card-hover-effect relative scroll-mt-36"
              >
                <h4 className="font-headline-md text-lg md:text-xl text-primary font-semibold mb-4 pt-2">
                  {section.title}
                </h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="mb-24 px-6">
        <div className="max-w-[1200px] mx-auto bg-surface-container-highest rounded-xl p-8 md:p-12 text-center space-y-6">
          <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface font-bold">
            {currentContent.ctaTitle}
          </h3>
          <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-2xl mx-auto">
            {currentContent.ctaText}
          </p>
        </div>
      </section>
    </div>
  )
}

export default About