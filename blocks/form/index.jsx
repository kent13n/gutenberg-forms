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

        return (
            <div className={className}>
                <form method="post">
                    <input type="hidden" name="gutenberg-form" value="1" />
                    Mon formulaire
                    <InnerBlocks allowedBlocks={blocks} />
                </form>
            </div>
        );
    },
    save() {
        return <InnerBlocks.Content />;
    },
});
