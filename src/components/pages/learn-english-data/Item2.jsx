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

// Main Item2 component that renders the mental models content.
const Item2 = () => {
  // State to manage the popover's visibility and content.
  const [popover, setPopover] = useState(null);
  // State to hold the list of available voices.
  const [voices, setVoices] = useState([]);
  // State for the currently selected voice.
  const [selectedVoice, setSelectedVoice] = useState(null);

  // useEffect hook to load voices and detect mobile status when the component mounts.
  useEffect(() => {
    // This event fires when the list of voices is changed.
    const onVoicesChanged = () => {
      // Filter for only English (US) voices on all devices.
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

  // A structured array containing the mental models content.
  const mentalModelsContent = [
    {
      en_title: 'Map is Not the Territory',
      en_body: 'This model teaches that the representation of reality is not reality itself. Even the best maps are imperfect because they are reductions of what they represent. Always ensure you understand the "territory" before making an important decision based only on the "map."',
      km_title: 'ផែនទីមិនមែនជាទឹកដីទេ',
      km_body: 'គំរូនេះបង្រៀនថា ការតំណាងនៃការពិតមិនមែនជាការពិតនោះទេ។ សូម្បីតែផែនទីដែលល្អបំផុតក៏មិនល្អឥតខ្ចោះដែរ ព្រោះវាជាការកាត់បន្ថយនៃអ្វីដែលពួកគេតំណាង។ ត្រូវប្រាកដថាអ្នកយល់ពី "ទឹកដី" មុនពេលធ្វើការសម្រេចចិត្តសំខាន់ដោយផ្អែកលើ "ផែនទី" តែប៉ុណ្ណោះ។',
      hardWords: {
        'representation': 'តំណាង',
        'imperfect': 'មិនល្អឥតខ្ចោះ',
        'reductions': 'ការកាត់បន្ថយ',
        'territory': 'ទឹកដី'
      }
    },
    {
      en_title: 'Circle of Competence',
      en_body: 'This is a simple model: each of us has a circle of competence, which is an area of useful knowledge. When making decisions, evaluate if it falls within your circle. If not, consult an expert who has that expertise.',
      km_title: 'រង្វង់នៃសមត្ថភាព',
      km_body: 'នេះគឺជាគំរូដ៏សាមញ្ញមួយ៖ យើងម្នាក់ៗមានរង្វង់នៃសមត្ថភាព ដែលជាផ្នែកនៃចំណេះដឹងមានប្រយោជន៍។ នៅពេលធ្វើការសម្រេចចិត្ត សូមវាយតម្លៃថាតើវាស្ថិតនៅក្នុងរង្វង់របស់អ្នកដែរឬទេ។ ប្រសិនបើមិនមែនទេ សូមពិគ្រោះជាមួយអ្នកជំនាញដែលមានជំនាញនោះ។',
      hardWords: {
        'competence': 'សមត្ថភាព',
        'expertise': 'ជំនាញ',
        'consult': 'ពិគ្រោះ',
        'evaluate': 'វាយតម្លៃ'
      }
    },
    {
      en_title: 'Second-Order Thinking',
      en_body: 'This involves thinking further ahead than the immediate consequences of your actions. It requires you to consider the consequences of those consequences. The "Cobra effect" is a famous example of this model in action.',
      km_title: 'ការគិតលំដាប់ទីពីរ',
      km_body: 'នេះពាក់ព័ន្ធនឹងការគិតទៅមុខទៀតជាងផលវិបាកភ្លាមៗនៃសកម្មភាពរបស់អ្នក។ វាទាមទារឱ្យអ្នកពិចារណាពីផលវិបាកនៃផលវិបាកទាំងនោះ។ "ផលប៉ះពាល់ពស់វែក" គឺជាឧទាហរណ៍ដ៏ល្បីល្បាញនៃគំរូនេះក្នុងសកម្មភាព។',
      hardWords: {
        'consequences': 'ផលវិបាក',
        'immediate': 'ភ្លាមៗ',
        'holistically': 'គ្រប់ជ្រុងជ្រោយ'
      }
    },
    {
      en_title: 'Probabilistic Thinking',
      en_body: 'Instead of viewing outcomes as black or white, this model encourages assigning a probability to an event happening. By using prior information and context, you can get a more accurate estimate of a situation, such as assessing a headline about rising crime.',
      km_title: 'ការគិតបែបប្រូបាប៊ីលីតេ',
      km_body: 'ជំនួសឱ្យការមើលឃើញលទ្ធផលថាជាខ្មៅឬស គំរូនេះលើកទឹកចិត្តឱ្យកំណត់ប្រូបាប៊ីលីតេដល់ព្រឹត្តិការណ៍ដែលកើតឡើង។ តាមរយៈការប្រើប្រាស់ព័ត៌មាន និងបរិបទពីមុន អ្នកអាចទទួលបានការប៉ាន់ប្រមាណត្រឹមត្រូវបន្ថែមទៀតនៃស្ថានភាពមួយ ដូចជាការវាយតម្លៃចំណងជើងអំពីការកើនឡើងនៃឧក្រិដ្ឋកម្ម។',
      hardWords: {
        'probabilistic': 'ប្រូបាប៊ីលីតេ',
        'estimate': 'ការប៉ាន់ប្រមាណ',
        'accurate': 'ត្រឹមត្រូវ',
        'assessing': 'វាយតម្លៃ'
      }
    },
    {
      en_title: 'Inversion',
      en_body: 'A powerful tool for problem-solving, inversion means approaching a situation from the opposite end. Instead of thinking about what success looks like, you think about what failure would look like and what might cause it. Then you set your goals to avoid those pitfalls.',
      km_title: 'ការបញ្ច្រាស',
      km_body: 'ឧបករណ៍ដ៏មានឥទ្ធិពលសម្រាប់ការដោះស្រាយបញ្ហា ការបញ្ច្រាសមានន័យថាការខិតជិតស្ថានភាពពីចុងម្ខាងទៀត។ ជំនួសឱ្យការគិតអំពីអ្វីដែលជោគជ័យមើលទៅដូចម្ដេច អ្នកគិតអំពីអ្វីដែលបរាជ័យនឹងមើលទៅដូចម្ដេច ហើយអ្វីដែលអាចបណ្តាលឱ្យវា។ បន្ទាប់មកអ្នកកំណត់គោលដៅរបស់អ្នកដើម្បីជៀសវាងឧបសគ្គទាំងនោះ។',
      hardWords: {
        'inversion': 'ការបញ្ច្រាស',
        'pitfalls': 'ឧបសគ្គ',
        'approaching': 'ខិតជិត'
      }
    },
    {
      en_title: "Occam's Razor",
      en_body: 'This principle states that simpler explanations are more likely to be true than complicated ones. When faced with multiple scenarios, you can make decisions more confidently by basing them on the explanation with the fewest moving parts.',
      km_title: 'កាំបិតរបស់អុកខេម',
      km_body: 'គោលការណ៍នេះចែងថា ការពន្យល់ដែលសាមញ្ញជាងទំនងជាការពិតជាងការពន្យល់ដែលស្មុគស្មាញ។ នៅពេលប្រឈមមុខនឹងសេណារីយ៉ូជាច្រើន អ្នកអាចធ្វើការសម្រេចចិត្តដោយទំនុកចិត្តបន្ថែមទៀតដោយផ្អែកលើការពន្យល់ដែលមានផ្នែកផ្លាស់ទីតិចបំផុត។',
      hardWords: {
        'principle': 'គោលការណ៍',
        'intertwined': 'ជាប់ទាក់ទងគ្នា',
        'complicated': 'ស្មុគស្មាញ'
      }
    },
    {
      en_title: "Hanlon's Razor",
      en_body: 'This model suggests that we should not attribute to maliciousness that which is easily explained by incompetence. It is far more likely that someone is just ignorant or has other things going on than that they are out to get you.',
      km_title: 'កាំបិតរបស់ហែនឡន',
      km_body: 'គំរូនេះណែនាំថាយើងមិនគួរកំណត់គុណលក្ខណៈអាក្រក់ចំពោះអ្វីដែលងាយស្រួលពន្យល់ដោយភាពគ្មានសមត្ថភាពនោះទេ។ វាទំនងជាថាអ្នកណាម្នាក់គ្រាន់តែល្ងង់ខ្លៅ ឬមានរឿងផ្សេងៗទៀតកើតឡើង ជាងថាពួកគេចេញមកដើម្បីទទួលបានអ្នក។',
      hardWords: {
        'maliciousness': 'បំណងអាក្រក់',
        'incompetence': 'គ្មានសមត្ថភាព',
        'ignorant': 'ល្ងង់ខ្លៅ',
        'attribute': 'កំណត់គុណលក្ខណៈ'
      }
    },
    {
      en_title: 'Reciprocity',
      en_body: 'This principle states that for every action, there is an equal and opposite reaction in life. If you treat someone with kindness, they are likely to reciprocate. The opposite is also true if you treat them poorly.',
      km_title: 'ការតបស្នង',
      km_body: 'គោលការណ៍នេះចែងថាសម្រាប់រាល់សកម្មភាព មានប្រតិកម្មស្មើគ្នា និងផ្ទុយគ្នាក្នុងជីវិត។ ប្រសិនបើអ្នកប្រព្រឹត្តចំពោះនរណាម្នាក់ដោយសេចក្តីសប្បុរស ពួកគេទំនងជានឹងតបស្នង។ ផ្ទុយទៅវិញក៏ជាការពិតដែរ ប្រសិនបើអ្នកប្រព្រឹត្តចំពោះពួកគេមិនល្អ។',
      hardWords: {
        'reciprocity': 'ការតបស្នង',
        'reciprocate': 'តបស្នង',
        'kindness': 'សេចក្តីសប្បុរស'
      }
    },
    {
      en_title: 'Activation Energy',
      en_body: 'From chemistry, this model explains that a task needs a certain amount of energy to begin. You can identify "catalysts" to lower that activation energy, such as a cup of coffee to help you start a long paper or project.',
      km_title: 'ថាមពលធ្វើឱ្យសកម្ម',
      km_body: 'ពីគីមីវិទ្យា គំរូនេះពន្យល់ថា កិច្ចការមួយត្រូវការថាមពលមួយចំនួនដើម្បីចាប់ផ្តើម។ អ្នកអាចកំណត់អត្តសញ្ញាណ "សារធាតុជំរុញ" ដើម្បីបន្ថយថាមពលធ្វើឱ្យសកម្មនោះ ដូចជាកាហ្វេមួយពែងដើម្បីជួយអ្នកចាប់ផ្តើមក្រដាស ឬគម្រោងដ៏វែង។',
      hardWords: {
        'activation': 'ការធ្វើឱ្យសកម្ម',
        'catalysts': 'សារធាតុជំរុញ',
        'threshold': 'កម្រិត',
        'chemistry': 'គីមីវិទ្យា'
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
    className="bg-slate-100 min-h-screen p-4 px-2 sm:p-8 md:p-12 text-gray-800">

      {/* Embedded CSS for font loading and styling */}
      <style>
        {`
          /* Import English Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&family=Lora:wght@400;700&family=Georgia&family=Open+Sans:wght@400;600&display=swap');

          /* Import Khmer Fonts (Option 3) */
          @import url('https://fonts.googleapis.com/css2?family=Koulen&family=Noto+Serif+Khmer:wght@400;700&family=Siemreap&family=Kdam+Thmor+Pro&display=swap');

          /* Font classes based on user preference */
          .title-font {
            font-family: 'Roboto Slab', 'Koulen', serif;
          }
          .subtitle-font {
            font-family: 'Lora', 'Noto Serif Khmer', serif;
          }
          .body-font {
            font-family: 'Georgia', 'Siemreap', serif;
          }
          .caption-font {
            font-family: 'Open Sans', 'Kdam Thmor Pro', sans-serif;
          }

          /* Custom CSS for the dashed underline effect on hard words */
          .underline-dashed-custom {
            text-decoration: none;
            border-bottom: 1px dashed #6b7280;
          }
        `}
      </style>

      <div className="max-w-4xl mt-9 mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-blue-700 title-font">
          Think Smarter with 9 Mental Models
        </h1>
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-700 title-font">
          Improve Your Thinking
        </h2>

        {/* Voice Selection Dropdown, now visible on all devices */}
        <div className="mb-8">
          <label htmlFor="voice-select" className="block text-sm font-medium text-gray-700 mb-1 caption-font">
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

        {/* Iterating over the content array to dynamically render each section. */}
        {mentalModelsContent.map((section, index) => (
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
                  selectedVoice={selectedVoice}
                />
              </h3>
              <p className="text-base leading-relaxed body-font">
                {renderBody(section.en_body, section.hardWords)}
              </p>
            </div>

            {/* Right column for Khmer content without voice-over */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-2 subtitle-font text-blue-700">
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
              onClick={() => {
                // Check if the browser supports the Web Speech API.
                if (!('speechSynthesis' in window)) {
                  console.error('Web Speech API is not supported in this browser.');
                  return;
                }

                // Stop any current speech before starting a new one.
                window.speechSynthesis.cancel();

                // Create a new utterance with the provided text
                const utterance = new SpeechSynthesisUtterance(popover.word);

                // Set the selected voice from the component's state.
                if (selectedVoice) {
                  utterance.voice = selectedVoice;
                } else {
                  console.warn('No voice selected. Using the default browser voice.');
                }
                
                // Speak the utterance.
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

export default Item2;
