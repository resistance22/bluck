/* eslint-disable no-shadow */
/**
 * BLOCK: bluck
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
} = wp.blockEditor;
const {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	IconButton,
} = wp.components;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/slide-js', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'slide' ), // Block title.
	icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'bluck — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		slideTitle: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		slideText: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		slideLink: {
			type: 'object',
			default: {
				url: null,
				newTab: false,
			},
		},
		titleColor: {
			type: 'string',
			default: '#000',
		},
		descColor: {
			type: 'string',
			default: '#000',
		},
		backgroundType: {
			type: 'string',
			default: 'Color',
		},
		backgroundStyle: {
			type: 'object',
			default: {
				backgroundColor: '#fff',
			},
		},
		backgroundImage: {
			type: 'string',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-bluck'></p>.
		const { attributes, setAttributes } = props;
		const {
			slideTitle,
			slideText,
			slideLink,
			titleColor,
			descColor,
			backgroundType,
			backgroundStyle,
			backgroundImage,
		} = attributes;

		const onTitleChange = ( slideTitle ) => {
			setAttributes( { slideTitle } );
		};

		const onTextChange = ( slideText ) => {
			setAttributes( { slideText } );
		};
		const onTitleColorChage = ( titleColor ) => {
			setAttributes( { titleColor } );
		};
		const onDescColorChage = ( descColor ) => {
			setAttributes( { descColor } );
		};
		const changeBGType = ( backgroundType ) => {
			setAttributes( { backgroundType } );
		};
		const onBGColorChange = ( Color ) => {
			setAttributes( { backgroundStyle: { backgroundColor: Color } } );
		};
		const onLinkChange = ( url ) => {
			setAttributes( {
				slideLink: {
					...slideLink, url: url,
				},
			} );
		};

		const newTabToggle = ( checked ) => {
			setAttributes( {
				slideLink: {
					...slideLink, newTab: checked,
				},
			} );
		};
		const onSelectImage = ( IMG ) => {
			setAttributes( { backgroundImage: IMG.sizes.full.url } );
		};
		return (
			<div className="bluck-Slide" style={ backgroundStyle }>
				<InspectorControls>
					<PanelBody title={ __( 'Slide Link' ) }>
						<TextControl
							label="Slide URL"
							value={ slideLink.url }
							onChange={ onLinkChange }
						/>
						<ToggleControl
							label="Open in new tab"
							checked={ slideLink.newTab }
							onChange={ newTabToggle }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Slide Font Color' ) } initialOpen={ false }>
						<p>{ __( 'Select your Title color:' ) }</p>
						<ColorPalette
							value={ titleColor }
							onChange={ onTitleColorChage }
						/>
						<p>{ __( 'Select your Slide description color:' ) }</p>
						<ColorPalette
							value={ descColor }
							onChange={ onDescColorChage }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Slide Background Settings' ) } initialOpen={ false }>
						<p>{ __( 'Select Your Slide Background Type:' ) }</p>
						<SelectControl
							label={ __( 'Background Type:' ) }
							value={ backgroundType }
							options={ [
								{ label: __( 'Bacground Color' ), value: 'Color' },
								{ label: __( 'Image' ), value: 'Image' },
							] }
							onChange={ changeBGType }
						/>

						{ backgroundType === 'Color' && (
							<div>
								<p>{ __( 'Select Your Slide Backgroud Color:' ) }</p>
								<ColorPalette value={ backgroundStyle.backgroundColor } onChange={ onBGColorChange } />
							</div>
						)
						}
						{
							backgroundType === 'Image' && (
								<MediaUpload
									onSelect={ onSelectImage }
									value={ backgroundImage }
									allowedTypes={ [ 'image' ] }
									render={ ( { open } )=>{
									// eslint-disable-next-line no-unused-expressions
										return ( <IconButton
											onClick={ open }
											icon="upload"
											className="editor-media-placeholder__button is-button is-default is-large"
										>
											Background Image
										</IconButton> );
									} }
								/>
							)
						}
					</PanelBody>
				</InspectorControls>
				<div className={ props.className }>
					<RichText
						key="editable"
						tagName="h2"
						placeholder={ __( 'Slide Title' ) }
						value={ slideTitle }
						onChange={ onTitleChange }
						style={ { color: titleColor } }
					/>
					<RichText
						key="editable"
						tagName="p"
						placeholder={ __( 'Slide description' ) }
						value={ slideText }
						onChange={ onTextChange }
						style={ { color: descColor } }
					/>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const { attributes } = props;
		const { slideText, slideTitle, titleColor, backgroundStyle, descColor } = attributes;
		const test = (
			<div className="bluck-Slide" style={ backgroundStyle }>
				<RichText.Content tagName="h2"
					value={ slideTitle }
					style={ { color: titleColor } }
				/>
				<RichText.Content tagName="p"
					value={ slideText }
					style={ { color: descColor } }
				/>
			</div>
		);
		return test;
	},
} );
