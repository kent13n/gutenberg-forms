<?php

namespace GutenbergForms\JSXBlocks;

class FormBlock extends JSXBlock
{
    public string $name = 'form';

    public array $attributes = [];

    public function FormRender(array $attributes, $html = '')
    {
        $wp_nonce_field = wp_nonce_field(-1, '_wpnonce', true, false);
        return <<<HTML
            <div class="gutenberg-forms">
                <form action method="post">
                    coucou les amis
                    <input type="hidden" name="gutenberg-form" value="1">
                    {$wp_nonce_field}
                    {$html}
                    <input type="submit" value="envoyer">
                </form>
            </div>
        HTML;
    }
}
