'use client';

import { motion } from 'framer-motion';

const brands = [
	{ name: 'Logitech', logo: '/brands/logitech.png' },
	{ name: 'Logitech (GIF)', logo: '/brands/logitech.gif' },
	{ name: 'Razer', logo: '/brands/razer.jpg' },
	{ name: 'Corsair', logo: '/brands/corsair.jpeg' },
	{ name: 'HyperX', logo: '/brands/hyperx.jpg' },
	{ name: 'ASUS', logo: '/brands/asus.jpg' },
];

import { useRef } from 'react';

export default function BrandsSection() {
	const brandsLoop = [...brands, ...brands];
	const carouselRef = useRef<HTMLDivElement>(null);

	return (
		<section className="py-16 bg-gradient-to-br from-gray-900 via-gray-950 to-purple-950/80">
			<div className="max-w-7xl mx-auto px-6 w-full">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-10"
				>
					<h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 tracking-tight drop-shadow-lg mb-4">
						Featured Brands
					</h2>
					<p className="text-lg text-gray-300 mb-4">We partner with the best in gaming</p>
				</motion.div>
				<div className="overflow-hidden relative">
					<motion.div
						ref={carouselRef}
						className="flex items-center gap-8 whitespace-nowrap"
						animate={{ x: [0, -1000] }}
						transition={{
							repeat: Infinity,
							repeatType: 'loop',
							duration: 16,
							ease: 'linear',
						}}
						whileHover={{
							transition: { duration: 0 },
							x: carouselRef.current ? carouselRef.current.style.transform : undefined,
						}}
					>
						{brandsLoop.map((brand, i) => (
							<div
								key={brand.name + i}
								className="bg-gray-800/70 rounded-xl p-4 flex items-center justify-center shadow-md border border-purple-700/20 min-w-[140px] mx-2"
							>
								<img
									src={brand.logo}
									alt={brand.name}
									className="h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
								/>
							</div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
