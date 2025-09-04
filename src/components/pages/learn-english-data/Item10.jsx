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
    console.error('SpeechSynthesisUtterance.onerror', event);
    isSpeaking = false;
    if (setAudioStatus) setAudioStatus('stopped');
    if (setPlayingSection) setPlayingSection(null);
  };

  window.speechSynthesis.speak(utterance);
};

const stopAudio = () => {
  window.speechSynthesis.cancel();
  isSpeaking = false;
};

// Hardcoded content for the component
const content = {
  english: {
    title: "The Hard Truth: Nothing Will Work Unless You Do",
    mainText: `The truth is, nothing will work unless you do. That's the hard truth that separates the wishful thinkers from the intentional doers. We live in a world full of opportunity, but opportunity without effort is just a missed appointment with your own potential. Everyone wants the reward, but few want the responsibility. Everyone wants success, but not everyone wants to show up, stay up, and push through when it's not easy. But here’s the secret: nothing magical happens until you move. You have to get up, step forward, and do the work. I'm not talking about massive leaps, but daily disciplines—the small, consistent choices made day after day that compound into big results. Success doesn't respond to hope. It responds to effort, consistency, and hustle backed by wisdom. You don't need more motivation; you need more movement. You don't need someone to save you; you need to decide to save yourself. The magic isn't in the material, but in the shift from excuse to ownership, from doubt to belief, and from delay to discipline.`,
    principles: [
      {
        title: "Start with One Thing",
        body: `Take a moment to ask yourself: What's one thing you've been avoiding that you know you need to do? What's one place where you've let the old you win? It's time to take it back. The journey to greatness begins with a single, courageous step. Start there. Move the needle by one degree today. You are not stuck; you are just one decision away from progress, one action away from momentum, and one courageous step away from a brand new direction.`
      },
      {
        title: "The Power of Daily Disciplines",
        body: `The path to greatness is paved not with massive, one-time actions, but with the accumulation of small, consistent choices. These daily disciplines, like the push-ups you do, the books you read, or the skills you sharpen, are what truly lead to transformation. It's about showing up and doing the work, even when no one is watching. Consistency means that even slow progress is powerful, as it compounds over time.`
      },
      {
        title: "Shift Your Mindset",
        body: `Greatness is a choice that starts with you. You have the mind, the heart, and the capacity to learn, grow, adapt, and lead. Transformation happens for the doers, not the wishers. The magic isn't in the material, it's in the moment you make the shift from excuse to ownership, from doubt to belief, and from delay to discipline. You are the architect of your future.`
      }
    ]
  },
  khmer: {
    title: "ការពិតដ៏លំបាក៖ គ្មានអ្វីនឹងដំណើរការទេ លុះត្រាតែអ្នកធ្វើវា",
    mainText: `ការពិតគឺ គ្មានអ្វីនឹងដំណើរការទេ លុះត្រាតែអ្នកធ្វើវា។ នោះជាការពិតដ៏លំបាក ដែលបែងចែកអ្នកគិតបា្រថ្នាពីអ្នកធ្វើដែលមានចេតនា។ យើងរស់នៅក្នុងពិភពលោកដែលពោរពេញដោយឱកាស ប៉ុន្តែឱកាសដែលគ្មានការប្រឹងប្រែង គ្រាន់តែជាការខកខានក្នុងការណាត់ជួបជាមួយសក្តានុពលផ្ទាល់ខ្លួនរបស់អ្នក។ អ្នករាល់គ្នាបានប្រាថ្នានូវរង្វាន់ ប៉ុន្តែមានមនុស្សតិចណាស់ដែលចង់បានការទទួលខុសត្រូវ។ អ្នករាល់គ្នាប្រាថ្នានូវភាពជោគជ័យ ប៉ុន្តែមិនមែនគ្រប់គ្នាសុទ្ធតែចង់បង្ហាញខ្លួន ក្រោកឈរ និងបន្តជំរុញខ្លួនឯងនៅពេលដែលវាមិនងាយស្រួលនោះទេ។ ប៉ុន្តែនេះជាអាថ៌កំបាំង៖ គ្មានអ្វីអស្ចារ្យកើតឡើងទេ រហូតដល់អ្នកធ្វើចលនា។ អ្នកត្រូវតែក្រោកឡើង ឈានទៅមុខ និងធ្វើការងារ។ ខ្ញុំមិននិយាយអំពីការលោតផ្លោះដ៏ធំទេ ប៉ុន្តែជាវិន័យប្រចាំថ្ងៃ—ជម្រើសតូចៗដែលធ្វើជាប់លាប់ថ្ងៃហើយថ្ងៃទៀតដែលប្រមូលផ្ដុំគ្នាក្លាយជាលទ្ធផលដ៏ធំ។ ភាពជោគជ័យមិនឆ្លើយតបនឹងក្តីសង្ឃឹមទេ។ វាឆ្លើយតបនឹងការខិតខំប្រឹងប្រែង ភាពស៊ីសង្វាក់គ្នា និងការតស៊ូដោយមានការគាំទ្រពីគំនិតឆ្លាតវៃ។ អ្នកមិនត្រូវការការលើកទឹកចិត្តបន្ថែមទៀតទេ អ្នកត្រូវការចលនាបន្ថែមទៀត។ អ្នកមិនត្រូវការនរណាម្នាក់ដើម្បីសង្គ្រោះអ្នកទេ អ្នកត្រូវតែសម្រេចចិត្តសង្គ្រោះខ្លួនឯង។ ភាពអស្ចារ្យមិនស្ថិតនៅក្នុងសម្ភារៈទេ ប៉ុន្តែនៅក្នុងការផ្លាស់ប្តូរពីលេសទៅជាកម្មសិទ្ធិ ពីការសង្ស័យទៅជាជំនឿ និងពីការពន្យារពេលទៅជាវិន័យ។`,
    principles: [
      {
        title: "ចាប់ផ្តើមជាមួយរឿងមួយ",
        body: `ចំណាយពេលមួយភ្លែតដើម្បីសួរខ្លួនឯង៖ តើមានរឿងមួយណាដែលអ្នកបានជៀសវាង ដែលអ្នកដឹងថាអ្នកត្រូវធ្វើ? តើមានកន្លែងមួយណាដែលអ្នកបានអនុញ្ញាតឱ្យខ្លួនឯងចាស់ឈ្នះ? ដល់ពេលយកវាមកវិញហើយ។ ដំណើរទៅកាន់ភាពអស្ចារ្យចាប់ផ្តើមដោយជំហានដ៏ក្លាហានតែមួយ។ ចាប់ផ្តើមពីទីនោះ។ ផ្លាស់ទីម្ជុលមួយដឺក្រេនៅថ្ងៃនេះ ព្រោះអ្នកមិនជាប់គាំងទេ។ អ្នកគ្រាន់តែជាការសម្រេចចិត្តមួយឆ្ងាយពីវឌ្ឍនភាព សកម្មភាពមួយឆ្ងាយពីសន្ទុះ និងជំហានដ៏ក្លាហានមួយឆ្ងាយពីទិសដៅថ្មីទាំងស្រុង។`
      },
      {
        title: "ថាមពលនៃវិន័យប្រចាំថ្ងៃ",
        body: `ផ្លូវទៅកាន់ភាពអស្ចារ្យមិនត្រូវបានត្រួសត្រាយដោយសកម្មភាពដ៏ធំ និងម្តងម្កាលនោះទេ ប៉ុន្តែជាមួយនឹងការប្រមូលផ្តុំនៃជម្រើសតូចៗដែលស៊ីសង្វាក់គ្នា។ វិន័យប្រចាំថ្ងៃទាំងនេះ ដូចជាការរុញច្រានដែលអ្នកធ្វើ សៀវភៅដែលអ្នកអាន ឬជំនាញដែលអ្នកពង្រឹង គឺជាអ្វីដែលពិតជាអាចនាំទៅរកការផ្លាស់ប្តូរ។ វាគឺអំពីការបង្ហាញខ្លួន និងធ្វើការងារ ទោះបីជាគ្មាននរណាម្នាក់កំពុងមើលក៏ដោយ។ ភាពស៊ីសង្វាក់គ្នាមានន័យថា សូម្បីតែវឌ្ឍនភាពយឺតក៏មានឥទ្ធិពលដែរ ព្រោះវាប្រមូលផ្ដុំតាមពេលវេលា។`
      },
      {
        title: "ផ្លាស់ប្តូរផ្នត់គំនិតរបស់អ្នក",
        body: `ភាពអស្ចារ្យគឺជាជម្រើសមួយដែលចាប់ផ្តើមពីអ្នក។ អ្នកមានគំនិត បេះដូង និងសមត្ថភាពក្នុងការរៀន លូតលាស់ សម្របខ្លួន និងដឹកនាំ។ ការផ្លាស់ប្តូរកើតឡើងចំពោះអ្នកធ្វើ មិនមែនអ្នកប្រាថ្នានោះទេ។ ភាពអស្ចារ្យមិនស្ថិតនៅក្នុងសម្ភារៈនោះទេ វាស្ថិតនៅក្នុងពេលដែលអ្នកធ្វើការផ្លាស់ប្តូរពីលេសទៅជាកម្មសិទ្ធិ ពីការសង្ស័យទៅជាជំនឿ និងពីការពន្យារពេលទៅជាវិន័យ។ អ្នកគឺជាស្ថាបត្យករនៃអនាគតរបស់អ្នក។`
      }
    ]
  },
};

const hardWords = {
  "hard truth": "ការពិតដ៏លំបាក",
  "wishful thinkers": "អ្នកគិតបា្រថ្នា",
  "intentional doers": "អ្នកធ្វើដែលមានចេតនា",
  "potential": "សក្តានុពល",
  "responsibility": "ការទទួលខុសត្រូវ",
  "disciplines": "វិន័យ",
  "consistent": "ស៊ីសង្វាក់",
  "compound": "ប្រមូលផ្ដុំ",
  "hustle": "ការតស៊ូ",
  "wisdom": "គំនិតឆ្លាតវៃ",
  "ownership": "កម្មសិទ្ធិ",
  "doubt": "ការសង្ស័យ",
  "belief": "ជំនឿ",
  "delay": "ការពន្យារពេល",
  "courageous": "ក្លាហាន",
  "momentum": "សន្ទុះ",
  "accumulation": "ការប្រមូលផ្តុំ",
  "transformation": "ការផ្លាស់ប្តូរ",
  "architect": "ស្ថាបត្យករ",
  "capacity": "សមត្ថភាព",
  "adapt": "សម្របខ្លួន",
};

const HardWordPopup = ({ word, translation, onClose, position, onPlayAudio }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="absolute z-50 bg-gray-800 text-white text-sm p-3 rounded-lg shadow-lg"
      style={{ top: position.y + 10, left: position.x, transform: 'translateX(-50%)' }}
    >
      <div className="flex items-center space-x-2">
        <span>{translation}</span>
        <button
          onClick={() => onPlayAudio(word)}
          className="p-1 rounded-full text-blue-300 hover:bg-blue-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Main component
const App = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingSection, setPlayingSection] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: '', translation: '', x: 0, y: 0 });
  const textRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(getDefaultVoice(availableVoices));
      }
    };

    if (window.speechSynthesis) {
      // Load voices and set up event listener
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleTextHighlight = (e) => {
    if (e.target.tagName === 'SPAN' && e.target.dataset.word) {
      const word = e.target.dataset.word;
      const translation = hardWords[word];
      if (translation) {
        const rect = e.target.getBoundingClientRect();
        setPopupContent({
          word: word,
          translation: translation,
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY
        });
        setShowPopup(true);
      }
    } else {
      setShowPopup(false);
    }
  };

  const wrapHardWords = (text) => {
    return text.split(' ').map((word, index) => {
      const sanitizedWord = word.toLowerCase().replace(/[,.!?'"’“”]/g, '');
      const isHard = hardWords.hasOwnProperty(sanitizedWord);
      return (
        <React.Fragment key={index}>
          <span
            data-word={isHard ? sanitizedWord : ''}
            className={isHard ? "underline decoration-dashed decoration-gray-400 cursor-pointer" : ""}
            onClick={handleTextHighlight}
          >
            {word}
          </span>
          {' '}
        </React.Fragment>
      );
    });
  };

  const handleAudioToggle = (sectionIndex, text) => {
    if (playingSection === sectionIndex) {
      stopAudio();
      setPlayingSection(null);
    } else {
      if (selectedVoice) {
        stopAudio(); // Stop any existing audio first
        playAudio(text, selectedVoice, setPlayingSection, sectionIndex);
      }
    }
  };

  const handlePopupAudio = (word) => {
    if (selectedVoice) {
      stopAudio();
      playAudio(word, selectedVoice);
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nokora&family=Content&family=Hanuman:wght@100;300;400;700;900&family=Battambang:wght@400;700&display=swap');
        
        .font-english-heading { font-family: 'Playfair Display', serif; }
        .font-english-subheading { font-family: 'Merriweather', serif; }
        .font-english-body { font-family: 'Lato', sans-serif; }
        .font-english-label { font-family: 'Montserrat', sans-serif; }
        
        .font-khmer-heading { font-family: 'Nokora', cursive; }
        .font-khmer-subheading { font-family: 'Content', cursive; }
        .font-khmer-body { font-family: 'Hanuman', serif; }
        .font-khmer-label { font-family: 'Battambang', cursive; }

        .image-container {
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          position: relative;
        }

        .image-container img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      
      {/* Image Section */}
      <div className="w-full flex justify-center mb-8">
        <div className="w-full max-w-4xl image-container">
          <img 
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjDGYSFExSRMe2t2kJCsfPWcj4oqZReyFSNFaABAul0H7jEpQRBx2syeLWWZudfLJB_Th-phTM6wyiSBin-RuMJ83aE-lSXpGjiWHK1za1-G0f5S9xJBaTu2zKpaGgiC88vmOW81khALXgoJLvZoMXyrqX-T9-8Lo9CZP4KMUrf929N-bKXCNfamuZh/w640-h360-rw/Nothing%20Will%20Work%20Unless%20You%20Do.webp=w704-h396-p-k-no-nu"
            alt="Motivational quote by Jim Rohn"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-english-heading font-extrabold text-gray-900 leading-tight mb-2">{content.english.title}</h1>
        <h1 className="text-4xl sm:text-5xl md:text-5xl font-khmer-heading font-extrabold text-gray-900 leading-tight">{content.khmer.title}</h1>
      </div>

      {/* Voice Selection Dropdown */}
      <div className="flex justify-center items-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
          <label htmlFor="voice-select" className="text-sm font-english-label text-gray-700">Select Voice:</label>
          <select
            id="voice-select"
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
            className="bg-white rounded-lg px-3 py-1 text-sm font-english-label shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVoice?.name || ''}
          >
            {voices.map(voice => (
              <option key={voice.name} value={voice.name}>{voice.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* English Content Section */}
        <div className="relative bg-gray-100 rounded-2xl p-6 md:p-8 shadow-inner space-y-6">
          <div className="flex items-start justify-between">
            <p className="text-lg font-english-body leading-relaxed text-gray-700 whitespace-pre-line mr-4">
              {wrapHardWords(content.english.mainText)}
            </p>
            <button
              onClick={() => handleAudioToggle('mainText-en', content.english.mainText)}
              className={`absolute top-6 right-4 p-2 rounded-full transition-colors duration-200 ${playingSection === 'mainText-en' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              {playingSection === 'mainText-en' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10.5v3" />
                  <path d="M6 6v12" />
                  <path d="M10 3v18" />
                  <path d="M14 8v8" />
                  <path d="M18 5v14" />
                  <path d="M22 10.5v3" />
                </svg>
              )}
            </button>
          </div>
          <div className="space-y-6">
            {content.english.principles.map((principle, index) => (
              <div key={`principle-en-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-english-subheading font-semibold text-gray-900">{principle.title}</h3>
                  <button
                    onClick={() => handleAudioToggle(`principle-en-${index}`, `${principle.title}. ${principle.body}`)}
                    className={`p-2 rounded-full transition-colors duration-200 ${playingSection === `principle-en-${index}` ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    {playingSection === `principle-en-${index}` ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 10.5v3" />
                        <path d="M6 6v12" />
                        <path d="M10 3v18" />
                        <path d="M14 8v8" />
                        <path d="M18 5v14" />
                        <path d="M22 10.5v3" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="font-english-body leading-relaxed text-gray-700 whitespace-pre-line">{wrapHardWords(principle.body)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Khmer Content Section */}
        <div className="bg-gray-100 rounded-2xl p-6 md:p-8 shadow-inner space-y-6">
          <p className="text-lg font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">
            {content.khmer.mainText}
          </p>
          <div className="space-y-6">
            {content.khmer.principles.map((principle, index) => (
              <div key={`principle-km-${index}`} className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-khmer-subheading font-semibold text-gray-900">{principle.title}</h3>
                  <button
                    onClick={() => handleAudioToggle(`principle-km-${index}`, `${principle.title}. ${principle.body}`)}
                    className={`p-2 rounded-full transition-colors duration-200 ${playingSection === `principle-km-${index}` ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  >
                    {playingSection === `principle-km-${index}` ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 10.5v3" />
                        <path d="M6 6v12" />
                        <path d="M10 3v18" />
                        <path d="M14 8v8" />
                        <path d="M18 5v14" />
                        <path d="M22 10.5v3" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hard Word Popup */}
      {showPopup && (
        <HardWordPopup
          word={popupContent.word}
          translation={popupContent.translation}
          position={{ x: popupContent.x, y: popupContent.y }}
          onClose={() => setShowPopup(false)}
          onPlayAudio={handlePopupAudio}
        />
      )}
    </div>
  );
};

export default App;
