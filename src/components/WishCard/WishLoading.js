import React from 'react';
import ContentLoader from 'react-content-loader';

export default props => (
	<div style={{ marginBottom: 32, background: 'white' }}>
		<ContentLoader
			height={134}
			width={588}
			speed={1}
			primaryColor="#f3f3f3"
			secondaryColor="#ecebeb"
			{...props}
		>
			<rect x="32" y="32" height="18" width="350" />
			<rect x="32" y="56" height="18" width="100" />

			<rect x="32" y="96" height="40" width="140" />
			<rect x="402" y="104" height="20" width="92" />
			<rect x="502" y="96" height="40" width="40" />
		</ContentLoader>
	</div>
);
