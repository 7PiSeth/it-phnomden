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

const hardWords = {
  'profound': 'ស៊ីជម្រៅ',
  'reflections': 'ការឆ្លុះបញ្ចាំង',
  'accountability': 'ទំនួលខុសត្រូវ',
  'authenticity': 'ភាពពិតប្រាកដ',
  'fulfillment': 'ការបំពេញ',
  'perception': 'ការយល់ឃើញ',
  'concrete': 'ជាក់ស្តែង',
  'impermanence': 'ភាពមិនស្ថិតស្ថេរ',
  'unrealistic': 'មិនប្រាកដនិយម',
  'insecurity': 'ភាពមិនមានសុវត្ថិភាព',
  'fragility': 'ភាពផុយស្រួយ',
  'resilience': 'ភាពធន់',
  'validation': 'ការបញ្ជាក់',
  'substance': 'ខ្លឹមសារ',
  'unhealthy': 'មិនល្អចំពោះសុខភាព',
  'narcissism': 'ភាពគិតតែពីខ្លួនឯង'
};

const englishContent = {
  heading: 'Life Lessons I Know at 40 (That I Wish I Knew at 20)',
  subheading: 'A Guide to Personal Growth and Acceptance',
  sections: [
    {
      title: "Relationships and Self-Respect",
      body: `Your relationship with others is a direct reflection of your relationship with yourself. Feeling better about yourself comes from doing things worth feeling good about. Self-respect is earned through your actions and choices in life, not something that's simply handed to you. Be the partner you want to have.`
    },
    {
      title: "Failure and Resilience",
      body: `The only real failure is not trying. The only real rejection is not asking. Success and failure are not concrete states but perceptions. Inaction is the true failure. True confidence comes from accepting failure as a possibility. You will always feel mildly inadequate and somewhat dissatisfied with your life. Nothing is wrong with you for feeling this way; it might be the most normal thing about you.`
    },
    {
      title: "Taking Responsibility",
      body: `Taking responsibility for all of your problems alleviates more suffering than it creates. Blaming others hands them control over your life; taking responsibility puts you back in control. Nobody is coming to save you; you are your own rescue. This truth is a source of immense power.`
    },
    {
      title: "The Reality of Happiness and Goals",
      body: `A happy life is not a life without stress. It's a life of meaningful stress. The person you marry is the person you fight with. The house you buy is the house you repair. The dream job you take is the job you stress over. Everything comes with an inherent sacrifice. Avoid expecting a single achievement or relationship to solve all your problems. Satisfaction comes from within.`
    },
    {
      title: "Identity and Growth",
      body: `Be careful how you define yourself. A rigid identity can trap you, while a flexible sense of self allows for growth and adaptation. Your ability to say no defines you. Saying yes to everything dilutes your identity and influence; your rejections shape your character and priorities. People don't think about you as much as you assume. Most are too preoccupied with their own lives to notice your insecurities.`
    }
  ]
};

const khmerContent = {
  heading: 'មេរៀនជីវិត ៤០ យ៉ាងដែលខ្ញុំដឹងនៅអាយុ ៤០ ឆ្នាំ (ដែលខ្ញុំប្រាថ្នាថាខ្ញុំបានដឹងនៅអាយុ ២០ ឆ្នាំ)',
  subheading: 'ការណែនាំអំពីការរីកចម្រើនផ្ទាល់ខ្លួន និងការទទួលយក',
  sections: [
    {
      title: "ទំនាក់ទំនង និងការគោរពខ្លួនឯង",
      body: `ទំនាក់ទំនងរបស់អ្នកជាមួយអ្នកដទៃគឺជាការឆ្លុះបញ្ចាំងដោយផ្ទាល់នៃទំនាក់ទំនងរបស់អ្នកជាមួយខ្លួនឯង។ ការមានអារម្មណ៍ល្អប្រសើរចំពោះខ្លួនឯងកើតចេញពីការធ្វើអ្វីដែលគួរឱ្យមានអារម្មណ៍ល្អ។ ការគោរពខ្លួនឯងត្រូវបានរកបានតាមរយៈសកម្មភាព និងជម្រើសរបស់អ្នកនៅក្នុងជីវិត មិនមែនជារបស់ដែលគ្រាន់តែត្រូវបានប្រគល់ឱ្យនោះទេ។ ចូរធ្វើជាដៃគូដែលអ្នកចង់មាន។`
    },
    {
      title: "ការបរាជ័យ និងភាពធន់",
      body: `ការបរាជ័យពិតប្រាកដតែមួយគត់គឺការមិនព្យាយាម។ ការបដិសេធពិតប្រាកដតែមួយគត់គឺការមិនសួរ។ ជោគជ័យ និងការបរាជ័យមិនមែនជាស្ថានភាពជាក់ស្តែងនោះទេ ប៉ុន្តែជាការយល់ឃើញ។ អសកម្មគឺជាការបរាជ័យពិតប្រាកដ។ ទំនុកចិត្តពិតប្រាកដកើតចេញពីការទទួលយកការបរាជ័យជាលទ្ធភាពមួយ។ អ្នកតែងតែមានអារម្មណ៍ថាមិនគ្រប់គ្រាន់ និងមិនពេញចិត្តបន្តិចបន្តួចចំពោះជីវិតរបស់អ្នក។ គ្មានអ្វីខុសជាមួយអ្នកចំពោះអារម្មណ៍នេះទេ វាអាចជារឿងធម្មតាបំផុតអំពីអ្នក។`
    },
    {
      title: "ការទទួលខុសត្រូវ",
      body: `ការទទួលខុសត្រូវចំពោះបញ្ហាទាំងអស់របស់អ្នកជួយកាត់បន្ថយការឈឺចាប់ច្រើនជាងការបង្កើតវា។ ការបន្ទោសអ្នកដទៃផ្តល់ឱ្យពួកគេនូវការគ្រប់គ្រងលើជីវិតរបស់អ្នក។ ការទទួលខុសត្រូវដាក់អ្នកឱ្យត្រលប់មកវិញក្នុងការគ្រប់គ្រង។ គ្មាននរណាម្នាក់មកជួយសង្គ្រោះអ្នកទេ អ្នកគឺជាការសង្គ្រោះរបស់ខ្លួនឯង។ សេចក្ដីពិតនេះគឺជាប្រភពនៃអំណាចដ៏ធំធេង។`
    },
    {
      title: "ការពិតនៃសុភមង្គល និងគោលដៅ",
      body: `ជីវិតរីករាយមិនមែនជាជីវិតដែលគ្មានភាពតានតឹងនោះទេ។ វាគឺជាជីវិតដែលមានភាពតានតឹងប្រកបដោយអត្ថន័យ។ មនុស្សដែលអ្នករៀបការជាមួយគឺជាមនុស្សដែលអ្នកប្រកែកជាមួយ។ ផ្ទះដែលអ្នកទិញគឺជាផ្ទះដែលអ្នកជួសជុល។ ការងារក្នុងក្តីស្រមៃដែលអ្នកទទួលយកគឺជាការងារដែលអ្នកតានតឹង។ អ្វីៗគ្រប់យ៉ាងភ្ជាប់មកជាមួយការលះបង់ពីកំណើត។ ចូរជៀសវាងការរំពឹងថាជោគជ័យ ឬទំនាក់ទំនងតែមួយនឹងដោះស្រាយបញ្ហាទាំងអស់របស់អ្នក។ ការពេញចិត្តកើតចេញពីខាងក្នុង។`
    },
    {
      title: "អត្តសញ្ញាណ និងការរីកចម្រើន",
      body: `ចូរប្រុងប្រយ័ត្នពីរបៀបដែលអ្នកកំណត់អត្តសញ្ញាណខ្លួនឯង។ អត្តសញ្ញាណរឹងមាំអាចចាប់អ្នកជាប់ ខណៈពេលដែលអារម្មណ៍បត់បែននៃខ្លួនឯងអនុញ្ញាតឱ្យមានការរីកចម្រើន និងការសម្របខ្លួន។ សមត្ថភាពរបស់អ្នកក្នុងការនិយាយថាទេកំណត់អត្តសញ្ញាណអ្នក។ ការនិយាយថាបាទចំពោះអ្វីៗគ្រប់យ៉ាងធ្វើឱ្យអត្តសញ្ញាណ និងឥទ្ធិពលរបស់អ្នករលាយបាត់។ ការបដិសេធរបស់អ្នកបង្កើតចរិតលក្ខណៈ និងអាទិភាពរបស់អ្នក។ មនុស្សមិនគិតពីអ្នកច្រើនដូចដែលអ្នកគិតនោះទេ។ ភាគច្រើនពួកគេរវល់ពេកជាមួយជីវិតរបស់ពួកគេផ្ទាល់ដើម្បីកត់សម្គាល់ពីភាពមិនមានសុវត្ថិភាពរបស់អ្នក។`
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
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*scy1S4tRa0FGoex1"
          alt="Two people with a significant age difference"
          className="w-full h-auto object-cover"
        />
      </div>
      
      <div className="w-full max-w-6xl text-center mb-4">
        <h1 className="text-4xl sm:text-5xl font-english-header-scaled font-bold mb-4">{englishContent.heading}</h1>
        <h2 className="text-2xl font-english-subheading-scaled text-gray-700 mb-6">{englishContent.subheading}</h2>
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
                <h3 className="text-2xl font-english-subheading-scaled font-semibold text-gray-900">{section.title}</h3>
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
              <h3 className="text-2xl font-khmer-subheading font-semibold text-gray-900">{section.title}</h3>
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