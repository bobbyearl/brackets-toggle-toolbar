/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/**
* Simple extension  to allow the toolbar (live-preview, extension manger) to be hidden.
*
* Bobby Earl
* bobby@simplyearl.com
**/
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
		PreferencesManager = brackets.getModule("preferences/PreferencesManager"),
    	prefs = PreferencesManager.getExtensionPrefs("toggleToolbar"),
		menu = Menus.getMenu(Menus.AppMenuBar.VIEW_MENU),
		commandId = 'bobbyearl.toggle-toolbar',
		prefKey = 'hidden';
	
	// Create our handler
    CommandManager.register("Toggle Toolbar", commandId, function() {
		prefs.set(prefKey, !prefs.get(prefKey));
		prefs.save();
	});
	
	// Add our item to the menu
    menu.addMenuItem(commandId, "Ctrl-Shift-t");
	
	// Set the state of the toolbar/content when our preference is changed
	prefs.definePreference(prefKey, 'boolean', 'false').on('change', function() {
		var hidden = prefs.get(prefKey);
		$('#main-toolbar').toggle(hidden);
		$('.content').css('right', hidden ? '30px' : '0');
	});
});