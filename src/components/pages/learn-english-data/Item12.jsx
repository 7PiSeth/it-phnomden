import React, { useState, useEffect, useRef } from 'react';

// Helper function to get available voices and filter for en-US
const getVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(voice => voice.lang.startsWith('en-US'));
};

// Helper function to select a default voice based on device type
const getDefaultVoice = (voices) => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    return voices.find(v => v.name.includes('Samantha')) || voices[0];
  } else {
    // Check if the 4th voice exists before returning
    return voices[3] || voices[0];
  }
};

const App = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingSection, setPlayingSection] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: '', translation: '', x: 0, y: 0 });
  const popupRef = useRef(null);

  // Define the article content and translations
  const articleContent = {
    title: {
      en: "Life Lessons at 40 (That I Wish I Knew at 20)",
      km: ""
    },
    author: {
      en: "Written by Mark Manson",
      km: ""
    },
    intro: {
      en: "Today is my 40th birthday. A decade ago, when I turned 30, I wrote an article sharing life lessons to survive your 20s and crowd-sourced advice for excelling in your 30s. It was a big hit. So, here's more of the good stuff: 40 life lessons I've learned by 40 that I wish I had known at 20.",
      km: "ថ្ងៃនេះជាខួបកំណើតអាយុ 40 ឆ្នាំរបស់ខ្ញុំ។ មួយទសវត្សរ៍មុន កាលខ្ញុំអាយុ 30 ឆ្នាំ ខ្ញុំបានសរសេរអត្ថបទមួយចែករំលែកមេរៀនជីវិតដើម្បីរស់រានក្នុងវ័យ 20 ឆ្នាំ និងបានប្រមូលដំបូន្មានសម្រាប់ការជោគជ័យក្នុងវ័យ 30 ឆ្នាំ។ វាទទួលបានជោគជ័យយ៉ាងខ្លាំង។ ដូច្នេះ នេះគឺជាចំណុចល្អៗបន្ថែមទៀត៖ មេរៀនជីវិត 40 យ៉ាងដែលខ្ញុំបានរៀននៅអាយុ 40 ឆ្នាំ ដែលខ្ញុំប៉ងចង់ដឹងកាលពីអាយុ 20 ឆ្នាំ។"
    },
  };

  const principles = [
    {
      en: {
        title: "Part 1: Self-Improvement & Relationships",
        body: "1. Your relationship with others reflects your relationship with yourself. If you treat yourself poorly, you will unconsciously seek out and tolerate others who do the same. If you treat yourself with dignity and respect, you'll only tolerate others who treat you likewise. To get right with the world, get right with yourself first.\n\n2. The only way to feel better about yourself is to do things worth feeling good about. Respect is earned, not given.\n\n3. The only failure is not trying. The only rejection is not asking. The only mistake is not risking anything. Success and failure are fuzzy concepts that only exist in your mind before you act, not after. After the fact, everything is a mixture of both. The only real failure is doing nothing.\n\n4. No one is coming to save you. No single thing—no goal, no achievement, no relationship—will solve all your problems. No one will ever 'fix' you. It's completely normal to feel mildly inadequate and somewhat dissatisfied with your life. In fact, it might be the most normal thing about you.\n\n5. Be the partner you want to have. If you want a healthy, fit, loyal, and trustworthy partner, then you must be healthy, fit, loyal, and trustworthy yourself. Ask yourself: 'Would I date me?' If the answer is no, you have a problem.\n\n6. The most valuable things in life compound over a long period of time. This includes health, wealth, knowledge, confidence, and relationships. These things can be frustratingly slow when you're young. But if you start building them early and consistently, by your 30s and 40s you will have an incredible life.\n\n7. The most sexy and exciting things in life are the opposite. These things start out fun but have intense diminishing returns. When you're young, they distract you and consume your time. This includes social media, casual sex, drugs, alcohol, video games, gambling, and vacations. The first time is incredible, the second is almost as good, but after that, it's all downhill. Experience them a little, then quickly move on. (Except the blowjobs. Don't move on from the blowjobs.)\n\n8. If you're not turning down things that excite you, you're not focused enough. Our world is overflowing with stimulation and opportunity. If you aren't struggling to say 'no,' you haven't correctly prioritized what truly matters to you.\n\n9. Taking responsibility for your problems alleviates more suffering than it creates. Most people assume that taking responsibility for your pain will make you feel worse. The opposite is true. The more responsibility you take, the more empowered you are to do something about that pain. This is because...\n\n10. You give power to those you blame. When you blame someone else for your problems, you give them power over you. You allow them to dictate your happiness and well-being. This is foolish, so don't do it.\n\n11. If you have to tell someone you're something, you're not that thing. A rich person doesn't feel the need to show off their wealth. A smart person doesn't need to announce their intelligence. A confident person doesn't have to prove their confidence; they just are. Don't say it. Be it.\n\n12. Motivation is not the cause of action, but the effect. If you want to feel motivated to do something, take the smallest action toward it. Then let the momentum carry you forward.\n\n13. Love is not the cause of commitment, but the effect. You don't wait for a perfect relationship to commit. You commit to a person to create a perfect relationship.\n\n14. Passion is not the cause of good work, but the effect. You don’t wait to find something you love doing. Instead, you learn to do something well, and the process of developing competency and agency causes you to become passionate about it.\n\n15. The person you marry is the person you fight with. The house you buy is the house you repair. The dream job you take is the job you stress over. Everything comes with an inherent sacrifice. What makes you feel good will also inevitably make you feel bad.\n\n16. A happy life is not a life without stress; it's a life of meaningful stress.\n\n17. Don't view exercise as an exchange for something. You don't work out to lose a few pounds or to earn a hamburger. With this mindset, you'll lose motivation quickly. Instead, view exercise as an investment. For every unit of energy you put in, you'll receive multiple units of energy back over weeks, months, and years. This is why exercising a little bit every day is far superior to exercising hardcore occasionally."
      },
      km: {
        title: "ផ្នែកទី 1: ការអភិវឌ្ឍខ្លួនឯង និងទំនាក់ទំនង",
        body: "1. ទំនាក់ទំនងរបស់អ្នកជាមួយអ្នកដទៃ ឆ្លុះបញ្ចាំងពីទំនាក់ទំនងរបស់អ្នកជាមួយខ្លួនឯង។ ប្រសិនបើអ្នកប្រព្រឹត្តមិនល្អចំពោះខ្លួនឯង អ្នកនឹងស្វែងរក និងអត់ឱនដោយមិនដឹងខ្លួនចំពោះអ្នកដទៃដែលធ្វើដូចគ្នា។ ប្រសិនបើអ្នកប្រព្រឹត្តចំពោះខ្លួនឯងដោយសេចក្តីថ្លៃថ្នូរ និងការគោរព អ្នកនឹងអត់ឱនត្រឹមតែអ្នកដទៃដែលប្រព្រឹត្តចំពោះអ្នកដូចគ្នា។ ដើម្បីចុះសម្រុងជាមួយពិភពលោក ចូរចុះសម្រុងជាមួយខ្លួនឯងជាមុនសិន។\n\n2. មធ្យោបាយតែមួយគត់ដើម្បីមានអារម្មណ៍ល្អចំពោះខ្លួនឯង គឺធ្វើរឿងដែលគួរឱ្យមានអារម្មណ៍ល្អ។ ការគោរពត្រូវបានទទួលតាមរយៈការប្រឹងប្រែង មិនមែនបានមកដោយងាយៗនោះទេ។\n\n3. បរាជ័យតែមួយគត់គឺមិនបានព្យាយាម។ ការបដិសេធតែមួយគត់គឺមិនបានសុំ។ កំហុសតែមួយគត់គឺមិនបានប្រថុយអ្វីទាំងអស់។ ជោគជ័យនិងបរាជ័យគឺជាគំនិតមិនច្បាស់លាស់ដែលមានតែនៅក្នុងគំនិតរបស់អ្នកមុនពេលអ្នកធ្វើសកម្មភាព មិនមែនបន្ទាប់ពីធ្វើនោះទេ។ ក្រោយមក អ្វីៗទាំងអស់គឺជាការលាយឡំនៃទាំងពីរ។ បរាជ័យពិតប្រាកដតែមួយគត់គឺការមិនធ្វើអ្វីសោះ។\n\n4. គ្មាននរណាមកសង្គ្រោះអ្នកទេ។ គ្មានរឿងតែមួយ—គ្មានគោលដៅ គ្មានសមិទ្ធផល គ្មានទំនាក់ទំនង—នឹងដោះស្រាយបញ្ហារបស់អ្នកទាំងអស់បានឡើយ។ គ្មាននរណាម្នាក់នឹង 'ជួសជុល' អ្នកបានឡើយ។ វាជារឿងធម្មតាទេក្នុងការមានអារម្មណ៍ថាមិនសូវល្អនិងមិនពេញចិត្តនឹងជីវិតរបស់អ្នក។ តាមពិតទៅ វាអាចជារឿងធម្មតាបំផុតអំពីអ្នក។\n\n5. ចូរធ្វើជាដៃគូដែលអ្នកចង់បាន។ ប្រសិនបើអ្នកចង់បានដៃគូដែលមានសុខភាពល្អ រាងស្អាត ស្មោះត្រង់ និងគួរឱ្យទុកចិត្ត នោះអ្នកត្រូវតែមានសុខភាពល្អ រាងស្អាត ស្មោះត្រង់ និងគួរឱ្យទុកចិត្តដោយខ្លួនឯង។ សួរខ្លួនឯងថា៖ 'តើខ្ញុំនឹងណាត់ជួបខ្ញុំទេ?' ប្រសិនបើចម្លើយគឺអត់ នោះអ្នកមានបញ្ហាហើយ។\n\n6. រឿងដ៏មានតម្លៃបំផុតក្នុងជីវិតកើនឡើងទ្វេដងក្នុងរយៈពេលយូរ។ នេះរួមបញ្ចូលទាំងសុខភាព ទ្រព្យសម្បត្តិ ចំណេះដឹង ទំនុកចិត្ត និងទំនាក់ទំនង។ រឿងទាំងនេះអាចយឺតយ៉ាវគួរឱ្យធុញទ្រាន់នៅពេលអ្នកនៅក្មេង។ ប៉ុន្តែប្រសិនបើអ្នកចាប់ផ្តើមសាងសង់វាឱ្យបានឆាប់និងជាប់លាប់ នៅពេលអ្នកអាយុ 30 និង 40 ឆ្នាំ អ្នកនឹងមានជីវិតដ៏អស្ចារ្យ។\n\n7. រឿងដែលសិចស៊ីនិងរំភើបបំផុតក្នុងជីវិតគឺផ្ទុយស្រឡះ។ រឿងទាំងនេះចាប់ផ្តើមសប្បាយ ប៉ុន្តែមានការថយចុះយ៉ាងខ្លាំង។ នៅពេលអ្នកនៅក្មេង ពួកវាធ្វើឱ្យអ្នករំខាននិងប្រើប្រាស់ពេលវេលារបស់អ្នក។ នេះរួមបញ្ចូលទាំងប្រព័ន្ធផ្សព្វផ្សាយសង្គម ការរួមភេទដោយមិនបានប្ដេជ្ញាចិត្ត គ្រឿងញៀន គ្រឿងស្រវឹង វីដេអូហ្គេម ល្បែងស៊ីសង និងថ្ងៃឈប់សម្រាក។ លើកទីមួយគឺអស្ចារ្យណាស់ លើកទីពីរគឺល្អស្ទើរតែដូចគ្នា ប៉ុន្តែបន្ទាប់ពីនោះ វាធ្លាក់ចុះ។ ទទួលបទពិសោធន៍ពួកវាបន្តិចបន្តួច រួចចាកចេញឱ្យបានលឿន។ (លើកលែងតែរឿងផ្លុំ។ កុំចាកចេញពីវា។)\n\n8. ប្រសិនបើអ្នកមិនបដិសេធរឿងដែលធ្វើឱ្យអ្នករំភើបទេ នោះអ្នកមិនទាន់ផ្តោតគ្រប់គ្រាន់ទេ។ ពិភពលោករបស់យើងពោរពេញដោយការជំរុញនិងឱកាស។ ប្រសិនបើអ្នកមិនពិបាកក្នុងការនិយាយ 'ទេ' នោះអ្នកមិនបានកំណត់អាទិភាពអ្វីដែលសំខាន់ពិតប្រាកដសម្រាប់អ្នកនោះទេ។\n\n9. ការទទួលខុសត្រូវចំពោះបញ្ហារបស់អ្នក ជួយកាត់បន្ថយការឈឺចាប់ច្រើនជាងវាបង្កើត។ មនុស្សភាគច្រើនគិតថាការទទួលខុសត្រូវចំពោះការឈឺចាប់របស់អ្នកនឹងធ្វើឱ្យអ្នកមានអារម្មណ៍កាន់តែអាក្រក់។ ផ្ទុយទៅវិញ។ កាន់តែអ្នកទទួលខុសត្រូវ អ្នកកាន់តែមានអំណាចក្នុងការធ្វើអ្វីមួយដើម្បីដោះស្រាយការឈឺចាប់នោះ។ នេះក៏ដោយសារតែ...\n\n10. អ្នកផ្ដល់អំណាចដល់អ្នកដែលអ្នកបន្ទោស។ នៅពេលអ្នកបន្ទោសនរណាម្នាក់ផ្សេងទៀតចំពោះបញ្ហារបស់អ្នក អ្នកបានផ្តល់អំណាចឱ្យពួកគេលើអ្នក។ អ្នកអនុញ្ញាតឱ្យពួកគេកំណត់សុភមង្គលនិងសុខុមាលភាពរបស់អ្នក។ នេះគឺជារឿងល្ងង់ខ្លៅ ដូច្នេះកុំធ្វើវា។\n\n11. ប្រសិនបើអ្នកត្រូវប្រាប់នរណាម្នាក់ថាអ្នកជាអ្វីមួយ នោះអ្នកមិនមែនជាអ្វីនោះទេ។ មនុស្សអ្នកមានមិនមានអារម្មណ៍ថាចាំបាច់ត្រូវបង្ហាញទ្រព្យសម្បត្តិរបស់ពួកគេទេ។ មនុស្សឆ្លាតមិនចាំបាច់ប្រកាសពីភាពឆ្លាតវៃរបស់ពួកគេទេ។ មនុស្សដែលមានទំនុកចិត្តមិនចាំបាច់បង្ហាញពីទំនុកចិត្តរបស់ពួកគេទេ ពួកគេគ្រាន់តែជា។ កុំនិយាយវា។ ចូរធ្វើវា។\n\n12. កម្លាំងចិត្តមិនមែនជាមូលហេតុនៃសកម្មភាពទេ ប៉ុន្តែជាលទ្ធផល។ ប្រសិនបើអ្នកចង់មានអារម្មណ៍ថាមានកម្លាំងចិត្តដើម្បីធ្វើអ្វីមួយ ចូរធ្វើសកម្មភាពតូចបំផុតឆ្ពោះទៅរកវា។ បន្ទាប់មកអនុញ្ញាតឱ្យកម្លាំងរុញច្រាននោះដឹកនាំអ្នកទៅមុខ។\n\n13. ស្នេហាមិនមែនជាមូលហេតុនៃការប្តេជ្ញាចិត្តទេ ប៉ុន្តែជាលទ្ធផល។ អ្នកមិនរង់ចាំទំនាក់ទំនងដ៏ល្អឥតខ្ចោះដើម្បីប្តេជ្ញាចិត្តនោះទេ។ អ្នកប្តេជ្ញាចិត្តចំពោះមនុស្សម្នាក់ដើម្បីបង្កើតទំនាក់ទំនងដ៏ល្អឥតខ្ចោះ។\n\n14. ចំណង់ចំណូលចិត្តមិនមែនជាមូលហេតុនៃការងារល្អទេ ប៉ុន្តែជាលទ្ធផល។ អ្នកមិនរង់ចាំដើម្បីស្វែងរកអ្វីដែលអ្នកចូលចិត្តធ្វើនោះទេ។ ផ្ទុយទៅវិញ អ្នករៀនធ្វើអ្វីមួយឱ្យបានល្អ ហើយដំណើរការនៃការអភិវឌ្ឍសមត្ថភាពនិងសិទ្ធិអំណាចធ្វើឱ្យអ្នកក្លាយជាមនុស្សដែលមានចំណង់ចំណូលចិត្តចំពោះវា។\n\n15. មនុស្សដែលអ្នករៀបការជាមួយ គឺជាមនុស្សដែលអ្នកប្រយុទ្ធជាមួយ។ ផ្ទះដែលអ្នកទិញគឺជាផ្ទះដែលអ្នកជួសជុល។ ការងារក្នុងក្តីស្រមៃដែលអ្នកយកគឺជាការងារដែលអ្នកស្ត្រេស។ អ្វីៗទាំងអស់មកជាមួយការលះបង់ពីកំណើត។ អ្វីដែលធ្វើឱ្យអ្នកមានអារម្មណ៍ល្អក៏នឹងធ្វើឱ្យអ្នកមានអារម្មណ៍មិនល្អផងដែរ។\n\n16. ជីវិតរីករាយមិនមែនជាជីវិតដែលគ្មានស្ត្រេសទេ វាជាជីវិតដែលមានស្ត្រេសប្រកបដោយអត្ថន័យ។\n\n17. កុំចាត់ទុកការហាត់ប្រាណជាការដោះដូរសម្រាប់អ្វីមួយ។ អ្នកមិនហាត់ប្រាណដើម្បីសម្រកទម្ងន់ពីរបីគីឡូ ឬដើម្បីទទួលបានហាំប៊ឺហ្គឺនោះទេ។ ជាមួយនឹងគំនិតនេះ អ្នកនឹងបាត់បង់កម្លាំងចិត្តយ៉ាងឆាប់រហ័ស។ ផ្ទុយទៅវិញ ចូរចាត់ទុកការហាត់ប្រាណជាការវិនិយោគ។ សម្រាប់ថាមពលមួយឯកតាដែលអ្នកដាក់បញ្ចូល អ្នកនឹងទទួលបានថាមពលច្រើនឯកតាក្នុងរយៈពេលប៉ុន្មានសប្តាហ៍ ខែ និងឆ្នាំ។ នេះជាមូលហេតុដែលការហាត់ប្រាណបន្តិចបន្តួចរៀងរាល់ថ្ងៃគឺល្អជាងការហាត់ប្រាណខ្លាំងៗម្តងម្កាលទៅទៀត។"
      }
    },
    {
      en: {
        title: "Part 2: Growth & Wisdom",
        body: "18. Trust people. Most people are good. While you might get hurt or embarrassed sometimes, the alternative—living in distrust—is far worse.\n\n19. There’s no such thing as a life without problems. Warren Buffett has money problems, and so does a homeless person. Buffett's problems are more desirable, but problems don't just disappear. They get exchanged and upgraded for better problems as you grow. The solution to today’s problem will be the seed of tomorrow’s. Set your expectations accordingly.\n\n20. Growth is rarely accompanied by joy. On the contrary, growth is usually painful. That's because growth requires loss—a loss of your old values, behaviors, loves, and identity. Change always has a component of grief, so be sure to let yourself grieve.\n\n21. Fuck being normal. Statistically, a 'normal' person is physically unhealthy, emotionally anxious and depressed, socially lonely, and financially in debt. So yeah, fuck being normal.\n\n22. If you can’t say 'no,' your 'yeses' mean nothing. We are defined by what we give up, sacrifice, and reject. If you sacrifice nothing, you have no identity. You are merely a reflection of the demands of people around you. In other words, if you don't decide who you are, other people will decide for you.\n\n23. Be careful how you define yourself. Your identity is a self-constructed mental prison, confining you to a life of desperately seeking things to validate what you've chosen to become. Define yourself as loosely and ambiguously as possible. You will feel less defensive and be more willing to change when necessary.\n\n24. Don't make assumptions about people. You have no idea what they've been through. Don't make assumptions about yourself either. Chances are you have no idea what you're talking about. The last person we are objective about is ourselves.\n\n25. No one thinks about you as much as you think about yourself. Whatever you're insecure about, 99% of people around you haven't even noticed. This is because everyone else is too busy thinking about themselves. This might sound depressing, but it's actually liberating. You are judged far less than you think.\n\n26. Confidence comes not from an expectation of success, but from a comfort with failure. The word for someone who feels a need to succeed in everything is 'narcissist.' Don’t be a narcissist. Embrace your flaws. Embrace failure.\n\n27. Develop a willingness to be disliked. This will grant you the freedom to do what needs to be done, even if it's unpopular.\n\n28. You cannot be a life-changing presence to some people without also being a complete joke to others. Part of the price of having an impact is receiving some hate, and that hate is usually proportional to the impact.\n\n29. Floss and wear sunscreen every day. I know I sound like your mom right now, but trust me, in 20 years you’re going to thank me.\n\n30. Extraordinary results come from repeating ordinary actions over an inordinate amount of time. Any 'overnight success' is secretly the result of working in obscurity for years, if not decades."
      },
      km: {
        title: "ផ្នែកទី 2: ការរីកចម្រើន និងប្រាជ្ញា",
        body: "18. ទុកចិត្តមនុស្ស។ មនុស្សភាគច្រើនល្អ។ ទោះបីជាអ្នកអាចនឹងឈឺចាប់ឬខ្មាសអៀនម្តងម្កាលក៏ដោយ ជម្រើសផ្សេង—ការរស់នៅដោយមិនទុកចិត្ត—គឺកាន់តែអាក្រក់ទៅទៀត។\n\n19. គ្មានអ្វីដែលហៅថាជីវិតគ្មានបញ្ហានោះទេ។ Warren Buffett មានបញ្ហាលុយកាក់ ដូចមនុស្សគ្មានផ្ទះសម្បែងដែរ។ បញ្ហារបស់ Buffett គឺគួរឱ្យចង់បានជាង ប៉ុន្តែបញ្ហាមិនបាត់ទៅណាទេ។ ពួកវាត្រូវបានផ្លាស់ប្តូរនិងដំឡើងឋានៈទៅជាបញ្ហាដែលល្អជាងនៅពេលអ្នករីកចម្រើន។ ដំណោះស្រាយចំពោះបញ្ហានាពេលបច្ចុប្បន្ន នឹងក្លាយជាគ្រាប់ពូជនៃបញ្ហានាពេលអនាគត។ កំណត់ការរំពឹងទុករបស់អ្នកឱ្យបានត្រឹមត្រូវ។\n\n20. ការរីកចម្រើនកម្រនឹងភ្ជាប់មកជាមួយភាពរីករាយណាស់។ ផ្ទុយទៅវិញ ការរីកចម្រើនជាធម្មតាឈឺចាប់។ នោះក៏ព្រោះតែការរីកចម្រើនទាមទារការបាត់បង់—ការបាត់បង់តម្លៃ ចរិតលក្ខណៈ ស្នេហា និងអត្តសញ្ញាណចាស់របស់អ្នក។ ការផ្លាស់ប្តូរតែងតែមានផ្នែកមួយនៃការសោកសៅ ដូច្នេះត្រូវប្រាកដថាអនុញ្ញាតឱ្យខ្លួនអ្នកសោកសៅ។\n\n21. កុំធ្វើជាមនុស្សធម្មតា។ តាមស្ថិតិ មនុស្ស 'ធម្មតា' មានសុខភាពរាងកាយមិនល្អ មានអារម្មណ៍ថាមិនស្ងប់និងធ្លាក់ទឹកចិត្ត មានភាពឯកោក្នុងសង្គម និងមានបំណុលហិរញ្ញវត្ថុ។ ដូច្នេះហើយ កុំធ្វើជាមនុស្សធម្មតា។\n\n22. ប្រសិនបើអ្នកមិនអាចនិយាយ 'ទេ' បាន 'បាទ' របស់អ្នកគ្មានន័យអ្វីទេ។ យើងត្រូវបានកំណត់ដោយអ្វីដែលយើងបោះបង់ លះបង់ និងបដិសេធ។ ប្រសិនបើអ្នកមិនលះបង់អ្វីទាំងអស់ នោះអ្នកគ្មានអត្តសញ្ញាណទេ។ អ្នកគ្រាន់តែជាការឆ្លុះបញ្ចាំងពីតម្រូវការរបស់មនុស្សនៅជុំវិញអ្នក។ ម្យ៉ាងវិញទៀត ប្រសិនបើអ្នកមិនសម្រេចចិត្តថាអ្នកជានរណាទេ អ្នកដទៃនឹងសម្រេចចិត្តជំនួសអ្នក។\n\n23. ប្រយ័ត្នពីរបៀបដែលអ្នកកំណត់ខ្លួនឯង។ អត្តសញ្ញាណរបស់អ្នកគឺជាគុកផ្លូវចិត្តដែលអ្នកសាងសង់ដោយខ្លួនឯង ដោយបង្ខាំងអ្នកឱ្យរស់នៅក្នុងជីវិតដែលស្វែងរកអ្វីៗដោយអស់សង្ឃឹមដើម្បីបញ្ជាក់ពីអ្វីដែលអ្នកបានជ្រើសរើសដើម្បីក្លាយជា។ កំណត់ខ្លួនឯងឱ្យបានរលុងនិងមិនច្បាស់លាស់តាមដែលអាចធ្វើទៅបាន។ អ្នកនឹងមានអារម្មណ៍ការពារខ្លួនតិច ហើយមានឆន្ទៈផ្លាស់ប្តូរកាន់តែច្រើននៅពេលចាំបាច់។\n\n24. កុំសន្មត់អំពីមនុស្ស។ អ្នកគ្មានគំនិតថាតើពួកគេបានឆ្លងកាត់អ្វីទេ។ កុំសន្មត់អំពីខ្លួនឯងដែរ។ ទំនងជាអ្នកគ្មានគំនិតថាអ្នកកំពុងនិយាយអំពីអ្វីទេ។ មនុស្សចុងក្រោយដែលយើងវាយតម្លៃបានត្រឹមត្រូវគឺខ្លួនយើង។\n\n25. គ្មាននរណាម្នាក់គិតអំពីអ្នកច្រើនដូចអ្នកគិតអំពីខ្លួនឯងនោះទេ។ អ្វីក៏ដោយដែលអ្នកមិនមានទំនុកចិត្ត មនុស្ស 99% នៅជុំវិញអ្នកមិនបានកត់សម្គាល់ផង។ នេះក៏ព្រោះតែអ្នកផ្សេងទៀតរវល់ពេកក្នុងការគិតអំពីខ្លួនឯង។ នេះអាចស្តាប់ទៅដូចជាធ្វើឱ្យធ្លាក់ទឹកចិត្ត ប៉ុន្តែតាមពិតវាជាការរំដោះ។ អ្នកត្រូវបានវិនិច្ឆ័យតិចជាងអ្វីដែលអ្នកគិតទៅទៀត។\n\n26. ទំនុកចិត្តមិនបានមកពីការរំពឹងទុកនៃភាពជោគជ័យទេ ប៉ុន្តែមកពីភាពសុខស្រួលជាមួយបរាជ័យ។ ពាក្យសម្រាប់នរណាម្នាក់ដែលមានអារម្មណ៍ថាត្រូវជោគជ័យក្នុងគ្រប់រឿងគឺ 'អ្នកដែលគិតតែពីប្រយោជន៍ខ្លួនឯង'។ កុំធ្វើជាមនុស្សគិតតែពីប្រយោជន៍ខ្លួនឯង។ ទទួលយកភាពខ្វះខាតរបស់អ្នក។ ទទួលយកបរាជ័យ។\n\n27. អភិវឌ្ឍឆន្ទៈដើម្បីឱ្យគេមិនចូលចិត្ត។ នេះនឹងផ្តល់ឱ្យអ្នកនូវសេរីភាពដើម្បីធ្វើអ្វីដែលចាំបាច់ត្រូវធ្វើ ទោះបីជាវាមិនពេញនិយមក៏ដោយ។\n\n28. អ្នកមិនអាចក្លាយជាវត្តមានដែលផ្លាស់ប្តូរជីវិតសម្រាប់មនុស្សមួយចំនួនដោយមិនក្លាយជាមនុស្សគួរឱ្យអស់សំណើចសម្រាប់អ្នកដទៃនោះទេ។ ផ្នែកមួយនៃតម្លៃនៃការមានឥទ្ធិពលគឺការទទួលបានការស្អប់ ហើយការស្អប់នោះជាធម្មតាគឺសមាមាត្រទៅនឹងឥទ្ធិពលនោះ។\n\n29. ប្រើអំបោះទំពារធ្មេញនិងពាក់ឡេការពារកំដៅថ្ងៃជារៀងរាល់ថ្ងៃ។ ខ្ញុំដឹងថាខ្ញុំស្តាប់ទៅដូចម្តាយរបស់អ្នកឥឡូវនេះ ប៉ុន្តែជឿខ្ញុំទៅ ក្នុងរយៈពេល 20 ឆ្នាំទៀតអ្នកនឹងអរគុណខ្ញុំ។\n\n30. លទ្ធផលដ៏អស្ចារ្យបានមកពីការធ្វើសកម្មភាពធម្មតាៗម្តងហើយម្តងទៀតក្នុងរយៈពេលដ៏វែងអន្លាយ។ 'ភាពជោគជ័យមួយយប់' ណាមួយគឺលទ្ធផលសម្ងាត់នៃការធ្វើការដោយលាក់កំបាំងអស់រយៈពេលជាច្រើនឆ្នាំ បើមិនមែនច្រើនទសវត្សរ៍។"
      }
    },
    {
      en: {
        title: "Part 3: Relationships & Final Thoughts",
        body: "31. Choosing a partner is not just about romance. You're also choosing a confidant, a counselor, a career advisor, a therapist, an investor, a teacher, a travel buddy, a roommate, a best friend, and a business partner. Whether you want to or not, your partner will become all of these things. That's what a relationship is. So choose wisely.\n\n32. Don’t overestimate romantic love. Love doesn't fix relationship problems or make trust issues go away. The truth is, love can harm as much as it heals; it's an amplifier. It makes a good relationship better and a bad one much worse. Love is great and beautiful when it works, but by itself, love is not enough to make a healthy relationship.\n\n33. Trust is the currency of all relationships. Every good relationship is built on years of trust. Every failed relationship fails because of broken trust. Therefore, honesty and integrity are the backbones of a happy life with healthy relationships. Dishonesty might be a shortcut to short-term gains, but in the long run, it will completely mess you up.\n\n34. If all of your relationships have the same problem... ...newsflash: you are the problem.\n\n35. There’s no such thing as a bad emotion, only a bad response to an emotion. Every emotion can be used constructively or destructively. One of the most useful things you can learn in life is how to channel your negative emotions constructively.\n\n36. Go to bed and wake up early. My whole life, I promised myself I would never be that person who went to bed at 9 PM on a Friday and got up at 5 AM to hit the gym. But kids, I hate to tell you, mornings are where it’s at.\n\n37. You don’t have to prove anything to anyone, including yourself. Let me say that again: You don't have to prove anything to anyone, including yourself.\n\n38. Life advice is like clothing. Try it on. If it doesn't fit, discard it and try something else. Also, like clothing, bad advice is useless in a few weeks, but good advice will last a lifetime.\n\n39. Nothing meaningful in life is easy, and nothing easy in life is meaningful. We think we'd like to have everything handed to us on a silver platter, but the truth is, we don't appreciate or enjoy things we don't struggle for. So stop avoiding the difficult things in life and instead find the difficult things you enjoy.\n\n40. It’s never too late to change. A friend once told me a story about his grandmother. At 62, after her husband died, she started taking piano lessons. She practiced every day, and even as people told her to give it up, she kept going. By the time she was in her 90s, she had been playing for over 30 years, longer than most professional musicians have been alive. She had mastered the classics, and no one believed she took her first lesson in her 60s. I love this story because it shows that even at an 'impractical' old age, you still have more time left to learn something than most professionals in that field have even been alive. I didn’t start writing until I was 27. I didn’t start my YouTube channel until I was 36. In every phase of my life, I've started five to ten years later than most people. Yet it didn't matter. I get emails all the time from people asking, 'I'm 20, or 40, or 60, or 80. Is it too late? Can I change? Is there time?' The answer is, it’s never too late. There’s always time. The only question is how long we're going to sit here and make excuses."
      },
      km: {
        title: "ផ្នែកទី 3: ទំនាក់ទំនង និងគំនិតចុងក្រោយ",
        body: "31. ការជ្រើសរើសដៃគូមិនមែនគ្រាន់តែអំពីរឿងមនោសញ្ចេតនានោះទេ។ អ្នកក៏កំពុងជ្រើសរើសអ្នកទុកចិត្ត អ្នកប្រឹក្សាយោបល់ អ្នកប្រឹក្សាអាជីព អ្នកព្យាបាល អ្នកវិនិយោគ គ្រូបង្រៀន មិត្តធ្វើដំណើរកម្សាន្ត មិត្តរួមបន្ទប់ មិត្តល្អបំផុត និងជាដៃគូអាជីវកម្មផងដែរ។ មិនថាអ្នកចង់ឬមិនចង់ ដៃគូរបស់អ្នកនឹងក្លាយជាអ្វីៗទាំងអស់នេះ។ នោះហើយជាអ្វីដែលទំនាក់ទំនងគឺ។ ដូច្នេះចូរជ្រើសរើសដោយឆ្លាតវៃ។\n\n32. កុំវាយតម្លៃស្នេហាមនោសញ្ចេតនាហួសហេតុ។ ស្នេហាមិនអាចដោះស្រាយបញ្ហាទំនាក់ទំនង ឬធ្វើឱ្យបញ្ហាទំនុកចិត្តបាត់ទៅវិញបានទេ។ ការពិតគឺថា ស្នេហាអាចធ្វើឱ្យខូចខាតដូចជាវាព្យាបាលដែរ វាជាឧបករណ៍ពង្រីក។ វាធ្វើឱ្យទំនាក់ទំនងល្អប្រសើរ ហើយធ្វើឱ្យទំនាក់ទំនងមិនល្អកាន់តែអាក្រក់។ ស្នេហាគឺអស្ចារ្យនិងស្រស់ស្អាតនៅពេលវាដំណើរការ ប៉ុន្តែដោយខ្លួនវា ស្នេហាមិនគ្រប់គ្រាន់ដើម្បីបង្កើតទំនាក់ទំនងដែលមានសុខភាពល្អនោះទេ។\n\n33. ទំនុកចិត្តគឺជាកម្លាំងជំរុញនៃទំនាក់ទំនងទាំងអស់។ ទំនាក់ទំនងល្អគ្រប់យ៉ាងត្រូវបានកសាងឡើងលើឆ្នាំនៃទំនុកចិត្ត។ ទំនាក់ទំនងដែលបរាជ័យគ្រប់យ៉ាង គឺបរាជ័យដោយសារតែទំនុកចិត្តដែលបែកបាក់។ ដូច្នេះ ភាពស្មោះត្រង់និងភាពសុចរិតគឺជាឆ្អឹងខ្នងនៃជីវិតរីករាយជាមួយនឹងទំនាក់ទំនងដែលមានសុខភាពល្អ។ ភាពមិនស្មោះត្រង់អាចជាផ្លូវកាត់ទៅរកផលចំណេញរយៈពេលខ្លី ប៉ុន្តែក្នុងរយៈពេលវែង វាអាចធ្វើឱ្យអ្នកជួបបញ្ហាទាំងស្រុង។\n\n34. ប្រសិនបើទំនាក់ទំនងរបស់អ្នកទាំងអស់មានបញ្ហាដូចគ្នា... ...ដំណឹងថ្មី៖ អ្នកគឺជាបញ្ហា។\n\n35. គ្មានអ្វីដែលហៅថាអារម្មណ៍មិនល្អនោះទេ មានតែការឆ្លើយតបមិនល្អចំពោះអារម្មណ៍ប៉ុណ្ណោះ។ រាល់អារម្មណ៍ទាំងអស់អាចត្រូវបានប្រើប្រាស់ប្រកបដោយស្ថាបនាឬបំផ្លិចបំផ្លាញ។ រឿងមួយដែលអ្នកអាចរៀនបានក្នុងជីវិតគឺរបៀបប្រើប្រាស់អារម្មណ៍អវិជ្ជមានរបស់អ្នកប្រកបដោយស្ថាបនា។\n\n36. ចូលគេងនិងក្រោកពីព្រឹក។ ពេញមួយជីវិតរបស់ខ្ញុំ ខ្ញុំបានសន្យានឹងខ្លួនឯងថាខ្ញុំនឹងមិនធ្វើជាមនុស្សដែលចូលគេងនៅម៉ោង 9 យប់នៅថ្ងៃសុក្រហើយក្រោកនៅម៉ោង 5 ព្រឹកដើម្បីទៅកន្លែងហាត់ប្រាណនោះទេ។ ប៉ុន្តែក្មេងៗអើយ ខ្ញុំស្អប់ក្នុងការប្រាប់អ្នកថា ពេលព្រឹកគឺជាពេលដែលត្រូវធ្វើវា។\n\n37. អ្នកមិនចាំបាច់បង្ហាញអ្វីដល់នរណាម្នាក់ទេ រួមទាំងខ្លួនអ្នកផងដែរ។ សូមខ្ញុំនិយាយម្តងទៀត៖ អ្នកមិនចាំបាច់បង្ហាញអ្វីដល់នរណាម្នាក់ទេ រួមទាំងខ្លួនអ្នកផងដែរ។\n\n38. ដំបូន្មានជីវិតគឺដូចជាសម្លៀកបំពាក់។ សាកវា។ បើវាមិនសមទេ ចូរបោះវាចោលហើយសាកល្បងអ្វីផ្សេងទៀត។ ដូចសម្លៀកបំពាក់ដែរ ដំបូន្មានមិនល្អគ្មានប្រយោជន៍ក្នុងរយៈពេលពីរបីសប្តាហ៍ទេ ប៉ុន្តែដំបូន្មានល្អនឹងស្ថិតស្ថេរអស់មួយជីវិត។\n\n39. គ្មានអ្វីដែលមានអត្ថន័យក្នុងជីវិតដែលងាយស្រួលទេ ហើយគ្មានអ្វីដែលងាយស្រួលក្នុងជីវិតដែលមានអត្ថន័យនោះទេ។ យើងគិតថាយើងចង់បានអ្វីៗគ្រប់យ៉ាងដែលបានប្រគល់ឱ្យយើងដោយស្រួលៗ ប៉ុន្តែការពិតគឺ យើងមិនឱ្យតម្លៃឬរីករាយនឹងរឿងដែលយើងមិនបានតស៊ូដើម្បីនោះទេ។ ដូច្នេះចូរឈប់គេចវេសពីរបស់ពិបាកៗក្នុងជីវិត ហើយផ្ទុយទៅវិញស្វែងរករបស់ពិបាកៗដែលអ្នករីករាយនឹងធ្វើ។\n\n40. វាមិនដែលហួសពេលដើម្បីផ្លាស់ប្តូរនោះទេ។ មិត្តម្នាក់ធ្លាប់បានប្រាប់ខ្ញុំនូវរឿងរ៉ាវអំពីជីដូនរបស់គាត់។ នៅអាយុ 62 ឆ្នាំ បន្ទាប់ពីស្វាមីរបស់គាត់បានស្លាប់ គាត់បានចាប់ផ្តើមរៀនមេរៀនព្យាណូ។ គាត់បានហាត់ជារៀងរាល់ថ្ងៃ ហើយទោះបីជាមនុស្សប្រាប់ឱ្យគាត់បោះបង់ចោលក៏ដោយ ក៏គាត់នៅតែបន្ត។ នៅពេលគាត់អាយុ 90 ឆ្នាំ គាត់បានលេងអស់រយៈពេលជាង 30 ឆ្នាំហើយ ដែលយូរជាងតន្ត្រីករអាជីពភាគច្រើនមានជីវិតទៅទៀត។ គាត់បានស្ទាត់ជំនាញបទចម្រៀងបុរាណ ហើយគ្មាននរណាម្នាក់ជឿថាគាត់បានចាប់ផ្តើមមេរៀនដំបូងរបស់គាត់នៅអាយុ 60 ឆ្នាំនោះទេ។ ខ្ញុំចូលចិត្តរឿងនេះព្រោះវាបង្ហាញថា ទោះបីជានៅអាយុចាស់ 'មិនសមហេតុផល' ក៏ដោយ ក៏អ្នកនៅតែមានពេលវេលាច្រើនដើម្បីរៀនអ្វីមួយជាងអ្នកជំនាញភាគច្រើនក្នុងវិស័យនោះបានរស់នៅទៅទៀត។ ខ្ញុំមិនបានចាប់ផ្តើមសរសេររហូតដល់ខ្ញុំអាយុ 27 ឆ្នាំ។ ខ្ញុំមិនបានចាប់ផ្តើមប៉ុស្តិ៍ YouTube របស់ខ្ញុំរហូតដល់ខ្ញុំអាយុ 36 ឆ្នាំ។ ក្នុងដំណាក់កាលនីមួយៗនៃជីវិតរបស់ខ្ញុំ ខ្ញុំបានចាប់ផ្តើមយឺតជាងមនុស្សភាគច្រើន 5 ទៅ 10 ឆ្នាំ។ ប៉ុន្តែវាមិនសំខាន់ទេ។ ខ្ញុំទទួលបានអ៊ីម៉ែលគ្រប់ពេលវេលាពីមនុស្សដែលសួរថា 'ខ្ញុំអាយុ 20 ឆ្នាំ ឬ 40 ឆ្នាំ ឬ 60 ឆ្នាំ ឬ 80 ឆ្នាំ។ តើវាហួសពេលហើយឬនៅ? តើខ្ញុំអាចផ្លាស់ប្តូរបានទេ? តើនៅមានពេលទេ?' ចម្លើយគឺ វាមិនដែលហួសពេលទេ។ តែងតែមានពេល។ សំណួរតែមួយគត់គឺថាតើយើងនឹងអង្គុយនៅទីនេះហើយបង្កើតលេសយូរប៉ុណ្ណាទៀត។"
      }
    }
  ];

  // Hard words and their translations for the popup
  const hardWords = {
    "unconsciously": "ដោយមិនដឹងខ្លួន",
    "tolerate": "អត់ឱន",
    "dignity": "សេចក្តីថ្លៃថ្នូរ",
    "respect": "ការគោរព",
    "reject": "បដិសេធ",
    "fuzzy": "មិនច្បាស់លាស់",
    "inadequate": "មិនសូវល្អ",
    "dissatisfied": "មិនពេញចិត្ត",
    "compound": "កើនឡើងទ្វេដង",
    "frustratingly": "គួរឱ្យធុញទ្រាន់",
    "diminishing": "ការថយចុះ",
    "alleviates": "ជួយកាត់បន្ថយ",
    "empowered": "មានអំណាច",
    "blame": "បន្ទោស",
    "motivation": "កម្លាំងចិត្ត",
    "commitment": "ការប្តេជ្ញាចិត្ត",
    "passion": "ចំណង់ចំណូលចិត្ត",
    "competency": "សមត្ថភាព",
    "inherent": "ពីកំណើត",
    "mindset": "គំនិត",
    "superior": "ល្អជាង",
    "alternative": "ជម្រើសផ្សេង",
    "distrust": "ការមិនទុកចិត្ត",
    "accordingly": "ត្រឹមត្រូវ",
    "component": "ផ្នែកមួយ",
    "grief": "ការសោកសៅ",
    "statistically": "តាមស្ថិតិ",
    "anxious": "មិនស្ងប់",
    "depressed": "ធ្លាក់ទឹកចិត្ត",
    "sacrifice": "ការលះបង់",
    "ambiguously": "មិនច្បាស់លាស់",
    "insecure": "មិនមានទំនុកចិត្ត",
    "narcissist": "អ្នកដែលគិតតែពីប្រយោជន៍ខ្លួនឯង",
    "embrace": "ទទួលយក",
    "unpopular": "មិនពេញនិយម",
    "proportional": "សមាមាត្រ",
    "extraordinary": "អស្ចារ្យ",
    "inordinate": "ដ៏វែងអន្លាយ",
    "obscurity": "ការលាក់កំបាំង",
    "confidant": "អ្នកទុកចិត្ត",
    "counselor": "អ្នកប្រឹក្សាយោបល់",
    "therapist": "អ្នកព្យាបាល",
    "investor": "អ្នកវិនិយោគ",
    "overestimate": "វាយតម្លៃហួសហេតុ",
    "amplifier": "ឧបករណ៍ពង្រីក",
    "currency": "កម្លាំងជំរុញ",
    "integrity": "ភាពសុចរិត",
    "backbones": "ឆ្អឹងខ្នង",
    "dishonesty": "ភាពមិនស្មោះត្រង់",
    "constructively": "ប្រកបដោយស្ថាបនា",
    "destructively": "បំផ្លិចបំផ្លាញ",
    "meaningful": "មានអត្ថន័យ",
    "appreciate": "ឱ្យតម្លៃ",
    "impractical": "មិនសមហេតុផល",
    "excuses": "លេស"
  };

  // State for voice-over and hard word audio
  const [audioStatus, setAudioStatus] = useState('stopped'); // 'playing', 'paused', 'stopped'

  // Functions for audio control
  const stopAudio = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setAudioStatus('stopped');
    setPlayingSection(null);
  };

  const handlePlay = (text, sectionIndex) => {
    if (isPlaying) {
      if (playingSection === sectionIndex) {
        window.speechSynthesis.pause();
        setIsPlaying(false);
        setAudioStatus('paused');
      } else {
        stopAudio();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = selectedVoice;
        utterance.onend = () => {
          setIsPlaying(false);
          setAudioStatus('stopped');
          setPlayingSection(null);
        };
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
        setAudioStatus('playing');
        setPlayingSection(sectionIndex);
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.onend = () => {
        setIsPlaying(false);
        setAudioStatus('stopped');
        setPlayingSection(null);
      };
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setAudioStatus('playing');
      setPlayingSection(sectionIndex);
    }
  };

  const handleHardWordClick = (word, translation, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupContent({
      word: word,
      translation: translation,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 10,
    });
    setShowPopup(true);
  };

  const handlePopupAudio = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.voice = selectedVoice;
    window.speechSynthesis.speak(utterance);
  };

  // Effect to load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getVoices();
      setVoices(availableVoices);
      setSelectedVoice(getDefaultVoice(availableVoices));
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Effect to handle clicks outside popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target) && !event.target.classList.contains('hard-word')) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to render text with hard words as clickable spans
  const renderTextWithHardWords = (text) => {
    const words = text.split(/(\b\w+\b|\s+)/);
    return words.map((word, index) => {
      const cleanedWord = word.replace(/[.,;!?]/g, '');
      const translation = hardWords[cleanedWord.toLowerCase()];
      if (translation) {
        return (
          <span
            key={index}
            className="hard-word underline decoration-dashed cursor-pointer"
            onClick={(e) => handleHardWordClick(word, translation, e)}
          >
            {word}
          </span>
        );
      }
      return word;
    });
  };
  
  const handleVoiceChange = (event) => {
    const voiceName = event.target.value;
    const voice = voices.find(v => v.name === voiceName);
    if (voice) {
      setSelectedVoice(voice);
    }
  };

  const PlayIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  const PauseIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );

  const StopIcon = ({ size = 24 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
      <path d="M6 6h12v12H6z" />
    </svg>
  );

  const VolumeUpIcon = ({ size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width={size} height={size}>
      <path d="M11 5L6 9H2v6h4l5 4V5zM15.5 17a5 5 0 0 0 0-10M19 20a9 9 0 0 0 0-16" />
    </svg>
  );
  

  return (
    <div className="bg-gray-50 font-lato text-gray-800 p-4 md:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nokora&family=Content&family=Hanuman:wght@400;700&family=Battambang:wght@400;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-merriweather { font-family: 'Merriweather', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-Nokora { font-family: 'Nokora', serif; }
        .font-Content { font-family: 'Content', serif; }
        .font-hanuman { font-family: 'Hanuman', serif; }
        .font-battambang { font-family: 'Battambang', serif; }
        
        .hard-word-popup {
          position: absolute;
          background-color: #fff;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 50;
          transform: translateY(-100%) translateY(-10px);
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
      `}</style>
      <div className="w-full max-w-6xl mb-8 overflow-hidden rounded-xl shadow-lg">
        <img
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*scy1S4tRa0FGoex1"
          alt="Two people with a significant age difference"
          className="w-full h-auto object-cover"
        />
      </div>
      {/* Main Title and Author */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-2 text-gray-900">{articleContent.title.en}</h1>
        <h2 className="text-lg md:text-xl font-lato text-gray-600">{articleContent.author.en}</h2>
        <h1 className="text-3xl md:text-5xl font-Nokora font-bold mt-8 mb-2 text-gray-900">{articleContent.title.km}</h1>
        <h2 className="text-lg md:text-xl font-battambang text-gray-600">{articleContent.author.km}</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* English Section */}
        <div className="flex-1 space-y-8 p-4 md:p-8 rounded-lg shadow-inner bg-white">
          <h2 className="text-2xl font-merriweather font-semibold border-b pb-2 mb-4 text-gray-900">Introduction</h2>
          <div className="flex justify-between items-center mb-4">
              <p className="text-base font-lato leading-relaxed text-gray-700">{articleContent.intro.en}</p>
              <button
                onClick={() => handlePlay(articleContent.intro.en, 0)}
                className="ml-4 p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
              >
                {isPlaying && playingSection === 0 ? <PauseIcon /> : <PlayIcon />}
              </button>
            </div>
            
          {principles.map((principle, index) => (
            <div key={`principle-en-${index}`} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-merriweather font-semibold text-gray-900">{principle.en.title}</h3>
                <button
                  onClick={() => handlePlay(principle.en.body, index + 1)}
                  className="p-2 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
                >
                  {isPlaying && playingSection === index + 1 ? <PauseIcon /> : <PlayIcon />}
                </button>
              </div>
              <p className="font-lato leading-relaxed text-gray-700 whitespace-pre-line">
                {renderTextWithHardWords(principle.en.body)}
              </p>
            </div>
          ))}
        </div>

        {/* Khmer Section */}
        <div className="flex-1 space-y-8 p-4 md:p-8 rounded-lg shadow-inner bg-gray-100">
          <h2 className="text-2xl font-Content font-semibold border-b pb-2 mb-4 text-gray-900">សេចក្តីផ្តើម</h2>
          <p className="text-base font-hanuman leading-relaxed text-gray-700">{articleContent.intro.km}</p>
          {principles.map((principle, index) => (
            <div key={`principle-km-${index}`} className="space-y-4">
              <h3 className="text-xl font-Content font-semibold text-gray-900">{principle.km.title}</h3>
              <p className="font-hanuman leading-relaxed text-gray-700 whitespace-pre-line">
                {principle.km.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Voice Selection and Stop Button */}
      <div className="flex flex-col items-center mt-8 space-y-4">
        <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-md">
          <label htmlFor="voice-select" className="font-montserrat text-gray-700">Select Voice:</label>
          <select
            id="voice-select"
            className="p-2 border rounded-md font-montserrat"
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={handleVoiceChange}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <button
            onClick={stopAudio}
            disabled={!isPlaying}
            className={`p-2 rounded-full text-red-500 transition-colors duration-200 ${!isPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-100'}`}
          >
            <StopIcon />
          </button>
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
            <span className="font-battambang text-lg">{popupContent.translation}</span>
            <button
              onClick={() => handlePopupAudio(popupContent.word)}
              className="p-1 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
            >
              <VolumeUpIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
