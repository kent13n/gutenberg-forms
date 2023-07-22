<?php

namespace GutenbergForms;

use GutenbergForms\JSXBlocks;

class Main
{
    public function __construct()
    {
        // add_action('enqueue_block_editor_assets', [$this, 'AdminAssets']);
        add_action('init', [$this, 'init']);
        add_filter('block_categories_all', [$this, 'AddCategory']);
    }

    public function Init()
    {
        (new JSXBlocks\FormBlock())->Register();
        (new JSXBlocks\InputBlock())->Register();
        (new JSXBlocks\LayoutBlock())->Register();
        (new JSXBlocks\SeparatorBlock())->Register();
        Form::IsSubmitted();
    }

    public function AddCategory(array $categories)
    {
        $categories[] = [
            'slug' => 'gutenberg-forms',
            'title' => 'Forms'
        ];
        return $categories;
    }
}
