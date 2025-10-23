// src/app/contact/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

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
};

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFields>();

  const [hasSubmitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // keep your badge-removal effect
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
        setIsLoading(true);
        await supabaseClient.from("GeneralQuestions").insert({
          first_name: userInput.firstName,
          last_name: userInput.lastName,
          email: userInput.email,
          phone_num: userInput.phoneNum ?? null,
          desc: userInput.desc,
        });
        setSubmitted(true);
        reset();
      } finally {
        setIsLoading(false);
      }
    },
    [reset]
  );

  return (
    <>
      {/* Background via URL path (no import) */}
      <style jsx global>{`
        body {
          background-image: url(/about-pg-assets/contact-pg-geese.jpg);
          background-repeat: repeat;
          background-attachment: fixed;
          background-position: center top;
          background-size: clamp(420px, 32vw, 560px) auto;
          background-color: #fbf8f4;
        }
      `}</style>

      <section className="relative py-28 px-4 md:px-16 lg:px-72">
        <div className="relative bg-white text-black flex flex-col items-center p-5 md:p-8 gap-6 text-center rounded-3xl shadow-lg">
          <h3 className="text-4xl tracking-wide font-bold">Contact Us!</h3>

          <p className="w-4/5 max-w-2xl">
            Get in touch with us if you have any questions, comments, or concerns!
            <br />
            <br />
            Click the icons for our socials below!
          </p>

          {/* Socials via URL paths (no import) */}
          <div className="flex flex-row items-center justify-center gap-5 md:gap-9">
            <a
              href="https://www.instagram.com/shpe_ru/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-block"
            >
              <Image
                src="/socials/instagram-logo.png"
                alt="Instagram"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12"
                priority
              />
            </a>

            <a
              href="https://www.linkedin.com/in/rutgers-university-shpe-686bba295"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-block"
            >
              <Image
                src="/socials/linkedin-logo.png"
                alt="LinkedIn"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </a>

            <a
              href="https://www.facebook.com/rutgers.she/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-block"
            >
              <Image
                src="/socials/facebook-logo.png"
                alt="Facebook"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </a>

            <a
              href="https://www.tiktok.com/@shpe_ru"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-block"
            >
              <Image
                src="/socials/tiktok-logo.png"
                alt="TikTok"
                width={48}
                height={48}
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </a>
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit(sendContactFormData)}
            className="flex flex-col items-center my-2 gap-5 w-full lg:p-5"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="w-full">
                <input
                  {...register("firstName", { required: true })}
                  placeholder="First Name *"
                  className="p-3 w-full shadow-md rounded-2xl"
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">First name is required.</span>
                )}
              </div>

              <div className="w-full">
                <input
                  {...register("lastName", { required: true })}
                  placeholder="Last Name *"
                  className="p-3 w-full shadow-md rounded-2xl"
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">Last name is required.</span>
                )}
              </div>
            </div>

            <div className="w-full">
              <input
                {...register("email", { required: true })}
                placeholder="Email *"
                type="email"
                className="p-3 w-full shadow-md rounded-2xl"
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Valid email is required.</span>
              )}
            </div>

            <input
              {...register("phoneNum")}
              placeholder="Phone Number"
              className="p-3 w-full shadow-md rounded-2xl"
              autoComplete="tel"
              inputMode="tel"
            />

            <div className="w-full">
              <textarea
                {...register("desc", { required: true })}
                placeholder="Message..."
                rows={5}
                className="p-3 w-full shadow-md rounded-2xl text-wrap"
              />
              {errors.desc && (
                <span className="text-red-500 text-sm">Please enter a message.</span>
              )}
            </div>

            {Object.keys(errors).length > 0 && (
              <span className="text-red-600">Please complete all required fields.</span>
            )}
            {hasSubmitted && (
              <span className="text-green-600 text-center font-semibold">
                Message submitted! Thank you!
              </span>
            )}

            <input
              type="submit"
              value={isLoading ? "Sending..." : "Submit"}
              disabled={isLoading}
              className={`p-3 w-2/3 shadow-md rounded-2xl bg-red-700 text-white font-bold transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-800"
              }`}
            />
          </form>
        </div>
      </section>
    </>
  );
}
