import React from 'react';

// Main Item1 component that renders the motivational content in both English and Khmer.
const Item1 = () => {
  // A structured array containing both English and Khmer translations for each point.
  // The 'hardWords' object is used by a utility function to Item1ly hover effects.
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
        'overwhelmed': 'ភ័យខ្លាច',
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
      km_title: 'ផលប៉ះពាល់រលកនៃជ័យជំនះតូចៗ',
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
        'breakthrough': 'ជោគជ័យ',
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

  // Utility function to render a sentence with hoverable "hard words".
  const renderBody = (text, hardWords) => {
    // Split the text into words and punctuation
    const words = text.split(/(\s+|\p{P})/u).filter(Boolean);
    return words.map((word, index) => {
      // Clean the word for a case-insensitive lookup
      const cleanedWord = word.replace(/[.,?!]/g, '').toLowerCase();
      
      // Check if the cleaned word is in our hardWords list
      if (hardWords[cleanedWord]) {
        return (
          // Item1ly a span with a title attribute for the hover effect
          <span
            key={index}
            className="cursor-help underline-dashed-custom"
            title={hardWords[cleanedWord]}
          >
            {word}
          </span>
        );
      }
      return <span key={index}>{word}</span>;
    });
  };

  return (
    <div 
    data-aos="fade-right"
          data-aos-offset="100"
    className="bg-slate-100 min-h-screen p-4 sm:p-8 md:p-12 text-gray-800">

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
            {/* Left column for English content */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-2 subtitle-font text-blue-700">
                {section.en_title}
              </h3>
              <p className="text-sm leading-relaxed body-font">
                {renderBody(section.en_body, section.hardWords)}
              </p>
            </div>
            
            {/* Right column for Khmer content */}
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-2 subtitle-font text-blue-700">
                {section.km_title}
              </h3>
              <p className="text-sm leading-relaxed body-font">
                {section.km_body}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Item1;
