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
  'procrastinate': 'ពន្យារពេល',
  'compound': 'បូកបញ្ចូលគ្នា',
  'culminating': 'ឈានដល់',
  'embrace': 'ទទួលយក',
  'resilience': 'ភាពធន់',
  'persistence': 'ការតស៊ូ',
  'mindset': 'ផ្នត់គំនិត',
  'discipline': 'វិន័យ',
  'consistency': 'ភាពទៀងទាត់',
  'accountability': 'ការទទួលខុសត្រូវ',
  'catalyst': 'កត្តាជំរុញ',
  'architect': 'ស្ថាបត្យករ',
  'transform': 'ផ្លាស់ប្ដូរ',
  'accountable': 'ទទួលខុសត្រូវ',
  'significantly': 'គួរឱ្យកត់សម្គាល់',
  'theories': 'ទ្រឹស្តី',
  'mediocrity': 'ភាពល្មម',
  'circumstances': 'កាលៈទេសៈ',
  'victor': 'អ្នកឈ្នះ',
  'victim': 'ជនរងគ្រោះ',
  'relevant': 'ទាក់ទង',
  'measurable': 'អាចវាស់វែងបាន',
  'deadline': 'កាលកំណត់',
  'urgency': 'ភាពបន្ទាន់',
  'sense': 'អារម្មណ៍',
  'lens': 'កញ្ចក់',
  'belief': 'ជំនឿ',
  'dedication': 'ការលះបង់',
  'embracing': 'ការទទួលយក'
};

const englishContent = {
  heading: 'Transform Your Life Today',
  sections: [
    {
      heading: "Five Principles for Achieving Greatness",
      body: `Are you ready to transform your life today? The truth is, you have everything you need to achieve greatness, but it doesn't happen by accident. Greatness is a choice that starts with you. You can continue down the same path you've always been on, or you can decide right here, right now, to change your future. In the next few minutes, I'm going to reveal five powerful secrets that, if you apply them today, will start the process of transforming your life. These aren't just theories or motivational words; they are practical, actionable principles used by successful people. If you're tired of settling for mediocrity, this is your time. The road ahead isn't easy, but it's worth it. Remember, you are the architect of your future. Don't let anyone or anything stop you.

`
    }
  ],
  principles: [
    {
      title: "Take Responsibility",
      body: "The foundation of all success is taking full responsibility for your life. This means you stop the blame game and own your circumstances. You understand that you have control over how you react to challenges and that success doesn't come from making excuses; it comes from deciding to take ownership of your actions and life. When you take responsibility, you stop being a victim and become a victor."
    },
    {
      title: "Master Goal Setting",
      body: "Goals are the fuel for success and provide a roadmap for your future. To set effective goals, they must be clear, specific, and measurable so you can track your progress. Goals should also be achievable, relevant to your values, and have a clear deadline to create a sense of urgency and force you to act."
    },
    {
      title: "Cultivate a Growth Mindset",
      body: "Your mindset is the lens through which you view the world and the engine that drives your actions. A growth mindset is the belief that you can improve through dedication, hard work, and learning from mistakes. This involves embracing learning, seeing failure as a part of the process, and staying persistent, even when things get tough."
    },
    {
      title: "Embrace Discipline and Consistency",
      body: "Discipline is the bridge between where you are and where you want to be. It's about consistently making the right choices, even when it's difficult. Success is not a single, big action but the accumulation of small, consistent choices made day after day. Consistency means showing up and doing the work, knowing that these daily actions add up to big results over time."
    },
    {
      title: "Surround Yourself with Success",
      body: "The people you spend time with significantly influence your mindset, habits, and beliefs. You are the average of the five people you spend the most time with. To achieve greatness, you must be intentional about who you let influence you and surround yourself with people who challenge you, inspire you, and hold you accountable."
    }
  ]
};

const khmerContent = {
  heading: 'ផ្លាស់ប្តូរជីវិតរបស់អ្នកនៅថ្ងៃនេះ',
  sections: [
    {
      heading: "គោលការណ៍ប្រាំយ៉ាងដើម្បីសម្រេចបាននូវភាពអស្ចារ្យ",
      body: `តើអ្នកត្រៀមខ្លួនរួចរាល់ហើយឬនៅដើម្បីផ្លាស់ប្តូរជីវិតរបស់អ្នកនៅថ្ងៃនេះ? ការពិតគឺថា អ្នកមានអ្វីៗគ្រប់យ៉ាងដែលអ្នកត្រូវការដើម្បីសម្រេចបាននូវភាពអស្ចារ្យ ប៉ុន្តែវាមិនមែនកើតឡើងដោយចៃដន្យនោះទេ។ ភាពអស្ចារ្យគឺជាជម្រើសមួយដែលចាប់ផ្តើមពីអ្នក។ អ្នកអាចបន្តដើរលើផ្លូវដដែលដែលអ្នកធ្លាប់ដើរ ឬអ្នកអាចសម្រេចចិត្តនៅទីនេះ ឥឡូវនេះ ដើម្បីផ្លាស់ប្តូរអនាគតរបស់អ្នក។ ក្នុងរយៈពេលប៉ុន្មាននាទីខាងមុខនេះ ខ្ញុំនឹងបង្ហាញអ្នកនូវអាថ៌កំបាំងដ៏មានឥទ្ធិពលចំនួនប្រាំ ដែលប្រសិនបើអ្នកអនុវត្តវាថ្ងៃនេះ វានឹងចាប់ផ្តើមដំណើរការនៃការផ្លាស់ប្តូរជីវិតរបស់អ្នកភ្លាមៗ។ ទាំងនេះមិនមែនគ្រាន់តែជាទ្រឹស្តី ឬពាក្យលើកទឹកចិត្តនោះទេ វាគឺជាគោលការណ៍ជាក់ស្តែងដែលអាចអនុវត្តបានដែលមនុស្សជោគជ័យប្រើប្រាស់ដើម្បីសម្រេចបាននូវភាពអស្ចារ្យ។ ប្រសិនបើអ្នកធុញទ្រាន់នឹងការពេញចិត្តនឹងភាពល្មមៗ នេះជាពេលវេលារបស់អ្នកហើយ។ ផ្លូវទៅមុខមិនងាយស្រួលទេ ប៉ុន្តែវាមានតម្លៃ។ ចងចាំថា អ្នកគឺជាស្ថាបត្យករនៃអនាគតរបស់អ្នក។ កុំឱ្យនរណាម្នាក់ ឬអ្វីមួយមកបញ្ឈប់អ្នកបាន។`
    }
  ],
  principles: [
    {
      title: "ទទួលខុសត្រូវ",
      body: "មូលដ្ឋានគ្រឹះនៃភាពជោគជ័យទាំងអស់គឺការទទួលខុសត្រូវពេញលេញចំពោះជីវិតរបស់អ្នក។ នេះមានន័យថាអ្នកឈប់បន្ទោសអ្នកដទៃហើយទទួលយកកាលៈទេសៈរបស់អ្នក។ អ្នកយល់ថាអ្នកមានការគ្រប់គ្រងលើរបៀបដែលអ្នកប្រតិកម្មទៅនឹងបញ្ហាប្រឈម ហើយថាភាពជោគជ័យមិនមែនកើតចេញពីការបង្កើតលេសនោះទេ វាគឺមកពីការសម្រេចចិត្តទទួលខុសត្រូវលើសកម្មភាព និងជីវិតរបស់អ្នក។ នៅពេលដែលអ្នកទទួលខុសត្រូវ អ្នកនឹងឈប់ធ្វើជាជនរងគ្រោះ ហើយក្លាយជាអ្នកឈ្នះ។"
    },
    {
      title: "កំណត់គោលដៅឱ្យបានត្រឹមត្រូវ",
      body: "គោលដៅគឺជាកម្លាំងជំរុញសម្រាប់ភាពជោគជ័យ និងផ្តល់ផែនទីផ្លូវសម្រាប់អនាគតរបស់អ្នក។ ដើម្បីកំណត់គោលដៅប្រកបដោយប្រសិទ្ធភាព ពួកគេត្រូវតែច្បាស់លាស់ ជាក់លាក់ និងអាចវាស់វែងបាន ដូច្នេះអ្នកអាចតាមដានវឌ្ឍនភាពរបស់អ្នក។ គោលដៅក៏គួរតែអាចសម្រេចបានដែរ ទាក់ទងទៅនឹងតម្លៃរបស់អ្នក និងមានកាលកំណត់ច្បាស់លាស់ដើម្បីបង្កើតអារម្មណ៍បន្ទាន់ និងបង្ខំអ្នកឱ្យធ្វើសកម្មភាព។"
    },
    {
      title: "បណ្ដុះផ្នត់គំនិតរីកចម្រើន",
      body: "ផ្នត់គំនិតរបស់អ្នកគឺជាកញ្ចក់ដែលអ្នកមើលឃើញពិភពលោក និងជាម៉ាស៊ីនដែលជំរុញសកម្មភាពរបស់អ្នក។ ផ្នត់គំនិតរីកចម្រើនគឺជាជំនឿដែលអ្នកអាចរីកចម្រើនតាមរយៈការលះបង់ ការខិតខំ និងការរៀនសូត្រពីកំហុស។ នេះពាក់ព័ន្ធនឹងការទទួលយកការរៀនសូត្រ ការមើលឃើញការបរាជ័យជាផ្នែកមួយនៃដំណើរការ និងការតស៊ូ បើទោះបីជាអ្វីៗពិបាកក៏ដោយ។"
    },
    {
      title: "អនុវត្តវិន័យនិងភាពទៀងទាត់",
      body: "វិន័យគឺជាស្ពានរវាងកន្លែងដែលអ្នកនៅ និងកន្លែងដែលអ្នកចង់ទៅ។ វាគឺអំពីការធ្វើជម្រើសត្រឹមត្រូវជាប់លាប់ ទោះបីជាវាពិបាកក៏ដោយ។ ភាពជោគជ័យមិនមែនជាសកម្មភាពធំតែមួយនោះទេ ប៉ុន្តែជាការប្រមូលផ្តុំនៃជម្រើសតូចៗ ទៀងទាត់ដែលបានធ្វើឡើងជារៀងរាល់ថ្ងៃ។ ភាពទៀងទាត់មានន័យថាបង្ហាញខ្លួននិងធ្វើការងារ ដោយដឹងថាសកម្មភាពប្រចាំថ្ងៃទាំងនេះនឹងនាំមកនូវលទ្ធផលដ៏ធំនៅពេលក្រោយ។"
    },
    {
      title: "ព័ទ្ធជុំវិញខ្លួនអ្នកជាមួយភាពជោគជ័យ",
      body: "មនុស្សដែលអ្នកចំណាយពេលជាមួយមានឥទ្ធិពលយ៉ាងខ្លាំងទៅលើផ្នត់គំនិត ទម្លាប់ និងជំនឿរបស់អ្នក។ អ្នកគឺជាមធ្យមភាគនៃមនុស្សប្រាំនាក់ដែលអ្នកចំណាយពេលជាមួយច្រើនជាងគេ។ ដើម្បីសម្រេចបាននូវភាពអស្ចារ្យ អ្នកត្រូវតែមានចេតនាអំពីអ្នកដែលអ្នកអនុញ្ញាតឱ្យមានឥទ្ធិពលលើអ្នក និងព័ទ្ធជុំវិញខ្លួនអ្នកជាមួយមនុស្សដែលជំរុញអ្នក លើកទឹកចិត្តអ្នក និងទទួលខុសត្រូវជាមួយអ្នក។"
    }
  ]
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
      const normalizedWord = word.toLowerCase();
      if (hardWords[normalizedWord]) {
        return getHardWordSpan(word, hardWords[normalizedWord], index);
      }
      return <React.Fragment key={index}>{word}</React.Fragment>;
    });
  };

  const handlePlay = (text, index) => {
    if (selectedVoice) {
      playAudio(text, selectedVoice, setPlayingSection, index, setAudioStatus);
    }
  };

  const handleStop = () => {
    stopAudio();
    setPlayingSection(null);
    setAudioStatus('stopped');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4 sm:p-8 flex flex-col items-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@100..900&family=Varela+Round&family=Cabin:ital,wght@0,400..700;1,400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Khmer:wght@100..900&family=Battambang:wght@100;300;400;700;900&family=Suwannaphum:wght@100;300;400;700;900&family=Nokora&display=swap');
        
        /* Scaled English Fonts - Option 10 */
        .font-english-header-scaled {
          font-family: 'Saira Condensed', sans-serif;
          font-size: calc(1.3 * 30px); /* 39px */
          line-height: 1;
        }
        .font-english-subheading-scaled {
          font-family: 'Varela Round', sans-serif;
          font-size: calc(1.3 * 24px); /* 31.2px */
        }
        .font-english-body-scaled {
          font-family: 'Cabin', sans-serif;
          font-size: calc(1.3 * 16px); /* 20.8px */
          line-height: 1.4;
        }
        .font-english-label-scaled {
          font-family: 'Poppins', sans-serif;
          font-size: calc(1.3 * 16px); /* 20.8px */
        }
        
        /* Khmer Fonts - Option 10, increased size */
        .font-khmer-header { 
          font-family: 'Noto Serif Khmer', serif;
          font-size: calc(1.2 * 30px); /* 36px */
          line-height: 1.5;
        }
        .font-khmer-subheading { 
          font-family: 'Battambang', cursive; 
          font-size: calc(1.2 * 24px); /* 28.8px */
        }
        .font-khmer-body { 
          font-family: 'Suwannaphum', serif; 
          font-size: calc(1.2 * 16px); /* 19.2px */
          line-height: 1.6;
        }
        .font-khmer-label { 
          font-family: 'Nokora', serif; 
          font-size: calc(1.2 * 16px); /* 19.2px */
        }

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
          font-family: 'Nokora', serif;
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
          src="https://brandstrategy.com/wp-content/uploads/2012/11/transformation_brand_science.jpg"
          alt="Transform Your Life"
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="w-full max-w-6xl text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-english-header-scaled font-bold mb-4">{englishContent.heading}</h1>
        <div className="flex items-center justify-center mb-4 space-x-2">
          <label htmlFor="voice-select" className="font-english-label-scaled text-sm text-gray-600">Select Voice:</label>
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
                <h2 className="text-2xl font-english-subheading-scaled font-semibold text-gray-900">{section.heading}</h2>
                <div className="flex items-center space-x-2">
                  {playingSection === index && audioStatus === 'playing' ? (
                    <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                    </button>
                  ) : (
                    <button onClick={() => handlePlay(section.body, index)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                      {audioStatus === 'loading' && playingSection === index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.01 6.74 2.8L21 8"/><path d="M21 3v5h-5"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <p className="font-english-body-scaled leading-relaxed text-gray-700 whitespace-pre-line">{processTextWithHardWords(section.body)}</p>
            </div>
          ))}
          
          {englishContent.principles.map((principle, index) => (
            <div key={`principle-en-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-english-subheading-scaled font-semibold text-gray-900">{principle.title}</h3>
                <div className="flex items-center space-x-2">
                  {playingSection === `principle-en-${index}` && audioStatus === 'playing' ? (
                    <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                    </button>
                  ) : (
                    <button onClick={() => handlePlay(`${principle.title}. ${principle.body}`, `principle-en-${index}`)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                      {audioStatus === 'loading' && playingSection === `principle-en-${index}` ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.01 6.74 2.8L21 8"/><path d="M21 3v5h-5"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <p className="font-english-body-scaled leading-relaxed text-gray-700 whitespace-pre-line">{processTextWithHardWords(principle.body)}</p>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
