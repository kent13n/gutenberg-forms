(()=>{var e=wp.blocks.registerBlockType,t=wp.blockEditor,r=(t.RichText,t.InspectorControls,t.MediaUpload,t.MediaUploadCheck,t.InnerBlocks),n=wp.components;n.ColorPicker,n.PanelBody,n.TextControl,n.Button,n.__experimentalNumberControl,e("gutenberg-forms/form",{title:(0,wp.i18n.__)("Form","gutenberg-forms"),icon:"layout",category:"gutenberg-forms",edit:function(e){var t=e.className;return e.attributes,e.setAttributes,wp.element.createElement("div",{className:t},wp.element.createElement("form",{method:"post"},wp.element.createElement("input",{type:"hidden",name:"gutenberg-form",value:"1"}),"Mon formulaire",wp.element.createElement(r,{allowedBlocks:["gutenberg-forms/form","gutenberg-forms/input"]})))},save:function(){return wp.element.createElement(r.Content,null)}})})();