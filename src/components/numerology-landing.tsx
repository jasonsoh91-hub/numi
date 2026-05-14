"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  User,
  Apple,
  Download,
  Star,
  Crown,
  Target,
  Eye,
  Heart,
  Infinity,
  Gem,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

// ============================================================================
// NUMEROLOGY CALCULATION UTILITY
// ============================================================================

interface UserData {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  location: string;
  lifePathNumber: number;
}

/**
 * Calculates the Life Path Number from a date string (MM/DD/YYYY or YYYY-MM-DD)
 * Reduces to a single digit (1-9), except for Master Numbers (11, 22, 33)
 */
export function calculateLifePathNumber(dateString: string): number {
  // Remove any non-digit characters
  const cleanDate = dateString.replace(/\D/g, "");

  // If we have at least 8 digits (MMDDYYYY), process them
  if (cleanDate.length >= 8) {
    const digits = cleanDate.slice(-8).split("").map(Number);
    return reduceToSingleDigit(digits);
  }

  return 1; // Default fallback
}

/**
 * Recursively reduces an array of digits to a single digit (1-9)
 * Preserves Master Numbers (11, 22, 33)
 */
function reduceToSingleDigit(digits: number[]): number {
  const sum = digits.reduce((acc, digit) => acc + digit, 0);

  // Check for Master Numbers
  if (sum === 11 || sum === 22 || sum === 33) {
    return sum;
  }

  // If single digit, return it
  if (sum < 10) {
    return sum;
  }

  // Otherwise, reduce further
  return reduceToSingleDigit(String(sum).split("").map(Number));
}

// ============================================================================
// NUMEROLOGY CONTENT DICTIONARY (Numbers 1-9 + Master Numbers)
// ============================================================================

interface NumberProfile {
  number: number;
  title: string;
  subtitle: string;
  theme: string;
  color: string;
  icon: React.ReactNode;
  description: string;
  strengths: string[];
  challenges: string[];
  focus2026: {
    title: string;
    description: string;
    actionSteps: string[];
  };
  rulingPlanet: string;
  element: string;
  luckyNumbers: number[];
  compatibleNumbers: number[];
}

const numberProfiles: Record<number, NumberProfile> = {
  1: {
    number: 1,
    title: "The Independent Leader",
    subtitle: "Pioneer • Innovator • Trailblazer",
    theme: "Leadership & Ambition",
    color: "from-amber-500 to-orange-600",
    icon: <Crown className="w-full h-full" />,
    description:
      "As a Life Path 1, you are a natural-born leader destined to forge your own path. You possess an innate drive to be first, best, and original. Your journey is one of self-mastery, independence, and pioneering new territories. You are here to lead, not follow.",
    strengths: [
      "Natural leadership ability",
      "Innovative thinking and creativity",
      "Strong will and determination",
      "Self-reliance and independence",
      "Courage to take risks",
      "Ability to inspire others",
    ],
    challenges: [
      "Can be overly stubborn or rigid",
      "Tendency to be self-centered",
      "Difficulty delegating",
      "Impatience with slower paces",
      "Fear of showing vulnerability",
    ],
    focus2026: {
      title: "The Year of Strategic Expansion",
      description:
        "2026 is your power year. The universe is aligning to support your boldest initiatives, but requires calculated action over impulsive moves.",
      actionSteps: [
        "Launch that business or project you've been delaying",
        "Build strategic alliances (you can't do it alone)",
        "Develop your executive presence—polish your communication",
        "Invest in personal branding and visibility",
        "Take calculated risks, not reckless ones",
      ],
    },
    rulingPlanet: "Sun",
    element: "Fire",
    luckyNumbers: [1, 10, 19, 28],
    compatibleNumbers: [3, 5],
  },
  2: {
    number: 2,
    title: "The Strategic Peacemaker",
    subtitle: "Diplomat • Mediator • Connector",
    theme: "Partnership & Harmony",
    color: "from-slate-400 to-blue-500",
    icon: <Heart className="w-full h-full" />,
    description:
      "As a Life Path 2, you are a master of diplomacy and relationships. Your strength lies in cooperation, patience, and understanding the unspoken dynamics between people. You are the bridge-builder, the harmonizer who can see all sides and find middle ground.",
    strengths: [
      "Exceptional diplomatic skills",
      "High emotional intelligence",
      "Natural mediator and peacemaker",
      "Loyal and supportive partner",
      "Intuitive understanding of others",
      "Patience in complex situations",
    ],
    challenges: [
      "Over-sensitivity to criticism",
      "Difficulty making decisions",
      "Tendency to self-sacrifice",
      "Fear of conflict",
      "Can be overly dependent on others",
    ],
    focus2026: {
      title: "The Year of Empowered Collaboration",
      description:
        "2026 rewards your collaborative nature but challenges you to lead from within. Your strength lies not in standing alone, but in knowing who to stand beside.",
      actionSteps: [
        "Form or deepen 1-2 critical partnerships",
        "Learn to assert your needs without burning bridges",
        "Trust your intuition—it's your superpower",
        "Set boundaries even with those you love",
        "Your network IS your net worth—curate it carefully",
      ],
    },
    rulingPlanet: "Moon",
    element: "Water",
    luckyNumbers: [2, 11, 20, 29],
    compatibleNumbers: [4, 8],
  },
  3: {
    number: 3,
    title: "The Creative Communicator",
    subtitle: "Artist • Expresser • Optimist",
    theme: "Expression & Joy",
    color: "from-yellow-400 to-amber-500",
    icon: <Sparkles className="w-full h-full" />,
    description:
      "As a Life Path 3, you are a channel of creative expression and joy. You possess the gift of communication—whether through words, art, music, or pure presence. Your purpose is to inspire, uplift, and bring light to the world through your unique voice.",
    strengths: [
      "Natural creative talent",
      "Charismatic and socially engaging",
      "Optimistic and joyful disposition",
      "Excellent communicator",
      "Adaptable and versatile",
      "Ability to inspire and uplift others",
    ],
    challenges: [
      "Scattered energy and focus",
      "Tendency to be superficial",
      "Difficulty with emotional pain",
      "Procrastination through fun",
      "Can be overly critical of self",
    ],
    focus2026: {
      title: "The Year of Disciplined Creativity",
      description:
        "2026 is asking you to transform talent into mastery. The universe supports your creative expression but demands structure and commitment to meaningful output.",
      actionSteps: [
        "Choose ONE creative project to complete this year",
        "Monetize your communication skills—teach, consult, create",
        "Your audience awaits—build your platform consistently",
        "Balance play with productivity (you can do both)",
        "Collaborate with complementary talents (1s and 5s)",
      ],
    },
    rulingPlanet: "Jupiter",
    element: "Air",
    luckyNumbers: [3, 12, 21, 30],
    compatibleNumbers: [1, 9],
  },
  4: {
    number: 4,
    title: "The Practical Architect",
    subtitle: "Builder • Organizer • Stabilizer",
    theme: "Structure & Foundation",
    color: "from-emerald-500 to-teal-600",
    icon: <Target className="w-full h-full" />,
    description:
      "As a Life Path 4, you are the master of structure, order, and practical achievement. You possess the rare ability to take dreams and make them tangible through systematic effort. You are here to build foundations that last for generations.",
    strengths: [
      "Exceptional organizational skills",
      "Strong work ethic and reliability",
      "Practical problem-solving",
      "Attention to detail",
      "Loyal and dependable",
      "Ability to create lasting systems",
    ],
    challenges: [
      "Resistance to change",
      "Can be overly rigid or stubborn",
      "Toward workaholic tendencies",
      "Difficulty with ambiguity",
      "May lack flexibility in relationships",
    ],
    focus2026: {
      title: "The Year of Foundation Building",
      description:
        "2026 is your year to construct something enduring. Your systematic approach is rewarded—every disciplined action compounds into lasting legacy.",
      actionSteps: [
        "Build the systems that will scale your vision",
        "Invest in real estate or tangible assets",
        "Your reputation for reliability IS your brand",
        "Delegate details, keep your eyes on the blueprint",
        "Balance stability with calculated evolution",
      ],
    },
    rulingPlanet: "Rahu (North Node)",
    element: "Earth",
    luckyNumbers: [4, 13, 22, 31],
    compatibleNumbers: [2, 6],
  },
  5: {
    number: 5,
    title: "The Freedom Seeker",
    subtitle: "Adventurer • Explorer • Catalyst",
    theme: "Freedom & Change",
    color: "from-blue-500 to-indigo-600",
    icon: <Infinity className="w-full h-full" />,
    description:
      "As a Life Path 5, you are an agent of change and freedom. You thrive on variety, adventure, and pushing boundaries. Your purpose is to experience life fully and help others break free from limitation. You are the catalyst for transformation.",
    strengths: [
      "Adaptable and versatile",
      "Natural charm and magnetism",
      "Thrives on change and variety",
      "Excellent communicator",
      "Quick learner and curious mind",
      "Ability to inspire freedom in others",
    ],
    challenges: [
      "Restlessness and inconsistency",
      "Difficulty with commitment",
      "Toward impulsiveness",
      "Scattered energy and focus",
      "Fear of being tied down",
    ],
    focus2026: {
      title: "The Year of Focused Freedom",
      description:
        "2026 offers you multiple paths—not all lead to freedom. Your lesson: true freedom comes through mastery, not just movement. Choose your adventures wisely.",
      actionSteps: [
        "Select 2-3 income streams (not 10) and optimize them",
        "Channel your energy into ONE bold transformation",
        "Travel with purpose—network, don't just wander",
        "Build systems that earn while you explore",
        "Your adaptability is your competitive edge—use it strategically",
      ],
    },
    rulingPlanet: "Mercury",
    element: "Air",
    luckyNumbers: [5, 14, 23, 32],
    compatibleNumbers: [1, 7],
  },
  6: {
    number: 6,
    title: "The Nurturing Visionary",
    subtitle: "Healer • Protector • Harmonizer",
    theme: "Responsibility & Love",
    color: "from-rose-400 to-pink-600",
    icon: <Heart className="w-full h-full" />,
    description:
      "As a Life Path 6, you are a natural caregiver and community builder. Your essence is love, responsibility, and creating harmony wherever you go. You are here to nurture others, create beauty, and build communities that feel like family.",
    strengths: [
      "Natural nurturing ability",
      "Strong sense of responsibility",
      "Creates harmonious environments",
      "Loyal and devoted partner",
      "Artistic and creative",
      "Excellent mediator",
    ],
    challenges: [
      "Self-sacrifice to a fault",
      "Difficulty letting go",
      "Can be overprotective",
      "Perfectionism in caring for others",
      "Takes on others' burdens",
    ],
    focus2026: {
      title: "The Year of Compassionate Leadership",
      description:
        "2026 calls you to lead with love. Your nurturing energy scales when you teach others to care, not just do it all yourself. Build communities, not dependencies.",
      actionSteps: [
        "Create a community or membership around your expertise",
        "Your home is your sanctuary—optimize it for harmony",
        "Teach your caregiving skills—don't just give them away",
        "Health-focused ventures are blessed for you this year",
        "Boundaries are love—say no to serve more people",
      ],
    },
    rulingPlanet: "Venus",
    element: "Earth",
    luckyNumbers: [6, 15, 24, 33],
    compatibleNumbers: [4, 9],
  },
  7: {
    number: 7,
    title: "The Mystical Analyst",
    subtitle: "Seeker • Thinker • Philosopher",
    theme: "Wisdom & Truth",
    color: "from-violet-500 to-purple-700",
    icon: <Eye className="w-full h-full" />,
    description:
      "As a Life Path 7, you are a seeker of truth and deeper meaning. You possess a natural inclination toward spirituality, analysis, and understanding the hidden patterns of life. Your journey is one of inner discovery and sharing wisdom.",
    strengths: [
      "Deep analytical thinking",
      "Spiritual and philosophical insight",
      "Intuitive and perceptive",
      "Independent thinker",
      "Natural researcher",
      "Ability to see beyond surface appearances",
    ],
    challenges: [
      "Tendency toward isolation",
      "Skepticism that blocks connection",
      "Overthinking and analysis paralysis",
      "Difficulty with emotional expression",
      "Can seem distant or aloof",
    ],
    focus2026: {
      title: "The Year of Applied Wisdom",
      description:
        "2026 demands you take your insights public. Your research and revelations are meant to be shared, not hoarded. The world needs your perspective now.",
      actionSteps: [
        "Write that book, launch that course, share your framework",
        "Monetize your expertise through consulting or teaching",
        "Your depth attracts quality—position yourself as an authority",
        "Balance solitude with strategic networking",
        "Trust your intuition—it's already been validated by experience",
      ],
    },
    rulingPlanet: "Ketu (South Node)",
    element: "Water",
    luckyNumbers: [7, 16, 25, 34],
    compatibleNumbers: [5, 9],
  },
  8: {
    number: 8,
    title: "The Executive Wealth Builder",
    subtitle: "CEO • Authority • Material Master",
    theme: "Power & Abundance",
    color: "from-red-500 to-rose-600",
    icon: <Crown className="w-full h-full" />,
    description:
      "As a Life Path 8, you are a master of the material realm. You possess natural business acumen, financial intelligence, and the ability to manifest abundance. Your purpose is to achieve financial freedom and empower others to do the same.",
    strengths: [
      "Natural business leader",
      "Strong financial intelligence",
      "Ability to manifest material success",
      "Authoritative presence",
      "Strategic thinking",
      "Karma understanding—what goes around comes around",
    ],
    challenges: [
      "Can become overly materialistic",
      "Workaholic tendencies",
      "Difficulty with vulnerability",
      "Control issues",
      "Struggles with work-life balance",
    ],
    focus2026: {
      title: "The Year of Exponential Returns",
      description:
        "2026 is your wealth expansion year. Investments made in prior years compound now. Your challenge: scale without losing your soul or relationships in the process.",
      actionSteps: [
        "Double down on what's already working—no new pivots",
        "Build systems that remove you from daily operations",
        "Your reputation for results precedes you—leverage it",
        "Invest in appreciating assets and equity positions",
        "Give back—true abundance includes philanthropy",
      ],
    },
    rulingPlanet: "Saturn",
    element: "Earth",
    luckyNumbers: [8, 17, 26, 35],
    compatibleNumbers: [2, 4],
  },
  9: {
    number: 9,
    title: "The Humanitarian Legacy Builder",
    subtitle: "Visionary • Healer • Completion",
    theme: "Service & Transformation",
    color: "from-cyan-500 to-blue-600",
    icon: <Star className="w-full h-full" />,
    description:
      "As a Life Path 9, you are an old soul with a vision for humanity. You possess universal love, wisdom, and the desire to elevate the collective. Your purpose is to complete cycles and create lasting change that benefits many.",
    strengths: [
      "Universal compassion and love",
      "Natural healer and counselor",
      "Creative and artistic talent",
      "Visionary thinking",
      "Ability to see the big picture",
      "Wisdom from diverse experiences",
    ],
    challenges: [
      "Difficulty with endings and letting go",
      "Can be overly idealistic",
      "Self-sacrifice to a detrimental degree",
      "Mood swings and emotional intensity",
      "Trouble with practical details",
    ],
    focus2026: {
      title: "The Year of Global Impact",
      description:
        "2026 is your legacy year. Your message is meant to reach beyond your immediate circle. Scale your impact through technology, media, or mentorship.",
      actionSteps: [
        "Launch or scale your movement/platform/message",
        "Mentor others to multiply your impact",
        "Complete old cycles to make space for the new",
        "Your story is your currency—share it authentically",
        "Collaborate with global visionaries and systems thinkers",
      ],
    },
    rulingPlanet: "Mars",
    element: "Fire",
    luckyNumbers: [9, 18, 27, 36],
    compatibleNumbers: [3, 6],
  },
  11: {
    number: 11,
    title: "The Master Intuitive (11)",
    subtitle: "Visionary • Channel • Illuminated",
    theme: "Spiritual Leadership",
    color: "from-amber-300 to-yellow-500",
    icon: <Sparkles className="w-full h-full" />,
    description:
      "As a Master Number 11, you carry the frequency of spiritual illumination and intuition. You are a bridge between the physical and spiritual realms, here to bring visionary insights to humanity.",
    strengths: [
      "Powerful intuitive abilities",
      "Spiritual insight and wisdom",
      "Inspirational presence",
      "Creative vision",
      "Ability to uplift humanity",
    ],
    challenges: [
      "High nervous sensitivity",
      "Self-doubt despite gifts",
      "Difficulty grounding visions",
      "Overwhelmed by energies",
    ],
    focus2026: {
      title: "The Year of Anchored Vision",
      description: "2026 calls you to ground your spiritual insights into practical form. Your visions are meant to manifest, not just inspire.",
      actionSteps: [
        "Create tangible products from your spiritual insights",
        "Build platforms to share your wisdom",
        "Protect your energy while serving others",
      ],
    },
    rulingPlanet: "Moon (Amplified)",
    element: "Air",
    luckyNumbers: [11, 29, 38],
    compatibleNumbers: [2, 6],
  },
  22: {
    number: 22,
    title: "The Master Builder (22)",
    subtitle: "Architect • Manifestor • World-Changer",
    theme: "Masterful Creation",
    color: "from-orange-500 to-red-600",
    icon: <Target className="w-full h-full" />,
    description:
      "As the Master Builder 22, you combine the practicality of 4 with the vision of 11. You are here to build structures and systems that benefit humanity on a large scale.",
    strengths: [
      "Manifesting big visions into reality",
      "Combines intuition with practicality",
      "Natural leader of large projects",
      "Ability to think globally",
      "Transforms inspiration into form",
    ],
    challenges: [
      "Pressure of potential",
      "Fear of not achieving enough",
      "Balancing vision with execution",
      "Can overwork relentlessly",
    ],
    focus2026: {
      title: "The Year of Grand Realization",
      description: "2026 is the year your biggest visions can materialize. The universe supports your boldest building projects.",
      actionSteps: [
        "Launch your signature venture",
        "Build systems that scale your impact",
        "Partner with grounded doers",
      ],
    },
    rulingPlanet: "Kepler (Amplified)",
    element: "Earth",
    luckyNumbers: [22, 31, 49],
    compatibleNumbers: [4, 8],
  },
  33: {
    number: 33,
    title: "The Master Teacher (33)",
    subtitle: "Master Healer • Avatar • Selfless Servant",
    theme: "Divine Service",
    color: "from-rose-300 to-pink-500",
    icon: <Heart className="w-full h-full" />,
    description:
      "As the Master Teacher 33, you embody the pinnacle of spiritual love and service. You are here to uplift humanity through your healing presence and wisdom.",
    strengths: [
      "Profound healing ability",
      "Selfless love and devotion",
      "Natural teacher and guide",
      "Transmutes pain into wisdom",
      "Elevates all they encounter",
    ],
    challenges: [
      "Self-sacrifice to extremes",
      "Taking on others' karma",
      "Difficulty with boundaries",
      "Overwhelming sensitivity",
    ],
    focus2026: {
      title: "The Year of Sacred Service",
      description: "2026 asks you to expand your healing reach while maintaining your own well-being.",
      actionSteps: [
        "Teach your healing methods to scale impact",
        "Create sanctuaries for healing",
        "Balance giving with receiving",
      ],
    },
    rulingPlanet: "Master Number",
    element: "All Elements",
    luckyNumbers: [33, 42, 51],
    compatibleNumbers: [6, 9],
  },
};

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function NumerologyLanding() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    timeOfBirth: "",
    location: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [calculatedNumber, setCalculatedNumber] = useState<number>(1);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Refs for scroll triggering
  const resultsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const resultsInView = useInView(resultsRef, { once: true, amount: 0.3 });
  const profileInView = useInView(profileRef, { once: true, amount: 0.3 });
  const strengthsInView = useInView(strengthsRef, { once: true, amount: 0.3 });
  const focusInView = useInView(focusRef, { once: true, amount: 0.3 });
  const gapInView = useInView(gapRef, { once: true, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  const profile = numberProfiles[calculatedNumber] || numberProfiles[1];

  // Scroll to results when they appear
  useEffect(() => {
    if (showResults && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [showResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate calculation delay for effect
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Calculate the Life Path Number
    const lifePathNumber = calculateLifePathNumber(formData.dateOfBirth);
    setCalculatedNumber(lifePathNumber);

    // Create user data object
    const userDataObject: UserData = {
      fullName: formData.fullName.trim(),
      dateOfBirth: formData.dateOfBirth,
      timeOfBirth: formData.timeOfBirth || "Not provided",
      location: formData.location.trim(),
      lifePathNumber,
    };

    setUserData(userDataObject);

    // Log to console (ready for webhook integration)
    console.log("=".repeat(50));
    console.log("NUMEROLOGY USER DATA PAYLOAD:");
    console.log(JSON.stringify(userDataObject, null, 2));
    console.log("=".repeat(50));

    setShowResults(true);
    setIsSubmitting(false);

    // Scroll to results will happen in useEffect
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-x-hidden">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Sparkles className="w-6 h-6 text-amber-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                NUMI
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-slate-400"
            >
              The Science of Numbers
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2" />
                Discover Your Destiny Code
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Unlock Your </span>
              <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
                2026 Destiny
              </span>
              <br />
              <span className="text-white">Code.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12"
            >
              Discover the hidden strategy in your numbers. Enter your birth details
              to reveal your Life Path number and unlock your personalized blueprint
              for the year ahead.
            </motion.p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-2xl"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-left text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-amber-400" />
                    Full Name
                  </div>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-slate-800/50 border ${
                    errors.fullName ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
                />
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 text-left"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label htmlFor="dateOfBirth" className="block text-left text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-amber-400" />
                    Date of Birth
                  </div>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-3 bg-slate-800/50 border ${
                    errors.dateOfBirth ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all [color-scheme:dark]`}
                />
                {errors.dateOfBirth && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 text-left"
                  >
                    {errors.dateOfBirth}
                  </motion.p>
                )}
              </div>

              {/* Time of Birth (Optional) */}
              <div>
                <label htmlFor="timeOfBirth" className="block text-left text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-amber-400" />
                    Time of Birth
                    <span className="ml-2 text-slate-500 font-normal">(optional)</span>
                  </div>
                </label>
                <input
                  type="time"
                  id="timeOfBirth"
                  name="timeOfBirth"
                  value={formData.timeOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all [color-scheme:dark]"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-left text-sm font-medium text-slate-300 mb-2">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-amber-400" />
                    Location / City
                  </div>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your city of birth"
                  className={`w-full px-4 py-3 bg-slate-800/50 border ${
                    errors.location ? "border-red-500" : "border-white/10"
                  } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all`}
                />
                {errors.location && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400 text-left"
                  >
                    {errors.location}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                variants={scaleIn}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY as any, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Calculate My Destiny Code</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>

          {/* Scroll Indicator */}
          {!showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <ChevronDown className="w-6 h-6 mx-auto text-slate-600 animate-bounce" />
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <AnimatePresence mode="wait">
        {showResults && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 sm:px-6 lg:px-8"
          >
            <div className="max-w-6xl mx-auto">
              {/* Number Reveal */}
              <motion.div
                initial="hidden"
                animate={resultsInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="text-center mb-16"
              >
                <motion.p
                  variants={fadeInUp}
                  className="text-amber-400 font-medium mb-4"
                >
                  Your Life Path Number
                </motion.p>

                <motion.div
                  variants={scaleIn}
                  className="relative inline-block"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${profile.color} blur-3xl opacity-30 rounded-full`} />
                  <div className={`relative w-40 h-40 sm:w-48 sm:h-48 mx-auto bg-gradient-to-br ${profile.color} rounded-full flex items-center justify-center shadow-2xl`}>
                    <div className="text-white">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-2 mx-auto">
                        {profile.icon}
                      </div>
                      <span className="text-6xl sm:text-7xl font-bold">
                        {profile.number}
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl font-bold mt-8 mb-2"
                >
                  {profile.title}
                </motion.h2>

                <motion.p
                  variants={fadeInUp}
                  className="text-slate-400 text-lg"
                >
                  {profile.subtitle}
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap justify-center gap-4 mt-6"
                >
                  <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-white/10">
                    <span className="text-slate-400 text-sm">Ruling Planet:</span>
                    <span className="text-white ml-2">{profile.rulingPlanet}</span>
                  </div>
                  <div className="px-4 py-2 bg-slate-800/50 rounded-full border border-white/10">
                    <span className="text-slate-400 text-sm">Element:</span>
                    <span className="text-white ml-2">{profile.element}</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Description */}
              <motion.div
                ref={profileRef}
                initial="hidden"
                animate={profileInView ? "visible" : "hidden"}
                variants={fadeInUp}
                className="max-w-3xl mx-auto mb-16"
              >
                <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                  <h3 className="text-xl font-semibold mb-4 text-amber-400">
                    Your Essence
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {profile.description}
                  </p>
                </div>
              </motion.div>

              {/* Strengths & Challenges */}
              <motion.div
                ref={strengthsRef}
                initial="hidden"
                animate={strengthsInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                <motion.div variants={fadeInUp} className="bg-emerald-500/5 rounded-2xl border border-emerald-500/20 p-8">
                  <h3 className="text-xl font-semibold mb-6 text-emerald-400 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Your Strengths
                  </h3>
                  <ul className="space-y-3">
                    {profile.strengths.map((strength, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-slate-300">{strength}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-rose-500/5 rounded-2xl border border-rose-500/20 p-8">
                  <h3 className="text-xl font-semibold mb-6 text-rose-400 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Areas to Navigate
                  </h3>
                  <ul className="space-y-3">
                    {profile.challenges.map((challenge, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 mr-3 flex-shrink-0" />
                        <span className="text-slate-300">{challenge}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>

              {/* 2026 Focus */}
              <motion.div
                ref={focusRef}
                initial="hidden"
                animate={focusInView ? "visible" : "hidden"}
                variants={fadeInUp}
                className="mb-16"
              >
                <div className={`bg-gradient-to-br ${profile.color}/10 rounded-2xl border border-white/10 p-8 sm:p-12`}>
                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center mr-4`}>
                      <span className="text-white font-bold text-lg">26</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {profile.focus2026.title}
                      </h3>
                      <p className="text-slate-400">{profile.theme}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-lg mb-8">
                    {profile.focus2026.description}
                  </p>

                  <h4 className="text-amber-400 font-semibold mb-4">
                    Your Action Steps for 2026:
                  </h4>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {profile.focus2026.actionSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start bg-slate-900/50 rounded-xl p-4 border border-white/5"
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${profile.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <span className="text-slate-300">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gap / Teaser Section */}
      {showResults && (
        <motion.div
          ref={gapRef}
          initial="hidden"
          animate={gapInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={fadeInUp}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-amber-500/20 blur-3xl" />
              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-amber-500/20 p-8 sm:p-12">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl flex items-center justify-center transform rotate-45 shadow-lg shadow-amber-500/25">
                  <div className="transform -rotate-45">
                    <Gem className="w-10 h-10 text-white" />
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="text-white">This is Just the </span>
                  <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                    Beginning
                  </span>
                </h2>

                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                  Your Life Path number is only <strong className="text-white">10%</strong> of your complete blueprint.
                  To unlock your inverted triangle mapping, career compatibility analysis,
                  daily winning periods, and the full Bible of Numbers matrix — you need the complete system.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <div className="px-6 py-3 bg-slate-800/50 rounded-full border border-white/10">
                    <span className="text-amber-400 font-semibold">90%</span>
                    <span className="text-slate-400 ml-2">Still Hidden</span>
                  </div>
                  <div className="px-6 py-3 bg-slate-800/50 rounded-full border border-white/10">
                    <span className="text-rose-400 font-semibold">27+</span>
                    <span className="text-slate-400 ml-2">Number Combinations</span>
                  </div>
                  <div className="px-6 py-3 bg-slate-800/50 rounded-full border border-white/10">
                    <span className="text-blue-400 font-semibold">365</span>
                    <span className="text-slate-400 ml-2">Daily Forecasts</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* CTA Section */}
      {showResults && (
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                  <Download className="w-4 h-4 mr-2" />
                  Available Now
                </span>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="text-white">Carry Your </span>
                <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
                  Strategy
                </span>
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">in Your Pocket.</span>
              </motion.h2>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-400 max-w-2xl mx-auto mb-12"
              >
                Download the NUMI app to track your daily numbers, audit your business
                partners, and unlock the full Bible of Numbers blueprint.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <a
                  href="#"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Apple className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs opacity-70">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </a>

                <a
                  href="#"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Download className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs opacity-70">Get it on</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-slate-500"
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
                  Free daily insights
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
                  Cancel anytime
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-lg font-bold">NUMI</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 NUMI. The Science of Numbers. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
