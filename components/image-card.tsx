"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  title: string;
  description: string;
  tag?: string;
  youtubeId?: string;
  aspectRatio?: "video" | "square" | "portrait";
  className?: string;
}

export function ImageCard({
  title,
  description,
  tag,
  youtubeId,
  aspectRatio = "video",
  className,
}: ImageCardProps) {
  const [play, setPlay] = useState(false);

  const aspectMap = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  };

  const thumbnail = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : null;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm hover:shadow-md",
        className,
      )}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-black",
          aspectMap[aspectRatio],
        )}>
        {youtubeId && !play && (
          <button
            onClick={() => setPlay(true)}
            className="relative h-full w-full">
            <img
              src={thumbnail!}
              alt={title}
              className="h-full w-full object-cover"
            />

            {/* overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-8 w-8 text-black" />
              </div>
            </div>
          </button>
        )}

        {youtubeId && play && (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}

        {tag && (
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-0.5 text-xs text-white">
            {tag}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}
///////////////////////////////////////////////////////////////////
// This component is a work in progress and is not currently used in the app.
// It serves as a design exploration for a potential future feature.
// The code is intentionally left here for reference and may be revisited later.
// Please do not use or modify this component without consulting the original author.
/////////////////////////////////////////////////////////////////
// import { ImageIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ImageCardProps {
//   title: string;
//   description: string;
//   tag?: string;
//   youtubeId?: string;
//   aspectRatio?: "video" | "square" | "portrait";
//   className?: string;
// }

// export function ImageCard({
//   title,
//   description,
//   tag,
//   youtubeId,
//   aspectRatio = "video",
//   className,
// }: ImageCardProps) {
//   const aspectMap = {
//     video: "aspect-video",
//     square: "aspect-square",
//     portrait: "aspect-[3/4]",
//   };

//   return (
//     <article
//       className={cn(
//         "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md",
//         className,
//       )}>
//       <div
//         className={cn(
//           "relative w-full overflow-hidden bg-image-placeholder",
//           aspectMap[aspectRatio],
//         )}>
//         {youtubeId ? (
//           <iframe
//             className="absolute inset-0 h-full w-full"
//             src={`https://www.youtube.com/embed/${youtubeId}`}
//             title={title}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           />
//         ) : (
//           <>
//             {/* Grid texture */}
//             <div className="absolute inset-0 bg-size-[24px_24px] bg-[linear-gradient(to_right,oklch(0.85_0_0/40%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.85_0_0/40%)_1px,transparent_1px)]" />

//             {/* Icon */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-transform duration-200 group-hover:scale-110">
//                 <ImageIcon className="h-6 w-6 text-muted-foreground" />
//               </div>
//             </div>
//           </>
//         )}

//         {tag && (
//           <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
//             {tag}
//           </span>
//         )}
//       </div>

//       <div className="flex flex-1 flex-col gap-2 p-5">
//         <h3 className="text-balance text-base font-semibold leading-snug text-card-foreground">
//           {title}
//         </h3>
//         <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
//           {description}
//         </p>
//       </div>
//     </article>
//   );
// }
/////////////////////////////////////////////////////////////////////
// This component is a work in progress and is not currently used in the app.
// It serves as a design exploration for a potential future feature.
// The code is intentionally left here for reference and may be revisited later.
// Please do not use or modify this component without consulting the original author.
///////////////////////////////////////////////////////////////////
// import { ImageIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface ImageCardProps {
//   title: string;
//   description: string;
//   tag?: string;
//   aspectRatio?: "video" | "square" | "portrait";
//   className?: string;
// }

// export function ImageCard({
//   title,
//   description,
//   tag,
//   aspectRatio = "video",
//   className,
// }: ImageCardProps) {
//   const aspectMap = {
//     video: "aspect-video",
//     square: "aspect-square",
//     portrait: "aspect-[3/4]",
//   };

//   return (
//     <article
//       className={cn(
//         "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md",
//         className,
//       )}>
//       {/* Image placeholder */}
//       <div
//         className={cn(
//           "relative w-full overflow-hidden bg-image-placeholder",
//           aspectMap[aspectRatio],
//         )}
//         aria-hidden="true">
//         {/* Subtle grid texture */}
//         <div className="absolute inset-0 bg-size-[24px_24px] bg-[linear-gradient(to_right,oklch(0.85_0_0/40%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.85_0_0/40%)_1px,transparent_1px)]" />

//         {/* Centre icon */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-transform duration-200 group-hover:scale-110">
//             <ImageIcon className="h-6 w-6 text-muted-foreground" />
//           </div>
//         </div>

//         {/* Optional tag */}
//         {tag && (
//           <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
//             {tag}
//           </span>
//         )}
//       </div>

//       {/* Card body */}
//       <div className="flex flex-1 flex-col gap-2 p-5">
//         <h3 className="text-balance text-base font-semibold leading-snug text-card-foreground">
//           {title}
//         </h3>
//         <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
//           {description}
//         </p>
//       </div>
//     </article>
//   );
// }
