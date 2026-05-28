import React from 'react';
import { motion } from 'framer-motion';
import { GridPattern } from '@/components/ui/grid-pattern';

type Testimonial = {
	name: string;
	role: string;
	image: string;
	company: string;
	quote: string;
};

const testimonials: Testimonial[] = [
	{
		quote:
			'I finally understood why I kept repeating the same relationship patterns. NUMI showed me my Pattern Code and everything clicked.',
		name: 'Sarah Chen',
		role: 'Marketing Director',
		company: 'Creative Agency',
		image: 'https://randomuser.me/api/portraits/women/44.jpg',
	},
	{
		quote:
			'After years of feeling stuck in my career, my NUMI reading revealed the pattern behind my decisions. It was like finding a map I had been searching for.',
		name: 'Michael Torres',
		role: 'Software Engineer',
		company: 'Tech Startup',
		image: 'https://randomuser.me/api/portraits/men/32.jpg',
	},
	{
		quote:
			"The Pattern Code guide took me 15 minutes to read, but the insights shifted how I view my entire life. Simple, powerful, actually useful.",
		name: 'Emma Williams',
		role: 'Life Coach',
		company: 'Independent Practice',
		image: 'https://randomuser.me/api/portraits/women/65.jpg',
	},
	{
		quote:
			'I was skeptical at first, but seeing my Core Number and how it connects to my strengths was eye-opening. NUMI balances ancient wisdom with modern practicality.',
		name: 'David Park',
		role: 'Product Manager',
		company: 'Fintech Company',
		image: 'https://randomuser.me/api/portraits/men/45.jpg',
	},
	{
		quote:
			'The free guide gave me clarity I had been seeking for years. My pattern explained why I feel drained in certain situations and energized in others.',
		name: 'Rachel Kim',
		role: 'HR Consultant',
		company: 'Global Consulting',
		image: 'https://randomuser.me/api/portraits/women/33.jpg',
	},
	{
		quote:
			"NUMI helped me understand my burnout wasn't personal failure — it was my pattern running its course. That perspective shift changed everything.",
		name: 'James Anderson',
		role: 'Founder',
		company: 'Design Studio',
		image: 'https://randomuser.me/api/portraits/men/52.jpg',
	},
	{
		quote:
			'Ive tried astrology, human design, and therapy — but NUMIs Pattern Code was the first thing that made me say yes, this is exactly how I am.',
		name: 'Lisa Martinez',
		role: 'Yoga Instructor',
		company: 'Wellness Studio',
		image: 'https://randomuser.me/api/portraits/women/28.jpg',
	},
	{
		quote:
			'My Pattern 8 explanation hit so close to home. The ambition, the drive for success — finally I understood why I am the way I am.',
		name: 'Robert Kim',
		role: 'Entrepreneur',
		company: 'E-commerce Brand',
		image: 'https://randomuser.me/api/portraits/men/67.jpg',
	},
	{
		quote:
			"As someone who overthinks everything, knowing my Pattern 2 helps me trust my intuition more. I'm making decisions with less anxiety now.",
		name: 'Jennifer Wu',
		role: 'UX Designer',
		company: 'Tech Company',
		image: 'https://randomuser.me/api/portraits/women/46.jpg',
	},
	{
		quote:
			'The relationship dynamics section was eerily accurate. NUMI helped me communicate better with my partner without feeling like I need to change who I am.',
		name: 'Daniel Brown',
		role: 'Teacher',
		company: 'International School',
		image: 'https://randomuser.me/api/portraits/men/54.jpg',
	},
	{
		quote:
			"I've always felt different from others. Seeing my Pattern 7 description made me realize it's not a flaw — it's how I'm designed to operate.",
		name: 'Sophie Laurent',
		role: 'Research Scientist',
		company: 'Biotech Firm',
		image: 'https://randomuser.me/api/portraits/women/59.jpg',
	},
	{
		quote:
			'NUMI gave me language for what I knew but could never explain. Now I can describe my patterns instead of just feeling controlled by them.',
		name: 'Marcus Johnson',
		role: 'Executive Coach',
		company: 'Leadership Development',
		image: 'https://randomuser.me/api/portraits/men/38.jpg',
	},
];

export function TestimonialsSection() {
	return (
		<section className="relative w-full py-20 px-6">
			<div className="mx-auto max-w-5xl space-y-8">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
						Real Patterns, Real Insights
					</h2>
					<p className="text-white/60 text-sm md:text-base lg:text-lg">
						See how NUMI has helped people understand their patterns and find clarity in their lives.
					</p>
				</div>
				<div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{testimonials.map(({ name, role, company, quote, image }, index) => (
						<motion.div
							initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
							whileInView={{
								filter: 'blur(0px)',
								translateY: 0,
								opacity: 1,
							}}
							viewport={{ once: true }}
							transition={{ delay: 0.1 * index + 0.1, duration: 0.8 }}
							key={index}
							className="border-white/10 relative overflow-hidden rounded-2xl border bg-white/[0.03] p-6 backdrop-blur-sm"
						>
							<img
								alt={name}
								src={image}
								loading="lazy"
								className="mb-4 size-12 rounded-full border-2 border-[#D8B86A]/30"
							/>
							<div>
								<p className="text-white mb-1 font-medium">{name}</p>
								<span className="text-white/50 block text-xs">
									{role} at {company}
								</span>
							</div>
							<blockquote className="mt-4">
								<p className="text-white/70 text-sm leading-relaxed">{quote}</p>
							</blockquote>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
