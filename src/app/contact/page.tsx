'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js';

// BACKGROUND PATTERN
import geeseGrid from '/public/about-pg-assets/contact-page-geese.jpg';

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ContactUs() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [hasSubmitted, setSubmissionMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const removeBottomLeftBadge = () => {
      const all = document.querySelectorAll<HTMLElement>('*');
      all.forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.position !== 'fixed') return;

        const r = el.getBoundingClientRect();
        const nearLeft  = r.left <= 200;                            // ~bottom-left corner
        const nearBottom = window.innerHeight - r.bottom <= 220;
        const smallish = r.width * r.height <= 80_000;              // e.g., ≤ 282px circle
        if (nearLeft && nearBottom && smallish) {
          el.remove();
        }
      });
    };

    removeBottomLeftBadge();                                        // first pass
    const mo = new MutationObserver(removeBottomLeftBadge);         // handle late injection
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  const sendContactFormData = async (userInput: any) => {
    try {
      setIsLoading(true);
      await supabaseClient.from('GeneralQuestions').insert({
        first_name: userInput.firstName,
        last_name: userInput.lastName,
        email: userInput.email,
        phone_num: userInput.phoneNum,
        desc: userInput.desc,
      });
      setSubmissionMessage(true);
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 🔷 Put the pattern on the BODY itself.
          This guarantees the footer is never covered and stays clickable. */}
      <style jsx global>{`
        body {
          background-image: url(${geeseGrid.src});
          background-repeat: repeat;
          background-attachment: fixed;
          background-position: center top;
          background-size: clamp(420px, 32vw, 560px) auto;
          background-color: #fbf8f4;
        }
      `}</style>

      {/* 🔶 Keep your original flow so the footer renders AFTER this section */}
      <section className="relative py-28 px-4 md:px-16 lg:px-72">
        <div className="relative bg-white text-black flex flex-col items-center p-5 gap-4 text-center rounded-3xl shadow-lg">
          <h3 className="text-4xl tracking-wide font-bold">Contact Us!</h3>

          <p className="w-4/5">
            Get in touch with us if you have any questions, comments, or concerns!
            <br /><br />
            Click the icons for our socials below!
          </p>

          <div className="flex flex-row gap-5 text-4xl md:text-5xl md:p-4 md:gap-9">
            <a href="https://www.instagram.com/shpe_ru/" target="_blank" rel="noopener noreferrer">
              <img src="/socials/instagram-logo.png" alt="Instagram" className="w-10 h-10 md:w-12 md:h-12 bg-transparent" />
            </a>
            <a href="https://www.linkedin.com/in/rutgers-university-shpe-686bba295" target="_blank" rel="noopener noreferrer">
              <img src="/socials/linkedin-logo.png" alt="LinkedIn" className="w-10 h-10 md:w-12 md:h-12 bg-transparent" />
            </a>
            <a href="https://www.facebook.com/rutgers.she/" target="_blank" rel="noopener noreferrer">
              <img src="/socials/facebook-logo.png" alt="Facebook" className="w-10 h-10 md:w-12 md:h-12 bg-transparent" />
            </a>
            <a href="https://www.tiktok.com/@shpe_ru" target="_blank" rel="noopener noreferrer">
              <img src="/socials/tiktok-logo.png" alt="TikTok" className="w-10 h-10 md:w-12 md:h-12 bg-transparent" />
            </a>
          </div>

          <form onSubmit={handleSubmit(sendContactFormData)} className="flex flex-col items-center my-2 gap-5 w-full lg:p-5" noValidate>
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="w-full">
                <input
                  {...register('firstName', { required: true })}
                  placeholder="First Name *"
                  className="p-3 w-full shadow-md rounded-2xl"
                  autoComplete="given-name"
                />
                {errors.firstName && <span className="text-red-500 text-sm">First name is required.</span>}
              </div>
              <div className="w-full">
                <input
                  {...register('lastName', { required: true })}
                  placeholder="Last Name *"
                  className="p-3 w-full shadow-md rounded-2xl"
                  autoComplete="family-name"
                />
                {errors.lastName && <span className="text-red-500 text-sm">Last name is required.</span>}
              </div>
            </div>

            <div className="w-full">
              <input
                {...register('email', { required: true })}
                placeholder="Email *"
                type="email"
                className="p-3 w-full shadow-md rounded-2xl"
                autoComplete="email"
              />
              {errors.email && <span className="text-red-500 text-sm">Valid email is required.</span>}
            </div>

            <input
              {...register('phoneNum')}
              placeholder="Phone Number"
              className="p-3 w-full shadow-md rounded-2xl"
              autoComplete="tel"
              inputMode="tel"
            />

            <div className="w-full">
              <textarea
                {...register('desc', { required: true })}
                placeholder="Message..."
                rows={5}
                className="p-3 w-full shadow-md rounded-2xl text-wrap"
              />
              {errors.desc && <span className="text-red-500 text-sm">Please enter a message.</span>}
            </div>

            {Object.keys(errors).length > 0 && <span className="text-red-600">Please complete all required fields.</span>}
            {hasSubmitted && <span className="text-green-600 text-center font-semibold">Message submitted! Thank you!</span>}

            <input
              type="submit"
              value={isLoading ? 'Sending...' : 'Submit'}
              disabled={isLoading}
              className={`p-3 w-2/3 shadow-md rounded-2xl bg-red-700 text-white font-bold transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800'
              }`}
            />
          </form>
        </div>
      </section>
      {/* Footer (from your layout) will render below this section as usual */}
    </>
  );
}
