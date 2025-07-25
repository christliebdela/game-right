'use client';

import { motion } from 'framer-motion';

const testimonials = [
	{
		name: 'Christlieb Dela',
		avatar: '/avatars/avatar-1.png',
		text: 'GameRight is a dream come true for gamers in Ghana. The product selection and service are unmatched.',
		rating: 5,
	},
	{
		name: 'Gerald Zipki',
		avatar: '/avatars/avatar-2.png',
		text: 'The site design is beautiful and the shopping experience is seamless. I love how easy it is to find what I need.',
		rating: 5,
	},
	{
		name: 'Anthony',
		avatar: '/avatars/avatar-3.png',
		text: 'The graphics and visuals on GameRight are top-tier. It’s the best place for gaming gear and inspiration.',
		rating: 5,
	},
];

export default function TestimonialsSection() {
	return (
		   <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-950 to-purple-950/80">
			   <div className="max-w-7xl mx-auto px-6 w-full">
				   <motion.div
					   initial={{ opacity: 0, y: 20 }}
					   whileInView={{ opacity: 1, y: 0 }}
					   transition={{ duration: 0.6 }}
					   viewport={{ once: true }}
					   className="text-center mb-12"
				   >
					   <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 mb-4 tracking-tight drop-shadow-lg">
						   Team Testimonials
					   </h2>
					   <p className="text-lg text-gray-300 mb-4">
						   Hear from the creators behind GameRight
					   </p>
				   </motion.div>
				   <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
					   {testimonials.map((t, i) => (
						   <motion.div
							   key={i}
							   initial={{ opacity: 0, y: 20 }}
							   whileInView={{ opacity: 1, y: 0 }}
							   transition={{ duration: 0.6, delay: i * 0.1 }}
							   viewport={{ once: true }}
							   className="bg-gradient-to-br from-gray-800 via-gray-900 to-purple-900/40 rounded-2xl p-8 shadow-xl flex flex-col items-center border border-purple-700/30 hover:scale-105 transition-transform duration-300"
						   >
							   <img
								   src={t.avatar}
								   alt={t.name}
								   className="w-20 h-20 rounded-full mb-4 border-4 border-fuchsia-400 object-cover shadow-lg"
							   />
							   <div className="flex mb-2">
								   {[...Array(t.rating)].map((_, idx) => (
									   <span key={idx} className="text-yellow-400 text-2xl">
										   ★
									   </span>
								   ))}
							   </div>
							   <p className="text-gray-200 text-lg mb-4 text-center italic">{t.text}</p>
							   <h3 className="text-xl font-bold text-white mb-1 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow">
								   {t.name}
							   </h3>
						   </motion.div>
					   ))}
				   </div>
			   </div>
		   </section>
	);
}
