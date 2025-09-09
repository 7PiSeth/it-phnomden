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
  'actively': 'យ៉ាងសកម្ម',
  'skillfully': 'យ៉ាងប៉ិនប្រសប់',
  'analyze': 'វិភាគ',
  'evaluate': 'វាយតម្លៃ',
  'synthesize': 'សំយោគ',
  'passively': 'យ៉ាងអសកម្ម',
  'deliberate': 'ដោយចេតនា',
  'disciplined': 'មានវិន័យ',
  'reflection': 'ការពិចារណា',
  'cultivating': 'ការបណ្ដុះបណ្ដាល',
  'curiosity': 'ភាពចង់ដឹងចង់ឮ',
  'probing': 'ការស៊ើបអង្កេត',
  'humility': 'ភាពបន្ទាបខ្លួន',
  'prejudice': 'ការប្រកាន់',
  'assumptions': 'ការសន្មត់',
  'biases': 'ភាពលំអៀង',
  'cognitive': 'ការយល់ដឹង',
  'distort': 'បំប្លែង',
  'judgment': 'ការវិនិច្ឆ័យ',
  'skepticism': 'ការសង្ស័យ',
  'cynical': 'ទុទិដ្ឋិនិយម',
  'credibility': 'ភាពជឿជាក់',
  'validity': 'សុពលភាព',
  'structured': 'មានរចនាសម្ព័ន្ធ',
  'articulate': 'បង្ហាញ',
  'contradict': 'ផ្ទុយគ្នា',
  'logical': 'ឡូជីខល',
  'conclusions': 'ការសន្និដ្ឋាន',
  'collaborating': 'ការសហការ',
  'mitigate': 'បន្ថយ',
  'inconsistencies': 'ភាពមិនស៊ីសង្វាក់គ្នា',
  'swot': 'ស្វត',
};

const englishContent = {
  heading: 'How to Become a Critical Thinker',
  introduction: 'To become a critical thinker, you must actively and skillfully analyze, evaluate, and synthesize information rather than passively accepting it. It requires a deliberate, disciplined process of reflection and practice.',
  sections: [
    {
      title: 'Cultivating a critical thinking mindset',
      points: [
        'Become actively curious. Critical thinkers have a natural curiosity and seek to understand issues in depth by asking probing questions, such as "Why is this a problem?" or "What assumptions are being made?".',
        'Embrace intellectual humility. An open mind is essential for critical thinkers, who are willing to consider new ideas and alternative viewpoints without prejudice. It is important to recognize that your own beliefs might be wrong and be open to revising your position based on new evidence.',
        'Question assumptions. Challenge assumptions, both your own and others\', rather than taking them for granted. Consider asking, "What if the opposite were true?".',
        'Be aware of your biases. Everyone has cognitive biases, which are mental shortcuts that can distort thinking. Reflect on your thought processes to recognize and mitigate their effect on your judgment.',
        'Practice skepticism in a balanced way. This doesn\'t mean being negative or cynical, but rather holding judgment until sufficient evidence has been gathered. A critical thinker questions the credibility of sources and the validity of claims.',
      ]
    },
    {
      title: 'Following a structured process',
      points: [
        'You can develop a more disciplined approach to thinking by following these steps when evaluating a problem or making a decision:',
        'Define the problem. Clearly articulate the issue or question that needs solving. Writing it down can help force clarity.',
        'Gather relevant information. Actively research and collect information from a variety of sources. Purposefully seek out sources that may contradict existing ideas.',
        'Analyze and evaluate data. Don\'t just collect information—evaluate it. Assess the relevance and reliability of your sources. Look for patterns, identify cause-and-effect relationships, and distinguish facts from opinions.',
        'Consider alternative viewpoints. Explore different perspectives on the issue to challenge assumptions and reduce bias. Ask what variables might have been missed.',
        'Draw logical conclusions. Based on the evidence gathered and analyzed, use logical reasoning to form a well-reasoned conclusion. Be aware that the problem may not have a single solution.',
        'Communicate your solution. Clearly and persuasively articulate your conclusion and the evidence supporting it. This helps clarify thinking and is crucial for collaborating with others.',
        'Reflect and learn. After implementing a solution, evaluate its effectiveness. Did it solve the problem? What lessons can be learned to improve critical thinking next time?.',
      ]
    },
    {
      title: 'Incorporating critical thinking into daily habits',
      points: [
        'Listen actively. When others are speaking, make an effort to truly understand their perspective by paying close attention and asking clarifying questions. This helps to evaluate their arguments fairly.',
        'Read broadly and critically. Expose yourself to different viewpoints and be prepared to challenge what you read. When reading, ask yourself whether the author\'s claims are supported by evidence and whether there are inconsistencies.',
        'Engage in debate and discussion. Respectful debates and collaborative discussions allow you to practice articulating thoughts and responding to counterarguments.',
        'Practice specific techniques. Try methods like the Socratic Method (asking probing questions) or a SWOT analysis (evaluating strengths, weaknesses, opportunities, and threats) to deliberately structure the analysis of a topic.',
        'Play games. Engaging in games and puzzles that require problem-solving and logical reasoning can be a fun way to train the mind.',
      ]
    }
  ]
};

const khmerContent = {
  heading: 'របៀបក្លាយជាអ្នកគិតពិចារណា',
  introduction: 'ដើម្បីក្លាយជាអ្នកគិតពិចារណា អ្នកត្រូវតែវិភាគ វាយតម្លៃ និងសំយោគព័ត៌មានដោយសកម្ម និងប៉ិនប្រសប់ ជាជាងទទួលយកវាដោយអសកម្ម។ វាទាមទារដំណើរការគិតពិចារណា និងការអនុវត្តដែលមានចេតនា និងមានវិន័យ។',
  sections: [
    {
      title: 'ការបណ្ដុះបណ្ដាលទម្លាប់នៃការគិតពិចារណា',
      points: [
        'ក្លាយជាមនុស្សចង់ដឹងចង់ឮដោយសកម្ម។ អ្នកគិតពិចារណាមានភាពចង់ដឹងចង់ឮពីធម្មជាតិ ហើយព្យាយាមយល់បញ្ហាឱ្យបានស៊ីជម្រៅដោយសួរសំណួរស៊ើបអង្កេត ដូចជា "ហេតុអ្វីបានជានេះជាបញ្ហា?" ឬ "តើការសន្មត់អ្វីខ្លះដែលបានធ្វើ?"។',
        'អនុវត្តភាពបន្ទាបខ្លួនខាងបញ្ញា។ ការគិតបើកចំហគឺចាំបាច់សម្រាប់អ្នកគិតពិចារណា ដែលមានឆន្ទៈពិចារណាគំនិតថ្មីៗ និងទស្សនៈជំនួសដោយគ្មានការប្រកាន់។ វាជារឿងសំខាន់ក្នុងការទទួលស្គាល់ថាជំនឿរបស់អ្នកផ្ទាល់អាចខុស ហើយត្រូវបើកចិត្តទទួលយកការកែតម្រូវជំហររបស់អ្នកដោយផ្អែកលើភស្តុតាងថ្មី។',
        'សួរសំណួរអំពីការសន្មត់។ ពិចារណាការសន្មត់ ទាំងរបស់អ្នកផ្ទាល់ និងរបស់អ្នកដទៃ ជាជាងទទួលយកវាដោយគ្មានការសង្ស័យ។ ពិចារណាសួរថា "ចុះបើស៊ីគ្នាវិញ?"។',
        'ដឹងពីភាពលំអៀងរបស់អ្នក។ មនុស្សគ្រប់គ្នាមានភាពលំអៀងនៃការយល់ដឹង ដែលជាផ្លូវកាត់ផ្លូវចិត្តដែលអាចបំប្លែងការគិត។ ពិចារណាឡើងវិញលើដំណើរការគិតរបស់អ្នក ដើម្បីស្គាល់ និងបន្ថយឥទ្ធិពលរបស់វាលើការវិនិច្ឆ័យរបស់អ្នក។',
        'អនុវត្តការសង្ស័យក្នុងរបៀបមានតុល្យភាព។ នេះមិនមែនមានន័យថាអវិជ្ជមាន ឬទុទិដ្ឋិនិយមនោះទេ ប៉ុន្តែវាជាការរក្សាការវិនិច្ឆ័យរហូតដល់មានភស្តុតាងគ្រប់គ្រាន់។ អ្នកគិតពិចារណាសួរសំណួរអំពីភាពជឿជាក់នៃប្រភព និងសុពលភាពនៃការអះអាង។',
      ]
    },
    {
      title: 'ការធ្វើតាមដំណើរការដែលមានរចនាសម្ព័ន្ធ',
      points: [
        'អ្នកអាចអភិវឌ្ឍវិធីសាស្រ្តដែលមានវិន័យកាន់តែច្រើនចំពោះការគិតដោយធ្វើតាមជំហានទាំងនេះនៅពេលវាយតម្លៃបញ្ហា ឬធ្វើការសម្រេចចិត្ត:',
        'កំណត់បញ្ហា។ បង្ហាញឱ្យបានច្បាស់លាស់នូវបញ្ហា ឬសំណួរដែលត្រូវការដោះស្រាយ។ ការសរសេរវាចុះអាចជួយបង្ខំឱ្យមានភាពច្បាស់លាស់។',
        'ប្រមូលព័ត៌មានដែលពាក់ព័ន្ធ។ ស្រាវជ្រាវយ៉ាងសកម្ម និងប្រមូលព័ត៌មានពីប្រភពជាច្រើន។ ព្យាយាមស្វែងរកប្រភពដែលអាចផ្ទុយនឹងគំនិតដែលមានស្រាប់។',
        'វិភាគ និងវាយតម្លៃទិន្នន័យ។ កុំគ្រាន់តែប្រមូលព័ត៌មាន—ត្រូវវាយតម្លៃវា។ វាយតម្លៃពីភាពពាក់ព័ន្ធ និងភាពជឿជាក់នៃប្រភពរបស់អ្នក។ រកមើលគំរូ កំណត់ទំនាក់ទំនងមូលហេតុនិងលទ្ធផល និងបែងចែកការពិតពីមតិយោបល់។',
        'ពិចារណាទស្សនៈជំនួស។ ស្វែងយល់ពីទស្សនៈផ្សេងៗលើបញ្ហាដើម្បីពិចារណាឡើងវិញនូវការសន្មត់ និងកាត់បន្ថយភាពលំអៀង។ សួរថា តើអថេរអ្វីខ្លះដែលអាចនឹងត្រូវបានខកខាន។',
        'ទាញយកការសន្និដ្ឋានឡូជីខល។ ដោយផ្អែកលើភស្តុតាងដែលបានប្រមូល និងវិភាគ សូមប្រើហេតុផលឡូជីខលដើម្បីបង្កើតការសន្និដ្ឋានដែលមានហេតុផលល្អ។ ត្រូវដឹងថាបញ្ហាអាចនឹងមិនមានដំណោះស្រាយតែមួយទេ។',
        'ទំនាក់ទំនងដំណោះស្រាយរបស់អ្នក។ បង្ហាញឱ្យបានច្បាស់លាស់ និងគួរឱ្យជឿនូវការសន្និដ្ឋានរបស់អ្នក និងភស្តុតាងដែលគាំទ្រវា។ នេះជួយធ្វើឱ្យការគិតច្បាស់លាស់ ហើយវាសំខាន់សម្រាប់ការសហការជាមួយអ្នកដទៃ។',
        'ពិចារណាឡើងវិញ និងរៀន។ បន្ទាប់ពីអនុវត្តដំណោះស្រាយ សូមវាយតម្លៃប្រសិទ្ធភាពរបស់វា។ តើវាបានដោះស្រាយបញ្ហាដែរឬទេ? តើអាចរៀនមេរៀនអ្វីខ្លះដើម្បីកែលម្អការគិតពិចារណានៅពេលក្រោយ?',
      ]
    },
    {
      title: 'ការបញ្ចូលការគិតពិចារណាទៅក្នុងទម្លាប់ប្រចាំថ្ងៃ',
      points: [
        'ស្តាប់យ៉ាងសកម្ម។ នៅពេលអ្នកដទៃកំពុងនិយាយ សូមព្យាយាមពិតប្រាកដដើម្បីយល់ពីទស្សនៈរបស់ពួកគេដោយយកចិត្តទុកដាក់ខ្ពស់ និងសួរសំណួរដែលបញ្ជាក់។ នេះជួយវាយតម្លៃការអះអាងរបស់ពួកគេដោយយុត្តិធម៌។',
        'អានឱ្យទូលំទូលាយ និងដោយពិចារណា។ បង្ហាញខ្លួនអ្នកទៅកាន់ទស្សនៈផ្សេងៗ និងត្រៀមខ្លួនដើម្បីពិចារណាឡើងវិញនូវអ្វីដែលអ្នកបានអាន។ នៅពេលអាន ត្រូវសួរខ្លួនឯងថាតើការអះអាងរបស់អ្នកនិពន្ធត្រូវបានគាំទ្រដោយភស្តុតាងឬទេ ហើយតើមានភាពមិនស៊ីសង្វាក់គ្នាដែរឬទេ?',
        'ចូលរួមក្នុងការជជែកដេញដោល និងការពិភាក្សា។ ការជជែកដេញដោល និងការពិភាក្សាសហការដោយការគោរព អនុញ្ញាតឱ្យអ្នកអនុវត្តការបង្ហាញគំនិត និងឆ្លើយតបទៅនឹងការអះអាងផ្ទុយ។',
        'អនុវត្តបច្ចេកទេសជាក់លាក់។ សាកល្បងវិធីសាស្រ្តដូចជា Socratic Method (ការសួរសំណួរស៊ើបអង្កេត) ឬការវិភាគ SWOT (ការវាយតម្លៃចំណុចខ្លាំង ចំណុចខ្សោយ ឱកាស និងការគំរាមកំហែង) ដើម្បីរៀបចំការវិភាគប្រធានបទដោយចេតនា។',
        'លេងហ្គេម។ ការចូលរួមក្នុងហ្គេម និងល្បែងផ្គុំរូបដែលទាមទារការដោះស្រាយបញ្ហា និងហេតុផលឡូជីខល អាចជាវិធីសប្បាយដើម្បីបណ្ដុះបណ្ដាលចិត្ត។',
      ]
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
      
      <div className="w-full max-w-6xl text-center mb-4">
        <img src="https://tscfm.org/wp-content/uploads/2024/10/why-is-critical-thinking-important-1024x768.png" alt="A graphic explaining why critical thinking is important." className="w-full max-w-4xl rounded-xl mx-auto mb-8" />
        <h1 className="text-4xl sm:text-5xl font-english-header-scaled font-bold mb-4">{englishContent.heading}</h1>
        <p className="text-lg font-english-body-scaled text-gray-700 mb-6">{processTextWithHardWords(englishContent.introduction)}</p>
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
          {englishContent.sections.map((section, sectionIndex) => (
            <div key={`section-en-${sectionIndex}`}>
              <div className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-english-subheading-scaled font-semibold text-gray-900">{section.title}</h3>
                  <div className="flex items-center space-x-2">
                    {playingSection === sectionIndex && audioStatus === 'playing' ? (
                      <button onClick={handleStop} className="p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                      </button>
                    ) : (
                      <button onClick={() => handlePlay(section.points.join(' '), sectionIndex)} className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200">
                        {audioStatus === 'loading' && playingSection === sectionIndex ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-cw animate-spin"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1.01 6.74 2.8L21 8"/><path d="M21 3v5h-5"/></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2">
                  {section.points.map((point, pointIndex) => (
                    <li key={`point-en-${sectionIndex}-${pointIndex}`} className="font-english-body-scaled leading-relaxed text-gray-700 whitespace-pre-line">
                      {processTextWithHardWords(point)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        {/* Khmer Section */}
        <div className="w-full sm:w-1/2 space-y-8">
          {khmerContent.sections.map((section, sectionIndex) => (
            <div key={`section-km-${sectionIndex}`}>
              <div className="bg-white p-6 px-4 rounded-xl shadow-md space-y-4">
                <h3 className="text-2xl font-khmer-subheading font-semibold text-gray-900">{section.title}</h3>
                <ul className="list-disc list-inside space-y-2">
                  {section.points.map((point, pointIndex) => (
                    <li key={`point-km-${sectionIndex}-${pointIndex}`} className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
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
