export function Footer() {
  return (
    <footer className="bg-slate-950 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-light tracking-[0.2em] text-white mb-4">NUMI</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A new generation human intelligent pattern platform combining timeless Eastern wisdom and modern presentation.
            </p>
            <p className="text-slate-500 text-xs">
              Built for clarity, growth, and transformation.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Platform</h4>
            <div className="space-y-2 text-sm">
              <a href="#app" className="block text-slate-400 hover:text-purple-400 transition">The NUMI App</a>
              <a href="#explore" className="block text-slate-400 hover:text-purple-400 transition">NUMI Academy</a>
              <a href="#explore" className="block text-slate-400 hover:text-purple-400 transition">Products</a>
              <a href="#partner" className="block text-slate-400 hover:text-purple-400 transition">Partner Program</a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Company</h4>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block text-slate-400 hover:text-purple-400 transition">About Us</a>
              <a href="#contact" className="block text-slate-400 hover:text-purple-400 transition">Contact</a>
              <a href="#" className="block text-slate-400 hover:text-purple-400 transition">Privacy Policy</a>
              <a href="#" className="block text-slate-400 hover:text-purple-400 transition">Terms of Service</a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-white mb-4">Connect</h4>
            <div className="space-y-3 text-sm">
              <a href="mailto:intelligence@numi.protocol" className="block text-slate-400 hover:text-purple-400 transition">
                intelligence@numi.protocol
              </a>
              <div className="text-slate-400">
                +1 (888) NUMI-PRO
              </div>
              <div className="text-slate-500 text-xs">
                777 Neural Way<br />San Francisco, CA
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 NUMI. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-purple-400 transition">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-purple-400 transition">Terms</a>
            <a href="#" className="text-slate-500 hover:text-purple-400 transition">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
