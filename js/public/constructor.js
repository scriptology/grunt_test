/**
 * Created with WebStorm.
 * User: ASolovyev@dir.condenast.ru
 * Date: 3/6/14
 * Time: 12:52 PM
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    Constructor = {
        Models: {},
        Views: {},
        Collections: {},
        Routers: {}
    };


    // OPTION
    // Model
    Constructor.Models.Option = Backbone.Model.extend();

    // Collections
    Constructor.Collections.Option = Backbone.Collection.extend();

    // View list
    Constructor.Views.Option = Backbone.View.extend({
        tagName: 'option',
        initialize: function() {
            //this.render();
        },

        render: function() {
            var template = _.template("<%= name %>");
            var templateVal = _.template("<%= val %>");
            this.$el.html(template(this.model.toJSON()));
            this.$el.val(templateVal(this.model.toJSON()));

            return this;
        }
    });


    // SELECT
    // Model
    Constructor.Models.Select = Backbone.Model.extend();

    // Collections
    Constructor.Collections.Select = Backbone.Collection.extend({});

    Constructor.Views.Select = Backbone.View.extend({
        tagName:'select',
        className: '',

        initialize: function() {
            //this.render();
        },

        render: function() {
            // обход сспика и срендерить кажжый option
            this.collection.each(function(option) {
                var optionView = new Constructor.Views.Option({model: option});

                this.$el.append(optionView.render().el);
                this.$el.attr('size', 6);
                //console.log(personView);
            }, this);

            //$('.list').append("<div class='selectBlock'></div>").append(this.el);
            return this;

        },

        events: {
            'change': 'addSection'
        },

        addSection: function() {
            console.log('change');

            this.$el.parent().nextAll().remove();

            // сделать выборку по выбранной опции
            var CurrentBox = new Constructor.Views.Box({currentCollectionInside: optionCollection});
            CurrentBox.render();
        }
    });

    // получаем список option
    var optionCollection = new Constructor.Collections.Option([
        {
            val: 1,
            name: 'Сезон 1'
        },
        {
            val: 2,
            name: 'Сезон 2'
        },
        {
            val: 3,
            name: 'Сезон 3'
        },
        {
            val: 4,
            name: 'Сезон 4'
        },
        {
            val: 4,
            name: 'Сезон 4'
        },
        {
            val: 4,
            name: 'Сезон 4'
        },
        {
            val: 5,
            name: 'Сезон 5'
        },
        {
            val: 6,
            name: 'Сезон 6'
        },
        {
            val: 7,
            name: 'Сезон 7'
        },
        {
            val: 8,
            name: 'Сезон 8'
        },
        {
            val: 9,
            name: 'Сезон 9'
        }
    ]);



    // BOX
    // Model
    Constructor.Models.Box = Backbone.Model.extend();

    // View list
    Constructor.Views.Box = Backbone.View.extend({
        className: 'select_box scroll-pane',
        currentCollectionInside: optionCollection,
        initialize: function() {
            //this.render();
        },

        render: function() {
            var tmp_controlButtons = _.template("<div class='control_buttons'><input type='button' value='Редактировать'><input type='button' value='Добавить'></div>");

            var select = new Constructor.Views.Select({collection: this.currentCollectionInside});
            this.$el.html(select.render().el);
            this.$el.append(tmp_controlButtons());
            $('.list').append(this.el);
        }
    });


    var box = new Constructor.Views.Box();
    box.render();
    //jQuery('.scroll-pane').jScrollPane();

});