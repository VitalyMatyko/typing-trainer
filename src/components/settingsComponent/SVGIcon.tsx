

import { SVGIconProps } from "../../types/types";



const SVGIcon: React.FC<SVGIconProps> = ({ id, pathData, circleData }) => (

	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="url(#gradient)"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		xmlns="http://www.w3.org/2000/svg"
		className={`${id}_svg`}
		id={id}
	>
		<defs>
			<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#ff8a00" />
				<stop offset="100%" stopColor="#e52e71" />
			</linearGradient>
			<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
				<feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.2)" />
			</filter>
		</defs>
		<g filter="url(#shadow)">
			{circleData && <circle {...circleData} />}
			<path id={id} d={pathData} />
		</g>
	</svg>




)

export default SVGIcon;