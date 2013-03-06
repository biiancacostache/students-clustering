'use strict';

describe("Repeat password directive", function () {

    var scope, form, elm;

    beforeEach(module('smlBootstrap.directives'));

    beforeEach(inject(function ($rootScope, $compile) {
        elm = angular.element(
            '<form name="registerForm" novalidate>' +
                '<input type="password" name="password" ng-model="model.password1">' +
                '<input type="password" name="repeatPassword" ng-model="model.password2" bs-repeat-password="password">' +
                '</form>');
        scope = $rootScope;
        scope.model = { password1: null, password2: null};
        $compile(elm)(scope);
        scope.$digest();
        form = scope.registerForm;
    }));

    it('should be valid initially', function () {
        expect(form.password.$valid).toBe(true);
        expect(form.repeatPassword.$valid).toBe(true);
    });

    it('should set model to valid after setting two matching passwords', function () {
        // when
        form.password.$setViewValue('pass123');
        form.repeatPassword.$setViewValue('pass123');
        // then
        expect(form.password.$valid).toBe(true);
        expect(form.repeatPassword.$valid).toBe(true);
    });

    it('should set model to invalid after setting only first input', function () {
        // when
        form.password.$setViewValue('pass123');
        // then
        expect(form.password.$valid).toBe(true);
        expect(form.repeatPassword.$valid).toBe(false);
    });

    it('should set model to invalid after setting only second input', function () {
        // when
        form.repeatPassword.$setViewValue('pass123');
        // then
        expect(form.password.$valid).toBe(true);
        expect(form.repeatPassword.$valid).toBe(false);
    });

    it('should set model to invalid after changing matching input', function () {
        // when
        form.repeatPassword.$setViewValue('pass123');
        form.password.$setViewValue('pass123');
        form.password.$setViewValue('pass124');
        // then
        expect(form.password.$valid).toBe(true);
        expect(form.repeatPassword.$valid).toBe(false);
    });

    it('should set model to valid after emptying and fixing matching input', function () {
        // when
        form.repeatPassword.$setViewValue('pass123');
        form.password.$setViewValue('pass123');
        form.password.$setViewValue('');
        form.repeatPassword.$setViewValue('');
        form.repeatPassword.$setViewValue('pass123');
        form.password.$setViewValue('pass123');
        // then
        expect(form.password.$valid).toBe(true);
        expect(form.repeatPassword.$valid).toBe(true);
    });
});