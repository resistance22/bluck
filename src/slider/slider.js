const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
} = wp.blockEditor;
const {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	IconButton,
} = wp.components;

export default{
	title: __( 'slider' ), // Block title.
	icon: 'images-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'bluck — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		width: {
			type: 'number',
		},
	},
	edit: (props)=>{
		const { attributes, setAttributes } = props;
		const { width } = attributes;
		return (
			<div>
				<InspectorControls>
					<PanelBody
						title={ __( 'Slide Link' ) }
					>

					</PanelBody>
				</InspectorControls>
				<div className="bluck-slider bluck-slider-container">
					<InnerBlocks
						allowedBlocks={ [ 'cgb/slide' ] }
					/>
				</div>
			</div>
		)
	},
	save: (props)=>{
		return (
			<div className="bluck-slider bluck-slider-container">
				<div className="bluck-slide-inner">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
}
