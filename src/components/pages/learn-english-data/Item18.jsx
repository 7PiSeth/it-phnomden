import React, { useState, useEffect, useRef } from 'react';

// SpeechSynthesis API functionality
let isSpeaking = false;
let currentUtterance = null;

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
  if (isSpeaking && currentUtterance) {
    stopAudio();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  currentUtterance = utterance;
  
  utterance.onstart = () => {
    isSpeaking = true;
    if (setAudioStatus) setAudioStatus('playing');
    if (setPlayingSection) setPlayingSection(sectionIndex);
  };
  
  utterance.onend = () => {
    isSpeaking = false;
    currentUtterance = null;
    if (setAudioStatus) setAudioStatus('stopped');
    if (setPlayingSection) setPlayingSection(null);
  };
  
  utterance.onerror = (event) => {
    console.error('SpeechSynthesisUtterance.onerror', event);
    isSpeaking = false;
    currentUtterance = null;
    if (setAudioStatus) setAudioStatus('stopped');
    if (setPlayingSection) setPlayingSection(null);
  };

  window.speechSynthesis.speak(utterance);
};

const stopAudio = () => {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    isSpeaking = false;
    currentUtterance = null;
  }
};

// --- Hard Word & Popup Logic ---
const hardWordsData = [
  { word: 'common', translation: 'ធម្មតា' },
  { word: 'advances', translation: 'ការជឿនលឿន' },
  { word: 'negative', translation: 'អវិជ្ជមាន' },
  { word: 'positive', translation: 'វិជ្ជមាន' },
  { word: 'impacts', translation: 'ផលប៉ះពាល់' },
  { word: 'freedom', translation: 'សេរីភាព' },
  { word: 'organise', translation: 'រៀបចំ' },
  { word: 'laundry', translation: 'បោកគក់' },
  { word: 'disadvantages', translation: 'គុណវិបត្តិ' },
  { word: 'colleagues', translation: 'មិត្តរួមការងារ' },
  { word: 'loneliness', translation: 'ឯកា' },
  { word: 'drawback', translation: 'គុណវិបត្តិ' },
  { word: 'influence', translation: 'ឥទ្ធិពល' },
  { word: 'overlooked', translation: 'មើលរំលង' },
  { word: 'promotion', translation: 'ការឡើងតំណែង' }
];

const findHardWord = (word) => hardWordsData.find(item => item.word.toLowerCase() === word.toLowerCase());

const replaceHardWords = (text, onClick) => {
  return text.split(' ').map((word, index) => {
    const cleanedWord = word.replace(/[.,?!]/g, '');
    const hardWord = findHardWord(cleanedWord);
    
    if (hardWord) {
      return (
        <span key={index}>
          <button
            onClick={(e) => onClick(e, hardWord.word, hardWord.translation)}
            className="hard-word-underline"
          >
            {word}
          </button>
          {' '}
        </span>
      );
    }
    return <span key={index}>{word} </span>;
  });
};

const englishContent = {
  title: 'Working from Home',
  introduction: "In the present age it is common for people to work from home because of advances in technology. On balance, I would argue that this has more negative impacts than positive.",
  principles: [
    {
      title: 'Advantages',
      body: "One advantage of working from home is the freedom it provides. Home workers can organise their work around their home life as they can stop or start work as they please, and thus if, for example, they have children, they can easily arrange to take them and pick them up from school. They can also undertake any other tasks that they need to do during the day, such as doing the laundry or shopping, and then finish work later. Overall then, employees have more control over their lives."
    },
    {
      title: 'Disadvantages (I)',
      body: "Despite these positive factors, however, there are a number of  disadvantages. The first of these is the fact that those who work at home nearly all the time will not be mixing with colleagues. When people are at work, they are always surrounded by others, but at home, an employee is likely to be alone most the time. This may lead to feelings of loneliness due to a lack of interaction."
    },
    {
      title: 'Disadvantages (II)',
      body: "Another drawback is the fact that one may have less influence in the company. It is often the case that important decisions arise on the spur of the moment as unexpected issues arise. If an employee is not there, others may have to step in. If this occurs on a regular basis, the employees contribution to the company may decline, meaning a higher probability of getting overlooked for things such as promotion."
    },
    {
      title: 'Conclusion',
      body: "In conclusion, although there are positives and negatives related to working from home, there are more negative impacts. Employees should therefore consider carefully whether working from home is the best choice."
    }
  ],
};

const khmerContent = {
  title: 'ការងារពីផ្ទះ',
  introduction: "នៅក្នុងយុគសម័យបច្ចុប្បន្ននេះ ការងារពីផ្ទះបានក្លាយជារឿងធម្មតា ដោយសារតែការជឿនលឿននៃបច្ចេកវិទ្យា។ ខ្ញុំយល់ថា ការងារនេះមានផលប៉ះពាល់អវិជ្ជមានច្រើនជាងវិជ្ជមាន។",
  principles: [
    {
      title: 'គុណសម្បត្តិ',
      body: "គុណសម្បត្តិមួយនៃការធ្វើការពីផ្ទះគឺសេរីភាពដែលវាផ្តល់ឱ្យ។ អ្នកធ្វើការនៅផ្ទះអាចរៀបចំការងាររបស់ពួកគេទៅតាមជីវិតផ្ទះ ព្រោះពួកគេអាចឈប់ ឬចាប់ផ្តើមការងារតាមដែលពួកគេចង់បាន ដូច្នេះប្រសិនបើឧទាហរណ៍ ពួកគេមានកូន ពួកគេអាចរៀបចំផែនការដើម្បីជូន និងទៅយកកូនពីសាលាបានយ៉ាងងាយស្រួល។ ពួកគេក៏អាចធ្វើកិច្ចការផ្សេងទៀតដែលពួកគេត្រូវធ្វើក្នុងពេលថ្ងៃ ដូចជាបោកគក់ ឬទិញទំនិញ ហើយបន្ទាប់មកបញ្ចប់ការងារនៅពេលក្រោយ។ សរុបមក បុគ្គលិកមានការគ្រប់គ្រងជីវិតរបស់ពួកគេកាន់តែច្រើន។"
    },
    {
      title: 'គុណវិបត្តិ (I)',
      body: "ទោះបីជាមានកត្តាវិជ្ជមានទាំងនេះក៏ដោយ ក៏នៅតែមានគុណវិបត្តិមួយចំនួន។ គុណវិបត្តិទីមួយគឺការពិតដែលថាអ្នកដែលធ្វើការនៅផ្ទះស្ទើរតែគ្រប់ពេលនឹងមិនបានជួបជុំជាមួយមិត្តរួមការងាររបស់ពួកគេឡើយ។ នៅពេលមនុស្សនៅកន្លែងធ្វើការ ពួកគេតែងតែនៅជុំវិញអ្នកដទៃ ប៉ុន្តែនៅផ្ទះ បុគ្គលិកទំនងជានៅម្នាក់ឯងភាគច្រើន។ នេះអាចនាំឱ្យមានអារម្មណ៍ឯកា ដោយសារតែកង្វះការទាក់ទងគ្នា។"
    },
    {
      title: 'គុណវិបត្តិ (II)',
      body: "គុណវិបត្តិមួយទៀតគឺការពិតដែលថាមនុស្សម្នាក់អាចមានឥទ្ធិពលតិចតួចនៅក្នុងក្រុមហ៊ុន។ ជារឿយៗការសម្រេចចិត្តសំខាន់ៗកើតឡើងដោយមិនបានរំពឹងទុកនៅពេលដែលមានបញ្ហាកើតឡើង។ ប្រសិនបើបុគ្គលិកមិននៅទីនោះ អ្នកផ្សេងទៀតអាចនឹងត្រូវចូលខ្លួន។ ប្រសិនបើបញ្ហានេះកើតឡើងជាប្រចាំ ការចូលរួមចំណែករបស់បុគ្គលិកចំពោះក្រុមហ៊ុនអាចនឹងថយចុះ ដែលមានន័យថាមានលទ្ធភាពខ្ពស់ក្នុងការត្រូវបានមើលរំលងសម្រាប់រឿងដូចជាការឡើងតំណែងជាដើម។"
    },
    {
      title: 'សេចក្តីសន្និដ្ឋាន',
      body: "ជាសេចក្តីសន្និដ្ឋាន ទោះបីជាមានភាពវិជ្ជមាន និងអវិជ្ជមានដែលទាក់ទងនឹងការងារពីផ្ទះក៏ដោយ ក៏នៅតែមានផលប៉ះពាល់អវិជ្ជមានច្រើនជាង។ ដូច្នេះ បុគ្គលិកគួរតែពិចារណាដោយប្រុងប្រយ័ត្នថាតើការងារពីផ្ទះជាជម្រើសល្អបំផុតដែរឬទេ។"
    }
  ],
};

const App = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingSection, setPlayingSection] = useState(null);
  const [audioStatus, setAudioStatus] = useState('stopped');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: '', translation: '', x: 0, y: 0 });
  const popupRef = useRef(null);

  useEffect(() => {
    // Set up voice recognition when the component mounts
    if (window.speechSynthesis) {
      const handleVoicesChanged = () => {
        const availableVoices = getVoices();
        setVoices(availableVoices);
        setSelectedVoice(getDefaultVoice(availableVoices));
      };
      
      handleVoicesChanged(); // Initial call
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef]);

  const handleVoiceToggle = (text, index) => {
    if (!selectedVoice) {
      alert("No voice is available. Please select one from the dropdown.");
      return;
    }

    if (playingSection === index) {
      stopAudio();
      setPlayingSection(null);
      setAudioStatus('stopped');
    } else {
      stopAudio();
      playAudio(text, selectedVoice, setPlayingSection, index, setAudioStatus);
    }
  };

  const handlePopupClick = (e, word, translation) => {
    e.stopPropagation();
    
    // Position the popup near the clicked word
    const rect = e.target.getBoundingClientRect();
    setPopupContent({
      word: word,
      translation: translation,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 10,
    });
    setShowPopup(true);
  };

  const handlePopupAudio = (word) => {
    if (!selectedVoice) {
      alert("No voice is available. Please select one from the dropdown.");
      return;
    }
    stopAudio();
    playAudio(word, selectedVoice);
  };

  const getButtonIcon = (index) => {
    return playingSection === index ? (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square">
        <rect width="18" height="18" x="3" y="3" rx="2" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    );
  };
  
  return (
    <div className="bg-gray-100 min-h-screen py-8 font-khmer-body">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-english-header font-bold text-gray-800 tracking-wide">{englishContent.title}</h1>
          <h1 className="text-4xl md:text-5xl font-khmer-header font-bold text-gray-800 tracking-wide mt-2">{khmerContent.title}</h1>
        </div>
        
        {/* Voice Selection & Global Controls */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8">
          <label htmlFor="voice-select" className="text-gray-700 font-english-labels">Select Voice:</label>
          <select
            id="voice-select"
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
            className="w-full md:w-1/2 p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-english-body"
          >
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Introduction Section */}
        <div className="mb-12 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-english-subheading font-semibold text-gray-900 mb-4">
            Introduction
            <button
              onClick={() => handleVoiceToggle(englishContent.introduction, -1)}
              className={`ml-2 p-1 rounded-full transition-colors duration-200 ${playingSection === -1 ? 'bg-red-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
              aria-label="Play/Stop Introduction"
            >
              {getButtonIcon(-1)}
            </button>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <p className="text-lg font-english-body leading-relaxed text-gray-700 whitespace-pre-line">
              {replaceHardWords(englishContent.introduction, handlePopupClick)}
            </p>
            <p className="text-lg font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line border-l-4 border-gray-200 pl-4 md:border-none md:pl-0">
              {khmerContent.introduction}
            </p>
          </div>
        </div>

        {/* Main Principles Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* English Column */}
          <div className="space-y-8">
            {englishContent.principles.map((principle, index) => (
              <div key={`principle-en-${index}`} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <h3 className="text-xl font-english-subheading font-semibold text-gray-900 flex items-center">
                  {principle.title}
                  <button
                    onClick={() => handleVoiceToggle(principle.body, index)}
                    className={`ml-2 p-1 rounded-full transition-colors duration-200 ${playingSection === index ? 'bg-red-500 text-white' : 'text-blue-500 hover:bg-blue-100'}`}
                    aria-label={`Play/Stop section ${index + 1}`}
                  >
                    {getButtonIcon(index)}
                  </button>
                </h3>
                <p className="font-english-body leading-relaxed text-gray-700 whitespace-pre-line">
                  {replaceHardWords(principle.body, handlePopupClick)}
                </p>
              </div>
            ))}
          </div>

          {/* Khmer Column */}
          <div className="space-y-8">
            {khmerContent.principles.map((principle, index) => (
              <div key={`principle-km-${index}`} className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <h3 className="text-xl font-khmer-subheading font-semibold text-gray-900">{principle.title}</h3>
                <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hard Word Popup */}
      {showPopup && (
        <div 
          ref={popupRef}
          className="hard-word-popup bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-50 fixed transform -translate-x-1/2"
          style={{ top: `${popupContent.y}px`, left: `${popupContent.x}px` }}
        >
          <div className="flex items-center space-x-2">
            <span className="font-khmer-label text-lg text-gray-800">{popupContent.translation}</span>
            <button
              onClick={() => handlePopupAudio(popupContent.word)}
              className="p-1 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
              aria-label={`Play audio for ${popupContent.word}`}
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
      <style>{`
        .font-english-header { font-family: 'Saira Condensed', sans-serif; }
        .font-english-subheading { font-family: 'Varela Round', sans-serif; }
        .font-english-body { font-family: 'Cabin', sans-serif; }
        .font-english-labels { font-family: 'Poppins', sans-serif; }
        .font-khmer-header { font-family: 'Noto Serif Khmer', serif; }
        .font-khmer-subheading { font-family: 'Battambang', cursive; }
        .font-khmer-body { font-family: 'Suwannaphum', serif; }
        .font-khmer-labels { font-family: 'Moulpali', cursive; }
        .hard-word-underline {
          cursor: pointer;
          border-bottom: 2px dashed #3B82F6;
          padding-bottom: 1px;
          line-height: 1.5;
          display: inline;
          color: #1E40AF;
        }
        @media (max-width: 767px) {
          .hard-word-popup {
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
