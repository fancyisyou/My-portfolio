"use client";

import { motion } from "motion/react";

export default function Contact() {
  return (
    <section id="contact" className="py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto px-6 text-center"
      >
        <p className="inline-block rounded-full border border-[#C7AC60] px-6 py-3 font-mono font-semibold text-[36px] uppercase tracking-[0.18em] text-stone-400">
          Contact / اتصل
        </p>
      </motion.div>
    </section>
  );
}
