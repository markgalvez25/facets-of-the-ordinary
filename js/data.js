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
  name: "Prof. [Instructor Name]",
  title: "Exhibit Adviser & Photography Instructor",
  institution: "[Department / School]",
  portrait: PLACEHOLDER_PORTRAIT,
  foreword: "I asked them to photograph what a place would rather you didn't notice. What they brought back is a quiet argument that nothing in a setting is truly ordinary."
};

/* ---------------------- Photographers (11) ----------------------
   Contributors with submitted work first, then those whose photos
   are still to come. Update the "coming soon" entries once their
   personal photo, bio and subject photos arrive.                    */
const PHOTOGRAPHERS = [
  {
    id: "aguja", name: "Ayna Vor Aguja", facet: "", role: "Profile coming soon",
    portrait: PLACEHOLDER_PORTRAIT,
    bio: "Profile and works coming soon."
  },
  {
    id: "ayao", name: "Lin Mark Ayao", facet: "", role: "Profile coming soon",
    portrait: PLACEHOLDER_PORTRAIT,
    bio: "Profile and works coming soon."
  },
  {
    id: "galvez", name: "Mark Arnold Galvez", facet: "People", role: "People — Everyday Labour",
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
    portrait: PLACEHOLDER_PORTRAIT,
    bio: "Zeus photographs the quiet pauses behind ordinary life — waiting, resting, mourning, studying and healing — the in-between moments most people pass by without noticing."
  },
  {
    id: "sanchez", name: "Albert Sanchez", facet: "", role: "Profile coming soon",
    portrait: PLACEHOLDER_PORTRAIT,
    bio: "Profile and works coming soon."
  },
  {
    id: "santos", name: "Rey Christian Santos", facet: "Moments", role: "Moments — In-Between Moments",
    portrait: "images/portraits/santos.jpg",
    bio: "Rey Christian A. Santos is a Multimedia Arts professor and visual storyteller with a passion for photography, filmmaking, and digital media. His work often explores everyday experiences, highlighting the people, places, and moments that quietly shape communities. Beyond teaching, he enjoys exploring urban spaces, creating visual narratives, and discovering new perspectives through art and culture. He values creativity, lifelong learning, and meaningful human connections, and is drawn to warm, earthy tones that reflect the beauty found in ordinary life."
  },
  {
    id: "valeza", name: "Richard Valeza", facet: "People", role: "Street — Everyday Scenes",
    portrait: "images/portraits/valeza.jpg",
    bio: "Richard's street frames look at everyday market and neighbourhood life. Titles and write-ups for his collection are still to come."
  },
  {
    id: "villanueva", name: "Charissa Villanueva", facet: "Spaces", role: "Spaces — Between the Stops",
    portrait: "images/portraits/villanueva.jpg",
    bio: "Charissa Villanueva works as a freelance digital artist, who specializes in video editing, graphic design, and content creation. Outside of work and school, they enjoy animation, watching films, exploring new places, and trying good food. She is a church person who values faith, family, and serving the community. Who is drawn to the colors orange and purple!"
  },
  {
    id: "watin", name: "Garry Allen Watin", facet: "", role: "Profile coming soon",
    portrait: PLACEHOLDER_PORTRAIT,
    bio: "Profile and works coming soon."
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
    caption: "A man is washing dishes using an automatic motor, which efficiently cleans them. We often overlook such mundane tasks because we focus on more aesthetically pleasing subjects. This photo conveys a message about our modern world, where we feel compelled to fulfill various obligations to meet our basic needs and sustain our daily lives.",
    likes: 0, comments: []
  },
  {
    id: "galvez-2", title: "Fight to Live", category: "People", photographer: "galvez",
    img: "images/photos/galvez-2.jpg",
    caption: "A teenager, under the scorching sun during lunchtime, without hesitation, pushed a cart of bottled water to deliver it to a customer. While others are focused in their own jobs and families, striving to meet their daily needs, this image often goes unnoticed. In reality, we are all trying to fulfill our essential needs, such as water, but we fail to recognize those who make sacrifices.",
    likes: 0, comments: []
  },
  {
    id: "galvez-3", title: "Patience for the Family", category: "People", photographer: "galvez",
    img: "images/photos/galvez-3.jpg",
    caption: "A small stall of Japanese cakes stood invitingly to customers, while the man, trying to pass the time, was engrossed in his mobile phone. The other individuals were busy with their own tasks. This image overlooks the fact that even when there are no customers, we need to survive. The man patiently waited for a customer to buy his Japanese cake, just to earn a small amount of money to support his family.",
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
    caption: "An ice cream vendor carefully scoops a treat onto a cone at his colorful street cart; a small towel draped over his shoulders to brave the heat. Amidst the heavy traffic and stressful rush of the city, he offers a familiar, comforting pause to passersby. This honors the simple joy he brings to the community, turning a basic street trade into a vital source of daily relief and connection.",
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
    caption: "Two perspectives in one, the image shows scooters in the foreground, riders patiently sitting outside, waiting for passenger bookings. It presents a slice of ordinary urban life, and the patience of waiting.",
    likes: 0, comments: []
  },
  {
    id: "sagario-2", title: "Siesta", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-2.jpg",
    caption: "This photo captures a quiet pause in the middle of household labor. Surrounded by laundry and everyday clutter, the cup of iced coffee becomes a small reward after continuous chores. The image reflects a simple but meaningful moment of rest, showing how ordinary routines also carry exhaustion, comfort, and personal care.",
    likes: 0, comments: []
  },
  {
    id: "sagario-3", title: "Funeral Wake", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-3.jpg",
    caption: "This photo captures a solemn moment during a funeral wake, where family members and visitors gather in prayer and quiet reflection. The scene shows the ordinary but deeply meaningful act of mourning, where presence, silence, and shared faith become a way of giving comfort to the grieving family.",
    likes: 0, comments: []
  },
  {
    id: "sagario-4", title: "Mock-Up", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-4.jpg",
    caption: "This photo captures a quiet but important academic moment where students present and defend their capstone project before an audience. The empty chairs in the foreground, the projected screen, and the small group gathered in front reflect the preparation, pressure, and teamwork behind every final presentation.",
    likes: 0, comments: []
  },
  {
    id: "sagario-5", title: "My Pedia", category: "Moments", photographer: "sagario",
    img: "images/photos/sagario-5.jpg",
    caption: "This photo captures a quiet moment during a routine pediatric visit, where a mother holds her child while the doctor provides care and guidance. The scene reflects the ordinary yet important experience of check-ups and vaccination, showing trust, protection, and the shared responsibility of keeping a child healthy.",
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
  {
    id: "santos-5", title: "Untitled", category: "People", photographer: "santos",
    img: "images/photos/santos-5.jpg",
    caption: "",
    likes: 0, comments: []
  },

  /* ---- Richard Valeza (titles & write-ups to come) ---- */
  {
    id: "valeza-1", title: "Untitled 1", category: "People", photographer: "valeza",
    img: "images/photos/valeza-1.jpg", caption: "", likes: 0, comments: []
  },
  {
    id: "valeza-2", title: "Untitled 2", category: "People", photographer: "valeza",
    img: "images/photos/valeza-2.jpg", caption: "", likes: 0, comments: []
  },
  {
    id: "valeza-3", title: "Untitled 3", category: "People", photographer: "valeza",
    img: "images/photos/valeza-3.jpg", caption: "", likes: 0, comments: []
  },
  {
    id: "valeza-4", title: "Untitled 4", category: "People", photographer: "valeza",
    img: "images/photos/valeza-4.jpg", caption: "", likes: 0, comments: []
  },
  {
    id: "valeza-5", title: "Untitled 5", category: "People", photographer: "valeza",
    img: "images/photos/valeza-5.jpg", caption: "", likes: 0, comments: []
  },
  {
    id: "valeza-6", title: "Untitled 6", category: "People", photographer: "valeza",
    img: "images/photos/valeza-6.jpg", caption: "", likes: 0, comments: []
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
    caption: "Raindrops blur the view of passing traffic from the open rear entrance of a jeepney. While passengers focus entirely on reaching their destination, this small passenger entrance shows how jeepneys act as a temporary shelter separating the commuters from the wet city streets.",
    likes: 0, comments: []
  },
  {
    id: "villanueva-3", title: "A Parallel Path", category: "Spaces", photographer: "villanueva",
    img: "images/photos/villanueva-3.jpg",
    caption: "A MRT train speeds away into the night as the designated passenger waiting lane rests completely empty. This frame captures a rare, peaceful pause on the platform where an ordinary transit space is caught in a quiet moment of rest before the next crowd arrives.",
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
    caption: "An unloading sign hangs above the designated drop-off lane at the bus station. While passengers usually just wait in line for their ride, this simple metal marker guides the behavior of both drivers and commuters to create an orderly system that never existed before.",
    likes: 0, comments: []
  }
];

/* helper: look up a photographer record by id */
function getPhotographer(id) {
  return PHOTOGRAPHERS.find(p => p.id === id) || { name: "Unknown", role: "", portrait: PLACEHOLDER_PORTRAIT };
}
