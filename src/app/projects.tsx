'use client';
import React from 'react';

const projects = [
	{
		title: 'Course Connect',
		date: 'September 2025 - Present',
		link: '',
		description:
			'Designed a graph-based system with NetworkX to model prerequisites optimal degree pathways',
		tech: ['Python', 'MySQL', 'Web Scraping'],
	},
	{
		title: 'Flourishing Realty Website',
		date: 'August 2025',
		link: 'https://flourishing.homes',
		description: 'Enabled tenants to easily browse for rental homes',
		tech: ['React.js', 'Typescript', 'Node.js', 'Next.js', 'AWS', 'MySQL'],
	},
	{
		title: 'UniMap',
		date: 'Summer 2022 (Modified 2025)',
		link: 'https://github.com/hamzakammar/UniMap',
		description: 'Got lost on campus and fixed it',
		tech: ['Python', 'NetworkX', "Dijkstra's Algorithm", 'Graphs', 'OpenCV'],
	},
];

export default function Projects() {
	return (
		<div className="bg-gray-900/80 backdrop-blur-md border-2 border-gold/40 rounded-xl p-6 shadow-2xl hover:border-gold/60 transition-all duration-300">
			<h1 className="text-3xl font-bold mb-6 text-gold">
				PROJECTS
			</h1>
			<div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-gray-800">
				{projects.map((exp, idx) => (
					<div
						key={idx}
						className="relative pl-6 border-l-2 border-gold/40 transition-all duration-300 hover:border-gold group"
					>
						<div className="absolute w-3 h-3 bg-gold rounded-full -left-[7px] top-1.5 transition-all duration-300 group-hover:bg-white group-hover:scale-125"></div>
						<div className="flex items-center gap-2 flex-wrap">
							<span className="text-xs text-gray-400 group-hover:text-gold transition-colors">
								{exp.date}
							</span>
							<span className="text-gray-500">•</span>
							<h2 className="text-base font-semibold text-white group-hover:text-gold transition-colors">
								{exp.link ? (
									<a
										href={exp.link}
										target="_blank"
										rel="noopener noreferrer"
										className="hover:underline"
									>
										{exp.title}
									</a>
								) : (
									<span>{exp.title}</span>
								)}
							</h2>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
