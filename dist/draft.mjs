// Generated bundle — source: bluepeek lead-scraper (private). Do not edit.

// texts/draft.ts
import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// dash/src/lib/outreach/segments.ts
var SMS_COST_AUD = Number(process.env.NEXT_PUBLIC_SMS_COST_AUD ?? 0.03);
var SMS_COST_UK_AUD = Number(process.env.NEXT_PUBLIC_SMS_COST_UK_AUD ?? 0.075);
var GBP_PER_AUD = Number(process.env.NEXT_PUBLIC_GBP_PER_AUD ?? 0.49);

// dash/src/lib/outreach/compose.ts
function stripNonGsm(s) {
  return s.replace(/[‘’‛]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/…/g, "...").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F£€]/g, "");
}
function gsmLen(s) {
  let len = 0;
  for (const ch of s) len += "^{}\\[~]|\u20AC".includes(ch) ? 2 : 1;
  return len;
}

// dash/src/lib/lead-finder/website-kind.ts
var SOCIAL_HOST_RE = /(^|\.)((facebook|instagram|tiktok)\.com|linktr\.ee|m\.me|wa\.me|fb\.me|linkin\.bio|business\.site|fresha\.com|booksy\.com|treatwell\.(co\.uk|com)|square\.site|setmore\.com|simplybook\.(it|me)|gettimely\.com|calendly\.com|appointedd\.com|ueniweb\.com|godaddysites\.com|yell\.com|bark\.com|vagaro\.com|styleseat\.com|wixsite\.com|weebly\.com|squarespace\.com|myshopify\.com|jimdosite\.com|jimdo\.com|strikingly\.com|webs\.com|blogspot\.com|wordpress\.com|sites\.google\.com|webnode\.(com|page)|yellowpages\.com\.au|truelocal\.com\.au|hotfrog\.com\.au|localsearch\.com\.au|hipages\.com\.au|oneflare\.com\.au|airtasker\.com|serviceseeking\.com\.au)($|\/|:)/i;
var BOOKING_HOSTS = /* @__PURE__ */ new Set([
  "book.squareup.com",
  "app.squareup.com",
  "book.clientdiary.com",
  "booking.clientdiary.com",
  "booking.moego.pet",
  "form.jotform.com"
]);
function classifyWebsite(uri) {
  if (!uri) return "none";
  try {
    const url = new URL(/^https?:\/\//i.test(uri) ? uri : `https://${uri}`);
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const booking = BOOKING_HOSTS.has(host) || host === "squareup.com" && /^\/appointments(?:\/|$)/i.test(url.pathname) || host === "docs.google.com" && /^\/forms(?:\/|$)/i.test(url.pathname);
    return SOCIAL_HOST_RE.test(host) || booking ? "social" : "real";
  } catch {
    return "real";
  }
}

// dash/src/lib/outreach/franchise.ts
var BRANDS = [
  // Fitness
  "anytime fitness",
  "snap fitness",
  "plus fitness",
  "jetts",
  "f45",
  "fernwood",
  "goodlife health",
  "genesis health",
  "crunch fitness",
  "world gym",
  "12rnd",
  "ubx",
  "club pilates",
  "orangetheory",
  "bft",
  "body fit training",
  "zap fitness",
  // Hair, beauty, skin
  "just cuts",
  "hairhouse",
  "price attack",
  "ella bache",
  "ella bach",
  "endota",
  "laser clinics",
  "australian skin clinics",
  "silk laser",
  "brazilian butterfly",
  "amazing lash",
  "sugarcoat",
  "city cave",
  // Automotive
  "bob jane",
  "beaurepaires",
  "tyrepower",
  "jax tyres",
  "kmart tyre",
  "mycar",
  "ultra tune",
  "midas mufflers",
  "lube mobile",
  "repco",
  "supercheap auto",
  "autobarn",
  "burson auto",
  "battery world",
  "auto masters",
  "ultratune",
  "national tiles",
  "bridgestone select",
  "goodyear autocare",
  // Trades / home services
  "jim's",
  "jims mowing",
  "jims cleaning",
  "hire a hubby",
  "poolwerx",
  "vip home services",
  "fantastic services",
  "chem-dry",
  "chemdry",
  "electrodry",
  "jetmaster",
  "metricon",
  "hipages",
  "aussie broadband",
  "snap print",
  "kwik kopy",
  "signarama",
  "worldwide printing",
  // Health / pharmacy / optical
  "chemist warehouse",
  "priceline pharmacy",
  "terrywhite",
  "amcal",
  "h&r block",
  "hr block",
  "itp accounting",
  "etax",
  "guardian pharmacy",
  "specsavers",
  "opsm",
  "bupa",
  "smile solutions",
  "pacific smiles",
  "national hearing",
  "hearing australia",
  // Real estate
  "ray white",
  "lj hooker",
  "harcourts",
  "first national",
  "barry plant",
  "century 21",
  "re/max",
  "remax",
  "raine & horne",
  "raine and horne",
  "mcgrath estate",
  "professionals real estate",
  "elders real estate",
  "belle property",
  "place estate",
  // Food / retail chains that slip through as "service"
  "bakers delight",
  "brumby's",
  "brumbys",
  "michel's patisserie",
  "donut king",
  "muffin break",
  "gloria jean",
  "the coffee club",
  "boost juice",
  "zambrero",
  "guzman y gomez",
  "subway",
  "domino's",
  "dominos pizza",
  "pizza hut",
  "red rooster",
  "hungry jack",
  "nando's",
  "grill'd",
  "oporto",
  "chatime",
  "7-eleven",
  "night owl",
  "iga ",
  "foodworks",
  "cellarbrations",
  "bws",
  "dan murphy",
  "liquorland",
  "thirsty camel",
  "bottlemart",
  // Other national footprints
  "australia post",
  "officeworks",
  "bunnings",
  "mitre 10",
  "home timber",
  "reece plumbing",
  "tradelink",
  "total tools",
  "sydney tools",
  "rebel sport",
  "petbarn",
  "greencross vets",
  "petstock",
  "the good guys",
  "harvey norman",
  "jb hi-fi",
  "fantastic furniture",
  "amart",
  "freedom furniture",
  "beacon lighting",
  "autopro"
];
function normaliseName(raw) {
  return String(raw ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}
var NORMALISED_BRANDS = BRANDS.map((b) => normaliseName(b)).filter(Boolean);
function matchFranchiseBrand(businessName) {
  const name = normaliseName(businessName);
  if (!name) return null;
  const padded = ` ${name} `;
  for (const brand of NORMALISED_BRANDS) {
    if (padded.includes(` ${brand} `) || padded.startsWith(` ${brand} `) || padded.endsWith(` ${brand} `)) {
      return brand;
    }
  }
  return null;
}
var MULTI_SUFFIX = /\.(com|net|org|co|edu|gov|asn|id)\.(au|uk|nz|za)$/;
var TENANT_HOST_SUFFIXES = [".my.canva.site", ".lovable.app", ".company.site"];
function chainDomain(website) {
  if (!website || classifyWebsite(website) === "social") return null;
  try {
    const host = new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`).hostname.toLowerCase().replace(/^www\./, "");
    if (TENANT_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix))) return host;
  } catch {
    return null;
  }
  return rootDomain(website);
}
function rootDomain(website) {
  const raw = String(website ?? "").trim();
  if (!raw) return null;
  let host;
  try {
    host = new URL(raw.includes("://") ? raw : `https://${raw}`).hostname.toLowerCase();
  } catch {
    return null;
  }
  host = host.replace(/^www\./, "");
  if (!host.includes(".")) return null;
  const parts = host.split(".");
  const keep = MULTI_SUFFIX.test(host) ? 3 : 2;
  return parts.slice(-keep).join(".");
}
var GENERIC_NAME_WORDS = /* @__PURE__ */ new Set([
  "the",
  "and",
  "group",
  "services",
  "service",
  "company",
  "australia",
  "australian",
  "solutions",
  "centre",
  "center",
  "pty",
  "ltd",
  "limited",
  "gold",
  "coast",
  "north",
  "south",
  "east",
  "west",
  "city",
  "local"
]);
var BRANCH_PATH = /\/(locations?|stores?|branch(es)?|find-a-|our-|franchise|clinics?|gyms?|centres?|dealers?)\b/i;
function isBranchPage(website, businessName) {
  const raw = String(website ?? "").trim();
  if (!raw || classifyWebsite(raw) === "social") return false;
  let url;
  try {
    url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return false;
  }
  if (TENANT_HOST_SUFFIXES.some((suffix) => url.hostname.toLowerCase().endsWith(suffix))) return false;
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length === 0) return false;
  if (BRANCH_PATH.test(url.pathname)) return true;
  if (segments.length < 2) return false;
  const host = (chainDomain(raw) ?? "").replace(/\..*$/, "");
  const words = normaliseName(businessName).split(" ").filter((w) => w.length >= 4 && !GENERIC_NAME_WORDS.has(w));
  if (words.length === 0) return false;
  return !words.some((w) => host.includes(w));
}
var NOT_FRANCHISE = { franchise: false };
function isFranchiseLead(businessName, website, chainIndex) {
  const brand = matchFranchiseBrand(businessName);
  if (brand) return { franchise: true, reason: "brand", detail: brand };
  const domain = chainDomain(website);
  if (domain && chainIndex?.domains.has(domain)) {
    return { franchise: true, reason: "chain-domain", detail: domain };
  }
  if (isBranchPage(website, businessName)) {
    return { franchise: true, reason: "branch-page", detail: domain ?? "" };
  }
  return NOT_FRANCHISE;
}

// dash/src/lib/outreach/personal-writer.ts
var STATES = { Wa: "WA", Qld: "QLD", Nsw: "NSW", Vic: "VIC", Sa: "SA", Nt: "NT", Tas: "TAS", Act: "ACT", Uk: "UK" };
function cleanName(raw) {
  let n = stripNonGsm(raw.replace(/&amp;/g, "&"));
  n = n.replace(/\s*\(.*?\)/g, "").replace(/\s+-\s*[A-Z]{2,5}$/, "");
  n = n.replace(/\b(pty\.?\s*ltd\.?|pty|ltd|limited)\b\.?/gi, "");
  n = n.split(/\s+[-|:]\s+|\s*\|\s*/)[0];
  n = n.replace(/\s+/g, " ").replace(/^[\s,.-]+|[\s,.-]+$/g, "");
  if (n && (n === n.toUpperCase() || n === n.toLowerCase())) {
    n = n.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).split(" ").map((w) => STATES[w] ?? w).join(" ");
  }
  return n;
}
function greetingNames(raw) {
  const n = cleanName(raw);
  const out = [n];
  for (const sep of [",", " & ", " and ", " - ", " -"]) if (n.includes(sep)) out.push(n.split(sep)[0].trim());
  const w = n.split(" ");
  while (w.length > 2) {
    w.pop();
    if (!/^(the|and|&|of|in|-)$/i.test(w[w.length - 1])) out.push(w.join(" "));
  }
  return [...new Set(out)].filter((x) => x.length >= 4 && x.length <= 22 && x.toLowerCase() !== "the");
}
function openers(nm) {
  if (!nm) return ["Hey it's Zach from BluePeek, I went ahead and built you a website preview:", "Hey it's Zach from BluePeek, I built you a website preview:"];
  return [
    `Hey it's Zach from BluePeek, I went ahead and built you a website preview for ${nm}:`,
    `Hey it's Zach from BluePeek, I built a website preview for ${nm}:`,
    `Hey it's Zach from BluePeek, made a website preview for ${nm}:`
  ];
}
var PERSONAL_VERSIONS = ["P3", "P4"];
function otherDay(nm) {
  if (!nm) return ["Hey it's Zach from the other day, I went ahead and built you a website preview:"];
  return [
    `Hey it's Zach from the other day, I went ahead and built you a website preview for ${nm}:`,
    `Hey it's Zach from the other day, I built a website preview for ${nm}:`,
    `Hey it's Zach from the other day, made a website preview for ${nm}:`
  ];
}
function hash(s) {
  let h = 0;
  for (const ch of s) h = h * 31 + ch.charCodeAt(0) | 0;
  return Math.abs(h);
}
function writePersonalText(i) {
  if (isFranchiseLead(i.businessName).franchise) return null;
  const variant = PERSONAL_VERSIONS[hash(i.seed) % 2];
  const footer = variant === "P4" ? "BluePeek - STOP to opt out" : "STOP to opt out";
  for (const nm of [...greetingNames(i.businessName), null]) {
    for (const line of variant === "P4" ? otherDay(nm) : openers(nm)) {
      const template = stripNonGsm(`${line}
`) + `{demo_url}
${footer}`;
      if (gsmLen(template.replace("{demo_url}", i.demoUrl)) <= 160) return { template, variant };
    }
  }
  return null;
}

// dash/src/lib/outreach/short-link.ts
var PUBLIC_SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://bluepeekdashboard.com.au";
var PUBLIC_SITE_AU = process.env.OUTREACH_SHORT_DOMAIN_AU || "https://www.bluepeek.com.au";
var PUBLIC_SITE_UK = process.env.OUTREACH_SHORT_DOMAIN_UK || "https://bluepeek.co.uk";
var PUBLIC_SITE_IE = process.env.OUTREACH_SHORT_DOMAIN_IE || "";
function demoShortUrl(code, region) {
  if (region === "UK") return `${PUBLIC_SITE_UK}/demo/${code}`;
  if (region === "IE" && PUBLIC_SITE_IE) return `${PUBLIC_SITE_IE}/demo/${code}`;
  if (!region || region === "AU") return `${PUBLIC_SITE_AU}/demo/${code}`;
  return `${PUBLIC_SITE}/d/${code}`;
}

// texts/draft.ts
var URL2 = "https://jephybyldjxflgovctov.supabase.co/rest/v1/rpc/";
var KEY = "sb_publishable_ioyHefO5w16G_bknnupnpA_we3iG3z2";
var TOKEN = (process.env.SCRAPER_TOKEN ?? readFileSync(join(homedir(), ".config/bluepeek-lead-scraper/token"), "utf8")).trim();
var rpc = async (fn, args) => {
  const r = await fetch(URL2 + fn, {
    method: "POST",
    headers: { apikey: KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ p_token: TOKEN, ...args }),
    signal: AbortSignal.timeout(11e4)
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`${fn} ${r.status} ${t.slice(0, 300)}`);
  return JSON.parse(t);
};
var limit = Number(process.argv[2] ?? 3e3);
var cands = await rpc("scraper_personal_candidates", { p_limit: limit });
var rows = [];
var franchise = 0;
for (const c of cands) {
  const text = writePersonalText({
    businessName: c.business_name,
    category: c.category,
    suburb: c.suburb,
    region: "AU",
    seed: c.id,
    rating: c.rating,
    reviewCount: c.review_count,
    websiteKind: c.website_kind,
    demoUrl: demoShortUrl(c.short_code || c.demo_slug, "AU")
  });
  if (text) rows.push({ id: c.id, ...text });
  else franchise++;
}
console.log(`candidates ${cands.length}, written ${rows.length}, skipped (franchise/too long) ${franchise}`);
for (const r of rows.slice(0, 4)) console.log("---\n" + r.template);
if (process.env.DRY_RUN !== "1") {
  let saved = 0;
  for (let i = 0; i < rows.length; i += 200) saved += await rpc("scraper_save_personal", { p_rows: rows.slice(i, i + 200) });
  console.log(`saved + approved: ${saved}`);
}
