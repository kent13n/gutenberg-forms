const { registerBlockType, createBlock } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { ColorPicker, PanelBody, TextControl, Button, __experimentalNumberControl, ToggleControl, SelectControl } = wp.components;
const { __ } = wp.i18n;
const { dispatch, select } = wp.data;

registerBlockType("gutenberg-forms/layout", {
    title: __("Layout", "gutenberg-forms"),
    icon: "layout", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes, clientId }) {
        const { separator } = attributes;
        const blocks = ["gutenberg-forms/input", "core/paragraph", "core/heading"];
        const gridClassName = getGridClassName(attributes);
        const styleOptions = getStyleOptions();

        return (
            <div className={className}>
                <div className={gridClassName}>
                    <InnerBlocks allowedBlocks={blocks} />
                </div>
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={false}>
                        <ToggleControl
                            label="Activer separator"
                            checked={separator}
                            onChange={() => setAttributes({ separator: !separator })}
                        />
                        <SelectControl
                            label="Type du champ:"
                            value={attributes.size}
                            onChange={(size) => {
                                setAttributes({ size });
                            }}
                            options={styleOptions}
                        />
                        <__experimentalNumberControl
                            label="Nombre de colonnes:"
                            min={1}
                            max={4}
                            value={attributes.columns}
                            onChange={(columns) => {
                                setAttributes({
                                    columns: parseInt(columns) || 1,
                                });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
            </div>
        );
    },
    save({ className, attributes }) {
        const gridClassName = getGridClassName(attributes);

        return (
            <div className={className}>
                <div className={gridClassName}>
                    <InnerBlocks.Content />
                </div>
            </div>
        );
    },
});

function Render(attributes, edit = false) {
    const { rows, columns } = attributes;

    const nb_rows = parseInt(rows) !== NaN && parseInt(rows) > 0 ? parseInt(rows) : 1;
    const nb_columns = parseInt(columns) !== NaN && parseInt(columns) > 0 ? parseInt(columns) : 1;

    const elements = [...Array(nb_columns)].map((_, i) => {
        return (
            <div className="gutenberg-forms-layout-col" key={i}>
                {edit ? <InnerBlocks allowedBlocks={blocks} /> : <InnerBlocks.Content />}
            </div>
        );
    });

    return elements;
}

function getGridClassName(attributes) {
    const { columns, separator, compact, size } = attributes;
    let className = "gutenberg-forms-layout-grid";
    const nb_columns = parseInt(columns) !== NaN && parseInt(columns) > 0 ? parseInt(columns) : 1;

    if (separator) className += " enable-separator";
    if (size) className += " " + size;

    switch (nb_columns) {
        case 1:
            className += " grid1";
            break;
        case 2:
            className += " grid2";
            break;
        case 3:
            className += " grid3";
            break;
        case 4:
            className += " grid4";
            break;
    }
    return className;
}

function getStyleOptions() {
    return [
        {
            value: "small",
            label: "Small",
        },
        {
            value: "normal",
            label: "Normal",
        },
        {
            value: "large",
            label: "Large",
        },
    ];
}
