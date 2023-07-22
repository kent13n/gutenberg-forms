<?php

namespace GutenbergForms\JSXBlocks;

class SeparatorBlock extends JSXBlock
{
    public string $name = 'separator';

    public array $attributes = [
        'color' => ['type' => 'string', 'default' => null],
        'maxWidth' => ['type' => 'number', 'default' => null],
        'height' => ['type' => 'number', 'default' => null]
    ];

    public function SeparatorRender(array $attributes, $html = '')
    {
        $style = '';

        if (isset($attributes['height']) && !is_null($attributes['height']) && $attributes['height'] > 0) {
            $style .= "margin-top: {$attributes['height']}px; margin-bottom: {$attributes['height']}px;";
        }

        if (isset($attributes['maxWidth']) && !is_null($attributes['maxWidth']) && $attributes['maxWidth'] > 0) {
            $style .= "max-width: {$attributes['maxWidth']}px;";
        }

        if (isset($attributes['color']) && !is_null($attributes['color'])) {
            $style .= "background-color: {$attributes['color']}!important;";
        }

        return <<<HTML
            <hr class="wp-block-gutenberg-forms-separator" style="{$style}">
        HTML;
    }
}
