import React, { useState, useEffect, useRef } from 'react';

// The component is designed to be self-contained and does not rely on external icon libraries.
// I've used inline SVG icons to ensure it renders correctly in this environment.

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
  'arguments': 'ទឡ្ហីករណ៍',
  'true': 'ពិត',
  'compound effect': 'ឥទ្ធិពលរួម',
  'tiny decisions': 'សេចក្តីសម្រេចចិត្តតូចៗ',
  '1 percent': '១ ភាគរយ',
  'improvements': 'ការធ្វើឱ្យប្រសើរឡើង',
  'framework': 'ក្របខ័ណ្ឌ',
  'understanding': 'ការយល់ដឹង',
  'building': 'ការកសាង',
  'good habits': 'ទម្លាប់ល្អៗ',
  'breaking bad ones': 'ការបោះបង់ទម្លាប់អាក្រក់',
  'guide': 'មគ្គុទ្ទេសក៍',
  'designing': 'ការរៀបចំ',
  'systems': 'ប្រព័ន្ធ',
  'success': 'ជោគជ័យ',
  'almost inevitable': 'ស្ទើរតែក្លាយជាការពិត',
  'focusing': 'ការផ្តោត',
  'results': 'លទ្ធផល',
  'achieve': 'សម្រេចបាន',
  'Behavior Change': 'ការផ្លាស់ប្តូរឥរិយាបថ',
  'feedback loop': 'វដ្ដនៃការឆ្លើយតប',
  'creating': 'ការបង្កើត',
  'Cue': 'សញ្ញា',
  'Craving': 'ការចង់បាន',
  'Response': 'ការឆ្លើយតប',
  'Reward': 'រង្វាន់',
  'Obvious': 'ច្បាស់លាស់',
  'visible': 'អាចមើលឃើញ',
  'accessible': 'ងាយស្រួលចូលប្រើ',
  'likely': 'មានលទ្ធភាព',
  'Habit Stacking': 'ការបូកបញ្ចូលទម្លាប់',
  'existing one': 'ទម្លាប់ដែលមានស្រាប់',
  'Design Your Environment': 'រៀបចំបរិស្ថានរបស់អ្នក',
  'health': 'សុខភាព',
  'hidden': 'លាក់បាំង',
  'Visual Cues': 'សញ្ញាដែលមើលឃើញ',
  'running shoes': 'ស្បែកជើងរត់',
  'Attractive': 'ទាក់ទាញ',
  'appealing': 'ទាក់ទាញ',
  'crave': 'ចង់បាន',
  'positive feelings': 'អារម្មណ៍វិជ្ជមាន',
  'Temptation Bundling': 'ការបូកបញ្ចូលការល្បួង',
  'Join a Community': 'ចូលរួមសហគមន៍',
  'Reframe Your Mindset': 'រៀបចំផ្នត់គំនិតរបស់អ្នក',
  'Easy': 'ងាយស្រួល',
  'reducing': 'កាត់បន្ថយ',
  'friction': 'ការលំបាក',
  'energy': 'ថាមពល',
  'The Two-Minute Rule': 'ច្បាប់ពីរនាទី',
  'Prime the Environment': 'រៀបចំបរិស្ថានជាមុន',
  'Automate Your Habits': 'ធ្វើឱ្យទម្លាប់របស់អ្នកស្វ័យប្រវត្តិ',
  'automatic': 'ស្វ័យប្រវត្តិ',
  'Satisfying': 'ពេញចិត្ត',
  'immediately rewarding': 'ផ្តល់រង្វាន់ភ្លាមៗ',
  'prioritizes': 'ផ្តល់អាទិភាព',
  'instant gratification': 'ការពេញចិត្តភ្លាមៗ',
  'long-term benefits': 'អត្ថប្រយោជន៍រយៈពេលវែង',
  'Habit Tracker': 'ឧបករណ៍តាមដានទម្លាប់',
  'progress': 'ការរីកចម្រើន',
  'streak': 'វឌ្ឍនភាព',
  'motivate': 'ជំរុញទឹកចិត្ត',
  'Give Yourself a Reward': 'ផ្តល់រង្វាន់ដល់ខ្លួនឯង',
  'reinforce': 'ពង្រឹង',
  'Never Miss Twice': 'កុំធ្វេសប្រហែសពីរដង',
  'Consistency': 'ការតស៊ូជាប់លាប់',
  'perfection': 'ភាពល្អឥតខ្ចោះ'
};

const contentData = {
  summary: {
    english: {
      heading: "Summary: Atomic Habits by James Clear",
      body: `In "Atomic Habits," James Clear argues that true change comes from the compound effect of hundreds of tiny decisions—from making small, 1 percent improvements every day. The book focuses on a simple, yet powerful, framework for understanding and building good habits, while breaking bad ones. It’s a guide to designing systems that make success almost inevitable by focusing on who you want to become, not just on the results you want to achieve.`
    },
    khmer: {
      heading: "សង្ខេប៖ ទម្លាប់តូចៗរបស់មនុស្សដែលមានប្រសិទ្ធភាពខ្ពស់",
      body: `នៅក្នុងសៀវភៅ «ទម្លាប់តូចៗ» លោក James Clear បានលើកឡើងថា ការផ្លាស់ប្តូរពិតប្រាកដកើតឡើងពីឥទ្ធិពលរួមនៃសេចក្តីសម្រេចចិត្តតូចៗរាប់រយ—គឺមកពីការធ្វើឱ្យប្រសើរឡើងបន្តិចម្តងៗ ១ ភាគរយជារៀងរាល់ថ្ងៃ។ សៀវភៅនេះផ្តោតលើក្របខ័ណ្ឌសាមញ្ញ ប៉ុន្តែមានប្រសិទ្ធភាព សម្រាប់ការយល់ដឹង និងការកសាងទម្លាប់ល្អៗ ព្រមទាំងការបោះបង់ទម្លាប់អាក្រក់។ វាជាមគ្គុទ្ទេសក៍ក្នុងការរៀបចំប្រព័ន្ធដែលធ្វើឱ្យជោគជ័យស្ទើរតែក្លាយជាការពិត ដោយផ្តោតលើថាអ្នកចង់ក្លាយជាអ្នកណា មិនមែនគ្រាន់តែលើលទ្ធផលដែលអ្នកចង់សម្រេចបានប៉ុណ្ណោះទេ។`
    }
  },
  laws: {
    english: {
      heading: "The Four Laws of Behavior Change",
      body: "The book is built around a simple feedback loop for creating habits: Cue, Craving, Response, and Reward. James Clear calls this the Four Laws of Behavior Change."
    },
    khmer: {
      heading: "ច្បាប់ទាំងបួននៃការផ្លាស់ប្តូរឥរិយាបថ",
      body: "សៀវភៅនេះត្រូវបានបង្កើតឡើងជុំវិញវដ្ដនៃការឆ្លើយតបដ៏សាមញ្ញសម្រាប់ការបង្កើតទម្លាប់៖ សញ្ញា (Cue) ការចង់បាន (Craving) ការឆ្លើយតប (Response) និងរង្វាន់ (Reward)។ លោក James Clear ហៅនេះថាជាច្បាប់ទាំងបួននៃការផ្លាស់ប្តូរឥរិយាបថ។"
    }
  },
  sections: [
    {
      english: {
        heading: "1. Make It Obvious",
        body: "The first law is about making your habits easy to see. The more visible and accessible a habit is, the more likely you are to do it.",
        points: [
          { term: "Habit Stacking", explanation: "Link a new habit to an existing one. (e.g., 'After I brush my teeth, I will meditate for one minute.')" },
          { term: "Design Your Environment", explanation: "Make your desired habits easier and your bad habits harder. Place healthy snacks in a visible bowl on the counter and junk food in a hidden cabinet." },
          { term: "Use Visual Cues", explanation: "Leave your running shoes by the front door or place your book on your pillow to remind you to read." }
        ]
      },
      khmer: {
        heading: "១. ធ្វើឱ្យវាច្បាស់លាស់",
        body: `ច្បាប់ទីមួយគឺធ្វើឱ្យទម្លាប់របស់អ្នកងាយស្រួលមើលឃើញ។ ទម្លាប់កាន់តែអាចមើលឃើញនិងងាយស្រួលចូលប្រើប៉ុនណា អ្នកកាន់តែមានលទ្ធភាពធ្វើវាបានកាន់តែខ្ពស់។`,
        points: [
          { term: "ការបូកបញ្ចូលទម្លាប់", explanation: `ភ្ជាប់ទម្លាប់ថ្មីទៅនឹងទម្លាប់ដែលមានស្រាប់។ (ឧទាហរណ៍៖ «បន្ទាប់ពីខ្ញុំដុសធ្មេញហើយ ខ្ញុំនឹងធ្វើសមាធិមួយនាទី។»)` },
          { term: "រៀបចំបរិស្ថានរបស់អ្នក", explanation: `ធ្វើឱ្យទម្លាប់ដែលអ្នកចង់បានកាន់តែងាយស្រួល និងទម្លាប់អាក្រក់កាន់តែពិបាក។ ដាក់អាហារសម្រន់ដែលមានសុខភាពល្អក្នុងចានដែលងាយមើលឃើញនៅលើតុ ហើយដាក់អាហារឥតបានការក្នុងទូដែលលាក់បាំង។` },
          { term: "ប្រើសញ្ញាដែលមើលឃើញ", explanation: `ទុកស្បែកជើងរត់របស់អ្នកនៅមុខទ្វារ ឬដាក់សៀវភៅរបស់អ្នកនៅលើខ្នើយដើម្បីរំលឹកអ្នកឱ្យអាន។` }
        ]
      }
    },
    {
      english: {
        heading: "2. Make It Attractive",
        body: "The second law is about making your habits appealing. The more we crave something, the more likely we are to act on it. You can make habits more attractive by associating them with positive feelings.",
        points: [
          { term: "Temptation Bundling", explanation: "Pair an action you want to do with an action you need to do. (e.g., 'I will listen to my favorite podcast while doing my workout.')" },
          { term: "Join a Community", explanation: "Surround yourself with people who already have the habits you want to adopt. You'll be more motivated to follow their lead." },
          { term: "Reframe Your Mindset", explanation: "Change the way you talk about your habits. Instead of saying 'I have to wake up early,' say 'I get to wake up early to start my day.'" }
        ]
      },
      khmer: {
        heading: "២. ធ្វើឱ្យវាទាក់ទាញ",
        body: `ច្បាប់ទីពីរគឺធ្វើឱ្យទម្លាប់របស់អ្នកទាក់ទាញ។ យើងកាន់តែចង់បានអ្វីមួយប៉ុនណា យើងកាន់តែមានលទ្ធភាពធ្វើសកម្មភាពលើវាកាន់តែខ្ពស់។ អ្នកអាចធ្វើឱ្យទម្លាប់កាន់តែទាក់ទាញដោយភ្ជាប់វាជាមួយអារម្មណ៍វិជ្ជមាន។`,
        points: [
          { term: "ការបូកបញ្ចូលការល្បួង", explanation: `ផ្គូផ្គងសកម្មភាពដែលអ្នកចង់ធ្វើជាមួយសកម្មភាពដែលអ្នកត្រូវធ្វើ។ (ឧទាហរណ៍៖ «ខ្ញុំនឹងស្តាប់ផតខាស់ដែលខ្ញុំចូលចិត្តពេលកំពុងហាត់ប្រាណ។»)` },
          { term: "ចូលរួមសហគមន៍", explanation: `នៅជុំវិញខ្លួនជាមួយមនុស្សដែលមានទម្លាប់ដែលអ្នកចង់ទទួលយកស្រាប់។ អ្នកនឹងមានការលើកទឹកចិត្តកាន់តែច្រើនក្នុងការធ្វើតាមពួកគេ។` },
          { term: "រៀបចំផ្នត់គំនិតរបស់អ្នក", explanation: `ផ្លាស់ប្តូររបៀបដែលអ្នកនិយាយអំពីទម្លាប់របស់អ្នក។ ជំនួសឱ្យការនិយាយថា «ខ្ញុំត្រូវតែភ្ញាក់ពីព្រលឹម» និយាយថា «ខ្ញុំអាចភ្ញាក់ពីព្រលឹមដើម្បីចាប់ផ្តើមថ្ងៃរបស់ខ្ញុំ។»` }
        ]
      }
    },
    {
      english: {
        heading: "3. Make It Easy",
        body: "The third law is about reducing the friction associated with your habits. The less energy a habit requires, the more likely it is to happen. The goal is to make the good habits so easy that you can’t say no to them.",
        points: [
          { term: "The Two-Minute Rule", explanation: "Start a new habit in under two minutes. 'Read before bed' becomes 'read one page.' 'Do yoga' becomes 'take out my yoga mat.'" },
          { term: "Prime the Environment", explanation: "Prepare your space in advance to make the habit effortless. Lay out your workout clothes the night before, or set up your coffee maker before bed." },
          { term: "Automate Your Habits", explanation: "Use technology and tools to make habits automatic. Set up automatic bill payments or schedule your workouts on a calendar." }
        ]
      },
      khmer: {
        heading: "៣. ធ្វើឱ្យវាងាយស្រួល",
        body: `ច្បាប់ទីបីគឺកាត់បន្ថយការលំបាកដែលទាក់ទងនឹងទម្លាប់របស់អ្នក។ ទម្លាប់ដែលត្រូវការថាមពលតិចប៉ុនណា វាកាន់តែមានលទ្ធភាពកើតឡើងកាន់តែខ្ពស់។ គោលដៅគឺធ្វើឱ្យទម្លាប់ល្អៗមានភាពងាយស្រួលរហូតដល់អ្នកមិនអាចបដិសេធបាន។`,
        points: [
          { term: "ច្បាប់ពីរនាទី", explanation: `ចាប់ផ្តើមទម្លាប់ថ្មីក្នុងរយៈពេលក្រោមពីរនាទី។ «អានមុនពេលចូលគេង» ក្លាយជា «អានមួយទំព័រ»។ «ធ្វើយូហ្គា» ក្លាយជា «យកកន្ទេលយូហ្គារបស់ខ្ញុំចេញ»។` },
          { term: "រៀបចំបរិស្ថានជាមុន", explanation: `រៀបចំកន្លែងរបស់អ្នកជាមុនដើម្បីធ្វើឱ្យទម្លាប់ងាយស្រួល។ រៀបចំសម្លៀកបំពាក់ហាត់ប្រាណរបស់អ្នកនៅយប់មុន ឬរៀបចំម៉ាស៊ីនឆុងកាហ្វេរបស់អ្នកមុនពេលចូលគេង។` },
          { term: "ធ្វើឱ្យទម្លាប់របស់អ្នកស្វ័យប្រវត្តិ", explanation: `ប្រើបច្ចេកវិទ្យា និងឧបករណ៍ដើម្បីធ្វើឱ្យទម្លាប់ស្វ័យប្រវត្តិ។ រៀបចំការបង់ប្រាក់វិក្កយបត្រដោយស្វ័យប្រវត្តិ ឬកំណត់កាលវិភាគការហាត់ប្រាណរបស់អ្នកនៅលើប្រតិទិន។` }
        ]
      }
    },
    {
      english: {
        heading: "4. Make It Satisfying",
        body: "The fourth law states that a habit is more likely to be repeated if it is immediately rewarding. The human brain prioritizes instant gratification over long-term benefits.",
        points: [
          { term: "Use a Habit Tracker", explanation: "Mark your progress on a calendar or in a journal. The visual satisfaction of seeing your streak grow will motivate you to continue." },
          { term: "Give Yourself a Reward", explanation: "Provide an immediate reward after completing a habit to reinforce the behavior." },
          { term: "Never Miss Twice", explanation: "Don't beat yourself up for a single mistake. Just make sure you get back on track the very next day. Consistency is more important than perfection." }
        ]
      },
      khmer: {
        heading: "៤. ធ្វើឱ្យវាពេញចិត្ត",
        body: `ច្បាប់ទីបួនចែងថា ទម្លាប់ទំនងជានឹងត្រូវបានធ្វើម្តងទៀតប្រសិនបើវាផ្តល់រង្វាន់ភ្លាមៗ។ ខួរក្បាលរបស់មនុស្សផ្តល់អាទិភាពដល់ការពេញចិត្តភ្លាមៗលើសពីអត្ថប្រយោជន៍រយៈពេលវែង។`,
        points: [
          { term: "ប្រើឧបករណ៍តាមដានទម្លាប់", explanation: `សម្គាល់ការរីកចម្រើនរបស់អ្នកនៅលើប្រតិទិន ឬក្នុងកំណត់ហេតុប្រចាំថ្ងៃ។ ការពេញចិត្តដែលមើលឃើញពីការឃើញវឌ្ឍនភាពរបស់អ្នកនឹងជំរុញទឹកចិត្តអ្នកឱ្យបន្ត។` },
          { term: "ផ្តល់រង្វាន់ដល់ខ្លួនឯង", explanation: `ផ្តល់រង្វាន់ភ្លាមៗបន្ទាប់ពីបញ្ចប់ទម្លាប់ដើម្បីពង្រឹងឥរិយាបថ។` },
          { term: "កុំធ្វេសប្រហែសពីរដង", explanation: `កុំបន្ទោសខ្លួនឯងចំពោះកំហុសតែមួយ។ គ្រាន់តែធ្វើឱ្យប្រាកដថាអ្នកត្រឡប់ទៅរកផ្លូវត្រូវវិញនៅថ្ងៃបន្ទាប់។ ការតស៊ូជាប់លាប់គឺសំខាន់ជាងភាពល្អឥតខ្ចោះ។` }
        ]
      }
    }
  ]
};

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [speakingSectionId, setSpeakingSectionId] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: '', translation: '', x: 0, y: 0 });
  const popupRef = useRef(null);

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

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = getVoices;
      getVoices();
    }
  }, []);

  // New Effect to handle voice selection after voices are loaded
  useEffect(() => {
    if (voices.length > 0) {
      const samanthaVoice = voices.find(v => v.name.includes('Samantha'));
      if (isMobile && samanthaVoice) {
        setSelectedVoice(samanthaVoice);
      } else {
        setSelectedVoice(voices[3]);
      }
    }
  }, [voices, isMobile]);

  const getSectionText = (section) => {
    let fullText = `${section.heading}. ${section.body}`;
    if (section.points) {
      section.points.forEach(point => {
        fullText += `. ${point.term}. ${point.explanation}`;
      });
    }
    return fullText;
  };

  // Handle voice-over for sections
  const handleVoiceOver = (id, sectionData) => {
    const textToSpeak = getSectionText(sectionData);

    if (speakingSectionId === id) {
      window.speechSynthesis.cancel();
      setSpeakingSectionId(null);
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.onend = () => {
      setSpeakingSectionId(null);
    };
    window.speechSynthesis.speak(utterance);
    setSpeakingSectionId(id);
  };

  const renderEnglishText = (text) => {
    const sortedHardWords = Object.keys(hardWords).sort((a, b) => b.length - a.length);
    const regex = new RegExp(`(${sortedHardWords.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

    const parts = text.split(regex);

    return parts.map((part, index) => {
      const trimmedPart = part.trim().toLowerCase();
      const isHardWord = sortedHardWords.includes(trimmedPart);

      if (isHardWord) {
        return (
          <span
            key={index}
            className="hard-word"
            onClick={(e) => handleHardWordClick(e, trimmedPart)}
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  const handleHardWordClick = (e, word) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const translation = hardWords[word];
    setPopupContent({
      word,
      translation,
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setShowPopup(true);
  };

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
    <div className="bg-gray-50 min-h-screen py-12 px-2 font-english-body">
      {/* Voice selection dropdown */}
      <div className="mb-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-start sm:justify-start px-4">
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

      <div className="max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden bg-white">
        {/* Summary Section */}
        <div className="p-5 lg:p-10 space-y-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-english-subheading font-semibold text-gray-900">
              {contentData.summary.english.heading}
            </h2>
            <button
              onClick={() => handleVoiceOver('summary', contentData.summary.english)}
              className="p-2 rounded-full transition-colors duration-200"
            >
              {speakingSectionId === 'summary' ? (
                <StopIcon className="h-6 w-6 text-red-500" />
              ) : (
                <PlayIcon className="h-6 w-6 text-blue-500" />
              )}
            </button>
          </div>
          <p className="font-english-body leading-relaxed text-gray-700 text-base">
            {renderEnglishText(contentData.summary.english.body)}
          </p>
        </div>
        <div className="p-5 lg:p-10 space-y-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-2xl font-khmer-subheading-style font-semibold text-gray-900">
            {contentData.summary.khmer.heading}
          </h2>
          <p className="font-khmer-body-style leading-relaxed text-gray-700 whitespace-pre-line">
            {contentData.summary.khmer.body}
          </p>
        </div>

        {/* The Four Laws Section */}
        <div className="p-5 lg:p-10 space-y-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-english-subheading font-semibold text-gray-900">
              {contentData.laws.english.heading}
            </h2>
            <button
              onClick={() => handleVoiceOver('laws', contentData.laws.english)}
              className="p-2 rounded-full transition-colors duration-200"
            >
              {speakingSectionId === 'laws' ? (
                <StopIcon className="h-6 w-6 text-red-500" />
              ) : (
                <PlayIcon className="h-6 w-6 text-blue-500" />
              )}
            </button>
          </div>
          <p className="font-english-body leading-relaxed text-gray-700 text-base">
            {renderEnglishText(contentData.laws.english.body)}
          </p>
        </div>
        <div className="p-5 lg:p-10 space-y-4 bg-gray-100 border-b border-gray-200">
          <h2 className="text-2xl font-khmer-subheading-style font-semibold text-gray-900">
            {contentData.laws.khmer.heading}
          </h2>
          <p className="font-khmer-body-style leading-relaxed text-gray-700 whitespace-pre-line">
            {contentData.laws.khmer.body}
          </p>
        </div>

        {/* Individual Laws Sections */}
        {contentData.sections.map((section, index) => (
          <React.Fragment key={index}>
            {/* English Section */}
            <div className="p-5 lg:p-10 space-y-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-english-subheading font-semibold text-gray-900">
                  {section.english.heading}
                </h2>
                <button
                  onClick={() => handleVoiceOver(index, section.english)}
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
              <ul className="list-disc list-inside space-y-3 text-gray-600 font-english-body">
                {section.english.points.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    <strong className="text-gray-800 font-english-label">
                      {renderEnglishText(point.term)}:
                    </strong>{' '}
                    {renderEnglishText(point.explanation)}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Khmer Section */}
            <div className="p-5 lg:p-10 space-y-4 bg-gray-100 border-b border-gray-200">
              <h2 className="text-2xl font-khmer-subheading-style font-semibold text-gray-900">
                {section.khmer.heading}
              </h2>
              <p className="font-khmer-body-style leading-relaxed text-gray-700 whitespace-pre-line">
                {section.khmer.body}
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 font-khmer-body-style">
                {section.khmer.points.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    <strong className="text-gray-800 font-khmer-label-style">
                      {point.term}:
                    </strong>{' '}
                    {point.explanation}
                  </li>
                ))}
              </ul>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Merriweather:wght@400&family=Lato:wght@400&family=Montserrat:wght@400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Moul&family=Moulpali&family=Hanuman&family=Battambang&display=swap');
        
        .font-english-header { font-family: 'Playfair Display', serif; }
        .font-english-subheading { font-family: 'Merriweather', serif; }
        .font-english-body { font-family: 'Lato', sans-serif; }
        .font-english-label { font-family: 'Montserrat', sans-serif; }
        
        .font-khmer-header-style { font-family: 'Moul', serif; }
        .font-khmer-subheading-style { font-family: 'Moulpali', serif; }
        .font-khmer-body-style { font-family: 'Hanuman', serif; }
        .font-khmer-label-style { font-family: 'Battambang', serif; }

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
          transform: translateX(-50%);
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default App;
