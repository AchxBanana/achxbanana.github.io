var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = !1, { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = !0;
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, shellRendered && console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Layout: () => Layout,
  default: () => App,
  links: () => links
});
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import { useState, useEffect as useEffect3 } from "react";

// app/routes/components/SmoothScroll.tsx
import { useEffect } from "react";
import Lenis from "lenis";
import { jsx as jsx2 } from "react/jsx-runtime";
function SmoothScroll({ children }) {
  return useEffect(() => {
    let lenis = new Lenis({
      duration: 1.2,
      // Customize scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Easing function
      direction: "vertical",
      // or 'horizontal'
      smooth: !0
    });
    function raf(time) {
      lenis.raf(time), requestAnimationFrame(raf);
    }
    return requestAnimationFrame(raf), () => {
      lenis.destroy();
    };
  }, []), /* @__PURE__ */ jsx2("div", { children });
}

// app/SplashScreen.tsx
import { useEffect as useEffect2, useRef } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var TextScramble = class {
  el;
  chars;
  queue;
  frame;
  frameRequest;
  resolve;
  constructor(el) {
    this.el = el, this.chars = "!<>-_\\/[]{}\u2014=+*^?#________", this.queue = [], this.frame = 0;
  }
  setText(newText) {
    let oldText = this.el.innerText, length = Math.max(oldText.length, newText.length), promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      let from = oldText[i] || "", to = newText[i] || "", start = Math.floor(Math.random() * 40), end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    return cancelAnimationFrame(this.frameRequest), this.frame = 0, this.update(), promise;
  }
  update() {
    let output = "", complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      this.frame >= end ? (complete++, output += to) : this.frame >= start ? ((!char || Math.random() < 0.28) && (this.queue[i].char = this.randomChar()), output += `<span class="dud">${this.queue[i].char}</span>`) : output += from;
    }
    this.el.innerHTML = output, complete === this.queue.length ? this.resolve() : (this.frameRequest = requestAnimationFrame(this.update.bind(this)), this.frame++);
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}, phrases = ["Welcome!"], SplashScreen = () => {
  let textRef = useRef(null), fxRef = useRef(null), counterRef = useRef(0);
  useEffect2(() => {
    textRef.current && (fxRef.current = new TextScramble(textRef.current), next());
  }, []);
  let next = () => {
    fxRef.current && (fxRef.current.setText(phrases[counterRef.current]).then(() => {
      setTimeout(next, 800);
    }), counterRef.current = (counterRef.current + 1) % phrases.length);
  };
  return /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-center h-screen", children: /* @__PURE__ */ jsx3(
    "div",
    {
      className: "text-6xl font-bold font-inter uppercase",
      ref: textRef
    }
  ) });
}, SplashScreen_default = SplashScreen;

// app/root.tsx
import { Fragment, jsx as jsx4, jsxs } from "react/jsx-runtime";
var links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx4("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx4("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx4(Meta, {}),
      /* @__PURE__ */ jsx4(Links, {})
    ] }),
    /* @__PURE__ */ jsx4("body", { className: "tri", children: /* @__PURE__ */ jsxs(SmoothScroll, { children: [
      children,
      /* @__PURE__ */ jsx4(ScrollRestoration, {}),
      /* @__PURE__ */ jsx4(Scripts, {})
    ] }) })
  ] });
}
function App() {
  let [loading, setLoading] = useState(!0);
  return useEffect3(() => {
    let timer = setTimeout(() => setLoading(!1), 2500);
    return () => clearTimeout(timer);
  }, []), /* @__PURE__ */ jsx4(Fragment, { children: loading ? /* @__PURE__ */ jsx4(SplashScreen_default, {}) : /* @__PURE__ */ jsx4("div", { children: /* @__PURE__ */ jsx4(Outlet, {}) }) });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index
});
import { useState as useState2 } from "react";
import LazyLoad from "react-lazyload";
import { motion as motion6, useScroll, useSpring } from "framer-motion";

// app/routes/components/navbar.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var Navbar = ({ isOpen, toggleMenu }) => {
  let menuItems = ["home", "about", "contact"];
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsxs2(
      motion.nav,
      {
        className: "relative w-full md:w-1/2 lg:w-1/3 flex items-center justify-end md:justify-center  rounded-full md:border-2 md:border-black p-4 mt-3 drop-shadow-lg",
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
        children: [
          /* @__PURE__ */ jsx5("div", { className: "hidden md:flex gap-8 items-center justify-center", children: menuItems.map((item) => /* @__PURE__ */ jsx5(
            motion.a,
            {
              href: `#${item}`,
              whileHover: { scale: 1.1, rotate: 5 },
              className: "text-black uppercase hover:text-gray-500 transition duration-300",
              children: item
            },
            item
          )) }),
          /* @__PURE__ */ jsxs2(
            motion.div,
            {
              className: "md:hidden cursor-pointer z-50",
              onClick: toggleMenu,
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.95 },
              children: [
                /* @__PURE__ */ jsx5(
                  "div",
                  {
                    className: `w-6 h-0.5 bg-black mb-1 transition-all ${isOpen ? "rotate-45 translate-y-1.5" : ""}`
                  }
                ),
                /* @__PURE__ */ jsx5(
                  "div",
                  {
                    className: `w-6 h-0.5 bg-black mb-1 transition-all ${isOpen ? "opacity-0" : ""}`
                  }
                ),
                /* @__PURE__ */ jsx5(
                  "div",
                  {
                    className: `w-6 h-0.5 bg-black transition-all ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx5(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx5(
      motion.div,
      {
        className: "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsx5(
          motion.div,
          {
            className: "text-center",
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
            transition: { duration: 0.3 },
            children: menuItems.map((item, index) => /* @__PURE__ */ jsx5(
              motion.a,
              {
                href: `#${item}`,
                className: "block text-4xl uppercase font-bold my-8 text-white hover:text-gray-300 transition duration-300",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 20 },
                transition: { duration: 0.3, delay: index * 0.1 },
                onClick: toggleMenu,
                children: item
              },
              item
            ))
          }
        )
      }
    ) })
  ] });
}, navbar_default = Navbar;

// app/routes/components/hero.tsx
import { motion as motion2 } from "framer-motion";
import { Fragment as Fragment3, jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
function Hero() {
  return /* @__PURE__ */ jsxs3(Fragment3, { children: [
    /* @__PURE__ */ jsxs3("div", { className: "relative w-36 h-36 md:w-64 md:h-64", children: [
      /* @__PURE__ */ jsx6(
        motion2.div,
        {
          className: "absolute inset-0 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 rounded-full",
          initial: { opacity: 0, scale: 1.5 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.5, ease: "easeOut" }
        }
      ),
      /* @__PURE__ */ jsx6(
        motion2.div,
        {
          className: "absolute inset-1 bg-white rounded-full overflow-hidden",
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.7, ease: "easeOut" },
          children: /* @__PURE__ */ jsx6(
            "img",
            {
              src: "/images/pfp.jpg",
              alt: "Profile",
              className: "w-full h-full object-cover"
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxs3(
      motion2.h1,
      {
        className: "font-bold text-3xl md:text-6xl drop-shadow-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 md:mt-10",
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 1 },
        transition: { duration: 0.5, delay: 0.2 },
        children: [
          "Hi! I'm",
          " ",
          /* @__PURE__ */ jsx6(
            motion2.span,
            {
              className: "text-black underline",
              whileHover: { scale: 1.2, color: "#ff6347" },
              transition: { type: "spring", stiffness: 300 },
              children: "Linux nerd"
            }
          ),
          " ",
          ":)"
        ]
      }
    ),
    /* @__PURE__ */ jsxs3(
      motion2.p,
      {
        className: "font-medium text-md md:text-3xl  text-center w-[65%] md:w-[50%]",
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay: 0.4 },
        children: [
          `"In a world dominated by ones and zeros, I'm a digital alchemist, turning pixels into magic."`,
          " "
        ]
      }
    )
  ] });
}

// app/routes/components/everyLink.tsx
import { motion as motion3 } from "framer-motion";
import { useEffect as useEffect4 } from "react";
import { PiCertificate } from "react-icons/pi";
import { FaWrench } from "react-icons/fa6";
import { LiaAwardSolid } from "react-icons/lia";
import Lenis2 from "lenis";
import { Fragment as Fragment4, jsx as jsx7, jsxs as jsxs4 } from "react/jsx-runtime";
function EveryLink() {
  return useEffect4(() => {
    let lenis = new Lenis2(), raf = (time) => {
      lenis.raf(time), requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    let handleAnchorClick = (e) => {
      e.preventDefault();
      let targetId = e.currentTarget.getAttribute("href");
      targetId.startsWith("#") && lenis.scrollTo(targetId);
    };
    return document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    }), () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      }), lenis.destroy();
    };
  }, []), /* @__PURE__ */ jsx7(Fragment4, { children: /* @__PURE__ */ jsxs4(
    motion3.div,
    {
      className: "flex flex-wrap justify-center gap-8 md:gap-32 items-center text-sm md:text-xl",
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.6 },
      children: [
        /* @__PURE__ */ jsxs4(
          motion3.a,
          {
            href: "#competition",
            whileHover: { scale: 1.1, rotate: 5 },
            className: "flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx7(LiaAwardSolid, {}),
              /* @__PURE__ */ jsx7("span", { children: "competition" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs4(
          motion3.a,
          {
            href: "#ability",
            whileHover: { scale: 1.1, rotate: -5 },
            className: "flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx7(FaWrench, {}),
              /* @__PURE__ */ jsx7("span", { children: "ability" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs4(
          motion3.a,
          {
            href: "#certificate",
            whileHover: { scale: 1.1, rotate: 5 },
            className: "flex items-center gap-1",
            children: [
              /* @__PURE__ */ jsx7(PiCertificate, {}),
              /* @__PURE__ */ jsx7("span", { children: "Certificate" })
            ]
          }
        )
      ]
    }
  ) });
}

// app/routes/components/ImageSlideRevealGrid.tsx
import { motion as motion4 } from "framer-motion";
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
var ImageSlideReveal = ({ imageSrc, altText, date, title, description }) => /* @__PURE__ */ jsx8("section", { id: "competition", children: /* @__PURE__ */ jsxs5("div", { className: "relative w-full aspect-square overflow-hidden group  shadow-lg", children: [
  /* @__PURE__ */ jsx8(
    motion4.div,
    {
      className: "absolute inset-0 transition-transform rounded-md duration-300 ease-in-out group-hover:translate-x-full",
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.6 },
      viewport: { once: !0 },
      children: /* @__PURE__ */ jsx8(
        "img",
        {
          src: imageSrc,
          className: "object-cover w-full h-full rounded-lg",
          alt: altText
        }
      )
    }
  ),
  /* @__PURE__ */ jsxs5(
    motion4.div,
    {
      initial: { opacity: 0, x: -50 },
      whileInView: { opacity: 1, x: 0 },
      transition: { duration: 0.6, delay: 0.8 },
      viewport: { once: !0 },
      children: [
        /* @__PURE__ */ jsxs5("div", { className: "relative p-4 sm:p-6 lg:p-8", children: [
          /* @__PURE__ */ jsx8("p", { className: "text-sm font-semibold font-inter uppercase tracking-widest text-pink-400", children: date }),
          /* @__PURE__ */ jsxs5("p", { className: "text-xl font-bold text-white sm:text-2xl", children: [
            title,
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsx8("div", { className: "absolute inset-0 bg-gray-800 bg-opacity-75 text-white p-4 flex rounded-md items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx8("p", { className: "font-semibold font-prompt text-sm md:text-lg", children: description }) })
      ]
    }
  )
] }) }), ImageSlideRevealGrid = () => /* @__PURE__ */ jsxs5("div", { className: "container mx-auto p-4", children: [
  /* @__PURE__ */ jsx8("h2", { className: "text-md md:text-2xl font-bold mb-4", children: "My competition" }),
  /* @__PURE__ */ jsx8("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    {
      src: "/images/present.jpg",
      alt: "ROS",
      date: "2024",
      title: "ERR 404",
      description: "I wanna die pls helpppp!!"
    },
    {
      src: "/images/present2.jpg",
      alt: "WebApp com",
      date: "2024",
      title: "python to hell",
      description: "I love CPP So much"
    }
  ].map((image, index) => /* @__PURE__ */ jsx8(
    ImageSlideReveal,
    {
      imageSrc: image.src,
      altText: image.alt,
      date: image.date,
      title: image.title,
      description: image.description
    },
    index
  )) })
] }), ImageSlideRevealGrid_default = ImageSlideRevealGrid;

// app/routes/components/contact.tsx
import { motion as motion5 } from "framer-motion";
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
function Contact() {
  return /* @__PURE__ */ jsx9("section", { id: "contact", className: "py-16", children: /* @__PURE__ */ jsxs6(
    motion5.div,
    {
      className: "flex flex-col items-center gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      initial: { opacity: 0, scale: 0 },
      whileInView: { opacity: 1, scale: 1 },
      transition: { duration: 0.6 },
      viewport: { once: !0 },
      children: [
        /* @__PURE__ */ jsx9("div", { className: "text-center", children: /* @__PURE__ */ jsx9(
          "a",
          {
            href: "mailto:achxpj@gmail.com",
            className: "text-xl font-inter uppercase font-semibold md:font-bold lg:font-bold md:text-4xl lg:text-4xl text-gray-800 border-b-2 border-gray-800 border-opacity-70 text-opacity-70 hover:text-opacity-100 hover:border-opacity-100 transition duration-300",
            children: "AHHHH@eieizaza"
          }
        ) }),
        /* @__PURE__ */ jsx9(
          "a",
          {
            href: "https://github.com/AchxBanana",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "mt-4",
            children: /* @__PURE__ */ jsx9("button", { className: "px-6 py-3 text-lg font-bold text-white bg-gray-800 hover:bg-gray-900 rounded-md transition duration-300", children: "GitHub" })
          }
        ),
        /* @__PURE__ */ jsx9("p", { className: "mt-10 text-center text-lg text-gray-600", children: "huhuhuhuh" })
      ]
    }
  ) });
}

// app/routes/_index.tsx
import { Fragment as Fragment5, jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
function Index() {
  let { scrollYProgress } = useScroll(), scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 1e-3
  }), [isOpen, setIsOpen] = useState2(!1), toggleMenu = () => setIsOpen(!isOpen);
  return console.log(isOpen), /* @__PURE__ */ jsx10(Fragment5, { children: /* @__PURE__ */ jsxs7(LazyLoad, { hedight: 200, children: [
    /* @__PURE__ */ jsx10(
      motion6.div,
      {
        className: "progress-bar fixed top-0 left-0 h-1 md:h-2 right-0 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% z-50",
        style: { scaleX }
      }
    ),
    /* @__PURE__ */ jsxs7(
      "div",
      {
        className: "flex flex-col gap-16 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [
          /* @__PURE__ */ jsx10(navbar_default, { isOpen, toggleMenu }),
          /* @__PURE__ */ jsx10(Hero, {}),
          /* @__PURE__ */ jsx10(EveryLink, {}),
          /* @__PURE__ */ jsx10(ImageSlideRevealGrid_default, {})
        ]
      }
    ),
    /* @__PURE__ */ jsx10(Contact, {})
  ] }) });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-5VYYJNJ5.js", imports: ["/build/_shared/chunk-YBX7ALZM.js", "/build/_shared/chunk-VG7UYV5E.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-Q2V4EN37.js", imports: ["/build/_shared/chunk-MNP2IIQB.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-ZQF34MB4.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "081bfcf8", hmr: void 0, url: "/build/manifest-081BFCF8.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1, unstable_routeConfig: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
