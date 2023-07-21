<?php

namespace GutenbergForms;

use WP;
use WP_Error;

class Form
{
    public static function IsSubmitted()
    {
        if (isset($_POST['gutenberg-form']) && wp_verify_nonce($_POST['_wpnonce'])) {
            global $errors;
            /* if ($errors === null) {
                $errors = new WP_Error();
            }
            $errors->add('name', __('nom non valide!'), 'gutenberg-form'); */
        }
    }
}
