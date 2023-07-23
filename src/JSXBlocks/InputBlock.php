<?php

namespace GutenbergForms\JSXBlocks;

class InputBlock extends JSXBlock
{
    public string $name = 'input';

    public array $attributes = [
        'name' => ['type' => 'string', 'default' => ''],
        'label' => ['type' => 'string', 'default' => ''],
        'type' => ['type' => 'string', 'default' => 'text'],
        'toConfirm' => ['type' => 'boolean', 'default' => false],
        'addPlaceholder' => ['type' => 'boolean', 'default' => false],
        'placeholder' => ['type' => 'string', 'default' => ''],
        'addLabelImage' => ['type' => 'boolean', 'default' => false],
        'labelImage' => ['type' => 'string', 'default' => ''],
        'labelInline' => ['type' => 'boolean', 'default' => false],
        'darkLabel' => ['type' => 'boolean', 'default' => false],
        'minValue' => ['type' => 'number', 'default' => null],
        'maxValue' => ['type' => 'number', 'default' => null],
        'defaultValue' => ['type' => 'string', 'default' => ''],
        'size' => ['type' => 'string', 'default' => 'normal'],
        'rules' => ['type' => 'array', 'default' => []]
    ];

    public function InputRender(array $attributes, $html = '')
    {
        return $html;
    }
}
