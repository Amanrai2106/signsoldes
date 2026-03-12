"use client";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";
import TransitionLink from "@/components/TransitionLink";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import type { Post } from "@/data/posts";

// const SelectedProjects = dynamic(() => import("@/components/SelectedProjects"), {
//   ssr: false,
// });
// const ProjectStack = dynamic(() => import("@/components/ProjectStack"), {
//   ssr: false,
// });
const AboutGrid = dynamic(() => import("@/components/AboutGrid"), {
  ssr: false,
});
const CoreValues = dynamic(() => import("@/components/CoreValues"), {
  ssr: false,
});
const BrandShowcase = dynamic(() => import("@/components/BrandShowcase"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
});
const Newsletter = dynamic(() => import("@/components/Newsletter"), {
  ssr: false,
});
const ProjectGrid = dynamic(() => import("@/components/ProjectGrid"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});
const GetInTouch = dynamic(() => import("@/components/GetInTouch"), {
  ssr: false,
});

const InProgressWork = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const inProgressPosts = posts.filter((p) => p.type === "project").slice(0, 3);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data?.ok && Array.isArray(data.items)) {
          setPosts(data.items);
        }
      } catch {
      }
    };
    load();
  }, []);

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-wide">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="w-full flex flex-col items-center">
            <p className="text-sm font-bold tracking-[0.4em] uppercase text-orange-600 mb-8">
              In progress
            </p>
            <h2 className="text-[10vw] font-bold tracking-tighter mb-12 leading-[0.85] text-black uppercase whitespace-nowrap">
              Crafting New Excellence
            </h2>
            <p className="text-xl md:text-3xl text-gray-400 max-w-4xl leading-relaxed font-light mb-16 px-6">
              We blend innovation with precision to transform spaces through 
              thoughtful wayfinding and high-impact design solutions.
            </p>
            <TransitionLink
              href="/projects"
              className="group inline-flex items-center gap-6 text-xl font-bold hover:text-orange-600 transition-all duration-300 bg-black text-white px-10 py-5 rounded-full hover:bg-orange-500"
            >
              Explore all works
              <span className="text-2xl leading-none group-hover:translate-x-2 transition-transform duration-300">→</span>
            </TransitionLink>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {inProgressPosts.map((post, index) => (
            <TransitionLink
              key={post.id}
              href={`/projects/${post.categoryId}/${post.subCategoryId}/${post.id}`}
              className="group flex flex-col"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="flex flex-col"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100 mb-8">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-px bg-orange-600" />
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600 mb-0">
                      {post.subCategoryId}
                    </p>
                  </div>
                  <h3 className="text-2xl md:text-3xl leading-tight group-hover:text-orange-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="p3 text-gray-600 line-clamp-2 leading-relaxed opacity-80">
                    {post.description}
                  </p>
                </div>
              </motion.div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main>
      <Nav />
      <Loader />
      <Hero />
      <div className="bg-[#f7f9fc]">
        <ProjectGrid />
        <AboutGrid />
        {/* <SelectedProjects /> */}
        {/* <ProjectStack /> */}
        <CoreValues />
        <BrandShowcase />
        <Newsletter />
        <Testimonials />
        <GetInTouch />
        <Footer />
      </div>
    </main>
  );
}
