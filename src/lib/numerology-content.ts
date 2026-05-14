/**
 * Numerology Content Dictionary
 * High-quality, professional numerology descriptions for Life Path Numbers 1-9
 */

export interface NumberContent {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  coreEssence: string;
  strengths: string[];
  challenges: string[];
  strategicFocus2026: {
    title: string;
    description: string;
    actionItems: string[];
  };
  careerAlignment: string[];
  relationshipDynamics: string;
  powerColors: string[];
  luckyNumbers: number[];
}

export const numerologyContent: Record<number, NumberContent> = {
  1: {
    number: 1,
    title: "The Independent Leader",
    subtitle: "The Pioneer of New Beginnings",
    description: "You were born to lead, innovate, and blaze trails where others see only obstacles. As a Life Path 1, you carry the energy of creation, independence, and raw ambition. You are the architect of your destiny, naturally drawn to positions of authority and innovation.",
    coreEssence: "Your essence is that of the sovereign individual — self-reliant, determined, and fiercely original. You don't follow paths; you create them.",
    strengths: [
      "Natural leadership ability and executive presence",
      "Innovative thinking and creative problem-solving",
      "Unwavering determination and resilience",
      "Independence and self-sufficiency",
      "Pioneering spirit and risk tolerance"
    ],
    challenges: [
      "Can be overly stubborn or headstrong",
      "May struggle with delegation and teamwork",
      "Prone to impatience with slower-paced individuals",
      "Self-criticism when not meeting high standards"
    ],
    strategicFocus2026: {
      title: "The Year of Empire Building",
      description: "2026 is your powerhouse year. The numerological vibration aligns perfectly with your natural abilities. This is the year to launch that venture, assert your authority, and make your mark.",
      actionItems: [
        "Launch or scale your primary business venture",
        "Assert leadership in your industry or community",
        "Take calculated risks that others would avoid",
        "Build systems that allow for scalable growth"
      ]
    },
    careerAlignment: [
      "Entrepreneurship & Founder roles",
      "Executive Management (CEO, COO)",
      "Innovation & R&D Leadership",
      "Sales & Business Development",
      "Political Leadership"
    ],
    relationshipDynamics: "You need a partner who respects your independence and matches your ambition. Avoid controlling or needy dynamics. Your ideal partner is your equal — someone building their own empire alongside yours.",
    powerColors: ["Red", "Gold", "Black"],
    luckyNumbers: [1, 10, 19, 28]
  },

  2: {
    number: 2,
    title: "The Strategic Diplomat",
    subtitle: "The Master of Connection & Harmony",
    description: "You are the bridge-builder, the mediator, the one who sees all sides and finds the middle path. As a Life Path 2, you possess an innate ability to read people, sense underlying dynamics, and create harmony where chaos exists. Your power lies in cooperation, not confrontation.",
    coreEssence: "Your essence is that of the cosmic diplomat — intuitive, sensitive, and deeply connected to the emotional currents around you. You are the glue that holds teams, families, and partnerships together.",
    strengths: [
      "Exceptional emotional intelligence and empathy",
      "Master mediator and conflict resolver",
      "Patient and supportive of others' growth",
      "Detail-oriented with strong analytical skills",
      "Loyal and deeply committed in relationships"
    ],
    challenges: [
      "May suppress own needs to please others",
      "Can be overly sensitive to criticism",
      "Decision paralysis from seeing all perspectives",
      "Prone to procrastination through over-analysis"
    ],
    strategicFocus2026: {
      title: "The Year of Strategic Partnerships",
      description: "2026 rewards your collaborative nature. This is not the year to go it alone. Your biggest wins will come through strategic alliances, joint ventures, and leveraging your network.",
      actionItems: [
        "Form 2-3 key strategic partnerships",
        "Take a behind-the-scenes leadership role",
        "Focus on relationship-based revenue streams",
        "Develop your emotional intelligence into a professional asset"
      ]
    },
    careerAlignment: [
      "Diplomacy & International Relations",
      "Human Resources & Talent Management",
      "Counseling & Therapy",
      "Mediation & Law",
      "Partnership-based Business Development"
    ],
    relationshipDynamics: "You thrive in partnerships. Your ideal relationship is one of mutual support and shared vision. You need someone who communicates openly and values emotional intimacy as much as you do.",
    powerColors: ["Silver", "Pearl White", "Soft Blue"],
    luckyNumbers: [2, 11, 20, 29]
  },

  3: {
    number: 3,
    title: "The Creative Communicator",
    subtitle: "The Expression of Joy & Innovation",
    description: "You are the voice, the artist, the messenger. As a Life Path 3, you carry the gift of expression — whether through words, art, music, or pure charisma. You are here to inspire, entertain, and bring light to the world through your creative output.",
    coreEssence: "Your essence is pure creative expression. You are the cosmic storyteller, blessed with the ability to take complex ideas and make them accessible, engaging, and transformative.",
    strengths: [
      "Natural charisma and magnetic presence",
      "Exceptional communication and storytelling skills",
      "Artistic talent across multiple mediums",
      "Optimism and ability to uplift others",
      "Quick wit and improvisational genius"
    ],
    challenges: [
      "May scatter energy across too many projects",
      "Can be sensitive to criticism of creative work",
      "Prone to procrastination through perfectionism",
      "Sometimes lacks follow-through on exciting ideas"
    ],
    strategicFocus2026: {
      title: "The Year of Creative Breakthrough",
      description: "2026 is your year to be seen and heard. The energy supports public speaking, content creation, and artistic projects. This is the year your creative work reaches its audience.",
      actionItems: [
        "Launch your podcast, newsletter, or content platform",
        "Speak at 3+ major events or conferences",
        "Complete and publish your creative magnum opus",
        "Build a personal brand around your unique voice"
      ]
    },
    careerAlignment: [
      "Media & Entertainment",
      "Marketing & Public Relations",
      "Writing & Journalism",
      "Teaching & Training",
      "Creative Direction"
    ],
    relationshipDynamics: "You need a partner who appreciates your creative spirit and doesn't try to cage you. Boredom is your enemy — your ideal relationship is playful, intellectually stimulating, and full of adventure.",
    powerColors: ["Yellow", "Orange", "Pink"],
    luckyNumbers: [3, 12, 21, 30]
  },

  4: {
    number: 4,
    title: "The Master Builder",
    subtitle: "The Foundation of Stability & Success",
    description: "You are the architect, the planner, the one who makes things happen. As a Life Path 4, you possess an unmatched ability to take abstract visions and turn them into concrete reality. You are the backbone of any successful enterprise — reliable, methodical, and extraordinarily capable.",
    coreEssence: "Your essence is that of the cosmic engineer — practical, disciplined, and driven by the satisfaction of building things that last. You don't dream; you execute.",
    strengths: [
      "Exceptional planning and organizational skills",
      "Unmatched work ethic and reliability",
      "Financial acumen and resource management",
      "Problem-solving through systematic analysis",
      "Loyalty and dependability in all commitments"
    ],
    challenges: [
      "Can be rigid or resistant to change",
      "May overwork to the point of burnout",
      "Prone to pessimism or excessive caution",
      "Sometimes struggles with abstract thinking"
    ],
    strategicFocus2026: {
      title: "The Year of Solid Foundation",
      description: "2026 rewards your methodical approach. This is the year to build systems, establish infrastructure, and create the foundation for long-term wealth and stability. Your slow-and-steady approach wins the race.",
      actionItems: [
        "Build or optimize business systems and processes",
        "Invest in long-term assets and real estate",
        "Create financial plans for the next 5-10 years",
        "Establish your reputation as the reliable expert"
      ]
    },
    careerAlignment: [
      "Engineering & Architecture",
      "Finance & Banking",
      "Project Management",
      "Construction & Real Estate Development",
      "Operations Management"
    ],
    relationshipDynamics: "You need a partner who values stability and commitment. Flakiness is a dealbreaker. Your ideal relationship is built on shared values, practical partnership, and deep trust.",
    powerColors: ["Green", "Brown", "Navy Blue"],
    luckyNumbers: [4, 13, 22, 31]
  },

  5: {
    number: 5,
    title: "The Freedom Explorer",
    subtitle: "The Agent of Change & Adventure",
    description: "You are the adventurer, the catalyst, the one who cannot be contained. As a Life Path 5, you carry the energy of freedom, change, and evolution. You are here to experience all that life offers, break boundaries, and show others what true liberation looks like.",
    coreEssence: "Your essence is pure freedom and adaptability. You are the cosmic explorer, driven by curiosity and the thrill of the new. Stagnation is your enemy; growth and adventure are your lifeblood.",
    strengths: [
      "Exceptional adaptability and resilience",
      "Natural talent for sales and persuasion",
      "Versatile skill set across multiple domains",
      "Charismatic and socially magnetic",
      "Quick learner who thrives on change"
    ],
    challenges: [
      "May struggle with commitment and consistency",
      "Can be impulsive or easily distracted",
      "Prone to excess in food, drink, or experiences",
      "Sometimes lacks long-term planning"
    ],
    strategicFocus2026: {
      title: "The Year of Breakthrough Change",
      description: "2026 is your year of transformation. The energy supports major life changes — career pivots, relocations, or business launches. Embrace the chaos; your breakthrough lies on the other side of comfort.",
      actionItems: [
        "Make one major career or lifestyle change",
        "Expand into a new geographic market or location",
        "Launch a venture that leverages your versatility",
        "Build systems that support location independence"
      ]
    },
    careerAlignment: [
      "Sales & Business Development",
      "Travel & Tourism",
      "Media & Communications",
      "Entrepreneurship (multiple ventures)",
      "Consulting across industries"
    ],
    relationshipDynamics: "You need a partner who matches your energy and love for adventure. Possessiveness is a dealbreaker. Your ideal relationship is built on mutual freedom, shared adventures, and constant growth.",
    powerColors: ["Turquoise", "Purple", "Crimson"],
    luckyNumbers: [5, 14, 23, 32]
  },

  6: {
    number: 6,
    title: "The Nurturing Visionary",
    subtitle: "The Guardian of Harmony & Responsibility",
    description: "You are the caregiver, the protector, the one who creates beauty and balance wherever you go. As a Life Path 6, you carry a deep sense of responsibility for others and an innate desire to create harmony in all environments. You are the heart of your community and family.",
    coreEssence: "Your essence is that of the cosmic nurturer — loving, responsible, and deeply connected to home and family. You are the safe harbor in life's storms.",
    strengths: [
      "Deep empathy and natural healing abilities",
      "Strong sense of responsibility and commitment",
      "Artistic eye with impeccable taste",
      "Excellent mediator and peacekeeper",
      "Generous and selflessly supportive"
    ],
    challenges: [
      "May sacrifice own needs for others",
      "Can be overly controlling in caring ways",
      "Prone to worry and anxiety about loved ones",
      "Sometimes struggles with boundary-setting"
    ],
    strategicFocus2026: {
      title: "The Year of Harvest & Home",
      description: "2026 rewards your nurturing energy with tangible results. This is the year your investments of time and energy in others pay dividends. Focus on family, home, and service-oriented ventures.",
      actionItems: [
        "Launch or expand a service-based business",
        "Invest in property or home improvements",
        "Deepen family and community relationships",
        "Create systems that allow others to thrive under your guidance"
      ]
    },
    careerAlignment: [
      "Healthcare & Healing Arts",
      "Education & Training",
      "Interior Design & Architecture",
      "Hospitality & Service Industry",
      "Non-profit & Community Leadership"
    ],
    relationshipDynamics: "You thrive in committed, long-term partnerships. Your ideal relationship is one of deep emotional intimacy, shared values, and mutual care. You need someone who values family as much as you do.",
    powerColors: ["Rose", "Ivory", "Emerald"],
    luckyNumbers: [6, 15, 24, 33]
  },

  7: {
    number: 7,
    title: "The Mystic Seeker",
    subtitle: "The Philosopher of Hidden Knowledge",
    description: "You are the seeker, the analyst, the one who looks beneath the surface. As a Life Path 7, you carry an insatiable thirst for knowledge, truth, and understanding. You are here to question, investigate, and uncover wisdom that others miss.",
    coreEssence: "Your essence is that of the cosmic philosopher — intuitive, analytical, and deeply connected to the mysteries of existence. You are the bridge between the seen and unseen worlds.",
    strengths: [
      "Exceptional analytical and critical thinking",
      "Deep intuition and psychic sensitivity",
      "Natural talent for research and investigation",
      "Independent thinking and original insights",
      "Spiritual wisdom and metaphysical understanding"
    ],
    challenges: [
      "May struggle with emotional expression",
      "Can be overly skeptical or cynical",
      "Prone to isolation or social withdrawal",
      "Sometimes gets lost in abstract thinking"
    ],
    strategicFocus2026: {
      title: "The Year of Deep Knowing",
      description: "2026 supports your quest for deeper understanding. This is the year to master a specialized field, publish your research, or develop intuitive abilities. Your power lies in depth, not breadth.",
      actionItems: [
        "Complete advanced certifications or deep study",
        "Develop or launch an information-based product",
        "Build a platform to share your specialized knowledge",
        "Balance analytical work with spiritual development"
      ]
    },
    careerAlignment: [
      "Research & Development",
      "Data Science & Analytics",
      "Philosophy & Academia",
      "Psychology & Counseling",
      "Metaphysical & Spiritual Teaching"
    ],
    relationshipDynamics: "You need a partner who respects your need for solitude and intellectual independence. Small talk drains you; deep discourse feeds you. Your ideal relationship is one of intellectual partnership and mutual respect for space.",
    powerColors: ["Violet", "Indigo", "Silver"],
    luckyNumbers: [7, 16, 25, 34]
  },

  8: {
    number: 8,
    title: "The Executive Wealth Builder",
    subtitle: "The Master of Power & Material Success",
    description: "You are the powerhouse, the magnate, the one who turns ambition into empire. As a Life Path 8, you carry an innate understanding of power, money, and material success. You are here to master the material world and build wealth that creates freedom for yourself and others.",
    coreEssence: "Your essence is that of the cosmic executive — ambitious, authoritative, and gifted in the arts of business and finance. You are the bridge between vision and material manifestation.",
    strengths: [
      "Natural executive and business leader",
      "Exceptional financial acumen",
      "Strong sense of justice and fairness",
      "Ability to motivate and lead large organizations",
      "Visionary thinking with practical execution"
    ],
    challenges: [
      "May become overly focused on material success",
      "Can be workaholic or neglect personal life",
      "Sometimes struggles with work-life balance",
      "Prone to controlling behavior in leadership"
    ],
    strategicFocus2026: {
      title: "The Year of Financial Breakthrough",
      description: "2026 is your year of material expansion. The energy supports wealth creation, business growth, and financial optimization. This is the year to scale significantly and secure your financial future.",
      actionItems: [
        "Scale your primary business or investment portfolio",
        "Optimize all financial systems and tax strategies",
        "Mentor others while building your empire",
        "Balance wealth accumulation with meaningful impact"
      ]
    },
    careerAlignment: [
      "Executive Leadership (CEO, CFO)",
      "Finance & Investment Banking",
      "Real Estate Development",
      "Law & Corporate Governance",
      "Entrepreneurship (high-growth ventures)"
    ],
    relationshipDynamics: "You need a partner who is strong, independent, and aligned with your vision. Weakness doesn't attract you; strength does. Your ideal relationship is a power partnership where both partners build empires together.",
    powerColors: ["Gold", "Black", "Deep Red"],
    luckyNumbers: [8, 17, 26, 35]
  },

  9: {
    number: 9,
    title: "The Humanitarian Guide",
    subtitle: "The Visionary of Global Impact",
    description: "You are the visionary, the humanitarian, the one who sees the big picture. As a Life Path 9, you carry the energy of completion, wisdom, and service to humanity. You are here to elevate others, share your gifts, and leave the world better than you found it.",
    coreEssence: "Your essence is that of the cosmic humanitarian — compassionate, wise, and deeply connected to the collective evolution. You are the elder soul who has seen it all and now guides others.",
    strengths: [
      "Broad perspective and big-picture thinking",
      "Natural teacher and mentor",
      "Deep compassion and desire to serve",
      "Creative and artistic expression",
      "Ability to synthesize complex ideas"
    ],
    challenges: [
      "May give to the point of depletion",
      "Can be aloof or emotionally detached",
      "Prone to dramatic endings and transitions",
      "Sometimes struggles with practical details"
    ],
    strategicFocus2026: {
      title: "The Year of Global Impact",
      description: "2026 is your year to expand your impact beyond your immediate circle. The energy supports teaching, mentoring, and reaching wider audiences with your message. This is the year to complete old cycles and begin your true work.",
      actionItems: [
        "Launch a platform to share your wisdom broadly",
        "Mentor or teach systematically",
        "Complete or close projects that no longer serve your mission",
        "Align all work with your larger purpose of service"
      ]
    },
    careerAlignment: [
      "Education & Teaching",
      "Non-profit Leadership",
      "Arts & Entertainment",
      "Coaching & Mentoring",
      "Humanitarian & Environmental Work"
    ],
    relationshipDynamics: "You need a partner who shares your humanitarian values and desire to make a difference. Superficial connections don't satisfy you. Your ideal relationship is one of shared purpose and spiritual connection.",
    powerColors: ["White", "Crimson", "Gold"],
    luckyNumbers: [9, 18, 27, 36]
  }
};

/**
 * Get content for a specific Life Path Number
 * @param number - Life Path Number (1-9)
 * @returns Number content or undefined if invalid
 */
export function getNumberContent(number: number): NumberContent | undefined {
  return numerologyContent[number];
}

/**
 * Get all available numbers
 * @returns Array of available Life Path Numbers
 */
export function getAvailableNumbers(): number[] {
  return Object.keys(numerologyContent).map(Number);
}
