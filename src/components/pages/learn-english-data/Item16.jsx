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

  speechSynthesis.speak(utterance);
};

const stopAudio = () => {
  if (isSpeaking) {
    speechSynthesis.cancel();
    isSpeaking = false;
  }
};

const LuAudioLines = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 10v3" />
    <path d="M6 6v11" />
    <path d="M10 3v18" />
    <path d="M14 8v7" />
    <path d="M18 5v14" />
    <path d="M22 10v3" />
  </svg>
);

const CiPause1 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const HiOutlineStop = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="5" y="5" width="14" height="14" rx="2" ry="2" />
  </svg>
);


const principles = [
  {
    title: "Rule #1: If it's not a 'Hell Yeah,' it's a 'No.'",
    body: "Avoid saying yes to choices that don't truly excite you. Over-committing to 'meh' things drains your energy and leaves you too busy and tired for the truly exciting, golden opportunities that come your way. This rule is designed to help you save time and avoid burnout."
  },
  {
    title: "Rule #2: Ignore others while you're driving on your own lane.",
    body: "Focus on your own path and goals without getting distracted by what others are doing. Comparison can lead to unhappiness and can pull you away from what's truly right for you."
  },
  {
    title: "Rule #3: The best advice you can get is to ignore all advice.",
    body: "Ultimately, you are the only one who knows what is right for you. While listening to others' advice can be helpful, the most important decisions should come from your own intuition and self-trust."
  },
  {
    title: "Rule #4: Give yourself a 'reset day.'",
    body: "Take one day a week to do nothing. A 'reset day' is not about being lazy; it's about intentionally giving your mind and body a complete break to clear out the noise and recharge, making you more productive and focused for the week ahead."
  },
  {
    title: "Rule #5: You are your own home.",
    body: "True security and happiness don't come from external factors like a job, a relationship, or a physical place. They come from within you. By cultivating a strong inner self, you can feel safe and grounded no matter what happens in the world around you."
  },
  {
    title: "Rule #6: Disconnect.",
    body: "By disconnecting from the constant flow of information and distractions, you can achieve greater clarity and focus. This allows you to get more done and find your true passions."
  },
  {
    title: "Rule #7: There's no speed limit.",
    body: "You are not limited to the normal pace that society expects. You have the ability to move faster and achieve your goals more quickly than others if you choose to."
  },
  {
    title: "Rule #8: Relax for the same result.",
    body: "Rushing only leads to stress without necessarily changing the outcome. It is better to stay calm and relaxed to achieve the same results."
  },
  {
    title: "Rule #9: Forget the perfect setting.",
    body: "You don't need a fancy or ideal environment to begin working on your goals. You can start right where you are with what you have."
  },
  {
    title: "Rule #10: Keep a possible futures folder.",
    body: "This folder acts as a 'later list' for your ideas and projects. It's a place to store all your inspirations and potential projects so you can return to them when the time is right, without feeling overwhelmed."
  },
  {
    title: "Rule #11: What do you hate not doing? Do that.",
    body: "This is the key to finding your passions. The things that you would be upset about if you weren't doing them are your true 'hell yeah' activities."
  },
  {
    title: "Rule #12: If you didn't need money or praise, what would you do?",
    body: "This powerful question helps you uncover your genuine passions and purpose, free from the external motivations of money and social validation."
  },
  {
    title: "Rule #13: Your actions reveal your true values, not what you say you want to do.",
    body: "Your deeds are a more honest and accurate representation of what you truly value than your words. Your actions are the real proof of your intentions."
  },
  {
    title: "Rule #14: Think like a bronze medalist.",
    body: "Instead of comparing yourself to those who are ahead, take time to appreciate how far you've come. This mindset promotes gratitude and prevents comparison from draining your motivation."
  },
  {
    title: "Rule #15: If anything happens, don't blame anyone.",
    body: "Taking full responsibility for everything in your life is a life-changing rule. It empowers you to take control and make changes instead of blaming external factors."
  },
];

const khmerPrinciples = [
  {
    title: "ក្បួនទី១: បើមិនមែនជា 'យល់ព្រមទាំងស្រុង' គឺ 'ទេ'",
    body: "ចៀសវាងការយល់ព្រមលើជម្រើសដែលមិនពិតជាគួរឲ្យរំភើប។ ការប្ដេជ្ញាចិត្តលើរឿងធម្មតាៗច្រើនពេក ធ្វើឲ្យបាត់បង់ថាមពល និងពេលវេលារបស់អ្នក ហើយធ្វើឲ្យអ្នករវល់ពេក និងហត់នឿយពេកក្នុងការស្វែងរកឱកាសមាសដែលពិតជាគួរឲ្យរំភើប។ ក្បួននេះត្រូវបានរៀបចំឡើងដើម្បីជួយសន្សំពេលវេលារបស់អ្នក និងជៀសវាងការអស់កម្លាំង។"
  },
  {
    title: "ក្បួនទី២: មិនអើពើនឹងអ្នកដទៃនៅពេលអ្នកកំពុងបើកបរលើផ្លូវរបស់អ្នក។",
    body: "ផ្តោតលើផ្លូវ និងគោលដៅផ្ទាល់ខ្លួនរបស់អ្នក ដោយមិនបណ្តោយឱ្យមានការរំខានដោយអ្វីដែលអ្នកដទៃកំពុងធ្វើ។ ការប្រៀបធៀបអាចនាំឱ្យមានភាពមិនសប្បាយចិត្ត និងអាចទាញអ្នកឱ្យឃ្លាតឆ្ងាយពីអ្វីដែលពិតជាត្រឹមត្រូវសម្រាប់អ្នក។"
  },
  {
    title: "ក្បួនទី៣: ដំបូន្មានដ៏ល្អបំផុតដែលអ្នកអាចទទួលបានគឺការមិនអើពើនឹងដំបូន្មានទាំងអស់។",
    body: "ទីបំផុត អ្នកគឺជាមនុស្សតែម្នាក់គត់ដែលដឹងថាអ្វីដែលត្រឹមត្រូវសម្រាប់អ្នក។ ខណៈពេលដែលការស្តាប់ដំបូន្មានរបស់អ្នកដទៃអាចមានប្រយោជន៍ ការសម្រេចចិត្តដ៏សំខាន់បំផុតគួរតែចេញពីសភាវគតិ និងការជឿជាក់លើខ្លួនឯងផ្ទាល់របស់អ្នក។"
  },
  {
    title: "ក្បួនទី៤: ផ្ដល់ឱ្យខ្លួនឯងនូវ 'ថ្ងៃកំណត់ឡើងវិញ'។",
    body: "ចំណាយពេលមួយថ្ងៃក្នុងមួយសប្តាហ៍ដើម្បីមិនធ្វើអ្វីសោះ។ 'ថ្ងៃកំណត់ឡើងវិញ' មិនមែនជាការខ្ជិលច្រអូសនោះទេ គឺវាជាការផ្ដល់ឱ្យចិត្ត និងរាងកាយរបស់អ្នកនូវការសម្រាកទាំងស្រុងដើម្បីជម្រះភាពរញ៉េរញ៉ៃ និងបញ្ចូលថាមពលឡើងវិញ ដែលធ្វើឱ្យអ្នកមានប្រសិទ្ធភាព និងផ្តោតអារម្មណ៍កាន់តែខ្លាំងសម្រាប់សប្តាហ៍ខាងមុខ។"
  },
  {
    title: "ក្បួនទី៥: អ្នកគឺជាផ្ទះរបស់ខ្លួនឯង។",
    body: "សុវត្ថិភាព និងសុភមង្គលពិតប្រាកដមិនមែនបានមកពីកត្តាខាងក្រៅដូចជាការងារ ទំនាក់ទំនង ឬទីកន្លែងរាងកាយនោះទេ។ ពួកវាបានមកពីក្នុងខ្លួនអ្នក។ តាមរយៈការបណ្ដុះបណ្ដាលខ្លួនឯងផ្ទាល់ឱ្យរឹងមាំ អ្នកអាចមានអារម្មណ៍សុវត្ថិភាព និងមានមូលដ្ឋានគ្រឹះរឹងមាំមិនថានឹងមានអ្វីកើតឡើងនៅក្នុងពិភពលោកជុំវិញអ្នកនោះទេ។"
  },
  {
    title: "ក្បួនទី៦: ផ្តាច់ខ្លួន។",
    body: "តាមរយៈការផ្តាច់ខ្លួនពីលំហូរព័ត៌មាន និងការរំខានឥតឈប់ឈរ អ្នកអាចទទួលបានភាពច្បាស់លាស់ និងការផ្តោតអារម្មណ៍កាន់តែច្រើន។ នេះអនុញ្ញាតឱ្យអ្នកសម្រេចកិច្ចការបានកាន់តែច្រើន និងស្វែងរកចំណង់ចំណូលចិត្តពិតប្រាកដរបស់អ្នក។"
  },
  {
    title: "ក្បួនទី៧: គ្មានដែនកំណត់ល្បឿនទេ។",
    body: "អ្នកមិនត្រូវបានកំណត់ត្រឹមល្បឿនធម្មតាដែលសង្គមរំពឹងទុកនោះទេ។ អ្នកមានសមត្ថភាពក្នុងការបោះជំហានទៅមុខលឿនជាងមុន និងសម្រេចគោលដៅរបស់អ្នកបានលឿនជាងអ្នកដទៃ ប្រសិនបើអ្នកជ្រើសរើស។"
  },
  {
    title: "ក្បួនទី៨: សម្រាកដើម្បីទទួលបានលទ្ធផលដូចគ្នា។",
    body: "ការប្រញាប់ប្រញាល់គ្រាន់តែនាំឱ្យមានភាពតានតឹងដោយមិនចាំបាច់ផ្លាស់ប្តូរលទ្ធផលនោះទេ។ វាជាការប្រសើរក្នុងការរក្សាភាពស្ងប់ស្ងាត់និងសម្រាកដើម្បីទទួលបានលទ្ធផលដូចគ្នា។"
  },
  {
    title: "ក្បួនទី៩: បំភ្លេចទីតាំងដ៏ល្អឥតខ្ចោះ។",
    body: "អ្នកមិនត្រូវការបរិស្ថានដ៏ប្រណីត ឬល្អឥតខ្ចោះដើម្បីចាប់ផ្តើមធ្វើការលើគោលដៅរបស់អ្នកនោះទេ។ អ្នកអាចចាប់ផ្តើមនៅកន្លែងដែលអ្នកនៅពេលនេះជាមួយអ្វីដែលអ្នកមាន។"
  },
  {
    title: "ក្បួនទី១០: រក្សាថតឯកសារសម្រាប់អនាគតដែលអាចកើតមាន។",
    body: "ថតឯកសារនេះដើរតួជា 'បញ្ជីក្រោយ' សម្រាប់គំនិត និងគម្រោងរបស់អ្នក។ វាជាកន្លែងសម្រាប់ទុកបំផុសគំនិត និងគម្រោងដែលមានសក្តានុពលទាំងអស់របស់អ្នក ដូច្នេះអ្នកអាចត្រឡប់ទៅរកពួកវាវិញនៅពេលត្រឹមត្រូវ ដោយមិនមានអារម្មណ៍ធុញថប់។"
  },
  {
    title: "ក្បួនទី១១: តើអ្នកស្អប់អ្វីដែលមិនបានធ្វើ? ធ្វើវាទៅ។",
    body: "នេះគឺជាគន្លឹះក្នុងការស្វែងរកចំណង់ចំណូលចិត្តរបស់អ្នក។ អ្វីដែលអ្នកនឹងមានអារម្មណ៍មិនសប្បាយចិត្ត ប្រសិនបើអ្នកមិនបានធ្វើវា គឺជាសកម្មភាព 'យល់ព្រមទាំងស្រុង' ពិតប្រាកដរបស់អ្នក។"
  },
  {
    title: "ក្បួនទី១២: បើអ្នកមិនត្រូវការលុយ ឬការសរសើរ តើអ្នកនឹងធ្វើអ្វី?",
    body: "សំណួរដ៏មានឥទ្ធិពលនេះជួយអ្នកស្វែងរកចំណង់ចំណូលចិត្តពិតប្រាកដ និងគោលបំណងរបស់អ្នក ដោយមិនមានការលើកទឹកចិត្តពីខាងក្រៅដូចជាលុយ និងការទទួលស្គាល់ពីសង្គម។"
  },
  {
    title: "ក្បួនទី១៣: សកម្មភាពរបស់អ្នកបង្ហាញពីតម្លៃពិតរបស់អ្នក មិនមែនអ្វីដែលអ្នកនិយាយថាអ្នកចង់ធ្វើនោះទេ។",
    body: "ទង្វើរបស់អ្នកគឺជាការឆ្លុះបញ្ចាំងដ៏ស្មោះត្រង់និងត្រឹមត្រូវជាងមុននៃអ្វីដែលអ្នកពិតជាឱ្យតម្លៃជាងពាក្យសម្ដីរបស់អ្នក។ សកម្មភាពរបស់អ្នកគឺជាភស្តុតាងពិតនៃចេតនារបស់អ្នក។"
  },
  {
    title: "ក្បួនទី១៤: គិតដូចអ្នកឈ្នះមេដាយសំរិទ្ធ។",
    body: "ជំនួសឱ្យការប្រៀបធៀបខ្លួនឯងទៅនឹងអ្នកដែលនៅពីមុខ សូមចំណាយពេលដើម្បីកោតសរសើរចំពោះវឌ្ឍនភាពដែលអ្នកបានធ្វើរួចមកហើយ។ ផ្នត់គំនិតនេះលើកកម្ពស់ការដឹងគុណ និងការពារការប្រៀបធៀបមិនឱ្យបាត់បង់ការលើកទឹកចិត្តរបស់អ្នក។"
  },
  {
    title: "ក្បួនទី១៥: ប្រសិនបើមានអ្វីកើតឡើង កុំបន្ទោសអ្នកណា។",
    body: "ការទទួលខុសត្រូវពេញលេញចំពោះអ្វីគ្រប់យ៉ាងនៅក្នុងជីវិតរបស់អ្នក គឺជាក្បួនដែលផ្លាស់ប្តូរជីវិត។ វាផ្ដល់អំណាចឱ្យអ្នកក្នុងការគ្រប់គ្រង និងធ្វើការផ្លាស់ប្តូរជំនួសឱ្យការបន្ទោសកត្តាខាងក្រៅ។"
  },
];

const hardWords = {
  'burnout': 'ការអស់កម្លាំង',
  'golden opportunities': 'ឱកាសមាស',
  'clarity': 'ភាពច្បាស់លាស់',
  'passions': 'ចំណង់ចំណូលចិត្ត',
  'compare': 'ប្រៀបធៀប',
  'responsibility': 'ការទទួលខុសត្រូវ',
  'comparison': 'ការប្រៀបធៀប',
  'intuition': 'សភាវគតិ',
  'recharge': 'បញ្ចូលថាមពលឡើងវិញ',
  'cultivating': 'បណ្ដុះបណ្ដាល',
  'grounded': 'មានមូលដ្ឋានគ្រឹះរឹងមាំ'
};

const hardWordsKhmer = {
  'ការអស់កម្លាំង': 'Burnout',
  'ឱកាសមាស': 'Golden opportunities',
  'ភាពច្បាស់លាស់': 'Clarity',
  'ចំណង់ចំណូលចិត្ត': 'Passions',
  'ប្រៀបធៀប': 'Compare',
  'ការទទួលខុសត្រូវ': 'Responsibility',
  'ការប្រៀបធៀប': 'Comparison',
  'សភាវគតិ': 'Intuition',
  'បញ្ចូលថាមពលឡើងវិញ': 'Recharge',
  'បណ្ដុះបណ្ដាល': 'Cultivating',
  'មានមូលដ្ឋានគ្រឹះរឹងមាំ': 'Grounded'
};

const getHardWordAudio = (word) => {
  const words = {
    'burnout': 'Burnout',
    'golden opportunities': 'Golden opportunities',
    'clarity': 'Clarity',
    'passions': 'Passions',
    'compare': 'Compare',
    'responsibility': 'Responsibility',
    'comparison': 'Comparison',
    'intuition': 'Intuition',
    'recharge': 'Recharge',
    'cultivating': 'Cultivating',
    'grounded': 'Grounded'
  };
  return words[word.toLowerCase()] || word;
};


const Item10 = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingSection, setPlayingSection] = useState(null);
  const [audioStatus, setAudioStatus] = useState('stopped');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const popupRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getVoices();
      setVoices(availableVoices);
      setSelectedVoice(getDefaultVoice(availableVoices));
    };

    if ('speechSynthesis' in window) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.closest('.hard-word-underline')) {
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleAudioToggle = (index) => {
    const textToSpeak = principles[index].body;
    if (playingSection === index && audioStatus === 'playing') {
      stopAudio();
      setAudioStatus('stopped');
      setPlayingSection(null);
    } else {
      playAudio(textToSpeak, selectedVoice, setPlayingSection, index, setAudioStatus);
    }
  };

  const handlePopupAudio = (word) => {
    const textToSpeak = getHardWordAudio(word);
    playAudio(textToSpeak, selectedVoice);
  };

  const renderTextWithHardWords = (text, isKhmer = false) => {
    const words = isKhmer ? hardWordsKhmer : hardWords;
    let combinedText = text;
    let parts = [];

    // Replace hard words with a special placeholder
    Object.keys(words).forEach(word => {
      const regex = new RegExp(`\\b(${word})\\b`, 'gi');
      combinedText = combinedText.replace(regex, (match) => `@@@${match}@@@`);
    });

    // Split the text by the placeholder
    parts = combinedText.split('@@@').filter(part => part);

    return parts.map((part, index) => {
      const isHardWord = Object.keys(words).some(word => part.toLowerCase() === word.toLowerCase());
      if (isHardWord) {
        const word = part;
        const translation = isKhmer ? words[word.toLowerCase()] : words[word.toLowerCase()];
        return (
          <span
            key={index}
            className="hard-word-underline cursor-pointer relative"
            onMouseUp={(e) => {
              if (e.button === 0) { // Only handle left clicks
                const rect = e.target.getBoundingClientRect();
                setPopupContent({
                  word: word,
                  translation: translation,
                  x: rect.left,
                  y: rect.bottom + window.scrollY + 10,
                });
                setShowPopup(true);
              }
            }}
          >
            {word}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
          <div className="w-full max-w-6xl mb-8 overflow-hidden rounded-xl shadow-lg">
        <img
          src="https://i.ytimg.com/vi/NXIOwd1oMt0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4vkTw4JsIdEeZchLb1bl0Hxvutw"
          alt="Transform Your Life"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-4xl font-english-heading font-bold text-gray-900 mb-6 text-center">Rules for Building Wealth & Smart Decisions</h1>
        <p className="text-xl font-english-body text-gray-700 mb-8 text-center">15 Life-changing Rules from the book "Hell Yeah or No" by Derek Sivers.</p>
        
        {/* Language Selection and Audio Controls */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <div className="w-full max-w-xs">
            <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 font-english-labels">Select Voice:</label>
            <select
              id="voice-select"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md font-english-body"
              value={selectedVoice ? selectedVoice.name : ''}
              onChange={(e) => {
                const voice = voices.find(v => v.name === e.target.value);
                setSelectedVoice(voice);
              }}
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>{voice.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* English Content */}
        <div className="mb-12">
          <h2 className="text-3xl font-english-subheading font-bold text-gray-800 mb-6 flex items-center justify-center space-x-4 md:justify-start">
            <span>English</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle, index) => (
              <div key={`principle-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
                <h3 className="text-xl font-english-subheading font-semibold text-gray-900 flex items-center justify-between">
                  {principle.title}
                  <button
                    onClick={() => handleAudioToggle(index)}
                    className={`p-2 rounded-full transition-colors duration-200 ${playingSection === index ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    {playingSection === index ? <HiOutlineStop className="w-5 h-5" /> : <LuAudioLines className="w-5 h-5" />}
                  </button>
                </h3>
                <p className="font-english-body leading-relaxed text-gray-700 whitespace-pre-line">
                  {renderTextWithHardWords(principle.body)}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Khmer Content */}
        <div className="mb-12">
          <h2 className="text-3xl font-khmer-subheading font-bold text-gray-800 mb-6 text-center md:text-left">
            ភាសាខ្មែរ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {khmerPrinciples.map((principle, index) => (
              <div key={`principle-km-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
                <h3 className="text-xl font-khmer-subheading font-semibold text-gray-900">{principle.title}</h3>
                <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">
                  {renderTextWithHardWords(principle.body, true)}
                </p>
              </div>
            ))}
          </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..700&family=Merriweather:ital,wght@0,300..900;1,300..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Moulpali&family=Hanuman:wght@100;300;400;700;900&family=Battambang:wght@100;300;400;700;900&display=swap');
        
        .font-english-heading {
          font-family: 'Playfair Display', serif;
        }
        .font-english-subheading {
          font-family: 'Merriweather', serif;
        }
        .font-english-body {
          font-family: 'Lato', sans-serif;
        }
        .font-english-labels {
          font-family: 'Montserrat', sans-serif;
        }

        .font-khmer-heading {
          font-family: 'Moul', serif;
        }
        .font-khmer-subheading {
          font-family: 'Moulpali', serif;
        }
        .font-khmer-body {
          font-family: 'Hanuman', serif;
        }
        .font-khmer-labels {
          font-family: 'Battambang', serif;
        }

        .hard-word-underline {
          border-bottom: 2px dashed #3b82f6;
          text-decoration: none;
        }

        .hard-word-popup {
          position: absolute;
          background-color: white;
          border: 1px solid #e5e7eb;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default Item10;
