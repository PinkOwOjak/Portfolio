import React from 'react'
import { PERSONAL } from '../data'


export default function Header({theme, setTheme}){
return (
<header className="relative z-10 max-w-6xl mx-auto p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
<img src="/src/assets/profile_1.jpg" alt="profile" className="w-full h-full object-cover" />
</div>
<div>
<div className="font-bold">{PERSONAL.name}</div>
<div className="text-xs text-muted">{PERSONAL.title}</div>
</div>
</div>


<nav className="hidden md:flex items-center gap-3">
	<a href="#about" className="nav-link">About</a>
	<a href="#education" className="nav-link">Education</a>
	<a href="#internships" className="nav-link">Internships</a>
	<a href="#skills" className="nav-link">Skills</a>
	<a href="#projects" className="nav-link">Projects</a>
	<a href="#papers" className="nav-link">Papers</a>
	<a href="#contact" className="nav-link">Contact</a>
	<button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} aria-label="toggle theme" className="nav-link">
		{theme === 'light' ? '🌙' : '☀️'}
	</button>
</nav>
</header>
)
}