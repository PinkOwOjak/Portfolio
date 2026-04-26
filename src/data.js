export const PERSONAL = {
name: 'Pranto Mollik',
title: 'B.Tech CSE — 4th Year (8th Semester)',
location: 'Silchar, India',
email: 'prantomollik2003@gmail.com',
phone: '+8801817642605',
whatsapp: '+919957992852',
resumeLink: '/downloads/Pranto_Resume.pdf'
}


export const EDUCATION = [
{ key: 1, school: 'Badda Alatunnesa Higher Secondary School', year: 'Graduated' },
{ key: 2, school: 'Adamjee Cantonment College', year: 'Higher Secondary' },
{ key: 3, school: 'National Institute of Technology Silchar', degree: 'B.Tech CSE — 4th Year (8th Sem)', year: 'Present' }
]


export const INTERNSHIPS = [
{ key: 1, org: 'Brainwave Matrix Solutions', role: 'Intern', description: 'Worked on full-stack features and product prototyping.', certificateLink: '/downloads/Brainwave_Certificate.pdf', recommendationLink: '/downloads/Brainwave_Letter_of_Recommendation.pdf' },
{ key: 2, org: 'Industrial Internship under Dr. Ripon Patgiri', role: 'Industrial Intern', description: 'Guided research/industry project with mentorship from Dr. Ripon Patgiri.', certificateLink: '/downloads/Industrial_Internship_Certificate.pdf' }
]


export const RESEARCH_PAPERS = [
{
	key: 1,
	title: 'Long-Horizon Dengue Forecasting Using Machine Learning and Climatological Weather Inputs',
	venue: 'Accepted Research Paper',
	year: '2026',
	status: 'Accepted (Publishing Soon)',
	summary: 'Proposes a machine learning framework for 3, 6, and 12-month dengue forecasting using clinical and climatological features, including lagged weather indicators and epidemiological memory, with historical weather averaging for long-horizon prediction when future climate data is unavailable.',
	abstract: 'Dengue fever is one of the fastest-growing vector-borne diseases and requires accurate long-horizon forecasting for preparedness and resource planning. This paper builds a machine learning framework using hospital admissions, WHO SEARO surveillance reports, and climate variables such as rainfall, temperature, humidity, soil moisture, runoff, and wind speed. A gradient-boosting regression model is trained with lagged climate features, seasonal indicators, and epidemiological memory to forecast outbreaks at 3, 6, and 12 months. When future environmental variables are unknown, the system approximates them from historical weather averages. Year-based cross-validation shows strong potential for seasonal outbreak forecasting and climate-sensitive epidemic readiness.',
	link: '#'
},
{
	key: 2,
	title: 'A Systematization of Cryptanalysis Techniques for Reduced-Round Keccak',
	venue: 'Accepted Research Paper',
	year: '2026',
	status: 'Accepted (Publishing Soon)',
	summary: 'Presents a systematization of knowledge over 41 studies on reduced-round Keccak cryptanalysis, organizing differential, cube, algebraic, zero-sum, rotational, distinguishing, and automated attacks while comparing round coverage, complexity, and solver-assisted methods like MILP and SAT.',
	abstract: 'Cryptographic hash functions are central to integrity, signatures, and authentication, and Keccak was standardized as SHA-3 after weaknesses in MD5 and SHA-1. This work provides a systematization of knowledge on reduced-round Keccak cryptanalysis through a structured review of 41 primary studies. It develops a taxonomy across differential, cube, algebraic, zero-sum, rotational, distinguishing, and automated attack families, then compares them by round coverage and computational cost, including machine-assisted methods based on MILP and SAT. The analysis reinforces the security margin of the full 24-round Keccak permutation while highlighting automated and learning-driven cryptanalysis as promising future directions.',
	link: '#'
}
]


export const SKILLS = [
'Java','Python','C/C++','React','Node.js','Express','MongoDB','SQL','Data Structures','Algorithms','Android Development','Git','Docker'
]


export const PROJECTS = [
{ key: 1, title: 'PolyMTD Keccak Variants', desc: 'Research-oriented project exploring PolyMTD and Keccak variant behavior for cryptographic experimentation.', tags:['Cryptography','Research','Keccak'], liveLink:'https://pinkowojak.github.io/PolyMTD-Keccak-Variants/', repoLink:'https://github.com/PinkOwOjak/PolyMTD-Keccak-Variants' },
{ key: 2, title: 'PRNG Visualizer', desc: 'Interactive visualizer for comparing pseudo-random number generator behavior and output patterns.', tags:['Visualization','Randomness','JavaScript'], liveLink:'https://pinkowojak.github.io/PRNG-Visualizer/', repoLink:'https://github.com/PinkOwOjak/PRNG-Visualizer' },
{ key: 3, title: 'Skincare Tracker', desc: 'A skincare tracking project for logging routines, habits, and personal care progress over time.', tags:['Health','Tracking','Productivity'], liveLink:'https://pinkowojak.github.io/skincare-tracker/', repoLink:'https://github.com/PinkOwOjak/skincare-tracker' }
]