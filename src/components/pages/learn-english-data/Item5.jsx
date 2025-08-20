import React, { useState, useEffect, useRef } from 'react';

// Define hard words and their Khmer translations
const hardWords = {
  'pivotal': 'សំខាន់',
  'devastating': 'បំផ្លាញ',
  'genocides': 'អំពើប្រល័យពូជសាសន៍',
  'coup': 'រដ្ឋប្រហារ',
  'insurgency': 'ការបះបោរ',
  'geopolitical': 'ភូមិសាស្ត្រនយោបាយ',
  'factions': 'បក្សពួក',
  'conflict': 'ជម្លោះ',
  'complexity': 'ភាពស្មុគស្មាញ',
  'regional': 'ក្នុងតំបន់',
  'global': 'សកល',
  'subsequent': 'ជាបន្តបន្ទាប់',
  'prolonged': 'អូសបន្លាយ',
  'guerrilla': 'ទ័ពព្រៃ',
  'neutral': 'អព្យាក្រឹត',
  'escalated': 'កើនឡើង',
  'staging': 'កន្លែងដាក់សម្ភារៈ',
  'supply': 'ការផ្គត់ផ្គង់',
  'extensive': 'ទូលំទូលាយ',
  'bombing campaign': 'យុទ្ធនាការទម្លាក់គ្រាប់បែក',
  'disrupt': 'រំខាន',
  'incursions': 'ការឈ្លានពាន',
  'destabilized': 'ធ្វើឲ្យមានអស្ថិរភាព',
  'countryside': 'ជនបទ',
  'destruction': 'ការបំផ្លាញ',
  'officially': 'ជាផ្លូវការ',
  'overthrew': 'ទម្លាក់',
  'regime': 'របប',
  'exile': 'ការនិរទេសខ្លួន',
  'allied': 'បានធ្វើសម្ព័ន្ធភាព',
  'armed resistance': 'ការតស៊ូប្រដាប់អាវុធ',
  'significantly': 'យ៉ាងសំខាន់',
  'boosted': 'បានជំរុញ',
  'relentlessly': 'គ្មានការឈប់ឈរ',
  'ushering in': 'បើកទ្វារសម្រាប់',
  'radical': 'រ៉ាឌីកាល់',
  'social engineering': 'វិស្វកម្មសង្គម',
  'self-sufficient': 'ពឹងផ្អែកលើខ្លួនឯង',
  'agrarian': 'កសិកម្ម',
  'classless society': 'សង្គមគ្មានវណ្ណៈ',
  'forced labor': 'ការងារដោយបង្ខំ',
  'collective farms': 'កសិដ្ឋានរួម',
  'abolished': 'ត្រូវបានលុបបំបាត់',
  'brutal': 'ឃោរឃៅ',
  'estimated': 'ប៉ាន់ស្មាន',
  'execution': 'ការប្រហារជីវិត',
  'intellectuals': 'បញ្ញវន្ត',
  'minorities': 'ជនជាតិភាគតិច',
  'perceived': 'ត្រូវបានយល់ឃើញ',
  'horrific': 'អាក្រក់',
  'hostile': 'អរិភាព',
  'raids': 'ការវាយឆ្មក់',
  'intensifying': 'ការបង្កើន',
  'full-scale': 'ទ្រង់ទ្រាយធំ',
  'puppet regime': 'របបអាយ៉ង',
  'coalition': 'ក្រុមចម្រុះ',
  'peace process': 'ដំណើរការសន្តិភាព',
  'peacekeeping mission': 'បេសកកម្មរក្សាសន្តិភាព',
  'disarm': 'ដកហូតអាវុធ',
  'sputtered on': 'បានអូសបន្លាយ',
  'collapse': 'ការដួលរលំ',
  'defected': 'បានធ្វើអត្តឃាត',
  'definitive end': 'ការបញ្ចប់ចុងក្រោយ',
  'set the stage': 'បង្កើតមូលដ្ឋាន',
  'century': 'សតវត្សរ៍',
  'forces at play': 'កម្លាំងកំពុងកើតឡើង',
  'invasion': 'ការលុកលុយ',
  'guerrilla conflict': 'ជម្លោះទ័ពព្រៃ',
  'neutral nation': 'ប្រទេសអព្យាក្រឹត',
  'maintain': 'រក្សាបាន',
  'viet cong': 'វៀតកុង',
  'ho chi minh trail': 'ផ្លូវលំហូជីមិញ',
  'conduct operations': 'ធ្វើប្រតិបត្តិការ',
  'secret': 'សម្ងាត់',
  'massive military action': 'សកម្មភាពយោធាដ៏ធំ',
  'drove many': 'បានជំរុញឲ្យ',
  'suffered from': 'បានរងទុក្ខពី',
  'growing communist insurgency': 'ក្រុមឧទ្ទាមកុម្មុយនិស្តដែលកំពុងរីកចម្រើន',
  'pro-american': 'គាំទ្រអាមេរិក',
  'immediate opposition': 'ការប្រឆាំងភ្លាមៗ',
  'surprisingly allied': 'បានធ្វើសម្ព័ន្ធភាពគួរឲ្យភ្ញាក់ផ្អើល',
  'called on': 'បានអំពាវនាវដល់',
  'losing battle': 'សមរភូមិដែលចាញ់',
  'urban population': 'ចំនួនប្រជាជនក្នុងទីក្រុង',
  'swelled': 'បានកើនឡើង',
  'fled the violence': 'បានភៀសខ្លួនពីអំពើហិង្សា',
  'slowly but relentlessly': 'បន្តិចម្តងៗ ប៉ុន្តែគ្មានការឈប់ឈរ',
  'closed in on': 'ចូលមកកាន់តែជិត',
  'ending the civil war': 'បញ្ចប់សង្គ្រាមស៊ីវិល',
  'darkest periods': 'រយៈពេលដ៏ខ្មៅងងឹតបំផុត',
  'modern history': 'ប្រវត្តិសាស្ត្រសម័យទំនើប',
  'renamed': 'បានប្តូរឈ្មោះ',
  'goal was': 'គោលដៅគឺ',
  'emptied the cities': 'បានជម្លៀសប្រជាជនចេញពីទីក្រុង',
  'private property': 'ទ្រព្យសម្បត្តិឯកជន',
  'money': 'លុយ',
  'religion': 'សាសនា',
  'period': 'រយៈពេល',
  'starvation': 'ការអត់ឃ្លាន',
  'overwork': 'ធ្វើការហួសកម្លាំង',
  'disease': 'ជំងឺ',
  'targeted': 'បានកំណត់គោលដៅលើ',
  'ethnic minorities': 'ជនជាតិភាគតិច',
  'former government officials': 'អតីតមន្ត្រីរដ្ឋាភិបាល',
  'enemy of the state': 'សត្រូវរបស់រដ្ឋ',
  'horrific acts': 'អំពើអាក្រក់',
  'mass murder': 'ការសម្លាប់រង្គាល',
  'killing fields': 'វាលពិឃាត',
  'shared communist ideology': 'មនោគមវិជ្ជាកុម្មុយនិស្តដូចគ្នា',
  'conducted': 'បានធ្វើ',
  'frequent border raids': 'ការវាយឆ្មក់តាមព្រំដែនញឹកញាប់',
  'killing civilians': 'សម្លាប់ជនស៊ីវិល',
  'intensifying tensions': 'ការបង្កើនភាពតានតឹង',
  'launched': 'បានបើក',
  'captured': 'បានដណ្តើមបាន',
  'driven from power': 'ដណ្តើមអំណាច',
  'installed': 'បានដំឡើង',
  'seen by many as': 'ត្រូវបានមនុស្សជាច្រើនចាត់ទុកថា',
  'did not end': 'មិនបានបញ្ចប់',
  'began between': 'បានចាប់ផ្តើមរវាង',
  'resistance factions': 'បក្សពួកតស៊ូ',
  'defeated': 'ដែលចាញ់',
  'continued to receive support': 'នៅតែបន្តទទួលបានការគាំទ្រ',
  'geopolitical rivalries': 'ការប្រកួតប្រជែងភូមិសាស្ត្រនយោបាយ',
  'withdrew their troops': 'បានដកទ័ពរបស់ខ្លួន',
  'initiated': 'ត្រូវបានចាប់ផ្តើម',
  'paris peace agreements': 'កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីស',
  'refused to participate': 'បានបដិសេធមិនចូលរួម',
  'disrupting the peace': 'រំខានដល់សន្តិភាព',
  'final collapse': 'ការដួលរលំចុងក្រោយ',
  'senior leaders': 'មេដឹកនាំជាន់ខ្ពស់',
  'capture of': 'ការចាប់ខ្លួន',
  'remaining': 'ដែលនៅសេសសល់',
  'widely seen as': 'ត្រូវបានគេមើលឃើញថាជា',
  'decades': 'ទសវត្សរ៍',
};

const englishContent = {
  title: "The Cambodian Civil War: A Historical Overview",
  intro: "The Cambodian Civil War (1970–1975) was a pivotal and devastating conflict that set the stage for one of the 20th century's worst genocides. However, to understand its complexity, one must look at the larger regional and global forces at play, including the Cold War, the Vietnam War, the subsequent Vietnamese invasion, and the prolonged guerrilla conflict that followed.",
  sections: [
    {
      heading: "Roots of the Conflict: The Cold War and Vietnam War",
      body: `Cambodia's role in the Cold War was that of a neutral nation under King Norodom Sihanouk. However, this neutrality was difficult to maintain as the conflict in neighboring Vietnam escalated. The North Vietnamese Army and the Viet Cong used the eastern parts of Cambodia as a staging area and supply route, known as the Ho Chi Minh Trail, to conduct operations against South Vietnam.
        
        In response, the United States, under President Richard Nixon, began a secret and extensive bombing campaign in Cambodia starting in 1969. While the goal was to disrupt North Vietnamese supply lines, the bombing campaign and border incursions destabilized the Cambodian countryside. This massive military action drove many rural Cambodians, who had suffered from the destruction, into the arms of a small but growing communist insurgency: the Khmer Rouge.`
    },
    {
      heading: "The Civil War and the Rise of the Khmer Rouge (1970–1975)",
      body: `The Civil War officially began in March 1970 when Lon Nol, with support from the United States, overthrew Prince Sihanouk in a coup. Lon Nol's new government, the Khmer Republic, was pro-American, but it faced immediate opposition from the Khmer Rouge and its allies. Sihanouk, from exile in China, surprisingly allied with the Khmer Rouge and called on Cambodians to join the fight against the Lon Nol regime. This call for armed resistance significantly boosted the ranks of the Khmer Rouge.
        
        Over the next five years, the U.S.-backed Lon Nol government fought a losing battle against the Khmer Rouge. The extensive U.S. bombing continued, and the urban population swelled as refugees fled the violence in the countryside. By 1975, the Khmer Rouge had slowly but relentlessly closed in on the capital, Phnom Penh. On April 17, 1975, the Khmer Rouge entered Phnom Penh, ending the Civil War and ushering in one of the darkest periods in modern history.`
    },
    {
      heading: "Democratic Kampuchea and the Cambodian Genocide (1975–1979)",
      body: `The Khmer Rouge, led by Pol Pot, immediately renamed the country Democratic Kampuchea and began a radical social engineering project. Their goal was to create a self-sufficient, agrarian, and classless society. They emptied the cities, forcing millions of people into the countryside for forced labor in collective farms. Private property, money, and religion were abolished.
        
        During this brutal four-year period, an estimated 1.5 to 2 million Cambodians—roughly a quarter of the population—died from starvation, overwork, disease, and execution. The Khmer Rouge targeted intellectuals, ethnic minorities (including Cham Muslims and ethnic Vietnamese), former government officials, and anyone perceived as an "enemy of the state." The horrific acts of mass murder took place in hundreds of locations known as the Killing Fields.`
    },
    {
      heading: "The Vietnamese Invasion and the Prolonged Conflict (1979–1998)",
      body: `Despite their shared communist ideology, the relationship between the Khmer Rouge and Vietnam was hostile. The Khmer Rouge conducted frequent border raids into Vietnam, killing civilians and intensifying tensions. On December 25, 1978, Vietnam launched a full-scale invasion of Cambodia. Within two weeks, the Vietnamese army had captured Phnom Penh and driven the Khmer Rouge from power.
        
        The Vietnamese installed a new government, the People's Republic of Kampuchea, which was seen by many as a puppet regime. While the Vietnamese invasion ended the genocide, it did not end the conflict. A prolonged guerrilla war began between the Vietnamese-backed government and a coalition of three resistance factions, including the defeated Khmer Rouge, who continued to receive support from China, the United States, and Thailand.
        
        This guerrilla war, fueled by Cold War tensions and geopolitical rivalries, continued throughout the 1980s. The Vietnamese withdrew their troops in 1989, and a peace process was finally initiated. The 1991 Paris Peace Agreements brought a UN-led peacekeeping mission (UNTAC) to Cambodia to disarm the factions and organize free elections.
        
        However, elements of the Khmer Rouge refused to participate and continued to fight, disrupting the peace. The conflict effectively sputtered on for several more years. The final collapse of the Khmer Rouge came in the mid-199s as senior leaders defected and Pol Pot died in 1998. The capture of the last remaining Khmer Rouge leader, Ta Mok, in 1999, is widely seen as the definitive end to the decades of civil war and conflict.`
    }
  ]
};

const khmerContent = {
  title: "សង្គ្រាមស៊ីវិលកម្ពុជា៖ ទិដ្ឋភាពប្រវត្តិសាស្ត្រ",
  intro: "សង្គ្រាមស៊ីវិលកម្ពុជា (១៩៧០–១៩៧៥) គឺជាជម្លោះដ៏សំខាន់ និងបំផ្លាញ ដែលបានបង្កើតមូលដ្ឋានសម្រាប់អំពើប្រល័យពូជសាសន៍ដ៏អាក្រក់បំផុតមួយក្នុងសតវត្សទី ២០។ ទោះយ៉ាងណាក៏ដោយ ដើម្បីយល់ពីភាពស្មុគស្មាញរបស់វា មនុស្សម្នាក់ត្រូវតែមើលទៅលើកម្លាំងក្នុងតំបន់ និងសកលលោកដ៏ធំជាងនេះ ដែលកំពុងកើតឡើង រួមទាំងសង្គ្រាមត្រជាក់ សង្គ្រាមវៀតណាម ការលុកលុយរបស់វៀតណាមជាបន្តបន្ទាប់ និងជម្លោះទ័ពព្រៃដែលអូសបន្លាយដែលបានកើតឡើងបន្ទាប់ពីនោះ។",
  sections: [
    {
      heading: "ឫសគល់នៃជម្លោះ៖ សង្គ្រាមត្រជាក់ និងសង្គ្រាមវៀតណាម",
      body: `តួនាទីរបស់កម្ពុជាក្នុងសង្គ្រាមត្រជាក់ គឺជាប្រទេសអព្យាក្រឹតក្រោមព្រះបាទនរោត្តម សីហនុ។ ទោះជាយ៉ាងណាក៏ដោយ ភាពអព្យាក្រឹតនេះពិបាកនឹងរក្សាបាន នៅពេលដែលជម្លោះនៅក្នុងប្រទេសវៀតណាមដែលនៅជិតខាងបានកើនឡើង។ កងទ័ពវៀតណាមខាងជើង និងវៀតកុង បានប្រើប្រាស់ផ្នែកខាងកើតនៃប្រទេសកម្ពុជាជាកន្លែងដាក់សម្ភារៈ និងផ្លូវផ្គត់ផ្គង់ ដែលគេស្គាល់ថាជាផ្លូវលំហូជីមិញ ដើម្បីធ្វើប្រតិបត្តិការប្រឆាំងនឹងវៀតណាមខាងត្បូង។
        
        ក្នុងការឆ្លើយតប សហរដ្ឋអាមេរិក ក្រោមការដឹកនាំរបស់ប្រធានាធិបតី Richard Nixon បានចាប់ផ្តើមយុទ្ធនាការទម្លាក់គ្រាប់បែកសម្ងាត់ និងទូលំទូលាយនៅក្នុងប្រទេសកម្ពុជាចាប់តាំងពីឆ្នាំ ១៩៦៩។ ខណៈដែលគោលដៅគឺដើម្បីរំខានផ្លូវផ្គត់ផ្គង់របស់វៀតណាមខាងជើង យុទ្ធនាការទម្លាក់គ្រាប់បែក និងការឈ្លានពានតាមព្រំដែនបានធ្វើឲ្យជនបទកម្ពុជាមានអស្ថិរភាព។ សកម្មភាពយោធាដ៏ធំនេះបានជំរុញឲ្យប្រជាជនកម្ពុជាជនបទជាច្រើននាក់ ដែលបានរងទុក្ខពីការបំផ្លិចបំផ្លាញ ឲ្យទៅចូលរួមជាមួយក្រុមឧទ្ទាមកុម្មុយនិស្តតូចមួយដែលកំពុងរីកចម្រើន៖ គឺខ្មែរក្រហម។`
    },
    {
      heading: "សង្គ្រាមស៊ីវិល និងការងើបឡើងនៃខ្មែរក្រហម (១៩៧០–១៩៧៥)",
      body: `សង្គ្រាមស៊ីវិលបានចាប់ផ្តើមជាផ្លូវការនៅខែមីនា ឆ្នាំ ១៩៧០ នៅពេលដែល លន់ នល់ ដោយមានការគាំទ្រពីសហរដ្ឋអាមេរិក បានធ្វើរដ្ឋប្រហារទម្លាក់ព្រះអង្គម្ចាស់សីហនុ។ រដ្ឋាភិបាលថ្មីរបស់ លន់ នល់ ដែលជាសាធារណរដ្ឋខ្មែរ គឺគាំទ្រអាមេរិក ប៉ុន្តែវាបានប្រឈមមុខនឹងការប្រឆាំងភ្លាមៗពីខ្មែរក្រហម និងសម្ព័ន្ធមិត្តរបស់ខ្លួន។ សីហនុ ពីការនិរទេសខ្លួននៅប្រទេសចិន បានធ្វើសម្ព័ន្ធភាពជាមួយខ្មែរក្រហម ហើយបានអំពាវនាវដល់ប្រជាជនកម្ពុជាឲ្យចូលរួមប្រយុទ្ធប្រឆាំងនឹងរបប លន់ នល់។ ការអំពាវនាវសម្រាប់ការតស៊ូប្រដាប់អាវុធនេះបានបង្កើនយ៉ាងខ្លាំងដល់ជួរកងទ័ពរបស់ខ្មែរក្រហម។
        
        ក្នុងរយៈពេលប្រាំឆ្នាំបន្ទាប់ រដ្ឋាភិបាល លន់ នល់ ដែលមានការគាំទ្រពីសហរដ្ឋអាមេរិកបានប្រយុទ្ធក្នុងសមរភូមិដែលចាញ់ប្រឆាំងនឹងខ្មែរក្រហម។ ការទម្លាក់គ្រាប់បែកដ៏ទូលំទូលាយរបស់សហរដ្ឋអាមេរិកនៅតែបន្ត ហើយចំនួនប្រជាជនក្នុងទីក្រុងបានកើនឡើងនៅពេលដែលជនភៀសខ្លួនបានភៀសខ្លួនពីអំពើហិង្សានៅជនបទ។ មកដល់ឆ្នាំ ១៩៧៥ ខ្មែរក្រហមបានចូលមកកាន់តែជិតរាជធានីភ្នំពេញបន្តិចម្តងៗ ប៉ុន្តែគ្មានការឈប់ឈរ។ នៅថ្ងៃទី ១៧ ខែមេសា ឆ្នាំ ១៩៧៥ ខ្មែរក្រហមបានចូលរាជធានីភ្នំពេញ ដោយបញ្ចប់សង្គ្រាមស៊ីវិល និងបើកទ្វារសម្រាប់រយៈពេលដ៏ខ្មៅងងឹតបំផុតមួយក្នុងប្រវត្តិសាស្ត្រសម័យទំនើប។`
    },
    {
      heading: "កម្ពុជាប្រជាធិបតេយ្យ និងអំពើប្រល័យពូជសាសន៍កម្ពុជា (១៩៧៥–១៩៧៩)",
      body: `ខ្មែរក្រហមដែលដឹកនាំដោយ ប៉ុល ពត បានប្តូរឈ្មោះប្រទេសភ្លាមៗទៅជាកម្ពុជាប្រជាធិបតេយ្យ ហើយបានចាប់ផ្តើមគម្រោងវិស្វកម្មសង្គមដ៏រ៉ាឌីកាល់មួយ។ គោលដៅរបស់ពួកគេគឺដើម្បីបង្កើតសង្គមកសិកម្មដែលពឹងផ្អែកលើខ្លួនឯង និងគ្មានវណ្ណៈ។ ពួកគេបានជម្លៀសប្រជាជនចេញពីទីក្រុង ដោយបង្ខំមនុស្សរាប់លាននាក់ឲ្យទៅជនបទដើម្បីធ្វើការងារដោយបង្ខំនៅតាមកសិដ្ឋានរួម។ ទ្រព្យសម្បត្តិឯកជន លុយ និងសាសនាត្រូវបានលុបបំបាត់។
        
        ក្នុងអំឡុងពេលដ៏ឃោរឃៅរយៈពេលបួនឆ្នាំនេះ ប្រជាជនកម្ពុជាប្រមាណពី ១,៥ ទៅ ២ លាននាក់—ដែលស្មើនឹងប្រហែលមួយភាគបួននៃចំនួនប្រជាជន—បានស្លាប់ដោយសារការអត់ឃ្លាន ធ្វើការហួសកម្លាំង ជំងឺ និងការប្រហារជីវិត។ ខ្មែរក្រហមបានកំណត់គោលដៅលើបញ្ញវន្ត ជនជាតិភាគតិច (រួមទាំងជនជាតិចាម និងជនជាតិវៀតណាម) អតីតមន្ត្រីរដ្ឋាភិបាល និងនរណាម្នាក់ដែលត្រូវបានចាត់ទុកថាជា "សត្រូវរបស់រដ្ឋ"។ អំពើឃាតកម្មដ៏អាក្រក់បានកើតឡើងនៅកន្លែងរាប់រយដែលគេស្គាល់ថាជាវាលពិឃាត។`
    },
    {
      heading: "ការលុកលុយរបស់វៀតណាម និងជម្លោះដែលអូសបន្លាយ (១៩៧៩–១៩៩៨)",
      body: `ទោះបីជាពួកគេមានមនោគមវិជ្ជាកុម្មុយនិស្តដូចគ្នាក៏ដោយ ទំនាក់ទំនងរវាងខ្មែរក្រហម និងវៀតណាមគឺអរិភាព។ ខ្មែរក្រហមបានធ្វើការវាយឆ្មក់តាមព្រំដែនញឹកញាប់ចូលទៅក្នុងប្រទេសវៀតណាម ដោយសម្លាប់ជនស៊ីវិល និងបង្កើនភាពតានតឹង។ នៅថ្ងៃទី ២៥ ខែធ្នូ ឆ្នាំ ១៩៧៨ វៀតណាមបានបើកការលុកលុយទ្រង់ទ្រាយធំលើប្រទេសកម្ពុជា។ ក្នុងរយៈពេលពីរសប្តាហ៍ កងទ័ពវៀតណាមបានដណ្តើមបានរាជធានីភ្នំពេញ និងដណ្តើមអំណាចពីខ្មែរក្រហម។
        
        វៀតណាមបានដំឡើងរដ្ឋាភិបាលថ្មីមួយគឺសាធារណរដ្ឋប្រជាមានិតកម្ពុជា ដែលត្រូវបានមនុស្សជាច្រើនចាត់ទុកថាជារបបអាយ៉ង។ ខណៈដែលការលុកលុយរបស់វៀតណាមបានបញ្ចប់អំពើប្រល័យពូជសាសន៍ វាមិនបានបញ្ចប់ជម្លោះនោះទេ។ សង្រ្គាមទ័ពព្រៃដែលអូសបន្លាយបានចាប់ផ្តើមរវាងរដ្ឋាភិយាលដែលគាំទ្រដោយវៀតណាម និងក្រុមចម្រុះនៃបក្សពួកតស៊ូបីក្រុម រួមទាំងខ្មែរក្រហមដែលចាញ់ ដែលនៅតែបន្តទទួលបានការគាំទ្រពីប្រទេសចិន សហរដ្ឋអាមេរិក និងថៃ។
        
        សង្គ្រាមទ័ពព្រៃនេះ ដែលត្រូវបានជំរុញដោយភាពតានតឹងក្នុងសង្គ្រាមត្រជាក់ និងការប្រកួតប្រជែងភូមិសាស្ត្រនយោបាយ បានបន្តពេញមួយទសវត្សរ៍ឆ្នាំ ១៩៨០។ វៀតណាមបានដកទ័ពរបស់ខ្លួននៅឆ្នាំ ១៩៨៩ ហើយដំណើរការសន្តិភាពត្រូវបានចាប់ផ្តើមជាស្ថាពរ។ កិច្ចព្រមព្រៀងសន្តិភាពទីក្រុងប៉ារីសឆ្នាំ ១៩៩១ បាននាំមកនូវបេសកកម្មរក្សាសន្តិភាពដែលដឹកនាំដោយអង្គការសហប្រជាជាតិ (UNTAC) មកកាន់ប្រទេសកម្ពុជាដើម្បីដកហូតអាវុធបក្សពួក និងរៀបចំការបោះឆ្នោតដោយសេរី។
        
        ទោះជាយ៉ាងណាក៏ដោយ សមាសធាតុនៃខ្មែរក្រហមបានបដិសេធមិនចូលរួម ហើយនៅតែបន្តប្រយុទ្ធ ដែលរំខានដល់សន្តិភាព។ ជម្លោះបានអូសបន្លាយជាច្រើនឆ្នាំទៀត។ ការដួលរលំចុងក្រោយនៃខ្មែរក្រហមបានកើតឡើងនៅពាក់កណ្តាលទសវត្សរ៍ឆ្នាំ ១៩៩០ នៅពេលដែលមេដឹកនាំជាន់ខ្ពស់បានធ្វើអត្តឃាត ហើយ ប៉ុល ពត បានស្លាប់នៅឆ្នាំ ១៩៩៨។ ការចាប់ខ្លួនមេដឹកនាំខ្មែរក្រហមដែលនៅសេសសល់ចុងក្រោយបង្អស់គឺ តា ម៉ុក ក្នុងឆ្នាំ ១៩៩៩ ត្រូវបានគេមើលឃើញថាជាការបញ្ចប់ចុងក្រោយនៃសង្គ្រាមស៊ីវិល និងជម្លោះជាច្រើនទសវត្សរ៍។`
    }
  ]
};

const getVoices = () => {
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(voice => voice.lang.startsWith('en-US'));
};

const getDefaultVoice = (voices) => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    return voices.find(v => v.name.includes('Samantha')) || voices[0];
  } else {
    return voices[3] || voices[0];
  }
};

const splitTextByHardWords = (text, handleWordClick) => {
  const words = text.split(/(\s+)/);
  const elements = words.map((word, index) => {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (hardWords[cleanWord]) {
      return (
        <span key={index} 
              className="relative z-10 font-crimson underline decoration-dashed decoration-2 hard-word-underline cursor-pointer"
              data-word={cleanWord}
              data-translation={hardWords[cleanWord]}
              onClick={handleWordClick}>
          {word}
        </span>
      );
    }
    return word;
  });
  return elements;
};

const Item5 = () => {
  const [playingId, setPlayingId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ word: '', translation: '', x: 0, y: 0 });
  const popupRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = getVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setSelectedVoice(getDefaultVoice(availableVoices));
      } else {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          const updatedVoices = getVoices();
          setVoices(updatedVoices);
          setSelectedVoice(getDefaultVoice(updatedVoices));
        });
      }
    };
    loadVoices();
  }, []);

  const handleSpeak = (text, onEndCallback) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.onend = onEndCallback;
    window.speechSynthesis.speak(utterance);
  };

  const handleAudio = (id, text) => {
    if (playingId === id) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      window.speechSynthesis.cancel();
      setPlayingId(id);
      setIsPaused(false);
      handleSpeak(text, () => setPlayingId(null));
    }
  };

  const handleWordClick = (e) => {
    e.stopPropagation();

    const word = e.target.getAttribute('data-word');
    const translation = e.target.getAttribute('data-translation');
    const rect = e.target.getBoundingClientRect();
    
    setPopupContent({
      word,
      translation,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY + rect.height + 10,
    });
    setShowPopup(true);
  };

  const handlePopupAudio = (word) => {
    handleSpeak(word, () => {});
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 p-4 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Koulen&family=Noto+Serif+Khmer:wght@100..900&family=Nokora&family=Kdam+Thmor+Pro&display=swap');
        
        /* Scaled English Fonts */
        .font-english-header-scaled {
          font-family: 'Oswald', sans-serif;
          font-size: calc(1.3 * 30px); /* 39px */
        }
        .font-english-subheading-scaled {
          font-family: 'Raleway', sans-serif;
          font-size: calc(1.3 * 24px); /* 31.2px */
        }
        .font-english-body-scaled {
          font-family: 'Crimson Text', serif;
          font-size: calc(1.3 * 16px); /* 20.8px */
        }
        .font-english-label-scaled {
          font-family: 'Noto Sans', sans-serif;
          font-size: calc(1.3 * 16px); /* 20.8px */
        }
        
        /* Unscaled Khmer Fonts */
        .font-khmer-header { font-family: 'Koulen', cursive; }
        .font-khmer-subheading { font-family: 'Noto Serif Khmer', serif; }
        .font-khmer-body { font-family: 'Nokora', cursive; }
        .font-khmer-label { font-family: 'Kdam Thmor Pro', cursive; }

        /* Custom style for hard word underline */
        .hard-word-underline {
          text-decoration-color: #3b82f6; /* A shade of blue from Tailwind's color palette */
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
          font-family: 'Kdam Thmor Pro', cursive;
        }
      `}</style>

      {/* Main content container with alternating sections */}
      <div className="max-w-7xl mx-auto p-4 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
        {/* English Title & Intro */}
        <div className="space-y-6 md:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-english-header-scaled font-bold text-center md:text-left">{englishContent.title}</h1>
            <button
              onClick={() => handleAudio('intro', englishContent.intro.replace(/\s+/g, ' '))}
              className="p-2 rounded-full transition-colors duration-200"
            >
              {playingId === 'intro' && !isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause-circle text-red-500 w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M10 15V9"/><path d="M14 15V9"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-audio-lines text-blue-500 w-6 h-6"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v12"/><path d="M22 10v3"/></svg>
              )}
            </button>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <p className="font-english-body-scaled leading-tight text-gray-700">{splitTextByHardWords(englishContent.intro, handleWordClick)}</p>
          </div>
        </div>
        
        {/* Khmer Title & Intro */}
        <div className="space-y-6 mt-8 md:mt-0 md:col-span-1">
          <h1 className="text-3xl lg:text-4xl font-khmer-header font-bold text-center mb-6 md:text-left">{khmerContent.title}</h1>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <p className="font-khmer-body leading-relaxed text-gray-700">{khmerContent.intro}</p>
          </div>
        </div>

        {/* Alternating Sections */}
        {englishContent.sections.map((englishSection, index) => (
          <React.Fragment key={index}>
            {/* English Section */}
            <div className="space-y-6 mt-8 md:mt-0 md:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-english-subheading-scaled font-semibold text-gray-900">{englishSection.heading}</h2>
                  <button
                    onClick={() => handleAudio(index, englishSection.heading + ' ' + englishSection.body.replace(/\s+/g, ' '))}
                    className="p-2 rounded-full transition-colors duration-200"
                  >
                    {playingId === index && !isPaused ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause-circle text-red-500 w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M10 15V9"/><path d="M14 15V9"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-audio-lines text-blue-500 w-6 h-6"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v12"/><path d="M22 10v3"/></svg>
                    )}
                  </button>
                </div>
                <p className="font-english-body-scaled leading-tight text-gray-700 whitespace-pre-line">
                  {splitTextByHardWords(englishSection.body, handleWordClick)}
                </p>
              </div>
            </div>
            {/* Khmer Section */}
            <div className="space-y-6 mt-8 md:mt-0 md:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-khmer-subheading font-semibold text-gray-900">{khmerContent.sections[index].heading}</h2>
                <p className="font-khmer-body leading-relaxed text-gray-700 whitespace-pre-line">{khmerContent.sections[index].body}</p>
              </div>
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
            <span className="font-khmer-label text-lg">{popupContent.translation}</span>
            <button
              onClick={() => handlePopupAudio(popupContent.word)}
              className="p-1 rounded-full text-blue-500 hover:bg-blue-100 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item5;
