'use client';

import React, { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import TransitionLink from '@/components/TransitionLink';
import Image from 'next/image';

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const service = services.find((s) => s.id === Number(id));

  if (!service) {
    notFound();
  }

  // Related Projects based on mapping
  const relatedProjects = projects.filter(p => 
    (service as any).relatedProjectIds?.includes(p.id)
  );

  // State for filtering
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter posts belonging to this service
  const servicePosts = posts.filter(p => p.categoryId === id);

  // Apply subcategory filter
  const filteredPosts = activeFilter === 'all' 
    ? servicePosts 
    : servicePosts.filter(p => p.subCategoryId === activeFilter);

  const layoutSpans = [
    "lg:col-span-2 lg:row-span-2",
    "lg:row-span-1",
    "lg:row-span-1",
    "lg:row-span-2",
    "lg:col-span-2 lg:row-span-1",
    "lg:row-span-1",
    "lg:row-span-1",
    "lg:row-span-2",
    "lg:row-span-1",
  ];

  return (
    <div className="min-h-screen text-black selection:bg-orange-500/30 overflow-x-hidden relative">
      <Nav />
      
      <main className="relative z-10 pt-32 pb-20">
        <div className="w-full mx-auto px-6 md:px-12">
          
          {/* Header & Filter Section */}
          <div className="mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter"
            >
              {service.title}
            </motion.h1>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 md:gap-4 pb-4 border-b border-gray-200">
                <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                        activeFilter === 'all' 
                        ? 'bg-black text-white border-black' 
                        : 'bg-transparent text-gray-500 border-gray-300 hover:border-black hover:text-black'
                    }`}
                >
                    All
                </button>
                {service.subCategories?.map((sub) => (
                    <button
                        key={sub.id}
                        onClick={() => setActiveFilter(sub.id)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                            activeFilter === sub.id 
                            ? 'bg-black text-white border-black' 
                            : 'bg-transparent text-gray-500 border-gray-300 hover:border-black hover:text-black'
                        }`}
                    >
                        {sub.title}
                    </button>
                ))}
            </div>
          </div>

          {/* Posts Grid - Bento layout */}
          <section className="mt-10">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[220px] md:auto-rows-[260px] lg:auto-rows-[280px] gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredPosts.map((post, index) => {
                    const subCategoryTitle = service.subCategories?.find(
                      (s) => s.id === post.subCategoryId
                    )?.title;

                    return (
                      <TransitionLink
                        key={post.id}
                        href={`/services/${id}/${post.subCategoryId}/${post.id}`}
                        className={`group relative overflow-hidden rounded-3xl bg-gray-200 ${layoutSpans[index] || ""}`}
                      >
                        <motion.div
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            {subCategoryTitle && (
                              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">
                                {subCategoryTitle}
                              </p>
                            )}
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                              {post.title}
                            </h3>
                            <div className="flex items-center justify-between mt-3 border-t border-white/20 pt-3">
                              <span className="text-gray-200 text-xs md:text-sm line-clamp-1">
                                {post.description}
                              </span>
                              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </TransitionLink>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-20 text-center text-gray-500">
                <p>No projects found in this category yet.</p>
              </div>
            )}
          </section>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <section className="mt-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
                    FEATURED PROJECTS
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Discover how we apply our {service.title.toLowerCase()} expertise across different sectors.
                  </p>
                </div>
                <TransitionLink 
                  href="/projects" 
                  className="group flex items-center gap-2 text-black font-bold uppercase tracking-widest text-sm"
                >
                  View All Projects
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </TransitionLink>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <TransitionLink 
                      href={`/projects/${project.id}`}
                      className="group block relative aspect-square overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                    >
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
                      
                      <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <h3 className="text-white text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-white/70 text-sm line-clamp-2 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest">
                          View Details
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </TransitionLink>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="mt-32 relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-12 md:p-24 text-center shadow-xl shadow-gray-200/50">
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black">
                    Ready to transform your space?
                </h2>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                    Let&apos;s collaborate to bring the vision of {service.title.toLowerCase()} to life with precision and creativity.
                </p>
                <Button 
                    href="/contact"
                    className="h-14 px-8 rounded-full text-base"
                    variant="primary"
                >
                    Get in Touch
                </Button>
            </div>
            
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[80%] bg-orange-100 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[80%] bg-blue-100 rounded-full blur-[100px]" />
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
