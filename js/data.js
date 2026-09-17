/* ============================================================
   Dinner menu data — transcribed from
   "Aditya's Lunch and Dinner Menu" by Team GFC (Lean Machine Program, Viren Barman)
   Source PDF: source/Aditya Lunch Dinner Menu.pdf

   Every recipe is 500 kcal (±10). Quantities are exactly as in the PDF.
   Each text field has `en` (English) and `hi` (Hindi) so the cook can read
   it in Hindi while Gautam reads English.

   Tags:  LC = low carb,  V = vegetarian,  M = protein can be swapped (see `mods`)
   ============================================================ */

window.MENU = {
  /* Default weekly rotation. Index 0 = Monday … 6 = Sunday.
     Gautam can change this from the Plan screen; the app stores the
     chosen plan in localStorage and can share it via a link. */
  defaultPlan: [
    "chicken-curry",       // Mon
    "basil-chicken",       // Tue
    "rajma-chawal",        // Wed
    "tikka-masala",        // Thu
    "sriracha-chicken",    // Fri
    "biryani",             // Sat
    "steamed-fish"         // Sun
  ],

  days: [
    { en: "Monday",    hi: "सोमवार",   short: { en: "Mon", hi: "सोम" } },
    { en: "Tuesday",   hi: "मंगलवार",  short: { en: "Tue", hi: "मंगल" } },
    { en: "Wednesday", hi: "बुधवार",   short: { en: "Wed", hi: "बुध" } },
    { en: "Thursday",  hi: "गुरुवार",  short: { en: "Thu", hi: "गुरु" } },
    { en: "Friday",    hi: "शुक्रवार", short: { en: "Fri", hi: "शुक्र" } },
    { en: "Saturday",  hi: "शनिवार",   short: { en: "Sat", hi: "शनि" } },
    { en: "Sunday",    hi: "रविवार",   short: { en: "Sun", hi: "रवि" } }
  ],

  recipes: [
    /* ---------------------------------------------------------- 1 */
    {
      id: "tomato-chicken",
      emoji: "🍅",
      name: { en: "Easy Tomato Chicken", hi: "टमाटर चिकन" },
      kcal: 500, macros: { c: 10, f: 16, p: 83 },
      tags: ["LC", "M"],
      ingredients: [
        { icon: "🍗", qty: { en: "360 g", hi: "360 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🧂", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🌶️", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Pepper", hi: "काली मिर्च" } },
        { icon: "🧄", qty: { en: "1 clove", hi: "1 कली" }, name: { en: "Garlic, grated", hi: "लहसुन, कद्दूकस किया" } },
        { icon: "🥫", qty: { en: "95 ml", hi: "95 मि.ली." }, name: { en: "Tomato puree", hi: "टमाटर प्यूरी" } },
        { icon: "🥛", qty: { en: "2½ tbsp", hi: "ढाई बड़े चम्मच" }, name: { en: "Milk", hi: "दूध" } },
        { icon: "🌿", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Basil leaves", hi: "बेसिल (तुलसी जैसे) पत्ते" } },
        { icon: "🫒", qty: { en: "7", hi: "7" }, name: { en: "Olives (optional)", hi: "ऑलिव (ज़रूरी नहीं)" }, optional: true }
      ],
      steps: [
        { en: "Heat a pan on medium. Add the chicken and cook about 5 min until it is white all the way through. If it sticks, add 1 tbsp water.",
          hi: "पैन को मध्यम आंच पर गरम करें। चिकन डालें और लगभग 5 मिनट पकाएँ, जब तक अंदर तक सफ़ेद न हो जाए। अगर चिपके तो 1 बड़ा चम्मच पानी डालें।" },
        { en: "Take the chicken out, but leave the liquid in the pan.",
          hi: "चिकन निकाल लें, लेकिन पैन में बचा पानी रहने दें।" },
        { en: "Add tomato puree, garlic, milk, salt and pepper. Cook until it becomes a thick paste and the oil separates.",
          hi: "टमाटर प्यूरी, लहसुन, दूध, नमक और काली मिर्च डालें। तब तक पकाएँ जब तक गाढ़ा पेस्ट बन जाए और तेल अलग दिखने लगे।" },
        { en: "Put the chicken back in with the basil leaves and coat well.",
          hi: "चिकन और बेसिल पत्ते वापस डालें और अच्छी तरह मिलाएँ।" },
        { en: "Top with chopped olives and serve.",
          hi: "ऊपर से कटे ऑलिव डालें और परोसें।" }
      ],
      mods: [
        "Replace chicken thigh with 110 g DRY soya chunks (C 61 / F 5 / P 60)",
        "or 475 g tofu (C 21 / F 25 / P 45)",
        "or 230 g tempeh (C 33 / F 20 / P 46)"
      ]
    },

    /* ---------------------------------------------------------- 2 */
    {
      id: "garlic-chicken-potatoes",
      emoji: "🥔",
      name: { en: "Easy Garlic Chicken Potatoes", hi: "लहसुन चिकन और आलू" },
      kcal: 500, macros: { c: 36, f: 9, p: 71 },
      tags: ["M"],
      ingredients: [
        { group: { en: "Grilled chicken", hi: "ग्रिल्ड चिकन" } },
        { icon: "🍗", qty: { en: "275 g", hi: "275 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🥣", qty: { en: "1 tbsp", hi: "1 बड़ा चम्मच" }, name: { en: "Yogurt", hi: "दही" } },
        { icon: "🧄", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Garlic powder", hi: "लहसुन पाउडर" } },
        { icon: "🧂", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🌶️", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Pepper", hi: "काली मिर्च" } },
        { group: { en: "Salad", hi: "सलाद" } },
        { icon: "🥬", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Rocket (arugula) leaves", hi: "रॉकेट पत्ते (अरुगुला)" } },
        { icon: "🥬", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Baby spinach", hi: "छोटी पालक" } },
        { icon: "🫗", qty: { en: "1½ tbsp", hi: "डेढ़ बड़ा चम्मच" }, name: { en: "Balsamic vinaigrette", hi: "बाल्समिक ड्रेसिंग" } },
        { group: { en: "Potatoes", hi: "आलू" } },
        { icon: "🥔", qty: { en: "250 g", hi: "250 ग्राम" }, name: { en: "Potatoes, boiled, peeled, salted (can be mashed or air-fried as fries)", hi: "आलू, उबले, छिले, नमक लगे (मैश कर सकते हैं या एयर फ्रायर में फ्राइज़ बना सकते हैं)" } }
      ],
      steps: [
        { en: "Mix the chicken with yogurt, garlic powder, salt and pepper. Marinate at least 1 hour, or overnight.",
          hi: "चिकन में दही, लहसुन पाउडर, नमक और काली मिर्च मिलाएँ। कम से कम 1 घंटा या रात भर मैरिनेट करें।" },
        { en: "Wash and mix the salad ingredients.",
          hi: "सलाद की सारी चीज़ें धोकर एक साथ मिला लें।" },
        { en: "Heat a steel pan on medium-high. Drop a little water: if the drop glides on the pan, it is ready. If it splashes, wait.",
          hi: "स्टील का पैन मध्यम-तेज़ आंच पर गरम करें। एक बूंद पानी डालें: अगर बूंद पैन पर फिसले तो पैन तैयार है। अगर छिटके तो थोड़ा और इंतज़ार करें।" },
        { en: "Add the chicken and sear 30 sec to 1 min. Lower heat to medium-low, cover and cook 8 min.",
          hi: "चिकन डालें और 30 सेकंड से 1 मिनट तक सेकें। आंच धीमी-मध्यम करें, ढककर 8 मिनट पकाएँ।" },
        { en: "Flip the chicken and cook another 5 min until the water dries and both sides are seared.",
          hi: "चिकन पलटें और 5 मिनट और पकाएँ, जब तक पानी सूख जाए और दोनों तरफ़ सुनहरा हो जाए।" },
        { en: "Serve with the boiled, salted potatoes and the salad.",
          hi: "उबले नमक वाले आलू और सलाद के साथ परोसें।" }
      ],
      mods: [
        "Replace potatoes with 135 g more chicken thigh to make it low carb (C 5 / F 13 / P 93)",
        "or 200 g sweet potato (C 40 / F 9 / P 67)",
        "or 40 g DRY flour for roti (C 35 / F 9 / P 68)"
      ]
    },

    /* ---------------------------------------------------------- 3 */
    {
      id: "yogurt-potato-salad",
      emoji: "🥗",
      name: { en: "Easy Yogurt Potato Salad", hi: "दही आलू चिकन सलाद" },
      kcal: 500, macros: { c: 38, f: 9, p: 70 },
      tags: ["M"],
      ingredients: [
        { icon: "🍗", qty: { en: "260 g", hi: "260 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🧂", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🌶️", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Pepper", hi: "काली मिर्च" } },
        { icon: "🥔", qty: { en: "260 g", hi: "260 ग्राम" }, name: { en: "Potatoes, boiled, peeled, chopped", hi: "आलू, उबले, छिले, कटे हुए" } },
        { icon: "🥬", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Lettuce", hi: "लेट्यूस (सलाद पत्ता)" } },
        { icon: "🥬", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Baby spinach", hi: "छोटी पालक" } },
        { icon: "🥣", qty: { en: "50 g", hi: "50 ग्राम" }, name: { en: "Yogurt", hi: "दही" } },
        { icon: "🧄", qty: { en: "1 clove", hi: "1 कली" }, name: { en: "Garlic, grated", hi: "लहसुन, कद्दूकस किया" } }
      ],
      steps: [
        { en: "Heat a steel pan on high. Once hot, add the chicken and turn the heat to low. Add salt and pepper.",
          hi: "स्टील का पैन तेज़ आंच पर गरम करें। गरम होने पर चिकन डालें और आंच धीमी कर दें। नमक और काली मिर्च डालें।" },
        { en: "Cook the chicken 10–12 min until cooked all the way through.",
          hi: "चिकन को 10–12 मिनट पकाएँ, जब तक अंदर तक पक जाए।" },
        { en: "Meanwhile wash and dry the leaves. Put them in a bowl with the yogurt and garlic. Mix well.",
          hi: "इस बीच पत्ते धोकर सुखा लें। एक बाउल में पत्ते, दही और लहसुन डालकर अच्छी तरह मिलाएँ।" },
        { en: "Add the cooked chicken and mix well.",
          hi: "पका हुआ चिकन डालें और मिलाएँ।" },
        { en: "Gently fold in the potatoes. Taste, adjust salt, and serve.",
          hi: "आलू हल्के हाथ से मिलाएँ। चखकर नमक ठीक करें और परोसें।" }
      ],
      mods: [
        "Replace chicken with 170 g tempeh (C 56 / F 13 / P 43)",
        "or 85 g paneer (C 38 / F 25 / P 30)",
        "or 82 g soya chunks (C 64 / F 1 / P 55)"
      ]
    },

    /* ---------------------------------------------------------- 4 */
    {
      id: "tikka-masala",
      emoji: "🍛",
      name: { en: "Chicken Tikka Masala", hi: "चिकन टिक्का मसाला" },
      kcal: 500, macros: { c: 54, f: 10, p: 52 },
      tags: ["M"],
      ingredients: [
        { icon: "🍗", qty: { en: "200 g", hi: "200 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🍋", qty: { en: "1", hi: "1" }, name: { en: "Lemon, juiced", hi: "नींबू का रस" } },
        { icon: "🌶️", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Paprika", hi: "पैपरिका (कश्मीरी लाल मिर्च पाउडर)" } },
        { icon: "🧅", qty: { en: "½", hi: "आधा" }, name: { en: "Red onion, diced", hi: "लाल प्याज़, बारीक कटा" } },
        { icon: "🧄", qty: { en: "2 cloves", hi: "2 कली" }, name: { en: "Garlic, roughly chopped", hi: "लहसुन, मोटा कटा" } },
        { icon: "🫚", qty: { en: "1 tbsp", hi: "1 बड़ा चम्मच" }, name: { en: "Ginger, grated", hi: "अदरक, कद्दूकस किया" } },
        { icon: "🌶️", qty: { en: "1", hi: "1" }, name: { en: "Red chilli, de-seeded, chopped", hi: "लाल मिर्च, बीज निकालकर कटी" } },
        { icon: "🥫", qty: { en: "1 tbsp", hi: "1 बड़ा चम्मच" }, name: { en: "Tomato puree", hi: "टमाटर प्यूरी" } },
        { icon: "🍅", qty: { en: "1", hi: "1" }, name: { en: "Tomato", hi: "टमाटर" } },
        { icon: "🧈", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ghee", hi: "घी" } },
        { icon: "🌰", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Garam masala", hi: "गरम मसाला" } },
        { icon: "🟡", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Turmeric", hi: "हल्दी" } },
        { icon: "🥣", qty: { en: "1 tbsp", hi: "1 बड़ा चम्मच" }, name: { en: "Yogurt", hi: "दही" } },
        { icon: "🧂", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🌿", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Coriander", hi: "हरा धनिया" } },
        { icon: "🫑", qty: { en: "½", hi: "आधी" }, name: { en: "Bell pepper", hi: "शिमला मिर्च" } },
        { icon: "🍚", qty: { en: "140 g", hi: "140 ग्राम" }, name: { en: "Boiled rice (cooked weight)", hi: "पके हुए चावल (पकने के बाद का वज़न)" } }
      ],
      steps: [
        { en: "Put the chicken in a bowl with the lemon juice and paprika. Stir so it is well coated.",
          hi: "चिकन को बाउल में डालें, नींबू का रस और पैपरिका मिलाएँ। अच्छी तरह लपेट दें।" },
        { en: "Heat ghee in a pan on medium-high. Add the onion (and a pinch of cumin) and cook until translucent.",
          hi: "पैन में घी मध्यम-तेज़ आंच पर गरम करें। प्याज़ (और थोड़ा जीरा) डालें, हल्का पारदर्शी होने तक भूनें।" },
        { en: "Add tomato puree, tomato and the spices (garam masala, turmeric, ginger, garlic, chilli, salt). Cook 5 min. Add 1 tbsp water if it dries out.",
          hi: "टमाटर प्यूरी, टमाटर और मसाले (गरम मसाला, हल्दी, अदरक, लहसुन, मिर्च, नमक) डालें। 5 मिनट पकाएँ। सूखने लगे तो 1 बड़ा चम्मच पानी डालें।" },
        { en: "Pour the mixture out of the pan and let it cool.",
          hi: "मिश्रण पैन से निकालकर ठंडा होने दें।" },
        { en: "In the same pan, cook the chicken with the bell pepper 8–10 min until almost (not fully) cooked. Set aside.",
          hi: "उसी पैन में चिकन और शिमला मिर्च 8–10 मिनट पकाएँ, लगभग पका हुआ (पूरा नहीं)। अलग रख दें।" },
        { en: "Blend the cooled spice mixture with the cold yogurt (add a couple of ice cubes if still hot).",
          hi: "ठंडे मसाले के मिश्रण को ठंडे दही के साथ मिक्सी में पीस लें (गरम हो तो 2 बर्फ़ के टुकड़े डालें)।" },
        { en: "Return the blended mixture to the pan and cook a couple of minutes to the texture you like.",
          hi: "पिसा मिश्रण पैन में वापस डालें और 2 मिनट पकाएँ, जब तक मनचाही गाढ़ाई आ जाए।" },
        { en: "Add the chicken, mix well and simmer a couple of minutes on low.",
          hi: "चिकन डालें, अच्छी तरह मिलाएँ और धीमी आंच पर 2 मिनट पकाएँ।" },
        { en: "Take off the heat, stir in coriander and serve with the rice.",
          hi: "आंच से उतारें, हरा धनिया मिलाएँ और चावल के साथ परोसें।" }
      ],
      mods: [
        "Replace chicken thigh with 60 g DRY soya chunks (C 81 / F 4 / P 39)",
        "or 275 g firm tofu (C 60 / F 16 / P 32)",
        "or 130 g tempeh (C 67 / F 13 / P 32)"
      ]
    },

    /* ---------------------------------------------------------- 5 */
    {
      id: "pad-thai",
      emoji: "🍜",
      name: { en: "Pad Thai Chicken", hi: "पैड थाई चिकन नूडल्स" },
      kcal: 500, macros: { c: 42, f: 13, p: 58 },
      tags: ["M"],
      ingredients: [
        { icon: "🍗", qty: { en: "240 g", hi: "240 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🫗", qty: { en: "1¼ tsp", hi: "सवा छोटा चम्मच" }, name: { en: "Soy sauce", hi: "सोया सॉस" } },
        { icon: "🧄", qty: { en: "1¼ tsp", hi: "सवा छोटा चम्मच" }, name: { en: "Garlic powder", hi: "लहसुन पाउडर" } },
        { icon: "🌶️", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Black pepper", hi: "काली मिर्च" } },
        { icon: "🧈", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ghee", hi: "घी" } },
        { icon: "🧄", qty: { en: "1 clove", hi: "1 कली" }, name: { en: "Garlic", hi: "लहसुन" } },
        { icon: "🧅", qty: { en: "½", hi: "आधा" }, name: { en: "Shallot or onion, chopped", hi: "छोटा प्याज़, कटा" } },
        { icon: "🌱", qty: { en: "1", hi: "1" }, name: { en: "Green onion (spring onion)", hi: "हरा प्याज़" } },
        { icon: "🥜", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Crushed peanuts", hi: "कुटी मूंगफली" } },
        { icon: "🌿", qty: { en: "Bunch", hi: "एक गुच्छा" }, name: { en: "Basil leaves", hi: "बेसिल पत्ते" } },
        { icon: "🍜", qty: { en: "50 g", hi: "50 ग्राम" }, name: { en: "DRY pad thai rice noodles (soak/boil as per packet)", hi: "कच्चे पैड थाई चावल नूडल्स (पैकेट के अनुसार भिगोकर/उबालकर)" } },
        { group: { en: "Sauce", hi: "सॉस" } },
        { icon: "🫗", qty: { en: "1¼ tsp", hi: "सवा छोटा चम्मच" }, name: { en: "Soy sauce (light or dark)", hi: "सोया सॉस" } },
        { icon: "🟤", qty: { en: "1¼ tsp", hi: "सवा छोटा चम्मच" }, name: { en: "Tamarind puree or ketchup", hi: "इमली का पेस्ट या केचप" } },
        { icon: "🐟", qty: { en: "1¼ tsp", hi: "सवा छोटा चम्मच" }, name: { en: "Fish sauce", hi: "फिश सॉस" } },
        { icon: "🍋", qty: { en: "½", hi: "आधा" }, name: { en: "Lemon, juiced", hi: "नींबू का रस" } },
        { icon: "💧", qty: { en: "1¼ tbsp", hi: "सवा बड़ा चम्मच" }, name: { en: "Water", hi: "पानी" } },
        { icon: "🟫", qty: { en: "1 tsp", hi: "1 छोटा चम्मच" }, name: { en: "Brown sugar (or sugar-free)", hi: "ब्राउन शुगर (या शुगर-फ्री)" } }
      ],
      steps: [
        { en: "Mix all the sauce ingredients in a bowl.",
          hi: "सॉस की सारी चीज़ें एक बाउल में मिला लें।" },
        { en: "Heat a pan on high. Coat with a little oil and drain the excess (keep it aside).",
          hi: "पैन तेज़ आंच पर गरम करें। थोड़ा तेल लगाएँ और बचा तेल निकालकर अलग रख लें।" },
        { en: "Season the chicken with soy sauce, garlic powder and pepper. Stir-fry 5 min until golden brown. Set aside.",
          hi: "चिकन में सोया सॉस, लहसुन पाउडर और काली मिर्च मिलाएँ। 5 मिनट तेज़ आंच पर सुनहरा होने तक भूनें। अलग रखें।" },
        { en: "Add back the drained oil, garlic, shallot and green onion. Cook 30 seconds.",
          hi: "निकाला हुआ तेल, लहसुन, प्याज़ और हरा प्याज़ डालें। 30 सेकंड भूनें।" },
        { en: "Add the rice noodles and the sauce. Mix well, then add the chicken.",
          hi: "नूडल्स और सॉस डालें। अच्छी तरह मिलाएँ, फिर चिकन डालें।" },
        { en: "Top with crushed peanuts, a dash of lemon and basil leaves. Serve.",
          hi: "ऊपर से कुटी मूंगफली, थोड़ा नींबू और बेसिल पत्ते डालकर परोसें।" }
      ],
      mods: [
        "Replace chicken thigh with 80 g DRY soya chunks (C 76 / F 5 / P 45)",
        "or 340 g tofu (C 47 / F 20 / P 34)",
        "or 165 g tempeh (C 56 / F 16 / P 35)"
      ]
    },

    /* ---------------------------------------------------------- 6 */
    {
      id: "tomato-chicken-pasta",
      emoji: "🍝",
      name: { en: "Tomato Chicken Pasta / Rice", hi: "टमाटर चिकन पास्ता / चावल" },
      kcal: 500, macros: { c: 53, f: 12, p: 50 },
      tags: ["M"],
      ingredients: [
        { icon: "🍗", qty: { en: "180 g", hi: "180 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🍝", qty: { en: "50 g", hi: "50 ग्राम" }, name: { en: "DRY pasta (or 130 g boiled rice)", hi: "कच्चा पास्ता (या 130 ग्राम पके चावल)" } },
        { icon: "🧂", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🌶️", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Pepper", hi: "काली मिर्च" } },
        { icon: "🍅", qty: { en: "1 large", hi: "1 बड़ा" }, name: { en: "Tomato, chopped", hi: "टमाटर, कटा" } },
        { icon: "🧄", qty: { en: "1 clove", hi: "1 कली" }, name: { en: "Garlic, chopped", hi: "लहसुन, कटा" } },
        { icon: "🌶️", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Chilli powder (optional)", hi: "लाल मिर्च पाउडर (ज़रूरी नहीं)" }, optional: true },
        { icon: "🥫", qty: { en: "120 ml", hi: "120 मि.ली." }, name: { en: "Tomato puree", hi: "टमाटर प्यूरी" } },
        { icon: "🥛", qty: { en: "2 tbsp", hi: "2 बड़े चम्मच" }, name: { en: "Milk", hi: "दूध" } },
        { icon: "🌿", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Basil", hi: "बेसिल पत्ते" } },
        { icon: "🌿", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Oregano (optional)", hi: "ओरेगानो (ज़रूरी नहीं)" }, optional: true },
        { icon: "🫒", qty: { en: "7", hi: "7" }, name: { en: "Olives (optional)", hi: "ऑलिव (ज़रूरी नहीं)" }, optional: true }
      ],
      steps: [
        { en: "Boil the pasta as per packet. Keep 1 tbsp of the pasta water.",
          hi: "पास्ता पैकेट के अनुसार उबाल लें। 1 बड़ा चम्मच पास्ता का पानी बचा कर रखें।" },
        { en: "Heat a pan on medium. Add the chicken and cook about 8 min until cooked through. Add 1 tbsp water if it sticks.",
          hi: "पैन मध्यम आंच पर गरम करें। चिकन डालें और लगभग 8 मिनट पकाएँ, जब तक अंदर तक पक जाए। चिपके तो 1 बड़ा चम्मच पानी डालें।" },
        { en: "Take the chicken out but leave the liquid in the pan.",
          hi: "चिकन निकाल लें, पैन का पानी रहने दें।" },
        { en: "Add tomato puree, chopped tomato, garlic, milk, salt, pepper (and chilli powder). Cook until it reduces to a paste.",
          hi: "टमाटर प्यूरी, कटा टमाटर, लहसुन, दूध, नमक, काली मिर्च (और लाल मिर्च) डालें। गाढ़ा पेस्ट बनने तक पकाएँ।" },
        { en: "Put the chicken back in with the basil and coat well.",
          hi: "चिकन और बेसिल वापस डालें, अच्छी तरह मिलाएँ।" },
        { en: "Add the pasta with 1 tbsp pasta water and mix until everything blends together.",
          hi: "पास्ता और 1 बड़ा चम्मच पास्ता का पानी डालें, सब कुछ अच्छी तरह मिलाएँ।" },
        { en: "Top with chopped olives and serve.",
          hi: "ऊपर कटे ऑलिव डालें और परोसें।" }
      ],
      mods: [
        "Replace chicken thigh with 55 g DRY soya chunks (C 78 / F 7 / P 38)",
        "or 250 g tofu (C 59 / F 18 / P 32)",
        "or 120 g tempeh (C 65 / F 15 / P 33)"
      ]
    },

    /* ---------------------------------------------------------- 7 */
    {
      id: "chicken-dosa",
      emoji: "🫓",
      name: { en: "Chicken Dosa", hi: "चिकन डोसा" },
      kcal: 510, macros: { c: 53, f: 10, p: 58 },
      tags: [],
      ingredients: [
        { icon: "🍗", qty: { en: "225 g", hi: "225 ग्राम" }, name: { en: "Minced chicken (or 185 g minced mutton)", hi: "चिकन कीमा (या 185 ग्राम मटन कीमा)" } },
        { icon: "🍃", qty: { en: "5", hi: "5" }, name: { en: "Curry leaves", hi: "करी पत्ता" } },
        { icon: "🧅", qty: { en: "½", hi: "आधा" }, name: { en: "Onion, finely chopped", hi: "प्याज़, बारीक कटा" } },
        { icon: "🌾", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Cumin seeds", hi: "जीरा" } },
        { icon: "🫚", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ginger-garlic paste", hi: "अदरक-लहसुन पेस्ट" } },
        { icon: "🌶️", qty: { en: "½", hi: "आधी" }, name: { en: "Green chilli, slit", hi: "हरी मिर्च, चीरा लगाई" } },
        { icon: "🌶️", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Black pepper powder", hi: "काली मिर्च पाउडर" } },
        { icon: "🌶️", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Red chilli powder", hi: "लाल मिर्च पाउडर" } },
        { icon: "🟡", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Turmeric powder", hi: "हल्दी" } },
        { icon: "🌰", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Garam masala", hi: "गरम मसाला" } },
        { icon: "🌿", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Coriander leaves", hi: "हरा धनिया" } },
        { icon: "🥫", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Tomato puree", hi: "टमाटर प्यूरी" } },
        { icon: "🧈", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ghee", hi: "घी" } },
        { icon: "🧂", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🥣", qty: { en: "65 g", hi: "65 ग्राम" }, name: { en: "Dosa batter (thin it with water to make more dosas)", hi: "डोसा बैटर (पानी मिलाकर पतला करें, ज़्यादा डोसे बनेंगे)" } }
      ],
      steps: [
        { en: "Stuffing: heat ghee in a pan. Sauté curry leaves, onion and green chilli about 5 min until the onion turns brown.",
          hi: "भरावन: पैन में घी गरम करें। करी पत्ता, प्याज़ और हरी मिर्च लगभग 5 मिनट भूनें, जब तक प्याज़ भूरा हो जाए।" },
        { en: "Add ginger-garlic paste and tomato puree. Cook 2 more minutes.",
          hi: "अदरक-लहसुन पेस्ट और टमाटर प्यूरी डालें। 2 मिनट और पकाएँ।" },
        { en: "Add all the masalas, coriander leaves, salt and the chicken mince. Cook about 15 min until the mince is dry.",
          hi: "सारे मसाले, हरा धनिया, नमक और चिकन कीमा डालें। लगभग 15 मिनट पकाएँ, जब तक कीमा सूख जाए।" },
        { en: "Move the stuffing to a bowl and keep aside.",
          hi: "भरावन बाउल में निकालकर अलग रखें।" },
        { en: "Dosa: heat a tawa. Pour a ladle of thin batter and spread in a circle.",
          hi: "डोसा: तवा गरम करें। एक कलछी पतला बैटर डालें और गोल फैलाएँ।" },
        { en: "Spread the chicken mix on top and add a little ghee.",
          hi: "ऊपर चिकन का भरावन फैलाएँ और थोड़ा घी डालें।" },
        { en: "Cover and cook 4–5 min until crisp. Serve hot.",
          hi: "ढककर 4–5 मिनट पकाएँ, जब तक कुरकुरा हो जाए। गरम परोसें।" }
      ],
      mods: []
    },

    /* ---------------------------------------------------------- 8 */
    {
      id: "chicken-curry",
      emoji: "🍲",
      name: { en: "Chicken Curry", hi: "चिकन करी" },
      kcal: 500, macros: { c: 54, f: 9, p: 53 },
      tags: ["M"],
      ingredients: [
        { icon: "🧈", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ghee", hi: "घी" } },
        { icon: "🧅", qty: { en: "1", hi: "1" }, name: { en: "Onion, sliced", hi: "प्याज़, लंबा कटा" } },
        { icon: "🧄", qty: { en: "2 cloves", hi: "2 कली" }, name: { en: "Garlic, finely chopped", hi: "लहसुन, बारीक कटा" } },
        { icon: "🫚", qty: { en: "3 cm", hi: "3 सेमी" }, name: { en: "Fresh ginger, finely chopped", hi: "अदरक, बारीक कटा" } },
        { icon: "🍅", qty: { en: "1 large", hi: "1 बड़ा" }, name: { en: "Tomato, chopped and pureed", hi: "टमाटर, काटकर पीसा हुआ" } },
        { icon: "🍗", qty: { en: "215 g", hi: "215 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🌰", qty: { en: "1 tbsp", hi: "1 बड़ा चम्मच" }, name: { en: "Curry powder", hi: "करी पाउडर" } },
        { icon: "🌶️", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Chilli powder", hi: "लाल मिर्च पाउडर" } },
        { icon: "💧", qty: { en: "125 ml", hi: "125 मि.ली." }, name: { en: "Chicken stock or water", hi: "चिकन स्टॉक या पानी" } },
        { icon: "🌿", qty: { en: "Some", hi: "थोड़ा" }, name: { en: "Coriander leaves, to finish", hi: "हरा धनिया, ऊपर डालने के लिए" } },
        { icon: "🍚", qty: { en: "160 g", hi: "160 ग्राम" }, name: { en: "Boiled rice (cooked weight)", hi: "पके हुए चावल (पकने के बाद का वज़न)" } }
      ],
      steps: [
        { en: "Melt the ghee in a large pan on medium-high. Add the onions and cook until soft.",
          hi: "बड़े पैन में घी मध्यम-तेज़ आंच पर गरम करें। प्याज़ डालें और नरम होने तक भूनें।" },
        { en: "Add the pureed tomato. Cook until it turns darker.",
          hi: "पिसा टमाटर डालें। रंग गहरा होने तक पकाएँ।" },
        { en: "Lower the heat. Add garlic, ginger, curry powder and chilli powder. Fry 1 min, stirring all the time.",
          hi: "आंच धीमी करें। लहसुन, अदरक, करी पाउडर और लाल मिर्च डालें। लगातार चलाते हुए 1 मिनट भूनें।" },
        { en: "Add all the chicken and fry 3 min.",
          hi: "सारा चिकन डालें और 3 मिनट भूनें।" },
        { en: "Add the stock/water, raise the heat and bring to a boil, stirring often.",
          hi: "स्टॉक/पानी डालें, आंच तेज़ करें और चलाते हुए उबाल आने दें।" },
        { en: "Lower to a simmer and cook 10 min.",
          hi: "आंच धीमी करें और 10 मिनट पकाएँ।" },
        { en: "Cut a big piece of chicken to check: it should be white inside with no pink.",
          hi: "एक बड़ा टुकड़ा काटकर देखें: अंदर पूरा सफ़ेद होना चाहिए, गुलाबी नहीं।" },
        { en: "Stir in coriander leaves and serve with the rice.",
          hi: "हरा धनिया मिलाएँ और चावल के साथ परोसें।" }
      ],
      mods: [
        "Replace chicken thigh with 65 g DRY soya chunks (C 84 / F 3 / P 39)",
        "or 300 g tofu (C 61 / F 16 / P 32)",
        "or 140 g tempeh (C 68 / F 12 / P 32)",
        "or 300 g prawns (C 54 / F 4 / P 65)"
      ]
    },

    /* ---------------------------------------------------------- 9 */
    {
      id: "basil-chicken",
      emoji: "🌿",
      name: { en: "Basil Chicken", hi: "बेसिल चिकन (थाई स्टाइल)" },
      kcal: 505, macros: { c: 12, f: 12, p: 90 },
      tags: ["LC", "M"],
      ingredients: [
        { icon: "🧄", qty: { en: "1 clove", hi: "1 कली" }, name: { en: "Garlic, peeled and grated", hi: "लहसुन, कद्दूकस किया" } },
        { icon: "🌶️", qty: { en: "1", hi: "1" }, name: { en: "Red chilli", hi: "लाल मिर्च" } },
        { icon: "🌿", qty: { en: "10", hi: "10" }, name: { en: "Basil leaves", hi: "बेसिल पत्ते" } },
        { icon: "🍗", qty: { en: "390 g", hi: "390 ग्राम" }, name: { en: "Chicken thigh (boneless)", hi: "बोनलेस चिकन थाई" } },
        { icon: "🥬", qty: { en: "100 g", hi: "100 ग्राम" }, name: { en: "Bok choy, chopped", hi: "बोक चॉय (चाइनीज़ पत्ता गोभी), कटी" } },
        { group: { en: "Thai basil sauce", hi: "थाई बेसिल सॉस" } },
        { icon: "🫗", qty: { en: "1½ tbsp", hi: "डेढ़ बड़ा चम्मच" }, name: { en: "Coconut aminos (or soy sauce)", hi: "कोकोनट अमीनो (या सोया सॉस)" } },
        { icon: "🐟", qty: { en: "1 tsp", hi: "1 छोटा चम्मच" }, name: { en: "Fish sauce", hi: "फिश सॉस" } },
        { icon: "🦪", qty: { en: "1 tbsp", hi: "1 बड़ा चम्मच" }, name: { en: "Oyster sauce", hi: "ऑयस्टर सॉस" } },
        { icon: "🟫", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Brown sugar", hi: "ब्राउन शुगर" } }
      ],
      steps: [
        { en: "Mix the sauce ingredients in a small bowl.",
          hi: "सॉस की चीज़ें एक छोटे बाउल में मिला लें।" },
        { en: "Heat a steel pan on medium-high. Drop a little water: if it glides on the pan, it is ready. If it splashes, wait.",
          hi: "स्टील का पैन मध्यम-तेज़ आंच पर गरम करें। पानी की बूंद डालें: फिसले तो तैयार है, छिटके तो इंतज़ार करें।" },
        { en: "Add the chicken and lower the heat to medium-low so it sears. Cook 5 min.",
          hi: "चिकन डालें और आंच धीमी-मध्यम करें ताकि सिके। 5 मिनट पकाएँ।" },
        { en: "Add garlic, chilli and the sauce. Stir-fry well for another 5 min.",
          hi: "लहसुन, मिर्च और सॉस डालें। 5 मिनट और अच्छी तरह भूनें।" },
        { en: "Add the bok choy and basil, stir-fry 1 min on high heat. Take off the heat and serve.",
          hi: "बोक चॉय और बेसिल डालें, तेज़ आंच पर 1 मिनट भूनें। आंच से उतारकर परोसें।" }
      ],
      mods: [
        "Replace chicken thigh with 120 g DRY soya chunks (C 67 / F 1 / P 66)",
        "or 250 g tempeh (C 37 / F 17 / P 51)",
        "Carb version: replace 150 g chicken thigh with 130 g boiled rice (C 54 / F 8 / P 60)"
      ]
    },

    /* ---------------------------------------------------------- 10 */
    {
      id: "sriracha-chicken",
      emoji: "🔥",
      name: { en: "Sriracha Chicken", hi: "श्रीराचा चिकन" },
      kcal: 495, macros: { c: 13, f: 12, p: 87 },
      tags: ["LC", "M"],
      ingredients: [
        { icon: "🍗", qty: { en: "380 g", hi: "380 ग्राम" }, name: { en: "Chicken thigh, cut into pieces", hi: "बोनलेस चिकन थाई, टुकड़ों में कटा" } },
        { icon: "🌶️", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ground black pepper", hi: "काली मिर्च पाउडर" } },
        { icon: "🧄", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Garlic powder", hi: "लहसुन पाउडर" } },
        { icon: "🧂", qty: { en: "To taste", hi: "स्वाद अनुसार" }, name: { en: "Salt", hi: "नमक" } },
        { group: { en: "Sriracha honey sauce", hi: "श्रीराचा शहद सॉस" } },
        { icon: "🍯", qty: { en: "1¼ tsp", hi: "सवा छोटा चम्मच" }, name: { en: "Honey", hi: "शहद" } },
        { icon: "🌶️", qty: { en: "1½ tbsp", hi: "डेढ़ बड़ा चम्मच" }, name: { en: "Sriracha sauce", hi: "श्रीराचा सॉस" } },
        { icon: "🍋", qty: { en: "½", hi: "आधा" }, name: { en: "Lemon, juiced", hi: "नींबू का रस" } },
        { icon: "🫗", qty: { en: "1¼ tbsp", hi: "सवा बड़ा चम्मच" }, name: { en: "Soy sauce", hi: "सोया सॉस" } },
        { icon: "🧂", qty: { en: "To taste", hi: "स्वाद अनुसार" }, name: { en: "Salt", hi: "नमक" } },
        { group: { en: "Optional", hi: "ज़रूरी नहीं" } },
        { icon: "🥦", qty: { en: "100 g", hi: "100 ग्राम" }, name: { en: "Stir-fried greens: asparagus, long beans, rocket, or any greens", hi: "भुनी हरी सब्ज़ी: हरी बीन्स, रॉकेट पत्ते, या कोई भी हरी सब्ज़ी" }, optional: true }
      ],
      steps: [
        { en: "Season the chicken on both sides with salt, pepper and garlic powder.",
          hi: "चिकन के दोनों तरफ़ नमक, काली मिर्च और लहसुन पाउडर लगाएँ।" },
        { en: "AIR FRYER: 200°C (400°F) for 10 min. Flip, then 10 more min.",
          hi: "एयर फ्रायर: 200°C पर 10 मिनट। पलटें, फिर 10 मिनट और।" },
        { en: "OR PAN: nonstick pan on medium-high. Cook one side 4–5 min until seared. Flip and cook 4 min more. Cut a piece to check it is white inside.",
          hi: "या पैन: नॉन-स्टिक पैन मध्यम-तेज़ आंच पर। एक तरफ़ 4–5 मिनट सुनहरा होने तक पकाएँ। पलटें और 4 मिनट और पकाएँ। एक टुकड़ा काटकर देखें कि अंदर सफ़ेद है।" },
        { en: "Meanwhile mix all the sauce ingredients.",
          hi: "इस बीच सॉस की सारी चीज़ें मिला लें।" },
        { en: "Put the chicken in a bowl, add the sauce, mix well and serve (with the greens if using).",
          hi: "चिकन बाउल में डालें, सॉस डालें, अच्छी तरह मिलाएँ और परोसें (हरी सब्ज़ी हो तो साथ में)।" }
      ],
      mods: [
        "Replace chicken thigh with 120 g DRY soya chunks (C 68 / F 1 / P 65)",
        "or 250 g tempeh (C 38 / F 17 / P 50)",
        "Carb version: replace 120 g chicken thigh with 120 g boiled rice (C 48 / F 8 / P 63)"
      ]
    },

    /* ---------------------------------------------------------- 11 */
    {
      id: "steamed-fish",
      emoji: "🐟",
      name: { en: "Chinese Steamed Fish", hi: "चाइनीज़ स्टीम्ड मछली" },
      kcal: 500, macros: { c: 0, f: 17, p: 85 },
      tags: ["LC"],
      ingredients: [
        { icon: "🐟", qty: { en: "370 g", hi: "370 ग्राम" }, name: { en: "White fish fillets, boneless & skinless, about 1 inch thick", hi: "सफ़ेद मछली फ़िले, बिना हड्डी और छिलका, लगभग 1 इंच मोटी" } },
        { icon: "🧂", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Coarse sea salt", hi: "मोटा नमक" } },
        { icon: "🫗", qty: { en: "1 tbsp", hi: "1 बड़ा चम्मच" }, name: { en: "Coconut aminos or soy sauce", hi: "कोकोनट अमीनो या सोया सॉस" } },
        { icon: "🫙", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Toasted sesame oil", hi: "तिल का तेल" } },
        { icon: "🫚", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Ginger, finely chopped", hi: "अदरक, बारीक कटा" } },
        { icon: "🌱", qty: { en: "1½", hi: "डेढ़" }, name: { en: "Scallions (spring onions), chopped", hi: "हरा प्याज़, कटा" } },
        { icon: "🌶️", qty: { en: "1", hi: "1" }, name: { en: "Red chilli, seeds removed, finely chopped", hi: "लाल मिर्च, बीज निकालकर बारीक कटी" } },
        { icon: "🧈", qty: { en: "1¼ tsp", hi: "सवा छोटा चम्मच" }, name: { en: "Butter", hi: "मक्खन" } },
        { icon: "📄", qty: { en: "2 sheets", hi: "2 शीट" }, name: { en: "Parchment (butter) paper", hi: "बटर पेपर" } }
      ],
      steps: [
        { en: "Cut the fish into 2 equal pieces. Pat dry with a paper towel.",
          hi: "मछली को 2 बराबर टुकड़ों में काटें। टिशू से थपथपाकर सुखाएँ।" },
        { en: "Fold a parchment sheet in half. Put one fish piece in the centre, close to the fold. Repeat for the second piece.",
          hi: "बटर पेपर बीच से मोड़ें। एक मछली का टुकड़ा बीच में, मोड़ के पास रखें। दूसरे टुकड़े के लिए भी ऐसा करें।" },
        { en: "Season each piece with the salt, coconut aminos/soy sauce and sesame oil.",
          hi: "हर टुकड़े पर नमक, सोया सॉस और तिल का तेल डालें।" },
        { en: "Fold the paper over the fish. Make small overlapping folds along the edge to seal it into a half-moon pouch. Twist the end tip to close tight.",
          hi: "पेपर मछली के ऊपर मोड़ें। किनारे पर छोटी-छोटी तह लगाते हुए आधे चाँद जैसा पैकेट बंद करें। सिरे को घुमाकर कसकर बंद करें।" },
        { en: "AIR FRYER: put 1 pouch in the basket, press it down lightly. Air fry at 150°C (300°F) for 15 min until the fish is soft and flaky. If a skewer does not go in easily, cook 5 more min. Thinner fish: 5 min less.",
          hi: "एयर फ्रायर: 1 पैकेट बास्केट में रखें, हल्के से दबाएँ। 150°C पर 15 मिनट पकाएँ, जब तक मछली नरम हो जाए। अगर सींक आसानी से न जाए तो 5 मिनट और। पतली मछली हो तो 5 मिनट कम।" },
        { en: "OR OVEN: put both pouches on a tray. Bake at 200°C (400°F) for 15–20 min until the fish is buttery soft.",
          hi: "या ओवन: दोनों पैकेट ट्रे पर रखें। 200°C पर 15–20 मिनट बेक करें, जब तक मछली बहुत नरम हो जाए।" },
        { en: "Meanwhile chop the ginger, scallions and chilli. Divide into 2 piles.",
          hi: "इस बीच अदरक, हरा प्याज़ और मिर्च काटें। 2 हिस्सों में बाँटें।" },
        { en: "Take out the pouches. Cool 3 min, then cut open carefully with scissors (hot steam!).",
          hi: "पैकेट निकालें। 3 मिनट ठंडा करें, फिर कैंची से सावधानी से खोलें (गरम भाप निकलेगी!)।" },
        { en: "Put the ginger, scallion and chilli on top of each fish with a pinch of salt.",
          hi: "हर मछली पर अदरक, हरा प्याज़ और मिर्च डालें, साथ में चुटकी भर नमक।" },
        { en: "Melt the butter and pour half over each piece. Serve hot right away.",
          hi: "मक्खन पिघलाएँ और हर टुकड़े पर आधा-आधा डालें। तुरंत गरम परोसें।" }
      ],
      mods: [
        "Carb version: replace 120 g fish with 250 g boiled potatoes (C 31 / F 14 / P 64)"
      ]
    },

    /* ---------------------------------------------------------- 12 */
    {
      id: "biryani",
      emoji: "🍚",
      name: { en: "Biryani (Soya)", hi: "सोया बिरयानी" },
      kcal: 500, macros: { c: 85, f: 3, p: 40 },
      tags: ["M", "V"],
      ingredients: [
        { icon: "🧈", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ghee", hi: "घी" } },
        { icon: "🧄", qty: { en: "2 cloves", hi: "2 कली" }, name: { en: "Garlic", hi: "लहसुन" } },
        { icon: "🧅", qty: { en: "1 small", hi: "1 छोटा" }, name: { en: "Onion", hi: "प्याज़" } },
        { icon: "🟢", qty: { en: "2 pods", hi: "2" }, name: { en: "Cardamom, slightly crushed", hi: "इलायची, हल्की कुटी" } },
        { icon: "🟤", qty: { en: "2", hi: "2" }, name: { en: "Cloves (laung)", hi: "लौंग" } },
        { icon: "🫚", qty: { en: "2 cm", hi: "2 सेमी" }, name: { en: "Ginger, finely chopped", hi: "अदरक, बारीक कटा" } },
        { icon: "🌰", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Garam masala", hi: "गरम मसाला" } },
        { icon: "🌿", qty: { en: "1 tsp", hi: "1 छोटा चम्मच" }, name: { en: "Ground coriander", hi: "धनिया पाउडर" } },
        { icon: "🟡", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ground turmeric", hi: "हल्दी" } },
        { icon: "🌶️", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Chilli powder", hi: "लाल मिर्च पाउडर" } },
        { icon: "🟫", qty: { en: "65 g", hi: "65 ग्राम" }, name: { en: "DRY soya nuggets, boiled and drained", hi: "कच्चे सोया चंक्स (वज़न सूखा), उबालकर पानी निकाला" } },
        { icon: "🟢", qty: { en: "40 g", hi: "40 ग्राम" }, name: { en: "Peas", hi: "मटर" } },
        { icon: "🍚", qty: { en: "60 g", hi: "60 ग्राम" }, name: { en: "DRY rice (uncooked weight)", hi: "कच्चे चावल (कच्चा वज़न)" } },
        { icon: "💧", qty: { en: "120 ml", hi: "120 मि.ली." }, name: { en: "Water", hi: "पानी" } }
      ],
      steps: [
        { en: "Put a pressure cooker on medium-high. Add ghee, cloves and cardamom. Fry 1 min.",
          hi: "कुकर मध्यम-तेज़ आंच पर रखें। घी, लौंग और इलायची डालें। 1 मिनट भूनें।" },
        { en: "Add the onion and stir-fry until slightly brown.",
          hi: "प्याज़ डालें और हल्का भूरा होने तक भूनें।" },
        { en: "Add ginger and garlic. Cook 2 min.",
          hi: "अदरक और लहसुन डालें। 2 मिनट भूनें।" },
        { en: "Add all the remaining spices and cook 1 min. Add a little water if it sticks.",
          hi: "बाकी सारे मसाले डालें और 1 मिनट भूनें। चिपके तो थोड़ा पानी डालें।" },
        { en: "Add the boiled soya nuggets, peas, dry rice and 120 ml water. Close the lid.",
          hi: "उबले सोया चंक्स, मटर, कच्चे चावल और 120 मि.ली. पानी डालें। ढक्कन लगाएँ।" },
        { en: "Cook for 3 whistles (or as you normally cook rice). Let the steam release, open and serve.",
          hi: "3 सीटी आने तक पकाएँ (या जैसे आप चावल बनाते हैं)। भाप निकलने दें, खोलें और परोसें।" }
      ],
      mods: [
        "Replace soya chunks with 215 g chicken thigh (C 55 / F 9 / P 54)",
        "or 280 g prawns (C 55 / F 4 / P 62)",
        "or 190 g boneless mutton (C 55 / F 12 / P 44)",
        "Cook the meat separately in a pan and mix into the rice after the steam releases."
      ]
    },

    /* ---------------------------------------------------------- 13 */
    {
      id: "rajma-chawal",
      emoji: "🫘",
      name: { en: "Dal / Rajma Chawal", hi: "दाल / राजमा चावल" },
      kcal: 510, macros: { c: 120, f: 4, p: 25 },
      tags: ["V"],
      ingredients: [
        { icon: "🫘", qty: { en: "80 g", hi: "80 ग्राम" }, name: { en: "DRY rajma, soaked overnight (or 75 g dry dal of choice)", hi: "कच्चा राजमा, रात भर भिगोया (या 75 ग्राम कोई भी कच्ची दाल)" } },
        { icon: "🧈", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ghee", hi: "घी" } },
        { icon: "🧅", qty: { en: "1", hi: "1" }, name: { en: "Onion, roughly chopped", hi: "प्याज़, मोटा कटा" } },
        { icon: "🫚", qty: { en: "1 inch", hi: "1 इंच" }, name: { en: "Ginger, finely chopped", hi: "अदरक, बारीक कटा" } },
        { icon: "🍅", qty: { en: "1½", hi: "डेढ़" }, name: { en: "Tomatoes, pureed", hi: "टमाटर, पीसे हुए" } },
        { icon: "🟡", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Turmeric", hi: "हल्दी" } },
        { icon: "🌾", qty: { en: "2 tsp", hi: "2 छोटे चम्मच" }, name: { en: "Cumin powder", hi: "जीरा पाउडर" } },
        { icon: "🌰", qty: { en: "1½ tsp", hi: "डेढ़ छोटा चम्मच" }, name: { en: "Garam masala", hi: "गरम मसाला" } },
        { icon: "🍃", qty: { en: "1", hi: "1" }, name: { en: "Bay leaf", hi: "तेज पत्ता" } },
        { icon: "🟤", qty: { en: "1 inch", hi: "1 इंच" }, name: { en: "Cinnamon stick", hi: "दालचीनी" } },
        { icon: "🌿", qty: { en: "8 sprigs", hi: "8 डंठल" }, name: { en: "Coriander leaves, roughly chopped", hi: "हरा धनिया, मोटा कटा" } },
        { icon: "🧂", qty: { en: "To taste", hi: "स्वाद अनुसार" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🍚", qty: { en: "150 g", hi: "150 ग्राम" }, name: { en: "Boiled rice (cooked weight)", hi: "पके हुए चावल (पकने के बाद का वज़न)" } }
      ],
      steps: [
        { en: "Soak the rajma in water overnight (for other dals, soak as needed).",
          hi: "राजमा रात भर पानी में भिगोएँ (दूसरी दाल हो तो ज़रूरत के हिसाब से भिगोएँ)।" },
        { en: "Heat ghee in the pressure cooker on medium. Add onion and ginger, sauté 3–4 min until light golden.",
          hi: "कुकर में घी मध्यम आंच पर गरम करें। प्याज़ और अदरक डालें, 3–4 मिनट हल्का सुनहरा होने तक भूनें।" },
        { en: "Add tomatoes, bay leaf, cinnamon, turmeric, cumin powder, garam masala and salt. Sauté a couple of minutes until the tomatoes are soft.",
          hi: "टमाटर, तेज पत्ता, दालचीनी, हल्दी, जीरा पाउडर, गरम मसाला और नमक डालें। 2 मिनट भूनें, जब तक टमाटर नरम हो जाए।" },
        { en: "Add the soaked rajma with its water. Add more water if needed so the water is at least 2 inches above the rajma.",
          hi: "भिगोया राजमा पानी के साथ डालें। ज़रूरत हो तो और पानी डालें, पानी राजमा से कम से कम 2 इंच ऊपर हो।" },
        { en: "Close the cooker. After 1 whistle, lower to medium-low and cook about 30 min (5–15 min for a quick-cooking dal).",
          hi: "कुकर बंद करें। 1 सीटी के बाद आंच धीमी-मध्यम करें और लगभग 30 मिनट पकाएँ (जल्दी पकने वाली दाल के लिए 5–15 मिनट)।" },
        { en: "Turn off the heat and let the pressure release on its own.",
          hi: "आंच बंद करें और भाप अपने आप निकलने दें।" },
        { en: "Open and check: the rajma should mash easily between your fingers. If still firm, cook a little longer.",
          hi: "खोलकर देखें: राजमा उंगलियों से आसानी से दबना चाहिए। सख़्त हो तो थोड़ा और पकाएँ।" },
        { en: "Adjust salt and spice. Stir in the coriander and serve hot with the rice.",
          hi: "नमक-मसाला ठीक करें। हरा धनिया मिलाएँ और चावल के साथ गरम परोसें।" }
      ],
      mods: []
    },

    /* ---------------------------------------------------------- 14 */
    {
      id: "channe-roti",
      emoji: "🫓",
      name: { en: "Channe Roti", hi: "छोले रोटी" },
      kcal: 505, macros: { c: 88, f: 6, p: 39 },
      tags: ["V"],
      ingredients: [
        { icon: "🧈", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ghee", hi: "घी" } },
        { icon: "🧅", qty: { en: "½ medium", hi: "आधा" }, name: { en: "Onion, finely diced", hi: "प्याज़, बारीक कटा" } },
        { icon: "🌾", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Ground cumin", hi: "जीरा पाउडर" } },
        { icon: "🧂", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Salt", hi: "नमक" } },
        { icon: "🧄", qty: { en: "1 clove", hi: "1 कली" }, name: { en: "Garlic, minced", hi: "लहसुन, बारीक कटा" } },
        { icon: "🫚", qty: { en: "¾ tsp", hi: "पौन छोटा चम्मच" }, name: { en: "Fresh ginger, minced", hi: "अदरक, बारीक कटा" } },
        { icon: "🌿", qty: { en: "Handful", hi: "एक मुट्ठी" }, name: { en: "Fresh coriander, chopped", hi: "हरा धनिया, कटा" } },
        { icon: "🌶️", qty: { en: "1", hi: "1" }, name: { en: "Green chilli, chopped", hi: "हरी मिर्च, कटी" } },
        { icon: "🌿", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Ground coriander", hi: "धनिया पाउडर" } },
        { icon: "🌶️", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Chilli powder", hi: "लाल मिर्च पाउडर" } },
        { icon: "🟡", qty: { en: "¼ tsp", hi: "चौथाई छोटा चम्मच" }, name: { en: "Ground turmeric", hi: "हल्दी" } },
        { icon: "🍅", qty: { en: "125 ml", hi: "125 मि.ली." }, name: { en: "Tomatoes, finely diced and pureed", hi: "टमाटर, बारीक काटकर पीसे" } },
        { icon: "🫘", qty: { en: "55 g", hi: "55 ग्राम" }, name: { en: "DRY chickpeas (soak & boil first), slightly drained", hi: "कच्चे काबुली चने (सूखा वज़न; पहले भिगोकर उबालें), थोड़ा पानी निकालकर" } },
        { icon: "🌰", qty: { en: "½ tsp", hi: "आधा छोटा चम्मच" }, name: { en: "Garam masala", hi: "गरम मसाला" } },
        { icon: "🍬", qty: { en: "1 tsp", hi: "1 छोटा चम्मच" }, name: { en: "Sugar", hi: "चीनी" } },
        { icon: "🍋", qty: { en: "½ tbsp", hi: "आधा बड़ा चम्मच" }, name: { en: "Lemon juice", hi: "नींबू का रस" } },
        { group: { en: "Roti", hi: "रोटी" } },
        { icon: "🌾", qty: { en: "40 g", hi: "40 ग्राम" }, name: { en: "Flour (atta)", hi: "आटा" } },
        { icon: "🥄", qty: { en: "30 g", hi: "30 ग्राम" }, name: { en: "Unflavoured protein powder, mixed into the flour", hi: "बिना फ्लेवर वाला प्रोटीन पाउडर, आटे में मिलाएँ" } }
      ],
      steps: [
        { en: "Heat a pot on medium. Add ghee, onion, cumin and salt.",
          hi: "पतीला मध्यम आंच पर गरम करें। घी, प्याज़, जीरा और नमक डालें।" },
        { en: "Grind garlic, ginger, coriander and green chilli into a rough paste. Add to the pot.",
          hi: "लहसुन, अदरक, हरा धनिया और हरी मिर्च को मोटा पीस लें। पतीले में डालें।" },
        { en: "Add ground coriander, chilli powder and turmeric. Stir to coat.",
          hi: "धनिया पाउडर, लाल मिर्च और हल्दी डालें। मिलाएँ।" },
        { en: "Add the pureed tomatoes, chickpeas and remaining salt. Add water if too thick.",
          hi: "पिसे टमाटर, चने और बचा नमक डालें। ज़्यादा गाढ़ा हो तो पानी डालें।" },
        { en: "Simmer on medium-low 15–20 min, stirring now and then, until thick like a stew.",
          hi: "धीमी-मध्यम आंच पर 15–20 मिनट पकाएँ, बीच-बीच में चलाएँ, जब तक गाढ़ा हो जाए।" },
        { en: "Meanwhile mix the protein powder into the flour and make the roti.",
          hi: "इस बीच आटे में प्रोटीन पाउडर मिलाकर रोटी बनाएँ।" },
        { en: "Taste and adjust: more salt, chilli powder for heat, or a little sugar to balance.",
          hi: "चखकर ठीक करें: नमक, तीखे के लिए लाल मिर्च, या संतुलन के लिए थोड़ी चीनी।" },
        { en: "Take off the heat. Add lemon juice and garam masala, stir. Garnish with coriander and serve with the roti.",
          hi: "आंच से उतारें। नींबू का रस और गरम मसाला डालकर मिलाएँ। हरा धनिया डालकर रोटी के साथ परोसें।" }
      ],
      mods: []
    }
  ],

  /* "Make your own recipe" template from the last page of the PDF (500 kcal).
     Gautam-facing reference. CF = cooking fat (1 tsp = 5 ml olive oil/ghee/butter/avocado/coconut oil).
     Veg = ghiya, torai, tinda, zucchini, okra, watercress, spinach, methi, cucumber, green pepper,
     cauliflower, cabbage, broccoli, radish, pak choi, any green leafy vegetable.
     Lean meat = chicken breast/thigh, mutton, prawn, shrimp, fish, pork, beef with visible fat removed. */
  template: [
    { option: "215 g lean meat + 45 g DRY rice/oats/flour or 200 g potato/sweet potato + 150 g veg + 1 tsp CF", c: 43.5, f: 11.5, p: 58.5 },
    { option: "56 g DRY dal + 56 g DRY rice/oats/flour or 260 g potato/sweet potato + 1 tsp CF + 150 g veg", c: 87, f: 5.5, p: 25 },
    { option: "110 g paneer + 1 tsp CF + 150 g veg", c: 9, f: 36.5, p: 30 },
    { option: "60 g paneer + 56 g DRY rice/oats/flour or 260 g potato/sweet potato + 1 tsp CF + 150 g veg", c: 41, f: 25, p: 25.5 },
    { option: "60 g soya chunks + 56 g DRY rice/oats/flour or 260 g potato/sweet potato + 1 tsp CF + 150 g veg", c: 69, f: 5.5, p: 42.5 },
    { option: "170 g lean meat + 60 g cheese/paneer + 150 g veg + 1 tsp CF", c: 9, f: 23, p: 63 },
    { option: "350 g lean meat + 150 g veg + 1 tsp CF", c: 9, f: 15, p: 84 }
  ]
};
