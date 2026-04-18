"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Item = {
  label: string;
  href: string;
  disabled?: boolean;
};

export default function InPageSidebar({
  items,
  basePath,
}: {
  items: Item[];
  basePath: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "bg-gray-900 text-white transition-all duration-300 rounded-xl opacity-85",
        collapsed ? "w-16" : "w-44",
      )}>
      {/* toggle */}
      <div className="p-4 flex justify-start">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="cursor-pointer">
          <Menu size={20} />
        </button>
      </div>

      <nav className="flex flex-col gap-2 px-2 pb-4">
        {items.map((item, index) => {
          const fullHref = `${basePath}${item.href}`;

          const isActive =
            item.href === "/"
              ? pathname === basePath || pathname === `${basePath}/`
              : pathname.startsWith(fullHref);

          return (
            <SidebarLink
              key={index}
              href={fullHref}
              label={item.label}
              isActive={isActive}
              isDisabled={item.disabled ?? false}
              collapsed={collapsed}
            />
          );
        })}
      </nav>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  isActive,
  isDisabled,
  collapsed,
}: {
  href: string;
  label: string;
  isActive: boolean;
  isDisabled: boolean;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault();
        }
      }}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md transition-all",
        "text-gray-300 hover:bg-gray-800 hover:text-white",

        isActive &&
          "bg-gray-800 text-white font-medium border-l-2 border-white",

        isDisabled && "opacity-40 pointer-events-none",
      )}>
      {/* icon placeholder */}
      <div className="w-5 h-5 bg-gray-400 rounded shrink-0" />

      {/* label */}
      <span
        className={cn(
          "whitespace-nowrap transition-opacity",
          collapsed && "opacity-0 w-0 overflow-hidden",
        )}>
        {label}
      </span>
    </Link>
  );
}

//////////////////////////////////////////////////////////////////////
// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/utils/styles";

// type Item = {
//   label: string;
//   href: string;
//   disabled?: boolean;
// };

// export default function InPageSidebar({
//   basePath,
//   items,
// }: {
//   basePath: string;
//   items: Item[];
// }) {
//   const pathname = usePathname();

//   return (
//     <div className="flex flex-col justify-between min-w-62.5 mr-2 h-full">
//       <div className="flex flex-col gap-1 px-2">
//         {items.map((item, index) => {
//           const { label, href, disabled = false } = item;
//           const fullHref = `${basePath}${href}`;
//           const isActive =
//             href === "/"
//               ? pathname === basePath || pathname === `${basePath}/`
//               : pathname === fullHref;
//           return (
//             <SidebarLink
//               key={index}
//               href={fullHref}
//               label={label}
//               isActive={isActive}
//               isDisabled={disabled}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function SidebarLink({
//   href,
//   label,
//   isActive,
//   isDisabled,
// }: {
//   href: string;
//   label: string;
//   isActive: boolean;
//   isDisabled: boolean;
// }) {
//   return (
//     <>
//       <Link
//         href={href}
//         onClick={(e) => {
//           if (isDisabled) {
//             e.preventDefault();
//             return;
//           }
//         }}
//         className={cn(
//           "p-2 py-3 rounded-md text-sm text-gray-500 hover:text-foreground transition-colors",
//           isActive &&
//             "bg-accent text-foreground font-medium hover:text-foreground",
//           isDisabled && "text-gray-600 cursor-not-allowed hover:text-gray-700",
//         )}>
//         <div className="flex items-center gap-2">
//           <div className="leading-none">{label}</div>
//         </div>
//       </Link>
//     </>
//   );
// }
