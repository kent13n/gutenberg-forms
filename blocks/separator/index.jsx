const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { ColorPicker, PanelBody, TextControl, Button, __experimentalNumberControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType("gutenberg-forms/separator", {
    title: __("Separateur", "gutenberg-forms"),
    icon: "minus", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes }) {
        const style = getStyle(attributes);
        return (
            <>
                <hr className={className} style={style} />
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={false}>
                        <ColorPicker
                            color={attributes.color || ""}
                            onChangeComplete={(color) => setAttributes({ color: color.hex })}
                            disableAlpha
                        />
                        <__experimentalNumberControl
                            label="Largeur max:"
                            value={attributes.maxWidth}
                            onChange={(val) => {
                                val = val === "" ? null : parseInt(val) || 0;
                                setAttributes({
                                    maxWidth: val,
                                });
                            }}
                        />
                        <__experimentalNumberControl
                            label="Hauteur séparation:"
                            value={attributes.height}
                            onChange={(val) => {
                                val = val === "" ? null : parseInt(val) || 0;
                                setAttributes({
                                    height: val,
                                });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </>
        );
    },
    save({ className, attributes }) {
        const style = getStyle(attributes);
        return <hr className={className} style={style} />;
    },
});

function getStyle(attributes) {
    const style = {};

    if (attributes.maxWidth !== null && parseInt(attributes.maxWidth) !== NaN && parseInt(attributes.maxWidth) > 0) {
        style.maxWidth = attributes.maxWidth + "px";
    }

    if (attributes.height !== null && parseInt(attributes.height) !== NaN && parseInt(attributes.height) > 0) {
        style.marginTop = attributes.height + "px";
        style.marginBottom = attributes.height + "px";
    }

    if (attributes.color !== null && attributes.color !== "") {
        style.backgroundColor = attributes.color;
    }

    return style;
}
