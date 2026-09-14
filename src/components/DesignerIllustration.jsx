export default function DesignerIllustration() {
  return (
    <svg className="designer-illustration" viewBox="0 0 520 460" role="img" aria-labelledby="designer-art-title">
      <title id="designer-art-title">Illustrated male product designer at his desk, surrounded by ideas and interface sketches</title>
      <defs>
        <pattern id="sketch-grid" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0v22" fill="none" stroke="#858a7320" /></pattern>
      </defs>
      <rect x="20" y="20" width="480" height="420" rx="200" fill="url(#sketch-grid)" />
      <g stroke="#343831" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <g className="floating-note note-one" transform="rotate(-9 93 114)">
          <rect x="37" y="59" width="114" height="102" rx="5" fill="#fdfdf5" />
          <path d="M49 80h42m-42 11h28M49 107h25v36H49Zm35 0h54v15H84Zm0 22h54v14H84Z" fill="#dfe8cc" />
          <path d="m119 54 6 11 12-5" fill="none" />
        </g>
        <g className="floating-note note-two" transform="rotate(9 410 133)">
          <rect x="367" y="75" width="83" height="114" rx="9" fill="#f5e4c5" />
          <path d="M396 86h22M380 101h57v23h-57Zm0 34h35m-35 11h48m-48 11h27" fill="#fdfdf5" />
          <circle cx="409" cy="175" r="3" fill="#343831" />
        </g>
        <path className="sketch-path" d="M164 110c42-43 106-34 140-4m-13-17 13 17-21-3M365 242c33 11 47 40 37 64m-9-11 9 11 10-14" fill="none" strokeDasharray="4 6" />
        <path d="M230 238c-34 4-52 24-55 66l-8 72h151l-11-74c-7-35-22-56-53-64" fill="#bbcba5" />
        <path d="m231 221-5 23 20 20 19-23-7-27" fill="#d8ad8a" />
        <path d="M220 151c-12 18-12 49 1 65 11 16 23 21 36 15 17-8 30-35 25-59l-14-26" fill="#e2bc98" />
        <path d="M216 183c-21-10-22-40-8-56 15-22 51-20 65-6 21 7 27 35 6 63l-8-32c-22 8-33-6-37-12-3 12-7 20-19 21Z" fill="#343831" />
        <path d="M215 180c-13-10-19 5-5 15m68-13c12-7 15 5 4 14" fill="#e2bc98" />
        <path d="m229 176 11-1m15 1 10 1m-19 8-3 10 7 1m-17 11c8 6 15 5 21-1" fill="none" />
        <path d="M222 202c7 26 29 40 47 1-5 5-10 10-13 4l-12 5-12-4Z" fill="#343831" />
        <path d="m229 244-15 22 24 13 9-15 13 15 16-16-12-23M248 280v43" fill="none" />
        <path d="M190 285c-18 27-31 63-17 71 23 13 50-7 68-11m54-51c7 14 14 32 22 35l32-6" fill="none" strokeWidth="20" />
        <path d="M192 285c-18 27-29 60-16 66 22 9 46-9 65-11m54-46c7 14 14 32 22 35l32-6" fill="none" stroke="#bbcba5" strokeWidth="16" />
        <path d="m219 344 27-10 16 9-7 10-27 1m111-31 14-9 14 7-10 9h-18" fill="#e2bc98" />
        <path d="M264 259h119l-18 91H244Z" fill="#e4e2d4" />
        <path d="M259 349h125v7H239v-7" fill="#fdfdf5" />
        <path d="m319 295 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="#fdfdf5" />
        <path d="M113 358h324v10H113Zm25 10-13 72m281-72 15 72" fill="#d7bf98" />
        <path d="M118 314h30v35h-30Zm30 5c25-3 24 25 0 23m-19-35c-10-12 9-16 0-27" fill="#fdfdf5" />
        <path d="M382 345h36m-38 6h44" fill="none" />
        <g className="illustration-spark"><path d="m326 46 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" fill="#c5de9b" /></g>
        <path d="m72 251 3 8 9 3-9 3-3 9-3-9-9-3 9-3Z" fill="#edcf94" />
        <path className="sketch-path" d="M105 217c18-18 25-5 10 3s-13 18 8 18m-14-30 4 8" fill="none" />
      </g>
      <g fontFamily="Georgia, serif" fontStyle="italic" fill="#616958" fontSize="14">
        <text x="78" y="196" transform="rotate(-9 78 196)">start with why.</text>
        <text x="339" y="219" transform="rotate(6 339 219)">make it human.</text>
        <text x="202" y="423">a work in curiosity.</text>
      </g>
    </svg>
  );
}
