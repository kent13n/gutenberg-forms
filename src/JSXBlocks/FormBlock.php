<?php

namespace GutenbergForms\JSXBlocks;

use PHP_CodeSniffer\Generators\HTML;

class FormBlock extends JSXBlock
{
    public string $name = 'form';

    public array $attributes = [
        'successMessage' => ['type' => 'string', 'default' => 'Le formulaire a bien été envoyé.'],
        'errorMessage' => ['type' => 'string', 'default' => 'Une erreur est survenue. Veuillez corriger le formulaire.'],
        'formulaireNotValidated' => ['type' => 'string', 'default' => 'Tous les champs requis n\'ont pas été validés.'],
        'submitBtn' => ['type' => 'string', 'default' => 'Envoyer'],
        'maxWidth' => ['type' => 'number', 'default' => null]
    ];

    public function FormRender(array $attributes, $html = '')
    {
        global $errors;
        $errorMessage = '';
        $successMessage = '';
        $style = '';

        if ($errors !== null && count($errors->errors) > 0) {
            $errorMessage = <<<HTML
                <div class="wp-block-gutenberg-alert error show">
                    {$attributes['errorMessage']}
                    <span class="closebtn">×</span>
                </div>
            HTML;
        } else if (isset($_POST['gutenberg-form'])) {
            $successMessage = <<<HTML
                <div class="wp-block-gutenberg-alert success show">
                    {$attributes['successMessage']}
                    <span class="closebtn">×</span>
                </div>
            HTML;
        }

        if (isset($attributes['maxWidth']) && !is_null($attributes['maxWidth']) && $attributes['maxWidth'] > 0) {
            $style .= "max-width: {$attributes['maxWidth']}px;";
        }

        $wp_nonce_field = wp_nonce_field(-1, '_wpnonce', true, false);
        return <<<HTML
            <div class="gutenberg-forms" style="{$style}">
                <form action method="post">
                    {$errorMessage}
                    {$successMessage}
                    <div class="wp-block-gutenberg-alert error not-validated">
                        {$attributes['formulaireNotValidated']}
                        <span class="closebtn">×</span>
                    </div>
                    <input type="hidden" name="gutenberg-form" value="1">
                    {$wp_nonce_field}
                    {$html}
                    <div class="text-center">
                        <input class="gutenberg-forms-submit" type="submit" value="{$attributes['submitBtn']}">
                    </div>
                </form>
            </div>
        HTML;
    }
}
