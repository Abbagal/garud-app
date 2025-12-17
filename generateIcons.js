
const btoa = (str) => Buffer.from(str).toString('base64');

const colors = {
  PERSON: '#ef4444',
  ORG: '#f97316',
  LOC: '#3b82f6',
  FINANCE: '#10b981',
  COMMS: '#8b5cf6',
  WEAPON: '#dc2626',
};

const fill = '#334155'; // slate-700, lighter than bg

// Helper to create SVG string
const createSVG = (content) => `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
  ${content}
</svg>`.trim();

// Definitions
const icons = {
  PERSON: createSVG(`
    <circle cx="12" cy="12" r="11" fill="${fill}" stroke="${colors.PERSON}" stroke-width="2.5"/>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" fill="none" stroke="${colors.PERSON}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="7" r="4" fill="none" stroke="${colors.PERSON}" stroke-width="2"/>
  `),
  ORG: createSVG(`
    <rect x="2" y="2" width="20" height="20" rx="4" fill="${fill}" stroke="${colors.ORG}" stroke-width="3"/>
    <path d="M7 16V8h2v8" stroke="${colors.ORG}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M15 16V8h2v8" stroke="${colors.ORG}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M11 16V8h2v8" stroke="${colors.ORG}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M2 16h20" stroke="${colors.ORG}" stroke-width="1.5"/>
  `),
  LOC: createSVG(`
    <rect x="2" y="2" width="20" height="20" rx="4" fill="${fill}" stroke="${colors.LOC}" stroke-width="2.5"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="${colors.LOC}" stroke-width="2"/>
    <path d="M12 2v20" stroke="${colors.LOC}" stroke-width="1.5"/>
    <path d="M2 12h20" stroke="${colors.LOC}" stroke-width="1.5"/>
  `),
  FINANCE: createSVG(`
    <rect x="12" y="2" width="14" height="14" transform="rotate(45 12 2)" fill="${fill}" stroke="${colors.FINANCE}" stroke-width="2.5"/>
    <path d="M12 6v12" stroke="${colors.FINANCE}" stroke-width="2" stroke-linecap="round"/>
    <path d="M6 12h12" stroke="${colors.FINANCE}" stroke-width="2" stroke-linecap="round"/>
  `),
  COMMS: createSVG(`
    <path d="M12 2l10 18H2z" fill="${fill}" stroke="${colors.COMMS}" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M12 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4" fill="${colors.COMMS}"/>
    <path d="M12 6v6" stroke="${colors.COMMS}" stroke-width="2" stroke-linecap="round"/>
  `),
  WEAPON: createSVG(`
    <circle cx="12" cy="12" r="11" fill="${fill}" stroke="${colors.WEAPON}" stroke-width="2.5"/>
    <circle cx="12" cy="12" r="6" fill="none" stroke="${colors.WEAPON}" stroke-width="2"/>
    <path d="M12 4v4" stroke="${colors.WEAPON}" stroke-width="2.5"/>
    <path d="M12 16v4" stroke="${colors.WEAPON}" stroke-width="2.5"/>
    <path d="M4 12h4" stroke="${colors.WEAPON}" stroke-width="2.5"/>
    <path d="M16 12h4" stroke="${colors.WEAPON}" stroke-width="2.5"/>
  `)
};

let output = `export const nodeIcons = {\n`;
for (const [key, svg] of Object.entries(icons)) {
  const base64 = `data:image/svg+xml;base64,${btoa(svg)}`;
  output += `  ${key}: '${base64}',\n`;
}
output += `};\n\n`;

output += `export const nodeColors = {\n`;
for (const [key, color] of Object.entries(colors)) {
  output += `  ${key}: '${color}',\n`;
}
output += `};\n`;

console.log(output);
