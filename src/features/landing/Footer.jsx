export function Footer() {
  return (
    <footer className="bg-brandDark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-display font-bold text-2xl tracking-tight">Vehicle<span className="text-brandYellow">Repair</span></span>
            </div>
            <p className="text-white/60 mb-6 leading-relaxed">
              India's leading app for daily commute and deliveries. Safe, reliable, and affordable rides at your fingertips.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandYellow hover:text-brandDark transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandYellow hover:text-brandDark transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandYellow hover:text-brandDark transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandYellow hover:text-brandDark transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-brandYellow transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Products</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-brandYellow transition-colors">Bike-Taxi</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Auto</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Cab</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Parcel</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-white/60 font-medium">
              <li><a href="#" className="hover:text-brandYellow transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-brandYellow transition-colors">Guidelines</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-white/40 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} VehicleRepair Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
