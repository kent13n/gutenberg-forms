const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { ColorPicker, PanelBody, TextControl, Button, __experimentalNumberControl, SelectControl, ToggleControl } =
    wp.components;
const { __ } = wp.i18n;
const { useSelect } = wp.data;

registerBlockType("gutenberg-forms/input", {
    title: __("Input", "gutenberg-forms"),
    icon: "layout", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes }) {
        const { toConfirm, addPlaceholder, addLabelImage, labelInline } = attributes;

        if (typeof className !== "string") className = "";
        if (attributes.labelInline) className += " label-inline";
        if (attributes.addLabelImage && attributes.labelImage !== "") className += " label-image";

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
                {attributes.type !== "" && InputRender(attributes)}
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={false}>
                        <ToggleControl
                            label="Label inline"
                            checked={labelInline}
                            onChange={() => setAttributes({ labelInline: !labelInline })}
                        />

                        <ToggleControl
                            label="Activer Confirmation"
                            checked={toConfirm}
                            onChange={() => setAttributes({ toConfirm: !toConfirm })}
                        />

                        <ToggleControl
                            label="Ajouter un placeholder"
                            checked={addPlaceholder}
                            onChange={() => setAttributes({ addPlaceholder: !addPlaceholder })}
                        />

                        <ToggleControl
                            label="Ajouter un label image"
                            checked={addLabelImage}
                            onChange={() => setAttributes({ addLabelImage: !addLabelImage })}
                        />

                        {addPlaceholder && (
                            <TextControl
                                label="Placeholder:"
                                value={attributes.placeholder}
                                onChange={(placeholder) => {
                                    setAttributes({ placeholder });
                                }}
                            />
                        )}

                        {addLabelImage && AdminLabelImageRender(attributes, setAttributes)}

                        <h3 className="label-image-title">Label:</h3>
                        <RichText
                            className="richtext-label"
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

                        <TextControl
                            label="Valeur par défaut:"
                            value={attributes.defaultValue}
                            onChange={(defaultValue) => {
                                setAttributes({ defaultValue });
                            }}
                        />

                        {attributes.type === "number" && (
                            <>
                                <__experimentalNumberControl
                                    label="Min value:"
                                    value={attributes.minValue}
                                    onChange={(val) => {
                                        val = val === "" ? null : parseInt(val) || 0;
                                        setAttributes({
                                            minValue: val,
                                        });
                                    }}
                                />
                                <__experimentalNumberControl
                                    label="Max value:"
                                    value={attributes.maxValue}
                                    onChange={(val) => {
                                        val = val === "" ? null : parseInt(val) || 0;
                                        setAttributes({
                                            maxValue: val,
                                        });
                                    }}
                                />
                            </>
                        )}
                    </PanelBody>
                </InspectorControls>
            </div>
        );
    },
    save({ className, attributes }) {
        if (typeof className !== "string") className = "";
        if (attributes.labelInline) className += " label-inline";
        if (attributes.addLabelImage && attributes.labelImage !== "") className += " label-image";
        return <div className={className}>{attributes.type !== "" && InputRender(attributes)}</div>;
    },
});

function InputRender(attributes) {
    switch (attributes.type) {
        case "email":
        case "password":
        case "text":
            return (
                <>
                    {LabelRender(attributes)}
                    <div className="flex-group">
                        <div className="input-group">
                            <div className="input-group-field">
                                <input
                                    type={attributes.type}
                                    name={attributes.name}
                                    placeholder={attributes.addPlaceholder ? attributes.placeholder : ""}
                                    value={attributes.defaultValue}
                                    onChange={() => {}}
                                />
                            </div>
                        </div>
                        {attributes.toConfirm && (
                            <button className="to-confirm" type="button">
                                OK
                            </button>
                        )}
                    </div>
                </>
            );
            break;
        case "number":
            let inputAttributes = {
                type: attributes.type,
                name: attributes.name,
                placeholder: attributes.addPlaceholder ? attributes.placeholder : "",
                value: attributes.defaultValue,
                onChange: () => {},
            };

            if (attributes.minValue !== null) {
                inputAttributes.min = attributes.minValue;
            }

            if (attributes.maxValue !== null) {
                inputAttributes.max = attributes.maxValue;
            }
            return (
                <>
                    {LabelRender(attributes)}
                    <div className="flex-group">
                        <div className="input-group">
                            <div className="input-group-field">
                                <input {...inputAttributes} />
                            </div>
                            <div className="input-suffix">
                                <button className="input-button-plus" type="button">
                                    +
                                </button>
                                <button className="input-button-minus" type="button">
                                    -
                                </button>
                            </div>
                        </div>
                        {attributes.toConfirm && (
                            <button className="to-confirm" type="button">
                                OK
                            </button>
                        )}
                    </div>
                </>
            );
            break;
        case "file":
            return (
                <>
                    {LabelRender(attributes)}
                    <div className="flex-group">
                        <label className="file-label">
                            <input type={attributes.type} name={attributes.name} />
                            <span
                                className="file-custom"
                                data-text={attributes.addPlaceholder ? attributes.placeholder : ""}
                                data-browse="Choisir"
                            ></span>
                        </label>
                        {attributes.toConfirm && (
                            <button className="to-confirm" type="button">
                                OK
                            </button>
                        )}
                    </div>
                </>
            );
            break;
    }
    return "";
}

function AdminLabelImageRender(attributes, setAttributes) {
    const { addLabelImage } = attributes;
    return (
        <MediaUploadCheck>
            <MediaUpload
                type="image"
                onSelect={(image) => {
                    setAttributes({ labelImage: image.sizes.full.url });
                }}
                render={({ open }) => {
                    return (
                        <>
                            {addLabelImage && <h3 className="label-image-title">Label image:</h3>}
                            <Button
                                onClick={open}
                                className={attributes.labelImage ? "label-image-button" : "label-image-button button"}
                            >
                                {attributes.labelImage ? <img src={attributes.labelImage} /> : "Choisir une image"}
                            </Button>
                        </>
                    );
                }}
            />
        </MediaUploadCheck>
    );
}

function LabelRender(attributes) {
    if (attributes.addLabelImage && attributes.labelImage !== "") {
        return (
            <>
                <div className="label-image-group">
                    <img src={attributes.labelImage} />
                    {attributes.label !== "" && (
                        <label htmlFor={attributes.name} dangerouslySetInnerHTML={{ __html: attributes.label }}></label>
                    )}
                </div>
            </>
        );
    } else if (attributes.label !== "") {
        return <>{attributes.label !== "" && <label htmlFor={attributes.name}>{attributes.label}</label>}</>;
    }
}
