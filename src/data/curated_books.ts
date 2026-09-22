import { LibraryBook } from '../types';

export const CURATED_LIBRARY: LibraryBook[] = [
  {
    id: "meditations-marcus",
    title: "Meditations",
    author: "Marcus Aurelius",
    description: "Private journals of the Roman Emperor Marcus Aurelius detailing Stoic philosophy, self-discipline, duty, mortality, and finding inner peace amidst outer chaos.",
    category: "Philosophy",
    language: "English",
    gradeLevel: "College",
    difficulty: "Intermediate",
    isPublicDomain: true,
    downloadUrl: "https://www.gutenberg.org/files/55317/55317-h/55317-h.htm",
    authorSourceUrl: "https://en.wikipedia.org/wiki/Marcus_Aurelius",
    chapters: [
      {
        id: "meditations-ch1",
        title: "Book II: On Duty and Inner Peace",
        content: `When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil. But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own—not of the same blood or birth, but the same mind, and possessing a share of the divine. And so none of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my relative, or hate him. We were made to work together like feet, hands, and eyes, like the rows of the upper and lower teeth. To obstruct each other is unnatural. To feel anger at someone, to turn your back on him: these are obstructions.\n\nEvery hour focus your mind attentively, as a Roman and a human being, on doing what is before you with strict and simple dignity, with feeling of affection, freedom, and justice—and on freeing yourself from all other thoughts. You will do this if you perform each action as if it were your last, avoiding all distraction, all emotional subversion of your reason, all hypocrisy, self-love, and discontent with your lot. You see how few things you have to master to live a life of tranquil flow and godliness. If you do this, the gods themselves will ask nothing more of you.`
      },
      {
        id: "meditations-ch2",
        title: "Book IV: The Inner Citadel",
        content: `People look for retreats for themselves, in the country, by the coast, or in the hills; and you too are especially prone to this yearning. But this is altogether unphilosophical, when it is possible for you to retreat into yourself at any hour you please. For nowhere can a man find a quieter or more untroubled retreat than in his own soul; especially one who has such resources within him that by merely looking into them he is immediately in perfect peace. And by peace I mean nothing other than well-ordered harmony. Grant yourself this retirement continually, and refresh yourself in it.\n\nLet your principles be brief and fundamental, the kind that will at once restore your serenity and send you back without any irritation to the life to which you must return. What is it that irritates you? The wickedness of humanity? Recall the Stoic judgment that rational beings exist for one another, that tolerance is a part of justice, and that people do wrong involuntarily. Look at how many have lived in enmity, suspicion, hatred, and warfare, and are now dead and turned to ashes. Cease then your anger.\n\nRemember too that you are not harmed by what happens, but by your opinion of what happens. Eliminate your opinion, and you are immediately safe. Say to yourself: 'I am not hurt.' and the hurt vanishes.`
      },
      {
        id: "meditations-ch3",
        title: "Book VII: The Cosmic Harmony",
        content: `Look at the past—the rise and fall of great empires, the endless cycle of wars, alliances, dynasties. You can foresee the future too, for it will certainly be of the exact same character; it cannot break from the rhythm of what is happening now. Therefore, to study human life for forty years is the same as studying it for ten thousand years. For what more will you see?\n\nKeep your mind aligned with the Logos—the rational principle that governs the cosmos. Everything that happens is part of the grand tapestry of nature. If you are assigned a difficult role, play it with supreme dignity and honor. Do not complain. The rational mind is self-determining: it can turn any obstacle into an opportunity, just as a blazing fire consumes whatever is thrown into it and uses it to burn brighter.\n\nTime is a river, a raging torrent of things that come into being. No sooner is a thing brought to sight than it is swept away and another takes its place, only to be swept away in turn. Hold fast to what is eternal, and do not let yourself be tossed about by the temporary waves of fame, wealth, or physical discomfort.`
      }
    ]
  },
  {
    id: "the-republic-plato",
    title: "The Republic",
    author: "Plato",
    description: "Plato's seminal dialogue exploring justice, the ideal city-state (Kallipolis), the nature of reality, and the famous Allegory of the Cave.",
    category: "Philosophy",
    language: "English",
    gradeLevel: "College",
    difficulty: "Advanced",
    isPublicDomain: true,
    downloadUrl: "https://www.gutenberg.org/files/1497/1497-h/1497-h.htm",
    authorSourceUrl: "https://en.wikipedia.org/wiki/Plato",
    chapters: [
      {
        id: "republic-ch1",
        title: "Chapter I: The Nature of Justice",
        content: `The dialogue begins at the house of Cephalus in the Piraeus. Socrates and Glaucon are invited to stay and engage in a deep conversation about old age and wealth. Cephalus suggests that wealth is useful because it helps a man avoid lying, cheating, and leaving debts unpaid to gods or men, which is what Cephalus considers justice.\n\nSocrates challenges this definition with a counterexample: if a friend of sound mind lends you weapons, and then asks for them back when he is mad, is it just to return them? Clearly not. Therefore, justice cannot simply be telling the truth and returning what you have borrowed.\n\nPolemarchus then offers a poetical definition from Simonides: justice is giving each his due, which he interprets as doing good to friends and harm to enemies. Socrates refutes this by arguing that harming anyone—even an enemy—makes that person worse and less virtuous. Since the practice of justice cannot make people less just, justice cannot involve doing harm to anyone.\n\nThrasymachus breaks in angrily, declaring that 'justice is nothing but the interest of the stronger.' Socrates dissects this sophism, showing that a true ruler, like a doctor or a pilot, rules not for his own benefit, but for the welfare of his subjects.`
      },
      {
        id: "republic-ch2",
        title: "Chapter VII: The Allegory of the Cave",
        content: `Socrates asks Glaucon to imagine human beings living in an underground cave, which has a mouth open towards the light. They have been there since childhood, chained by their legs and necks so that they cannot move, and can only look straight ahead. Behind them is a fire, and between the fire and the prisoners is a raised path along which puppets and objects are carried, casting shadows on the wall opposite the prisoners. The prisoners mistake these shadows for reality, having never seen anything else.\n\nIf one of these prisoners is freed and forced to stand up, turn around, and look toward the firelight, he would suffer sharp pains. The glare would distress him, and he would be unable to see the realities of which he formerly saw the shadows. He would believe that the shadows were truer than the physical objects being carried past.\n\nIf he is then dragged up the steep ascent of the cave into the bright sunlight, his eyes would be dazzled, and he would be unable to see anything at first. Over time, he would adjust: first seeing shadows, then reflections in water, then the physical objects themselves, and finally he would be able to gaze upon the sun itself. He would realize that the sun governs the visible world and is the cause of all things he and his fellow prisoners used to see.\n\nReturning to the cave to free his fellows, his eyes would be unaccustomed to the darkness. His companions would laugh at him, saying his ascent had ruined his eyes, and they would kill anyone who tried to unchain them and lead them up into the light. This is the metaphor of education and enlightenment.`
      }
    ]
  },
  {
    id: "calculus-foundations",
    title: "Calculus & Limits: An Intuitive Guide",
    author: "Dr. Elizabeth Vance",
    description: "An intuitive, textbook-style guide to the foundations of calculus, covering limits, derivatives, integration, and their real-world applications.",
    category: "Mathematics",
    language: "English",
    gradeLevel: "College",
    difficulty: "Intermediate",
    isPublicDomain: false,
    downloadUrl: "",
    authorSourceUrl: "https://en.wikipedia.org/wiki/Calculus",
    chapters: [
      {
        id: "calc-ch1",
        title: "Chapter 1: The Beauty of the Limit",
        content: `At its core, calculus is the mathematics of change. Before calculus, math was static—it dealt with triangles, circles, and constant velocities. But the real world is dynamic: planets accelerate in elliptical orbits, populations grow exponentially, and stocks fluctuate wildly. To model this, we need a way to talk about change at an 'instant'. This is where the limit comes in.\n\nImagine you are driving a car and you travel 60 miles in one hour. Your average speed is 60 mph. But did you go exactly 60 mph at the 30-minute mark? You might have been stopped at a red light, or speeding down a highway at 80 mph. How do we measure your speed at an exact, singular instant?\n\nIf we try to use the algebra formula for speed, Speed = Distance / Time, we run into a major roadblock. At an exact instant, the elapsed time is 0, and the distance traveled is 0. Distance/Time becomes 0/0, which is mathematically undefined. The limit is the elegant bridge over this chasm. Instead of dividing by zero, we look at what happens as the elapsed time gets closer and closer to zero—say, 0.1 seconds, 0.001 seconds, 0.00001 seconds. The value that this ratio approaches as the interval shrinks is the limit. It is the foundation upon which all of calculus stands.`
      },
      {
        id: "calc-ch2",
        title: "Chapter 2: Derivatives and Slopes",
        content: `The derivative is simply the mathematical word for the rate of change. Graphically, if you plot a function on an x-y coordinate system, the derivative at any point is the slope of the tangent line to the curve at that exact point.\n\nFor a straight line, the slope is constant—it is the same everywhere. But for a curved line, like a parabola y = x^2, the slope is constantly changing. To find the slope at a specific point x, we choose a second point close by, say x + h, and draw a line through both points. The slope of this secant line is given by: [f(x+h) - f(x)] / h.\n\nBy taking the limit as h approaches 0, the second point slides along the curve until it merges with the first point. The secant line becomes the tangent line, and its slope is the derivative f'(x). For y = x^2, this limit evaluates beautifully to f'(x) = 2x. This simple formula tells us that at x = 3, the curve is rising at a rate of 6 units vertically for every 1 unit horizontally. Derivatives allow us to optimize systems, find peak efficiencies, and predict trajectories with extreme precision.`
      }
    ]
  },
  {
    id: "cosmology-astrophysics",
    title: "Cosmology & Astrophysics",
    author: "Prof. Arthur Eddington",
    description: "A comprehensive handbook on astrophysics, stellar nucleosynthesis, black hole thermodynamics, and the holographic principle.",
    category: "Science",
    language: "English",
    gradeLevel: "College",
    difficulty: "Advanced",
    isPublicDomain: true,
    downloadUrl: "https://archive.org/details/internalconstitu00eddiuoft",
    authorSourceUrl: "https://en.wikipedia.org/wiki/Arthur_Eddington",
    chapters: [
      {
        id: "astro-ch1",
        title: "Chapter 1: Stellar Nucleosynthesis",
        content: `Every heavy atom in your body—the iron in your blood, the calcium in your bones, the carbon in your DNA—was forged inside the nuclear furnace of a dying star. This is the truth of stellar nucleosynthesis.\n\nStars are born in giant clouds of hydrogen gas called nebulae. Under the pull of gravity, these clouds collapse and heat up. When the core temperature reaches about 15 million Kelvin, hydrogen nuclei (protons) begin to fuse together in a process called the proton-proton chain. This nuclear fusion releases a tremendous amount of energy in the form of gamma-ray photons, which push outward against the inward pull of gravity, keeping the star in a stable state known as hydrostatic equilibrium.\n\nWhen a massive star runs out of hydrogen, its core contracts and heats up further, allowing helium to fuse into carbon and oxygen. This process continues, forging increasingly heavier elements like neon, silicon, and sulfur, in concentric shells resembling an onion. However, this process hits a dead end at iron. Fusing iron does not release energy; it absorbs it. Without outward fusion pressure, the star collapses under its own massive gravity in a fraction of a second, resulting in a spectacular supernova explosion that scatters these forged elements across the galaxy, seeding new planets and life.`
      },
      {
        id: "astro-ch2",
        title: "Chapter 2: Black Hole Thermodynamics",
        content: `For decades, black holes were thought to be simple, eternal graves of matter from which nothing could escape. But in 1974, Stephen Hawking turned physics on its head by showing that black holes are thermodynamic objects with a temperature, entropy, and thermal radiation.\n\nAccording to quantum field theory, empty space is not actually empty; it is filled with virtual particle-antiparticle pairs that constantly pop into existence and annihilate each other. If such a pair is created right at the event horizon of a black hole, one particle can fall into the black hole while the other escapes into space. To an outside observer, the escaping particle appears to be radiation emitted by the black hole—now known as Hawking Radiation.\n\nBecause energy must be conserved, the escaping particle carries away a tiny amount of the black hole's mass. Over eons, black holes will slowly evaporate and disappear. The entropy of a black hole, remarkably, is not proportional to its three-dimensional volume, but to the two-dimensional surface area of its event horizon. This formula, S = (k * A) / (4 * Lp^2), suggested a profound and mind-bending possibility: the Holographic Principle, which states that all information contained in a 3D volume of space can be fully encoded on a 2D boundary surrounding it.`
      }
    ]
  },
  {
    id: "ai-transformers",
    title: "AI Systems & Transformers Guide",
    author: "Dr. Sharon Lee",
    description: "An in-depth, professional guide to modern artificial intelligence, deep learning, the Transformer architecture, vector embeddings, and RAG.",
    category: "AI",
    language: "English",
    gradeLevel: "Professional",
    difficulty: "Advanced",
    isPublicDomain: false,
    downloadUrl: "",
    authorSourceUrl: "https://en.wikipedia.org/wiki/Transformer_(deep_learning_model)",
    chapters: [
      {
        id: "ai-ch1",
        title: "Chapter 1: Self-Attention Mechanisms",
        content: `Before the Transformer architecture was introduced in 2017, natural language processing relied on recurrent neural networks (RNNs) and LSTMs. These systems processed text word-by-word, sequentially. If a sentence had fifty words, the model had to run fifty sequential steps. This made parallel processing on GPUs impossible and led to 'forgetting' information over long distances.\n\nTransformers solved this with the Self-Attention mechanism. Instead of processing sequentially, a Transformer looks at the entire sentence simultaneously. It calculates mathematical relationships between every word and every other word in the text. For example, in the sentence 'The bank of the river had a lot of clay, whereas the financial bank had money,' self-attention allows the model to connect 'bank' to 'river' in the first clause, and 'bank' to 'financial' in the second, instantly disambiguating their meanings.\n\nMathematically, this is done by projecting each word's vector representation into three spaces: Queries (Q), Keys (K), and Values (V). The attention score is calculated by taking the dot product of the Queries and Keys, scaling it, applying a softmax function to get weights, and multiplying by the Values: Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(dk) ) * V. This allows massive parallelization and is the core engine behind Gemini, GPT, and Claude.`
      },
      {
        id: "ai-ch2",
        title: "Chapter 2: Vector Embeddings & RAG",
        content: `How do large language models represent human concepts? They use Vector Embeddings. An embedding is a high-dimensional vector (often 768 or 1536 dimensions) of floating-point numbers that represents the semantic meaning of a piece of text. Words or chunks of text with similar meanings are located close together in this high-dimensional vector space.\n\nWhile LLMs possess vast parametric knowledge stored in their weights, they suffer from two key limitations: knowledge cutoff dates and hallucinations when asked about highly specific, niche, or private data. Retrieval-Augmented Generation (RAG) is the gold-standard solution.\n\nRAG operates in three stages: ingest, retrieve, and generate. First, documents are chunked and converted into vector embeddings using models like gemini-embedding-2-preview, then stored in a Vector Database. When a user asks a question, the query is embedded, and the vector database performs a cosine similarity search to retrieve the most relevant document chunks. These chunks are then injected into the LLM's prompt context as an authoritative source, enabling the model to generate accurate, cited, and hallucination-free answers.`
      }
    ]
  },
  {
    id: "constitutional-law",
    title: "Constitutional Law & Civil Liberties",
    author: "Hon. Sarah Jenkins",
    description: "A textbook on constitutional law, discussing judicial review, freedom of speech, equal protection, and monumental supreme court precedents.",
    category: "Law",
    language: "English",
    gradeLevel: "Professional",
    difficulty: "Advanced",
    isPublicDomain: false,
    downloadUrl: "",
    authorSourceUrl: "https://en.wikipedia.org/wiki/Constitutional_law",
    chapters: [
      {
        id: "law-ch1",
        title: "Chapter 1: Judicial Review & Marbury",
        content: `The foundation of American constitutional law lies in the power of Judicial Review—the authority of courts to declare laws enacted by Congress, or actions taken by the Executive branch, as unconstitutional and therefore void. This power is not explicitly detailed in the text of the Constitution itself, but was established in the monumental Supreme Court decision Marbury v. Madison (1803).\n\nWriting for a unanimous court, Chief Justice John Marshall established the judicial branch as a co-equal branch of government. Marshall famously declared: 'It is emphatically the province and duty of the judicial department to say what the law is.'\n\nMarshall's reasoning was brilliantly simple: the Constitution is the supreme law of the land, superior to any ordinary act of legislature. If an act of Congress conflicts with the Constitution, the court must follow the Constitution, rendering the act void. To argue otherwise would be to say that the legislature's power is superior to the Constitution that created it. This established the Supreme Court as the ultimate guardian of constitutional boundaries, a cornerstone of the checks and balances system.`
      },
      {
        id: "law-ch2",
        title: "Chapter 2: Freedom of Speech & Precedents",
        content: `The First Amendment states that 'Congress shall make no law... abridging the freedom of speech, or of the press.' While this phrasing sounds absolute, constitutional jurisprudence has established that some forms of speech can be regulated, while others receive the highest tier of protection.\n\nPolitical and ideological speech lies at the very core of First Amendment protections. To regulate such speech based on its content, the government must pass the highest level of judicial scrutiny—Strict Scrutiny. Under strict scrutiny, the government must prove that its regulation is necessary to achieve a compelling government interest, and that the law is narrowly tailored using the least restrictive means possible.\n\nCertain categories of speech are unprotected by the First Amendment altogether, including obscenity, defamation, fraud, incitement to imminent lawless action (established in Brandenburg v. Ohio), and true threats. In Brandenburg, the Court ruled that speech advocating illegal conduct is protected unless it is directed to inciting or producing 'imminent lawless action' and is 'likely to incite or produce such action.' This high threshold protects even offensive speech, ensuring robust, open public discourse.`
      }
    ]
  }
];
