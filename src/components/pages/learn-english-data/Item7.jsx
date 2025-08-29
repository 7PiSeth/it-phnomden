import React, { useState, useEffect, useRef } from 'react';

// The component is designed to be self-contained and does not rely on external icon libraries.
// I've used inline SVG icons to ensure it renders correctly in this environment, as previously discussed.

// PlayIcon icon component
const PlayIcon = ({ className = "h-12 w-12 text-blue-500" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 10.5v3" />
    <path d="M6 6v12" />
    <path d="M10 3v18" />
    <path d="M14 8v8" />
    <path d="M18 5v14" />
    <path d="M22 10.5v3" />
  </svg>
);

// PauseIcon icon component (included but not used in the current implementation)
const PauseIcon = ({ className = "h-12 w-12 text-orange-500" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M10 15V9" />
    <path d="M14 15V9" />
  </svg>
);

// StopIcon icon component
const StopIcon = ({ className = "h-12 w-12 text-red-500" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
);

// Inline SVG for the volume icon
const VolumeUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);


// Define hard words and their Khmer translations for the new content
const hardWords = {
  'puzzle': 'ល្បែងផ្គុំរូប',
  'stumble': 'ជំពប់ដួល',
  'heartbreak': 'ការឈឺចាប់',
  'loneliness': 'ការឯកោ',
  'doubts': 'ការសង្ស័យ',
  'smooth': 'រលូន',
  'embrace': 'ទទួលយក',
  'perfection': 'ភាពល្អឥតខ្ចោះ',
  'connection': 'ទំនាក់ទំនង',
  'uncomfortable': 'មិនស្រណុកចិត្ត',
  'complementing': 'បំពេញឱ្យគ្នា',
  'scars': 'ស្នាមរបួស',
  'commitment': 'ការប្ដេជ្ញាចិត្ត',
  'stepping stones': 'ក្ដារសម្រាប់ដើរ',
  'chasing': 'ដេញតាម',
  'forcing': 'បង្ខិតបង្ខំ',
  'vulnerable': 'ងាយរងគ្រោះ',
  'authentic': 'ស្មោះត្រង់',
  'resilience': 'ភាពរឹងមាំ',
  'patience': 'ការអត់ធ្មត់',
  'venture': 'ការផ្សងព្រេង',
  'intuition': 'វិចារណញ្ញាណ',
  'serenity': 'ភាពស្ងប់ស្ងាត់',
  'evolve': 'វិវឌ្ឍ',
  'cherish': 'ស្រឡាញ់',
  'destiny': 'វាសនា',
  'unwavering': 'មិនងាករេ',
  'illuminate': 'បំភ្លឺ',
  'gratitude': 'អំណរគុណ',
  'synchronicity': 'ស៊ីសង្វាក់គ្នា',
  'unconditional': 'គ្មានលក្ខខណ្ឌ',
  'compromise': 'ការសម្របសម្រួល',
  'nurture': 'ថែរក្សា',
  'flaws': 'កំហុស',
  'vows': 'ពាក្យសច្ចា',
  'eternity': 'ភាពអស់កល្ប',
  'sacrifice': 'ការលះបង់',
  'adversity': 'ឧបសគ្គ',
  'flourish': 'រីកចម្រើន',
  'legacy': 'កេរដំណែល',
  'transformative': 'ផ្លាស់ប្ដូរ',
  'affection': 'ក្ដីស្រឡាញ់',
  'compassion': 'មេត្តា',
  'empathy': 'ការយល់ចិត្ត',
  'forgiveness': 'ការអភ័យទោស',
  'vulnerability': 'ភាពងាយរងគ្រោះ',
  'radiate': 'បញ្ចេញពន្លឺ',
  'reciprocity': 'ទៅវិញទៅមក',
  'harmony': 'ភាពសុខដុម',
};

// Data structure for the article content, separated by language
const contentData = [
  {
    english: {
      heading: 'One Day You’re Going To Meet Someone And Everything Will Make Sense',
      body: 'Life often feels like a puzzle with missing pieces. We search, we stumble, and we sometimes wonder if love is really meant for us. Along the way, we face heartbreak, loneliness, and doubts that cloud our hearts. But one day, you’re going to meet someone—and suddenly, everything will begin to make sense.',
    },
    khmer: {
      heading: 'ថ្ងៃមួយ អ្នកនឹងជួបនរណាម្នាក់ ហើយអ្វីៗនឹងក្លាយជាការពិត',
      body: 'ជីវិតជារឿយៗប្រៀបដូចជាល្បែងផ្គុំរូបដែលបាត់បង់បំណែក។ យើងស្វែងរក យើងជំពប់ដួល ហើយជួនកាលយើងឆ្ងល់ថាតើស្នេហាពិតជាមានសម្រាប់យើងឬអត់។ តាមផ្លូវ យើងប្រឈមមុខនឹងការឈឺចាប់ ការឯកោ និងការសង្ស័យដែលធ្វើឲ្យចិត្តយើងអាប់អួរ។ ប៉ុន្តែថ្ងៃមួយ អ្នកនឹងជួបនរណាម្នាក់—ហើយភ្លាមៗនោះ អ្វីៗនឹងចាប់ផ្ដើមមានន័យ។',
    },
  },
  {
    english: {
      heading: 'The Right Person at the Right Time',
      body: 'The journey to love is rarely smooth. We meet people who teach us lessons, sometimes through joy and sometimes through pain. These experiences prepare us for the right one—the person who enters our life at the moment when we’re ready to embrace love fully. When that day comes, you’ll realize why the wrong ones never stayed.',
    },
    khmer: {
      heading: 'មនុស្សត្រឹមត្រូវនៅពេលវេលាត្រឹមត្រូវ',
      body: 'ដំណើរឆ្ពោះទៅរកស្នេហាមិនសូវរលូនទេ។ យើងជួបមនុស្សដែលបង្រៀនយើងនូវមេរៀន ពេលខ្លះតាមរយៈក្ដីរីករាយ និងពេលខ្លះតាមរយៈការឈឺចាប់។ បទពិសោធន៍ទាំងនេះរៀបចំយើងសម្រាប់មនុស្សត្រឹមត្រូវ ដែលជាមនុស្សដែលចូលមកក្នុងជីវិតរបស់យើងនៅពេលដែលយើងត្រៀមខ្លួនទទួលយកស្នេហាពេញលេញ។ នៅពេលថ្ងៃនោះមកដល់ អ្នកនឹងដឹងថាហេតុអ្វីបានជាមនុស្សខុសមិនដែលនៅ។',
    },
  },
  {
    english: {
      heading: 'Love That Feels Like Home',
      body: 'When you meet that person, it won’t be about perfection—it will be about connection. Conversations will flow easily, laughter will come naturally, and silence won’t feel uncomfortable. You’ll feel understood in ways you never imagined. Their presence will give you peace, like coming home after being lost for too long.',
    },
    khmer: {
      heading: 'ស្នេហាដែលប្រៀបដូចជាផ្ទះ',
      body: 'ពេលអ្នកជួបមនុស្សនោះ វាមិនមែននិយាយអំពីភាពល្អឥតខ្ចោះទេ ប៉ុន្តែវានឹងនិយាយអំពីទំនាក់ទំនង។ ការសន្ទនានឹងហូរដោយងាយស្រួល សំណើចនឹងកើតឡើងដោយធម្មជាតិ ហើយភាពស្ងៀមស្ងាត់នឹងមិនធ្វើឱ្យអ្នកមិនស្រណុកចិត្តឡើយ។ អ្នកនឹងមានអារម្មណ៍ថាត្រូវបានគេយល់ក្នុងវិធីដែលអ្នកមិនធ្លាប់ស្រមៃ។ វត្តមានរបស់ពួកគេនឹងផ្ដល់ឱ្យអ្នកនូវសន្តិភាព ដូចជាបានត្រឡប់មកផ្ទះវិញបន្ទាប់ពីបានវង្វេងជាយូរមកហើយ។',
    },
  },
  {
    english: {
      heading: 'Filling the Missing Pieces',
      body: 'True love is not about completing each other, but about complementing one another. The right person will not erase your scars, but they will hold your hand as you heal. They’ll fill the spaces in your life with care, honesty, respect, and trust. With them, you’ll learn that love is about standing together, even in the hardest storms, and supporting one another through life’s challenges.',
    },
    khmer: {
      heading: 'បំពេញបំណែកដែលបាត់បង់',
      body: 'ស្នេហាពិតមិនមែននិយាយអំពីការបំពេញឱ្យគ្នាទៅវិញទៅមកទេ ប៉ុន្តែនិយាយអំពីការបំពេញបន្ថែមគ្នាទៅវិញទៅមក។ មនុស្សត្រឹមត្រូវនឹងមិនលុបបំបាត់ស្នាមរបួសរបស់អ្នកទេ ប៉ុន្តែពួកគេនឹងកាន់ដៃអ្នកនៅពេលអ្នកជាសះស្បើយ។ ពួកគេនឹងបំពេញចន្លោះក្នុងជីវិតរបស់អ្នកដោយក្ដីស្រឡាញ់ ភាពស្មោះត្រង់ ការគោរព និងការជឿទុកចិត្ត។ ជាមួយពួកគេ អ្នកនឹងរៀនថាស្នេហាគឺនិយាយអំពីការឈរជាមួយគ្នា ទោះបីជាក្នុងព្យុះដ៏លំបាកបំផុតក៏ដោយ និងការគាំទ្រគ្នាទៅវិញទៅមកក្នុងបញ្ហាប្រឈមនៃជីវិត។',
    },
  },
  {
    english: {
      heading: 'Building a Future Together',
      body: 'Love is not just about the present moment—it’s about building something lasting. When you meet the right person, you’ll share dreams, make plans, and face the unknown together. You’ll discover that love isn’t just a feeling, but a commitment to grow, to learn, and to create a future side by side.',
    },
    khmer: {
      heading: 'កសាងអនាគតជាមួយគ្នា',
      body: 'ស្នេហាមិនមែនគ្រាន់តែនិយាយអំពីបច្ចុប្បន្នទេ ប៉ុន្តែវាគឺនិយាយអំពីការកសាងអ្វីមួយដែលស្ថិតស្ថេរ។ នៅពេលអ្នកជួបមនុស្សត្រឹមត្រូវ អ្នកនឹងចែករំលែកក្ដីសុបិន ធ្វើផែនការ និងប្រឈមមុខនឹងភាពមិនស្គាល់ជាមួយគ្នា។ អ្នកនឹងរកឃើញថាស្នេហាមិនមែនគ្រាន់តែជាអារម្មណ៍ទេ ប៉ុន្តែជាការប្ដេជ្ញាចិត្តដើម្បីលូតលាស់ រៀនសូត្រ និងបង្កើតអនាគតជាមួយគ្នា។',
    },
  },
  {
    english: {
      heading: 'Why Everything Will Make Sense',
      body: 'Looking back, you’ll understand why it didn’t work out with anyone else. The heartbreaks will no longer feel like wasted time but stepping stones leading you to the right path. Every tear, every disappointment, every goodbye was shaping you for this person—the one who finally shows you what real love means. ✨ One day, you’ll meet someone who will make you realize that love is not about chasing or forcing—it’s about finding peace, trust, and a shared heartbeat. And when that happens, you’ll see that everything you went through was worth it.',
    },
    khmer: {
      heading: 'ហេតុអ្វីបានជាអ្វីៗនឹងមានន័យ',
      body: 'ក្រឡេកមើលទៅក្រោយ អ្នកនឹងយល់ថាហេតុអ្វីបានជាវាមិនបានសម្រេចជាមួយអ្នកដទៃ។ ការឈឺចាប់នឹងលែងមានអារម្មណ៍ដូចជាការខ្ជះខ្ជាយពេលវេលាទៀតហើយ ប៉ុន្តែវាគឺជាក្ដារសម្រាប់ដើរនាំអ្នកទៅកាន់ផ្លូវត្រឹមត្រូវ។ ទឹកភ្នែកគ្រប់ដំណក់ ការខកចិត្តគ្រប់យ៉ាង ការលាគ្នាគ្រប់ពេលគឺកំពុងរៀបចំអ្នកសម្រាប់មនុស្សម្នាក់នេះ ដែលជាអ្នកដែលទីបំផុតបង្ហាញអ្នកថាតើស្នេហាពិតមានន័យយ៉ាងណា។ ✨ ថ្ងៃមួយ អ្នកនឹងជួបនរណាម្នាក់ដែលនឹងធ្វើឱ្យអ្នកដឹងថាស្នេហាមិនមែននិយាយអំពីការដេញតាមឬការបង្ខិតបង្ខំទេ ប៉ុន្តែវាគឺនិយាយអំពីការស្វែងរកសន្តិភាព ទំនុកចិត្ត និងចង្វាក់បេះដូងរួម។ ហើយនៅពេលនោះកើតឡើង អ្នកនឹងឃើញថាអ្វីគ្រប់យ៉ាងដែលអ្នកបានឆ្លងកាត់គឺស័ក្តិសម។',
    },
  },
];

// Array of image sources from user uploads
const images = [
  "https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg",
"https://images.pexels.com/photos/2407455/pexels-photo-2407455.jpeg",
"https://images.pexels.com/photos/3089874/pexels-photo-3089874.jpeg",
"https://images.pexels.com/photos/6563406/pexels-photo-6563406.jpeg",
"https://images.pexels.com/photos/8204486/pexels-photo-8204486.jpeg",
"https://images.pexels.com/photos/19838627/pexels-photo-19838627.jpeg",
"https://images.pexels.com/photos/2407455/pexels-photo-2407455.jpeg",
"https://images.pexels.com/photos/6818587/pexels-photo-6818587.jpeg",
];

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [speakingSectionId, setSpeakingSectionId] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: '', translation: '', x: 0, y: 0 });
  const popupRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect to handle image slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Effect to check for mobile on initial load and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Effect to get and set voices from the SpeechSynthesis API
  useEffect(() => {
    const getVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const usEnglishVoices = allVoices.filter(voice => voice.lang === 'en-US');
      setVoices(usEnglishVoices);
    };

    // The voicesChanged event is not supported by all browsers, so we call getVoices initially
    // and then listen for the event as a fallback/update mechanism.
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = getVoices;
      getVoices(); // Call initially in case voices are already loaded
    }
  }, []); // Note: No dependencies here to prevent infinite loop

  // New Effect to handle voice selection after voices are loaded
  useEffect(() => {
    // This effect runs whenever the 'voices' state is updated, ensuring the list is available.
    if (voices.length > 0) {
      // Set default voice based on user preference
      const samanthaVoice = voices.find(v => v.name.includes('Samantha'));
      if (isMobile && samanthaVoice) {
        setSelectedVoice(samanthaVoice);
      } else {
        setSelectedVoice(voices[3]); // 4th voice in the list
      }
    }
  }, [voices, isMobile]);

  // Handle voice-over for sections
  const handleVoiceOver = (id, text) => {
    // If the same section is clicked, stop the audio
    if (speakingSectionId === id) {
      window.speechSynthesis.cancel();
      setSpeakingSectionId(null);
      return;
    }

    // Stop any currently speaking audio
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    // Create a new utterance and speak
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.onend = () => {
      setSpeakingSectionId(null); // Clear the active state when finished
    };
    window.speechSynthesis.speak(utterance);
    setSpeakingSectionId(id);
  };

  // Split a string by words and check for hard words
  const renderEnglishText = (text) => {
    const words = text.split(/(\s+|[,.\?!—])/);
    let wordIndex = 0;
    return words.map((word, index) => {
      // Check if the word is a hard word
      const trimmedWord = word.trim().toLowerCase().replace(/[,.\?!—]/g, '');
      const isHardWord = Object.keys(hardWords).includes(trimmedWord);

      if (isHardWord) {
        return (
          <span
            key={index}
            className="hard-word"
            onClick={(e) => handleHardWordClick(e, trimmedWord)}
          >
            {word}
          </span>
        );
      }
      return <React.Fragment key={index}>{word}</React.Fragment>;
    });
  };

  // Handle hard word popup display
  const handleHardWordClick = (e, word) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const translation = hardWords[word];
    setPopupContent({
      word,
      translation,
      // Position the popup below the word
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setShowPopup(true);
  };

  // Handle hard word popup audio playback
  const handlePopupAudio = (text) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    window.speechSynthesis.speak(utterance);
  };

  // Close the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.closest('.hard-word')) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 font-english-body">
      {/* Image slideshow at the top of the screen */}
      <img
        src={images[currentImageIndex]}
        alt="A couple standing together, looking at the city skyline"
        className="mx-auto rounded-xl shadow-lg mb-8 w-screen h-[500px] object-cover transition-opacity duration-1000 ease-in-out"
      />

      {/* Voice selection dropdown */}
      <div className="mb-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-start sm:justify-start px-4">
        <label className="text-gray-700 font-english-label mb-2 sm:mb-0 mr-4">
          Select Voice:
        </label>
        <select
          value={selectedVoice ? selectedVoice.name : ''}
          onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value))}
          className="p-2 border border-gray-300 rounded-md shadow-sm w-full sm:w-auto font-english-label bg-white text-black"
        >
          {voices.length > 0 ? (
            voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))
          ) : (
            <option>Loading voices...</option>
          )}
        </select>
      </div>

      {/* Main content container for responsive layout */}
      <div className="max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden bg-white">
        {/* Render content in alternating English and Khmer sections */}
        {contentData.map((section, index) => (
          <React.Fragment key={index}>
            {/* English Section */}
            <div className="p-6 lg:p-10 space-y-8 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-english-subheading font-semibold text-gray-900">
                  {section.english.heading}
                </h2>
                <button
                  onClick={() => handleVoiceOver(index, `${section.english.heading}. ${section.english.body}`)}
                  className="p-2 rounded-full transition-colors duration-200"
                >
                  {speakingSectionId === index ? (
                    <StopIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <PlayIcon className="h-6 w-6 text-blue-500" />
                  )}
                </button>
              </div>
              <p className="font-english-body leading-relaxed text-gray-700 text-base">
                {renderEnglishText(section.english.body)}
              </p>
            </div>
            
            {/* Khmer Section */}
            <div className="p-6 lg:p-10 space-y-8 bg-gray-100 border-b border-gray-200">
              <h2 className="text-2xl font-khmer-subheading-style font-semibold text-gray-900">
                {section.khmer.heading}
              </h2>
              <p className="font-khmer-body-style leading-relaxed text-gray-700 whitespace-pre-line">
                {section.khmer.body}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Hard Word Popup */}
      {showPopup && (
        <div
          ref={popupRef}
          className="hard-word-popup"
          style={{ top: `${popupContent.y}px`, left: `${popupContent.x}px` }}
        >
          <div className="flex items-center space-x-2">
            <span className="font-khmer-label-style text-lg text-black">{popupContent.translation}</span>
            <button
              onClick={() => handlePopupAudio(popupContent.word)}
              className="p-1 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
            >
              <VolumeUpIcon size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS for hard word styling and popup positioning, now including font imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chenla&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nokora&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Hanuman&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Battambang&display=swap');
        
        .font-khmer-header-style {
          font-family: 'Chenla', cursive;
        }
        .font-khmer-subheading-style {
          font-family: 'Nokora', serif;
        }
        .font-khmer-body-style {
          font-family: 'Hanuman', serif;
        }
        .font-khmer-label-style {
          font-family: 'Battambang', serif;
        }

        .hard-word {
          border-bottom: 1px dashed #4b5563;
          cursor: pointer;
        }
        .hard-word-popup {
          position: absolute;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          padding: 1rem;
          z-index: 50;
          transform: translateX(-50%); /* This centers the popup horizontally */
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default App;