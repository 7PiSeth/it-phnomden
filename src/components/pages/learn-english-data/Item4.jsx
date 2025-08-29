import React, { useState, useEffect } from 'react';

// The main Item4 component which contains all the logic and UI for the essay template.
const Item4 = () => {
    // State for text-to-speech functionality. speakingSectionIndex tracks which section is currently speaking.
    const [synth, setSynth] = useState(null);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [speakingSectionIndex, setSpeakingSectionIndex] = useState(null);

    // State for the hard word popup
    const [hardWordPopup, setHardWordPopup] = useState({
        visible: false,
        word: '',
        translation: '',
        top: 0,
        left: 0,
    });

    // Data for the essay content, including translations and hard words
    const essayData = {
        englishTitle: "The 7 Habits of Highly Effective Teens",
        khmerTitle: "ទម្លាប់ទាំង ៧ របស់យុវវ័យដែលមានប្រសិទ្ធភាពខ្ពស់",
        sections: [
            {
                english: {
                    title: "Introduction",
                    body: "The 7 Habits of Highly Effective Teens by Sean Covey is a self-help book that adapts Stephen Covey's The 7 Habits of Highly Effective People for a teenage audience. It aims to help teenagers improve their self-esteem, build friendships, resist peer pressure, achieve goals, and generally navigate the challenges of adolescence more effectively. The book breaks down the habits into easily digestible concepts with relatable examples and anecdotes relevant to teen life.",
                },
                khmer: {
                    title: "សេចក្តីផ្តើម",
                    body: "ទម្លាប់ទាំង ៧ របស់យុវវ័យដែលមានប្រសិទ្ធភាពខ្ពស់ ដោយលោក Sean Covey គឺជាសៀវភៅអភិវឌ្ឍន៍ខ្លួនដែលសម្រួលសៀវភៅ ទម្លាប់ទាំង ៧ របស់មនុស្សដែលមានប្រសិទ្ធភាពខ្ពស់ របស់លោក Stephen Covey សម្រាប់យុវវ័យ។ វាមានគោលបំណងជួយយុវវ័យបង្កើនការគោរពខ្លួនឯង កសាងមិត្តភាព ទប់ទល់សម្ពាធពីមិត្តភក្តិ សម្រេចគោលដៅ និងដោះស្រាយបញ្ហាប្រឈមក្នុងវ័យជំទង់ឱ្យកាន់តែមានប្រសិទ្ធភាព។ សៀវភៅនេះបំបែកទម្លាប់នីមួយៗទៅជាគោលគំនិតងាយយល់ជាមួយនឹងឧទាហរណ៍ និងរឿងនិទានពាក់ព័ន្ធនឹងជីវិតយុវវ័យ។",
                },
                hardWords: [
                    { word: "self-help", translation: "ជួយខ្លួនឯង" },
                    { word: "adolescence", translation: "វ័យជំទង់" },
                    { word: "anecdotes", translation: "រឿងនិទានខ្លីៗ" },
                    { word: "digestible", translation: "ងាយយល់" },
                    { word: "audience", translation: "អ្នកអាន/ទស្សនិកជន" },
                    { word: "self-esteem", translation: "ការគោរពខ្លួនឯង" },
                    { word: "resist", translation: "ទប់ទល់" },
                    { word: "peer", translation: "មិត្តភក្តិ" }
                ]
            },
            {
                english: {
                    title: "Personal Victory (Habits 1-3)",
                    body: "The first three habits focus on personal victory—habits that build self-mastery. They emphasize taking control of your own life and becoming a more responsible individual.",
                    bullets: [
                        "Be Proactive: You are in charge of your life and choices. Take responsibility for your actions and attitudes. Don't blame others or external circumstances.",
                        "Begin with the End in Mind: Define your values, goals, and what's important to you. Create a personal mission statement or vision for your future. Make decisions based on your principles.",
                        "Put First Things First: Prioritize your time and activities. Focus on important tasks, not just urgent ones. Manage your schedule effectively to achieve your goals."
                    ]
                },
                khmer: {
                    title: "ជ័យជំនះផ្ទាល់ខ្លួន (ទម្លាប់ទី ១-៣)",
                    body: "ទម្លាប់បីដំបូងផ្តោតលើជ័យជំនះផ្ទាល់ខ្លួន—ទម្លាប់ដែលកសាងការគ្រប់គ្រងខ្លួនឯង។ ពួកគេសង្កត់ធ្ងន់លើការគ្រប់គ្រងជីវិតខ្លួនឯង និងក្លាយជាបុគ្គលដែលមានទំនួលខុសត្រូវកាន់តែច្រើន។",
                    bullets: [
                        "មានស្មារតីសកម្ម (Be Proactive): អ្នកជាអ្នកគ្រប់គ្រងជីវិតនិងជម្រើសរបស់អ្នក។ ទទួលខុសត្រូវលើសកម្មភាពនិងឥរិយាបថរបស់អ្នក។ កុំបន្ទោសអ្នកដទៃឬកត្តាខាងក្រៅ។",
                        "ចាប់ផ្តើមដោយគិតពីទីបញ្ចប់ (Begin with the End in Mind): កំណត់តម្លៃ គោលដៅ និងអ្វីដែលសំខាន់សម្រាប់អ្នក។ បង្កើតសេចក្តីថ្លែងការណ៍បេសកកម្មផ្ទាល់ខ្លួន ឬចក្ខុវិស័យសម្រាប់អនាគតរបស់អ្នក។ ធ្វើការសម្រេចចិត្តដោយផ្អែកលើគោលការណ៍របស់អ្នក។",
                        "ដាក់របស់សំខាន់មុន (Put First Things First): ដាក់អាទិភាពលើពេលវេលានិងសកម្មភាពរបស់អ្នក។ ផ្តោតលើកិច្ចការសំខាន់ៗ មិនមែនគ្រាន់តែជាកិច្ចការបន្ទាន់នោះទេ។ គ្រប់គ្រងកាលវិភាគរបស់អ្នកឱ្យមានប្រសិទ្ធភាពដើម្បីសម្រេចគោលដៅរបស់អ្នក។"
                    ]
                },
                hardWords: [
                    { word: "proactive", translation: "មានស្មារតីសកម្ម" },
                    { word: "prioritize", translation: "ដាក់អាទិភាព" },
                    { word: "effectively", translation: "ប្រកបដោយប្រសិទ្ធភាព" },
                    { word: "mission statement", translation: "សេចក្តីថ្លែងការណ៍បេសកកម្ម" },
                    { word: "self-mastery", translation: "ការគ្រប់គ្រងខ្លួនឯង" },
                    { word: "emphasize", translation: "សង្កត់ធ្ងន់" }
                ]
            },
            {
                english: {
                    title: "Public Victory (Habits 4-6)",
                    body: "This set of habits focuses on public victory—how to work well with others. These are habits that build stronger relationships and improve collaboration.",
                    bullets: [
                        "Think Win-Win: Seek solutions that benefit everyone involved. Aim for mutual respect and understanding in relationships. Avoid competitive or “win-lose” thinking.",
                        "Seek First to Understand, Then to Be Understood: Listen empathetically to others before speaking. Try to see things from their perspective. Communicate your own thoughts clearly and respectfully afterward.",
                        "Synergize: Value differences and work together. Combine strengths to achieve more than you could alone. Find creative solutions through collaboration."
                    ]
                },
                khmer: {
                    title: "ជ័យជំនះសាធារណៈ (ទម្លាប់ទី ៤-៦)",
                    body: "សំណុំនៃទម្លាប់ទាំងនេះផ្តោតលើជ័យជំនះសាធារណៈ—របៀបធ្វើការជាមួយអ្នកដទៃឱ្យបានល្អ។ ទាំងនេះគឺជាទម្លាប់ដែលកសាងទំនាក់ទំនងកាន់តែរឹងមាំ និងបង្កើនកិច្ចសហការ។",
                    bullets: [
                        "គិតបែបឈ្នះ-ឈ្នះ (Think Win-Win): ស្វែងរកដំណោះស្រាយដែលផ្តល់ប្រយោជន៍ដល់គ្រប់ភាគីពាក់ព័ន្ធ។ ស្វែងរកការគោរពនិងការយល់ចិត្តគ្នាទៅវិញទៅមកក្នុងទំនាក់ទំនង។ ជៀសវាងការគិតបែបប្រកួតប្រជែងឬ «ឈ្នះ-ចាញ់»។",
                        "ស្វែងយល់អ្នកដទៃមុននឹងឲ្យគេយល់ពីខ្លួនឯង (Seek First to Understand, Then to Be Understood): ស្តាប់អ្នកដទៃដោយយកចិត្តទុកដាក់មុននឹងនិយាយ។ ព្យាយាមមើលអ្វីៗពីទស្សនៈរបស់ពួកគេ។ និយាយគំនិតផ្ទាល់ខ្លួនរបស់អ្នកឱ្យបានច្បាស់លាស់និងគោរពគ្នា។",
                        "ធ្វើការរួមគ្នា (Synergize): ឱ្យតម្លៃភាពខុសគ្នាហើយធ្វើការជាមួយគ្នា។ រួមបញ្ចូលគ្នានូវភាពខ្លាំងដើម្បីសម្រេចបានកាន់តែច្រើនជាងធ្វើតែម្នាក់ឯង។ ស្វែងរកដំណោះស្រាយប្រកបដោយភាពច្នៃប្រឌិតតាមរយៈកិច្ចសហការ។"
                    ]
                },
                hardWords: [
                    { word: "collaborate", translation: "កិច្ចសហការ" },
                    { word: "empathically", translation: "ដោយយកចិត្តទុកដាក់" },
                    { word: "synergize", translation: "ធ្វើការរួមគ្នា" },
                    { word: "mutual", translation: "ទៅវិញទៅមក" },
                    { word: "collaboration", translation: "កិច្ចសហការ" }
                ]
            },
            {
                english: {
                    title: "Sharpen the Saw (Habit 7)",
                    body: "Finally, Habit 7 focuses on continuous self-renewal. This habit emphasizes the importance of taking time to care for oneself physically (exercise, eat well), mentally (read, learn), emotionally (build relationships), and spiritually (meditate, connect with nature). It's about maintaining balance and continuously improving oneself so that all other habits can be practiced effectively.",
                    bullets: []
                },
                khmer: {
                    title: "សំលៀងពូថៅ (ទម្លាប់ទី ៧)",
                    body: "ជាចុងក្រោយ ទម្លាប់ទី ៧ ផ្តោតលើការកែលម្អខ្លួនឯងជាបន្តបន្ទាប់។ ទម្លាប់នេះសង្កត់ធ្ងន់លើសារៈសំខាន់នៃការចំណាយពេលថែរក្សាខ្លួនឯងផ្នែករាងកាយ (ហាត់ប្រាណ ញ៉ាំអាហារល្អ) ផ្លូវចិត្ត (អាន សិក្សា) អារម្មណ៍ (កសាងទំនាក់ទំនង) និងស្មារតី (ធ្វើសមាធិ ភ្ជាប់ជាមួយធម្មជាតិ)។ វាគឺអំពីការរក្សាតុល្យភាពនិងការកែលម្អខ្លួនឯងជាបន្តបន្ទាប់ដើម្បីឱ្យទម្លាប់ផ្សេងទៀតអាចអនុវត្តបានប្រកបដោយប្រសិទ្ធភាព។",
                },
                hardWords: [
                    { word: "renew", translation: "កែលម្អឡើងវិញ" },
                    { word: "spiritually", translation: "ផ្នែកស្មារតី" },
                    { word: "balance", translation: "តុល្យភាព" },
                    { word: "effectively", translation: "ប្រកបដោយប្រសិទ្ធភាព" },
                    { word: "emphasizes", translation: "សង្កត់ធ្ងន់" },
                    { word: "physically", translation: "ផ្នែករាងកាយ" },
                    { word: "mentally", translation: "ផ្នែកផ្លូវចិត្ត" },
                    { word: "meditate", translation: "ធ្វើសមាធិ" }
                ]
            },
        ],
    };
    
    // SVG icon for the play action
    const PlayIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors">
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    );

    // SVG icon for the stop action
    const StopIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        </svg>
    );
    
    // SVG icon for the speaker (used for hard word popups)
    const SpeakerIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2 w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
    );

    // Effect to load available voices and select a default
    useEffect(() => {
        const synthInstance = window.speechSynthesis;
        setSynth(synthInstance);

        const loadVoices = () => {
            const voices = synthInstance.getVoices();
            if (voices.length > 0) {
                // Find US English voices and select the 4th, with a fallback
                const usEnglishVoices = voices.filter(voice => voice.lang.startsWith('en-US'));
                const defaultVoice = usEnglishVoices[3] || usEnglishVoices[0] || voices.find(voice => voice.lang.startsWith('en-US'));
                setSelectedVoice(defaultVoice);
            }
        };

        loadVoices();
        if (synthInstance.onvoiceschanged !== undefined) {
            synthInstance.onvoiceschanged = loadVoices;
        }
    }, []);

    // Function to handle the play/pause logic for text-to-speech
    const handleVoiceOver = (text, index) => {
        if (!synth || !selectedVoice) return;
        
        // If the same section is speaking, stop it.
        if (speakingSectionIndex === index) {
            synth.cancel();
            setSpeakingSectionIndex(null);
        } else {
            // Otherwise, stop any current speech and start the new section's speech.
            synth.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice.lang;
            utterance.onend = () => {
                setSpeakingSectionIndex(null);
            };

            synth.speak(utterance);
            setSpeakingSectionIndex(index);
        }
    };

    // Function to handle showing the hard word popup
    const handleHardWordClick = (e, word, translation) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        setHardWordPopup({
            visible: true,
            word,
            translation,
            top: rect.bottom + window.scrollY + 10,
            left: rect.left + window.scrollX,
        });
    };

    // Function to handle playing audio of a specific hard word
    const handlePopupAudio = (word) => {
        if (!synth || !selectedVoice) return;
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
        synth.speak(utterance);
    };

    // Function to replace hard words with clickable spans.
    const renderEnglishText = (text, hardWords) => {
        if (!hardWords || hardWords.length === 0) {
            return text;
        }
    
        const hardWordMap = new Map(hardWords.map(hw => [hw.word.toLowerCase(), hw]));
        const wordsToMatch = hardWords.map(hw => hw.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const regex = new RegExp(`(${wordsToMatch})`, 'gi');
    
        return text.split(regex).map((part, index) => {
            const lowercasePart = part.toLowerCase();
            const wordMatch = hardWordMap.get(lowercasePart);
            if (wordMatch) {
                const { word, translation } = wordMatch;
                return (
                    <span
                        key={index}
                        className="hard-word"
                        onClick={(e) => handleHardWordClick(e, word, translation)}
                    >
                        {part}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <div className="p-8 px-1 bg-gray-50 min-h-screen">
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
                .hard-word {
                  text-decoration: none;
                  border-bottom: 1px dashed #6b7280;
                  cursor: pointer;
                }
                `}
            </style>
            <div className="max-w-7xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white">
                
                {/* Main Title Section */}
                <div className="bg-gray-800 text-white p-6 text-center">
                    <h1 className="text-4xl font-bold title-font mb-2">{essayData.englishTitle}</h1>
                    <h1 className="text-2xl font-bold title-font">{essayData.khmerTitle}</h1>
                </div>
                
                {/* Main Content Columns */}
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    
                    {/* English Column */}
                    <div className="p-6 px-2 md:w-1/2">
                        {essayData.sections.map((section, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-2xl font-bold subtitle-font text-gray-800 mb-2 flex items-center gap-2">
                                    {section.english.title}
                                    <button onClick={() => handleVoiceOver(section.english.title + ". " + section.english.body, index)}>
                                        {speakingSectionIndex === index ? <StopIcon /> : <PlayIcon />}
                                    </button>
                                </h2>
                                <p className="text-base body-font text-gray-700 leading-relaxed mb-4">
                                    {renderEnglishText(section.english.body, section.hardWords)}
                                </p>
                                {section.english.bullets && section.english.bullets.length > 0 && (
                                    <ul className="list-disc list-inside space-y-2 body-font text-gray-700">
                                        {section.english.bullets.map((bullet, bulletIndex) => (
                                            <li key={bulletIndex} className="flex items-start">
                                                <span className="caption-font text-sm inline-block w-full">{renderEnglishText(bullet, section.hardWords)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Khmer Column */}
                    <div className="p-6 md:w-1/2 bg-gray-100">
                        {essayData.sections.map((section, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-2xl font-bold subtitle-font text-gray-800 mb-2">
                                    {section.khmer.title}
                                </h2>
                                <p className="text-base body-font text-gray-700 leading-relaxed mb-4">
                                    {section.khmer.body}
                                </p>
                                {section.khmer.bullets && section.khmer.bullets.length > 0 && (
                                    <ul className="list-disc list-inside space-y-2 body-font text-gray-700">
                                        {section.khmer.bullets.map((bullet, bulletIndex) => (
                                            <li key={bulletIndex}>{bullet}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Hard Word Popup */}
            {hardWordPopup.visible && (
                <div
                    className="absolute z-50 bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col items-center"
                    style={{ top: hardWordPopup.top, left: hardWordPopup.left }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="body-font font-bold text-gray-900">{hardWordPopup.word}</span>
                        <button onClick={() => handlePopupAudio(hardWordPopup.word)}>
                            <SpeakerIcon />
                        </button>
                    </div>
                    <span className="body-font text-gray-700">{hardWordPopup.translation}</span>
                    <button
                        onClick={() => setHardWordPopup({ ...hardWordPopup, visible: false })}
                        className="absolute top-1 right-2 text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

// SVG icon for the play action
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors">
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);

// SVG icon for the stop action
const StopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    </svg>
);

// SVG icon for the speaker (used for hard word popups)
const SpeakerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2 w-5 h-5 cursor-pointer hover:text-blue-500 transition-colors">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);

export default Item4;
