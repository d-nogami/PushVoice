angular.module('consoleApp')
    .directive('fileSelector', function () {
        'use strict';

        return {
            restrict: 'E',
            template: '<form action="/voice" enctype="multipart/form-data" method="post">' +
                '<input type="file" name="file" multiple="multiple" id="file" style="display: none;">' +
                '<div class="input-group" style="display: flex;">' +
                    '<div class="input-group">' +
                        '<input type="text" class="form-control" id="selectedFile" readonly>' +
                            '<span class="input-group-btn">' +
                                '<button id="selectFile" class="btn btn-default" type="button">Select File</button>' +
                            '</span>' +
                    '</div>' +
                '</div>' +
                '<input type="submit" value="Upload" id="uploadButton" class="btn btn-primary margin-button" disabled>' +
                '</form>',
            replace: true,
            link: function (scope, element) {

                function updateButtonState() {
                    var value = element.find('#selectedFile').val();

                    if (value && value != '') {
                        element.find('#uploadButton').removeAttr('disabled');
                    }
                }

                element.find('#selectFile').on('click', function() {
                    element.find('#file').trigger('click');
                });

                element.find('#file').change(function() {
                    element.find('#selectedFile').val($(this).val());
                    updateButtonState();
                });


                updateButtonState();
            }
        }
    });



