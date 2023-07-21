<?php

namespace GutenbergForms;

class Form
{
    public static function IsSubmitted()
    {
        if (isset($_POST['gutenberg-form']) && wp_verify_nonce($_POST['_wpnonce'])) {
            dd($_POST);
        }
    }
}
