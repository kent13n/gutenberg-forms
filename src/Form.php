<?php

namespace GutenbergForms;

use WP;
use WP_Error;

class Form
{
    private static $blocks = '';
    public static $itemsIgnored = ['gutenberg-form', '_wpnonce', '_wp_http_referer'];

    public static function IsSubmitted()
    {
        if (isset($_POST['gutenberg-form']) && wp_verify_nonce($_POST['_wpnonce'])) {
            global $errors;
            $post = get_post(get_the_ID());
            self::$blocks = parse_blocks($post->post_content);

            $formBlock = self::GetFormBlock(self::$blocks, $_POST['gutenberg-form']);
            if ($formBlock !== null) {
                foreach ($_POST as $name => $value) {
                    if (!in_array($name, self::$itemsIgnored)) {
                        self::Validate($name, $value);
                    }
                }

                if ($errors === null || !$errors->has_errors()) {
                    $dest = isset($formBlock['attrs']) && isset($formBlock['attrs']['destMail']) && filter_var($formBlock['attrs']['destMail'], FILTER_VALIDATE_EMAIL) ? $formBlock['attrs']['destMail'] : get_bloginfo('admin_email');
                    $title = isset($formBlock['attrs']) && isset($formBlock['attrs']['titleMessage']) ? $formBlock['attrs']['titleMessage'] : 'New Gutenberg Form';
                    wp_mail($dest, esc_html($title), self::GenerateMailFromForm($title));
                }
            }
        }
    }

    private static function GenerateMailFromForm($title)
    {
        $message = "\n";
        $message .= self::RepeatStr('_', 50 + strlen($title)) . "\n\n";
        $message .= self::GenerateSpaces("Form") . "{$title}\n";
        $message .= self::RepeatStr('_', 50 + strlen($title)) . "\n\n";
        foreach ($_POST as $name => $value) {
            if (!in_array($name, self::$itemsIgnored)) {
                $v = esc_html($value);
                $name = esc_html($name);
                $n = self::GenerateSpaces($name);
                $message .= "{$n}{$v}\n";
            }
        }
        $message .= self::RepeatStr('_', 50 + strlen($title)) . "\n\n";
        return $message;
    }

    private static function RepeatStr($str, $length = 50)
    {
        $result = '';
        for ($i = 0; $i < $length; $i++) $result .= $str;
        return $result;
    }

    private static function GenerateSpaces($str, $length = 50)
    {
        $str .= ':';
        $count = strlen($str);
        if ($count < $length) {
            $count = $length - $count;
            $str .= self::RepeatStr(' ', $count);
        }
        return $str;
    }

    private static function GetFormBlock($blocks, $identifier)
    {
        foreach ($blocks as $block) {
            if (isset($block['attrs']) && isset($block['attrs']['identifier']) && $block['attrs']['identifier'] === $identifier) {
                return $block;
            } else if (isset($block['innerBlocks']) && count($block['innerBlocks']) > 0) {
                $value = self::GetFormBlock($block['innerBlocks'], $identifier);
                if ($value !== null) {
                    return $value;
                }
            }
        }
        return null;
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
                        if ($value !== '' && !preg_match("/[a-zA-Z0-9àâáçéèèêëìîíïôòóùûüÂÊÎÔúÛÄËÏÖÜÀÆæÇÉÈŒœÙñý'\"’,.]+/", $value)) {
                            $errors->add($name, __("Le champ {$name} doit contenir seulement des caractères alphanumérique."), 'gutenberg-form');
                        }
                        break;
                    case 'email':
                        if ($value !== '' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
                            $errors->add($name, __("Le champ {$name} doit contenir une adresse email valide."), 'gutenberg-form');
                        }
                        break;
                    case 'number':
                        if ($value !== '' && !preg_match("/^[0-9]+$/", $value)) {
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
