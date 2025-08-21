import React, { useState, useEffect, useRef } from 'react';
import YoutubeEmbed from "../../YoutubeEmbed";

// Define hard words and their Khmer translations for the new content
const hardWords = {
  'perpetrating': 'ប្រព្រឹត្ត',
  'genocide': 'អំពើប្រល័យពូជសាសន៍',
  'regime': 'របប',
  'turmoil': 'ភាពចលាចល',
  'colonial': 'អាណានិគម',
  'militant': 'កងកម្លាំងប្រដាប់អាវុធ',
  'overthrowing': 'ផ្ដួលរំលំ',
  'neutral': 'អព្យាក្រឹត',
  'overthrown': 'ត្រូវបានផ្ដួលរំលំ',
  'allied': 'បានរួបរួម',
  'classless': 'គ្មានវណ្ណៈ',
  'self-sufficiency': 'ខ្លួនទីពឹងខ្លួន',
  'civil': 'ស៊ីវិល',
  'erupted': 'បានផ្ទុះឡើង',
  'brutal': 'ឃោរឃៅ',
  'conflict': 'ជម្លោះ',
  'conquered': 'បានត្រួតត្រា',
  'evacuating': 'ជម្លៀស',
  'perished': 'បានស្លាប់',
  'paranoia': 'ភាពភ័យខ្លាច',
  'sabotage': 'បំផ្លាញ',
  'tribunal': 'តុលាការ',
  'testimony': 'សក្ខីកម្ម',
  'perpetrators': 'អ្នកប្រព្រឹត្ត',
  'traumatic': 'ប៉ះទង្គិចផ្លូវចិត្ត',
  'oppressor': 'អ្នកជិះជាន់',
  'oppressed': 'អ្នករងការជិះជាន់',
  'shattered': 'បែកបាក់',
  'unstable': 'មិនស្ថិតស្ថេរ',
  'execution': 'ការប្រហារជីវិត',
  'defected': 'បានបោះបង់ចោល',
  'justice': 'យុត្តិធម៌',
  'hybrid': 'កូនកាត់',
  'population': 'ចំនួនប្រជាជន',
  'executed': 'ត្រូវបានប្រហារជីវិត',
  'suspected': 'សង្ស័យ',
  'political': 'នយោបាយ',
  'enemies': 'សត្រូវ',
  'ethnicities': 'ក្រុមជនជាតិ',
  'targeted': 'បានកំណត់គោលដៅ',
  'individuals': 'បុគ្គល',
  'starvation': 'ការអត់ឃ្លាន',
  'disease': 'ជំងឺ',
  'exhaustion': 'ការហត់នឿយ',
  'overwork': 'ការងារហួសកម្លាំង',
  'genocidal': 'ពាក់ព័ន្ធនឹងអំពើប្រល័យពូជសាសន៍',
  'amidst': 'នៅកណ្ដាល',
  'decades': 'ទសវត្សរ៍',
  'monarch': 'ព្រះមហាក្សត្រ',
  'negotiated': 'បានចរចា',
  'independence': 'ឯករាជ្យ',
  'provoked': 'បានបង្ក',
  'friction': 'ការកកិត',
  'citizens': 'ប្រជាពលរដ្ឋ',
  'rebels': 'ក្រុមបះបោរ',
  'opposed': 'បានប្រឆាំង',
  'complicated': 'ស្មុគស្មាញ',
  'raging': 'កំពុងផ្ទុះ',
  'borders': 'ព្រំដែន',
  'supporting': 'កំពុងគាំទ្រ',
  'non-communist': 'មិនមែនកុម្មុយនិស្ត',
  'petitioned': 'បានស្នើសុំ',
  'minister': 'រដ្ឋមន្ត្រី',
  'regions': 'តំបន់',
  'efforts': 'ការខិតខំ',
  'civilians': 'ជនស៊ីវិល',
  'regain': 'ដណ្តើមបានមកវិញ',
  'Communist': 'កុម្មុយនិស្ត',
  'dreamed': 'បានស្រមៃ',
  'nation': 'ប្រទេស',
  'society': 'សង្គម',
  'farmers': 'កសិករ',
  'opposed': 'បានប្រឆាំង',
  'capitalist': 'មូលធននិយម',
  'imperialism': 'ចក្រពត្តិនិយម',
  'sought': 'បានស្វែងរក',
  'represented': 'បានតំណាង',
  'pro-American': 'គាំទ្រអាមេរិក',
  'government': 'រដ្ឋាភិបាល',
  'angered': 'បានធ្វើឱ្យខឹង',
  'destructive': 'បំផ្លិចបំផ្លាញ',
  'bombing': 'ការទម្លាក់គ្រាប់បែក',
  'encouraged': 'ត្រូវបានលើកទឹកចិត្ត',
  'eventually': 'ទីបំផុត',
  'executed': 'បានប្រហារជីវិត',
  'associated': 'ជាប់ពាក់ព័ន្ធ',
  'stripped': 'ត្រូវបានដកហូត',
  'imprisonment': 'ការជាប់គុក',
  'residents': 'ប្រជាជន',
  'countryside': 'ជនបទ',
  'abandoned': 'ត្រូវបានបោះបង់ចោល',
  'separating': 'ការបំបែក',
  'belongings': 'ទ្រព្យសម្បត្តិ',
  'outlawed': 'ត្រូវបានហាមឃាត់',
  'agricultural': 'កសិកម្ម',
  'workforce': 'កម្លាំងពលកម្ម',
  'expected': 'ត្រូវបានគេរំពឹងទុក',
  'impossible': 'មិនអាចទៅរួច',
  'amounts': 'បរិមាណ',
  'fulfill': 'បំពេញ',
  'quotas': 'កូតា',
  'prioritized': 'បានផ្តល់អាទិភាព',
  'suffering': 'ទទួលរង',
  'malaria': 'ជំងឺគ្រុនចាញ់',
  'malnutrition': 'កង្វះអាហារូបត្ថម្ភ',
  'enforcing': 'ការអនុវត្ត',
  'safer': 'មានសុវត្ថិភាពជាង',
  'failed': 'បានបរាជ័យ',
  'produce': 'ផលិត',
  'rates': 'អត្រា',
  'leadership': 'ថ្នាក់ដឹកនាំ',
  'paranoid': 'ភ័យខ្លាច',
  'internal': 'ផ្ទៃក្នុង',
  'believed': 'បានជឿ',
  'revolution': 'បដិវត្តន៍',
  'arresting': 'ការចាប់ខ្លួន',
  'executing': 'ការប្រហារជីវិត',
  'perceived': 'ត្រូវបានគេយល់ថា',
  'threat': 'ការគំរាមកំហែង',
  'brutality': 'អំពើឃោរឃៅ',
  'continued': 'បានបន្ត',
  'upheaval': 'ភាពចលាចល',
  'triggered': 'បានបង្ក',
  'families': 'ក្រុមគ្រួសារ',
  'easy path': 'ផ្លូវងាយស្រួល',
  'victims': 'ជនរងគ្រោះ',
  'established': 'ត្រូវបានបង្កើតឡើង',
  'topmost': 'កំពូលបំផុត',
  'positions': 'មុខតំណែង',
  'trial': 'ការកាត់ទោស',
  'insight': 'ការយល់ដឹង',
  'cruel': 'ឃោរឃៅ',
  'enabled': 'បានធ្វើឱ្យអាច',
  'superiors': 'ថ្នាក់លើ',
  'crimes': 'បទឧក្រិដ្ឋ',
  'legally': 'តាមផ្លូវច្បាប់',
  'acknowledged': 'ត្រូវបានទទួលស្គាល់',
  'constantly': 'ជានិច្ច',
  'feared': 'បានភ័យខ្លាច',
  'self-preservation': 'ការការពារខ្លួន',
  'perception': 'ការយល់ឃើញ',
  'extended': 'បានពង្រីក',
  'courtroom': 'បន្ទប់សវនាការ',
  'suffered': 'បានរងទុក្ខ',
  'hunger': 'ភាពអត់ឃ្លាន',
  'stripped of': 'ត្រូវបានដកហូត',
  'overworked': 'ធ្វើការហួសកម្លាំង',
  'paranoia': 'ភាពភ័យខ្លាច',
  'majority': 'ភាគច្រើន',
  'committed': 'បានប្រព្រឹត្ត',
  'broad': 'ទូលំទូលាយ',
  'campaign': 'យុទ្ធនាការ',
  'impacting': 'ការប៉ះពាល់',
  'entire': 'ទាំងមូល',
  'prison sentences': 'ទោសជាប់ពន្ធនាគារ',
  'pursue': 'បន្ត',
  'further': 'បន្ថែមទៀត',
  'trials': 'ការកាត់ក្តី',
  'survey': 'ការស្ទង់មតិ',
  'revealed': 'បានបង្ហាញ',
  'contributed': 'បានរួមចំណែក',
  'justice': 'យុត្តិធម៌',
  'tragedy': 'សោកនាដកម្ម',
  'tempting': 'គួរឱ្យទាក់ទាញ',
  'paint': 'គូរ',
  'conflicts': 'ជម្លោះ',
  'simplistic': 'សាមញ្ញ',
  'terms': 'លក្ខខណ្ឌ',
  'casting': 'ការគិត',
  'reality': 'ការពិត',
  'excuse': 'លេស',
  'acts': 'ទង្វើ',
  'violence': 'អំពើហិង្សា',
  'remembers': 'ចងចាំ',
  'victim': 'ជនរងគ្រោះ',
  'perpetrator': 'អ្នកប្រព្រឹត្ត',
  'society': 'សង្គម',
  'path': 'ផ្លូវ',
  'future': 'អនាគត'
};

const englishContent = {
  title: "The Cambodian Civil War: The Rise and Fall of the Khmer Rouge",
  intro: "From 1975 to 1979, the Communist Party of Kampuchea ruled Cambodia with an iron fist, perpetrating genocide that killed one fourth of the country’s population. Roughly 1 million Cambodians were executed as suspected political enemies or due to their ethnicities. The regime targeted Muslim Cham, Vietnamese, Chinese, Thai, and Laotian individuals. Outside these executions, one million more Cambodians died of starvation, disease, or exhaustion from overwork. This genocidal regime rose to power amidst decades of political turmoil.",
  sections: [
    {
      heading: "The Road to Power",
      body: `Following World War II, Cambodia’s monarch, Prince Norodom Sihanouk, successfully negotiated the country’s independence after roughly 90 years of French colonial rule. But Sihanouk’s strict policies provoked friction with many citizens. Especially militant communist rebels, who had long opposed the French and now turned their attention to overthrowing the prince.
        
This unstable situation was further complicated by a war raging outside Cambodia’s borders. In Vietnam, millions of American troops were supporting the non-communist south against the communist north. While the US petitioned for Cambodia’s support, Prince Sihanouk tried to stay neutral. But in 1970, he was overthrown by his prime minister who allowed American troops to bomb regions of Cambodia in their efforts to target North Vietnamese fighters. These attacks killed thousands of Cambodian civilians. To regain power after being overthrown, the prince allied with his political enemies.`
    },
    {
      heading: "A New, Brutal Regime",
      body: `The Communist Party of Kampuchea, also known as the Khmer Rouge, was led by Cambodians who dreamed of making their nation a classless society of rice farmers. They opposed capitalist Western imperialism and sought to lead the country to self-sufficiency. But to the public, they mostly represented a force fighting the pro-American government. Angered by destructive American bombing and encouraged by the prince’s call to arms, many Cambodians joined the Khmer Rouge.
        
Eventually, a full blown civil war erupted. Over five years of fighting, more than half a million Cambodians died in this brutal conflict. But the violence didn’t end when the rebels conquered Phnom Penh in April 1975. Upon taking the capital, the Khmer Rouge executed anyone associated with the previous government. Prince Sihanouk remained stripped of power and was put under house arrest, and the Khmer Rouge began evacuating city residents to the countryside. Those who couldn't make the trip by foot were abandoned, separating countless families.`
    },
    {
      heading: "The Fall and Aftermath",
      body: `In this new regime, every citizen was stripped of their belongings and given the same clothes and haircut. Private property, money, and religion were outlawed. The new agricultural workforce was expected to produce impossible amounts of rice, and local leaders would be killed if they couldn’t fulfill quotas. Many prioritized their orders to the capital above feeding workers. Underfed, overworked, and suffering from malaria and malnutrition, thousands perished.
        
The Khmer Rouge members enforcing the system were no safer. When their plan failed to produce rice at the expected rates, Khmer Rouge leadership became paranoid. They believed that internal enemies were trying to sabotage the revolution, and they began arresting and executing anyone perceived as a threat. This brutality continued for almost four years. Finally, in 1979, Vietnamese troops working alongside defected Khmer Rouge members took control of the country. This political upheaval triggered yet another civil war that wouldn’t end until the 1990s.`
    },
    {
      heading: "Pursuing Justice",
      body: `In the years that followed, there was no easy path to justice for victims and their families. A hybrid UN-Cambodian tribunal was established in 2003, but it only tried Khmer Rouge in the topmost leadership positions. Lower level Khmer Rouge members appeared in court as well, but they weren't placed on trial. Instead, they gave testimony and offered insight into the cruel system that had enabled their superiors’ crimes. Some of these perpetrators were even legally acknowledged as victims, because they constantly feared for their lives and committed violence as a means of self-preservation.
        
This perception of low level Khmer Rouge members as victims rather than perpetrators extended beyond the courtroom. Like other Cambodians, most Khmer Rouge members lost family, suffered hunger, were stripped of their homes and belongings, and were overworked to exhaustion. And the paranoia amongst Khmer Rouge leadership had led to a higher rate of execution for Khmer Rouge members than the ethnic majority population. As a result, many Cambodians today don't just see the genocide as one committed against ethnic minority groups, but also as a broad campaign of violence impacting the entire population. As of 2021, only three people have received prison sentences. Many victims would like the tribunal to pursue further trials of Khmer Rouge leaders. However, a 2018 national survey revealed that most victims feel the tribunal has contributed to justice.`
    }
  ]
};

const khmerContent = {
  title: "សង្គ្រាមស៊ីវិលកម្ពុជា៖ ការងើបឡើង និងការដួលរលំនៃខ្មែរក្រហម",
  intro: "ចាប់ពីឆ្នាំ ១៩៧៥ ដល់ ១៩៧៩ គណបក្សកុម្មុយនិស្តកម្ពុជាបានគ្រប់គ្រងប្រទេសកម្ពុជាដោយកណ្តាប់ដៃដែក ដោយបានប្រព្រឹត្តអំពើប្រល័យពូជសាសន៍ដែលបានសម្លាប់ប្រជាជនមួយភាគបួននៃចំនួនប្រជាជនសរុប។ ប្រជាជនខ្មែរប្រមាណ ១ លាននាក់ត្រូវបានប្រហារជីវិត ដោយសារតែត្រូវបានសង្ស័យថាជាសត្រូវនយោបាយ ឬដោយសារជាតិសាសន៍របស់ពួកគេ។ របបនេះបានកំណត់គោលដៅលើជនជាតិចាមឥស្លាម វៀតណាម ចិន ថៃ និងឡាវ។ ក្រៅពីការប្រហារជីវិតទាំងនេះ ប្រជាជនខ្មែរ ១ លាននាក់ផ្សេងទៀតបានស្លាប់ដោយសារការអត់ឃ្លាន ជំងឺ ឬអស់កម្លាំងពីការងារហួសកម្លាំង។ របបប្រល័យពូជសាសន៍នេះបានឡើងកាន់អំណាចអំឡុងពេលជាច្រើនទសវត្សរ៍នៃភាពចលាចលនយោបាយ។",
  sections: [
    {
      heading: "ផ្លូវឆ្ពោះទៅកាន់អំណាច",
      body: `ក្រោយសង្គ្រាមលោកលើកទី២ ព្រះបាទនរោត្តម សីហនុ ជាព្រះមហាក្សត្រកម្ពុជា បានចរចាដោយជោគជ័យដើម្បីទទួលបានឯករាជ្យរបស់ប្រទេសបន្ទាប់ពីការគ្រប់គ្រងអាណានិគមបារាំងប្រមាណ ៩០ ឆ្នាំ។ ប៉ុន្តែ គោលនយោបាយដ៏តឹងរ៉ឹងរបស់ព្រះអង្គបានបង្កឱ្យមានការកកិតជាមួយប្រជាពលរដ្ឋជាច្រើន។ ជាពិសេស ក្រុមបះបោរកុម្មុយនិស្តដែលបានប្រឆាំងនឹងបារាំងតាំងពីយូរយារណាស់មកហើយ ឥឡូវនេះបានងាកមកផ្តោតលើការប៉ុនប៉ងផ្ដួលរំលំព្រះអង្គវិញ។
        
ស្ថានភាពមិនស្ថិតស្ថេរនេះកាន់តែស្មុគស្មាញដោយសារសង្គ្រាមដែលកំពុងកើតឡើងនៅក្រៅព្រំដែនកម្ពុជា។ នៅប្រទេសវៀតណាម ទាហានអាមេរិកជាច្រើនលាននាក់កំពុងជួយដល់ភាគខាងត្បូងដែលមិនមែនជាកុម្មុយនិស្តប្រឆាំងនឹងភាគខាងជើងកុម្មុយនិស្ត។ ខណៈដែលសហរដ្ឋអាមេរិកបានស្នើសុំការគាំទ្រពីកម្ពុជា ព្រះអង្គម្ចាស់សីហនុបានព្យាយាមរក្សាអព្យាក្រឹតភាព។ ប៉ុន្តែនៅឆ្នាំ ១៩៧០ ព្រះអង្គត្រូវបានផ្ដួលរំលំដោយនាយករដ្ឋមន្ត្រីរបស់ព្រះអង្គដែលអនុញ្ញាតឱ្យទាហានអាមេរិកទម្លាក់គ្រាប់បែកលើតំបន់មួយចំនួននៃប្រទេសកម្ពុជាក្នុងគោលបំណងវាយប្រហារអ្នកប្រយុទ្ធវៀតណាមខាងជើង។ ការវាយប្រហារទាំងនេះបានសម្លាប់ជនស៊ីវិលខ្មែររាប់ពាន់នាក់។ ដើម្បីដណ្តើមអំណាចមកវិញបន្ទាប់ពីត្រូវបានផ្ដួលរំលំ ព្រះអង្គម្ចាស់បានរួបរួមជាមួយនឹងសត្រូវនយោបាយរបស់ព្រះអង្គ។`
    },
    {
      heading: "របបថ្មីដ៏ឃោរឃៅ",
      body: `គណបក្សកុម្មុយនិស្តកម្ពុជា ដែលគេស្គាល់ថាជាខ្មែរក្រហម ត្រូវបានដឹកនាំដោយជនជាតិខ្មែរដែលស្រមៃចង់ធ្វើឱ្យប្រទេសរបស់ពួកគេក្លាយជាសង្គមគ្មានវណ្ណៈនៃកសិករដាំស្រូវ។ ពួកគេបានប្រឆាំងនឹងចក្រពត្តិនិយមលោកខាងលិចដែលជាមូលធននិយម ហើយបានស្វែងរកការដឹកនាំប្រទេសឆ្ពោះទៅរកការគ្រប់គ្រងខ្លួនឯង។ ប៉ុន្តែចំពោះសាធារណជន ពួកគេភាគច្រើនតំណាងឱ្យកម្លាំងប្រយុទ្ធប្រឆាំងនឹងរដ្ឋាភិបាលដែលគាំទ្រអាមេរិក។ ដោយខឹងសម្បារនឹងការទម្លាក់គ្រាប់បែកដ៏បំផ្លិចបំផ្លាញរបស់អាមេរិក និងត្រូវបានលើកទឹកចិត្តដោយការអំពាវនាវរបស់ព្រះអង្គម្ចាស់ឱ្យប្រដាប់អាវុធ ប្រជាជនខ្មែរជាច្រើនបានចូលរួមជាមួយខ្មែរក្រហម។
        
ទីបំផុត សង្គ្រាមស៊ីវិលពេញទំហឹងបានផ្ទុះឡើង។ ក្នុងរយៈពេលជាងប្រាំឆ្នាំនៃការប្រយុទ្ធ ប្រជាជនខ្មែរជាងកន្លះលាននាក់បានស្លាប់នៅក្នុងជម្លោះដ៏ឃោរឃៅនេះ។ ប៉ុន្តែអំពើហិង្សាមិនបានបញ្ចប់ទេនៅពេលដែលក្រុមបះបោរបានត្រួតត្រាទីក្រុងភ្នំពេញក្នុងខែមេសា ឆ្នាំ ១៩៧៥។ ពេលចូលកាន់កាប់រាជធានី ខ្មែរក្រហមបានប្រហារជីវិតអ្នកណាក៏ដោយដែលជាប់ពាក់ព័ន្ធជាមួយរដ្ឋាភិបាលមុន។ ព្រះបាទនរោត្តម សីហនុ នៅតែត្រូវបានដកហូតអំណាច ហើយត្រូវបានឃុំខ្លួនក្នុងផ្ទះ ហើយខ្មែរក្រហមក៏បានចាប់ផ្តើមជម្លៀសប្រជាជនក្នុងទីក្រុងទៅកាន់ជនបទ។ អ្នកដែលមិនអាចធ្វើដំណើរដោយថ្មើរជើងត្រូវបានគេបោះបង់ចោល ដែលធ្វើឱ្យក្រុមគ្រួសាររាប់មិនអស់ត្រូវបែកគ្នា។`
    },
    {
      heading: "ការដួលរលំ និងផលវិបាក",
      body: `នៅក្នុងរបបថ្មីនេះ ប្រជាពលរដ្ឋគ្រប់រូបត្រូវបានដកហូតទ្រព្យសម្បត្តិ និងត្រូវបានផ្តល់សម្លៀកបំពាក់ និងម៉ូដសក់ដូចគ្នា។ ទ្រព្យសម្បត្តិឯកជន លុយកាក់ និងសាសនាត្រូវបានហាមឃាត់។ កម្លាំងពលកម្មកសិកម្មថ្មីត្រូវបានគេរំពឹងថានឹងផលិតស្រូវក្នុងបរិមាណមិនអាចទៅរួច ហើយមេដឹកនាំមូលដ្ឋាននឹងត្រូវសម្លាប់ប្រសិនបើពួកគេមិនអាចបំពេញកូតាបាន។ មេដឹកនាំជាច្រើនបានផ្តល់អាទិភាពដល់ការបញ្ជាទិញទៅកាន់រាជធានីមុននឹងការផ្តល់អាហារដល់កម្មករ។ ដោយសារខ្វះអាហារហូបចុក ធ្វើការហួសកម្លាំង និងទទួលរងពីជំងឺគ្រុនចាញ់ និងកង្វះអាហារូបត្ថម្ភ មនុស្សរាប់ពាន់នាក់បានស្លាប់បាត់បង់ជីវិត។
        
សមាជិកខ្មែរក្រហមដែលអនុវត្តប្រព័ន្ធនេះក៏មិនមានសុវត្ថិភាពជាងនេះដែរ។ នៅពេលដែលផែនការរបស់ពួកគេបរាជ័យក្នុងការផលិតស្រូវតាមអត្រាដែលបានរំពឹងទុក ថ្នាក់ដឹកនាំខ្មែរក្រហមក៏មានភាពភ័យខ្លាច។ ពួកគេជឿថា សត្រូវផ្ទៃក្នុងកំពុងព្យាយាមបំផ្លាញបដិវត្តន៍ ហើយពួកគេក៏បានចាប់ខ្លួន និងប្រហារជីវិតអ្នកណាម្នាក់ដែលត្រូវបានគេយល់ថាជាការគំរាមកំហែង។ អំពើឃោរឃៅនេះបានបន្តជិតបួនឆ្នាំ។ ជាចុងក្រោយ នៅឆ្នាំ ១៩៧៩ កងទ័ពវៀតណាមដែលធ្វើការជាមួយសមាជិកខ្មែរក្រហមដែលបានបោះបង់ចោល បានចូលគ្រប់គ្រងប្រទេស។ ភាពចលាចលនយោបាយនេះបានបង្កឱ្យមានសង្គ្រាមស៊ីវិលមួយទៀតដែលមិនបានបញ្ចប់រហូតដល់ទសវត្សរ៍ឆ្នាំ ១៩៩០។`
    },
    {
      heading: "ស្វែងរកយុត្តិធម៌",
      body: `ក្នុងប៉ុន្មានឆ្នាំបន្ទាប់ មិនមានផ្លូវងាយស្រួលដើម្បីស្វែងរកយុត្តិធម៌សម្រាប់ជនរងគ្រោះ និងក្រុមគ្រួសាររបស់ពួកគេនោះទេ។ តុលាការកូនកាត់របស់អង្គការសហប្រជាជាតិ-កម្ពុជាត្រូវបានបង្កើតឡើងក្នុងឆ្នាំ ២០០៣ ប៉ុន្តែវាបានកាត់ទោសតែខ្មែរក្រហមដែលស្ថិតក្នុងមុខតំណែងជាថ្នាក់ដឹកនាំកំពូលបំផុតប៉ុណ្ណោះ។ សមាជិកខ្មែរក្រហមកម្រិតទាបក៏បានបង្ហាញខ្លួននៅក្នុងតុលាការផងដែរ ប៉ុន្តែពួកគេមិនត្រូវបានកាត់ទោសទេ។ ផ្ទុយទៅវិញ ពួកគេបានផ្តល់សក្ខីកម្ម និងផ្តល់នូវការយល់ដឹងអំពីប្រព័ន្ធដ៏ឃោរឃៅដែលបានធ្វើឱ្យបទឧក្រិដ្ឋរបស់អ្នកដឹកនាំរបស់ពួកគេអាចកើតឡើងបាន។ អ្នកប្រព្រឹត្តខ្លះថែមទាំងត្រូវបានទទួលស្គាល់តាមច្បាប់ថាជាជនរងគ្រោះផងដែរ ដោយសារពួកគេតែងតែភ័យខ្លាចចំពោះអាយុជីវិតរបស់ពួកគេ និងបានប្រព្រឹត្តអំពើហិង្សាជាមធ្យោបាយដើម្បីការពារខ្លួន។
        
ការយល់ឃើញរបស់សមាជិកខ្មែរក្រហមកម្រិតទាបថាជាជនរងគ្រោះ មិនមែនជាអ្នកប្រព្រឹត្តនោះបានពង្រីកហួសពីតុលាការទៅទៀត។ ដូចប្រជាជនខ្មែរដទៃទៀតដែរ សមាជិកខ្មែរក្រហមភាគច្រើនបានបាត់បង់ក្រុមគ្រួសារ ទទួលរងពីភាពអត់ឃ្លាន ត្រូវបានដកហូតផ្ទះសម្បែង និងទ្រព្យសម្បត្តិ និងធ្វើការហួសកម្លាំង។ ហើយភាពភ័យខ្លាចក្នុងចំណោមថ្នាក់ដឹកនាំខ្មែរក្រហមបាននាំឱ្យមានអត្រាប្រហារជីវិតខ្ពស់ជាងសម្រាប់សមាជិកខ្មែរក្រហមជាងប្រជាជនដែលជាជនជាតិភាគច្រើន។ គិតត្រឹមឆ្នាំ ២០២១ មានមនុស្សតែបីនាក់ប៉ុណ្ណោះដែលបានទទួលទោសជាប់ពន្ធនាគារ។ ជនរងគ្រោះជាច្រើនចង់ឱ្យតុលាការបន្តការកាត់ទោសបន្ថែមទៀតចំពោះមេដឹកនាំខ្មែរក្រហម។ ទោះជាយ៉ាងណាក៏ដោយ ការស្ទង់មតិថ្នាក់ជាតិក្នុងឆ្នាំ ២០១៨ បានបង្ហាញថាជនរងគ្រោះភាគច្រើនមានអារម្មណ៍ថា តុលាការបានរួមចំណែកដល់យុត្តិធម៌។`
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
              className="relative z-10 font-cabin underline decoration-dashed decoration-2 hard-word-underline cursor-pointer"
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

const Item6 = () => {
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
    window.speechSynthesis.cancel(); // Stop main reading
    setPlayingId(null); // Reset main button state
    setIsPaused(false);
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

  const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-audio-lines text-blue-500 w-6 h-6"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v12"/><path d="M22 10v3"/></svg>
  );

  const StopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stop-circle text-red-500 w-6 h-6"><circle cx="12" cy="12" r="10"/><path d="M9 9h6v6H9z"/></svg>
  );

  return (
    <div className="bg-gray-50 text-gray-800 p-4 min-h-screen">
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
          font-family: 'Nokora', serif;
        }
      `}</style>

      {/* Main content container with alternating sections */}
        <YoutubeEmbed embedId="8_TYFfkc_1U" className=' sm:rounded-bl-lg sm:rounded-br-lg rounded-none' />
      <div className="max-w-7xl mx-auto p-4 md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
        {/* English Title & Intro */}
        <div className="space-y-6 md:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-english-header-scaled font-bold text-center md:text-left">{englishContent.title}</h1>
            <button
              onClick={() => handleAudio('intro', englishContent.intro.replace(/\s+/g, ' '))}
              className="p-2 rounded-full transition-colors duration-200"
            >
              {(playingId === 'intro' && !isPaused) ? <StopIcon /> : <PlayIcon />}
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
                     {(playingId === index && !isPaused) ? <StopIcon /> : <PlayIcon />}
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

export default Item6;
