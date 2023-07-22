const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { ColorPicker, PanelBody, TextControl, Button, __experimentalNumberControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType("gutenberg-forms/form", {
    title: __("Form", "gutenberg-forms"),
    icon: "layout", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes }) {
        const blocks = ["gutenberg-forms/input", "gutenberg-forms/layout", "core/paragraph", "core/heading"];
        const { successMessage, errorMessage, formulaireNotValidated } = attributes;
        const style = getFormStyle(attributes);

        return (
            <div className={className} style={style}>
                <form method="post">
                    <input type="hidden" name="gutenberg-form" value="1" />
                    <InnerBlocks allowedBlocks={blocks} />
                </form>

                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={false}>
                        <TextControl
                            label="Message de succès"
                            value={successMessage}
                            onChange={(successMessage) => {
                                setAttributes({ successMessage });
                            }}
                        />
                        <TextControl
                            label="Message erreur"
                            value={errorMessage}
                            onChange={(errorMessage) => {
                                setAttributes({ errorMessage });
                            }}
                        />
                        <TextControl
                            label="Message erreur"
                            value={formulaireNotValidated}
                            onChange={(formulaireNotValidated) => {
                                setAttributes({ formulaireNotValidated });
                            }}
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
                    </PanelBody>
                </InspectorControls>
            </div>
        );
    },
    save() {
        return <InnerBlocks.Content />;
    },
});

function getFormStyle(attributes) {
    const style = {};
    if (attributes.maxWidth !== null && parseInt(attributes.maxWidth) !== NaN && parseInt(attributes.maxWidth) > 0) {
        style.maxWidth = attributes.maxWidth + "px";
    }
    return style;
}
