export default function Footer() {
  return (
    <footer className="bg-black text-white pt-10 pb-6">
      <div className="w-full px-8 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">SinoLearn</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Master Chinese Mandarin with interactive lessons and community support.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition">Features</a></li>
              <li><a href="#" className="hover:text-red-500 transition">HSK Prep</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition">About</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Contact</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Address</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-red-500 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Terms</a></li>
              <li><a href="#" className="hover:text-red-500 transition">CNDP</a></li>
            </ul>
          </div>

        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SinoLearn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}