const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const {
    ColorPicker,
    PanelBody,
    TextControl,
    Button,
    __experimentalNumberControl,
    SelectControl,
    ToggleControl,
    FormTokenField,
} = wp.components;
const { __ } = wp.i18n;
const { useSelect } = wp.data;
const { useState } = wp.element;

registerBlockType("gutenberg-forms/input", {
    title: __("Input", "gutenberg-forms"),
    icon: "layout", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes }) {
        const { toConfirm, addPlaceholder, addLabelImage, labelInline, darkLabel } = attributes;

        if (typeof className !== "string") className = "";
        if (attributes.labelInline) className += " label-inline";
        if (attributes.darkLabel) className += " label-dark";
        if (attributes.addLabelImage && attributes.labelImage !== "") className += " label-image";
        if (attributes.size && attributes.size !== "normal") className += " " + attributes.size;

        const rulesSuggestions = rulesOptions.map((item) => item.label);
        const [selectedRules, setSelectedRules] = useState(attributes.rules.map((item) => item.label));

        const sizeOptions = [
            {
                value: "small",
                label: "Small",
            },
            {
                value: "normal",
                label: "Normal",
            },
        ];

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
            {
                value: "textarea",
                label: "Textarea",
            },
        ];

        const style = GenerateStyle(attributes);

        return (
            <div className={className} style={style}>
                {attributes.type !== "" && InputRender(attributes)}
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={false}>
                        <ToggleControl
                            label="Dark label"
                            checked={darkLabel}
                            onChange={() => setAttributes({ darkLabel: !darkLabel })}
                        />
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
                            label="Taille du champ:"
                            value={attributes.size}
                            onChange={(size) => {
                                setAttributes({ size });
                            }}
                            options={sizeOptions}
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

                        <__experimentalNumberControl
                            label="Order:"
                            value={attributes.order}
                            onChange={(val) => {
                                val = val === "" ? null : parseInt(val) || 0;
                                setAttributes({
                                    order: val,
                                });
                            }}
                        />

                        <FormTokenField
                            label="Règles de validation:"
                            value={selectedRules}
                            suggestions={rulesSuggestions}
                            onChange={(val) => {
                                let item = typeof val === "object" && val.length > 0 ? val[val.length - 1] : val;
                                if (rulesSuggestions.includes(item)) {
                                    setSelectedRules(val);
                                    let rules = GetRulesFromLabels(val);
                                    setAttributes({
                                        rules,
                                    });
                                }
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </div>
        );
    },
    save({ className, attributes }) {
        if (typeof className !== "string") className = "";
        if (attributes.labelInline) className += " label-inline";
        if (attributes.darkLabel) className += " label-dark";
        if (attributes.addLabelImage && attributes.labelImage !== "") className += " label-image";
        if (attributes.size && attributes.size !== "normal") className += " " + attributes.size;
        const style = GenerateStyle(attributes);
        return (
            <div className={className} style={style}>
                {attributes.type !== "" && InputRender(attributes)}
            </div>
        );
    },
});

function GenerateStyle(attributes) {
    const style = {};
    if (parseInt(attributes.order) !== NaN && parseInt(attributes.order) > 0) {
        style.order = attributes.order.toString();
    }
    return style;
}

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
                                    id={attributes.name}
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
                id: attributes.name,
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
                            <input id={attributes.name} type={attributes.type} name={attributes.name} />
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
        case "textarea":
            return (
                <>
                    {LabelRender(attributes)}
                    <div className="flex-group">
                        <div className="input-group textarea">
                            <div className="input-group-field">
                                <textarea
                                    id={attributes.name}
                                    name={attributes.name}
                                    placeholder={attributes.addPlaceholder ? attributes.placeholder : ""}
                                    value={attributes.defaultValue}
                                    onChange={() => {}}
                                ></textarea>
                            </div>
                        </div>
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
                    let url = image.sizes.full.url.replace("http://", "//") || image.sizes.full.url;
                    setAttributes({ labelImage: url });
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
                    <img src={attributes.labelImage} alt={attributes.label} />
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

function GetRulesFromLabels(labels) {
    let data = [];
    if (typeof labels === "object" && labels.length > 0) {
        for (const [key, label] of Object.entries(labels)) {
            var result = rulesOptions.find((item) => item.label === label);
            if (result) {
                data.push(result);
            }
        }
    }
    return data;
}

const rulesOptions = [
    {
        value: "required",
        label: "Requis",
    },
    {
        value: "email",
        label: "Email",
    },
    {
        value: "number",
        label: "Nombre",
    },
    {
        value: "alphanumeric",
        label: "Alphanumérique",
    },
];
