import React from "react";
import { useState, useEffect } from "react";



export default function CitySvg({ isDay = false }) {
  return (
    <svg className={isDay ? "day" : ""}>
    <rect width="1200" height="700" fill="var(--bg)" />

    <g id="foundations" opacity="0.55">
        <line className="gridLine" x1="100" y1="80" x2="100" y2="640"/>
        <line className="gridLine" x1="200" y1="80" x2="200" y2="640"/>
        <line className="gridLine" x1="300" y1="80" x2="300" y2="640"/>
        <line className="gridLine" x1="400" y1="80" x2="400" y2="640"/>
        <line className="gridLine" x1="500" y1="80" x2="500" y2="640"/>
        <line className="gridLine" x1="600" y1="80" x2="600" y2="640"/>
        <line className="gridLine" x1="700" y1="80" x2="700" y2="640"/>
        <line className="gridLine" x1="800" y1="80" x2="800" y2="640"/>
        <line className="gridLine" x1="900" y1="80" x2="900" y2="640"/>
        <line className="gridLine" x1="1000" y1="80" x2="1000" y2="640"/>
        <line className="gridLine" x1="1100" y1="80" x2="1100" y2="640"/>

        <line className="gridLine" x1="80" y1="120" x2="1120" y2="120"/>
        <line className="gridLine" x1="80" y1="220" x2="1120" y2="220"/>
        <line className="gridLine" x1="80" y1="320" x2="1120" y2="320"/>
        <line className="gridLine" x1="80" y1="420" x2="1120" y2="420"/>
        <line className="gridLine" x1="80" y1="520" x2="1120" y2="520"/>
        <line className="gridLine" x1="80" y1="620" x2="1120" y2="620"/>

        <text x="90" y="60" className="sub">Algorithms · Data Structures · Learning</text>
    </g>

    <g id="roads">
        <line className="road" x1="120" y1="360" x2="1080" y2="360"/>
        <text x="520" y="345" className="sub">Unimap Rd</text>

        <line className="road" x1="600" y1="120" x2="600" y2="640"/>
        <text x="615" y="250" className="sub" transform="rotate(90 615 250)">Hackathon St</text>

        <circle className="pulse" cx="600" cy="300" r="5"/>
        <circle className="pulse" cx="600" cy="330" r="5"/>
        <circle className="pulse" cx="600" cy="360" r="5"/>
        <circle className="pulse" cx="600" cy="390" r="5"/>
    </g>

    <g id="systems">
        <rect className="district" x="120" y="120" width="380" height="210"/>
        <text x="140" y="150" className="label">Systems</text>
        <text x="140" y="174" className="sub">Thinking beyond features</text>

        <rect className="bldg" x="150" y="190" width="200" height="120"/>
        <text x="215" y="260" className="node">Kùzu</text>
        <rect className="bldg" x="370" y="200" width="110" height="46"/>
        <text x="404" y="230" className="node">Algo</text>

        <rect className="bldg" x="370" y="258" width="110" height="46"/>
        <text x="413" y="288" className="node">ML</text>

        <line className="connector" x1="370" y1="223" x2="350" y2="240"/>
        <line className="connector" x1="370" y1="281" x2="350" y2="265"/>
    </g>

    <g id="building">
        <rect className="district" x="650" y="120" width="450" height="240"/>
        <text x="670" y="150" className="label">Building</text>
        <text x="670" y="174" className="sub">Turning ideas into lived systems</text>

        <rect className="bldg" x="680" y="200" width="230" height="140"/>
        <text x="760" y="280" className="node">Dealish</text>
        <rect className="bldg" x="930" y="220" width="150" height="120"/>
        <text x="980" y="290" className="node">Neo</text>

        <rect className="bldg" x="690" y="190" width="90" height="40"/>
        <text x="714" y="216" className="node">Rep</text>
    </g>

    <g id="production">
        <rect className="district" x="720" y="400" width="380" height="210"/>
        <text x="740" y="430" className="label">Production</text>
        <text x="740" y="454" className="sub">When software met reality</text>

        <rect className="bldg" x="750" y="480" width="170" height="100"/>
        <text x="795" y="540" className="node">MapFLOW</text>
        <rect className="bldg" x="940" y="470" width="140" height="130"/>
        <text x="980" y="545" className="node">CC</text>
    </g>


    </svg>
  );
}