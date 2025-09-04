import React from 'react'
import { GithubIcon, LinkedinIcon } from 'lucide-react'
export const Footer = ({ darkMode }) => {
    return (
        <footer
            className={`w-full py-8 px-6 bg-gray-800 ${darkMode ?  "text-gray-700" : "text-white"}`}
        >
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <p className="mb-4">Built with ❤️ by Anirudh Pandey</p>
                <div className="flex space-x-4">
                    <a
                        href="https://www.github.com/anirudh716/"
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="GitHub"
                    >
                        <GithubIcon size={20} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/anirudhpandey196/"
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <LinkedinIcon size={20} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
