import React, { useState } from 'react'
import '../styles/About.css'
import '../styles/PageAnimations.css'

const About = () => {
  const [language, setLanguage] = useState('english')

  const content = {
    english: {
      title: "Legacy of Sri Kainari Ayyappan Kavu",
      subtitle: "A Sacred Journey Through Time and Divine Grace",
      sections: [
        {
          title: "Historical Origins",
          content: "Centuries ago, the renowned Kadampot Kovilakam existed in the Valluvanad region at Valaamkulam Desam. The Kovilakam had a traditional four-block structure (naalukettu), central courtyard, granary, well, and extensive agricultural land. The men of the Kovilakam were known by the title Unni Vellodi and the women as Kovilamma. Kalam Pattu was performed on the southern floor for Thirumandhamkunnilamma, the family deity of the Kovilakam."
        },
        {
          title: "The Divine Discovery",
          content: "Long ago, one day, when a tribal woman was sharpening her sickle on a stone to cut grass on top of Kainari hill, blood came from the rock and she fainted in fear. Later, she informed the elder Vellodi about what happened. Within days, the administrators of the Kovilakam conducted astrological consultations and divine inquiries. Due to the fragrance of numerous Kainari palm flowers blooming on both sides of the Muthanga stream flowing towards Thuthappuzha at the foot of Kainari hill, it was determined through divine consultation that Lord Ayyappa was present there with his wife Prabha and son Satyakan."
        },
        {
          title: "Establishment of the Temple",
          content: "As a solution to the divine consultation, it was decided to install Lord Ayyappa with his family in the Kavu concept. Lord Ayyappa was installed with his family in the northwest part of the Kovilakam, and with the addition of a serpent shrine, it came to be known as Kainari Kavu. During this period, it is said that Kavu songs and Thalappoli were performed."
        },
        {
          title: "Times of Transition",
          content: "After many years, the Kovilakam was divided into three branches and they moved away. Subsequently, worship activities ceased, no renovation work was carried out, and gradually the Kavu deteriorated. It is said that the local people used to offer Pongkala with offerings like ada and payasam, which are Lord Bhootanath's favorite prasadam, on the thirty-first Saturday of Vrischika month, and the belief was that on the Lord would come for Deshapradakshina to meet the local people."
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
          title: "The Sacred Tradition ",
          content: "Swamiye Sharanam Ayyappa... As the benevolent deity of Kaliyuga, Lord Dharmasastha resides here with Prabha Devi and Satyakan. This is the holy land where the embodiment of truth, Sri Dharmasastha, reigns supreme. From the radiance of Dharma, truth emerges - this concept fills the temple sanctuary with eternal divine consciousness. Yes, this is the land of Ayyan Ayyappa Swamy, who dwells in the sanctum sanctorum, showering blessings upon those who seek refuge. The Valaamkulam Sri Kainari Ayyappan Kavu, where historical beliefs are worshipped with reverence. This is a holy land where the Lord resides as a benevolent devotee with the divine consciousness symbolizing completeness and prosperity. This is also the land of prosperity where Sastha is enshrined as a householder with his wife Prabha Devi and son Satyakan. In the glory of Dharma, accepting truth as his son, this divine land where Sastha performs his householder duties is a sacred field of rituals and practices. Rarely among rarities, as an extremely special offering, devotees offer Ada Pongala to Ayyappa Swamy here during the festival celebrations. Yes, unlike the Pongala ceremonies held in Sastha temples where worship and rituals have been conducted with divine consciousness since ancient times, the ritual performed here for the Lord is Ada Pongala. When devotees who come with true vows devotionally offer Ada Pongala to Sastha, it becomes extremely special - this is the belief. 'Ada', made by wrapping pure rice flour, jaggery, ghee, and coconut in banana leaves and steaming them, is one of the most beloved offerings to divine beings. For the prosperity of the family, for the welfare of children, for all kinds of progress - participating in Ada Pongala with vows and rituals, offered with understanding, is a blessing earned through good deeds of many lifetimes for any devotee. As the lord of this land, showering blessings upon devotees with his power, the Valaamkulam Sri Kainari Ayyappan Kavu where Lord and Goddess reign - the Aarattu Mahotsavam is a day of celebration. The rare occasion when the Lord leaves the temple to inquire about the welfare of his devotees who fold their hands in prayer and to bless them directly is the Nagara Pradakshinam associated with the festival. The procession of the Lord mounted on an elephant for Nagara Pradakshinam - as it passes through the streets of the land, all evil forces in that land will be driven away and prosperity will fill - this is the belief. Just as subjects receive their king during his royal visit, devotees receiving the Lord with offerings and traditional welcome is the festive sight of this land. The Aarattu at Sri Kainari Ayyappan Kavu is world-famous as the holy bath of the Goddess associated with the festival celebrations. When the Goddess bathes and emerges in the holy waters where divine rivers are invoked and worshipped, the devotees standing in worship are filled with rare divine consciousness. Along with this, the Aarattu here is also celebrated as a ceremony of purifying the entire land by sprinkling holy water. Yes, as the prince of Pandalam and as the supreme deity of the temple, the Grama Pradakshinam and the Goddess's Aarattu are holy ceremonies when the Lord comes forth to see and bless his devotees in person. Come and join, devoted hearts, to witness and worship at least once. May Sri Dharmasastha, who reigns as the family lord and master of all prosperity at Valaamkulam Sri Kainari Ayyappan Kavu with Prabha and Satyaka, shower grace upon you. May the prayers of devoted hearts blossom with the Lord's blessings. Come to this holy land filled with the divine stream of the Dharmasastha concept as family lord. Let us return adorned with prosperity and progress as the Lord's blessings. Prostrations at the holy feet of Sri Dharmasastha who resides with his family at Valaamkulam Sri Kainari Ayyappan Kavu. Crores and crores of prostrations."
        },
        {
          title: "The Grand Festival",
          content: "Swamiye Sharanam Ayyappa. The land is ready, hearts are filled with the blessing of joy. Yes, the Aarattu Mahotsavam, awaited by time, has arrived as a grand festival for the benevolent deity of Kaliyuga, who reigns with infinite divine consciousness along with Prabha and Satyaka at the Thrikkunnapuzha Sri Dharmasastha temple. As the Thrikkunnapuzha land is adorned with festive colors, the golden auspicious days of celebration are November 22, Saturday, and November 23, Sunday, 2025. On the second day of the festival, November 22, Saturday, the rare among rarities - Ada Pongala - will be offered at the Lord's holy presence. Yes, when Ada Pongala is prepared - wrapping five groups of substances representing the five elements in leaves and cooking them in fire to offer to the Lord - this supreme ritual welcomes all good-hearted devotees to participate. Blessing the Lord's holy presence, starting from 7 AM on Saturday, November 22, with the grandeur of Vela Varavu, the thunderous Palakkadan Mela under the leadership of the renowned Sri Kalloor Unnikrishnan Marar and team will perform the majestic Pandi Melam. At 4 PM, the Panchavadyam will be led by the young emperor of Panchavadya art, Sri Kodunthurappulli Manoj and team, who will join Valaamkulam Sri Kainari Ayyappan Kavu. The wonder never ends. In the land of the benevolent deity Sri Dharmasastha, where celebrations bloom, as the Aarattu Mahotsavam is prepared, the young prince will also appear to stand majestically for the Lord's Aarattu. The young emperor who firmly establishes the footsteps as tomorrow's king, toward a bright future's strong times. The one who adorns the beautiful lotus crown to lead the roars of the festival city where Pooram blooms. Come and join, dear ones. He will be the Aarattu pedestal for Sri Dharmasastha who resides as the good family lord at Valaamkulam Sri Kainari Ayyappan Kavu. The young royal lion of the festival city. The young royal gem. Nanthilath Gopalakrishnan. As this land stands ready with endless celebrations, the Aarattu Melam on Sunday morning, November 23, will be doubly exciting. From 6:30 PM, making the Lord's art stage thrilling, the Flowers TV Comedy Utsavam Unni Guinness-led Sahakarikuka Orchestra's devotional song festival will also be wonderful. Yes, in the glory of dedicated rituals, the festival celebration for the Lord, master of all prosperity, is now adorned and ready. Welcome to all devoted hearts to join the grand festival celebrated by this land with one heart at Valaamkulam Sri Kainari Ayyappan Kavu temple. A heartfelt welcome in the Lord's name."
        }
      ]
    },
    malayalam: {
      title: "ശ്രീ കൈനാറി അയ്യപ്പൻകാവിന്റെ പാരമ്പര്യം",
      subtitle: "കാലാതിവർത്തിയായ ഒരു പവിത്ര യാത്ര",
      sections: [
        {
          title: "ചരിത്രപരമായ ഉത്ഭവം",
          content: "നൂറ്റാണ്ടുകൾക്ക് മുൻപ് വള്ളുവനാട്ടിൽ വളാംകുളം ദേശത്ത് പ്രസിദ്ധമായ കടമ്പോട്ട് കോവിലകം ഉണ്ടായിരുന്നു. നാലുകെട്ട് നടുമുറ്റം, പടിപ്പുര, മണികിണർ, വിശാലമായ കൃഷിസ്ഥലം എല്ലാം കോവിലകത്തിനുണ്ടായിരുന്നു. കോവിലകത്തെ പുരുഷന്മാർ ഉണ്ണിവെള്ളോടി എന്നും സ്ത്രീകൾ കോവിലമ്മ എന്നും ഉള്ള സ്ഥാനപേരിലാണ് അറിയപ്പെട്ടിരുന്നത്. കോവിലകത്തെ പരദേവതയായ തിരുമാന്ധാംകുന്നിലമ്മക്ക് തെക്കിനി തറയിൽവെച്ച് കളംപാട്ട് നടത്തിയിരുന്നു."
        },
        {
          title: "ദൈവിക കണ്ടെത്തൽ",
          content: "കാലങ്ങൾക്ക് മുൻപ് ഒരു ദിവസം കൈനാറി മലനിര മുകളിൽ ഒരു ഗോത്രസ്ത്രീ പുല്ല് വെട്ടുവാൻ വേണ്ടി അരിവാൾ കല്ലിൽ അണച്ചപ്പോൾ പാറകല്ലിൽ നിന്നും രക്തം വരികയും പേടിച്ചു ബോധക്ഷയം ഉണ്ടാവുകയും ചെയ്‌തു. പിന്നീട് അവർ നടന്ന കാര്യങ്ങൾ മൂത്ത വെള്ളോടിയെ അറിയിച്ചു. ദിവസങ്ങൾക്കുള്ളിൽ കോവിലകത്തെ കാരണവൻമാർ ജ്യോതിഷ പ്രശ്ന‌വിചാരക്രിയകൾ നടത്തി."
        },
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
          title: "പവിത്ര പാരമ്പര്യം ",
          content: " കലിയുഗവരദനായി... പ്രഭാദേവിയോടും സത്യകനോടും ഒന്നിച്ച്.... സത്യസ്വരൂപനായ ശ്രീധർമ്മശാസ്താവ് വാണരുളുന്ന പുണ്യഭൂമി.... ധർമ്മത്തിന്റെ പ്രഭയിൽ നിന്നും സത്യം ഉത്ഭവിക്കുന്നു എന്ന് ഈ സങ്കൽപ്പത്താൽ സദാനിത്യം നിറചൈതന്യം തുളുമ്പുന്ന ക്ഷേത്ര സങ്കേതം.... അതെ...ഇത് അഭയം തേടുന്നവർക്ക് അനുഗ്രഹം ചൊരിഞ്ഞ് അകതാരിൽ അധിവസിക്കുന്ന അയ്യനയ്യപ്പസ്വാമിയുടെ മണ്ണ്.... ചരിത്ര വിശ്വാസങ്ങൾ നീരാഞ്ജനമുഴിഞ്ഞു വന്ദിക്കും വളാംകുളം ശ്രീ കൈനാറി അയ്യപ്പൻകാവ്. പൂർണ്ണതയുടെയും ഐശ്വര്യത്തിന്റെയും പ്രതീകമായ ദേവീചൈതന്യത്തോടെ ഭഗവാൻ ഭക്തവത്സലനായി കുടികൊള്ളുന്ന പുണ്യഭൂമിയാണ് ഇവിടം.... ഗൃഹസ്ഥാശ്രമിയായ ശാസ്താവിനെ പ്രഭാദേവി എന്ന പത്നിയോടും... സത്യകൻ എന്ന പുത്രനോടും കൂടി പ്രതിഷ്ഠിച്ചിരിക്കുന്ന ഐശ്വര്യ ഭൂമിയും ഇവിടം തന്നെ.... ധർമ്മത്തിന്റെ ശോഭയിൽ.... സത്യത്തെ പുത്രനായി സ്വീകരിച്ച്,... ഗൃഹസ്ഥാശ്രമ ധർമ്മം അനുഷ്ഠിക്കുന്ന ശാസ്താവിന്റെ ഭാവം നിറയുന്ന ഈ ചൈതന്യ ഭൂമി ആചാരങ്ങളുടെയും അനുഷ്ഠാനങ്ങളുടെയും ദിവ്യ കേദാരമാണ്.. അപൂർവങ്ങളിൽ അപൂർവമായി... അതിവശിഷ്ടമായ വഴിപാടായി ഭക്തർ ഇവിടെ അയ്യപ്പ സ്വാമിക്ക് സമർപ്പിക്കുന്നു ഉത്സവ മഹാമഹത്തോടനുബന്ധിച്ച് അട പൊങ്കാല.... അതെ.... പുരാതനകാലം മുതൽക്കേ ദേവിചൈതന്യത്തോടുകൂടി ആരാധനയും പൂജാദികർമ്മങ്ങളും നടക്കുന്ന ശാസ്താ ക്ഷേത്രങ്ങളിൽ നടന്നുവരുന്ന പൊങ്കാലകളിൽ നിന്നും വ്യത്യസ്തമായി.... ഇവിടെ ഭഗവാനായി നടക്കുന്ന കർമ്മം അട പൊങ്കാല.... സത്യമായ വൃതംനോറ്റ് വന്നെത്തുന്ന ഭക്തമാനസങ്ങൾ ഭക്ത്യാധരപൂർവ്വം ശാസ്താവിന് അട പൊങ്കാല സമർപ്പിക്കുമ്പോൾ... അത് അതി വിശിഷ്ടമാകുന്നു  എന്ന് വിശ്വാസം.... ശുദ്ധമായ അരിപ്പൊടിയും...ശർക്കര, നെയ്യ്, തേങ്ങ എന്നിവയും വാഴയിലയിൽ പൊതിഞ്ഞ് ആവിയിൽ വേവിച്ചെടുക്കുന്ന 'അട', ദേവചൈതന്യങ്ങൾക്ക് ഏറ്റവും പ്രിയങ്കരമായ നൈവേദ്യങ്ങളിൽ ഒന്നാണ്.... കുടുംബത്തിന്റെ ഐശ്വര്യത്തിനായി.... കുട്ടികളുടെ ക്ഷേമത്തിനായി... സർവ്വവിധ അഭിവൃദ്ധികൾക്കായി.... മനസ്സറിഞ്ഞ് സമർപ്പിക്കുന്ന നന്ദിസൂചകമായ നിവേദ്യമാകും  അട പൊങ്കാലയിൽ... വ്രതാനുഷ്ഠാനങ്ങളോടെ പങ്കുചേരുവാൻ കഴിയുന്നത് ഏതൊരു ഭക്തമനസ്സിനും ജന്മ ജന്മാന്തര സുകൃതം.... ഈ ദേശത്തിൻറെ അധിപനായി.... ഭക്തരിൽ തൻറെ ശക്തിയാൽ അനുഗ്രഹങ്ങൾ നിറയ്ക്കുന്ന ദേവസരൂപനായി ഭഗവാനും ഭഗവതിയും വാണരുളുന്ന വളാംകുളം ശ്രീ കൈനാറി അയ്യപ്പൻകാവ് ക്ഷേത്രത്തിൽ... ആഘോഷത്തിന്റെ സുദിനമാണ് ആറാട്ട് മഹോത്സവം.... തന്നെ കൈകൂപ്പുന്ന തന്റെ ഭക്തരുടെ ക്ഷേമം അന്വേഷിക്കാനും അവരെ നേരിട്ട് കണ്ട് അനുഗ്രഹിക്കാനുമായി ഭഗവാൻ ക്ഷേത്രത്തിന് പുറത്തേക്ക് എഴുന്നള്ളുന്ന അപൂർവ്വയാമമാണ് ഉത്സവ മഹാമഹ സംബന്ധമായ നഗരപ്രദക്ഷിണം.... നഗരപ്രദക്ഷിണത്തിനായി കൊമ്പനാനപ്പുറമേറി എഴുന്നള്ളി വരുന്ന ഭഗവാന്റെ എഴുന്നള്ളത്ത്.... ദേശവീഥികളിലൂടെ കടന്നുപോകുമ്പോൾ.... ആ ദേശത്തുള്ള എല്ലാ ദുശ്ശക്തികളും അകന്നുപോകുമെന്നും ഐശ്വര്യം നിറയുമെന്നും വിശ്വാസം.... ഒരു രാജാവ് തന്റെ രാജ്യസന്ദർശനം നടത്തുമ്പോൾ പ്രജകൾ എങ്ങനെയാണോ സ്വീകരിക്കുന്നത്, അതുപോലെ ഭക്തർ ഭഗവാനെ നിറപറയും താലപ്പൊലിയുമായി സ്വീകരിക്കുന്നതും ഈ മണ്ണിൻ്റെ ഉത്സവ കാഴ്ച.... ഇവിടുത്തെ ഉത്സവ മഹാ മഹത്തോടനുബന്ധിച്ച് ദേവിയുടെ പുണ്യസ്നാനമായി വിശ്വപ്രസിദ്ധമാണ് ശ്രീ കൈനാറി അയ്യപ്പൻകാവിലെ ആറാട്ട്.... ദേവ നദികളെ ആവാഹിച്ചു പൂജിക്കുന്ന പുണ്യതീർത്ഥത്തിൽ... ദേവി ആറാടി മുങ്ങിനിവരുമ്പോൾ.... തൊഴുതു നിൽക്കുന്ന ഭക്തരിൽ നിറയും അസുലഭമാകുന്ന ചൈതന്യം...അതോടൊപ്പം ആ ദേശത്തെ മുഴുവൻ പുണ്യതീർത്ഥം തളിച്ച് ശുദ്ധീകരിക്കുന്ന ചടങ്ങായും ഇവിടുത്തെ ആറാട്ടിനെ ആഘോഷിച്ചുവരുന്നു.... അതെ.... പന്തളത്തെ രാജകുമാരൻ എന്ന നിലയിലും.... ക്ഷേത്രത്തിലെ പരമോന്നത ദേവൻ എന്ന നിലയിലും, ഭഗവാൻ തന്റെ ഭക്തരെ നേരിൽക്കണ്ട് അനുഗ്രഹിക്കാൻ എഴുന്നള്ളുന്ന പുണ്യമായ ചടങ്ങാകും ഗ്രാമപ്രദക്ഷിണവും ദേവിയുടെ ആറാട്ടും.... ഒരിക്കലെങ്കിലും കണ്ട് കൈവണങ്ങുവാൻ വന്നുചേരുക ഭക്തത മനസ്സുകളെ.... സകുടുംബ നാഥനായി... സകല ഐശ്വര്യങ്ങൾക്കും അധിപതിയായി വാഴുന്ന വളാംകുളം ശ്രീ കൈനാറി അയ്യപ്പൻകാവിൽ പ്രഭാ സത്യക സമേതനായി വാണരുളുന്ന ശ്രീധർമ്മശാസ്താവ് നിങ്ങളിൽ കൃപ ചൊരിയട്ടെ.... ഭഗവാൻറെ അനുഗ്രഹത്താൽ ഭക്തമനസ്സുകളുടെ പ്രാർത്ഥനകൾ പൂവണിയട്ടെ.... കുടുംബനാഥനായ ധർമ്മശാസ്താ സങ്കല്പത്തിൻ്റെ ചൈതന്യധാര നിറയുന്ന ഈ പുണ്യഭൂമിയിൽ വന്നുചേരു.... ഐശ്വര്യവും അഭിവൃദ്ധിയും ഭഗവാൻറെ അനുഗ്രഹമായി ചൂടി മടങ്ങാം.... വളാംകുളം ശ്രീ കൈനാറി അയ്യപ്പൻകാവിൽ കുടുംബ സമേതനായി കുടികൊള്ളും ശ്രീധർമ്മശാസ്താവിന്റെ തൃപ്പാദപത്മങ്ങളിൽ പ്രണാമം.... കോടി കോടി പ്രണാമം...."
        },
        {
          title: "മഹോത്സവം ",
          content: "മനസ്സുകളിൽ ആനന്ദത്തിന്റെ ധന്യത നിറഞ്ഞുകഴിഞ്ഞു.... അതെ... പ്രഭാസത്യക സമേതനായി അനന്തകോടി ചൈതന്യത്തോടെ തൃക്കുന്നപ്പുഴ ശ്രീധർമ്മശാസ്താ ക്ഷേത്രത്തിൽ വാണരുളുന്ന കലിയുഗവരദന് മഹോത്സവമായി.... കാലം കാത്തിരുന്ന ആറാട്ട് മഹോത്സവം വന്നെത്തിച്ചേരുകയായി.... തൃക്കുന്നപ്പുഴ ദേശത്തിന് ഒന്നാകെ ആഘോഷത്തിന്റെ വർണ്ണാഭ സമ്മാനിച്ചുകൊണ്ട്..... 2025 നവംബർ 22 ശനിയാഴ്ചയും നവംബർ 23 ഞായറാഴ്ചയും ആഘോഷത്തിന്റെ പൊന്നിൻ സുദിനങ്ങൾ ഒരുങ്ങുമ്പോൾ ഭഗവാൻറെ തിരുസന്നിധിയിൽ രണ്ടാം ഉത്സവ ദിവസമായ നവംബർ 22 ശനിയാഴ്ച നടക്കും അപൂർവങ്ങളിൽ അപൂർവമായ അട പൊങ്കാല.... അതെ പഞ്ചഭൂതാത്മകമായ അഞ്ചു കൂട്ടം ദ്രവ്യങ്ങൾ ഇലയിൽ പൊതിഞ്ഞ അഗ്നിയിൽ വേവിച്ച് ഭഗവാന് സമർപ്പിക്കുന്ന അതിവിശിഷ്ടമാകും അട പൊങ്കാല ഒരുങ്ങുമ്പോൾ... ഈ മഹത് കർമ്മത്തിൽ പങ്കുചേരുവാൻ എല്ലാ നല്ലവരായ ഭക്ത മനസ്സുകൾക്കും സ്വാഗതം...... ഭഗവാന്റെ തിരുസന്നിധിയെ ധന്യമാക്കിക്കൊണ്ട് നവംബർ 22 ശനിയാഴ്ച രാവിലെ വൈകിട്ട് 7 മണി മുതൽ ഒരുങ്ങുകയാണ് വേല വരവിന് പെരുമ തീർത്ത് കൊണ്ട്.... ചെണ്ടയിൽ ഇടിനാദം തീർത്ത പാലക്കാടൻ മേള പ്രമാണി.... സർവ്വശ്രീ കല്ലൂർ ഉണ്ണികൃഷ്ണൻ മാരാരുടെ പ്രമാണത്തിൽ... ഗംഭീര പാണ്ടിമേളം.... വൈകിട്ട് 4 മണിക്ക് നടക്കുന്ന പഞ്ചവാദ്യം നയിക്കുവാൻ വളാംകുളം ശ്രീ കൈനാറി അയ്യപ്പൻകാവിലേക്ക് വന്നുചേരും പഞ്ചവാദ്യകലയിലെ യുവഛത്രാധിപതി സർവ്വശ്രീ കൊടുന്തുരപ്പുള്ളി മനോജും സംഘവും.... തീരുന്നില്ല വിസ്മയം... ആഘോഷങ്ങൾ പൂത്തുലയുന്ന കലിയുഗവരദനായ ശ്രീധർമ്മശാസ്താവിന്റെ മണ്ണിൽ.... ആറാട്ട് മഹോത്സവം ഒരുങ്ങുമ്പോൾ.... ഭഗവാൻറെ ആറാട്ട് തിടമ്പേറ്റി നിൽക്കുവാൻ അവതരിക്കും ആ യുവരാജാവും.... ശോഭനമായ ഭാവിയുടെ കരുത്തുറ്റ കാലത്തേക്ക്... നാളെയുടെ രാജാവായി നടയ മരങ്ങൾ ഉറപ്പിക്കുന്ന യുവചക്രവർത്തി.... പൂരം വിരിയുന്ന പൂരനഗരിയുടെ ആരവങ്ങൾക്ക് നായകത്വം വഹിക്കുവാൻ അഴകിന്റെ ചെന്താമര ചന്തം ചൂടി അവതാരം കൊണ്ടവൻ.... വന്നുചേരും കൂട്ടരേ... സൽകുടുംബനാഥനായി വളാംകുളം ശ്രീ കൈനാറി അയ്യപ്പൻകാവിൽ കുടികൊള്ളുന്ന ശ്രീധർമ്മശാസ്താവിന് ആറാട്ട് പീഠമാകാൻ അവൻ.... പൂരനഗരിയുടെ യുവരാജ കേസരി.... യുവരാജരത്നം.... നന്തിലത്ത് ഗോപാലകൃഷ്ണൻ.... തീർത്താൽ തീരാത്ത ആഘോഷവുമായി ഈ നാട് ഒരുങ്ങി നിൽക്കുമ്പോൾ നവംബർ 23 ഞായറാഴ്ച രാവിലെ നടക്കുന്ന ആറാട്ട് മേളത്തിന് ആവേശം ഇരട്ടിയാകും.... വൈകിട്ട് 6 30 മുതൽ ഭഗവാന്റെ കലാവേദിയെ ആവേശഭരിതമാക്കി ഫ്ലവേഴ്സ് ടിവി കോമഡി ഉത്സവം ഉണ്ണി ഗിന്നസ് നയിക്കുന്ന സഹകരിക്കുക ഓർക്കസ്ട്രയുടെ ഭക്തിഗാനമേളയും വിസ്മയമാകും.. അതെ... സമർപ്പിതമാകുന്ന ആചാരങ്ങളുടെ പെരുമയിൽ സകല ഐശ്വര്യത്തിനും നാഥനായ ഭഗവാന് ഉത്സവ മഹാമഹം ഇതാ അണിഞ്ഞൊരുങ്ങിക്കഴിഞ്ഞു.... ഈ ദേശം ഒരേ മനസ്സോടെ കൊണ്ടാടുന്ന മഹോത്സവം കൂടുവാൻ... എല്ലാ എല്ലാ ഭക്ത മനസ്സുകൾക്കും  വളാംകുളം ശ്രീ കൈനാറി അയ്യപ്പൻകാവ് ക്ഷേത്രത്തിലേക്ക് സ്വാഗതം... ഭഗവത് നാമത്തിൽ ഹൃദ്യമായ സുസ്വാഗതം...."
        }
      ]
    }
  }

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="page-heading-animated">{content[language].title}</h1>
          <p className="hero-subtitle page-subtitle-animated">{content[language].subtitle}</p>
        </div>
      </div>

      <div className="language-selector">
        <button 
          className={`lang-btn ${language === 'english' ? 'active' : ''}`}
          onClick={() => setLanguage('english')}
        >
          English
        </button>
        <button 
          className={`lang-btn ${language === 'malayalam' ? 'active' : ''}`}
          onClick={() => setLanguage('malayalam')}
        >
          മലയാളം
        </button>
      </div>

      <div className="about-container">
        {content[language].sections.map((section, index) => (
          <section key={index} className="content-section">
            <div className="section-header">
              <h2>{section.title}</h2>
              <div className="section-line"></div>
            </div>
            <div className="section-content">
              <div className="content-card">
                <p>{section.content}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default About