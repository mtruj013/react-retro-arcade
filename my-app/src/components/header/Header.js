import React from 'react';
import './HeaderStyle.scss';

const Header = () => {
    return (
        <div className="centered">
            <div className="rocketrinder">Retro<br></br>Arcade</div>
            <svg>
                <defs>
                    {/* gradient pre-sets */}
                    <linearGradient x1="50%" y1="0%" x2="100%" y2="100%" id="backGradientFill">
                        <stop offset="0%" style={{stopColor: "#a299b6", stopOpacity: "100%"}}/>
                        <stop offset="30%" style={{stopColor: "#ffffff", stopOpacity: "100%"}}/>
                        <stop offset="45%" style={{stopColor: "#9991ae", stopOpacity: "100%"}}/>
                        <stop offset="60%" style={{stopColor: "#a299b6", stopOpacity: "0%"}}/>
                        <stop offset="75%" style={{stopColor: "#ffffff", stopOpacity: "100%"}}/>
                        <stop offset="100%" style={{stopColor: "#a299b6", stopOpacity: "100%"}}/>
                    </linearGradient>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="frontGradientFill">
                        <stop offset="0%" style={{stopColor: "black", stopOpacity: "100%"}} />
                        <stop offset="15%" style={{stopColor: "#34304b", stopOpacity: "100%"}} />
                        <stop offset="25%" style={{stopColor: "#c3b9d5", stopOpacity: "100%"}} />
                        <stop offset="35%" style={{stopColor: "white", stopOpacity: "100%"}} />
                        <stop offset="85%" style={{stopColor: "white", stopOpacity: "100%"}} />
                        <stop offset="90%" style={{stopColor: "#c3b9d5", stopOpacity: "100%"}} />
                        <stop offset="100%" style={{stopColor: "#211c35", stopOpacity: "100%"}} />
                    </linearGradient>
                    {/* creates a rectangle and and applies the gradient as its fill */}
                    <rect id="gradient1" x="0%" y="0" width="100%" height="100%" style={{fill: "url(#backGradientFill)"}}/>
                    <rect id="gradient2" x="0%" y="0" width="100%" height="100%" style={{fill: "url(#frontGradientFill)"}}/>
                    {/* uses triangle to create svg filter */}
                    <filter id="backGradient">
                        <feImage xlinkHref="#gradient1" result="grad"/>
                        <feComposite operator="in" in2="SourceGraphic" in="thickened" result="stroke"/>
                    </filter>
                    <filter id="bevel">
                        <feGaussianBlur stdDeviation="1" in="SourceGraphic" result="BLUR"/>
                        <feSpecularLighting surfaceScale="1" specularConstant="1" specularExponent="50" lightingColor="white" in="BLUR" result="SPECULAR">
                            <fePointLight x="200" y="0" z="1000"/>
                        </feSpecularLighting>
                        {/* cuts off the parts that overlap the sourced graphic */}
                        <feComposite operator="in" in="SPECULAR" in2="SourceAlpha" result="COMPOSITE"/>
                        {/* merges srouce graphic and lightning effect */}
                        <feMerge>
                            <feMergeNode in="SourceGraphic"/>
                            <feMergeNode in="COMPOSITE"/>
                        </feMerge>
                    </filter>
                    <filter id="frontGradient">
                        <feImage xlinkHref="#gradient2" result="grad"/>
                        <feComposite operator="in" in2="SourceGraphic" in="thickended" result="stroke"/>
                        <feMorphology operator="erode" radius="3" in="stroke" result="inside"/>
                        <feMerge>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                            <feMergeNode in="inside"></feMergeNode>
                        </feMerge>
                    </filter>
                    <filter id="outerGlow">
                        {/* thickens the original shape */}
                        <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken"/>
                        {/* uses a gaussian blur to create the soft blurriness of the glow */}
                        <feGaussianBlur in="thicken" stdDeviation="5" result="blurred"/>
                        {/* changes the color */}
                        <feFlood floodColor="#5e5775" result="glowColor"/>
                        {/* colors in the glows */}
                        <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored"/>
                        {/* layer the effects together */}
                        <feMerge>
                            <feMergeNode in="softGlow_colored"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <filter id="bloom">
                        <feGaussianBlur stdDeviation="1.5" result="blur"/>
                        <feBlend in="SourceGraphic" in2="blur" mode="screen" result="bloomed"/>
                    </filter>
                    <filter id="noise" x="0vw" y="0vh" width="100vw" height="100vh">
                        <feFlood floodColor="#808080" result="neutral-gray"/>
                        <feTurbulence in="neutral-gray" type="fractalNoise" baseFrequency="0.8" numOctaves="10" stitchTiles="stitch" result="noise"/>
                        <feColorMatrix in="noise" type="saturate" values="0" result="desaturatedNoise"></feColorMatrix>
                        <feComponentTransfer in="desaturatedNoise" result="theNoise">
                            <feFuncA type="table" tableValues="0 0 0.2 0"></feFuncA>
                        </feComponentTransfer>
                        <feBlend in="SourceGraphic" in2="theNoise" mode="soft-light" result="noisy-image"/>
                    </filter>
                </defs>
            </svg>
        </div>
    )
}
export default Header;