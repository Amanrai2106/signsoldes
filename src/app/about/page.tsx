"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Lightbulb } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

const teamMembers = [
  { id: 1, name: "Aman Sharma", role: "Creative Director", image: "/imgs/img-1.png" },
  { id: 2, name: "Neha Singh", role: "Lead Designer", image: "/imgs/img-2.png" },
  { id: 3, name: "Rahul Verma", role: "UX Architect", image: "/imgs/img-3.png" },
  { id: 4, name: "Simran Kaur", role: "Brand Strategist", image: "/imgs/img-4.jpeg" },
  { id: 5, name: "Karan Patel", role: "Project Manager", image: "/dev/p-1.jpeg" },
  { id: 6, name: "Priya Desai", role: "3D Visualizer", image: "/dev/p-2.jpeg" },
  { id: 7, name: "Ankit Rao", role: "Wayfinding Specialist", image: "/dev/p-3.jpeg" },
  { id: 8, name: "Meera Joshi", role: "Graphic Designer", image: "/dev/p-4.jpeg" },
  { id: 9, name: "Vikram Nair", role: "Signage Engineer", image: "/imgs/img-1.png" },
];

const awards = [
  {
    year: "2026",
    items: [
      {
        project: "Toyota Music Factory · Irving, TX",
        award: "Graphis Design Awards, Silver",
      },
      {
        project: "Bel Air Village · Sherman, TX",
        award: "Graphis Design Awards, Silver",
      },
    ],
  },
  {
    year: "2025",
    items: [
      {
        project: "New York Studio Mailer · New York, NY",
        award: "GDUSA Inhouse Design Awards, Announcements + Invitations",
      },
      {
        project: "CW Prime at St. Regis Longboat Resort · Longboat Key, FL",
        award: "GDUSA Inhouse Design Awards, Branding + Identity Programs",
      },
    ],
  },
  {
    year: "2024",
    items: [
      {
        project: "Post District · Salt Lake City, UT",
        award: "Mixed-Use Community of the Year, Golden Nugget Award",
      },
      {
        project: "Omni PGA Frisco Resort · Frisco, TX",
        award: "ICSC Excellence in Community Advancement Award",
      },
    ],
  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen text-black overflow-hidden">
      <Nav />

      <section className="py-20 md:py-32 px-[5px] relative">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Founded with a vision to bridge the gap between aesthetics and functionality, we started as a small collective of designers and developers. Over the years, we&apos;ve grown into a full-service agency, but our core philosophy remains the same: <span className="text-black font-semibold">Quality over Quantity.</span>
              </p>
              <p>
                We believe that every brand has a unique story to tell. Our job is to tell that story through immersive design, cutting-edge technology, and strategic thinking. We don&apos;t just build websites; we build digital legacies.
              </p>
            </div>
            
            <div className="mt-10 flex gap-8">
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-black">50+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider mt-2">Projects Delivered</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-black">10+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider mt-2">Years Experience</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative border border-black/10 group">
               {/* Abstract visual representation instead of image if no image available */}
               <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50 group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-black/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-24 h-24 border border-black/40 rounded-full" />
                  </div>
               </div>
            </div>
            {/* Floating Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-10 -left-10 bg-white/90 backdrop-blur-md p-6 rounded-xl border border-black/10 shadow-2xl max-w-xs hidden md:block"
            >
              <p className="text-sm text-gray-600 italic">&quot;Design is not just what it looks like and feels like. Design is how it works.&quot;</p>
              <p className="text-xs text-gray-500 mt-2">— Steve Jobs</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="w-full px-[5px] md:px-[5px] max-w-none">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide every decision we make.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-8 h-8 text-purple-500" />,
                title: "Precision",
                desc: "We pay attention to the smallest details because that&apos;s where excellence lives."
              },
              {
                icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
                title: "Innovation",
                desc: "We constantly explore new technologies to keep our clients ahead of the curve."
              },
              {
                icon: <Users className="w-8 h-8 text-blue-500" />,
                title: "Collaboration",
                desc: "We work with you, not just for you. Your success is our success."
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white border border-black/5 p-8 rounded-2xl hover:border-black/20 transition-colors duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="bg-black/5 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-[5px]">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-orange-500">
                Our team
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black mt-2">
                Meet our team
              </h2>
              <p className="mt-4 text-sm md:text-base text-gray-600 max-w-xl">
                A multidisciplinary team of designers, strategists and engineers working together
                to craft meaningful brand environments and wayfinding systems.
              </p>
            </div>
            <p className="text-xs md:text-sm text-gray-500 max-w-sm">
              Team data is structured so it can be managed later from an admin panel or CMS
              without changing this layout.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.slice(0, 9).map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col items-center text-center rounded-3xl border border-black/5 bg-white shadow-sm hover:shadow-lg hover:border-black/15 transition-all duration-300 p-5 md:p-6"
              >
                <div className="relative w-24 h-32 md:w-28 md:h-36 rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-black">
                  {member.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-[5px] bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-orange-500">
                Recognition
              </p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black mt-2">
                Awards and honors
              </h2>
              <p className="mt-4 text-sm md:text-base text-gray-600 max-w-xl">
                Selected recognition for projects delivered with our collaborators across
                retail, hospitality, workplaces and cultural destinations.
              </p>
            </div>
            <p className="text-xs md:text-sm text-gray-500 max-w-sm">
              Awards are structured by year so they can be updated or connected to an
              admin panel in the future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {awards.map((group) => (
              <div key={group.year} className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-gray-400">
                    {group.year}
                  </span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="space-y-4">
                  {group.items.map((item, index) => (
                    <motion.div
                      key={item.project + index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col gap-1"
                    >
                      <p className="text-sm md:text-base font-medium text-black">
                        {item.project}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        {item.award}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-[5px] text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-none mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-8">Ready to start?</h2>
          <p className="text-xl text-gray-600 mb-10">Let&apos;s build something amazing together.</p>
          <TransitionLink href="/contact" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-500 transition-colors group">
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </TransitionLink>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
