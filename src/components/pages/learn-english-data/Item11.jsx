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
  'dominated': 'ត្រួតត្រា',
  'advertising': 'ការផ្សាយពាណិជ្ជកម្ម',
  'strategies': 'យុទ្ធសាស្ត្រ',
  'immoral': 'អសីលធម៌',
  'unacceptable': 'មិនអាចទទួលយកបាន',
  'intrusive': 'រំខាន',
  'irritating': 'រំខាន',
  'numerous': 'ច្រើន',
  'unethical': 'គ្មានសីលធម៌',
  'influenced': 'ត្រូវបានជះឥទ្ធិពល',
  'enormous': 'ធំធេង',
  'controversial': 'ចម្រូងចម្រាស',
  'consumption': 'ការប្រើប្រាស់',
  'excessive': 'ហួសហេតុ',
  'banned': 'ហាមឃាត់',
  'unnecessary': 'មិនចាំបាច់'
};

const englishContent = {
  heading: 'Advertising: A Moral Compass?',
  sections: [
    {
      heading: "Introduction",
      body: `The world that we live in today is dominated by advertising. Adverts are on television, on the World Wide Web, in the street and even on our mobile phones. However, many of the strategies used to sell a product or service can be considered immoral or unacceptable.`
    },
    {
      heading: "The Intrusiveness of Ads",
      body: `To begin with, the fact that we cannot escape from advertising is a significant cause for complaint. Constant images and signs wherever we look can be very intrusive and irritating at times. Take for example advertising on the mobile phone. With the latest technology mobile companies are now able to send advertising messages via SMS to consumers' phones whenever they choose. Although we expect adverts in numerous situations, it now seems that there are very few places we can actually avoid them.`
    },
    {
      heading: "Targeting Vulnerable Consumers",
      body: `A further aspect of advertising that I would consider unethical is the way that it encourages people to buy products they may not need or cannot afford. Children and young people in particular are influenced by adverts showing the latest toys, clothing or music and this can put enormous pressure on the parents to buy these products.`
    },
    {
      heading: "Controversial Products",
      body: `In addition, the advertising of tobacco products and alcohol has long been a controversial issue, but cigarette adverts have only recently been banned in many countries. It is quite possible that alcohol adverts encourage excessive consumption and underage drinking, yet restrictions have not been placed on this type of advertising in the same way as smoking.`
    },
    {
      heading: "Conclusion",
      body: `It is certainly true to say that advertising is an everyday feature of our lives. Therefore, people are constantly being encouraged to buy products or services that might be too expensive, unnecessary or even unhealthy. In conclusion, many aspects of advertising do appear to be morally wrong and are not acceptable in today's society.`
    }
  ]
};

const khmerContent = {
  heading: 'ការផ្សាយពាណិជ្ជកម្ម: ត្រីវិស័យសីលធម៌?',
  sections: [
    {
      heading: "សេចក្តីផ្តើម",
      body: `ពិភពលោកដែលយើងរស់នៅសព្វថ្ងៃនេះត្រូវបានត្រួតត្រាដោយការផ្សាយពាណិជ្ជកម្ម។ ការផ្សាយពាណិជ្ជកម្មមាននៅលើកញ្ចក់ទូរទស្សន៍ នៅលើគេហទំព័រ នៅតាមដងផ្លូវ និងសូម្បីតែនៅលើទូរស័ព្ទដៃរបស់យើង។ ទោះជាយ៉ាងណាក៏ដោយ យុទ្ធសាស្ត្រជាច្រើនដែលប្រើដើម្បីលក់ផលិតផល ឬសេវាកម្មអាចត្រូវបានចាត់ទុកថាជាអសីលធម៌ ឬមិនអាចទទួលយកបាន។`
    },
    {
      heading: "ភាពរំខាននៃការផ្សាយពាណិជ្ជកម្ម",
      body: `ដំបូងឡើយ ការពិតដែលថាយើងមិនអាចគេចផុតពីការផ្សាយពាណិជ្ជកម្មបានគឺជាមូលហេតុដ៏សំខាន់សម្រាប់ការត្អូញត្អែរ។ រូបភាព និងសញ្ញាថេរនៅគ្រប់ទីកន្លែងដែលយើងមើលអាចជារឿងដែលរំខាននិងធ្វើឱ្យឆាប់ខឹងនៅពេលខ្លះ។ ឧទាហរណ៍ដូចជា ការផ្សាយពាណិជ្ជកម្មនៅលើទូរស័ព្ទដៃ។ ជាមួយនឹងបច្ចេកវិទ្យាចុងក្រោយបំផុត ក្រុមហ៊ុនទូរស័ព្ទឥឡូវនេះអាចផ្ញើសារផ្សាយពាណិជ្ជកម្មតាមរយៈសារ SMS ទៅកាន់ទូរស័ព្ទរបស់អ្នកប្រើប្រាស់នៅពេលណាដែលពួកគេជ្រើសរើស។ ទោះបីជាយើងរំពឹងថានឹងមានការផ្សាយពាណិជ្ជកម្មក្នុងស្ថានភាពច្រើនក៏ដោយ ឥឡូវនេះហាក់ដូចជាមានកន្លែងតិចតួចណាស់ដែលយើងអាចជៀសវាងវាបាន។`
    },
    {
      heading: "ការកំណត់គោលដៅអ្នកប្រើប្រាស់ងាយរងគ្រោះ",
      body: `ទិដ្ឋភាពមួយទៀតនៃការផ្សាយពាណិជ្ជកម្មដែលខ្ញុំចាត់ទុកថាគ្មានសីលធម៌គឺរបៀបដែលវាជំរុញឱ្យមនុស្សទិញផលិតផលដែលពួកគេប្រហែលជាមិនត្រូវការ ឬមិនមានលទ្ធភាពទិញ។ ជាពិសេសក្មេងៗ និងយុវជនត្រូវបានជះឥទ្ធិពលដោយការផ្សាយពាណិជ្ជកម្មដែលបង្ហាញពីប្រដាប់ប្រដាក្មេងលេង សំលៀកបំពាក់ ឬតន្ត្រីចុងក្រោយបំផុត ហើយនេះអាចដាក់សម្ពាធយ៉ាងធំធេងទៅលើឪពុកម្តាយដើម្បីទិញផលិតផលទាំងនេះ។`
    },
    {
      heading: "ផលិតផលចម្រូងចម្រាស",
      body: `លើសពីនេះ ការផ្សាយពាណិជ្ជកម្មផលិតផលថ្នាំជក់ និងគ្រឿងស្រវឹងគឺជាបញ្ហាដ៏ចម្រូងចម្រាសជាយូរមកហើយ ប៉ុន្តែការផ្សាយពាណិជ្ជកម្មបារីទើបតែត្រូវបានហាមឃាត់នៅក្នុងប្រទេសជាច្រើននាពេលថ្មីៗនេះ។ វាពិតជាអាចទៅរួចដែលថាការផ្សាយពាណិជ្ជកម្មគ្រឿងស្រវឹងលើកទឹកចិត្តដល់ការប្រើប្រាស់ហួសហេតុ និងការផឹកស្រាក្រោមអាយុ ប៉ុន្តែការរឹតបន្តឹងមិនត្រូវបានដាក់លើប្រភេទនៃការផ្សាយពាណិជ្ជកម្មនេះតាមរបៀបដូចការជក់បារីនោះទេ។`
    },
    {
      heading: "សេចក្តីសន្និដ្ឋាន",
      body: `វាពិតជាការពិតណាស់ដែលថាការផ្សាយពាណិជ្ជកម្មគឺជាលក្ខណៈប្រចាំថ្ងៃនៃជីវិតរបស់យើង។ ដូច្នេះហើយ មនុស្សត្រូវបានជំរុញឥតឈប់ឈរឱ្យទិញផលិតផល ឬសេវាកម្មដែលអាចមានតម្លៃថ្លៃពេក មិនចាំបាច់ ឬសូម្បីតែមិនល្អចំពោះសុខភាព។ ជាការសន្និដ្ឋាន ទិដ្ឋភាពជាច្រើននៃការផ្សាយពាណិជ្ជកម្មហាក់ដូចជាខុសសីលធម៌ ហើយមិនអាចទទួលយកបាននៅក្នុងសង្គមបច្ចុប្បន្ននេះ។`
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
      const normalizedWord = word.toLowerCase().trim();
      const punctuation = word.slice(normalizedWord.length);
      
      if (hardWords[normalizedWord]) {
        return (
          <React.Fragment key={index}>
            {getHardWordSpan(word.substring(0, normalizedWord.length), hardWords[normalizedWord], index)}
            {punctuation}
          </React.Fragment>
        );
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
          font-family: 'Moulpali', serif; 
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
          font-family: 'Noto Serif Khmer', serif;
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
          src="https://ted-ielts.com/wp-content/uploads/2020/09/ielts-advertising.png"
          alt="Advertising billboards"
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
        </div>
        
        {/* Khmer Section */}
        <div className="w-full sm:w-1/2 space-y-8">
          {khmerContent.sections.map((section, index) => (
            <div key={`section-km-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
              <h2 className="text-2xl font-khmer-subheading font-semibold text-gray-900">{section.heading}</h2>
              <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">{section.body}</p>
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
