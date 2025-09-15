import React, { useState, useEffect, useRef } from 'react';

// SpeechSynthesis API functionality
let isSpeaking = false;

// Get available voices and filter for en-US
const getVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(voice => voice.lang.startsWith('en-US'));
};

// Select a default voice based on device type
const getDefaultVoice = (voices) => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    return voices.find(v => v.name.includes('Samantha')) || voices[0];
  } else {
    // Check if the 4th voice exists before returning
    return voices[3] || voices[0];
  }
};

const playAudio = (text, voice, setPlayingSection, sectionIndex, setAudioStatus) => {
  if (isSpeaking) {
    stopAudio();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  
  utterance.onstart = () => {
    isSpeaking = true;
    if (setAudioStatus) setAudioStatus('playing');
    if (setPlayingSection) setPlayingSection(sectionIndex);
  };
  
  utterance.onend = () => {
    isSpeaking = false;
    if (setAudioStatus) setAudioStatus('stopped');
    if (setPlayingSection) setPlayingSection(null);
  };
  
  utterance.onerror = (event) => {
    console.error('SpeechSynthesis Utterance Error:', event.error);
    isSpeaking = false;
    if (setAudioStatus) setAudioStatus('stopped');
    if (setPlayingSection) setPlayingSection(null);
  };
  
  window.speechSynthesis.speak(utterance);
};

const stopAudio = () => {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
  }
};

// Define hard words and their Khmer translations for the new content
const hardWords = {
  'relentless': 'មិន​ចុះ​ចាញ់',
  'intentionality': 'ចេតនា',
  'constructs': 'សាងសង់',
  'reacting': 'ប្រតិកម្ម',
  'external': 'ខាងក្រៅ',
  'stimulus': 'ការជំរុញ',
  'embodies': 'តំណាង',
  'empowered': 'មានអំណាច',
  'affirmations': 'ការអះអាង',
  'mastery': 'ការគ្រប់គ្រង',
  'lofty': 'ខ្ពស់',
  'vibrant': 'រស់រវើក',
  'actualization': 'ការសម្រេចបាន',
  'abundance': 'បរិបូរណ៍',
  'limiting': 'កំណត់',
  'narratives': 'និទានរឿង',
  'hostage': 'ចំណាប់ខ្មាំង',
  'inquiry': 'ការសាកសួរ',
  'accountability': 'គណនេយ្យភាព',
  'continual': 'បន្ត',
  'upgrades': 'ការធ្វើឱ្យប្រសើរ',
  'unstoppable': 'មិនអាចបញ្ឈប់បាន',
  'transformation': 'ការផ្លាស់ប្តូរ',
  'barriers': 'ឧបសគ្គ',
  'shattered': 'បែកបាក់',
  'transcended': 'លើស',
  'vulnerable': 'ងាយរងគ្រោះ',
  'philosophy': 'ទស្សនវិជ្ជា',
  'proactive': 'សកម្ម',
  'self-reliance': 'ការពឹងផ្អែកលើខ្លួនឯង',
};

const englishContent = {
  heading: 'Learn to Depend on Yourself and Become Stronger',
  sections: [
    {
      heading: 'The Most Important Relationship',
      body: `You know, I've often said that the most important relationship you'll ever have is the one you have with yourself. And today, we're going to dive deep into a concept that can change your life forever. Learning to depend on yourself. Now, I want you to imagine for a moment that you're standing at the edge of a vast, unexplored wilderness. The path ahead is unclear, filled with challenges and uncertainties. But here's the kick. You're the only who can navigate this journey. That wilderness, that's your life. In this world of constant change and unpredictability, there's only one constant you can truly rely on, and that's you. Not your circumstances, not other people, not even the government or your employer. Just you. Let me tell you a story. Years ago, I met a young man who was always waiting for his big break. He'd say, "Jim, when I get that promotion, then I'll be set." or once I find the right partner, everything will fall into place. He was always looking outside himself for the answers. For that magical solution that would solve all his problems. But here's the truth. That magical solution doesn't exist outside of you.`
    },
    {
      heading: 'The Dangers of Dependence',
      body: `The problem is, when you're looking for someone else to save you, you put yourself in a position of being vulnerable. You become a hostage to external forces beyond your control. When your success and happiness are tied to a job, a person, or an economy, you're always living in fear of losing it. And that's not a way to live. Real strength comes from within. It comes from developing your own skills, building your own value, and shaping your own destiny. It comes from having the mindset that no matter what happens, you will make it work. Jim Rohn once said, "Work harder on yourself than you do on your job." This is the core of self-reliance. When you change, everything around you changes.`
    },
    {
      heading: 'Embracing Your Power',
      body: `The path to true freedom and power is a simple, yet profound, shift in philosophy. Instead of saying, "I hope things get better," you start saying, "I will make things better." This is the proactive mindset of a winner. You stop being a victim of your circumstances and start becoming the architect of your future. It's not about waiting for the right opportunity; it's about creating it. It’s about building a strong foundation of discipline, consistency, and relentless self-improvement, so that you are prepared for whatever life throws at you. This isn't just about financial success. This is about living a life of purpose and intention. A life where you are in control.`
    },
    {
      heading: 'The Unstoppable You',
      body: `I'm talking about a person who lives with relentless intentionality in everything they do. Who constructs their day-to-day reality from the inside out instead of just mindlessly reacting to external stimulus. Who embodies empowered beliefs at their absolute core, not just giving lip service to empty affirmations or positive thinking. From that place of mental and emotional mastery, I assure you nothing will be off limits. Every aim, no matter how lofty it may seem now, will be firmly within your grasp. Wealth, health, vibrant relationships, creative expression, self-actualization of the highest order. It will all flow to you in abundance when your existence is aligned with a truly empowered mindset. So, what's it going to be? Are you ready to step into your full potential and finally shed those limiting narratives that have held you hostage for far too long? Are you prepared to do the hard work of relentless self- inquiry, accountability, and continual mindset upgrades? If so, welcome to the ranks of the unstoppable. Welcome to the journey of radical transformation, where barriers are made to be shattered and limits exist only to be transcended. The path won't be easy, but my friends, few things worth achieving ever are...`
    }
  ],
  principles: []
};

const khmerContent = {
  heading: 'រៀនពឹងផ្អែកលើខ្លួនឯង និងក្លាយជាអ្នកខ្លាំង',
  sections: [
    {
      heading: 'ទំនាក់ទំនងសំខាន់បំផុត',
      body: `អ្នកដឹងទេ ខ្ញុំតែងតែនិយាយថា ទំនាក់ទំនងដែលសំខាន់បំផុតដែលអ្នកធ្លាប់មាន គឺទំនាក់ទំនងដែលអ្នកមានជាមួយខ្លួនឯង។ ហើយថ្ងៃនេះ យើងនឹងស្វែងយល់ឱ្យបានស៊ីជម្រៅទៅលើគោលគំនិតមួយដែលអាចផ្លាស់ប្តូរជីវិតរបស់អ្នកជារៀងរហូត។ នោះគឺការរៀនពឹងផ្អែកលើខ្លួនឯង។ ឥឡូវនេះ ខ្ញុំចង់ឱ្យអ្នកស្រមៃមួយភ្លែតថាអ្នកកំពុងឈរនៅមាត់ព្រៃដ៏ធំដែលមិនធ្លាប់មាននរណាស្វែងយល់។ ផ្លូវនៅខាងមុខមិនច្បាស់លាស់ទេ ដែលពោរពេញទៅដោយបញ្ហាប្រឈម និងភាពមិនប្រាកដប្រជា។ ប៉ុន្តែអ្វីដែលសំខាន់គឺ អ្នកគឺជាមនុស្សតែម្នាក់គត់ដែលអាចធ្វើដំណើរលើផ្លូវនេះបាន។ ព្រៃនោះគឺជីវិតរបស់អ្នក។ នៅក្នុងពិភពលោកដែលផ្លាស់ប្តូរឥតឈប់ឈរ និងមិនអាចទាយទុកជាមុនបាននេះ មានតែរឿងមួយគត់ដែលអ្នកអាចពឹងផ្អែកបានពិតប្រាកដ ហើយនោះគឺខ្លួនអ្នក។ មិនមែនជាកាលៈទេសៈរបស់អ្នកទេ មិនមែនជាមនុស្សផ្សេងទៀតទេ សូម្បីតែរដ្ឋាភិបាល ឬនិយោជករបស់អ្នកក៏ដោយ។ គឺមានតែអ្នកប៉ុណ្ណោះ។ ខ្ញុំនឹងប្រាប់អ្នកនូវរឿងមួយ។ កាលពីច្រើនឆ្នាំមុន ខ្ញុំបានជួបយុវជនម្នាក់ដែលតែងតែរង់ចាំឱកាសធំរបស់គាត់។ គាត់តែងតែនិយាយថា "Jim ពេលខ្ញុំបានឡើងតំណែង ខ្ញុំនឹងល្អប្រសើរ" ឬ "នៅពេលខ្ញុំរកឃើញដៃគូត្រឹមត្រូវ អ្វីៗគ្រប់យ៉ាងនឹងចូលកន្លែងទាំងអស់"។ គាត់តែងតែស្វែងរកចម្លើយនៅខាងក្រៅខ្លួនគាត់។ សម្រាប់ដំណោះស្រាយវេទមន្តដែលនឹងដោះស្រាយបញ្ហាទាំងអស់របស់គាត់។ ប៉ុន្តែការពិតគឺ ដំណោះស្រាយវេទមន្តនោះមិនមាននៅក្រៅខ្លួនអ្នកទេ។`
    },
    {
      heading: 'គ្រោះថ្នាក់នៃការពឹងផ្អែក',
      body: `បញ្ហាគឺ នៅពេលដែលអ្នករង់ចាំនរណាម្នាក់ផ្សេងទៀតមកជួយសង្គ្រោះអ្នក អ្នកកំពុងដាក់ខ្លួនអ្នកក្នុងស្ថានភាពងាយរងគ្រោះ។ អ្នកក្លាយជាចំណាប់ខ្មាំងនៃកត្តាខាងក្រៅដែលហួសពីការគ្រប់គ្រងរបស់អ្នក។ នៅពេលដែលភាពជោគជ័យ និងសុភមង្គលរបស់អ្នកជាប់ទាក់ទងនឹងការងារ មនុស្ស ឬសេដ្ឋកិច្ច អ្នកតែងតែរស់នៅក្នុងការភ័យខ្លាចនៃការបាត់បង់វា។ ហើយនោះមិនមែនជាផ្លូវរស់នៅទេ។ កម្លាំងពិតប្រាកដគឺកើតចេញពីខាងក្នុង។ វាគឺមកពីការអភិវឌ្ឍជំនាញផ្ទាល់ខ្លួនរបស់អ្នក ការកសាងតម្លៃផ្ទាល់ខ្លួនរបស់អ្នក និងការកែប្រែជោគវាសនាផ្ទាល់ខ្លួនរបស់អ្នក។ វាគឺមកពីការមានផ្នត់គំនិតថា ទោះបីជាមានអ្វីកើតឡើងក៏ដោយ អ្នកនឹងធ្វើឱ្យវាដំណើរការទៅបាន។ Jim Rohn ធ្លាប់បាននិយាយថា "ធ្វើការលើខ្លួនឯងឱ្យខ្លាំងជាងការធ្វើការលើការងាររបស់អ្នក"។ នេះគឺជាមូលដ្ឋានគ្រឹះនៃការពឹងផ្អែកលើខ្លួនឯង។ នៅពេលដែលអ្នកផ្លាស់ប្តូរ អ្វីៗគ្រប់យ៉ាងនៅជុំវិញអ្នកក៏ផ្លាស់ប្តូរដែរ។`
    },
    {
      heading: 'ទទួលយកអំណាចរបស់អ្នក',
      body: `ផ្លូវទៅកាន់សេរីភាព និងអំណាចពិតប្រាកដគឺសាមញ្ញ ប៉ុន្តែមានឥទ្ធិពលខ្លាំង ដែលជាការផ្លាស់ប្តូរទស្សនវិជ្ជា។ ជំនួសឱ្យការនិយាយថា "ខ្ញុំសង្ឃឹមថាអ្វីៗនឹងប្រសើរឡើង" អ្នកចាប់ផ្តើមនិយាយថា "ខ្ញុំនឹងធ្វើឱ្យអ្វីៗប្រសើរឡើង"។ នេះគឺជាផ្នត់គំនិតសកម្មរបស់អ្នកឈ្នះ។ អ្នកឈប់ធ្វើជាជនរងគ្រោះនៃកាលៈទេសៈរបស់អ្នក ហើយចាប់ផ្តើមក្លាយជាស្ថាបត្យករនៃអនាគតរបស់អ្នក។ វា​មិន​មែន​ជា​ការ​រង់ចាំ​ឱកាស​ដ៏​ត្រឹមត្រូវ​នោះ​ទេ ប៉ុន្តែ​វា​គឺ​ជា​ការ​បង្កើត​វា។ វាគឺអំពីការកសាងមូលដ្ឋានគ្រឹះដ៏រឹងមាំនៃវិន័យ ភាពទៀងទាត់ និងការកែលម្អខ្លួនឯងជាបន្តបន្ទាប់ ដើម្បីឱ្យអ្នកត្រៀមខ្លួនសម្រាប់អ្វីដែលជីវិតដាក់មកលើអ្នក។ នេះមិនមែនត្រឹមតែអំពីភាពជោគជ័យផ្នែកហិរញ្ញវត្ថុនោះទេ។ នេះគឺអំពីការរស់នៅប្រកបដោយគោលបំណង និងចេតនា។ ជាជីវិតដែលអ្នកជាអ្នកគ្រប់គ្រង។`
    },
    {
      heading: 'អ្នកដែលមិនអាចបញ្ឈប់បាន',
      body: `ខ្ញុំកំពុងនិយាយអំពីមនុស្សម្នាក់ដែលរស់នៅដោយចេតនាឥតឈប់ឈរក្នុងអ្វីគ្រប់យ៉ាងដែលពួកគេធ្វើ។ អ្នកដែលសាងសង់ការពិតប្រចាំថ្ងៃរបស់ពួកគេពីខាងក្នុងទៅខាងក្រៅ ជំនួសឱ្យការគ្រាន់តែប្រតិកម្មដោយគ្មានគំនិតចំពោះការជំរុញខាងក្រៅ។ អ្នកដែលតំណាងឱ្យជំនឿដែលមានអំណាចនៅស្នូលដាច់ខាតរបស់ពួកគេ មិនមែនគ្រាន់តែនិយាយអះអាងទទេៗ ឬការគិតវិជ្ជមាននោះទេ។ ពីកន្លែងនៃការគ្រប់គ្រងផ្លូវចិត្ត និងអារម្មណ៍នោះ ខ្ញុំធានាថាគ្មានអ្វីនឹងគ្មានដែនកំណត់នោះទេ។ រាល់គោលបំណង ទោះបីជាវាហាក់ដូចជាខ្ពស់យ៉ាងណាក៏ដោយ នឹងស្ថិតនៅក្នុងកណ្តាប់ដៃរបស់អ្នក។ ទ្រព្យសម្បត្តិ សុខភាព ទំនាក់ទំនងដ៏រស់រវើក ការបញ្ចេញមតិប្រកបដោយភាពច្នៃប្រឌិត ការសម្រេចបានដោយខ្លួនឯងនៃលំដាប់ខ្ពស់បំផុត។ វានឹងហូរមកកាន់អ្នកយ៉ាងបរិបូរណ៍នៅពេលដែលអត្ថិភាពរបស់អ្នកត្រូវបានតម្រឹមជាមួយនឹងផ្នត់គំនិតដែលមានអំណាចពិតប្រាកដ។ ដូច្នេះ តើវានឹងទៅជាយ៉ាងណា? តើអ្នកត្រៀមខ្លួនរួចរាល់ហើយឬនៅដើម្បីឈានចូលទៅក្នុងសក្តានុពលពេញលេញរបស់អ្នក ហើយទីបំផុតបោះបង់ចោលនិទានរឿងដែលបានដាក់កំហិតដែលបានឃុំឃាំងអ្នកយូរមកហើយ? តើអ្នកត្រៀមខ្លួនហើយឬនៅដើម្បីធ្វើការងារដ៏លំបាកនៃការសាកសួរខ្លួនឯងឥតឈប់ឈរ គណនេយ្យភាព និងការធ្វើឱ្យប្រសើរឡើងនូវផ្នត់គំនិតជាបន្តបន្ទាប់? ប្រសិនបើដូច្នេះ សូមស្វាគមន៍មកកាន់ក្រុមដែលមិនអាចបញ្ឈប់បាន។ សូមស្វាគមន៍ចំពោះការធ្វើដំណើរនៃការផ្លាស់ប្តូររ៉ាឌីកាល់ ដែលឧបសគ្គត្រូវបានបង្កើតឡើងដើម្បីបំបែក និងដែនកំណត់មានត្រឹមតែដើម្បីលើសវាប៉ុណ្ណោះ។ ផ្លូវនឹងមិនងាយស្រួលទេ ប៉ុន្តែ មិត្តរបស់ខ្ញុំ អ្វីៗមួយចំនួនដែលសមនឹងទទួលបានគឺមិនងាយស្រួលនោះទេ។`
    }
  ],
  principles: []
};


const App = () => {
  const [playingSection, setPlayingSection] = useState(null);
  const [audioStatus, setAudioStatus] = useState('stopped');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const popupRef = useRef(null);
  const popupTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    // Check if SpeechSynthesis is supported and get voices
    if ('speechSynthesis' in window) {
      const getVoicesAndSet = () => {
        const availableVoices = getVoices();
        setVoices(availableVoices);
        const defaultVoice = getDefaultVoice(availableVoices);
        setSelectedVoice(defaultVoice);
      };

      // Some browsers don't populate voices on page load
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = getVoicesAndSet;
      }
      getVoicesAndSet();
    }

    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleHardWordClick = (event, word, translation) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    setPopupContent({
      word: word,
      translation: translation,
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5, // Position the popup below the word
    });
    setShowPopup(true);

    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
    }
    popupTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };
  
  const handlePopupAudio = (word) => {
    if (selectedVoice) {
      playAudio(word, selectedVoice);
    }
  };

  const getHardWordSpan = (word, translation, key) => {
    return (
      <span
        key={key}
        className="hard-word-underline cursor-pointer"
        onClick={(e) => handleHardWordClick(e, word, translation)}
      >
        {word}
      </span>
    );
  };

  const processTextWithHardWords = (text) => {
    const words = text.split(/\b/);
    return words.map((word, index) => {
      const normalizedWord = word.toLowerCase().trim();
      if (hardWords[normalizedWord]) {
        return getHardWordSpan(word, hardWords[normalizedWord], index);
      }
      return <React.Fragment key={index}>{word}</React.Fragment>;
    });
  };

  const handlePlay = (text, index) => {
    if (selectedVoice) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setAudioStatus('playing');
      } else {
        playAudio(text, selectedVoice, setPlayingSection, index, setAudioStatus);
      }
    }
  };

  const handleStop = () => {
    stopAudio();
    setPlayingSection(null);
    setAudioStatus('stopped');
    setIsPaused(false);
  };

  const handlePause = () => {
    if (isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setAudioStatus('paused');
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 sm:p-8 flex flex-col items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Moulpali&family=Hanuman:wght@100;300;400;700;900&family=Battambang:wght@100;300;400;700;900&display=swap');
        
        .font-english-header { font-family: 'Playfair Display', serif; }
        .font-english-subheading { font-family: 'Merriweather', serif; }
        .font-english-body { font-family: 'Lato', sans-serif; }
        .font-english-label { font-family: 'Montserrat', sans-serif; }
        
        .font-khmer-header { font-family: 'Moul', serif; }
        .font-khmer-subheading { font-family: 'Moulpali', cursive; }
        .font-khmer-body { font-family: 'Hanuman', serif; }
        .font-khmer-label { font-family: 'Battambang', cursive; }

        /* Custom style for hard word underline */
        .hard-word-underline {
          text-decoration: underline;
          text-decoration-style: dashed;
          text-decoration-color: #3b82f6;
          text-underline-offset: 3px;
        }

        .hard-word-popup {
          position: absolute;
          background-color: white;
          border: 1px solid #ccc;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          z-index: 50;
          font-family: 'Battambang', cursive;
        }

        @media (max-width: 768px) {
          .dual-language-container {
            flex-direction: column;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <div className="w-full max-w-6xl mb-8 overflow-hidden rounded-xl shadow-lg">
        <img
          src="https://img.freepik.com/premium-vector/only-person-you-can-rely-is-yourself_24381-1068.jpg"
          alt="Transform Your Life"
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="w-full max-w-6xl text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-english-header font-bold mb-4">{englishContent.heading}</h1>
        <div className="flex items-center justify-center mb-4 space-x-2">
          <label htmlFor="voice-select" className="font-english-label text-sm text-gray-600">Select Voice:</label>
          <select 
            id="voice-select" 
            className="bg-white p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="dual-language-container flex w-full max-w-6xl space-y-8 sm:space-y-0 sm:space-x-8">
        {/* English Section */}
        <div className="w-full sm:w-1/2 space-y-8">
          {englishContent.sections.map((section, index) => (
            <div key={`section-en-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-english-subheading font-semibold text-gray-900">{section.heading}</h2>
                <div className="flex items-center space-x-2">
                  {playingSection === index && audioStatus === 'playing' ? (
                    <>
                      <button onClick={handlePause} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                      </button>
                      <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                      </button>
                    </>
                  ) : playingSection === index && audioStatus === 'paused' ? (
                    <>
                      <button onClick={() => handlePlay(section.body, index)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                      </button>
                      <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handlePlay(section.body, index)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                      {audioStatus === 'loading' && playingSection === index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.01 6.74 2.8L21 8"/><path d="M21 3v5h-5"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <p className="font-english-body leading-relaxed text-gray-700 whitespace-pre-line">{processTextWithHardWords(section.body)}</p>
            </div>
          ))}
          
          {englishContent.principles.map((principle, index) => (
            <div key={`principle-en-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-english-subheading font-semibold text-gray-900">{principle.title}</h3>
                <div className="flex items-center space-x-2">
                  {playingSection === `principle-en-${index}` && audioStatus === 'playing' ? (
                    <>
                      <button onClick={handlePause} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                      </button>
                      <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                      </button>
                    </>
                  ) : playingSection === `principle-en-${index}` && audioStatus === 'paused' ? (
                    <>
                      <button onClick={() => handlePlay(`${principle.title}. ${principle.body}`, `principle-en-${index}`)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                      </button>
                      <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handlePlay(`${principle.title}. ${principle.body}`, `principle-en-${index}`)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                      {audioStatus === 'loading' && playingSection === `principle-en-${index}` ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.01 6.74 2.8L21 8"/><path d="M21 3v5h-5"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <p className="font-english-body leading-relaxed text-gray-700 whitespace-pre-line">{processTextWithHardWords(principle.body)}</p>
            </div>
          ))}
        </div>
        
        {/* Khmer Section */}
        <div className="w-full sm:w-1/2 space-y-8">
          {khmerContent.sections.map((section, index) => (
            <div key={`section-km-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
              <h2 className="text-2xl font-khmer-subheading font-semibold text-gray-900">{section.heading}</h2>
              <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">{section.body}</p>
            </div>
          ))}
          
          {khmerContent.principles.map((principle, index) => (
            <div key={`principle-km-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
              <h3 className="text-xl font-khmer-subheading font-semibold text-gray-900">{principle.title}</h3>
              <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">{principle.body}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hard Word Popup */}
      {showPopup && (
        <div 
          ref={popupRef}
          className="hard-word-popup"
          style={{ top: `${popupContent.y}px`, left: `${popupContent.x}px` }}
        >
          <div className="flex items-center space-x-2">
            <span className="font-khmer-label text-lg">{popupContent.translation}</span>
            <button
              onClick={() => handlePopupAudio(popupContent.word)}
              className="p-1 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
