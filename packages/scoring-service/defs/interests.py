# https://gist.github.com/mbejda/19012b99a12e9d014389

interestsData = [
    # Industries
    "Accounting",
    "Airlines / Aviation",
    "Alternative Medicine",
    "Animation",
    "Apparel / Fashion",
    "Architecture",
    "Arts / Crafts",
    "Automotive",
    "Banking",
    "Biotechnology",
    "Greentech",
    "Broadcast Media",
    "Building Materials",
    "Business Supplies / Equipment",
    # "Capital Markets", # using Finance
    "Chemicals",
    "Civic / Social Organization",
    "Civil Engineering",
    "Commercial Real Estate",
    # "Computer Games", # Using Video Games from Hobbies
    "Computer Hardware",
    "Computer Networking",
    "Computer Software / Engineering",
    "Computer / Network Security",
    "Construction",
    "Consumer Goods",
    "Consumer Services",
    "Cosmetics",
    "Dairy",
    "Defense / Space",
    "Design",
    "E-Learning",
    "Entertainment",
    "Farming",
    "Finance",
    "Fine Art",
    # "Fishery",
    # "Food Production",
    # "Food / Beverages",
    "Fundraising",
    # "Furniture",
    # "Gambling / Casinos",
    # "Glass / Ceramics / Concrete",
    # "Government Administration",
    # "Government Relations",
    "Graphic Design / Web Design",
    "Health / Fitness",
    "Higher Education / Acadamia",
    "Hospital / Health Care",
    "Hospitality",
    "Human Resources / HR",
    # "Import / Export",
    # "Individual / Family Services",
    "Industrial Automation",
    # "Information Services",
    "Information Technology / IT",
    "Insurance",
    "International Affairs",
    "International Trade",
    "Internet",
    "Investment Banking / Venture",
    # "Investment Management / Hedge Fund / Private Equity",
    "Judiciary",
    "Law Enforcement",
    "Law Practice / Law Firms",
    "Legal Services",
    # "Legislative Office",
    "Leisure / Travel",
    # "Library",
    # "Logistics / Procurement",
    "Luxury Goods / Jewelry",
    "Machinery",
    # "Management Consulting",
    # "Maritime",
    "Market Research",
    "Marketing / Advertising / Sales",
    "Industrial Engineering",
    "Media Production",
    "Medical Equipment",
    "Medical Practice",
    "Mental Health Care",
    "Military Industry",
    "Mining / Metals",
    # "Motion Pictures / Film",
    "Museums / Institutions",
    # "Music",
    "Nanotechnology",
    "Newspapers / Journalism",
    "Non - Profit / Volunteering",
    # "Oil / Energy / Solar / Greentech",
    "Online Publishing",
    # "Other Industry",
    # "Outsourcing / Offshoring",
    # "Package / Freight Delivery",
    # "Packaging / Containers",
    # "Paper / Forest Products",
    "Performing Arts",
    "Pharmaceuticals",
    "Philanthropy",
    "Photography",
    "Plastics",
    "Political Organization",
    "Primary / Secondary Education",
    "Printing",
    "Professional Training",
    "Program Development",
    "Public Relations / PR",
    "Public Safety",
    "Publishing Industry",
    # "Railroad Manufacture",
    "Ranching",
    "Real Estate / Mortgage",
    "Recreational Facilities / Services",
    "Religious Institutions",
    # "Renewables / Environment",
    "Research Industry",
    "Restaurants",
    "Retail Industry",
    "Security / Investigations",
    "Semiconductors",
    "Shipbuilding",
    "Sporting Goods",
    "Sports",
    "Staffing / Recruiting",
    "Supermarkets",
    "Telecommunications",
    "Textiles",
    # "Think Tanks",
    # "Tobacco",
    "Translation / Localization",
    "Transportation",
    # "Utilities",
    "Venture Capital / VC",
    "Veterinary",
    # "Warehousing",
    # "Wholesale",
    "Wine / Spirits",
    # "Wireless",
    "Writing / Editing",

    # Hobbies
    "Baking",
    "Bartending",
    "Beer Tasting",
    "Breadmaking",
    "Confectionery",
    "Cooking",
    "Tea",
    "Homebrewing",
    "Recipes",
    "Wine Tasting",
    "Breakfast and Brunch",
    "Dinner",
    "Appetizers and Snacks",
    "Dessert",
    "Soup",
    "Diet",
    "World Cuisine",
    "French",
    "Chinese",
    "Italian",
    "Japanese",
    "Greek",
    "Spanish",
    "Mediterranean",
    "Lebanese",
    "Moroccan",
    "Turkish",
    "Thai",
    "Indian",
    "Cajun",
    "Mexican",
    "Caribbean",
    "German",
    "Russian",
    "Hungarian",
    "American",
    "Acting",
    "Anime",
    "Ceramics",
    "Coloring",
    "Craft",
    "Crocheting",
    "Cross-Stitch",
    "Decorating",
    "Drawing",
    "Embroidery",
    "Fashion",
    "Fingerpainting",
    "Macrame",
    "Manga",
    # "Miniature Art",
    "Minimalism",
    "Nail Art",
    "Origami",
    "Painting",
    "Photography",
    # "Plastic Art",
    "Pottery",
    "Quilting",
    "Scrapbooking",
    "Sculpting",
    "Sketching",
    "Tapestry",
    # "Diorama",
    # "Whittling",
    # "Rock Painting",
    "Sand Art",
    # "Twirling",
    "Bowling",
    "Dance",
    "Fantasy Sports",
    "Juggling",
    "Karate",
    "Pilates",
    "Yoga",
    "Air Sports",
    "Baseball",
    "Basketball",
    "BMX",
    "Bodybuilding",
    "Canoeing",
    "Croquet",
    "Cycling",
    "Dodgeball",
    "Gymnastics",
    "Hunting",
    "Kayaking",
    "Lacrosse",
    "Longboarding",
    "Motor Sports",
    "Mountain Biking",
    "Parkour",
    "Pickleball",
    "Powerlifting",
    "Rafting",
    "Rock Climbing",
    "Roller Skating",
    "Rugby",
    "Running",
    "Sailing",
    # "Shuffleboard",
    "Skateboarding",
    "Skiing",
    "Snowboarding",
    "Soccer",
    "Surfing",
    "Swimming",
    "Tennis",
    "Unicycling",
    "Water Sports",
    "Air Hockey",
    "Badminton",
    "Boxing",
    "Cheerleading",
    "Cribbage",
    "Curling",
    "Dancing",
    "Esports",
    "Fencing",
    "Hockey",
    "Ice Skating",
    "Weightlifting",
    "Wrestling",
    "Archery",
    "American Football",
    "Car Racing",
    "Cricket",
    "Disc Golf",
    "Fishing",
    "Frisbee",
    "Golfing",
    "Horseback Riding",
    "Boating",
    "Rowing",
    "Triathlon",
    "Volleyball",
    "Beatboxing",
    "Karaoke",
    "Music",
    # "Spoken Word",
    "Singing",
    # "Blues",
    # "Country",
    # "Easy Listening",
    # "Electronic",
    # "Folk",
    # "Hip hop",
    # "Jazz",
    # "Pop",
    # "R&B",
    # "Accordion",
    # "Banjo",
    # "Bagpipe",
    # "Bass Guitar",
    # "Bugle",
    # "Cello",
    # "Clarinet",
    # "Drums",
    # "Guitar",
    # "Flute",
    # "French Horn",
    # "Piano",
    # "Harmonica",
    # "Harp",
    # "MIDI",
    # "Mandolin",
    # "Marimba",
    # "Oboe",
    # "Saxophone",
    # "Sitar",
    # "Tambourine",
    # "Trombone",
    # "Trumpet",
    # "Tuba",
    # "Ukulele",
    # "Vibraphone",
    # "Violin",
    # "Xylophone",
    # "Zither",
    "3D Printing",
    "Animation",
    "Blacksmithing",
    "Restoration",
    "Candle Making",
    "Candy Making",
    "Car Building",
    "Cheesemaking",
    "Coffee Roasting",
    "Programming / Coding",
    "3D Art",
    "Digital Art",
    "DJing",
    "Drama",
    "Fashion Design",
    "Filmmaking",
    "Flower Arranging",
    "Furniture Building",
    "Furniture Design",
    "Glassblowing",
    "Graphic Design",
    # "Hairstyle",
    "Inventing",
    "Jewelry Making",
    "Knitting",
    # "Lace Making",
    # "Lego Building",
    "Podcasting",
    "Makeup",
    "Metalworking",
    "Model Building",
    "Modeling",
    "Public Speaking",
    # "Puppetry",
    "Sewing",
    "Shoemaking",
    "Soapmaking",
    "Tattooing",
    "Taxidermy",
    "Comedy",
    "Video Editing",
    "Video Making",
    "Watch Making",
    "Weaving",
    "Winemaking",
    "Woodworking",
    "Auto Detailing",
    "Beekeeping",
    "Blacksmithing",
    "Flying",
    "Videography",
    "UI Design",
    "Magic",
    "Fishkeeping",
    "Blogging",
    "Journaling",
    "Calligraphy",
    "Creative Writing",
    "Non-Fiction Writing",
    "Foreign Language",
    "Giving Advice",
    "Poetry",
    "Editing",
    "Quizzes",
    "Stories",
    "Lyrics",
    "Board Games",
    "Card Games",
    "Chess",
    "Puzzles",
    # "Rubik's Cube",
    "Video Games",
    "VR Games",
    # "Backgammon",
    # "Checkers",
    # "Chess",
    # "Dominoes",
    # "Laser Tag",
    # "Model Racing",
    # "Poker",
    # "Pool",
    # "Ping Pong",
    "Babysitting",
    "Cars",
    "Meditation",
    "Pet Sitting",
    "Practical Jokes",
    "Book Reading",
    "Social Media",
    "Thrifting",
    "Watching Movies",
    "Watching TV",
    # "Yo-yoing",
    "Birdwatching",
    "Camping",
    "Darts",
    "Driving",
    "Hiking",
    "Kite Flying",
    "Motorcycling",
    "Safari",
    "Shopping",
    "Sledding",
    "Snorkeling",
    "Snowmobiling",
    "Tourism",
    "Travel",
    "Vacation",
    "Walking",
    "Community Activism",
    "Electronics",
    "Robots",
    "Geology",
    "Astronomy",
    "Meteorology",
    "Volunteering",
    "Archaeology",
    "Astronomy",
    "Aerospace",
    "Biology",
    "Botany",
    "Business",
    "Chemistry",
    "Entrepreneurship",
    "Geography",
    "History",
    "Linguistics",
    "Literature",
    "Mathematics",
    "Medical Science",
    "Mycology",
    "Neuroscience",
    "Philosophy",
    "Physics",
    "Psychology",
    "Sociology",
    "Sports Science",
    "Life Science",
    "Teaching",
    "Learning",
    "Microscopy",
    "Research",
    "Airplanes",
    "Meteorology",
    "Architecture",
    # "Postcards",
    # "Stamps",
    "Foraging",
    "Metal Detecting",
    "Action Figures",
    "Antiquing",
    "Crystals",
    "Dolls",
    "Films",
    "Perfume",
    "Shoes",
    "Sports Memorabilia",
    "Vintage Cars",
    "Vintage Clothing",
    "Vinyl Records",
    "Fossil Hunting",
    # "Leaves",
    "Metal Detecting",
    "Collecting",
    "Construction",
    "DIY",
    "Engraving",
    "Fish Farming",
    # "Fish Keeping",
    "Gardening",
    "Hardware",
    "Home Improvement",
    "Houseplants",
    "Hydroponics",
    "Machining",
    "Mechanics",
    "Refinishing",
    "Welding",
    "Composting",
    "Dog Training",
    # "Dog Walking",
    "Farming",
    "Renovating",
    "Scuba Diving",
    "Paragliding",
    "Skydiving",
    "Storm Chasing",
    "Survivalism",
]