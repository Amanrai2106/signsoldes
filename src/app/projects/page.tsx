'use client';

import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import TransitionLink from '@/components/TransitionLink';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  src: string;
  color?: string;
  subCategories?: { id: string; title: string; image: string }[];
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [15, -15]);
  const rotateY = useTransform(mouseX, [-200, 200], [-15, 15]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        perspective: 1000,
      }}
      className="h-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full rounded-3xl bg-white border border-gray-200 p-8 flex flex-col justify-between group cursor-pointer hover:border-orange-500 transition-all duration-500 shadow-xl shadow-gray-200/50 overflow-hidden min-h-[400px]"
      >
        {/* Hover Gradient Effect */}
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(249, 115, 22, 0.05),
                transparent 80%
              )
            `,
          }}
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        />

        <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
          <div className="flex justify-between items-start mb-8">
            <span className="text-sm font-mono text-orange-600 border border-orange-500/20 px-3 py-1 rounded-full bg-orange-50">
              0{index + 1}
            </span>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 45 }}
              className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-colors duration-300"
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.div>
          </div>

          <h3 
            className="text-3xl font-bold text-black mb-4 group-hover:text-orange-600 transition-colors duration-300 uppercase tracking-tight"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.title}
          </h3>
          
          <p 
            className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.description}
          </p>

          <div 
            className="relative h-48 w-full rounded-2xl overflow-hidden mb-6"
            style={{ transform: "translateZ(5px)" }}
          >
            <Image 
              src={project.src} 
              alt={project.title} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          <div 
            className="space-y-3 pt-6 border-t border-gray-100"
            style={{ transform: "translateZ(5px)" }}
          >
            {project.subCategories && project.subCategories.slice(0, 3).map((sub, i) => (
              <div key={i} className="flex items-center text-sm text-gray-500 group-hover:text-black transition-colors duration-300">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3" />
                {sub.title}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen text-black selection:bg-orange-500/30 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-orange-100/40 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-purple-100/40 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-blue-100/40 rounded-full blur-[150px]" />
      </div>

      <Nav />
      
      <main className="pt-32 pb-20 px-6 md:px-12 w-full relative z-10">
        <div className="mb-24 mt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10"
          >
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 text-orange-600 font-mono text-sm mb-6 tracking-widest uppercase"
              >
                <Sparkles className="w-4 h-4" />
                <span>Selected Works</span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                OUR <br />
                <span className="text-orange-600">
                  PROJECTS
                </span>
              </motion.h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed font-light">
                A showcase of our finest signage and branding projects, demonstrating our commitment to excellence and innovation.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block mb-4"
            >
              <div className="w-40 h-40 rounded-full border border-gray-200 flex items-center justify-center animate-spin-slow relative">
                <div className="absolute inset-0 rounded-full border border-orange-500/20 border-t-orange-500 animate-spin" style={{ animationDuration: '3s' }}></div>
                <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg">
                  <ArrowUpRight className="w-10 h-10 text-orange-600" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <TransitionLink href={`/projects/${project.id}`} key={project.id} className="block h-full">
              <ProjectCard project={project} index={index} />
            </TransitionLink>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
