"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import "./event-flyer-preview.component.css";

export default function FlyerPreview({ src, title, onClose }: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const trigger = document.activeElement instanceof HTMLElement
      ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="flyer-preview"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); event.stopPropagation(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") event.stopPropagation();
        // The close button is the preview's only interactive control.
        if (event.key === "Tab") {
          event.preventDefault();
          closeRef.current?.focus();
        }
      }}
    >
      <div className="flyer-preview-panel">
        <h2 ref={titleRef} id={titleId} tabIndex={-1} className="sr-only">{title}</h2>
        <button ref={closeRef} type="button" className="flyer-preview-close" onClick={onClose} aria-label="Close flyer">
          <X aria-hidden="true" strokeWidth={1.5} />
        </button>
        {/* Calendar flyers can come from external hosts and Google Drive. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={`Flyer for ${title}`} className="flyer-preview-image" />
      </div>
    </dialog>
  );
}
