'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const socialLinks = [
	{
		href: '#',
		label: 'Twitter',
		icon: (
			<svg
				className="w-7 h-7"
				fill="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
			</svg>
		),
	},
	{
		href: '#',
		label: 'GitHub',
		icon: (
			<svg
				className="w-7 h-7"
				fill="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					fillRule="evenodd"
					d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
					clipRule="evenodd"
				></path>
			</svg>
		),
	},
	{
		href: '#',
		label: 'Dribbble',
		icon: (
			<svg
				className="w-7 h-7"
				fill="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					fillRule="evenodd"
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
					clipRule="evenodd"
				></path>
			</svg>
		),
	},
];

const Footer = () => {
	return (
		<footer className="bg-gradient-to-b from-gray-950 via-black to-gray-900 relative overflow-hidden border-t border-purple-900/40">
			
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black/90"></div>
				<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 animate-pulse"></div>
				<div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
			</div>

			<div className="max-w-7xl mx-auto py-16 px-4 sm:px-8 lg:px-12 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
					
					<div className="space-y-5">
						<div className="flex items-center gap-2">
							<span className="bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent text-3xl font-extrabold tracking-widest drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] animate-pulse">
								GameRight
							</span>
						</div>
						<p className="text-gray-400 text-base">
							Your premium destination for elite gaming accessories. Level up your
							gaming experience with our curated collection.
						</p>
						<div className="flex gap-5 mt-4">
							{socialLinks.map((s) => (
								<motion.a
									key={s.label}
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.95 }}
									href={s.href}
									aria-label={s.label}
									className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-200"
								>
									{s.icon}
								</motion.a>
							))}
						</div>
					</div>

					{/* QUICK LINKS */}

					<div>
						<h4 className="text-white font-bold uppercase tracking-wider mb-6 text-lg">
							Quick Links
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="/products"
									className="text-gray-400 hover:text-fuchsia-400 transition-colors text-base"
								>
									Loadout
								</Link>
							</li>
							<li>
								<Link
									href="/cart"
									className="text-gray-400 hover:text-fuchsia-400 transition-colors text-base"
								>
									Arsenal
								</Link>
							</li>
							<li>
								<Link
									href="/about"
									className="text-gray-400 hover:text-fuchsia-400 transition-colors text-base"
								>
									About Us
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-bold uppercase tracking-wider mb-6 text-lg">
							Support
						</h4>
						<ul className="space-y-4">
							<li>
								<Link
									href="/contact"
									className="text-gray-400 hover:text-fuchsia-400 transition-colors text-base"
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href="/shipping"
									className="text-gray-400 hover:text-fuchsia-400 transition-colors text-base"
								>
									Shipping
								</Link>
							</li>
							<li>
								<Link
									href="/returns"
									className="text-gray-400 hover:text-fuchsia-400 transition-colors text-base"
								>
									Returns
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h4 className="text-white font-bold uppercase tracking-wider mb-6 text-lg">
							Stay Connected
						</h4>
						<form className="space-y-4">
							<div className="relative">
								<input
									type="email"
									placeholder="Enter your email"
									className="w-full px-4 py-3 bg-white/10 border border-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 text-base"
								/>
							</div>
							<motion.button
								whileHover={{ scale: 1.04 }}
								whileTap={{ scale: 0.98 }}
								className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-md hover:from-purple-500 hover:to-cyan-400 transition-all duration-200 uppercase tracking-wider font-bold text-base shadow-lg"
							>
								Subscribe
							</motion.button>
						</form>
					</div>
				</div>

				<div className="mt-12 pt-8 border-t border-gray-800">
					<div className="text-center text-gray-400 text-base">
						<p>© {new Date().getFullYear()} GameRight. All rights reserved.</p>
						<div className="mt-2 space-x-4">
							<Link
								href="/privacy"
								className="hover:text-fuchsia-400 transition-colors"
							>
								Privacy Policy
							</Link>
							<span>•</span>
							<Link
								href="/terms"
								className="hover:text-fuchsia-400 transition-colors"
							>
								Terms of Service
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
