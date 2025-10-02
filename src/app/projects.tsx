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
		<div className="max-w-2xl mr-8 px-4 py-12 text-white text-right">
			<h1 className="text-2xl font-bold mb-10 text-center text-gold text-4xl">
				Projects
			</h1>
			<div className="space-y-8">
				{projects.map((exp, idx) => (
					<div
						key={idx}
						className="relative pr-6 border-r border-gold/40 transition-all duration-300 hover:text-gold hover:scale-110 cursor-pointer group"
					>
						<div className="absolute w-3 h-3 bg-gold rounded-full -right-1.5 top-1.5 transition-all duration-300 group-hover:bg-white group-hover:scale-150"></div>
						<div className="mb-1 text-sm text-gray-300 group-hover:text-gold">
							{exp.date}
						</div>
						<h2 className="text-lg font-semibold text-white group-hover:text-gold">
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
						<p className="text-sm text-gray-200 mt-1 group-hover:text-gold">
							{exp.description}
						</p>
						<p className="text-xs text-gray-400 mt-1 group-hover:text-gold">
							<strong>Stack:</strong> {exp.tech.join(', ')}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
