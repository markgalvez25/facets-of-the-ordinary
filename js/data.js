/* =====================================================================
   FACETS OF THE ORDINARY — Exhibit data
   ---------------------------------------------------------------------
   THE IDEA
   This exhibit highlights subjects that are often overlooked, unnoticed,
   or underrepresented within a setting — the unseen hands, the quiet
   spaces, the worn objects and the in-between moments that keep a place
   alive.

   This file is the single source of truth for the whole site:
     - PHOTOGRAPHERS  → the Photographers page (one profile card each)
     - PHOTOS         → the Gallery grid + photo viewer
     - INSTRUCTOR     → the adviser profile shown on the Home page

   Photos and portraits are real local files under /images/.
   Photographers whose photos have not yet arrived are listed by name,
   with a "coming soon" placeholder, ready to be filled in later.
   ===================================================================== */

const PLACEHOLDER_PORTRAIT = "images/portraits/_placeholder.jpg";

/* ---------------------- Instructor (Home page) ---------------------- */
/* Replace with your real adviser / instructor details. */
const INSTRUCTOR = {
  name: "Prof. Jonah A. Lim",
  title: "Exhibit Adviser & Photography Instructor",
  institution: "[SomDA / Mapua University]",
  portrait: "images/portraits/instructor.jpg",
  foreword: "I asked them to photograph what a place would rather you didn't notice. What they brought back is a quiet argument that nothing in a setting is truly ordinary."
};

/* ---------------------- Photographers (11) ----------------------
   Contributors with submitted work first, then those whose photos
   are still to come. Update the "coming soon" entries once their
   personal photo, bio and subject photos arrive.                    */
const PHOTOGRAPHERS = [
  {
    id: "aguja", name: "Ayna Vor Aguja", facet: "People", role: "People — Community & Care",
    location: "General Santos City, Philippines",
    portrait: "images/portraits/aguja.jpg",
    bio: "Ayna Vor Aguja is someone who blends creativity with hands-on tech work. She's a full-time SHS faculty member at MSU-General Santos who often leads the school's live streaming events, handling live broadcast direction and the overall flow for each online production. Her media skills include layout design and motion design, which she applies to various creative projects. Outside of checking class requirements, she shifts into a quieter rhythm: hiking, camping, getting lost in stories, collecting more books than she can finish, and discovering new music. It's a mix that makes her feel grounded and keeps curious."
  },
  {
    id: "ayao", name: "Lin Mark Ayao", facet: "People", role: "People — Behind the Bars",
    location: "Pampanga, Philippines",
    portrait: "images/portraits/ayao.jpg",
    bio: "Refined over eight years in the creative industry, from hands-on animation to leading creative direction in the tech sector, Lin Mark's visual foundation is rooted in a lifelong passion. Ever since his artistic journey began in elementary school, he has been driven to continuously push his boundaries and elevate his craft. Today, as he pursues artistic mastery, his focus is set firmly on the future of multimedia, deeply fascinated by how future innovations will revolutionize the way we create and experience art."
  },
  {
    id: "galvez", name: "Mark Arnold Galvez", facet: "People", role: "People — Everyday Labour",
    location: "Caloocan City, Philippines",
    portrait: "images/portraits/galvez.jpg",
    bio: "Mark Arnold G. Galvez serves as a multimedia instructor and a graphic designer. He provides technical knowledge to students to support creative career paths. Galvez emphasizes digital literacy and critical thinking. He integrates technology within the artificial intelligence era to educate future professionals. His approach connects academic theory with industry standards."
  },
  {
    id: "nanola", name: "Rameses Peter Nañola", facet: "People", role: "People — Hands of the City",
    location: "Metro Manila, PH",
    portrait: "images/portraits/nanola.jpg",
    bio: "Rameses Peter L. Nañola currently works as a Full-time Instructor at FEU Institute of Technology. An artist from Metro Manila, he specializes in 3D animation, UI/UX design, and graphic design, always looking to explore and expand his knowledge in the creative field. In his free time, he enjoys playing basketball and pickleball, mobile games, reading books, and traveling around only in Metro Manila."
  },
  {
    id: "oli", name: "Mac Khenlee Oli", facet: "People", role: "People — Quiet Livelihoods",
    location: "Lingayen, Pangasinan, PH",
    portrait: "images/portraits/oli.jpg",
    bio: "Mac Khenlee Oli currently works as a Multimedia Arts instructor at Pangasinan Polytechnic College. A multimedia artist from Lingayen, Pangasinan, he specializes in graphic design, layout, multimedia research, journalistic and creative writing, and content creation. In his free time, he enjoys cooking, watching and reviewing films, playing games, going to the gym, and running. He is particularly fond of the colors orange and black and is passionate about writing on themes related to society, queer experiences, youth, and pop culture."
  },
  {
    id: "sagario", name: "Jesus Zeus Hermes Sagario", facet: "Moments", role: "Moments — Quiet Pauses",
    portrait: "images/portraits/sagario.jpg",
    bio: "Jesus Zeus Hermes V. Sagario is an Arts and Design instructor specializing in 3D modeling, animation, and multimedia arts. With a strong foundation in digital illustration and ongoing graduate studies toward a master's degree in Multimedia Arts, he brings a balanced integration of industry experience, creative practice, and academic discipline to the classroom. His teaching approach combines classical art foundations — such as drawing, composition, and visual storytelling — with contemporary digital workflows, production pipelines, and creative technologies. Through this integration, he helps students develop creativity, critical thinking, visual literacy, and technical fluency. Committed to preparing learners for the demands of an evolving media and design landscape, Zeus continues to advance as both an educator and creative practitioner through research, professional development, and artistic production. He guides students in creating portfolio-ready work while encouraging them to engage meaningfully with the role of design, media, and technology in contemporary culture."
  },
  {
    id: "sanchez", name: "Albert Sanchez", facet: "People", role: "People — Market & Community",
    location: "Capas, Tarlac, Philippines",
    portrait: "images/portraits/sanchez.jpg",
    bio: "Albert I. Sanchez is currently a Fine Arts Instructor at Tarlac State University. A practicing visual artist from Capas, Tarlac, he specializes in graphic design, layout design, multimedia design, product and packaging design. Passionate about both traditional and digital art, he continuously explores creative ways to communicate ideas through visual media. In his free time, he enjoys painting on paper and canvas, transforming blank surfaces into expressive works of art."
  },
  {
    id: "santos", name: "Rey Christian Santos", facet: "Moments", role: "Moments — In-Between Moments",
    portrait: "images/portraits/santos.jpg",
    bio: "Rey Christian A. Santos is a Multimedia Arts professor and visual storyteller with a passion for photography, filmmaking, and digital media. His work often explores everyday experiences, highlighting the people, places, and moments that quietly shape communities. Beyond teaching, he enjoys exploring urban spaces, creating visual narratives, and discovering new perspectives through art and culture. He values creativity, lifelong learning, and meaningful human connections, and is drawn to warm, earthy tones that reflect the beauty found in ordinary life."
  },
  {
    id: "valeza", name: "Richard Valeza", facet: "People", role: "People — Market & Street Life",
    location: "Catanduanes, Philippines",
    portrait: "images/portraits/valeza.jpg",
    bio: "Richard B. Valeza is a young multimedia artist from Catanduanes currently pursuing a Master of Arts in Multimedia Arts while working as an office clerk. Passionate about photography, graphic design, audio design, and multimedia production, he continues to develop his skills and creativity with the goal of building a better future through art, technology, and visual storytelling."
  },
  {
    id: "villanueva", name: "Charissa Villanueva", facet: "Spaces", role: "Spaces — Between the Stops",
    portrait: "images/portraits/villanueva.jpg",
    bio: "Charissa Villanueva works as a freelance digital artist, who specializes in video editing, graphic design, and content creation. Outside of work and school, they enjoy animation, watching films, exploring new places, and trying good food. She is a church person who values faith, family, and serving the community. Who is drawn to the colors orange and purple!"
  },
  {
    id: "watin", name: "Garry Allen Watin", facet: "People", role: "People — Everyday Filipino Life",
    portrait: "images/portraits/watin.jpg",
    bio: "Garry Allen Watin is a multimedia artist whose foundation in painting is complemented by over a decade of experience teaching art in higher education. His work bridges traditional fine arts and contemporary digital media, drawing from leadership roles in arts education and specialized training in visual effects compositing. Through his practice as both an artist and educator, he is committed to nurturing creativity while exploring the connection between classical craftsmanship and modern creative technologies."
  }
];

/* ---------------------- Photographs ----------------------
   category options (the four facets):
   "People", "Spaces", "Objects", "Moments"                          */
const PHOTOS = [
  /* ---- Mark Arnold Galvez ---- */
  {
    id: "galvez-1", title: "Unhinged Obligation", category: "People", photographer: "galvez",
    img: "images/photos/galvez-1.jpg",
    caption: "A man washes dishes using an automated machine that efficiently cleans them. While such routine tasks are often overlooked in favor of more visually appealing subjects, they remain an important part of daily life. This image highlights the work people undertake each day to meet their needs and sustain their livelihood.",
    likes: 0, comments: []
  },
  {
    id: "galvez-2", title: "Fight to Live", category: "People", photographer: "galvez",
    img: "images/photos/galvez-2.jpg",
    caption: "Under the scorching sun, a teenager persistently pushes a cart of bottled water to deliver to a customer. While many are occupied with their own work and families, labor such as this can easily be overlooked. In reality, we all rely on essential necessities like water, yet seldom recognize those who make sacrifices to bring them within our reach.",
    likes: 0, comments: []
  },
  {
    id: "galvez-3", title: "Patience for the Family", category: "People", photographer: "galvez",
    img: "images/photos/galvez-3.jpg",
    caption: "A small stall of Japanese cakes stood invitingly to customers, while the vendor passed the time on his mobile phone. As others went about their own tasks, he patiently waited for a sale, hoping to earn enough to support his family.",
    likes: 0, comments: []
  },

  /* ---- Rameses Peter Nañola ---- */
  {
    id: "nanola-1", title: "The Midnight Shift", category: "People", photographer: "nanola",
    img: "images/photos/nanola-1.jpg",
    caption: "Under the streetlights, two waste collectors quietly keep the city running while the rest of the world sleeps. We easily ignore the trash we throw away, and by extension, the people who manage it. It brings these invisible hands into the light, reminding us that our daily comfort and clean streets rely entirely on their quiet, backbreaking labor.",
    likes: 0, comments: []
  },
  {
    id: "nanola-2", title: "An Unseen Part of the Journey", category: "People", photographer: "nanola",
    img: "images/photos/nanola-2.jpg",
    caption: "Standing at the bus entrance, a conductor quietly counts fares as the rest of the city rushes past in a blur. We often focus on just getting to our destinations, missing the people who guide us through the daily commute. This captures a brief, still moment of a worker anchoring the chaotic rhythm of urban life.",
    likes: 0, comments: []
  },
  {
    id: "nanola-3", title: "Rolling Sweetness", category: "People", photographer: "nanola",
    img: "images/photos/nanola-3.jpg",
    caption: "An ice cream vendor carefully scoops a treat onto a cone at his colorful street cart; a small towel draped over his shoulders to brave the heat. Amidst the heavy traffic and stressful city rush, he offers a familiar, comforting pause to passersby. This honors the simple joy he brings to the community, turning a basic street trade into a vital source of daily relief and connection.",
    likes: 0, comments: []
  },

  /* ---- Mac Khenlee Oli ---- */
  {
    id: "oli-1", title: "Hands behind the Binungey", category: "People", photographer: "oli",
    img: "images/photos/oli-1.jpg",
    caption: "Elderly craftsmen from Anda, Pangasinan prepare bamboo for the local delicacy binungey. While the delicacy is widely celebrated, the labor and expertise required to prepare its bamboo vessels often remain unrecognized.",
    likes: 0, comments: []
  },
  {
    id: "oli-2", title: "A Matter of Patience", category: "People", photographer: "oli",
    img: "images/photos/oli-2.jpg",
    caption: "A fisherman from Calasiao, Pangasinan returns from the river with his catch after casting his net into its waters. The effort, expertise, and patience that go into every capture is occasionally unappreciated, even if the fish may finally make it to the table.",
    likes: 0, comments: []
  },
  {
    id: "oli-3", title: "No Pause for Livelihood", category: "People", photographer: "oli",
    img: "images/photos/oli-3.jpg",
    caption: "A resident from Dagupan City wades through floodwaters carrying goods for sale, still trying to make a day's work out of the situation. While attention is drawn to the rising waters, the effort of making a living continues just beneath that surface of disruption.",
    likes: 0, comments: []
  },

  /* ---- Jesus Zeus Hermes Sagario ---- */
  {
    id: "sagario-1", title: "Waiting", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-1.jpg",
    caption: "Two perspectives in one, the image shows scooters in the foreground and riders waiting patiently for passenger bookings in the background. Rather than focusing on the movement of transportation, it captures the quiet pauses between journeys. Beneath the routine of urban life lies the patience and uncertainty that accompany everyday work.",
    likes: 0, comments: []
  },
  {
    id: "sagario-2", title: "Siesta", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-2.jpg",
    caption: "This photo captures a quiet pause in the middle of household labor. Surrounded by laundry and everyday clutter, the cup of iced coffee becomes a small reward after continuous chores. It reflects a simple but meaningful moment of rest, revealing the exhaustion, comfort, and personal care found within ordinary routines.",
    likes: 0, comments: []
  },
  {
    id: "sagario-3", title: "Funeral Wake", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-3.jpg",
    caption: "Family members and visitors gather in prayer and quiet reflection during a funeral wake. While attention is often drawn to the ceremony itself, the image highlights the simple acts of presence, silence, and shared faith that bring comfort to the grieving. In these ordinary gestures lie respect, remembrance, and community support.",
    likes: 0, comments: []
  },
  {
    id: "sagario-4", title: "Mock-up", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-4.jpg",
    caption: "This photo captures a capstone project presentation, where students defend their work before an audience. While presentations are a common part of academic life, the image reflects the preparation, teamwork, and perseverance behind each one. Beyond the formal setting lies a shared experience of learning, improvement, and growth.",
    likes: 0, comments: []
  },
  {
    id: "sagario-5", title: "My Pedia", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-5.jpg",
    caption: "This photo captures a quiet moment during a routine pediatric visit, where a mother holds her child while the doctor provides care and guidance. Though clinic visits are a common part of family life, they reflect the patience, concern, and responsibility involved in caring for a child's well-being. Beyond the consultation lies an everyday expression of protection, trust, and love.",
    likes: 0, comments: []
  },

  /* ---- Rey Christian Santos ---- */
  {
    id: "santos-1", title: "A Quiet Meal", category: "Moments", photographer: "santos",
    img: "images/photos/santos-1.jpg",
    caption: "A student sits alone at the dining table, focused on a simple meal before him. In the rush of daily routines, moments like these provide nourishment, reflection, and the energy needed to continue the demands of everyday life.",
    likes: 0, comments: []
  },
  {
    id: "santos-2", title: "By Candlelight", category: "Moments", photographer: "santos",
    img: "images/photos/santos-2.jpg",
    caption: "A young child gazes quietly toward the glow of a candle in a dimly lit room. Ordinary sources of light often become symbols of comfort, warmth, and security during moments of stillness and uncertainty.",
    likes: 0, comments: []
  },
  {
    id: "santos-3", title: "A Seat Beneath the Trees", category: "Spaces", photographer: "santos",
    img: "images/photos/santos-3.jpg",
    caption: "A young person sits alone on a bench in a shaded public park. Spaces like these offer refuge from the noise of the city, providing opportunities for rest, reflection, and connection with the surrounding environment.",
    likes: 0, comments: []
  },
  {
    id: "santos-4", title: "The Keeper of Clean Paths", category: "People", photographer: "santos",
    img: "images/photos/santos-4.jpg",
    caption: "A street cleaner sweeps fallen leaves from a quiet roadside walkway. While their work often goes unnoticed, maintenance workers help preserve the cleanliness, safety, and welcoming atmosphere of shared public spaces.",
    likes: 0, comments: []
  },

  /* ---- Richard Valeza — market & street life ---- */
  {
    id: "valeza-1", title: "The Wheels That Keep Moving", category: "People", photographer: "valeza",
    img: "images/photos/valeza-1.jpg",
    caption: "At first glance, it is just a tricycle parked along a busy street. But behind the worn metal and faded paint is a story of hard work, perseverance, and daily survival. For many, this vehicle is more than transportation, it is a livelihood, a source of income, and a means of providing for a family. In the ordinary routine of waiting for passengers lies an extraordinary display of resilience and dignity.",
    likes: 0, comments: []
  },
  {
    id: "valeza-2", title: "A Window Beyond the Market", category: "Moments", photographer: "valeza",
    img: "images/photos/valeza-2.jpg",
    caption: "While waiting for customers, a young vendor scrolls through his phone, captivated by stories, news, and events happening far beyond the marketplace. In a world once limited by distance, technology has become his window to places he has never seen and experiences he has never lived.",
    likes: 0, comments: []
  },
  {
    id: "valeza-3", title: "Growing Up Between Market Stalls", category: "People", photographer: "valeza",
    img: "images/photos/valeza-3.jpg",
    caption: "Amid the noise of the marketplace, a child quietly sits among sacks, fruits, and goods. While customers come and go, life unfolds in this small corner of the market. The image reveals a side of childhood often overlooked, one shaped by family livelihood and everyday realities. What seems like an ordinary market scene becomes a reflection of resilience, responsibility, and the unseen stories woven into daily life.",
    likes: 0, comments: []
  },
  {
    id: "valeza-4", title: "Lost in a Small World", category: "Moments", photographer: "valeza",
    img: "images/photos/valeza-4.jpg",
    caption: "While the market bustles around him, a young boy sits quietly in his own corner, focused on the screen in his hands. Amid the noise and movement of everyday life, he finds a moment of escape, creating a small world of his own.",
    likes: 0, comments: []
  },
  {
    id: "valeza-5", title: "A Small Break in a Big Day", category: "People", photographer: "valeza",
    img: "images/photos/valeza-5.jpg",
    caption: "Seated quietly in the middle of the market, a young boy enjoys a simple snack while life carries on around him. Vendors call out to customers, people pass by, and the day moves at its usual pace. For a brief moment, he steps away from the noise and responsibilities, finding comfort in something as simple as a snack. It is an ordinary scene, yet it reflects a childhood shaped by family, work, and the everyday realities of life.",
    likes: 0, comments: []
  },
  {
    id: "valeza-6", title: "Stillness Before the Ride", category: "Moments", photographer: "valeza",
    img: "images/photos/valeza-6.jpg",
    caption: "An hour passes, and the pedicab driver kneels beside his ride, waiting not just for a passenger, but for the rhythm of the day to begin.",
    likes: 0, comments: []
  },

  /* ---- Charissa Villanueva — "Between the Stops" ---- */
  {
    id: "villanueva-1", title: "Shared Path by the Overpass", category: "Spaces", photographer: "villanueva",
    img: "images/photos/villanueva-1.jpg",
    caption: "Thousands of commuters walk along the concrete footbridge leading toward the EDSA Carousel station near SM North. Though it is usually passed through without a second thought, this bridge serves as the brief buffer zone where people walk together and share a common path as they transition from their personal life into the workspace.",
    likes: 0, comments: []
  },
  {
    id: "villanueva-2", title: "View from the Jeepney Rear", category: "Spaces", photographer: "villanueva",
    img: "images/photos/villanueva-2.jpg",
    caption: "Raindrops blur the view of passing traffic from the open rear entrance of a jeepney. While passengers focus entirely on reaching their destination, this small passenger entrance shows how jeepneys act as temporary shelters separating the commuters from the wet city streets.",
    likes: 0, comments: []
  },
  {
    id: "villanueva-3", title: "A Parallel Path", category: "Spaces", photographer: "villanueva",
    img: "images/photos/villanueva-3.jpg",
    caption: "An MRT train speeds away into the night as the designated passenger waiting lane rests completely empty. This frame captures a rare, peaceful pause on the platform where ordinary transit spaces are caught in a quiet moment of rest before the next crowd arrives.",
    likes: 0, comments: []
  },
  {
    id: "villanueva-4", title: "Rush Hour Rail", category: "Objects", photographer: "villanueva",
    img: "images/photos/villanueva-4.jpg",
    caption: "Passengers and buses both form lines next to each other, divided right down the middle by a metal railing, an ordinary piece of steel, but plays a role in keeping people safe from moving traffic during the evening rush hour.",
    likes: 0, comments: []
  },
  {
    id: "villanueva-5", title: "The Unloading Zone", category: "Objects", photographer: "villanueva",
    img: "images/photos/villanueva-5.jpg",
    caption: "An unloading sign hangs above the designated drop-off lane at the bus station. While passengers usually wait in line for their ride, this simple marker guides the behavior of drivers and commuters to create an orderly system that never existed before.",
    likes: 0, comments: []
  },

  /* ---- Ayna Vor Aguja — community & care ---- */
  {
    id: "aguja-1", title: "Small Colorful Acts, Big Careful Impact", category: "People", photographer: "aguja",
    img: "images/photos/aguja-1.jpg",
    caption: "A youth volunteer interacts with a child, offering connection through play. While aid often focuses on physical needs, this photo shows the emotional importance of recovery. The photo celebrates the power of play, a universal language that restores confidence and connection in times of recovery.",
    likes: 0, comments: []
  },
  {
    id: "aguja-2", title: "Role Reversal Behind the Lens", category: "People", photographer: "aguja",
    img: "images/photos/aguja-2.jpg",
    caption: "A faculty member documents a student event while surrounded by the very students being photographed. While educators are often seen at the forefront of academic activities, their role in preserving these moments receives less attention. Through the lens, the faculty member contributes to student life in ways that extend beyond the classroom.",
    likes: 0, comments: []
  },
  {
    id: "aguja-3", title: "Warrior's Face Painter", category: "People", photographer: "aguja",
    img: "images/photos/aguja-3.jpg",
    caption: "A volunteer facilitator during the #DaliKalimulan outreach event. In outreach activities, people often notice the smiling faces, laughter, and painted expressions, but not always the individuals who make those moments possible. This shows us that healing is built on everyday kindness, where empathy and attention become quiet forces of restoration.",
    likes: 0, comments: []
  },
  {
    id: "aguja-4", title: "Community Colors of Resilience", category: "People", photographer: "aguja",
    img: "images/photos/aguja-4.jpg",
    caption: "Children gather around a shared art activity, their hands busy with color, creativity, and teamwork. In disaster-response outreach programs, attention is often given to material aid, while emotional support receives less attention. The image highlights the role of play, expression, and togetherness, reminding us that simple joy can also be part of the healing process.",
    likes: 0, comments: []
  },
  {
    id: "aguja-5", title: "Stillness Amid Motion", category: "People", photographer: "aguja",
    img: "images/photos/aguja-5.jpg",
    caption: "A young balut vendor manning his stall on the side of a busy rushing highway, minding his own entertainment. While attention is often drawn to the road, the products, or the street vending challenges, the youth behind these businesses can easily fade into the background. This image highlights how informal labor helps sustain the life of a community.",
    likes: 0, comments: []
  },

  /* ---- Lin Mark Ayao — behind the bars ---- */
  {
    id: "ayao-1", title: "Sardines Behind Bars", category: "People", photographer: "ayao",
    img: "images/photos/ayao-1.jpg",
    caption: "The sari-sari store is one of the most ordinary facets of local life. Yet, framed through rusted metal bars, a different side of that reality emerges. Selling everyday staples to her community, the vendor spends her days behind a narrow transaction window. It begs the question: who is really captive to the daily grind?",
    likes: 0, comments: []
  },
  {
    id: "ayao-2", title: "The Watcher's Cage", category: "People", photographer: "ayao",
    img: "images/photos/ayao-2.jpg",
    caption: "We rarely look twice at the ordinary guardhouse. Yet, the photo reveals a harsh reality. Tasked with keeping danger out, he is boxed into a few square feet of sun-baked concrete and steel. He watches the world from behind his own set of bars—a protector imprisoned by the very livelihood sustaining him.",
    likes: 0, comments: []
  },
  {
    id: "ayao-3", title: "Shade of Hope", category: "People", photographer: "ayao",
    img: "images/photos/ayao-3.jpg",
    caption: "A tattered umbrella is her only shield against the unforgiving sun, but it covers an unbreakable spirit. The photo reveals a heartbreaking yet inspiring facet of the ordinary: a solitary mother grinding seven days a week to support her two children with autism and one in college. Her torn canopy may look fragile to the passing world, but to her children, it casts the most important shade of hope for their future.",
    likes: 0, comments: []
  },

  /* ---- Albert Sanchez — market & community ---- */
  {
    id: "sanchez-1", title: "Golden Thoughts", category: "Moments", photographer: "sanchez",
    img: "images/photos/sanchez-1.jpg",
    caption: "A young woman sits quietly as the afternoon sunlight gently falls across her face. In a world filled with constant noise and distractions, the photograph captures a rare moment of stillness. It reminds us that taking time to pause, reflect, and simply be present is just as important as staying busy.",
    likes: 0, comments: []
  },
  {
    id: "sanchez-2", title: "Heart of the Market", category: "People", photographer: "sanchez",
    img: "images/photos/sanchez-2.jpg",
    caption: "The busy marketplace is alive with people walking, selling, buying, and going about their daily routines. While it may appear ordinary, each person carries their own struggles, responsibilities, and dreams.",
    likes: 0, comments: []
  },
  {
    id: "sanchez-3", title: "Colors of Commerce", category: "People", photographer: "sanchez",
    img: "images/photos/sanchez-3.jpg",
    caption: "Under colorful umbrellas, vendors spend their day selling fruits and goods while customers come and go. This scene reflects the everyday reality of many Filipinos whose hard work begins early and ends late. Behind every stall is a story of dedication, sacrifice, and hope for a better future.",
    likes: 0, comments: []
  },
  {
    id: "sanchez-4", title: "The Unseen Carry", category: "People", photographer: "sanchez",
    img: "images/photos/sanchez-4.jpg",
    caption: "Partially hidden from view, a tricycle driver waits patiently for passengers amid the city's constant movement. People often notice the destination but rarely the individuals who help them get there. This image honors the quiet dedication of workers whose efforts keep communities moving, even when their contributions go unnoticed.",
    likes: 0, comments: []
  },
  {
    id: "sanchez-5", title: "Crossing Paths", category: "People", photographer: "sanchez",
    img: "images/photos/sanchez-5.jpg",
    caption: "Families and individuals cross the street, each heading toward different destinations. Though their paths may only meet for a brief moment, they share the same roads, challenges, and experiences of everyday life.",
    likes: 0, comments: []
  },

  /* ---- Garry Allen Watin — everyday Filipino life ---- */
  {
    id: "watin-1", title: "Summer Hoops", category: "People", photographer: "watin",
    img: "images/photos/watin-1.jpg",
    caption: "Young players participate in a basketball training session as they practice movement and teamwork on the court. In a country where basketball is deeply integrated into everyday culture, community training programs like these provide children with opportunities to develop discipline, friendships, and a shared passion for the sport.",
    likes: 0, comments: []
  },
  {
    id: "watin-2", title: "First Notes", category: "Moments", photographer: "watin",
    img: "images/photos/watin-2.jpg",
    caption: "A young pianist performs during her first recital, focusing intently as she plays before an audience. While often seen as a simple extracurricular activity, music lessons help children build discipline and self-expression through years of practice and dedication.",
    likes: 0, comments: []
  },
  {
    id: "watin-3", title: "Morning by the Shore", category: "People", photographer: "watin",
    img: "images/photos/watin-3.jpg",
    caption: "A mother carries her infant while standing along the shoreline as families enjoy the water on a warm summer morning. In coastal communities like Talisay City, Cebu, simple trips to the beach are part of daily life, providing families with opportunities for recreation, bonding, and connection with the natural environment.",
    likes: 0, comments: []
  },
  {
    id: "watin-4", title: "Fresh Cut Season", category: "People", photographer: "watin",
    img: "images/photos/watin-4.jpg",
    caption: "A barber carefully trims a client's hair inside a neighborhood barbershop. Though often taken for granted, barbers provide essential services that help people maintain hygiene, comfort, and confidence, especially during summer.",
    likes: 0, comments: []
  },
  {
    id: "watin-5", title: "Learning to See", category: "Moments", photographer: "watin",
    img: "images/photos/watin-5.jpg",
    caption: "A young art student begins a sketch while observing the coastal landscape during an outdoor drawing session. Though often viewed as a simple exercise, preliminary sketches help artists develop observation, patience, and the ability to translate everyday scenes into meaningful works of art.",
    likes: 0, comments: []
  },
  {
    id: "watin-6", title: "The Heart of the Family", category: "People", photographer: "watin",
    img: "images/photos/watin-6.jpg",
    caption: "A family matriarch poses during her birthday celebration as relatives gather to mark another year of her life. In many Filipino families, birthdays serve as important occasions that bring generations together, strengthening family bonds, and honoring elders who help hold the family together.",
    likes: 0, comments: []
  }
];

/* ---------------------- Home "Collection" display order ----------------------
   Curated, best-first order for the Home page paginated grid, so the strongest
   images sit on page 1 even though every photo starts at 0 likes in production.
   The Home grid sorts by likes first, then falls back to this order — so once
   real visitors start liking, popular photos rise to the top automatically.
   Any photo not listed here simply appears after the listed ones.            */
const FEATURED_ORDER = [
  // Page 1 — a strong mix across photographers
  "villanueva-3", "ayao-3", "watin-3", "nanola-2",
  "sanchez-1", "oli-2", "aguja-1", "santos-2",
  // Page 2
  "nanola-3", "watin-1", "ayao-1", "sanchez-3",
  "galvez-3", "valeza-2", "villanueva-2", "sagario-3",
  // Page 3
  "oli-1", "aguja-3", "watin-6", "santos-3",
  "sanchez-2", "nanola-1", "galvez-1", "villanueva-1",
  // Page 4
  "aguja-4", "watin-2", "sanchez-4", "valeza-3",
  "sagario-1", "oli-3", "ayao-2", "santos-1",
  // Page 5
  "villanueva-4", "watin-4", "aguja-5", "sanchez-5",
  "valeza-1", "sagario-2", "galvez-2", "watin-5",
  // Page 6
  "villanueva-5", "aguja-2", "valeza-4", "sagario-5",
  "sagario-4", "santos-4", "valeza-5", "valeza-6"
];

/* helper: look up a photographer record by id */
function getPhotographer(id) {
  return PHOTOGRAPHERS.find(p => p.id === id) || { name: "Unknown", role: "", portrait: PLACEHOLDER_PORTRAIT };
}
