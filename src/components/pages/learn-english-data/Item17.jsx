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
  'systems': 'ប្រព័ន្ធ',
  'temporary': 'បណ្តោះអាសន្ន',
  'consistent': 'ទៀងទាត់',
  'progress': 'ការរីកចម្រើន',
  'support': 'គាំទ្រ',
  'intentions': 'ចេតនា',
  'compounds': 'បូកបញ្ចូលគ្នា',
  'perfection': 'ភាពល្អឥតខ្ចោះ',
  'auditing': 'ពិនិត្យ',
  'adjustments': 'ការកែតម្រូវ',
  'laziness': 'ភាពខ្ជិលច្រអូស',
  'discouragement': 'ការបាក់ទឹកចិត្ត',
  'execute': 'អនុវត្ត',
  'reinforcing': 'ពង្រឹង',
  'identity': 'អត្តសញ្ញាណ',
  'principles': 'គោលការណ៍',
  'component': 'សមាសភាគ',
  'compound': 'ផ្សំ',
  'trajectory': 'គន្លង',
  'mindset': 'ផ្នត់គំនិត'
};

const englishContent = {
  heading: 'Building Systems to Achieve Your Goals',
  sections: [
    {
      heading: "Summary",
      body: `Success is often not achieved by relying on motivation alone, as motivation is temporary and can quickly fade. Instead, the key to achieving goals is to build systems, which are consistent structures that create automatic progress. While goals provide direction, a system is the method or "road" that keeps you moving forward even when you don't feel like it. Many people fail to reach their goals because they focus on the "high of goal setting" but never create a system to support their intentions. A system turns actions into habits, and habits into results. For example, instead of just setting a goal to lose 20 pounds, you build a system of exercising for 30 minutes every morning and tracking your daily nutrition. Systems remove guesswork and reliance on how you feel. A crucial component of a successful system is building habits. Real change doesn't come from sudden bursts of intensity but from small, consistent actions repeated over time. Start with a habit so small you can't fail, such as a 10-minute walk after dinner or reading two pages before bed. These small habits compound over time into massive results. It is also important to design your environment to support your system. For example, place your workout shoes by the door or charge your phone in another room to reduce distractions. No system is perfect at the start, and success is about progress, not perfection. When your system "clunks and stalls," you don't throw it out; you adjust it. Regularly auditing your system helps you identify what works and what doesn't, allowing you to make necessary tweaks. The best system is not the one that looks good on paper but the one you actually follow. Ultimately, a system is an "insurance policy" against discouragement and laziness. It removes the emotional decision-making process, allowing you to show up and execute even when motivation is low. By building a system, you are not just working toward a goal; you are reinforcing a new identity as the kind of person who follows through.`
    }
  ],
  principles: [
    {
      title: "Goals vs. Systems",
      body: `Goals provide direction, but systems create progress. While motivation gets you started, a system is the structure that keeps you moving forward, regardless of how you feel.`
    },
    {
      title: "Focus on Habits",
      body: `Small, consistent habits are the engine of your system and compound over time. Start with tiny, non-negotiable habits that are easy to maintain, then stack on more as they become automatic.`
    },
    {
      title: "Design Your Environment",
      body: `Your environment is stronger than your willpower. Design your surroundings to make good habits easy and bad habits hard.`
    },
    {
      title: "Audit and Adjust",
      body: `Don't aim for perfection from day one. Regularly review your system to see what is working and what isn't, and be willing to make adjustments. Success comes from consistent improvement, not a flawless initial plan.`
    },
    {
      title: "Automate When Possible",
      body: `Automate decisions and tasks to reduce reliance on daily willpower. For instance, automate your savings or meal prep in advance.`
    },
    {
      title: "Build Your Identity",
      body: `Each time you stick to your system, you prove to yourself that you are the type of person who follows through. This identity shift is the true victory that leads to long-term success.`
    },
    {
      title: "Embrace the \"Doer\" Mindset",
      body: `Stop waiting for inspiration and start building your system. The real challenge isn't a lack of ambition but a lack of design.`
    }
  ]
};

const khmerContent = {
  heading: 'ការកសាងប្រព័ន្ធដើម្បីសម្រេចគោលដៅរបស់អ្នក',
  sections: [
    {
      heading: "សេចក្តីសង្ខេប",
      body: `ភាពជោគជ័យជារឿយៗមិនត្រូវបានសម្រេចដោយពឹងផ្អែកលើការលើកទឹកចិត្តតែម្នាក់ឯងនោះទេ ព្រោះការលើកទឹកចិត្តគឺជារឿងបណ្តោះអាសន្ន ហើយអាចនឹងរសាត់ទៅយ៉ាងលឿន។ ផ្ទុយទៅវិញ គន្លឹះដើម្បីសម្រេចបានគោលដៅ គឺការកសាងប្រព័ន្ធ ដែលជាឥដ្ឋតូចៗដែលមានភាពទៀងទាត់ដែលបង្កើតការរីកចម្រើនដោយស្វ័យប្រវត្តិ។ ខណៈពេលដែលគោលដៅផ្តល់ទិសដៅ ប្រព័ន្ធគឺជាវិធីសាស្ត្រ ឬ "ផ្លូវ" ដែលធ្វើឱ្យអ្នកបន្តដំណើរទៅមុខទោះបីជាអ្នកមិនមានអារម្មណ៍ចង់ធ្វើក៏ដោយ។ មនុស្សជាច្រើនបរាជ័យក្នុងការសម្រេចគោលដៅរបស់ពួកគេ ព្រោះពួកគេផ្តោតលើ "ភាពរំភើបនៃការកំណត់គោលដៅ" ប៉ុន្តែមិនដែលបង្កើតប្រព័ន្ធដើម្បីគាំទ្រចេតនារបស់ពួកគេឡើយ។ ប្រព័ន្ធមួយប្រែក្លាយសកម្មភាពទៅជាទម្លាប់ ហើយទម្លាប់ទៅជាលទ្ធផល។ ឧទាហរណ៍ ជំនួសឱ្យការកំណត់គោលដៅសម្រកទម្ងន់ ២០ ផោន អ្នកកសាងប្រព័ន្ធហាត់ប្រាណរយៈពេល ៣០ នាទីរៀងរាល់ព្រឹក និងតាមដានអាហារូបត្ថម្ភប្រចាំថ្ងៃរបស់អ្នក។ ប្រព័ន្ធលុបបំបាត់ការស្មាននិងការពឹងផ្អែកលើអារម្មណ៍របស់អ្នក។ សមាសភាគដ៏សំខាន់នៃប្រព័ន្ធជោគជ័យគឺការកសាងទម្លាប់។ ការផ្លាស់ប្តូរពិតប្រាកដមិនមែនមកពីការផ្ទុះឡើងនៃភាពខ្លាំងភ្លាមៗនោះទេ ប៉ុន្តែមកពីសកម្មភាពតូចៗដែលមានភាពទៀងទាត់ដែលធ្វើម្តងទៀតតាមពេលវេលា។ ទម្លាប់តូចៗទាំងនេះនឹងផ្សំបញ្ចូលគ្នាទៅជាលទ្ធផលដ៏ធំសម្បើមតាមពេលវេលា។ វាក៏សំខាន់ផងដែរក្នុងការរៀបចំបរិស្ថានរបស់អ្នកដើម្បីគាំទ្រប្រព័ន្ធរបស់អ្នក។ ឧទាហរណ៍ ដាក់ស្បែកជើងហាត់ប្រាណរបស់អ្នកនៅមាត់ទ្វារ ឬសាកថ្មទូរស័ពទរបស់អ្នកនៅក្នុងបន្ទប់ផ្សេងទៀតដើម្បីកាត់បន្ថយការរំខាន។ គ្មានប្រព័ន្ធណាមួយល្អឥតខ្ចោះតាំងពីដំបូងឡើយ ហើយភាពជោគជ័យគឺអំពីការរីកចម្រើន មិនមែនភាពល្អឥតខ្ចោះនោះទេ។ នៅពេលដែលប្រព័ន្ធរបស់អ្នក "រអាក់រអួលនិងជាប់គាំង" អ្នកមិនបោះចោលវាទេ អ្នកកែតម្រូវវា។ ការពិនិត្យប្រព័ន្ធរបស់អ្នកជាប្រចាំជួយអ្នកកំណត់អត្តសញ្ញាណអ្វីដែលដំណើរការនិងអ្វីដែលមិនដំណើរការ ដែលអនុញ្ញាតឱ្យអ្នកធ្វើការកែតម្រូវចាំបាច់។ ប្រព័ន្ធដ៏ល្អបំផុតគឺមិនមែនជាប្រព័ន្ធដែលមើលទៅល្អនៅលើក្រដាសនោះទេ ប៉ុន្តែជាប្រព័ន្ធដែលអ្នកពិតជាធ្វើតាម។ ជាចុងក្រោយ ប្រព័ន្ធគឺជា "គោលនយោបាយធានារ៉ាប់រង" ប្រឆាំងនឹងការបាក់ទឹកចិត្តនិងភាពខ្ជិលច្រអូស។ វាលុបបំបាត់ដំណើរការនៃការសម្រេចចិត្តតាមអារម្មណ៍ ដែលអនុញ្ញាតឱ្យអ្នកបង្ហាញខ្លួននិងអនុវត្តទោះបីជាការលើកទឹកចិត្តមានកម្រិតទាបក៏ដោយ។ តាមរយៈការកសាងប្រព័ន្ធ អ្នកមិនត្រឹមតែធ្វើការឆ្ពោះទៅរកគោលដៅប៉ុណ្ណោះទេ ប៉ុន្តែអ្នកកំពុងពង្រឹងអត្តសញ្ញាណថ្មីជាប្រភេទមនុស្សដែលធ្វើតាម។`
    }
  ],
  principles: [
    {
      title: "គោលដៅទល់នឹងប្រព័ន្ធ",
      body: `គោលដៅផ្តល់ទិសដៅ ប៉ុន្តែប្រព័ន្ធបង្កើតការរីកចម្រើន។ ខណៈពេលដែលការលើកទឹកចិត្តធ្វើឱ្យអ្នកចាប់ផ្តើម ប្រព័ន្ធគឺជាឥដ្ឋតូចៗដែលធ្វើឱ្យអ្នកបន្តដំណើរទៅមុខ ដោយមិនគិតពីអារម្មណ៍របស់អ្នក។`
    },
    {
      title: "ផ្តោតលើទម្លាប់",
      body: `ទម្លាប់តូចៗដែលមានភាពទៀងទាត់គឺជាម៉ាស៊ីននៃប្រព័ន្ធរបស់អ្នក ហើយនឹងផ្សំបញ្ចូលគ្នាទៅតាមពេលវេលា។ ចាប់ផ្តើមជាមួយទម្លាប់តូចៗដែលមិនអាចចរចារបានដែលងាយស្រួលក្នុងការរក្សា ហើយបន្ទាប់មកបន្ថែមទៀតនៅពេលដែលវាក្លាយជាស្វ័យប្រវត្តិ។`
    },
    {
      title: "រៀបចំបរិស្ថានរបស់អ្នក",
      body: `បរិស្ថានរបស់អ្នកខ្លាំងជាងឆន្ទៈរបស់អ្នក។ រៀបចំបរិស្ថានរបស់អ្នកដើម្បីធ្វើឱ្យទម្លាប់ល្អងាយស្រួល និងទម្លាប់អាក្រក់ពិបាក។`
    },
    {
      title: "ពិនិត្យនិងកែតម្រូវ",
      body: `កុំមានគោលបំណងចង់ល្អឥតខ្ចោះតាំងពីថ្ងៃដំបូង។ ពិនិត្យប្រព័ន្ធរបស់អ្នកជាប្រចាំដើម្បីមើលថាតើអ្វីដែលដំណើរការនិងអ្វីដែលមិនដំណើរការ ហើយត្រូវមានឆន្ទៈក្នុងការធ្វើការកែតម្រូវ។ ភាពជោគជ័យបានមកពីការកែលម្អជាប្រចាំ មិនមែនផែនការដំបូងដែលគ្មានកំហុសនោះទេ។`
    },
    {
      title: "ធ្វើឱ្យស្វ័យប្រវត្តិនៅពេលអាចធ្វើទៅបាន",
      body: `ធ្វើការសម្រេចចិត្តនិងកិច្ចការដោយស្វ័យប្រវត្តិដើម្បីកាត់បន្ថយការពឹងផ្អែកលើឆន្ទៈប្រចាំថ្ងៃ។ ឧទាហរណ៍ ធ្វើការសន្សំប្រាក់ឬរៀបចំអាហារជាមុនដោយស្វ័យប្រវត្តិ។`
    },
    {
      title: "កសាងអត្តសញ្ញាណរបស់អ្នក",
      body: `រាល់ពេលដែលអ្នកប្រកាន់ខ្ជាប់នូវប្រព័ន្ធរបស់អ្នក អ្នកបញ្ជាក់ប្រាប់ខ្លួនឯងថាអ្នកគឺជាប្រភេទមនុស្សដែលធ្វើតាម។ ការផ្លាស់ប្តូរអត្តសញ្ញាណនេះគឺជាជ័យជម្នះពិតប្រាកដដែលនាំទៅដល់ភាពជោគជ័យរយៈពេលវែង។`
    },
    {
      title: "ទទួលយកផ្នត់គំនិត \"អ្នកធ្វើ\"",
      body: `ឈប់រង់ចាំការបំផុសគំនិតហើយចាប់ផ្តើមបង្កើតប្រព័ន្ធរបស់អ្នក។ បញ្ហាប្រឈមពិតប្រាកដមិនមែនជាការខ្វះមហិច្ឆតានោះទេ ប៉ុន្តែជាការខ្វះការរចនា។`
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
      const normalizedWord = word.toLowerCase().replace(/['".,?]/g, '');
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Merriweather:ital,wght@0,300..900;1,300..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Moul&family=Moulpali&family=Hanuman:wght@100;300;400;700;900&family=Battambang:wght@100;300;400;700;900&display=swap');
        
        /* English Fonts */
        .font-english-header { font-family: 'Playfair Display', serif; }
        .font-english-subheading { font-family: 'Merriweather', serif; }
        .font-english-body { font-family: 'Lato', sans-serif; }
        .font-english-label { font-family: 'Montserrat', sans-serif; }
        
        /* Khmer Fonts */
        .font-khmer-header { font-family: 'Moul', serif; }
        .font-khmer-subheading { font-family: 'Moulpali', serif; }
        .font-khmer-body { font-family: 'Hanuman', serif; }
        .font-khmer-label { font-family: 'Battambang', serif; }

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
          src="https://i.ytimg.com/vi/CuxmTJqpc0U/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLATfG4tgnF3ukmj8uUTa4jqHmynBA"
          alt="How to Build Systems to Actually Achieve Your Goals"
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
                    <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                    </button>
                  ) : (
                    <button onClick={() => handlePlay(section.body, index)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                      {audioStatus === 'loading' && playingSection === index ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.01 6.74 2.8L21 8"/><path d="M21 3v5h-5"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v14"/><path d="M22 10v3"/></svg>
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
                    <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                    </button>
                  ) : (
                    <button onClick={() => handlePlay(`${principle.title}. ${principle.body}`, `principle-en-${index}`)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                      {audioStatus === 'loading' && playingSection === `principle-en-${index}` ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.01 6.74 2.8L21 8"/><path d="M21 3v5h-5"/></svg>
                      ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v14"/><path d="M22 10v3"/></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v14"/><path d="M22 10v3"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
