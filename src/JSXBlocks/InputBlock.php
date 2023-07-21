<?php

namespace GutenbergForms\JSXBlocks;

class InputBlock extends JSXBlock
{
    public string $name = 'input';

    public array $attributes = [
        'name' => ['type' => 'string', 'default' => ''],
        'label' => ['type' => 'string', 'default' => ''],
        'type' => ['type' => 'string', 'default' => 'text']
    ];

    public function InputRender(array $attributes, $html = '')
    {
        return $html;
        return <<<HTML
            <label for="{$attributes['name']}">{$attributes['label']}</label>
            <input type="{$attributes['type']}" name="{$attributes['name']}" value="">
        HTML;
    }
}
