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

const playAudio = (text, voice, setPlayingItemId, itemId, setAudioStatus) => {
  if (isSpeaking) {
    stopAudio();
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;

  utterance.onstart = () => {
    isSpeaking = true;
    if (setAudioStatus) setAudioStatus('playing');
    if (setPlayingItemId) setPlayingItemId(itemId);
  };
  
  utterance.onend = () => {
    isSpeaking = false;
    if (setAudioStatus) setAudioStatus('stopped');
    if (setPlayingItemId) setPlayingItemId(null);
  };
  
  utterance.onerror = (event) => {
    console.error('SpeechSynthesisUtterance.onerror', event.error);
    isSpeaking = false;
    if (setAudioStatus) setAudioStatus('stopped');
    if (setPlayingItemId) setPlayingItemId(null);
  };

  window.speechSynthesis.speak(utterance);
};

const stopAudio = () => {
  window.speechSynthesis.cancel();
  isSpeaking = false;
};

// Hard Words and Khmer Translations
const hardWords = [
  { word: "unconsciously", translation: "ដោយមិនដឹងខ្លួន", audio: "unconsciously" },
  { word: "dignity", translation: "សេចក្តីថ្លៃថ្នូរ", audio: "dignity" },
  { word: "compound", translation: "កើនឡើង", audio: "compound" },
  { word: "diminishing returns", translation: "ផលតបស្នងថយចុះ", audio: "diminishing returns" },
  { word: "prioritized", translation: "កំណត់អាទិភាព", audio: "prioritized" },
  { word: "alleviates", translation: "បន្ថយ", audio: "alleviates" },
  { word: "insecure", translation: "មិនមានសុវត្ថិភាព", audio: "insecure" },
  { word: "narcissist", translation: "អ្នកក្បត់ជាតិ", audio: "narcissist" },
  { word: "extraordinary", translation: "មិនធម្មតា", audio: "extraordinary" },
  { word: "inordinate", translation: "មិនធម្មតា", audio: "inordinate" },
  { word: "currency", translation: "រូបិយប័ណ្ណ", audio: "currency" },
  { word: "integrity", translation: "សុចរិតភាព", audio: "integrity" },
  { word: "channel", translation: "បញ្ជូន", audio: "channel" },
  { word: "meaningful", translation: "មានន័យ", audio: "meaningful" },
  { word: "mastered", translation: "ធ្វើជាម្ចាស់", audio: "mastered" },
];

const title = "40 Life Lessons at 40 (That I Wish I Knew at 20)";
const titleKhmer = "មេរៀនជីវិតនៅអាយុ 40 ឆ្នាំ (ដែលខ្ញុំប៉ងចង់ដឹងកាលពីអាយុ 20 ឆ្នាំ)";
const writtenBy = "Written by Mark Manson";
const writtenByKhmer = "សរសេរដោយ Mark Manson";

const introduction = `Today is my 40th birthday. A decade ago, when I turned 30, I wrote an article sharing life lessons to survive your 20s and crowd-sourced advice for excelling in your 30s. It was a big hit.
So, here's more of the good stuff: 40 life lessons I've learned by 40 that I wish I had known at 20.`;

const introductionKhmer = `ថ្ងៃនេះជាខួបកំណើតគម្រប់ 40 ឆ្នាំរបស់ខ្ញុំ។ កាលពីមួយទសវត្សរ៍មុន ពេលខ្ញុំអាយុ 30 ឆ្នាំ ខ្ញុំបានសរសេរអត្ថបទមួយចែករំលែកមេរៀនជីវិតដើម្បីរស់រានក្នុងវ័យ 20 ឆ្នាំ និងដំបូន្មានប្រមូលផ្តុំពីមហាជនដើម្បីឈានទៅមុខក្នុងវ័យ 30 ឆ្នាំ។ វាពិតជាទទួលបានការគាំទ្រខ្លាំង។ ដូច្នេះ នេះជាចំណុចល្អៗបន្ថែមទៀត៖ មេរៀនជីវិត 40 យ៉ាងដែលខ្ញុំបានរៀននៅអាយុ 40 ឆ្នាំ ដែលខ្ញុំប៉ងចង់ដឹងកាលពីអាយុ 20 ឆ្នាំ។`;

const sections = [
  {
    title: "Part 1: Self-Improvement & Relationships",
    titleKhmer: "ផ្នែកទី 1៖ ការអភិវឌ្ឍខ្លួនឯង និងទំនាក់ទំនង",
    body: `1. Your relationship with others reflects your relationship with yourself.
If you treat yourself poorly, you will unconsciously seek out and tolerate others who do the same. If you treat yourself with dignity and respect, you'll only tolerate others who treat you likewise. To get right with the world, get right with yourself first.
2. The only way to feel better about yourself is to do things worth feeling good about.
Respect is earned, not given.
3. The only failure is not trying.
The only rejection is not asking. The only mistake is not risking anything. Success and failure are fuzzy concepts that only exist in your mind before you act, not after. After the fact, everything is a mixture of both. The only real failure is doing nothing.
4. No one is coming to save you.
No single thing—no goal, no achievement, no relationship—will solve all your problems. No one will ever "fix" you. It's completely normal to feel mildly inadequate and somewhat dissatisfied with your life. In fact, it might be the most normal thing about you.
5. Be the partner you want to have.
If you want a healthy, fit, loyal, and trustworthy partner, then you must be healthy, fit, loyal, and trustworthy yourself. Ask yourself: "Would I date me?" If the answer is no, you have a problem.
6. The most valuable things in life compound over a long period of time.
This includes health, wealth, knowledge, confidence, and relationships. These things can be frustratingly slow when you're young. But if you start building them early and consistently, by your 30s and 40s you will have an incredible life.
7. The most sexy and exciting things in life are the opposite.
These things start out fun but have intense diminishing returns. When you're young, they distract you and consume your time. This includes social media, casual sex, drugs, alcohol, video games, gambling, and vacations. The first time is incredible, the second is almost as good, but after that, it's all downhill. Experience them a little, then quickly move on. (Except the blowjobs. Don't move on from the blowjobs.)
8. If you're not turning down things that excite you, you're not focused enough.
Our world is overflowing with stimulation and opportunity. If you aren't struggling to say "no," you haven't correctly prioritized what truly matters to you.
9. Taking responsibility for your problems alleviates more suffering than it creates.
Most people assume that taking responsibility for your pain will make you feel worse. The opposite is true. The more responsibility you take, the more empowered you are to do something about that pain. This is because...
10. You give power to those you blame.
When you blame someone else for your problems, you give them power over you. You allow them to dictate your happiness and well-being. This is foolish, so don't do it.
11. If you have to tell someone you're something, you're not that thing.
A rich person doesn't feel the need to show off their wealth. A smart person doesn't need to announce their intelligence. A confident person doesn't have to prove their confidence; they just are. Don't say it. Be it.
12. Motivation is not the cause of action, but the effect.
If you want to feel motivated to do something, take the smallest action toward it. Then let the momentum carry you forward.
13. Love is not the cause of commitment, but the effect.
You don't wait for a perfect relationship to commit. You commit to a person to create a perfect relationship.
14. Passion is not the cause of good work, but the effect.
You don’t wait to find something you love doing. Instead, you learn to do something well, and the process of developing competency and agency causes you to become passionate about it.
15. The person you marry is the person you fight with.
The house you buy is the house you repair. The dream job you take is the job you stress over. Everything comes with an inherent sacrifice. What makes you feel good will also inevitably make you feel bad.
16. A happy life is not a life without stress; it's a life of meaningful stress.
'Nuff said.
17. Don't view exercise as an exchange for something.
You don't work out to lose a few pounds or to earn a hamburger. With this mindset, you'll lose motivation quickly. Instead, view exercise as an investment. For every unit of energy you put in, you'll receive multiple units of energy back over weeks, months, and years. This is why exercising a little bit every day is far superior to exercising hardcore occasionally.`,
    bodyKhmer: `1. ទំនាក់ទំនងរបស់អ្នកជាមួយអ្នកដទៃឆ្លុះបញ្ចាំងពីទំនាក់ទំនងរបស់អ្នកជាមួយខ្លួនឯង។
ប្រសិនបើអ្នកប្រព្រឹត្តមិនល្អចំពោះខ្លួនឯង អ្នកនឹងស្វែងរក និងអត់ឱនដោយមិនដឹងខ្លួនចំពោះអ្នកដទៃដែលប្រព្រឹត្តដូចគ្នា។ ប្រសិនបើអ្នកចាត់ទុកខ្លួនឯងដោយសេចក្តីថ្លៃថ្នូរ និងការគោរព អ្នកនឹងអត់ឱនតែអ្នកដែលប្រព្រឹត្តដូចអ្នកប៉ុណ្ណោះ។ ដើម្បីផ្សះផ្សាជាមួយពិភពលោក ចូរផ្សះផ្សាជាមួយខ្លួនឯងជាមុនសិន។
2. មធ្យោបាយតែមួយគត់ដើម្បីមានអារម្មណ៍ល្អប្រសើរចំពោះខ្លួនឯង គឺធ្វើអ្វីដែលគួរមានអារម្មណ៍ល្អចំពោះខ្លួនឯង។
ការគោរពត្រូវបានទទួល មិនមែនត្រូវបានផ្តល់ឱ្យទេ។
3. បរាជ័យតែមួយគត់គឺមិនបានព្យាយាម។
ការបដិសេធតែមួយគត់គឺមិនបានសួរ។ កំហុសតែមួយគត់គឺមិនបានប្រថុយអ្វីទាំងអស់។ ភាពជោគជ័យនិងបរាជ័យ គឺជាគំនិតមិនច្បាស់លាស់ដែលកើតមានតែនៅក្នុងចិត្តរបស់អ្នក មុនពេលអ្នកធ្វើសកម្មភាព មិនមែនក្រោយទេ។ បន្ទាប់ពីការណ៍ពិត អ្វីៗទាំងអស់គឺជាការលាយបញ្ចូលគ្នានៃទាំងពីរ។ បរាជ័យពិតប្រាកដតែមួយគត់គឺមិនធ្វើអ្វីសោះ។
4. គ្មាននរណាមកសង្គ្រោះអ្នកឡើយ។
គ្មានអ្វីតែមួយមុខ — គ្មានគោលដៅ គ្មានសមិទ្ធផល គ្មានទំនាក់ទំនង — នឹងអាចដោះស្រាយបញ្ហាទាំងអស់របស់អ្នកបានទេ។ គ្មាននរណាម្នាក់នឹង «ជួសជុល» អ្នកបានឡើយ។ វាជារឿងធម្មតាទេក្នុងការមានអារម្មណ៍មិនគ្រប់គ្រាន់បន្តិចបន្តួច និងមិនពេញចិត្តនឹងជីវិតរបស់អ្នក។ តាមពិតទៅ វាអាចជារឿងធម្មតាបំផុតអំពីអ្នក។
5. ចូរធ្វើជាដៃគូដែលអ្នកចង់មាន។
ប្រសិនបើអ្នកចង់បានដៃគូដែលមានសុខភាពល្អ រឹងមាំ ស្មោះត្រង់ និងគួរឱ្យទុកចិត្ត នោះអ្នកត្រូវតែមានសុខភាពល្អ រឹងមាំ ស្មោះត្រង់ និងគួរឱ្យទុកចិត្តដោយខ្លួនឯង។ ចូរ​សួរ​ខ្លួន​ឯង​ថា៖ «តើ​ខ្ញុំ​នឹង​ណាត់​ជួប​ខ្លួន​ខ្ញុំ​ដែរ​ឬ​ទេ?»។ ប្រសិនបើចម្លើយគឺទេ នោះអ្នកមានបញ្ហាហើយ។
6. អ្វីដែលមានតម្លៃបំផុតក្នុងជីវិតកើនឡើងក្នុងរយៈពេលយូរ។
នេះរួមបញ្ចូលទាំងសុខភាព ទ្រព្យសម្បត្តិ ចំណេះដឹង ទំនុកចិត្ត និងទំនាក់ទំនង។ រឿងទាំងនេះអាចនឹងយឺតគួរឱ្យធុញទ្រាន់នៅពេលអ្នកនៅក្មេង។ ប៉ុន្តែប្រសិនបើអ្នកចាប់ផ្តើមកសាងវាឱ្យបានឆាប់និងជាប់លាប់ ត្រឹមវ័យ 30 និង 40 ឆ្នាំ អ្នកនឹងមានជីវិតដ៏អស្ចារ្យ។
7. អ្វីដែលទាក់ទាញ និងរំភើបបំផុតក្នុងជីវិត គឺផ្ទុយពីនេះ។
រឿងទាំងនេះចាប់ផ្តើមសប្បាយ ប៉ុន្តែមានផលតបស្នងថយចុះខ្លាំង។ នៅពេលអ្នកនៅក្មេង រឿងទាំងនេះរំខានអ្នក និងស៊ីពេលរបស់អ្នក។ នេះរួមបញ្ចូលទាំងប្រព័ន្ធផ្សព្វផ្សាយសង្គម ការរួមភេទដោយចៃដន្យ គ្រឿងញៀន គ្រឿងស្រវឹង វីដេអូហ្គេម ល្បែងស៊ីសង និងថ្ងៃឈប់សម្រាក។ លើកទីមួយគឺអស្ចារ្យណាស់ លើកទីពីរគឺស្ទើរតែល្អដូចគ្នា ប៉ុន្តែបន្ទាប់ពីនោះ គឺកាន់តែធ្លាក់ចុះ។ ទទួលបទពិសោធន៍បន្តិច ហើយផ្លាស់ទីទៅមុខយ៉ាងលឿន។ (លើកលែងតែការរួមភេទតាមមាត់។ កុំចាកចេញពីការរួមភេទតាមមាត់។)
8. ប្រសិនបើអ្នកមិនបដិសេធអ្វីដែលធ្វើឱ្យអ្នករំភើបទេ នោះអ្នកមិនបានកំណត់អាទិភាពគ្រប់គ្រាន់ទេ។
ពិភពលោករបស់យើងពោរពេញទៅដោយការជំរុញ និងឱកាស។ ប្រសិនបើអ្នកមិនពិបាកនឹងនិយាយថា «ទេ» នោះអ្នកមិនបានកំណត់អាទិភាពអ្វីដែលពិតជាសំខាន់សម្រាប់អ្នកទេ។
9. ការទទួលខុសត្រូវចំពោះបញ្ហារបស់អ្នក បន្ថយការរងទុក្ខច្រើនជាងការបង្កើតវា។
មនុស្សភាគច្រើនសន្មត់ថាការទទួលខុសត្រូវចំពោះការឈឺចាប់របស់អ្នក នឹងធ្វើឱ្យអ្នកមានអារម្មណ៍កាន់តែអាក្រក់។ ផ្ទុយទៅវិញ ការពិតគឺថា ការទទួលខុសត្រូវកាន់តែច្រើន អ្នកកាន់តែមានអំណាចក្នុងការធ្វើអ្វីមួយអំពីការឈឺចាប់នោះ។ នេះដោយសារតែ...
10. អ្នកផ្តល់អំណាចដល់អ្នកដែលអ្នកបន្ទោស។
នៅពេលអ្នកបន្ទោសអ្នកផ្សេងសម្រាប់បញ្ហារបស់អ្នក អ្នកកំពុងផ្តល់អំណាចឱ្យពួកគេលើអ្នក។ អ្នកអនុញ្ញាតឱ្យពួកគេកំណត់សុភមង្គល និងសុខុមាលភាពរបស់អ្នក។ នេះជារឿងឆោតល្ងង់ ដូច្នេះកុំធ្វើវា។
11. ប្រសិនបើអ្នកត្រូវប្រាប់នរណាម្នាក់ថាអ្នកជាអ្វីមួយ នោះអ្នកមិនមែនជាអ្វីនោះទេ។
អ្នកមានមិនមានអារម្មណ៍ថាត្រូវបង្ហាញទ្រព្យសម្បត្តិរបស់ពួកគេទេ។ អ្នកឆ្លាតមិនចាំបាច់ប្រកាសពីភាពវៃឆ្លាតរបស់ពួកគេទេ។ អ្នកមានទំនុកចិត្តមិនចាំបាច់បង្ហាញទំនុកចិត្តរបស់ពួកគេទេ ពួកគេគ្រាន់តែជា។ កុំនិយាយវា។ ចូរជាវា។
12. កម្លាំងចិត្តមិនមែនជាមូលហេតុនៃសកម្មភាពទេ ប៉ុន្តែជាលទ្ធផល។
ប្រសិនបើអ្នកចង់មានអារម្មណ៍ថាមានកម្លាំងចិត្តដើម្បីធ្វើអ្វីមួយ ចូរធ្វើសកម្មភាពតូចបំផុតឆ្ពោះទៅរកវា។ បន្ទាប់មកអនុញ្ញាតឱ្យសន្ទុះបន្តដឹកនាំអ្នកទៅមុខ។
13. ស្នេហាមិនមែនជាមូលហេតុនៃកាតព្វកិច្ចទេ ប៉ុន្តែជាលទ្ធផល។
អ្នកមិនចាំបាច់រង់ចាំទំនាក់ទំនងដ៏ល្អឥតខ្ចោះដើម្បីប្តេជ្ញាចិត្តនោះទេ។ អ្នកប្តេជ្ញាចិត្តចំពោះមនុស្សម្នាក់ដើម្បីបង្កើតទំនាក់ទំនងដ៏ល្អឥតខ្ចោះ។
14. ចំណង់ចំណូលចិត្តមិនមែនជាមូលហេតុនៃការងារល្អទេ ប៉ុន្តែជាលទ្ធផល។
អ្នកមិនរង់ចាំដើម្បីរកអ្វីដែលអ្នកចូលចិត្តធ្វើនោះទេ។ ផ្ទុយទៅវិញ អ្នករៀនធ្វើអ្វីមួយឱ្យបានល្អ ហើយដំណើរការនៃការអភិវឌ្ឍសមត្ថភាព និងអំណាចនេះ ធ្វើឱ្យអ្នកក្លាយជាមនុស្សដែលមានចំណង់ចំណូលចិត្តអំពីវា។
15. មនុស្សដែលអ្នករៀបការជាមួយ គឺមនុស្សដែលអ្នកប្រយុទ្ធជាមួយ។
ផ្ទះដែលអ្នកទិញ គឺជាផ្ទះដែលអ្នកជួសជុល។ ការងារក្នុងក្តីសុបិនដែលអ្នកទទួលយក គឺជាការងារដែលអ្នកស្ត្រេស។ អ្វីៗទាំងអស់មកជាមួយការលះបង់ពីកំណើត។ អ្វីដែលធ្វើឱ្យអ្នកមានអារម្មណ៍ល្អ ក៏នឹងធ្វើឱ្យអ្នកមានអារម្មណ៍មិនល្អផងដែរ។
16. ជីវិតរីករាយមិនមែនជាជីវិតដែលគ្មានភាពតានតឹងទេ វាគឺជាជីវិតដែលមានភាពតានតឹងប្រកបដោយអត្ថន័យ។
'Nuff said.
17. កុំចាត់ទុកលំហាត់ប្រាណជាការដោះដូរសម្រាប់អ្វីមួយ។
អ្នកមិនហាត់ប្រាណដើម្បីសម្រកទម្ងន់ពីរបីគីឡូ ឬដើម្បីទទួលបានហាំប៊ឺហ្គឺទេ។ ជាមួយនឹងផ្នត់គំនិតនេះ អ្នកនឹងបាត់បង់កម្លាំងចិត្តយ៉ាងឆាប់រហ័ស។ ផ្ទុយទៅវិញ ចូរចាត់ទុកលំហាត់ប្រាណជាការវិនិយោគ។ រាល់ឯកតានៃថាមពលដែលអ្នកដាក់ចូល អ្នកនឹងទទួលបានថាមពលច្រើនឯកតាត្រឡប់មកវិញក្នុងរយៈពេលជាច្រើនសប្តាហ៍ ខែ និងឆ្នាំ។ នេះជាមូលហេតុដែលការហាត់ប្រាណបន្តិចបន្តួចជារៀងរាល់ថ្ងៃគឺល្អជាងការហាត់ប្រាណខ្លាំងម្តងម្កាល។`
  },
  {
    title: "Part 2: Growth & Wisdom",
    titleKhmer: "ផ្នែកទី 2៖ កំណើន និងប្រាជ្ញា",
    body: `18. Trust people.
Most people are good. While you might get hurt or embarrassed sometimes, the alternative—living in distrust—is far worse.
19. There’s no such thing as a life without problems.
Warren Buffett has money problems, and so does a homeless person. Buffett's problems are more desirable, but problems don't just disappear. They get exchanged and upgraded for better problems as you grow. The solution to today’s problem will be the seed of tomorrow’s. Set your expectations accordingly.
20. Growth is rarely accompanied by joy.
On the contrary, growth is usually painful. That's because growth requires loss—a loss of your old values, behaviors, loves, and identity. Change always has a component of grief, so be sure to let yourself grieve.
21. Fuck being normal.
Statistically, a "normal" person is physically unhealthy, emotionally anxious and depressed, socially lonely, and financially in debt. So yeah, fuck being normal.
22. If you can’t say "no," your "yeses" mean nothing.
We are defined by what we give up, sacrifice, and reject. If you sacrifice nothing, you have no identity. You are merely a reflection of the demands of people around you. In other words, if you don't decide who you are, other people will decide for you.
23. Be careful how you define yourself.
Your identity is a self-constructed mental prison, confining you to a life of desperately seeking things to validate what you've chosen to become. Define yourself as loosely and ambiguously as possible. You will feel less defensive and be more willing to change when necessary.
24. Don't make assumptions about people.
You have no idea what they've been through. Don't make assumptions about yourself either. Chances are you have no idea what you're talking about. The last person we are objective about is ourselves.
25. No one thinks about you as much as you think about yourself.
Whatever you're insecure about, 99% of people around you haven't even noticed. This is because everyone else is too busy thinking about themselves. This might sound depressing, but it's actually liberating. You are judged far less than you think.
26. Confidence comes not from an expectation of success, but from a comfort with failure.
The word for someone who feels a need to succeed in everything is "narcissist." Don’t be a narcissist. Embrace your flaws. Embrace failure.
27. Develop a willingness to be disliked.
This will grant you the freedom to do what needs to be done, even if it's unpopular.
28. You cannot be a life-changing presence to some people without also being a complete joke to others.
Part of the price of having an impact is receiving some hate, and that hate is usually proportional to the impact.
29. Floss and wear sunscreen every day.
I know I sound like your mom right now, but trust me, in 20 years you’re going to thank me.
30. Extraordinary results come from repeating ordinary actions over an inordinate amount of time.
Any "overnight success" is secretly the result of working in obscurity for years, if not decades.`,
    bodyKhmer: `18. ជឿទុកចិត្តលើមនុស្ស។
មនុស្សភាគច្រើនល្អ។ ខណៈពេលដែលអ្នកអាចនឹងឈឺចាប់ ឬខ្មាសអៀនម្តងម្កាល ជម្រើសជំនួស—ការរស់នៅក្នុងការមិនទុកចិត្ត—គឺអាក្រក់ជាងឆ្ងាយណាស់។
19. គ្មានអ្វីដែលហៅថាជីវិតគ្មានបញ្ហាទេ។
Warren Buffett មានបញ្ហាលុយកាក់ ដូចគ្នានឹងមនុស្សគ្មានផ្ទះសម្បែងដែរ។ បញ្ហារបស់ Buffett គឺគួរឱ្យចង់បានជាង ប៉ុន្តែបញ្ហាមិនបាត់ទៅណាទេ។ ពួកគេត្រូវបានដោះដូរ និងដំឡើងថ្នាក់សម្រាប់បញ្ហាកាន់តែប្រសើរនៅពេលអ្នករីកចម្រើន។ ដំណោះស្រាយចំពោះបញ្ហានាពេលបច្ចុប្បន្ន នឹងក្លាយជាគ្រាប់ពូជនៃថ្ងៃស្អែក។ ចូរកំណត់ការរំពឹងទុករបស់អ្នកទៅតាមនោះ។
20. កំណើនកម្រនឹងអមដោយភាពរីករាយណាស់។
ផ្ទុយទៅវិញ កំណើនជាធម្មតាឈឺចាប់។ នោះគឺដោយសារតែកំណើនទាមទារការបាត់បង់—ការបាត់បង់តម្លៃ ចរិតលក្ខណៈ ស្នេហា និងអត្តសញ្ញាណចាស់របស់អ្នក។ ការផ្លាស់ប្តូរតែងតែមានសមាសភាគនៃការឈឺចាប់ ដូច្នេះត្រូវប្រាកដថាអនុញ្ញាតឱ្យខ្លួនឯងឈឺចាប់។
21. ល្មមធ្វើជាមនុស្សធម្មតាទៅ។
តាមស្ថិតិ មនុស្ស «ធម្មតា» គឺមានសុខភាពមិនល្អ ថប់បារម្ភ និងបាក់ទឹកចិត្ត មានភាពឯកកោក្នុងសង្គម និងមានបំណុលហិរញ្ញវត្ថុ។ ដូច្នេះហើយ ល្មមធ្វើជាមនុស្សធម្មតាទៅ។
22. ប្រសិនបើអ្នកមិនអាចនិយាយថា «ទេ» បានទេ នោះ «យល់ព្រម» របស់អ្នកគ្មានន័យអ្វីទេ។
យើងត្រូវបានកំណត់ដោយអ្វីដែលយើងលះបង់ បូជា និងបដិសេធ។ ប្រសិនបើអ្នកមិនលះបង់អ្វីទាំងអស់ នោះអ្នកគ្មានអត្តសញ្ញាណទេ។ អ្នកគ្រាន់តែជាការឆ្លុះបញ្ចាំងពីតម្រូវការរបស់មនុស្សជុំវិញអ្នក។ និយាយម្យ៉ាងទៀត ប្រសិនបើអ្នកមិនសម្រេចចិត្តថាអ្នកជានរណាទេ អ្នកផ្សេងនឹងសម្រេចចិត្តជំនួសអ្នក។
23. ប្រយ័ត្នចំពោះរបៀបដែលអ្នកកំណត់ខ្លួនឯង។
អត្តសញ្ញាណរបស់អ្នកគឺជាគុកផ្លូវចិត្តដែលអ្នកសាងសង់ដោយខ្លួនឯង ដោយបង្ខាំងអ្នកឱ្យរស់នៅក្នុងជីវិតនៃការស្វែងរកអ្វីដែលធ្វើឱ្យអ្នកក្លាយជាអ្វីដែលអ្នកបានជ្រើសរើស។ ចូរកំណត់ខ្លួនឯងឱ្យបានរលុង និងមិនច្បាស់លាស់តាមដែលអាចធ្វើទៅបាន។ អ្នកនឹងមានអារម្មណ៍ការពារខ្លួនតិច ហើយមានឆន្ទៈក្នុងការផ្លាស់ប្តូរកាន់តែច្រើននៅពេលចាំបាច់។
24. កុំសន្មត់លើមនុស្ស។
អ្នកមិនដឹងថាពួកគេបានឆ្លងកាត់អ្វីខ្លះទេ។ កុំសន្មត់លើខ្លួនឯងដែរ។ ឱកាសគឺអ្នកមិនដឹងថាអ្នកកំពុងនិយាយអំពីអ្វីនោះទេ។ មនុស្សចុងក្រោយដែលយើងមានគោលបំណងអំពី គឺខ្លួនយើង។
25. គ្មាននរណាម្នាក់គិតពីអ្នកច្រើនដូចអ្នកគិតពីខ្លួនឯងទេ។
មិនថាអ្នកមិនមានសុវត្ថិភាពចំពោះអ្វីនោះទេ មនុស្ស 99% នៅជុំវិញអ្នកមិនបានសូម្បីតែចាប់អារម្មណ៍។ នេះគឺដោយសារតែអ្នកផ្សេងរវល់ពេកគិតពីខ្លួនឯង។ រឿងនេះអាចស្តាប់ទៅគួរឱ្យធុញថប់ ប៉ុន្តែតាមពិតវាផ្តល់សេរីភាព។ អ្នកត្រូវបានវិនិច្ឆ័យតិចជាងអ្វីដែលអ្នកគិតឆ្ងាយណាស់។
26. ទំនុកចិត្តមិនមែនមកពីការរំពឹងទុកនៃភាពជោគជ័យនោះទេ ប៉ុន្តែមកពីភាពងាយស្រួលជាមួយបរាជ័យ។
ពាក្យសម្រាប់នរណាម្នាក់ដែលមានអារម្មណ៍ថាត្រូវជោគជ័យក្នុងគ្រប់រឿងគឺ «អ្នកក្បត់ជាតិ»។ កុំក្លាយជាអ្នកក្បត់ជាតិ។ ចូរទទួលយកចំណុចខ្វះខាតរបស់អ្នក។ ទទួលយកបរាជ័យ។
27. អភិវឌ្ឍឆន្ទៈដើម្បីឱ្យគេមិនចូលចិត្ត។
នេះនឹងផ្តល់ឱ្យអ្នកនូវសេរីភាពក្នុងការធ្វើអ្វីដែលត្រូវធ្វើ ទោះបីជាវាមិនមានប្រជាប្រិយភាពក៏ដោយ។
28. អ្នកមិនអាចក្លាយជាវត្តមានដែលផ្លាស់ប្តូរជីវិតសម្រាប់មនុស្សមួយចំនួន ដោយមិនក្លាយជាការលេងសើចទាំងស្រុងសម្រាប់អ្នកដទៃ។
ផ្នែកមួយនៃតម្លៃនៃការមានឥទ្ធិពល គឺការទទួលការស្អប់ខ្លះ ហើយការស្អប់នោះជាធម្មតាគឺសមាមាត្រទៅនឹងឥទ្ធិពល។
29. ដុសធ្មេញ និងលាបឡេការពារកម្តៅថ្ងៃជារៀងរាល់ថ្ងៃ។
ខ្ញុំដឹងថាខ្ញុំស្តាប់ទៅដូចជាម្តាយរបស់អ្នក ប៉ុន្តែជឿខ្ញុំទៅ ក្នុងរយៈពេល 20 ឆ្នាំ អ្នកនឹងអរគុណខ្ញុំ។
30. លទ្ធផលមិនធម្មតាមកពីការធ្វើសកម្មភាពធម្មតាដដែលៗក្នុងរយៈពេលដ៏មិនធម្មតា។
ភាព «ជោគជ័យមួយយប់» ណាមួយគឺលទ្ធផលសម្ងាត់នៃការធ្វើការដោយមិនមានការទទួលស្គាល់អស់រយៈពេលជាច្រើនឆ្នាំ បើមិនរាប់ទសវត្សរ៍។`
  },
  {
    title: "Part 3: Relationships & Final Thoughts",
    titleKhmer: "ផ្នែកទី 3៖ ទំនាក់ទំនង និងគំនិតចុងក្រោយ",
    body: `31. Choosing a partner is not just about romance.
You're also choosing a confidant, a counselor, a career advisor, a therapist, an investor, a teacher, a travel buddy, a roommate, a best friend, and a business partner. Whether you want to or not, your partner will become all of these things. That's what a relationship is. So choose wisely.
32. Don’t overestimate romantic love.
Love doesn't fix relationship problems or make trust issues go away. The truth is, love can harm as much as it heals; it's an amplifier. It makes a good relationship better and a bad one much worse. Love is great and beautiful when it works, but by itself, love is not enough to make a healthy relationship.
33. Trust is the currency of all relationships.
Every good relationship is built on years of trust. Every failed relationship fails because of broken trust. Therefore, honesty and integrity are the backbones of a happy life with healthy relationships. Dishonesty might be a shortcut to short-term gains, but in the long run, it will completely mess you up.
34. If all of your relationships have the same problem...
...newsflash: you are the problem.
35. There’s no such thing as a bad emotion, only a bad response to an emotion.
Every emotion can be used constructively or destructively. One of the most useful things you can learn in life is how to channel your negative emotions constructively.
36. Go to bed and wake up early.
My whole life, I promised myself I would never be that person who went to bed at 9 PM on a Friday and got up at 5 AM to hit the gym. But kids, I hate to tell you, mornings are where it’s at.
37. You don’t have to prove anything to anyone, including yourself.
Let me say that again: You don't have to prove anything to anyone, including yourself.
38. Life advice is like clothing.
Try it on. If it doesn't fit, discard it and try something else. Also, like clothing, bad advice is useless in a few weeks, but good advice will last a lifetime.
39. Nothing meaningful in life is easy, and nothing easy in life is meaningful.
We think we'd like to have everything handed to us on a silver platter, but the truth is, we don't appreciate or enjoy things we don't struggle for. So stop avoiding the difficult things in life and instead find the difficult things you enjoy.
40. It’s never too late to change.
A friend once told me a story about his grandmother. At 62, after her husband died, she started taking piano lessons. She practiced every day, and even as people told her to give it up, she kept going. By the time she was in her 90s, she had been playing for over 30 years, longer than most professional musicians have been alive. She had mastered the classics, and no one believed she took her first lesson in her 60s.
I love this story because it shows that even at an "impractical" old age, you still have more time left to learn something than most professionals in that field have even been alive.
I didn’t start writing until I was 27. I didn’t start my YouTube channel until I was 36. In every phase of my life, I've started five to ten years later than most people. Yet it didn't matter.
I get emails all the time from people asking, "I'm 20, or 40, or 60, or 80. Is it too late? Can I change? Is there time?"
The answer is, it’s never too late. There’s always time. The only question is how long we're going to sit here and make excuses.`,
    bodyKhmer: `31. ការជ្រើសរើសដៃគូមិនមែនគ្រាន់តែជាមនោសញ្ចេតនានោះទេ។
អ្នកក៏កំពុងជ្រើសរើសដៃគូដែលទុកចិត្ត ទីប្រឹក្សា ទីប្រឹក្សាអាជីព អ្នកព្យាបាលរោគ អ្នកវិនិយោគ គ្រូបង្រៀន មិត្តរួមដំណើរ មិត្តរួមបន្ទប់ មិត្តល្អបំផុត និងដៃគូអាជីវកម្ម។ មិនថាអ្នកចង់ឬមិនចង់ ដៃគូរបស់អ្នកនឹងក្លាយជាអ្វីទាំងអស់នេះ។ នោះគឺជាអ្វីដែលទំនាក់ទំនងមួយ។ ដូច្នេះ ចូរជ្រើសរើសដោយឈ្លាសវៃ។
32. កុំវាយតម្លៃស្នេហាមនោសញ្ចេតនាហួសហេតុ។
ស្នេហាមិនអាចដោះស្រាយបញ្ហាទំនាក់ទំនង ឬធ្វើឱ្យបញ្ហាការជឿទុកចិត្តបាត់ទៅទេ។ ការពិតគឺថា ស្នេហាអាចបង្កគ្រោះថ្នាក់ច្រើនដូចដែលវាអាចព្យាបាលបានដែរ។ វាគឺជាឧបករណ៍ពង្រីក។ វាធ្វើឱ្យទំនាក់ទំនងល្អកាន់តែល្អប្រសើរ ហើយទំនាក់ទំនងអាក្រក់កាន់តែអាក្រក់ទៅទៀត។ ស្នេហាគឺអស្ចារ្យនិងស្រស់ស្អាតនៅពេលដែលវាដំណើរការ ប៉ុន្តែដោយខ្លួនវាផ្ទាល់ ស្នេហាមិនគ្រប់គ្រាន់ដើម្បីបង្កើតទំនាក់ទំនងដែលមានសុខភាពល្អទេ។
33. ទំនុកចិត្តគឺជាតម្លៃនៃទំនាក់ទំនងទាំងអស់។
ទំនាក់ទំនងល្អគ្រប់យ៉ាងត្រូវបានកសាងឡើងនៅលើទំនុកចិត្តជាច្រើនឆ្នាំ។ ទំនាក់ទំនងដែលបរាជ័យគ្រប់យ៉ាងបរាជ័យដោយសារទំនុកចិត្តដែលបែកបាក់។ ដូច្នេះហើយ ភាពស្មោះត្រង់និងសុចរិតភាពគឺជាឆ្អឹងខ្នងនៃជីវិតរីករាយដែលមានទំនាក់ទំនងល្អ។ ភាពមិនស្មោះត្រង់អាចជាផ្លូវកាត់ទៅកាន់ការចំណេញរយៈពេលខ្លី ប៉ុន្តែក្នុងរយៈពេលវែង វាអាចធ្វើឱ្យអ្នកខូចខាតទាំងស្រុង។
34. ប្រសិនបើទំនាក់ទំនងទាំងអស់របស់អ្នកមានបញ្ហាដូចគ្នា...
...ដំណឹងបន្ទាន់៖ អ្នកគឺជាបញ្ហា។
35. គ្មានអ្វីដែលហៅថាអារម្មណ៍អាក្រក់ទេ មានតែការឆ្លើយតបមិនល្អចំពោះអារម្មណ៍ប៉ុណ្ណោះ។
អារម្មណ៍គ្រប់យ៉ាងអាចត្រូវបានប្រើប្រាស់ក្នុងលក្ខណៈស្ថាបនា ឬបំផ្លិចបំផ្លាញ។ រឿងមួយក្នុងចំណោមរឿងដែលមានប្រយោជន៍បំផុតដែលអ្នកអាចរៀនក្នុងជីវិត គឺរបៀបបញ្ជូនអារម្មណ៍អវិជ្ជមានរបស់អ្នកក្នុងលក្ខណៈស្ថាបនា។
36. ចូលគេងនិងក្រោកពីព្រឹក។
ពេញមួយជីវិតរបស់ខ្ញុំ ខ្ញុំបានសន្យាជាមួយខ្លួនឯងថាខ្ញុំនឹងមិនក្លាយជាមនុស្សដែលចូលគេងនៅម៉ោង 9 យប់នៅថ្ងៃសុក្រ ហើយក្រោកពីម៉ោង 5 ព្រឹកដើម្បីទៅកន្លែងហាត់ប្រាណឡើយ។ ប៉ុន្តែក្មេងៗអើយ ខ្ញុំស្អប់ក្នុងការប្រាប់អ្នកថា ពេលព្រឹកគឺជារឿងសំខាន់។
37. អ្នកមិនចាំបាច់បង្ហាញអ្វីដល់នរណាម្នាក់ឡើយ រួមទាំងខ្លួនអ្នកផងដែរ។
ខ្ញុំសូមនិយាយម្តងទៀត៖ អ្នកមិនចាំបាច់បង្ហាញអ្វីដល់នរណាម្នាក់ឡើយ រួមទាំងខ្លួនអ្នកផងដែរ។
38. ដំបូន្មានជីវិតគឺដូចជាសម្លៀកបំពាក់។
សាកពាក់វា។ ប្រសិនបើវាមិនសមទេ ចូរដកវាចេញហើយសាកអ្វីផ្សេងទៀត។ ដូចគ្នានេះដែរ ដូចជាសម្លៀកបំពាក់ ដំបូន្មានអាក្រក់គឺគ្មានប្រយោជន៍ក្នុងរយៈពេលពីរបីសប្តាហ៍ ប៉ុន្តែដំបូន្មានល្អនឹងស្ថិតស្ថេរពេញមួយជីវិត។
39. គ្មានអ្វីដែលមានអត្ថន័យក្នុងជីវិតគឺងាយស្រួលទេ ហើយគ្មានអ្វីដែលងាយស្រួលក្នុងជីវិតគឺមានអត្ថន័យឡើយ។
យើងគិតថាយើងចង់មានអ្វីគ្រប់យ៉ាងដែលត្រូវបានផ្តល់ឱ្យយើងនៅលើចានប្រាក់ ប៉ុន្តែការពិតគឺ យើងមិនឱ្យតម្លៃ ឬរីករាយនឹងអ្វីដែលយើងមិនតស៊ូដើម្បី។ ដូច្នេះចូរបញ្ឈប់ការគេចវេសពីអ្វីដែលពិបាកក្នុងជីវិត ហើយផ្ទុយទៅវិញស្វែងរកអ្វីដែលពិបាកដែលអ្នករីករាយ។
40. វាមិនដែលហួសពេលក្នុងការផ្លាស់ប្តូរឡើយ។
មិត្តម្នាក់ធ្លាប់បានប្រាប់ខ្ញុំរឿងរ៉ាវអំពីជីដូនរបស់គាត់។ នៅអាយុ 62 ឆ្នាំ បន្ទាប់ពីស្វាមីរបស់គាត់បានស្លាប់ គាត់បានចាប់ផ្តើមរៀនមេរៀនព្យាណូ។ គាត់ហាត់រៀនជារៀងរាល់ថ្ងៃ ហើយទោះបីជាមនុស្សប្រាប់ឱ្យគាត់បោះបង់ចោលក៏ដោយ ក៏គាត់នៅតែបន្តទៅមុខ។ ដល់ពេលគាត់អាយុ 90 ឆ្នាំ គាត់បានលេងអស់រយៈពេលជាង 30 ឆ្នាំហើយ យូរជាងតន្ត្រីករអាជីពភាគច្រើនបានរស់នៅទៅទៀត។ គាត់បានធ្វើជាម្ចាស់លើតន្ត្រីបុរាណ ហើយគ្មាននរណាម្នាក់ជឿថាគាត់បានរៀនមេរៀនដំបូងរបស់គាត់នៅអាយុ 60 ឆ្នាំឡើយ។
ខ្ញុំស្រឡាញ់រឿងនេះណាស់ ព្រោះវាបង្ហាញថា ទោះបីជានៅអាយុ «មិនសមហេតុផល» ចាស់ក៏ដោយ ក៏អ្នកនៅតែមានពេលច្រើនដើម្បីរៀនអ្វីមួយជាងអ្នកជំនាញភាគច្រើនក្នុងវិស័យនោះបានរស់នៅទៅទៀត។
ខ្ញុំមិនបានចាប់ផ្តើមសរសេរទេរហូតដល់ខ្ញុំអាយុ 27 ឆ្នាំ។ ខ្ញុំមិនបានចាប់ផ្តើមប៉ុស្តិ៍ YouTube របស់ខ្ញុំទេរហូតដល់ខ្ញុំអាយុ 36 ឆ្នាំ។ ក្នុងដំណាក់កាលនីមួយៗនៃជីវិតរបស់ខ្ញុំ ខ្ញុំបានចាប់ផ្តើមយឺតជាងមនុស្សភាគច្រើនពីប្រាំទៅដប់ឆ្នាំ។ ប៉ុន្តែវាមិនមានបញ្ហាទេ។
ខ្ញុំទទួលបានអ៊ីមែលគ្រប់ពេលពីមនុស្សដែលសួរថា «ខ្ញុំអាយុ 20 ឆ្នាំ ឬ 40 ឆ្នាំ ឬ 60 ឆ្នាំ ឬ 80 ឆ្នាំ។ តើវាហួសពេលហើយឬនៅ? តើខ្ញុំអាចផ្លាស់ប្តូរបានទេ? តើមានពេលទេ?»
ចម្លើយគឺ វាមិនដែលហួសពេលឡើយ។ តែងតែមានពេល។ សំណួរតែមួយគត់គឺថាតើយើងនឹងអង្គុយនៅទីនេះហើយបង្កើតលេសយូរប៉ុណ្ណា។`
  },
];


const App = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [playingItemId, setPlayingItemId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: '', translation: '', x: 0, y: 0 });
  const popupRef = useRef(null);
  const audioTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setSelectedVoice(getDefaultVoice(availableVoices));
      }
    };
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
      fetchVoices();
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
        if (audioTimeoutRef.current) {
          clearTimeout(audioTimeoutRef.current);
          audioTimeoutRef.current = null;
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleTitleAudio = (sectionIndex) => {
    if (!selectedVoice) return;
    const itemId = `title-${sectionIndex}`;
    const textToSpeak = sections[sectionIndex].title;

    if (playingItemId === itemId) {
      stopAudio();
      setPlayingItemId(null);
    } else {
      stopAudio();
      playAudio(textToSpeak, selectedVoice, setPlayingItemId, itemId);
    }
  };

  const handleBodyAudio = (sectionIndex) => {
    if (!selectedVoice) return;
    const itemId = `body-${sectionIndex}`;
    const textToSpeak = sections[sectionIndex].body;
    
    if (playingItemId === itemId) {
      stopAudio();
      setPlayingItemId(null);
    } else {
      stopAudio();
      playAudio(textToSpeak, selectedVoice, setPlayingItemId, itemId);
    }
  };

  const handleIntroAudio = () => {
    if (!selectedVoice) return;
    const itemId = 'intro';

    if (playingItemId === itemId) {
      stopAudio();
      setPlayingItemId(null);
    } else {
      stopAudio();
      playAudio(introduction, selectedVoice, setPlayingItemId, itemId);
    }
  };

  const handleHardWordClick = (event, wordObj) => {
    event.stopPropagation();
    const rect = event.target.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Position the popup near the word
    const popupX = rect.left + scrollX + rect.width / 2;
    const popupY = rect.bottom + scrollY + 10;
    
    setPopupContent({
      word: wordObj.word,
      translation: wordObj.translation,
      x: popupX,
      y: popupY
    });
    setShowPopup(true);

    if (audioTimeoutRef.current) {
      clearTimeout(audioTimeoutRef.current);
    }
    audioTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
      audioTimeoutRef.current = null;
    }, 5000); // 5-second auto-hide
  };

  const handlePopupAudio = (word) => {
    if (!selectedVoice) return;
    playAudio(word, selectedVoice);
  };

  const renderTextWithHardWords = (text) => {
    const regex = new RegExp(`\\b(${hardWords.map(hw => hw.word).join('|')})\\b`, 'gi');
    return text.split(regex).map((part, index) => {
      const hardWord = hardWords.find(hw => hw.word.toLowerCase() === part.toLowerCase());
      if (hardWord) {
        return (
          <span
            key={index}
            className="border-b border-dashed border-gray-400 cursor-pointer hover:text-blue-600 transition-colors duration-200"
            onClick={(e) => handleHardWordClick(e, hardWord)}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleVoiceChange = (event) => {
    const voiceName = event.target.value;
    const voice = voices.find(v => v.name === voiceName);
    setSelectedVoice(voice);
  };

  const renderPlayButton = (itemId) => {
    const isPlaying = playingItemId === itemId;
    return (
      <button onClick={() => isPlaying ? stopAudio() : handleAudioPlay(itemId)}>
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 text-xl">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 text-xl">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          </svg>
        )}
      </button>
    );
  };

  const handleAudioPlay = (itemId) => {
    if (!selectedVoice) return;
    
    if (itemId.startsWith('title-')) {
      const index = parseInt(itemId.split('-')[1]);
      handleTitleAudio(index);
    } else if (itemId.startsWith('body-')) {
      const index = parseInt(itemId.split('-')[1]);
      handleBodyAudio(index);
    } else if (itemId === 'intro') {
      handleIntroAudio();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-4">
      
      {/* Font Styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;600&family=Varela+Round&family=Cabin:wght@400;600&family=Poppins:wght@400;600&family=Noto+Serif+Khmer:wght@400;600&family=Battambang:wght@400;600&family=Suwannaphum:wght@400&family=Nokora:wght@400&display=swap');
        .font-english-heading { font-family: 'Saira Condensed', sans-serif; }
        .font-english-subheading { font-family: 'Varela Round', sans-serif; }
        .font-english-body { font-family: 'Cabin', sans-serif; }
        .font-english-label { font-family: 'Poppins', sans-serif; }
        .font-khmer-heading { font-family: 'Noto Serif Khmer', serif; }
        .font-khmer-subheading { font-family: 'Battambang', cursive; }
        .font-khmer-body { font-family: 'Suwannaphum', serif; }
        .font-khmer-label { font-family: 'Nokora', serif; }
        .hard-word-popup {
          position: absolute;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 12px;
          z-index: 100;
          transform: translateX(-50%);
        }
      `}</style>

      {/* Main container */}
      <div className="container mx-auto max-w-7xl rounded-2xl bg-white shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative p-6 md:p-12 text-center bg-gray-900 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-english-heading font-extrabold mb-2 leading-tight">
            {title}
          </h1>
          <h2 className="text-xl sm:text-2xl font-khmer-heading font-bold text-gray-200">
            {titleKhmer}
          </h2>
          <p className="text-sm sm:text-base font-english-label text-gray-400 mt-2">{writtenBy}</p>
          <p className="text-sm sm:text-base font-khmer-label text-gray-400">{writtenByKhmer}</p>
          
          {/* Voice Selection Dropdown */}
          <div className="absolute top-4 right-4">
            <select
              onChange={handleVoiceChange}
              value={selectedVoice?.name || ''}
              className="p-2 rounded-lg text-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* English Column */}
          <div className="p-6 md:p-12 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-2xl font-english-subheading font-bold text-gray-900">Introduction</h2>
              {renderPlayButton('intro')}
            </div>
            <p className="font-english-body leading-relaxed text-gray-700 mb-8">
              {introduction}
            </p>
            
            {sections.map((section, index) => (
              <div key={`section-en-${index}`} className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-xl font-english-subheading font-bold text-gray-900">
                    {section.title}
                  </h3>
                  {renderPlayButton(`title-${index}`)}
                </div>
                <div className="flex items-start space-x-3 mb-4">
                  <p className="font-english-body leading-relaxed text-gray-700 whitespace-pre-line flex-grow">
                    {renderTextWithHardWords(section.body)}
                  </p>
                  {renderPlayButton(`body-${index}`)}
                </div>
              </div>
            ))}
          </div>

          {/* Khmer Column */}
          <div className="p-6 md:p-12">
            <h2 className="text-2xl font-khmer-subheading font-bold text-gray-900 mb-4">សេចក្តីផ្តើម</h2>
            <p className="font-khmer-body leading-relaxed text-gray-700 mb-8">
              {introductionKhmer}
            </p>
            
            {sections.map((section, index) => (
              <div key={`section-km-${index}`} className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-xl font-khmer-subheading font-bold text-gray-900">
                    {section.titleKhmer}
                  </h3>
                </div>
                <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">
                  {section.bodyKhmer}
                </p>
              </div>
            ))}
          </div>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-xl">
                <path d="M2 10v3"/>
                <path d="M6 6v11"/>
                <path d="M10 3v18"/>
                <path d="M14 8v7"/>
                <path d="M18 5v9"/>
                <path d="M22 10v3"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
