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

(function() {
	tinymce.create('tinymce.plugins.teleportd', {
		init: function(ed, url) {
			ed.addButton('teleportd', {
				title: 'Teleportd Capsules',
				image: url + '/teleportd.png',
				onclick: function() {
					if (ed.selection.getContent() === '' && !jQuery('.teleportd-modal').length) {
						var modal_header = jQuery('<div/>').addClass('modal-header')
																							 .append(jQuery('<a/>').html('Cancel')
			 																		 						 							 .attr({ 'href': 'javascript:void(0);',
			 																		 													 				 'class': 'btn modal-header-lb' })
			 																		 													 .click(function() {
																																			 jQuery('.teleportd-overlay').remove();
				 																		 													 jQuery('.teleportd-modal').remove();
			 																		 													 }))
																							 .append(jQuery('<a/>').html('Insert')
																					 													 .attr({ 'href': 'javascript:void(0);',
																					 													 				 'class': 'btn btn-primary modal-header-rb' })
																					 													 .click(function() {
																						 													 var cid = jQuery(this).parent().parent().find('.modal-body #teleportd-plugin-cid');
																						 													 var width = jQuery(this).parent().parent().find('.modal-body #teleportd-plugin-width').val();
																						 													 var height = jQuery(this).parent().parent().find('.modal-body #teleportd-plugin-height').val();
																						 													 var content = { 'width': '',
																						 													 		 						 'height': '' };
																						 													 if (width !== '' && width !== '500') {
																							 													 content.width = ' width="' + width + '"';
																						 													 }
																						 													 if (height !== '' && height !== '500') {
																							 													 content.height = ' height="' + height + '"';
																						 													 }
																						 													 if (cid.val() !== '') {
																						 													 	 ed.selection.setContent('[capsule' + content.width + content.height + ']' + cid.val() + '[/capsule]');
																						 													 	 jQuery('.teleportd-overlay').remove();
																						 													 	 jQuery('.teleportd-modal').remove();
																						 													 } else {
																							 													 cid.focus();
																						 													 }
																					 													 }))
																							 .append(jQuery('<h3/>').html('Teleportd Capsules'));
						
						var modal_body = jQuery('<div/>').addClass('modal-body no-footer')
																						 .append(jQuery('<div/>').addClass('text-wrapper')
																		  												  		 .append(jQuery('<label/>').attr('for', 'teleportd-plugin-cid')
																																	 											 		 	 .html('Capsule ID'))
																																		 .append(jQuery('<input/>').attr({ 'type': 'text',
																																																			 'id': 'teleportd-plugin-cid',
																																																			 'placeholder': 'Capsule ID' }))
																																		 .append(jQuery('<div/>').addClass('teleportd-plugin-width')
																																											  		 .append(jQuery('<label/>').attr('for', 'teleportd-plugin-width')
																																													 											 		   .html('Width'))
																																											  		 .append(jQuery('<input/>').attr({ 'type': 'text',
																																																												  		 'id': 'teleportd-plugin-width',
																																																												  		 'placeholder': 'Width',
																																																												  		 'value': '500' })))
																																		 .append(jQuery('<div/>').addClass('teleportd-plugin-height')
																																				 								 	   .append(jQuery('<label/>').attr('for', 'teleportd-plugin-height')
																																																								       .html('Height'))
																																											       .append(jQuery('<input/>').attr({ 'type': 'text',
																																													  											 	 		       'id': 'teleportd-plugin-height',
																																																												       'placeholder': 'Height',
																																																												       'value': '500' }))));
						
						var modal = jQuery('<div/>').addClass('teleportd-modal')
																			 	.append(modal_header)
																			 	.append(modal_body);
						
						jQuery('body').append(jQuery('<div/>').addClass('teleportd-overlay')
																									.click(function() {
																										jQuery(this).remove();
																										jQuery('.teleportd-modal').remove();
																									}))
													.append(modal);
						modal.find('#teleportd-plugin-cid').focus();
					} else if (ed.selection.getContent() !== '') {
						ed.selection.setContent('[capsule]' + ed.selection.getContent() + '[/capsule]');
					}
				}
			});
		},
		createControl: function(n, cm) {
			return null;
		}
	});
	tinymce.PluginManager.add('teleportd', tinymce.plugins.teleportd);
})();