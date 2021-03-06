import testUtils from './../test-utils';

describe("formlyMaterial - radio type", () => {

    //
    // vars
    //

    let formlyConfig;
    let $compile;
    let $rootScope;
    let $scope;
    let form;
    let element;
    let optionsElements;
    let field;

    //
    // helpers
    //

    function compile(options) {
        $scope = $rootScope.$new();
        $scope.fields = [angular.merge({}, {
            key: 'testField',
            type: 'radio',
            templateOptions: {
                label: 'test field',
                options: [
                    {name: 'first', nameUp: 'FIRST', value: 'f', valueUp: 'F'},
                    {name: 'second', nameUp: 'SECOND', value: 's', valueUp: 'S'}
                ]
            }
        }, options)];

        form = $compile(testUtils.getFormTemplate())($scope);
        $scope.$digest();
        field = $scope.fields[0];
        element = form.find('[ng-model]');
        optionsElements = element.find('md-radio-button');
    }

    //
    // tests
    //

    beforeEach(() => {
        window.module('formlyMaterial');

        inject((_$compile_, _$rootScope_, _formlyConfig_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            formlyConfig = _formlyConfig_;
        });
    });

    it('should be md-radio-group element', () => {
        compile();
        expect(element[0].nodeName).toBe('MD-RADIO-GROUP');
    });

    it('should have options with default properties for name and value', () => {
        compile();
        expect(optionsElements.length).toBe(field.templateOptions.options.length);

        field.templateOptions.options.forEach((option, key) => {
            let el = angular.element(optionsElements[key]);
            expect(el.attr('value')).toBe(option.value);
            expect(el.find('.md-label > span').html()).toContain(option.name);
        });
    });

    it('should handle valueProp', () => {
        compile({
            templateOptions: {
                valueProp: 'valueUp'
            }
        });
        expect(optionsElements.length).toBe(field.templateOptions.options.length);

        field.templateOptions.options.forEach((option, key) => {
            let el = angular.element(optionsElements[key]);
            expect(el.attr('value')).toBe(option.valueUp);
            expect(el.find('.md-label > span').html()).toContain(option.name);
        });
    });

    it('should handle labelProp', () => {
        compile({
            templateOptions: {
                labelProp: 'nameUp'
            }
        });
        expect(optionsElements.length).toBe(field.templateOptions.options.length);

        field.templateOptions.options.forEach((option, key) => {
            let el = angular.element(optionsElements[key]);
            expect(el.attr('value')).toBe(option.value);
            expect(el.find('.md-label > span').html()).toContain(option.nameUp);
        });
    });

});
