"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=800&fit=crop",
    title: "The Observer",
    desc: "Light through glass",
    pos: "50% 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1518173946687-a33f2e0f1c0a?w=600&h=800&fit=crop",
    title: "Golden Hour",
    desc: "Warm light over still waters",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop",
    title: "Wilderness",
    desc: "Untouched landscapes",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop",
    title: "City Pulse",
    desc: "Streets that tell stories",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=800&fit=crop",
    title: "Summit",
    desc: "Above the clouds",
    pos: "50% 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop",
    title: "Still Life",
    desc: "Texture in simplicity",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=800&fit=crop",
    title: "Neon Nights",
    desc: "Urban after dark",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=800&fit=crop",
    title: "Horizon",
    desc: "Where sky meets sea",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    title: "Presence",
    desc: "Portraits of character",
    pos: "50% 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=800&fit=crop",
    title: "Solitude",
    desc: "Silence in the dunes",
    pos: "50% 50%",
  },
];

export default function PhotographyGallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const frontRef = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isMobile = window.innerWidth < 768;
    const n = photos.length;
    const scrollHeight = isMobile
      ? window.innerHeight * 5
      : window.innerHeight * 4;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${scrollHeight}`,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });

      gsap.to(track, {
        rotationY: -360,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollHeight}`,
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * n) % n;
            if (idx !== frontRef.current) {
              frontRef.current = idx;
              const cards = track.querySelectorAll("[data-idx]");
              cards.forEach((card, i) => {
                card.toggleAttribute("data-front", i === idx);
              });
            }
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section className="min-h-dvh bg-black px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 text-center text-3xl font-semibold text-white">
            Photography Gallery
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: photo.pos }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h3 className="text-sm font-semibold text-white">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-400">{photo.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "500vh" }}
    >
      <style>{`
        .carousel-track { transform-style: preserve-3d; }
        .photo-card {
          position: absolute;
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .card-body {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s ease;
          border-radius: 0.75rem;
          border: 3px solid transparent;
          background:
            linear-gradient(#1c1917, #1c1917) padding-box,
            repeating-conic-gradient(from var(--ang,0deg),
              transparent 0deg 15deg,
              #C7AC60 20deg 30deg,
              transparent 35deg 50deg) border-box;
          animation: spin-border 4s linear infinite;
          animation-play-state: paused;
        }
        .photo-card.hover .card-body {
          transform: rotateY(180deg);
        }
        [data-front] .card-body {
          animation-play-state: running;
          border-color: transparent;
        }
        .card-body img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
        }
        .card-back {
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: rgba(28,25,23,0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          text-align: center;
          backface-visibility: hidden;
          transform: rotateY(180deg);
        }
        .card-back h3 {
          color: #fafaf9;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .card-back p {
          color: #a8a29e;
          font-size: 0.875rem;
        }
        .scroll-hint {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding-bottom: 4rem;
        }
        .scroll-hint p {
          color: #57534e;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden bg-black">
        <div
          className="relative"
          style={{
            perspective: "900px",
            width: 0,
            height: 0,
          }}
        >
          <div ref={trackRef} className="carousel-track">
            {photos.map((photo, i) => {
              const n = photos.length;
              const angle = (i / n) * 360;
              const w = 220;
              const h = 293;
              const radius = 280;
              return (
                <div
                  key={i}
                  data-idx={i}
                  className="photo-card"
                  style={{
                    width: w,
                    height: h,
                    left: -w / 2,
                    top: -h / 2,
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  }}
                  onMouseEnter={(e) => {
                    const card = e.currentTarget;
                    card.classList.add("hover");
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.classList.remove("hover");
                  }}
                >
                  <div className="card-body">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      style={{ objectPosition: photo.pos }}
                      loading="lazy"
                    />
                  </div>
                  <div className="card-back">
                    <h3>{photo.title}</h3>
                    <p>{photo.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="scroll-hint">
          <p>Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}
