const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { ColorPicker, PanelBody, TextControl, Button, __experimentalNumberControl, SelectControl } = wp.components;
const { __ } = wp.i18n;
const { useSelect } = wp.data;

registerBlockType("gutenberg-forms/input", {
    title: __("Input", "gutenberg-forms"),
    icon: "layout", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes }) {
        const options = [
            {
                value: "text",
                label: "Text",
            },
            {
                value: "number",
                label: "Number",
            },
            {
                value: "email",
                label: "Email",
            },
            {
                value: "password",
                label: "Password",
            },
            {
                value: "file",
                label: "File",
            },
        ];

        return (
            <div className={className}>
                {attributes.label !== "" && <label htmlFor={attributes.name}>{attributes.label}</label>}
                {attributes.type !== "" && InputRender(attributes)}
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={false}>
                        <TextControl
                            label="Label:"
                            value={attributes.label}
                            onChange={(label) => {
                                setAttributes({ label });
                            }}
                        />
                        <TextControl
                            label="Nom du champ:"
                            value={attributes.name}
                            onChange={(name) => {
                                setAttributes({ name });
                            }}
                        />
                        <SelectControl
                            label="Type du champ:"
                            value={attributes.type}
                            onChange={(type) => {
                                setAttributes({ type });
                            }}
                            options={options}
                        />
                    </PanelBody>
                </InspectorControls>
            </div>
        );
    },
    save({ className, attributes }) {
        return (
            <div className={className}>
                {attributes.label !== "" && <label htmlFor={attributes.name}>{attributes.label}</label>}
                {attributes.type !== "" && InputRender(attributes)}
            </div>
        );
    },
});

function InputRender(attributes) {
    switch (attributes.type) {
        case "text":
            return (
                <div className="input-group">
                    <input type={attributes.type} name="{attributes.name}" />
                </div>
            );
            break;
        case "number":
            return (
                <div className="input-group">
                    <input type={attributes.type} name="{attributes.name}" />
                    <div className="input-suffix">
                        <button type="button" onClick={Increment}>
                            +
                        </button>
                        <button type="button" onClick={Decrement}>
                            -
                        </button>
                    </div>
                </div>
            );
            break;
    }
    return "";
}

function Increment() {
    alert("+");
}

function Decrement() {
    alert("-");
}
