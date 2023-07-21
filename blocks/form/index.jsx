const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { ColorPicker, PanelBody, TextControl, Button, __experimentalNumberControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType("gutenberg-forms/form", {
    title: __("Form", "gutenberg-forms"),
    icon: "layout", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes }) {
        const blocks = ["gutenberg-forms/form", "gutenberg-forms/input"];
        const { successMessage, errorMessage, formulaireNotValidated } = attributes;

        return (
            <div className={className}>
                <form method="post">
                    <input type="hidden" name="gutenberg-form" value="1" />
                    Mon formulaire
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
                    </PanelBody>
                </InspectorControls>
            </div>
        );
    },
    save() {
        return <InnerBlocks.Content />;
    },
});
