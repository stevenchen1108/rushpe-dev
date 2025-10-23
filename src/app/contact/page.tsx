// src/app/contact/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
// system icons
import { Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
// brand icons
import { FaInstagram, FaLinkedin, FaFacebook, FaTiktok } from "react-icons/fa6";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ContactFields = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNum?: string;
  desc: string;
  honey?: string; // honeypot
};

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<ContactFields>();

  const [hasSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    const removeBottomLeftBadge = () => {
      const all = document.querySelectorAll<HTMLElement>("*");
      all.forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.position !== "fixed") return;
        const r = el.getBoundingClientRect();
        const nearLeft = r.left <= 200;
        const nearBottom = window.innerHeight - r.bottom <= 220;
        const smallish = r.width * r.height <= 80_000;
        if (nearLeft && nearBottom && smallish) el.remove();
      });
    };
    removeBottomLeftBadge();
    const mo = new MutationObserver(removeBottomLeftBadge);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  const sendContactFormData = useCallback(
    async (userInput: ContactFields) => {
      try {
        if (userInput.honey) return; // honeypot

        const { error } = await supabaseClient.from("GeneralQuestions").insert({
          first_name: userInput.firstName,
          last_name: userInput.lastName,
          email: userInput.email,
          phone_num: userInput.phoneNum ?? null,
          desc: userInput.desc,
        });

        if (error) {
          setError("root", { message: "Something went wrong. Please try again." });
          return;
        }

        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 6000);
      } catch {
        setError("root", { message: "Network error. Please try again." });
      }
    },
    [reset, setError]
  );

  return (
    <main className="relative min-h-[100svh] bg-white">
      {/* Section */}
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT: Title + contact info */}
          <aside className="text-slate-900">
            <h1
              className="text-5xl/tight sm:text-6xl font-extrabold tracking-tight
                         bg-gradient-to-r from-red-600 via-orange-500 to-blue-600
                         bg-clip-text text-transparent"
            >
              Contact Us
            </h1>

            <p className="mt-4 max-w-prose text-slate-600">
              Questions, comments, or ideas? Send us a message and we’ll get back to you.
              You can also reach us directly or follow our socials below.
            </p>

            <dl className="mt-8 space-y-4 text-slate-700">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 opacity-80" aria-hidden />
                <a
                  href="mailto:shpe.rutgers@gmail.com"
                  className="underline-offset-2 hover:underline"
                >
                  shpe.rutgers@gmail.com
                </a>
              </div>

              {/* Location: linked to Google Maps */}
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 opacity-80" aria-hidden />
                <a
                  href="https://www.google.com/maps?q=600+Bartholomew+Rd+Piscataway+NJ+08854"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline"
                >
                  600 Bartholomew Rd, Piscataway, NJ
                </a>
              </div>
            </dl>

            {/* Socials */}
            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://www.instagram.com/shpe_ru/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full
                           bg-slate-100 ring-1 ring-slate-200 transition hover:bg-slate-200"
                title="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rutgers-university-shpe-686bba295"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full
                           bg-slate-100 ring-1 ring-slate-200 transition hover:bg-slate-200"
                title="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/rutgers.she/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full
                           bg-slate-100 ring-1 ring-slate-200 transition hover:bg-slate-200"
                title="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@shpe_ru"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full
                           bg-slate-100 ring-1 ring-slate-200 transition hover:bg-slate-200"
                title="TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </a>
            </div>
          </aside>

          {/* RIGHT: Form card */}
          <div className="relative overflow-hidden isolate">
            <div className="relative z-10 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">Send us a message</h2>
              <p className="mt-1 text-sm text-slate-600">Fields marked * are required.</p>

              {hasSubmitted && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-green-800 ring-1 ring-green-200"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Message submitted! Thank you.</span>
                </div>
              )}

              {"root" in errors && errors.root?.message && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-red-800 ring-1 ring-red-200"
                >
                  {errors.root.message}
                </div>
              )}

              <form
                onSubmit={handleSubmit(sendContactFormData)}
                className="mt-6 grid grid-cols-1 gap-5"
                noValidate
              >
                {/* Honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                  {...register("honey")}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      autoComplete="given-name"
                      placeholder="Jane"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:ring-4 focus:ring-sky-300/40"
                      {...register("firstName", { required: true, minLength: 2 })}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600">Enter a valid first name.</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      autoComplete="family-name"
                      placeholder="Doe"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:ring-4 focus:ring-sky-300/40"
                      {...register("lastName", { required: true, minLength: 2 })}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600">Enter a valid last name.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@rutgers.edu"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:ring-4 focus:ring-sky-300/40"
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">Enter a valid email address.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNum" className="text-sm font-medium text-slate-700">
                    Phone (optional)
                  </label>
                  <input
                    id="phoneNum"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:ring-4 focus:ring-sky-300/40"
                    {...register("phoneNum", { minLength: 7, maxLength: 20 })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="desc" className="text-sm font-medium text-slate-700">
                    Message *
                  </label>
                  <textarea
                    id="desc"
                    rows={5}
                    placeholder="Tell us a bit about your question…"
                    className="w-full resize-y rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 shadow-sm outline-none transition focus:ring-4 focus:ring-sky-300/40"
                    {...register("desc", { required: true, minLength: 10 })}
                  />
                  {errors.desc && (
                    <p className="text-sm text-red-600">Please enter at least 10 characters.</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    By submitting, you agree we may contact you about your inquiry.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Confined, behind-the-card blur accent */}
            <div className="pointer-events-none absolute inset-x-0 -bottom-6 h-6 rounded-b-3xl bg-slate-200/40 blur-xl -z-10" />
          </div>
        </div>
      </section>
    </main>
  );
}
