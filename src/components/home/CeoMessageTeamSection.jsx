"use client";

import React from "react";
import Image from "next/image";
import { Quote, Linkedin, Mail } from "lucide-react";

export default function CeoMessageTeamSection() {
  const teamMembers = [
    {
      name: "Alex Rivera",
      role: "Head of Strategy",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Sarah Chen",
      role: "Lead Creative Director",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Marcus Vane",
      role: "Senior PPC Specialist",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Elena Ross",
      role: "Operations Manager",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Daniel Kim",
      role: "DTC Tech Lead",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
      linkedin: "#",
    },
  ];

  return (
    <section className="bg-zinc-50 py-20 sm:py-28 px-6 sm:px-12 relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-orange-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* CEO MESSAGE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16">
          
          {/* Left Side: CEO Image Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[420px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-zinc-200 border border-zinc-200/50">
              <Image
                src="/assets/ali.avif"
                alt="Coach Ali Haider - CEO & Founder"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-all duration-750 group-hover:scale-105"
                priority
              />
              {/* Image Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
              
              {/* Badge overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                <p className="text-white font-black text-sm uppercase tracking-wider">Coach Ali Haider</p>
                <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mt-1">CEO, Grow Orbit</p>
              </div>
            </div>
          </div>

          {/* Right Side: CEO Message Text */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-600 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">
              <Quote size={12} className="rotate-180" /> Leadership Message
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black font-montserrat tracking-tight text-zinc-950 uppercase leading-tight mb-8">
              Moving Through Amazon <br/>
              <span className="text-orange-500 italic font-light normal-case" style={{ fontFamily: "'Playfair Display', serif" }}>Like Water.</span>
            </h2>

            <div className="space-y-6 text-zinc-600 text-base sm:text-lg leading-relaxed font-light">
              <p>
                Hey, I'm Ali. I didn't start selling on Amazon because someone showed me a laptop screen full of numbers. I started because I watched ordinary people <span className="text-zinc-950 font-semibold">build something out of nothing</span>, and I wanted to know exactly how.
              </p>
              <p>
                So I studied them. I kept what worked, dropped the hype, and began <span className="text-zinc-950 font-semibold">moving like water</span>: no fixed shape, just finding the path of least resistance. When my first product generated a few hundred dollars a month hands-off, it taught me that <span className="text-zinc-950 font-semibold">income doesn't have to trade hours for dollars</span>. It can just... flow.
              </p>
              <p>
                That belief built the team around me. We aren't here to give you a textbook guru pitch. We are here to <span className="text-zinc-950 font-semibold">show you where the current runs</span>, and help you move through Amazon the same way, being patient, adaptive, and <span className="text-zinc-950 font-semibold">unstoppable</span>. If that sounds like the freedom you've been looking for, let's talk.
              </p>
            </div>

            {/* CEO Sign-off */}
            <div className="mt-10 pt-8 border-t border-zinc-200 flex items-center justify-between">
              <div>
                <p className="font-montserrat font-black text-zinc-950 uppercase tracking-tight text-lg">Coach Ali Haider</p>
                <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mt-1">CEO</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-zinc-900 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white transition-all duration-300"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="mailto:support@groworbit.com"
                  className="w-10 h-10 rounded-xl bg-white hover:bg-zinc-900 border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-white transition-all duration-300"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* TEAM CARDS SECTION - Styled as a continuation of CEO section */}
        {/*
        <div className="pt-16 border-t border-zinc-200/80">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="flex flex-col group"
              >
                <div className="relative aspect-square rounded-[24px] overflow-hidden bg-zinc-100 border border-zinc-200/30">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-5px] group-hover:translate-y-0">
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-center sm:text-left">
                  <h4 className="font-montserrat font-black text-sm uppercase text-zinc-950 leading-tight group-hover:text-orange-500 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 mt-1.5 leading-none">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}

      </div>
    </section>
  );
}
