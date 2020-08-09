/* eslint-disable no-shadow */
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
		arrowInside:{
			type: 'bool',
			defualt: true,
		},
	},

	edit: ( props )=>{
		const { attributes, setAttributes } = props;
		const { arrowInside } = attributes;
		const toggleArrow = ( arrowInside )=>{
			setAttributes( { arrowInside } );
		};

		return (
			<div>
				<InspectorControls>
					<PanelBody
						title={ __( 'Slider Settings' ) }
					>
						<ToggleControl
							label="Arrows inside"
							checked={ arrowInside }
							onChange={ toggleArrow }
						/>

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
	save: ( props )=>{
		const { attributes } = props;
		const { arrowInside } = attributes;

		let classes = arrowInside ? 'bluck-slider bluck-slider-container arrow-inside' : 'bluck-slider bluck-slider-container arrow-outside';
		return (
			<div className={ classes }>
				<div className="bluck-slide-inner">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
}
