(()=>{var e=wp.blocks.registerBlockType,t=wp.blockEditor,l=(t.RichText,t.InspectorControls),n=(t.MediaUpload,t.MediaUploadCheck,t.InnerBlocks,wp.components),a=(n.ColorPicker,n.PanelBody),r=n.TextControl,m=(n.Button,n.__experimentalNumberControl,n.SelectControl),o=wp.i18n.__;function p(e){switch(e.type){case"text":return wp.element.createElement("div",{className:"input-group"},wp.element.createElement("input",{type:e.type,name:"{attributes.name}"}));case"number":return wp.element.createElement("div",{className:"input-group"},wp.element.createElement("input",{type:e.type,name:"{attributes.name}"}),wp.element.createElement("div",{className:"input-suffix"},wp.element.createElement("button",{type:"button",onClick:u},"+"),wp.element.createElement("button",{type:"button",onClick:c},"-")))}return""}function u(){alert("+")}function c(){alert("-")}wp.data.useSelect,e("gutenberg-forms/input",{title:o("Input","gutenberg-forms"),icon:"layout",category:"gutenberg-forms",edit:function(e){var t=e.className,n=e.attributes,o=e.setAttributes;return wp.element.createElement("div",{className:t},""!==n.label&&wp.element.createElement("label",{htmlFor:n.name},n.label),""!==n.type&&p(n),wp.element.createElement(l,null,wp.element.createElement(a,{title:"Settings",initialOpen:!1},wp.element.createElement(r,{label:"Label:",value:n.label,onChange:function(e){o({label:e})}}),wp.element.createElement(r,{label:"Nom du champ:",value:n.name,onChange:function(e){o({name:e})}}),wp.element.createElement(m,{label:"Type du champ:",value:n.type,onChange:function(e){o({type:e})},options:[{value:"text",label:"Text"},{value:"number",label:"Number"},{value:"email",label:"Email"},{value:"password",label:"Password"},{value:"file",label:"File"}]}))))},save:function(e){var t=e.className,l=e.attributes;return wp.element.createElement("div",{className:t},""!==l.label&&wp.element.createElement("label",{htmlFor:l.name},l.label),""!==l.type&&p(l))}})})();