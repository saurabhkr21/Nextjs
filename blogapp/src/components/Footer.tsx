import React from "react";

export default function Footer({ siteName = "Blog Exploring", author = {
  name: "Saurabh Kumar",
  title: "Software Engineer & Writer",
  bio: "Building and writing about web apps, JavaScript, and system design.",
  avatarAlt: "Saurabh Kumar avatar",
  socials: {
    twitter: "https://x.com/SaurabhKum47662",
    github: "https://github.com/saurabhkr21",
    linkedin: "https://www.linkedin.com/in/saurabh-kumar-24848225a/"
  }
} }) {
  const currentYear = new Date().getFullYear();

  function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value.trim();
    if (!email) {
      // Basic client validation; replace with nicer UX in production
      alert("Please enter a valid email address to subscribe.");
      return;
    }
    // TODO: Replace with API call to subscribe the user
    alert(`Thanks for subscribing, ${email}! (demo)`);
    form.reset();
  }

  return (
    <footer className="bg-gradient-to-br from-blue-50 via-white to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-800 dark:text-slate-100 border-t border-slate-200 dark:border-slate-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Author / Brand */}
          <div className="space-y-4">
            <a href="/" aria-label={`${siteName} homepage`} className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                B
              </div>
              <div>
                <span className="block font-semibold text-lg text-blue-700 dark:text-blue-400">{siteName}</span>
                <span className="block text-sm text-slate-500 dark:text-slate-400">{author.title}</span>
              </div>
            </a>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm">{author.bio} — stories, tutorials and projects by <strong>{author.name}</strong>. I write about building reliable web apps and clean frontend architecture.</p>

            <div className="flex items-center gap-3">
              {/* Social icons (inline SVG for crispness at small sizes) */}
              <a href={author.socials.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="group p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                <svg xmlns="https://x.com/home" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M22 5.92c-.66.29-1.37.48-2.12.56.76-.46 1.35-1.18 1.62-2.03-.72.43-1.52.74-2.37.91A3.6 3.6 0 0016.15 4c-1.98 0-3.58 1.6-3.58 3.58 0 .28.03.55.09.81C9.1 8.2 6.07 6.6 4.06 4.06c-.31.53-.49 1.15-.49 1.81 0 1.25.63 2.36 1.58 3.01-.59-.02-1.14-.18-1.62-.45v.05c0 1.74 1.24 3.19 2.88 3.52-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.06.46 1.44 1.79 2.49 3.37 2.52A7.23 7.23 0 012 19.54 10.2 10.2 0 008.29 21c6.08 0 9.41-5.04 9.41-9.41v-.43c.65-.46 1.2-1.05 1.64-1.72-.59.26-1.22.44-1.88.52.68-.41 1.2-1.05 1.45-1.82z" />
                </svg>
              </a>

              <a href={author.socials.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="group p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.1-.8.5-1.5-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.8 4 19 4.3 19 4.3c.6 1.6.2 2.6.1 2.9.8.9 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1 1 2v3c0 .3.2.7.8.6A12 12 0 0012 .5z" />
                </svg>
              </a>

              <a href={author.socials.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="group p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5a2.5 2.5 0 11.02 0zM3 8.98h4v12H3v-12zM9 8.98h3.8v1.7h.05c.52-.98 1.8-2 3.7-2 4 0 4.75 2.6 4.75 6v6.3h-4v-5.6c0-1.3-.03-3-1.88-3-1.88 0-2.17 1.46-2.17 2.9v5.7H9v-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-400">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/about">About</a></li>
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/categories">Categories</a></li>
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/tags">Tags</a></li>
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/projects">Projects</a></li>
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Recent / Resources (example static list) */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-400">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/rss.xml">RSS Feed</a></li>
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/sitemap.xml">Sitemap</a></li>
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/privacy">Privacy Policy</a></li>
              <li><a className="hover:underline hover:text-blue-600 dark:hover:text-blue-400" href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-blue-700 dark:text-blue-400">Newsletter</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">Get short, practical posts about building web apps and architecture. No spam — unsubscribe anytime.</p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email" name="email" type="email" placeholder="you@domain.com" aria-label="Email address" required className="min-w-0 flex-1 rounded-md border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-800 placeholder-slate-400 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
              <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">Subscribe</button>
            </form>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">By subscribing you agree to receive emails related to this blog. Read our <a href="/privacy" className="underline">privacy policy</a>.</p>
          </div>
        </div>

        <div className=" border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">© {currentYear} <span className="font-semibold">{author.name}</span>. All rights reserved.</p>

          <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-4">
            <a href="/feed.xml" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">Subscribe</a>
            <a href="/contact" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400">Get in touch</a>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-md px-2 py-1 hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">Back to top</button>
          </div>
        </div>

        {/* Schema.org microdata for author and site (helps SEO and rich results) */}
        <div className="hidden" itemScope itemType="http://schema.org/Person">
          <meta itemProp="name" content={author.name} />
          <meta itemProp="jobTitle" content={author.title} />
          <meta itemProp="description" content={author.bio} />
        </div>
      </div>
    </footer>
  );
}

