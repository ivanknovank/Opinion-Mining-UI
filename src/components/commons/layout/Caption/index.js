export default function CaptionElement({children}) {
	return (
		<h3
			style={{
				borderRadius: '0.25em',
				textAlign: 'center',
				color: 'purple',
				border: '1px solid purple',
				padding: '0.25em',
			}}
		>
			{children}
		</h3>
	);
}
