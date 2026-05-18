"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-purple-400 text-sm tracking-widest uppercase">Contact Us</span>
            <h2 className="text-4xl sm:text-5xl font-light text-white mt-4 mb-6">
              Let's Start the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Conversation</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Have questions about NUMI programs, seminars, memberships, or collaborations?
              Reach out to our team and we'll help guide you to the right path.
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-slate-300">
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center mr-4">
                  📧
                </div>
                <div>
                  <div className="text-sm text-slate-500">Email</div>
                  <div>intelligence@numi.protocol</div>
                </div>
              </div>
              <div className="flex items-center text-slate-300">
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center mr-4">
                  📞
                </div>
                <div>
                  <div className="text-sm text-slate-500">Phone</div>
                  <div>+1 (888) NUMI-PRO</div>
                </div>
              </div>
              <div className="flex items-center text-slate-300">
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center mr-4">
                  📍
                </div>
                <div>
                  <div className="text-sm text-slate-500">Office</div>
                  <div>777 Neural Way, San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-white"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-white"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-white"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">City</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-white"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">Interest Area</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition text-white"
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                >
                  <option value="">Select an option</option>
                  <option value="preview">Join Preview Seminar</option>
                  <option value="app">NUMI App Membership</option>
                  <option value="academy">Academy Programs</option>
                  <option value="partner">Partnership Opportunities</option>
                  <option value="products">Product Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition resize-none text-white"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 rounded-full py-6 text-base border-0">
                Send Your Inquiry
              </Button>

              <p className="text-center text-slate-500 text-sm mt-4">
                We typically respond within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
