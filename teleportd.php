<?php
/*
Copyright 2012 Teleportd Ltd.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as 
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

/*
Plugin Name: Capsules by Teleportd
Plugin URI: http://teleportd.com/
Description: Embed a live-updating set of social smartphone images curated through your account on http://capsules.teleportd.com.
Version: 1.0
Author: Antoine Llorca
Author URI: http://twitter.com/llorca
License: GPL2
*/

function load_teleportd_admin_styles() {
	echo '<link href="'.plugins_url('teleportd').'/teleportd-modal.css" rel="stylesheet">';
}

function load_teleportd_scripts_and_styles() {
	wp_deregister_script('jquery');
	wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
	wp_register_script('teleportd', plugins_url('teleportd').'/plugin-0.1.js');
	wp_enqueue_style('teleportd', plugins_url('teleportd').'/plugin-0.1.css');
	wp_enqueue_script('jquery');
	wp_enqueue_script('teleportd');
}

function capsule_shortcode($atts, $id) {
	extract(shortcode_atts(array(
		'width' => '500',
		'height' => '500'
	), $atts));
	$element = '<div class="teleportd-capsule" id="tl-'.$id.'"></div>
				<script>
					TL.plugin({ capsule_id: "'.$id.'",
					element_id: "tl-'.$id.'",
					width: '.$width.',
					height: '.$height.' }).init(function(plugin) {});
				</script>';
	return $element;
}

function add_teleportd_button() {
	if (current_user_can('edit_posts') && current_user_can('edit_pages')) {
		add_filter('mce_external_plugins', 'add_teleportd_plugin');
		add_filter('mce_buttons', 'register_teleportd_button');
	}
}

function register_teleportd_button($buttons) {
	array_push($buttons, '|', 'teleportd');
	return $buttons;
}

function add_teleportd_plugin($plugin_array) {
	$plugin_array['teleportd'] = plugins_url('teleportd').'/customcodes.js';
	return $plugin_array;
}

add_action('admin_head', 'load_teleportd_admin_styles');
add_action('wp_enqueue_scripts', 'load_teleportd_scripts_and_styles');
add_action('init', 'add_teleportd_button');
add_shortcode('capsule', 'capsule_shortcode');

?>