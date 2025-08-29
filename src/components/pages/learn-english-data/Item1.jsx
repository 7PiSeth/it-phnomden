import React, { useState, useEffect } from 'react';

// SVG for the "play" speaker icon.
const SpeakerPlayIcon = ({ size = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${size} cursor-pointer text-blue-500 hover:text-blue-700 transition-colors`}>
    <path d="M13.5 4.5a.75.75 0 01.75.75v14.5a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V5.25a.75.75 0 01.75-.75h2.25zM6 6.75a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75zM17.25 9a.75.75 0 01.75-.75h2.25a.75.75 0 01.75.75v6a.75.75 0 01-.75.75h-2.25a.75.75 0 01-.75-.75V9z" />
  </svg>
);

// SVG for the "stop" speaker icon.
const SpeakerStopIcon = ({ size = 'w-5 h-5' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${size} cursor-pointer text-blue-500 hover:text-blue-700 transition-colors`}>
    <path fillRule="evenodd" d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" clipRule="evenodd" />
  </svg>
);

// Component that manages the play/stop toggle behavior for voice-over.
const VoiceToggle = ({ text, handleVoiceOver, selectedVoice }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  // Effect to update the state based on speech synthesis events.
  useEffect(() => {
    // A listener for when speech finishes.
    const onEnd = () => setIsPlaying(false);
    // A listener for when speech is canceled.
    const onCancel = () => setIsPlaying(false);

    // If an utterance exists, add event listeners.
    if (currentUtterance) {
      currentUtterance.addEventListener('end', onEnd);
      currentUtterance.addEventListener('cancel', onCancel);
    }

    // Cleanup function to remove event listeners when the component unmounts or utterance changes.
    return () => {
      if (currentUtterance) {
        currentUtterance.removeEventListener('end', onEnd);
        currentUtterance.removeEventListener('cancel', onCancel);
      }
    };
  }, [currentUtterance]);

  // Handle the click event to play or stop the voice-over.
  const handleClick = () => {
    if (isPlaying) {
      // If audio is playing, cancel it and update state.
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // If audio is not playing, start it.
      // Cancel any other current speech first.
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.speak(utterance);
      setCurrentUtterance(utterance);
      setIsPlaying(true);
    }
  };

  return (
    <span onClick={handleClick} className="ml-2">
      {isPlaying ? <SpeakerStopIcon /> : <SpeakerPlayIcon />}
    </span>
  );
};

// Main Item1 component that renders the motivational content in both English and Khmer.
const Item1 = () => {
  // State to manage the popover's visibility and content.
  const [popover, setPopover] = useState(null);
  // State to hold the list of available voices.
  const [voices, setVoices] = useState([]);
  // State for the currently selected voice.
  const [selectedVoice, setSelectedVoice] = useState(null);

  // useEffect hook to load voices when the component mounts.
  useEffect(() => {
    // This event fires when the list of voices is changed.
    // Some browsers load voices asynchronously.
    const onVoicesChanged = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter for English (en-US) voices
      const usEnglishVoices = allVoices.filter(voice => voice.lang === 'en-US');
      setVoices(usEnglishVoices);
      
      // Set the default voice to the voice at index 3 of the filtered US English voices,
      // with fallbacks if index 3 doesn't exist or no US English voices are found.
      const defaultVoice = usEnglishVoices[3] || usEnglishVoices[0] || allVoices[0];
      setSelectedVoice(defaultVoice);
    };

    // Add the event listener for voice changes.
    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
    // Call it immediately in case voices are already loaded.
    onVoicesChanged();

    // Cleanup function to remove the event listener.
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  // Function to handle the voice-over using the Web Speech API.
  const handleVoiceOver = (text) => {
    // Check if the browser supports the Web Speech API.
    if (!('speechSynthesis' in window)) {
      console.error('Web Speech API is not supported in this browser.');
      return;
    }

    // Stop any current speech before starting a new one.
    window.speechSynthesis.cancel();
    
    // Create a new utterance with the provided text
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set the selected voice from the component's state.
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.warn('No voice selected. Using the default browser voice.');
    }
    
    // Speak the utterance.
    window.speechSynthesis.speak(utterance);
  };

  // A structured array containing both English and Khmer translations for each point.
  const motivationContent = [
    {
      en_title: '1% Daily Improvement',
      en_body: 'Instead of striving for huge leaps, focus on becoming 1% better each day. These small, consistent improvements compound over time, leading to massive transformation.',
      km_title: '១% ការកែលម្អប្រចាំថ្ងៃ',
      km_body: 'ជំនួសឱ្យការខិតខំដើម្បីការលោតផ្លោះដ៏ធំ សូមផ្តោតលើការកែលម្អខ្លួនឯង ១% ជា រៀងរាល់ថ្ងៃ។ ការកែលម្អតូចៗទាំងនេះនឹងប្រមូលផ្តុំទៅតាមពេលវេលា ដោយនាំឱ្យមានការផ្លាស់ប្តូរដ៏ធំ។',
      hardWords: {
        'striving': 'ខិតខំ',
        'consistent': 'ជាប់លាប់',
        'transformation': 'ការផ្លាស់ប្តូរ'
      }
    },
    {
      en_title: 'Start Small, Think Big',
      en_body: 'Don\'t be overwhelmed by big goals. Begin with small, manageable steps to build momentum and habits, while always keeping a larger vision in mind to guide your progress. This strategy helps overcome fear of failure.',
      km_title: 'ចាប់ផ្តើមពីតូច គិតឱ្យធំ',
      km_body: 'កុំភ័យខ្លាចដោយគោលដៅធំៗ។ ចាប់ផ្តើមដោយជំហានតូចៗដែលអាចគ្រប់គ្រងបាន ដើម្បីបង្កើតសន្ទុះ និងទម្លាប់ ខណៈពេលដែលរក្សាបាននូវចក្ខុវិស័យធំជាងមុន ដើម្បីណែនាំវឌ្ឍនភាពរបស់អ្នក។ យុទ្ធសាស្ត្រនេះជួយយកឈ្នះការភ័យខ្លាចបរាជ័យ។',
      hardWords: {
        'overwhelmed': 'មានអារម្មណ៍ភ័យខ្លាច',
        'momentum': 'សន្ទុះ',
        'habits': 'ទម្លាប់'
      }
    },
    {
      en_title: 'Daily Decisions for 1% Better',
      en_body: 'View daily improvement as a conscious choice. These small daily decisions, like reading for five extra minutes or drinking more water, build up over time and create a habit of growth.',
      km_title: 'ការសម្រេចចិត្តប្រចាំថ្ងៃសម្រាប់១% កាន់តែប្រសើរ',
      km_body: 'ចាត់ទុកការកែលម្អប្រចាំថ្ងៃជាជម្រើសដឹងខ្លួន។ ការសម្រេចចិត្តប្រចាំថ្ងៃតូចៗទាំងនេះ ដូចជាការអានរយៈពេលប្រាំនាទីបន្ថែម ឬផឹកទឹកបន្ថែម នឹងបង្កើតទម្លាប់នៃការរីកចម្រើន។',
      hardWords: {
        'view': 'ចាត់ទុក',
        'conscious': 'ដឹងខ្លួន',
        'choice': 'ជម្រើស'
      }
    },
    {
      en_title: 'Habits as the Foundation of Success',
      en_body: 'Success isn\'t about grand achievements, but rather the small, consistent choices driven by your habits. Habits are behaviors repeated until they become automatic, and they can be changed and built upon through clarity, consistency, and making them easy.',
      km_title: 'ទម្លាប់ជាមូលដ្ឋានគ្រឹះនៃភាពជោគជ័យ',
      km_body: 'ភាពជោគជ័យមិនមែននិយាយពីសមិទ្ធផលដ៏អស្ចារ្យនោះទេ ប៉ុន្តែវាជាជម្រើសតូចៗ ដែលជំរុញដោយទម្លាប់របស់អ្នក។ ទម្លាប់គឺជាអាកប្បកិរិយាដែលធ្វើម្តងហើយម្តងទៀតរហូតដល់វាស្វ័យប្រវត្តិ ហើយពួកវាអាចផ្លាស់ប្តូរ និងកសាងបានតាមរយៈភាពច្បាស់លាស់ ភាពជាប់លាប់ និងការធ្វើឱ្យពួកគេងាយស្រួល។',
      hardWords: {
        'achievements': 'សមិទ្ធផល',
        'clarity': 'ភាពច្បាស់លាស់'
      }
    },
    {
      en_title: 'Ripple Effect of Small Wins',
      en_body: 'Acknowledge and celebrate small victories. These seemingly tiny achievements create momentum, build confidence, and lead to new, positive habits, eventually snowballing into extraordinary results.',
      km_title: 'ផលប៉ះពាក់រលកនៃជ័យជំនះតូចៗ',
      km_body: 'ទទួលស្គាល់ និងអបអរសាទរជ័យជំនះតូចៗ។ សមិទ្ធផលតូចៗទាំងនេះបង្កើតសន្ទុះ បង្កើនទំនុកចិត្ត និងនាំទៅរកទម្លាប់វិជ្ជមានថ្មីៗ ដែលទីបំផុតនាំទៅរកលទ្ធផលដ៏អស្ចារ្យ។',
      hardWords: {
        'acknowledge': 'ទទួលស្គាល់',
        'seemingly': 'ហាក់ដូចជា',
        'extraordinary': 'អស្ចារ្យ'
      }
    },
    {
      en_title: 'Discipline as a Secret Weapon',
      en_body: 'Discipline is the ability to stay committed to what matters, keeping promises to yourself. It\'s like a muscle that strengthens with consistent use through small daily decisions. The discomfort of discipline is minor compared to the pain of regret, and it builds self-respect and enables you to be your best self.',
      km_title: 'វិន័យជាអាវុធសម្ងាត់',
      km_body: 'វិន័យគឺជាសមត្ថភាពក្នុងការរក្សាការប្តេជ្ញាចិត្តចំពោះអ្វីដែលសំខាន់ចំពោះអ្នក ដោយរក្សាការសន្យាចំពោះខ្លួនឯង។ វាប្រៀបដូចជាសាច់ដុំដែលរឹងមាំជាមួយនឹងការប្រើប្រាស់ជាប់លាប់តាមរយៈការសម្រេចចិត្តតូចៗប្រចាំថ្ងៃ។ ភាពមិនស្រួលនៃវិន័យគឺតូចតាចបើប្រៀបធៀបទៅនឹងការឈឺចាប់នៃការសោកស្តាយ ហើយវាបង្កើតការគោរពខ្លួនឯង និងអនុញ្ញាតឱ្យអ្នកក្លាយជាខ្លួនឯងដ៏ល្អបំផុត។',
      hardWords: {
        'discipline': 'វិន័យ',
        'strengthens': 'រឹងមាំ',
        'regret': 'ការសោកស្តាយ'
      }
    },
    {
      en_title: 'Why Most People Quit Too Soon',
      en_body: 'Many people quit right before a breakthrough due to impatience and a lack of faith when progress slows. Success is not linear and requires persistence through tough, slow periods. Trust the process, as efforts may not show immediate results, much like a Chinese bamboo tree\'s growth.',
      km_title: 'ហេតុអ្វីបានជាមនុស្សភាគច្រើនបោះបង់លឿនពេក',
      km_body: 'មនុស្សជាច្រើនបោះបង់ចោលភ្លាមៗមុនពេលជោគជ័យដោយសារតែការអត់ធ្មត់ និងការបាត់បង់ជំនឿ នៅពេលដែលវឌ្ឍនភាពថយចុះ។ ភាពជោគជ័យមិនមែនជាបន្ទាត់ត្រង់ទេ ហើយទាមទារការតស៊ូឆ្លងកាត់រយៈពេលដ៏លំបាក និងយឺត។ ជឿជាក់លើដំណើរការ ព្រោះការខិតខំប្រឹងប្រែងប្រហែលជាមិនបង្ហាញលទ្ធផលភ្លាមៗនោះទេ ដូចជាការលូតលាស់ដើមឫស្សីចិនអីចឹង។',
      hardWords: {
        'breakthrough': 'ការសម្រេចចិត្ត',
        'impatience': 'ការអត់ធ្មត់',
        'persistence': 'ការតស៊ូ'
      }
    },
    {
      en_title: 'Turning Obstacles into Opportunities',
      en_body: 'Successful individuals view challenges as opportunities to learn, grow, and strengthen themselves rather than roadblocks. This mindset shift transforms you from a victim of circumstance into the creator of your own destiny, building resilience and confidence for future success.',
      km_title: 'ការប្រែក្លាយឧបសគ្គទៅជាឱកាស',
      km_body: 'បុគ្គលជោគជ័យមើលឃើញឧបសគ្គជាឱកាសដើម្បីរៀន រីកចម្រើន និងពង្រឹងខ្លួនឯង ជាជាងការស្ទះ។ ការផ្លាស់ប្តូរផ្នត់គំនិតនេះផ្លាស់ប្តូរអ្នកពីជនរងគ្រោះនៃកាលៈទេសៈ ទៅជាអ្នកបង្កើតជោគវាសនាផ្ទាល់ខ្លួនរបស់អ្នក ដោយកសាងភាពធន់ និងទំនុកចិត្តសម្រាប់ភាពជោគជ័យនាពេលអនាគត។',
      hardWords: {
        'roadblocks': 'ឧបសគ្គ',
        'resilience': 'ភាពធន់',
        'destiny': 'វាសនា'
      }
    },
  ];

  // Utility function to render a sentence with a clickable "hard word" span.
  const renderBody = (text, hardWords) => {
    // Splits the text into words and punctuation while preserving delimiters.
    const parts = text.split(/(\b)/).filter(Boolean);
  
    return parts.map((part, index) => {
      // Trim to get the actual word without surrounding spaces
      const cleanedPart = part.trim().toLowerCase();
      
      // Check if the cleaned part is a "hard word".
      if (hardWords[cleanedPart]) {
        return (
          // Renders a clickable span with a pointer cursor.
          <span
            key={index}
            className="cursor-pointer underline-dashed-custom"
            onClick={(e) => {
              // Stop propagation to prevent the popover from immediately closing
              e.stopPropagation(); 
              // Get the position of the clicked element relative to the viewport
              const rect = e.target.getBoundingClientRect();
              // Set the popover state with word info and the calculated position
              setPopover({
                word: part,
                translation: hardWords[cleanedPart],
                // Calculate position relative to the viewport
                x: rect.left,
                y: rect.bottom,
              });
            }}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
    className="bg-slate-100 mt-2 min-h-screen p-4 sm:p-8 md:p-12 text-gray-800">

      {/* Embedded CSS for font loading and styling */}
      <style>
        {`
          /* Import English Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Lora:wght@400;700&family=Georgia&family=Open+Sans:wght@400;600&display=swap');
          
          /* Import Khmer Fonts (Option 1) */
          @import url('https://fonts.googleapis.com/css2?family=Moulpali&family=Chenla&family=Battambang&family=Suwannaphum&display=swap');

          /* Font classes based on user preference */
          .title-font {
            font-family: 'Roboto Slab', 'Moulpali', serif;
          }
          .subtitle-font {
            font-family: 'Lora', 'Chenla', serif;
          }
          .body-font {
            font-family: 'Georgia', 'Battambang', serif;
          }
          .caption-font {
            font-family: 'Open Sans', 'Suwannaphum', sans-serif;
          }
          
          /* Custom CSS for the dashed underline effect on hard words */
          .underline-dashed-custom {
            text-decoration: none;
            border-bottom: 1px dashed #6b7280;
          }
        `}
      </style>
      
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-blue-700 title-font">
          Improve Yourself 1% Every Day
        </h1>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700 title-font">
          Jim Rohn Motivation
        </h2>

        {/* Voice Selection Dropdown */}
        <div className="mb-8">
          <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-1">
            Choose Voice
          </label>
          <select
            id="voice-select"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition-colors body-font"
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
          >
            {voices.length > 0 ? (
              voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {`${voice.name} (${voice.lang})`}
                </option>
              ))
            ) : (
              <option disabled>Loading voices...</option>
            )}
          </select>
        </div>

        {/*
          Iterating over the content array to dynamically render each section.
          The parent div uses a grid layout that switches from a single column
          on small screens to a two-column layout on medium screens and up.
        */}
        {motivationContent.map((section, index) => (
          <section 
            key={index} 
            className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-b-2 border-gray-200 pb-8 last:border-b-0"
          >
            {/* Left column for English content with voice-over button */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-2 subtitle-font text-blue-700 flex items-center">
                {section.en_title}
                <VoiceToggle 
                  text={section.en_body} 
                  handleVoiceOver={handleVoiceOver} 
                  selectedVoice={selectedVoice} 
                />
              </h3>
              <p className="text-base leading-relaxed body-font">
                {renderBody(section.en_body, section.hardWords)}
              </p>
            </div>
            
            {/* Right column for Khmer content without voice-over */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-2 subtitle-font text-blue-700 flex items-center">
                {section.km_title}
              </h3>
              <p className="text-base leading-relaxed body-font">
                {section.km_body}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Conditional rendering of the popover with smooth fade transition */}
      {popover && (
        <div
          className="fixed inset-0 z-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setPopover(null)}
        >
          {/* Popover content positioned dynamically just below the word */}
          <div
            className="absolute bg-white p-4 rounded-lg shadow-xl border border-gray-200 text-center body-font"
            style={{
              top: `${popover.y + 10}px`, // Add a small buffer below the word
              left: `${popover.x}px`,
            }}
            onClick={(e) => e.stopPropagation()} // Prevents closing on click inside
          >
            <h4 className="text-lg font-bold mb-1 text-blue-700 capitalize">
              {popover.word}
            </h4>
            <p className="text-base text-gray-800">
              {popover.translation}
            </p>
            {/* Voice-over button for the hard word */}
            <button
              onClick={() => handleVoiceOver(popover.word)}
            >
              <SpeakerPlayIcon size="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item1;