/* =====================================================================
   FACETS OF THE ORDINARY — Exhibit data
   ---------------------------------------------------------------------
   THE IDEA
   This exhibit highlights subjects that are often overlooked, unnoticed,
   or underrepresented within a setting — not the usual vendors, products
   or crowds, but the porters, cleaners, back rooms, discarded materials
   and quiet in-between moments that keep a place alive.

   Photographs are grouped into four facets of the ordinary:
     • People   — the unseen hands that keep a setting running
     • Spaces   — the worn, hidden, behind-the-scenes places
     • Objects  — discarded, worn-out, or forgotten things
     • Moments  — the quiet pauses no one stops to notice

   This file is the single source of truth for the whole site:
     - PHOTOGRAPHERS  → the Photographers page (one profile card each)
     - PHOTOS         → the Gallery grid + photo viewer
     - INSTRUCTOR     → the adviser profile shown on the Home page
   Replace each `img`/`portrait` with your real files, update the text,
   and Home, Gallery and Photographers all update automatically.

   To add a real photo:
     1. Drop the file into  /images/photos/   (e.g. porter.jpg)
     2. Set  img: "images/photos/porter.jpg"
     3. Fill in title, caption, category (one of the four facets) and the
        photographer id.
   ===================================================================== */

const PLACEHOLDER = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ---------------------- Instructor (Home page) ---------------------- */
/* Replace with your real adviser / instructor details. */
const INSTRUCTOR = {
  name: "Prof. [Instructor Name]",
  title: "Exhibit Adviser & Photography Instructor",
  institution: "[Department / School]",
  portrait: PLACEHOLDER("instructor-portrait", 600, 750),
  foreword: "I asked them to photograph what a place would rather you didn't notice. What they brought back is a quiet argument that nothing in a setting is truly ordinary."
};

/* ---------------------- Photographers (10) ---------------------- */
const PHOTOGRAPHERS = [
  {
    id: "mara", name: "Mara Velasco", facet: "People", role: "People — The Unseen Hands",
    location: "Quezon City, PH", portrait: PLACEHOLDER("mara-portrait", 600, 750),
    quote: "Every place is held up by people we walk straight past.",
    bio: "Mara follows the workers who arrive before the doors open and leave after the lights go out — porters, cleaners, runners. She photographs the labour a setting depends on but rarely looks at.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "reign", name: "Reign Santos", facet: "People", role: "People — After Hours",
    location: "Bacolod City, PH", portrait: PLACEHOLDER("reign-portrait", 600, 750),
    quote: "Look at who is still working when everyone else has gone home.",
    bio: "Reign photographs the closing shift — the staff who reset a space for tomorrow long after the crowd has left. Her work insists that the end of the day has a workforce of its own.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "jomar", name: "Jomar Dela Cruz", facet: "People", role: "People — Hands of the City",
    location: "Zamboanga City, PH", portrait: PLACEHOLDER("jomar-portrait", 600, 750),
    quote: "A city is built by people whose faces never make the photo.",
    bio: "Jomar rides with delivery and transport workers, documenting the side entrances and back doors where everything a place sells actually arrives.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "kai", name: "Kai Mendoza", facet: "Spaces", role: "Spaces — Forgotten Spaces",
    location: "Cebu City, PH", portrait: PLACEHOLDER("kai-portrait", 600, 750),
    quote: "The back room tells you more than the storefront ever will.",
    bio: "Kai documents storage corners and service corridors — the places customers are never meant to see. To him, the worn-out edges of a setting are where its real story lives.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "althea", name: "Althea Ramos", facet: "Spaces", role: "Spaces — Rooms That Remember",
    location: "Baguio City, PH", portrait: PLACEHOLDER("althea-portrait", 600, 750),
    quote: "Empty rooms still remember everyone who passed through.",
    bio: "Althea shoots stairwells, stockrooms and the half-lit spaces between destinations — interiors that hold the residue of a hundred ordinary errands.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "bryan", name: "Bryan Aquino", facet: "Spaces", role: "Spaces — Side Entrances",
    location: "Tacloban City, PH", portrait: PLACEHOLDER("bryan-portrait", 600, 750),
    quote: "The exit nobody photographs is the one everyone uses.",
    bio: "Bryan is drawn to loading bays, alleys and back entrances — the thresholds that do all the work while the main doors take the credit.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "luis", name: "Luis Tan", facet: "Objects", role: "Objects — Discarded & Worn",
    location: "Davao City, PH", portrait: PLACEHOLDER("luis-portrait", 600, 750),
    quote: "What a place throws away says what it values.",
    bio: "A still-life photographer drawn to the broken, the taped-up and the left-behind. Luis treats a cracked crate or a worn counter like a portrait — patient, lit, and seen on its own terms.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "carmela", name: "Carmela Yu", facet: "Objects", role: "Objects — Wear & Repair",
    location: "Dumaguete City, PH", portrait: PLACEHOLDER("carmela-portrait", 600, 750),
    quote: "Wear and tear is just proof that something was useful.",
    bio: "Carmela photographs mended tools, taped handles and objects repaired one too many times — the quiet evidence of a thing kept in service far past its first life.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "ines", name: "Inés Cardoza", facet: "Moments", role: "Moments — Quiet Moments",
    location: "Iloilo City, PH", portrait: PLACEHOLDER("ines-portrait", 600, 750),
    quote: "The most honest second is the one between the busy ones.",
    bio: "Inés waits for the pause — the rest between rushes, the counting at close, the breath no one performs for a camera. Her work lingers on the unguarded moments that hold a long day together.",
    socials: { instagram: "#", behance: "#" }
  },
  {
    id: "noel", name: "Noel Pascual", facet: "Moments", role: "Moments — In-Between",
    location: "Vigan City, PH", portrait: PLACEHOLDER("noel-portrait", 600, 750),
    quote: "The truest expression is the one between two tasks.",
    bio: "Noel photographs waiting itself — the empty aisle, the dimmed stall, the small stillness a place falls into the moment no one needs anything from it.",
    socials: { instagram: "#", behance: "#" }
  }
];

/* ---------------------- Photographs ---------------------- */
/* category options (the four facets):
   "People", "Spaces", "Objects", "Moments"                              */
const PHOTOS = [
  {
    id: "p01",
    title: "The Vegetable Porter",
    caption: "Before the market wakes, he has already carried half of it on his back. The crowd will never see this hour.",
    category: "People",
    photographer: "mara",
    img: PLACEHOLDER("foo-01", 900, 1200),
    likes: 0,
    comments: []
  },
  {
    id: "p02",
    title: "Storage Behind Stall 14",
    caption: "A metre of darkness behind a metre of display — where the whole stall actually lives.",
    category: "Spaces",
    photographer: "kai",
    img: PLACEHOLDER("foo-02", 1000, 800),
    likes: 0,
    comments: []
  },
  {
    id: "p03",
    title: "Discarded Crates",
    caption: "Stacked, splintered, and waiting to be useful again. The unglamorous backbone of every delivery.",
    category: "Objects",
    photographer: "luis",
    img: PLACEHOLDER("foo-03", 1000, 1000),
    likes: 0,
    comments: []
  },
  {
    id: "p04",
    title: "Break Between Rushes",
    caption: "Head on her arms for ninety seconds. The only quiet the day will offer her.",
    category: "Moments",
    photographer: "ines",
    img: PLACEHOLDER("foo-04", 900, 1150),
    likes: 0,
    comments: []
  },
  {
    id: "p05",
    title: "Closing Shift",
    caption: "Long after the last customer, a cleaner gives the floor back its shine for no one.",
    category: "People",
    photographer: "reign",
    img: PLACEHOLDER("foo-05", 950, 1180),
    likes: 0,
    comments: []
  },
  {
    id: "p06",
    title: "Service Corridor",
    caption: "The hallway every order passes through and no shopper ever walks.",
    category: "Spaces",
    photographer: "althea",
    img: PLACEHOLDER("foo-06", 1100, 850),
    likes: 0,
    comments: []
  },
  {
    id: "p07",
    title: "The Worn Counter",
    caption: "Taped, scuffed, re-taped. A surface that has weighed a thousand mornings.",
    category: "Objects",
    photographer: "luis",
    img: PLACEHOLDER("foo-07", 1000, 1180),
    likes: 0,
    comments: []
  },
  {
    id: "p08",
    title: "Counting the Day",
    caption: "Worn hands and small coins — the real measure of the hours just spent.",
    category: "Moments",
    photographer: "ines",
    img: PLACEHOLDER("foo-08", 900, 1200),
    likes: 0,
    comments: []
  },
  {
    id: "p09",
    title: "Delivery, Side Entrance",
    caption: "Everything the store sells arrives here first, through the door marked 'staff only'.",
    category: "People",
    photographer: "jomar",
    img: PLACEHOLDER("foo-09", 1100, 820),
    likes: 0,
    comments: []
  },
  {
    id: "p10",
    title: "Loading Bay, Noon",
    caption: "Concrete worn smooth by trolleys. The unsung threshold between outside and in.",
    category: "Spaces",
    photographer: "bryan",
    img: PLACEHOLDER("foo-10", 1120, 840),
    likes: 0,
    comments: []
  },
  {
    id: "p11",
    title: "Left Behind",
    caption: "A single work glove on the floor at close. Someone's whole shift, in one object.",
    category: "Objects",
    photographer: "carmela",
    img: PLACEHOLDER("foo-11", 950, 1150),
    likes: 0,
    comments: []
  },
  {
    id: "p12",
    title: "Last Light, Stall Row",
    caption: "The aisle after everyone has gone — the setting finally allowed to rest.",
    category: "Moments",
    photographer: "noel",
    img: PLACEHOLDER("foo-12", 1150, 800),
    likes: 0,
    comments: []
  }
];

/* helper: look up a photographer record by id */
function getPhotographer(id) {
  return PHOTOGRAPHERS.find(p => p.id === id) || { name: "Unknown", role: "", portrait: "" };
}
