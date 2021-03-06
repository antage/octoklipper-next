// OctoPrint Klipper Plugin
//
// Copyright (C) 2018  Martin Muehlhaeuser <github@mmone.de>
//
// This file may be distributed under the terms of the GNU GPLv3 license.

$(function() {
    $('#klipper-settings a:first').tab('show');
    function KlipperSettingsViewModel(parameters) {
        var self = this;
        self.settings = parameters[0];

        self.addMacro = function() {
           self.settings.settings.plugins.klippernext.macros.push({
              name: 'Macro',
              macro: '',
              sidebar: true,
              tab: true
           });
        }

        self.removeMacro = function(macro) {
           self.settings.settings.plugins.klippernext.macros.remove(macro);
        }

        self.moveMacroUp = function(macro) {
           self.moveItemUp(self.settings.settings.plugins.klippernext.macros, macro)
        }

        self.moveMacroDown = function(macro) {
           self.moveItemDown(self.settings.settings.plugins.klippernext.macros, macro)
        }

        self.addProbePoint = function() {
           self.settings.settings.plugins.klippernext.probe.points.push(
              {
                 name: 'point-#',
                 x:0, y:0, z:0
              }
           );
        }

        self.removeProbePoint = function(point) {
           self.settings.settings.plugins.klippernext.probe.points.remove(point);
        }

        self.moveProbePointUp = function(macro) {
           self.moveItemUp(self.settings.settings.plugins.klippernext.probe.points, macro)
        }

        self.moveProbePointDown = function(macro) {
           self.moveItemDown(self.settings.settings.plugins.klippernext.probe.points, macro)
        }

        self.moveItemDown = function(list, item) {
           var i = list().indexOf(item);
           if (i < list().length - 1) {
               var rawList = list();
              list.splice(i, 2, rawList[i + 1], rawList[i]);
           }
        }

        self.moveItemUp = function(list, item) {
           var i = list().indexOf(item);
           if (i > 0) {
              var rawList = list();
              list.splice(i-1, 2, rawList[i], rawList[i-1]);
           }
        }
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: KlipperSettingsViewModel,
        dependencies: ["settingsViewModel"],
        elements: ["#settings_plugin_klippernext"]
    });
});
