<?php

namespace GutenbergForms\JSXBlocks;

class LayoutBlock extends JSXBlock
{
    public string $name = 'layout';

    public array $attributes = [
        'columns' => ['type' => 'number', 'default' => 1],
        'rows' => ['type' => 'number', 'default' => 2],
        'separator' => ['type' => 'boolean', 'default' => false],
        'compact' => ['type' => 'boolean', 'default' => false],
        'maxWidth' => ['type' => 'number', 'default' => null]
    ];

    public function InputRender(array $attributes, $html = '')
    {
        return $html;
    }
}
