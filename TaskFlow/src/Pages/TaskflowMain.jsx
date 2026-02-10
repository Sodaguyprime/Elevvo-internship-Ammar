import React, { useEffect, useRef } from 'react';
import { CheckCircle, Zap, Users, ArrowRight } from 'lucide-react';
import './TaskflowMain.css';

export default function TaskflowMain() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="taskflow-container">
      {/* Hero Section */}
      <section className="hero-section" ref={addToRefs}>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">Productivity Reimagined</div>
          <h1 className="hero-title">
            Task<span className="title-accent">Flow</span>
          </h1>
          <p className="hero-subtitle">
            Transform chaos into clarity. Organize every task, project, and goal with effortless precision.
          </p>
          <button className="cta-button">
            Start Flowing Free
            <ArrowRight className="button-icon" />
          </button>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">500K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">10M+</div>
              <div className="stat-label">Tasks Completed</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9★</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Designed for Peak Performance</h2>
          <p className="section-subtitle">Everything you need to stay organized and focused</p>
        </div>
        <div className="features-grid">
          <div className="feature-card" style={{ animationDelay: '0.1s' }}>
            <div className="feature-icon-wrapper icon-blue">
              <CheckCircle className="feature-icon" />
            </div>
            <h3 className="feature-title">Smart Task Management</h3>
            <p className="feature-description">
              Intelligent prioritization and deadlines that adapt to your workflow. Never miss what matters most.
            </p>
          </div>
          <div className="feature-card" style={{ animationDelay: '0.2s' }}>
            <div className="feature-icon-wrapper icon-purple">
              <Zap className="feature-icon" />
            </div>
            <h3 className="feature-title">Lightning Fast Sync</h3>
            <p className="feature-description">
              Real-time synchronization across all your devices. Your tasks are always up to date, everywhere.
            </p>
          </div>
          <div className="feature-card" style={{ animationDelay: '0.3s' }}>
            <div className="feature-icon-wrapper icon-green">
              <Users className="feature-icon" />
            </div>
            <h3 className="feature-title">Seamless Collaboration</h3>
            <p className="feature-description">
              Share projects, assign tasks, and communicate effortlessly with your team in one unified space.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Loved by Thousands</h2>
          <p className="section-subtitle">See what our users are saying</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card" style={{ animationDelay: '0.1s' }}>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "TaskFlow completely transformed how I manage my projects. The interface is beautiful and the features are incredibly intuitive. I can't imagine going back to my old system."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">SC</div>
              <div className="author-info">
                <div className="author-name">Sarah Chen</div>
                <div className="author-role">Product Manager, TechCorp</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card" style={{ animationDelay: '0.2s' }}>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "As a freelancer juggling multiple clients, TaskFlow keeps me sane. The smart prioritization helps me focus on what truly matters, and I've never been more productive."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">MR</div>
              <div className="author-info">
                <div className="author-name">Marcus Rodriguez</div>
                <div className="author-role">Freelance Designer</div>
              </div>
            </div>
          </div>
          <div className="testimonial-card" style={{ animationDelay: '0.3s' }}>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">
              "Our team's collaboration improved dramatically after switching to TaskFlow. Everyone stays on the same page, and projects move forward smoothly. Highly recommend!"
            </p>
            <div className="testimonial-author">
              <div className="author-avatar">EP</div>
              <div className="author-info">
                <div className="author-name">Emily Park</div>
                <div className="author-role">Team Lead, StartupHub</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section" ref={addToRefs}>
        <div className="section-header">
          <h2 className="section-title">Choose Your Flow</h2>
          <p className="section-subtitle">Flexible plans for every need</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card" style={{ animationDelay: '0.1s' }}>
            <div className="pricing-header">
              <h3 className="pricing-name">Free</h3>
              <div className="pricing-price">
                <span className="price-currency">$</span>
                <span className="price-amount">0</span>
                <span className="price-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>Up to 50 tasks</li>
              <li>Basic task management</li>
              <li>Mobile & web access</li>
              <li>Email support</li>
            </ul>
            <button className="pricing-button">Get Started</button>
          </div>
          <div className="pricing-card featured" style={{ animationDelay: '0.2s' }}>
            <div className="popular-badge">Most Popular</div>
            <div className="pricing-header">
              <h3 className="pricing-name">Pro</h3>
              <div className="pricing-price">
                <span className="price-currency">$</span>
                <span className="price-amount">12</span>
                <span className="price-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>Unlimited tasks</li>
              <li>Advanced prioritization</li>
              <li>Calendar integration</li>
              <li>Priority support</li>
              <li>Custom templates</li>
            </ul>
            <button className="pricing-button">Start Free Trial</button>
          </div>
          <div className="pricing-card" style={{ animationDelay: '0.3s' }}>
            <div className="pricing-header">
              <h3 className="pricing-name">Team</h3>
              <div className="pricing-price">
                <span className="price-currency">$</span>
                <span className="price-amount">25</span>
                <span className="price-period">/month</span>
              </div>
            </div>
            <ul className="pricing-features">
              <li>Everything in Pro</li>
              <li>Up to 10 team members</li>
              <li>Team collaboration tools</li>
              <li>Advanced analytics</li>
              <li>Dedicated support</li>
            </ul>
            <button className="pricing-button">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section" ref={addToRefs}>
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">TaskFlow</h3>
            <p className="footer-tagline">Organize. Focus. Achieve.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-heading">Product</h4>
              <a href="#" className="footer-link">Features</a>
              <a href="#" className="footer-link">Pricing</a>
              <a href="#" className="footer-link">Updates</a>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Company</h4>
              <a href="#" className="footer-link">About</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Blog</a>
            </div>
            <div className="footer-column">
              <h4 className="footer-heading">Support</h4>
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Contact</a>
              <a href="#" className="footer-link">Privacy</a>
            </div>
          </div>
          <div className="footer-social">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-icons">
              <a href="#" className="social-icon" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}