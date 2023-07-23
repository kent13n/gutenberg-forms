<?php

/**
 * Plugin Name:       Gutenberg Forms
 * Description:       Gutenberg Forms allows you to quickly and effortlessly create forms inside WordPress block editor.
 * Author:            Kent13n
 * Author URI         https://github.com/kent13n
 * Version:           0.0.1
 * Text Domain:       gutenberg-forms
 *
 * @package           gutenberg-forms
 */


defined('ABSPATH') || exit;

require_once(plugin_dir_path(__FILE__) . 'vendor/autoload.php');

$plugin = new GutenbergForms\Main(__FILE__);