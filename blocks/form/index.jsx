const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, MediaUpload, MediaUploadCheck, InnerBlocks } = wp.blockEditor;
const { ColorPicker, PanelBody, TextControl, Button, __experimentalNumberControl } = wp.components;
const { __ } = wp.i18n;

registerBlockType("gutenberg-forms/form", {
    title: __("Form", "gutenberg-forms"),
    icon: "layout", // check icon here : https://developer.wordpress.org/resource/dashicons/
    category: "gutenberg-forms",
    edit({ className, attributes, setAttributes }) {
        const blocks = [
            "gutenberg-forms/input",
            "gutenberg-forms/layout",
            "gutenberg-forms/separator",
            "core/paragraph",
            "core/heading",
        ];
        const { successMessage, errorMessage, formulaireNotValidated, submitBtn, titleMessage, destMail } = attributes;
        const style = getFormStyle(attributes);
        const identifier = getIdentifier(attributes, setAttributes);

        return (
            <div className={className} style={style}>
                <form method="post">
                    <input type="hidden" name="gutenberg-form" value="" />
                    <InnerBlocks allowedBlocks={blocks} />
                    <div className="text-center">
                        <input className="gutenberg-forms-submit" type="submit" value={attributes.submitBtn} />
                    </div>
                </form>

                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={false}>
                        <TextControl
                            label="Nom du formulaire"
                            value={titleMessage}
                            onChange={(titleMessage) => {
                                setAttributes({ titleMessage });
                            }}
                        />
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
                            label="Message formulaire non validé"
                            value={formulaireNotValidated}
                            onChange={(formulaireNotValidated) => {
                                setAttributes({ formulaireNotValidated });
                            }}
                        />
                        <TextControl
                            label="Bouton envoyé"
                            value={submitBtn}
                            onChange={(submitBtn) => {
                                setAttributes({ submitBtn });
                            }}
                        />
                        <TextControl
                            label="Email destinataire"
                            value={destMail || ""}
                            onChange={(destMail) => {
                                setAttributes({ destMail });
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

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}

function getIdentifier(attributes, setAttributes) {
    if (attributes.identifier === null) {
        let identifier = uuidv4();
        setTimeout(() => {
            setAttributes({ identifier });
        }, 1000);
        return identifier;
    }
    return attributes.identifier;
}

function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!input) return false;

    if (input.match(validRegex)) {
        console.log("valide");
        return true;
    } else {
        console.log("non valide");
        return false;
    }
}
