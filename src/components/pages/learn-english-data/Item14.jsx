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
  'persistence': 'ការតស៊ូ',
  'mastermind': 'ក្រុមបញ្ញាវ័ន្ត',
  'definite': 'ច្បាស់លាស់',
  'faith': 'ជំនឿ',
  'subconscious': 'ចិត្តក្រោមស្មារតី',
  'affirmation': 'ការអះអាង',
  'unwavering': 'មិនរាថយ',
  'accumulation': 'ការប្រមូលផ្តុំ',
  'blueprint': 'គម្រោងការ',
  'conceptualized': 'ត្រូវបានបង្កើតឡើង'
};

const englishContent = {
  heading: 'The 13 Principles of Think and Grow Rich',
  sections: [
    {
      heading: "A Timeless Philosophy for Success",
      body: `Napoleon Hill’s "Think and Grow Rich" is a timeless masterpiece that has guided millions to success. It's not just a book about wealth, but a philosophy for personal achievement based on interviews with over 500 of the world's most successful people. The core message is that our thoughts, fueled by a definite purpose, have the power to transform our reality. By applying its 13 principles, you can create a mental blueprint for success, turning your abstract desires into tangible results. This is a journey of self-discovery and discipline, where you become the master of your own destiny.
`
    }
  ],
  principles: [
    {
      title: "Desire: The Starting Point of All Achievement",
      body: `A mere wish is not enough. Success begins with a burning, passionate, and definite desire for something specific. It is this intense desire that serves as the starting point and a powerful catalyst, driving you to overcome all obstacles. This principle emphasizes having a clear, definite goal—a true passion that is unwavering.
`
    },
    {
      title: "Faith: Visualizing and Believing in the Attainment of Desire",
      body: `Faith is the subconscious mind's ability to act upon the thoughts and instructions we feed it. It is the state of mind where you can visualize and believe in the attainment of your definite purpose. You develop faith through self-affirmation and the repetition of thoughts. Faith is a state of mind that must be deliberately cultivated.
`
    },
    {
      title: "Persistence: The Sustained Effort Necessary to Induce Faith",
      body: `Persistence is the sustained effort that is necessary to induce faith. It is the unwavering determination to carry on, even in the face of temporary defeat. Persistence is a key element in converting desire into its monetary equivalent. It requires a definite purpose, a strong desire, and a clear plan of action. The accumulation of small, consistent efforts leads to great results.`
    },
    {
      title: "The Power of the Master Mind",
      body: `The "Master Mind" is the coordination of knowledge and effort between two or more people who work toward a definite purpose in a spirit of harmony. Hill suggests that a group of people working together in a mastermind alliance generates an energy greater than the sum of their individual efforts. This collaborative effort is essential for achieving great success.`
    }
  ]
};

const khmerContent = {
  heading: 'គោលការណ៍ទាំង១៣នៃសៀវភៅ "គិតហើយក្លាយជាអ្នកមាន"',
  sections: [
    {
      heading: "ទស្សនវិជ្ជាមិនចេះចប់សម្រាប់ភាពជោគជ័យ",
      body: `សៀវភៅ "គិតហើយក្លាយជាអ្នកមាន" របស់ណាប៉ូឡេអុង ហ៊ីល គឺជាស្នាដៃដ៏អស្ចារ្យដែលបានណែនាំមនុស្សរាប់លាននាក់ឱ្យជោគជ័យ។ វាមិនមែនគ្រាន់តែជាសៀវភៅអំពីទ្រព្យសម្បត្តិនោះទេ ប៉ុន្តែជាទស្សនវិជ្ជាមួយសម្រាប់សមិទ្ធផលផ្ទាល់ខ្លួនដោយផ្អែកលើការសម្ភាសន៍មនុស្សជោគជ័យបំផុតជាង 500 នាក់នៅលើពិភពលោក។ សារសំខាន់គឺថាគំនិតរបស់យើងដែលជំរុញដោយគោលបំណងច្បាស់លាស់មានអំណាចក្នុងការផ្លាស់ប្តូរការពិតរបស់យើង។ តាមរយៈការអនុវត្តគោលការណ៍ទាំង 13 របស់វា អ្នកអាចបង្កើតគម្រោងការផ្លូវចិត្តសម្រាប់ភាពជោគជ័យ ដោយបង្វែរចំណង់ចំណូលចិត្តអរូបីរបស់អ្នកទៅជាលទ្ធផលជាក់ស្តែង។ នេះគឺជាដំណើរនៃការស្វែងរកខ្លួនឯង និងវិន័យ ដែលអ្នកក្លាយជាម្ចាស់វាសនារបស់អ្នក។`
    }
  ],
  principles: [
    {
      title: "បំណងប្រាថ្នា៖ ចំណុចចាប់ផ្តើមនៃសមិទ្ធផលទាំងអស់",
      body: `ការគ្រាន់តែប្រាថ្នាមិនគ្រប់គ្រាន់ទេ។ ភាពជោគជ័យចាប់ផ្តើមដោយបំណងប្រាថ្នាដ៏ខ្លាំងក្លា ងប់ងល់ និងច្បាស់លាស់សម្រាប់អ្វីមួយដែលជាក់លាក់។ បំណងប្រាថ្នាដ៏ខ្លាំងក្លានេះហើយដែលបម្រើជាចំណុចចាប់ផ្តើម និងជាកត្តាជំរុញដ៏មានឥទ្ធិពល ដែលជំរុញអ្នកឱ្យយកឈ្នះរាល់ឧបសគ្គទាំងអស់។ គោលការណ៍នេះសង្កត់ធ្ងន់លើការមានគោលដៅច្បាស់លាស់—ជាចំណង់ចំណូលចិត្តពិតប្រាកដដែលមិនរាថយ។`
    },
    {
      title: "ជំនឿ៖ ការស្រមៃនិងជឿជាក់លើការសម្រេចបាននូវបំណងប្រាថ្នា",
      body: `ជំនឿគឺជាសមត្ថភាពរបស់ចិត្តក្រោមស្មារតីក្នុងការធ្វើសកម្មភាពលើគំនិត និងការណែនាំដែលយើងផ្តល់ឱ្យវា។ វាគឺជាស្ថានភាពនៃចិត្តដែលអ្នកអាចស្រមៃនិងជឿជាក់លើការសម្រេចបាននូវគោលបំណងច្បាស់លាស់របស់អ្នក។ អ្នកអភិវឌ្ឍជំនឿតាមរយៈការអះអាងខ្លួនឯង និងការធ្វើម្តងទៀតនូវគំនិត។ ជំនឿគឺជាស្ថានភាពនៃចិត្តដែលត្រូវតែដាំដុះដោយចេតនា។`
    },
    {
      title: "ការតស៊ូ៖ ការខិតខំប្រឹងប្រែងដែលចាំបាច់ដើម្បីបង្កើតជំនឿ",
      body: `ការតស៊ូគឺជាការខិតខំប្រឹងប្រែងដែលចាំបាច់ដើម្បីបង្កើតជំនឿ។ វាគឺជាការតាំងចិត្តមិនរាថយដើម្បីបន្តទៅមុខ ទោះបីជាប្រឈមមុខនឹងការបរាជ័យបណ្ដោះអាសន្នក៏ដោយ។ ការតស៊ូគឺជាធាតុសំខាន់ក្នុងការបំប្លែងបំណងប្រាថ្នាទៅជាសមមូលរូបិយវត្ថុរបស់វា។ វាទាមទារគោលបំណងច្បាស់លាស់ បំណងប្រាថ្នាដ៏ខ្លាំងក្លា និងផែនការសកម្មភាពច្បាស់លាស់។ ការប្រមូលផ្តុំនៃការខិតខំប្រឹងប្រែងតូចៗ និងទៀងទាត់នាំឱ្យមានលទ្ធផលដ៏អស្ចារ្យ។`
    },
    {
      title: "អំណាចនៃក្រុមបញ្ញាវ័ន្ត",
      body: `“ក្រុមបញ្ញាវ័ន្ត” គឺជាការសម្របសម្រួលនៃចំណេះដឹង និងការខិតខំប្រឹងប្រែងរវាងមនុស្សពីរនាក់ ឬច្រើននាក់ដែលធ្វើការឆ្ពោះទៅរកគោលបំណងច្បាស់លាស់ក្នុងស្មារតីនៃការឯកភាពគ្នា។ ហ៊ីលបានណែនាំថាក្រុមមនុស្សដែលធ្វើការជាមួយគ្នាក្នុងសម្ព័ន្ធភាពក្រុមបញ្ញាវ័ន្តបង្កើតថាមពលធំជាងផលបូកនៃកិច្ចខិតខំប្រឹងប្រែងរបស់បុគ្គលម្នាក់ៗ។ កិច្ចខិតខំប្រឹងប្រែងសហការនេះមានសារៈសំខាន់សម្រាប់ការសម្រេចបាននូវភាពជោគជ័យដ៏អស្ចារ្យ។`
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
          font-size: calc(1 * 24px); /* 31.2px */
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
          font-size: calc(1 * 24px); /* 28.8px */
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
          src="https://cdn.prod.website-files.com/63c5e29f1b5bc83fe0af2489/6741d075e31cec6adac489e2_66f846323dbe7fb190a64f0f_6689600393ba92c0c59032cc_think-and-grow-rich-1.webp"
          alt="Think and Grow Rich"
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
