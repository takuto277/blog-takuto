export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} Blog Takuto. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/takuto277" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              GitHub
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 