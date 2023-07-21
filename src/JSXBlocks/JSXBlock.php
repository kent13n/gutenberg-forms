<?php

namespace GutenbergForms\JSXBlocks;

class JSXBlock
{
    public string $uri = '';
    public string $dir = '';
    public string $name = '';
    public array $attributes = [];
    public array $components = ['wp-blocks', 'wp-editor', 'wp-i18n', 'wp-element', 'wp-components'];

    public function __construct()
    {
        $this->uri = dirname(dirname(plugin_dir_url(__FILE__))) . '/blocks';
        $this->dir = dirname(dirname(plugin_dir_path(__FILE__))) . '/blocks';
    }

    public function Register(): bool
    {
        if (!function_exists('register_block_type')) {
            return false;
        }

        if (is_admin()) {
            wp_register_script(
                $this->name,
                $this->uri . "/dist/{$this->name}.js",
                $this->components,
                filemtime("{$this->dir}/dist/{$this->name}.js")
            );
        } else if (!is_admin() && file_exists("{$this->dir}/dist/{$this->name}_front.js")) {
            wp_enqueue_script(
                "{$this->name}-viewscript",
                $this->uri . "/dist/{$this->name}_front.js",
                [],
                filemtime("{$this->dir}/dist/{$this->name}_front.js")
            );
        }

        wp_register_style(
            "{$this->name}-editor",
            $this->uri . "/{$this->name}/editor.css",
            [],
            filemtime("{$this->dir}/{$this->name}/editor.css")
        );

        wp_register_style(
            $this->name,
            $this->uri . "/{$this->name}/style.css",
            [],
            filemtime("{$this->dir}/{$this->name}/style.css")
        );

        $method = str_replace('-', '', ucwords($this->name, '-')) . "Render";

        register_block_type("gutenberg-forms/{$this->name}", array(
            'editor_script' => $this->name,
            'editor_style' => "{$this->name}-editor",
            'style' => $this->name,
            'attributes' => $this->attributes,
            'render_callback' => [$this, $method]
        ));

        return true;
    }
}
