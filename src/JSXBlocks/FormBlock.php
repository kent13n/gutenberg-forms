<?php

namespace GutenbergForms\JSXBlocks;

use GutenbergForms\Form;

class FormBlock extends JSXBlock
{
    public string $name = 'form';

    public array $attributes = [
        'titleMessage' => ['type' => 'string', 'default' => 'Mon formulaire'],
        'successMessage' => ['type' => 'string', 'default' => 'Le formulaire a bien été envoyé.'],
        'errorMessage' => ['type' => 'string', 'default' => 'Une erreur est survenue. Veuillez corriger le formulaire.'],
        'formulaireNotValidated' => ['type' => 'string', 'default' => 'Tous les champs requis n\'ont pas été validés.'],
        'submitBtn' => ['type' => 'string', 'default' => 'Envoyer'],
        'maxWidth' => ['type' => 'number', 'default' => null],
        'identifier' => ['type' => 'string', 'default' => null],
        'destMail' => ['type' => 'string', 'default' => null]
    ];

    public function FormRender(array $attributes, $html = '')
    {
        global $errors;
        $errorMessage = '';
        $successMessage = '';
        $style = '';

        if ($errors !== null && $errors->has_errors()) {
            foreach ($_POST as $name => $value) {
                if (!in_array($name, Form::$itemsIgnored)) {
                    $html = $this->AddError($name, $value, $html);
                }
            }

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
                    <input type="hidden" name="gutenberg-form" value="{$attributes['identifier']}">
                    {$wp_nonce_field}
                    {$html}
                    <div class="text-center">
                        <input class="gutenberg-forms-submit" type="submit" value="{$attributes['submitBtn']}">
                    </div>
                </form>
            </div>
        HTML;
    }

    private function AddError($name, $value, $html)
    {
        global $errors;
        $value = esc_html($value);

        if (array_key_exists($name, $errors->errors)) {
            $html = self::AddErrorValue($name, $errors->errors[$name], $value, $html);
        } else {
            $html = self::AddValue($name, $value, $html);
        }

        return $html;
    }

    private function AddErrorValue($name, $error, $value, $html)
    {
        $regexTextarea = "/(name=\"message\" [^>]*)>(.*)<\/textarea>(.*)(<\/div>)$/m";
        $regex = "/(name=\"{$name}\" [^>]*)(value=\")\"(.*)(<\/div>)$/m";
        $html_error = <<<HTML
            <small class="error">{$error[0]}</small>
        HTML;
        if (preg_match($regex, $html)) {
            $html = preg_replace($regex, "\${1} value=\"$value\" \${3} {$html_error}</div>", $html);
        } else if (preg_match($regexTextarea, $html)) {
            $html = preg_replace($regexTextarea, "\${1}>$value</textarea>\${3} {$html_error}</div>", $html);
        }
        return $html;
    }

    private function AddValue($name, $value, $html)
    {
        $regexTextarea = "/(name=\"message\" [^>]*)>(.*)<\/textarea>(.*)(<\/div>)$/m";
        $regex = "/(name=\"{$name}\" [^>]*)(value=\")\"(.*)(<\/div>)$/m";
        if (preg_match($regex, $html)) {
            $html = preg_replace($regex, "\${1} value=\"$value\" \${3}</div>", $html);
        } else if (preg_match($regexTextarea, $html)) {
            $html = preg_replace($regexTextarea, "\${1}>$value</textarea>\${3}</div>", $html);
        }
        return $html;
    }
}
