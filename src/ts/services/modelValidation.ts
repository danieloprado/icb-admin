declare var $: JQueryStatic;
import {Injectable} from 'angular2/core';

@Injectable()
export class ModelValidationService {
    resolve(form: any, modelError: any): any {
        form = $(form);

        var unbindErrors = [];
        var messageContainer = null;
        var keys = Object.keys(modelError);

        keys.forEach(function (item) {
            var errors = modelError[item];

            if (item == "") {
                errors.forEach(function (error) {
                    unbindErrors.push(error);
                });

                return;
            }

            if (!$.isArray(errors)) {
                errors = errors.errors.map(function (errorItem) {
                    return errorItem.errorMessage;
                });
            }

            var name = item.substr(item.indexOf(".") + 1, item.length).toLowerCase();
            messageContainer = form.find("[data-valmsg-for]").filter(function () {
                return $(this).attr('data-valmsg-for').toLowerCase() == name;
            });

            $("[name='" + name + "']").addClass("input-validation-error");

            if (messageContainer.size() > 0) {
                messageContainer.addClass("field-validation-error");
                messageContainer.removeClass("field-validation-valid");

                errors.forEach(function (error) {
                    messageContainer.append("<span>" + error + "</span>");
                });

                return;
            }

            errors.forEach(function (error) {
                unbindErrors.push(error);
            });
        });

        messageContainer = form.find("[summary-errors]");

        if (unbindErrors.length > 0 && messageContainer.size() > 0) {
            messageContainer.addClass("field-validation-error");
            messageContainer.removeClass("field-validation-valid");

            unbindErrors.forEach(function (error) {
                messageContainer.append("<span>" + error + "</span>");
            });
        }

        return unbindErrors;
    }
}