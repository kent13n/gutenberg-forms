<?php

namespace GutenbergForms;

use WP;
use WP_Error;

class Form
{
    private static $blocks = '';

    public static function IsSubmitted()
    {
        if (isset($_POST['gutenberg-form']) && wp_verify_nonce($_POST['_wpnonce'])) {
            global $errors;
            $post = get_post(get_the_ID());
            self::$blocks = parse_blocks($post->post_content);

            foreach ($_POST as $name => $value) {
                if ($name !== 'gutenberg-form' && $name !== '_wpnonce' && $name !== '_wp_http_referer') {
                    self::Validate($name, $value);
                }
            }
        }
    }

    private static function GetBlock($blocks, $name)
    {
        foreach ($blocks as $block) {
            if (isset($block['attrs']) && isset($block['attrs']['name']) && $block['attrs']['name'] === $name) {
                return $block;
            } else if (isset($block['innerBlocks']) && count($block['innerBlocks']) > 0) {
                $value = self::GetBlock($block['innerBlocks'], $name);
                if ($value !== null) {
                    return $value;
                }
            }
        }
        return null;
    }

    private static function Validate($name, $value)
    {
        global $errors;
        if ($errors === null) {
            $errors = new WP_Error();
        }

        $block = self::GetBlock(self::$blocks, $name);

        if ($block !== null && isset($block['attrs']) && isset($block['attrs']['rules']) && count($block['attrs']['rules']) > 0) {
            $rules = $block['attrs']['rules'];
            foreach ($rules as $rule) {
                switch ($rule['value']) {
                    case 'required':
                        if (strlen($value) === 0) {
                            $errors->add($name, __("Le champ {$name} est requis."), 'gutenberg-form');
                        }
                        break;
                    case 'alphanumeric':
                        if (!preg_match("/[a-zA-Z0-9àâáçéèèêëìîíïôòóùûüÂÊÎÔúÛÄËÏÖÜÀÆæÇÉÈŒœÙñý'\"’,.]+/", $value)) {
                            $errors->add($name, __("Le champ {$name} doit contenir seulement des caractères alphanumérique."), 'gutenberg-form');
                        }
                        break;
                    case 'email':
                        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                            $errors->add($name, __("Le champ {$name} doit contenir une adresse email valide."), 'gutenberg-form');
                        }
                        break;
                    case 'number':
                        if (!preg_match("/^[0-9]+$/", $value)) {
                            $errors->add($name, __("Le champ {$name} doit contenir seulement des chiffres."), 'gutenberg-form');
                        }
                        break;
                    default:
                        dd($rule);
                }
            }
        }
    }
}
