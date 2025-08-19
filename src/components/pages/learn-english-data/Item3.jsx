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
const VoiceToggle = ({ text, selectedVoice }) => {
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


const Item3 = () => {
  // State to manage the popover's visibility and content.
  const [popover, setPopover] = useState(null);
  // State to hold the list of available voices.
  const [voices, setVoices] = useState([]);
  // State for the currently selected voice.
  const [selectedVoice, setSelectedVoice] = useState(null);

  // useEffect hook to load voices when the component mounts.
  useEffect(() => {
    // This event fires when the list of voices is changed.
    const onVoicesChanged = () => {
      // Filter for only English (US) voices.
      const availableVoices = window.speechSynthesis.getVoices().filter(voice => voice.lang === 'en-US');
      setVoices(availableVoices);

      // Set a default voice from the list, with fallbacks.
      const defaultVoice = availableVoices[3] || availableVoices.find(voice => voice.lang.includes('en-US')) || availableVoices[0];
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

  // Hard words and their Khmer translations, specifically for this essay.
  const hardWords = {
    'transformative': 'បំលែង',
    'diagnostics': 'ការវិនិច្ឆ័យ',
    'forecasting': 'ការព្យាករណ៍',
    'undeniable': 'មិនអាចប្រកែកបាន',
    'consideration': 'ការពិចារណា',
    'numerous': 'ជាច្រើន',
    'sectors': 'វិស័យ',
    'operational': 'ប្រតិបត្តិការ',
    'displacement': 'ការបាត់បង់',
    'traditionally': 'ជាប្រពៃណី',
    'repetitive': 'កើតឡើងម្តងហើយម្តងទៀត',
    'misinformation': 'ព័ត៌មានមិនពិត',
    'algorithmic': 'ក្បួនដោះស្រាយ',
    'manipulation': 'ការរៀបចំ',
    'remarkable': 'គួរឱ្យកត់សម្គាល់',
    'deployed': 'ដាក់ឱ្យប្រើប្រាស់',
    'undermining': 'ធ្វើឱ្យខូច'
  };

  const essayContent = [
    {
      en: "In recent years, artificial intelligence (AI) has become one of the most transformative technologies in the modern world. From virtual assistants and self-driving cars to medical diagnostics and financial forecasting, AI is reshaping how we live and work. While its benefits are undeniable, it also raises concerns that deserve careful consideration.",
      km: "ក្នុងប៉ុន្មានឆ្នាំថ្មីៗនេះ បញ្ញាសិប្បនិម្មិត (AI) បានក្លាយជាបច្ចេកវិទ្យាដ៏មានឥទ្ធិពលបំផុតមួយនៅក្នុងពិភពលោកសម័យទំនើប។ ចាប់ពីជំនួយការនិម្មិត និងរថយន្តបើកបរដោយខ្លួនឯង រហូតដល់ការវិនិច្ឆ័យវេជ្ជសាស្ត្រ និងការព្យាករណ៍ហិរញ្ញវត្ថុ AI កំពុងកែប្រែរបៀបដែលយើងរស់នៅ និងធ្វើការ។ ខណៈពេលដែលអត្ថប្រយោជន៍របស់វាគឺមិនអាចប្រកែកបាន វាក៏បានបង្កើនការព្រួយបារម្ភដែលសមនឹងទទួលបានការពិចារណាដោយប្រុងប្រយ័ត្ន។"
    },
    {
      en: "On the one hand, AI offers numerous advantages across various sectors. In healthcare, AI can analyze vast amounts of medical data to detect diseases early and recommend effective treatments, potentially saving countless lives. In industries such as manufacturing and logistics, AI-powered automation enhances efficiency, reduces human error, and lowers operational costs. Furthermore, AI improves daily life through smart Item3lications like voice recognition, personalized recommendations, and language translation, making tasks easier and more accessible.",
      km: "ម្យ៉ាងវិញទៀត AI ផ្ដល់អត្ថប្រយោជន៍ជាច្រើននៅទូទាំងវិស័យផ្សេងៗ។ នៅក្នុងវិស័យថែទាំសុខភាព AI អាចវិភាគទិន្នន័យវេជ្ជសាស្ត្រដ៏ច្រើនសន្ធឹកសន្ធាប់ដើម្បីរកឃើញជំងឺបានឆាប់រហ័ស និងណែនាំការព្យាបាលប្រកបដោយប្រសិទ្ធភាព ដែលអាចជួយសង្គ្រោះជីវិតមនុស្សរាប់មិនអស់។ នៅក្នុងឧស្សាហកម្មដូចជាការផលិត និងដឹកជញ្ជូនស្វ័យប្រវត្តិកម្មដែលដំណើរការដោយ AI ជួយបង្កើនប្រសិទ្ធភាព កាត់បន្ថយកំហុសរបស់មនុស្ស និងបន្ថយថ្លៃដើមប្រតិបត្តិការ។ លើសពីនេះ AI ធ្វើឱ្យជីវិតប្រចាំថ្ងៃកាន់តែប្រសើរឡើងតាមរយៈកម្មវិធីឆ្លាតវៃដូចជា ការសម្គាល់សំឡេង ការណែនាំផ្ទាល់ខ្លួន និងការបកប្រែភាសា ដែលធ្វើឱ្យកិច្ចការកាន់តែងាយស្រួល និងអាចចូលប្រើបាន។"
    },
    {
      en: "However, the rise of AI also presents significant drawbacks. One major concern is job displacement. As machines and algorithms become capable of performing tasks traditionally done by humans, many workers, especially in repetitive or manual roles, risk unemployment. Moreover, AI systems often rely on large datasets, raising issues related to privacy and data security. Another worrying aspect is the potential misuse of AI, such as in surveillance, autonomous weapons, or the spread of misinformation through deepfakes and algorithmic manipulation.",
      km: "ទោះជាយ៉ាងណាក៏ដោយ ការកើនឡើងនៃ AI ក៏មានគុណវិបត្តិសំខាន់ៗផងដែរ។ ការព្រួយបារម្ភដ៏ធំមួយគឺការបាត់បង់ការងារ។ នៅពេលដែលម៉ាស៊ីន និងក្បួនដោះស្រាយមានសមត្ថភាពក្នុងការអនុវត្តកិច្ចការដែលមនុស្សធ្លាប់ធ្វើជាប្រពៃណី អ្នកធ្វើការជាច្រើន ជាពិសេសក្នុងតួនាទីដែលកើតឡើងម្តងហើយម្តងទៀត ឬការងារដោយដៃ គឺប្រឈមនឹងភាពគ្មានការងារធ្វើ។ លើសពីនេះ ប្រព័ន្ធ AI តែងតែពឹងផ្អែកលើសំណុំទិន្នន័យធំៗ ដែលបង្កឱ្យមានបញ្ហាទាក់ទងនឹងភាពឯកជន និងសុវត្ថិភាពទិន្នន័យ។ ទិដ្ឋភាពគួរឱ្យព្រួយបារម្ភមួយទៀតគឺការប្រើប្រាស់ AI ខុសដូចជាក្នុងការឃ្លាំមើល អាវុធស្វយ័ត ឬការរីករាលដាលនៃព័ត៌មានមិនពិតតាមរយៈ deepfakes និងការរៀបចំក្បួនដោះស្រាយ។"
    },
    {
      en: "In conclusion, artificial intelligence brings both remarkable opportunities and serious challenges. While its ability to enhance productivity and solve complex problems is impressive, it must be developed and deployed responsibly. Governments, companies, and individuals must work together to ensure that AI serves humanity, rather than undermining social and ethical values.",
      km: "សរុបមក បញ្ញាសិប្បនិម្មិតនាំមកនូវឱកាសដ៏អស្ចារ្យ និងបញ្ហាប្រឈមដ៏ធ្ងន់ធ្ងរ។ ខណៈពេលដែលសមត្ថភាពរបស់វាក្នុងការបង្កើនផលិតភាព និងដោះស្រាយបញ្ហាស្មុគស្មាញគឺគួរឱ្យចាប់អារម្មណ៍ វាត្រូវតែត្រូវបានអភិវឌ្ឍ និងដាក់ឱ្យប្រើប្រាស់ប្រកបដោយការទទួលខុសត្រូវ។ រដ្ឋាភិបាល ក្រុមហ៊ុន និងបុគ្គលម្នាក់ៗត្រូវតែធ្វើការជាមួយគ្នាដើម្បីធានាថា AI បម្រើមនុស្សជាតិ ជាជាងការធ្វើឱ្យខូចតម្លៃសង្គម និងសីលធម៌។"
    }
  ];

  // Utility function to render a sentence with a clickable "hard word" span.
  const renderBody = (text) => {
    // Splits the text into words by spaces.
    const words = text.split(' ');
    const renderedParts = words.flatMap((word, index) => {
        // Find if the word (without punctuation) is a hard word.
        const cleanedWord = word.replace(/[.,!?]/g, '').toLowerCase();
        
        // Check if the cleaned part is a "hard word".
        if (hardWords[cleanedWord]) {
            return [
                <span
                    key={index}
                    className="cursor-pointer underline-dashed-custom"
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.target.getBoundingClientRect();
                      setPopover({
                        word: word,
                        translation: hardWords[cleanedWord],
                        x: rect.left + (rect.width / 2),
                        y: rect.bottom,
                      });
                    }}
                >
                    {word}
                </span>,
                // Add a space after the word, unless it's the last word.
                ...(index < words.length - 1 ? [' '] : [])
            ];
        } else {
            return [
                <span key={index}>{word}</span>,
                ...(index < words.length - 1 ? [' '] : [])
            ];
        }
    });

    return renderedParts;
  };

  return (
    <div 
    className="bg-slate-100 min-h-screen p-4 sm:p-8 md:p-12 text-gray-800">
      {/* Embedded CSS for font loading and styling based on user preferences */}
      <style>
        {`
          /* Import English Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Lora:wght@400;700&family=Georgia&family=Open+Sans:wght@400;600&display=swap');

          /* Import Khmer Fonts (Option 1 - Default) */
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

          /* Custom CSS for the dashed underline effect on hard words */
          .underline-dashed-custom {
            text-decoration: none;
            border-bottom: 1px dashed #6b7280;
          }
        `}
      </style>
      
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
        {/* Title and Subtitle Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold mb-2 text-blue-700 title-font">
              Artificial Intelligence: <br/> A Double-Edged Sword
            </h2>
            <h3 className="text-xl font-bold mb-6 text-gray-500 subtitle-font">
              IELTS Band 9 Model Essay
            </h3>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-3xl font-extrabold mb-2 text-blue-700 title-font">
              បញ្ញាសិប្បនិម្មិត៖ <br/>ដាវមុខពីរ
            </h2>
            <h3 className="text-xl font-bold mb-6 text-gray-500 subtitle-font">
              អត្ថបទគំរូ IELTS Band 9
            </h3>
          </div>
        </div>

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

        {/* Essay Content Section */}
        <div>
          {essayContent.map((paragraph, index) => (
            <div key={index} className="flex flex-col md:flex-row mb-6 gap-4">
              {/* English Content */}
              <div className="flex-1 flex items-start">
                <p className="text-base leading-relaxed body-font pr-4">
                  {renderBody(paragraph.en)}
                </p>
                <VoiceToggle text={paragraph.en} selectedVoice={selectedVoice} />
              </div>

              {/* Khmer Content */}
              <div className="flex-1">
                <p className="text-base leading-relaxed body-font">
                  {paragraph.km}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conditional rendering of the popover with smooth fade transition */}
      {popover && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setPopover(null)}
        >
          {/* Popover content positioned dynamically just below the word */}
          <div
            className="absolute bg-white p-4 rounded-lg shadow-xl border border-gray-200 text-center body-font -translate-x-1/2"
            style={{
              top: `${popover.y + 10}px`,
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
              onClick={() => {
                if (!('speechSynthesis' in window)) {
                  console.error('Web Speech API is not supported in this browser.');
                  return;
                }
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(popover.word);
                if (selectedVoice) {
                  utterance.voice = selectedVoice;
                } else {
                  console.warn('No voice selected. Using the default browser voice.');
                }
                window.speechSynthesis.speak(utterance);
              }}
            >
              <SpeakerPlayIcon size="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item3;
