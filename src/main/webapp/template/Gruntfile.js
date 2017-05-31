module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        meta: {

            assets_root:                    'assets/',
            assets_concat_root:             'production/assets-concatenated/',
            assets_minified_root:           'production/assets-minified/',
            assets_minified_DEMO:           'production/assets-demo/',
            widgets_root:                   'assets/widgets/',
            core_js_root:                   'assets/js-core/',
            elements_root:                  'assets/elements/',
            helpers_root:                   'assets/helpers/',
            applications_root:              'assets/applications/',
            frontend_root:                  'assets/frontend-elements/',
            snippets_root:                  'assets/snippets/',
            themes_root:                    'assets/themes/',
            pages_distribution:             'production/',

        },

    
        assemble: {

            options: {
                layout: 'admin-layout.hbs',
                layoutdir: 'src/layouts',
                production: false,
                angular: false,
                partials: ['src/partials/admin/**/*.hbs'],
                flatten: true
            },

            create_admin_files: {
                src: 'src/pages/admin/*.hbs',
                dest: '<%= meta.pages_distribution %>/admin-template/'
            },

            /* uncomment this for AngularJS gen 
            create_angular_files: {
                options : {
                    layout: undefined,
                    layoutdir: undefined,
                    ext : '.hbs',
                },
                src: 'src/pages/admin/*.hbs',
                dest: '<%= meta.pages_distribution %>/admin-template/pages/'
            },
            */
           
            create_admin_blank_files: {
                options: {
                    layout: 'admin-blank-layout.hbs'
                },
                src: 'src/pages/admin/blank-layout/*.hbs',
                dest: '<%= meta.pages_distribution %>/admin-template/'
            },

            create_frontend_files: {
                options: {
                    layout: 'frontend-layout.hbs',
                    partials: ['src/partials/frontend/**/*.hbs'],
                },
                src: 'src/pages/frontend/**/*.hbs',
                dest: '<%= meta.pages_distribution %>/frontend-template/'
            },

            create_components_frontend_files: {
                options: {
                    layout: 'frontend-components.hbs',
                    partials: ['src/partials/frontend/**/*.hbs'],
                },
                src: 'src/pages/admin/**/*.hbs',
                dest: '<%= meta.pages_distribution %>/frontend-template/'
            }

        },

        watch: {

            watch_frontend: {

                files: [
                    'src/pages/frontend/**/*.hbs',
                    'src/partials/frontend/**/*.hbs'
                ],
                tasks: ['create-frontend-template']

            },
            watch_frontend_components: {

                files: [
                    'src/pages/frontend/**/*.hbs',
                    'src/partials/frontend/**/*.hbs'
                ],
                tasks: ['create-frontend-template']

            },
            watch_admin: {

                files: [
                    'src/pages/admin/**/*.hbs'
                ],
                tasks: ['create-admin-template']

            }

        },

        uglify: {

            options:{

            },

            widgets_js: {

                files: [{
                    expand: true,
                    cwd: '<%= meta.widgets_root %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.assets_minified_root %>/widgets'
                }]

            },

            theme_js: {

                files: [{
                    expand: true,
                    cwd: '<%= meta.themes_root %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.assets_minified_root %>/themes'
                }]

            },

            core_js: {

                files: [{
                    expand: true,
                    cwd: '<%= meta.core_js_root %>',
                    src: ['**/*.js'],
                    dest: '<%= meta.assets_minified_root %>/js-core',
                    ext: '.js'
                }]

            },

            other_js: {

                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>',
                    src: 'widgets-init.js',
                    dest: '<%= meta.assets_minified_root %>'
                }]

            },

            other_js2: {

                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_concat_root %>',
                    src: 'js-core.js',
                    dest: '<%= meta.assets_minified_DEMO %>'
                }]

            },

            admin_demo_js: {

                files: {
                    '<%= meta.assets_minified_DEMO %>admin-all-demo.js': [
                        '<%= meta.assets_root %>/bootstrap/js/bootstrap.js',

                        // '<%= meta.assets_root %>/widgets/dropdown/dropdown.js',
                        // '<%= meta.assets_root %>/widgets/tooltip/tooltip.js',
                        // '<%= meta.assets_root %>/widgets/popover/popover.js',
                        '<%= meta.assets_root %>/widgets/progressbar/progressbar.js',
                        // '<%= meta.assets_root %>/widgets/button/button.js',
                        // '<%= meta.assets_root %>/widgets/collapse/collapse.js',
                        '<%= meta.assets_root %>/widgets/superclick/superclick.js',
                        '<%= meta.assets_root %>/widgets/input-switch/inputswitch-alt.js',
                        '<%= meta.assets_root %>/widgets/slimscroll/slimscroll.js',
                        '<%= meta.assets_root %>/widgets/screenfull/screenfull.js',
                        '<%= meta.assets_root %>/widgets/charts/piegage/piegage.js',
                        '<%= meta.assets_root %>/widgets/charts/piegage/piegage-demo.js',
                        '<%= meta.assets_root %>/widgets/slidebars/slidebars.js',
                        '<%= meta.assets_root %>/widgets/slidebars/slidebars-demo.js',
                        '<%= meta.assets_root %>/widgets/content-box/contentbox.js',
                        '<%= meta.assets_root %>/widgets/overlay/overlay.js',
                        '<%= meta.assets_root %>/js-init/widgets-init.js',
                        '<%= meta.assets_root %>/themes/admin/layout.js',
                        '<%= meta.assets_root %>/widgets/theme-switcher/themeswitcher.js'

                    ]
                }

            },

            frontend_demo_js: {

                files: {
                    '<%= meta.assets_minified_DEMO %>frontend-all-demo.js': [
                        '<%= meta.assets_root %>/widgets/skrollr/skrollr.js',
                        '<%= meta.assets_root %>/widgets/owlcarousel/owlcarousel.js',
                        '<%= meta.assets_root %>/widgets/owlcarousel/owlcarousel-demo.js',
                        '<%= meta.assets_root %>/widgets/sticky/sticky.js',
                        '<%= meta.assets_root %>/widgets/wow/wow.js',
                        '<%= meta.assets_root %>/widgets/videobg/videobg.js',
                        '<%= meta.assets_root %>/widgets/videobg/videobg-demo.js',
                        '<%= meta.assets_root %>/widgets/mixitup/mixitup.js',
                        '<%= meta.assets_root %>/widgets/mixitup/isotope.js',
                        '<%= meta.assets_root %>/widgets/dropdown/dropdown.js',
                        '<%= meta.assets_root %>/widgets/tooltip/tooltip.js',
                        '<%= meta.assets_root %>/widgets/popover/popover.js',
                        '<%= meta.assets_root %>/widgets/progressbar/progressbar.js',
                        '<%= meta.assets_root %>/widgets/button/button.js',
                        '<%= meta.assets_root %>/widgets/collapse/collapse.js',
                        '<%= meta.assets_root %>/widgets/superclick/superclick.js',
                        '<%= meta.assets_root %>/widgets/input-switch/inputswitch-alt.js',
                        '<%= meta.assets_root %>/widgets/slimscroll/slimscroll.js',
                        '<%= meta.assets_root %>/widgets/content-box/contentbox.js',
                        '<%= meta.assets_root %>/widgets/overlay/overlay.js',
                        '<%= meta.assets_root %>/js-init/widgets-init.js',
                        '<%= meta.assets_root %>/js-init/frontend-init.js',
                        '<%= meta.assets_root %>/themes/frontend/layout.js',
                        '<%= meta.assets_root %>/widgets/theme-switcher/themeswitcher.js'
                    ]
                }

            }


        },

        cssmin: {

            widgets_css: {
                expand: true,
                cwd: '<%= meta.widgets_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/widgets',
                ext: '.css'
            },

            elements_css: {
                expand: true,
                cwd: '<%= meta.elements_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/elements',
                ext: '.css'
            },

            helpers_css: {
                expand: true,
                cwd: '<%= meta.helpers_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/helpers',
                ext: '.css'
            },

            applications_css: {
                expand: true,
                cwd: '<%= meta.applications_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/applications',
                ext: '.css'
            },

            frontend_css: {
                expand: true,
                cwd: '<%= meta.frontend_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/frontend-elements',
                ext: '.css'
            },

            snippets_css: {
                expand: true,
                cwd: '<%= meta.snippets_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/snippets',
                ext: '.css'
            },

            themes_css: {
                expand: true,
                cwd: '<%= meta.themes_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/themes',
                ext: '.css'
            },

            concat_css: {
                expand: true,
                cwd: '<%= meta.assets_concat_root %>',
                src: ['**/*.css'],
                dest: '<%= meta.assets_minified_root %>/',
                ext: '.css'
            },

            admin_demo_css: {
                files: {
                    '<%= meta.assets_minified_DEMO %>admin-all-demo.css': [

                        '<%= meta.assets_root %>/bootstrap/css/bootstrap.css',

                        <!-- HELPERS -->

                        '<%= meta.assets_root %>/helpers/animate.css',
                        '<%= meta.assets_root %>/helpers/backgrounds.css',
                        '<%= meta.assets_root %>/helpers/boilerplate.css',
                        '<%= meta.assets_root %>/helpers/border-radius.css',
                        '<%= meta.assets_root %>/helpers/grid.css',
                        '<%= meta.assets_root %>/helpers/page-transitions.css',
                        '<%= meta.assets_root %>/helpers/spacing.css',
                        '<%= meta.assets_root %>/helpers/typography.css',
                        '<%= meta.assets_root %>/helpers/utils.css',
                        '<%= meta.assets_root %>/helpers/colors.css',

                        <!-- ELEMENTS -->

                        '<%= meta.assets_root %>/elements/badges.css',
                        '<%= meta.assets_root %>/elements/buttons.css',
                        '<%= meta.assets_root %>/elements/content-box.css',
                        '<%= meta.assets_root %>/elements/dashboard-box.css',
                        '<%= meta.assets_root %>/elements/forms.css',
                        '<%= meta.assets_root %>/elements/images.css',
                        '<%= meta.assets_root %>/elements/info-box.css',
                        '<%= meta.assets_root %>/elements/invoice.css',
                        '<%= meta.assets_root %>/elements/loading-indicators.css',
                        '<%= meta.assets_root %>/elements/menus.css',
                        '<%= meta.assets_root %>/elements/panel-box.css',
                        '<%= meta.assets_root %>/elements/response-messages.css',
                        '<%= meta.assets_root %>/elements/responsive-tables.css',
                        '<%= meta.assets_root %>/elements/ribbon.css',
                        '<%= meta.assets_root %>/elements/social-box.css',
                        '<%= meta.assets_root %>/elements/tables.css',
                        '<%= meta.assets_root %>/elements/tile-box.css',
                        '<%= meta.assets_root %>/elements/timeline.css',

                        <!-- ICONS -->

                        '<%= meta.assets_root %>/icons/fontawesome/fontawesome.css',
                        '<%= meta.assets_root %>/icons/linecons/linecons.css',
                        '<%= meta.assets_root %>/icons/spinnericon/spinnericon.css',


                        <!-- WIDGETS -->

                        '<%= meta.assets_root %>/widgets/accordion-ui/accordion.css',
                        '<%= meta.assets_root %>/widgets/calendar/calendar.css',
                        '<%= meta.assets_root %>/widgets/carousel/carousel.css',

                        '<%= meta.assets_root %>/widgets/charts/justgage/justgage.css',
                        '<%= meta.assets_root %>/widgets/charts/morris/morris.css',
                        '<%= meta.assets_root %>/widgets/charts/piegage/piegage.css',
                        '<%= meta.assets_root %>/widgets/charts/xcharts/xcharts.css',

                        '<%= meta.assets_root %>/widgets/chosen/chosen.css',
                        '<%= meta.assets_root %>/widgets/colorpicker/colorpicker.css',
                        '<%= meta.assets_root %>/widgets/datatable/datatable.css',
                        '<%= meta.assets_root %>/widgets/datepicker/datepicker.css',
                        '<%= meta.assets_root %>/widgets/datepicker-ui/datepicker.css',
                        '<%= meta.assets_root %>/widgets/daterangepicker/daterangepicker.css',
                        '<%= meta.assets_root %>/widgets/dialog/dialog.css',
                        '<%= meta.assets_root %>/widgets/dropdown/dropdown.css',
                        '<%= meta.assets_root %>/widgets/dropzone/dropzone.css',
                        '<%= meta.assets_root %>/widgets/file-input/fileinput.css',
                        '<%= meta.assets_root %>/widgets/input-switch/inputswitch.css',
                        '<%= meta.assets_root %>/widgets/input-switch/inputswitch-alt.css',
                        '<%= meta.assets_root %>/widgets/ionrangeslider/ionrangeslider.css',
                        '<%= meta.assets_root %>/widgets/jcrop/jcrop.css',
                        '<%= meta.assets_root %>/widgets/jgrowl-notifications/jgrowl.css',
                        '<%= meta.assets_root %>/widgets/loading-bar/loadingbar.css',
                        '<%= meta.assets_root %>/widgets/maps/vector-maps/vectormaps.css',
                        '<%= meta.assets_root %>/widgets/markdown/markdown.css',
                        '<%= meta.assets_root %>/widgets/modal/modal.css',
                        '<%= meta.assets_root %>/widgets/multi-select/multiselect.css',
                        '<%= meta.assets_root %>/widgets/multi-upload/fileupload.css',
                        '<%= meta.assets_root %>/widgets/nestable/nestable.css',
                        '<%= meta.assets_root %>/widgets/noty-notifications/noty.css',
                        '<%= meta.assets_root %>/widgets/popover/popover.css',
                        '<%= meta.assets_root %>/widgets/pretty-photo/prettyphoto.css',
                        '<%= meta.assets_root %>/widgets/progressbar/progressbar.css',
                        '<%= meta.assets_root %>/widgets/range-slider/rangeslider.css',
                        '<%= meta.assets_root %>/widgets/slidebars/slidebars.css',
                        '<%= meta.assets_root %>/widgets/slider-ui/slider.css',
                        '<%= meta.assets_root %>/widgets/summernote-wysiwyg/summernote-wysiwyg.css',
                        '<%= meta.assets_root %>/widgets/tabs-ui/tabs.css',
                        '<%= meta.assets_root %>/widgets/theme-switcher/themeswitcher.css',
                        '<%= meta.assets_root %>/widgets/timepicker/timepicker.css',
                        '<%= meta.assets_root %>/widgets/tocify/tocify.css',
                        '<%= meta.assets_root %>/widgets/tooltip/tooltip.css',
                        '<%= meta.assets_root %>/widgets/touchspin/touchspin.css',
                        '<%= meta.assets_root %>/widgets/uniform/uniform.css',
                        '<%= meta.assets_root %>/widgets/wizard/wizard.css',
                        '<%= meta.assets_root %>/widgets/xeditable/xeditable.css',

                        <!-- SNIPPETS -->

                        '<%= meta.assets_root %>/snippets/chat.css',
                        '<%= meta.assets_root %>/snippets/files-box.css',
                        '<%= meta.assets_root %>/snippets/login-box.css',
                        '<%= meta.assets_root %>/snippets/notification-box.css',
                        '<%= meta.assets_root %>/snippets/progress-box.css',
                        '<%= meta.assets_root %>/snippets/todo.css',
                        '<%= meta.assets_root %>/snippets/user-profile.css',
                        '<%= meta.assets_root %>/snippets/mobile-navigation.css',

                        <!-- APPLICATIONS -->

                        '<%= meta.assets_root %>/applications/mailbox.css',

                        <!-- Admin theme -->

                        '<%= meta.assets_root %>/themes/admin/layout.css',
                        '<%= meta.assets_root %>/themes/admin/color-schemes/default.css',

                        <!-- Components theme -->

                        '<%= meta.assets_root %>/themes/components/default.css',
                        '<%= meta.assets_root %>/themes/components/border-radius.css',

                        <!-- Admin responsive -->

                        '<%= meta.assets_root %>/helpers/responsive-elements.css',
                        '<%= meta.assets_root %>/helpers/admin-responsive.css'

                    ]
                }
            },

            frontend_demo_css: {
                files: {
                    '<%= meta.assets_minified_root %>frontend-all-demo.css': [


                        <!-- HELPERS -->

                        '<%= meta.assets_root %>/helpers/animate.css',
                        '<%= meta.assets_root %>/helpers/backgrounds.css',
                        '<%= meta.assets_root %>/helpers/boilerplate.css',
                        '<%= meta.assets_root %>/helpers/border-radius.css',
                        '<%= meta.assets_root %>/helpers/grid.css',
                        '<%= meta.assets_root %>/helpers/page-transitions.css',
                        '<%= meta.assets_root %>/helpers/spacing.css',
                        '<%= meta.assets_root %>/helpers/typography.css',
                        '<%= meta.assets_root %>/helpers/utils.css',
                        '<%= meta.assets_root %>/helpers/colors.css',

                        <!-- ELEMENTS -->

                        '<%= meta.assets_root %>/elements/badges.css',
                        '<%= meta.assets_root %>/elements/buttons.css',
                        '<%= meta.assets_root %>/elements/content-box.css',
                        '<%= meta.assets_root %>/elements/dashboard-box.css',
                        '<%= meta.assets_root %>/elements/forms.css',
                        '<%= meta.assets_root %>/elements/images.css',
                        '<%= meta.assets_root %>/elements/info-box.css',
                        '<%= meta.assets_root %>/elements/invoice.css',
                        '<%= meta.assets_root %>/elements/loading-indicators.css',
                        '<%= meta.assets_root %>/elements/menus.css',
                        '<%= meta.assets_root %>/elements/panel-box.css',
                        '<%= meta.assets_root %>/elements/response-messages.css',
                        '<%= meta.assets_root %>/elements/responsive-tables.css',
                        '<%= meta.assets_root %>/elements/ribbon.css',
                        '<%= meta.assets_root %>/elements/social-box.css',
                        '<%= meta.assets_root %>/elements/tables.css',
                        '<%= meta.assets_root %>/elements/tile-box.css',
                        '<%= meta.assets_root %>/elements/timeline.css',

                        <!-- FRONTEND ELEMENTS -->

                        '<%= meta.assets_root %>/frontend-elements/blog.css',
                        '<%= meta.assets_root %>/frontend-elements/cta-box.css',
                        '<%= meta.assets_root %>/frontend-elements/feature-box.css',
                        '<%= meta.assets_root %>/frontend-elements/footer.css',
                        '<%= meta.assets_root %>/frontend-elements/hero-box.css',
                        '<%= meta.assets_root %>/frontend-elements/icon-box.css',
                        '<%= meta.assets_root %>/frontend-elements/portfolio-navigation.css',
                        '<%= meta.assets_root %>/frontend-elements/pricing-table.css',
                        '<%= meta.assets_root %>/frontend-elements/sliders.css',
                        '<%= meta.assets_root %>/frontend-elements/testimonial-box.css',
                        
                        <!-- ICONS -->

                        '<%= meta.assets_root %>/icons/fontawesome/fontawesome.css',
                        '<%= meta.assets_root %>/icons/linecons/linecons.css',
                        '<%= meta.assets_root %>/icons/spinnericon/spinnericon.css',


                        <!-- WIDGETS -->

                        '<%= meta.assets_root %>/widgets/accordion-ui/accordion.css',
                        '<%= meta.assets_root %>/widgets/calendar/calendar.css',
                        '<%= meta.assets_root %>/widgets/carousel/carousel.css',

                        '<%= meta.assets_root %>/widgets/charts/justgage/justgage.css',
                        '<%= meta.assets_root %>/widgets/charts/morris/morris.css',
                        '<%= meta.assets_root %>/widgets/charts/piegage/piegage.css',
                        '<%= meta.assets_root %>/widgets/charts/xcharts/xcharts.css',

                        '<%= meta.assets_root %>/widgets/chosen/chosen.css',
                        '<%= meta.assets_root %>/widgets/colorpicker/colorpicker.css',
                        '<%= meta.assets_root %>/widgets/datatable/datatable.css',
                        '<%= meta.assets_root %>/widgets/datepicker/datepicker.css',
                        '<%= meta.assets_root %>/widgets/datepicker-ui/datepicker.css',
                        '<%= meta.assets_root %>/widgets/daterangepicker/daterangepicker.css',
                        '<%= meta.assets_root %>/widgets/dialog/dialog.css',
                        '<%= meta.assets_root %>/widgets/dropdown/dropdown.css',
                        '<%= meta.assets_root %>/widgets/dropzone/dropzone.css',
                        '<%= meta.assets_root %>/widgets/file-input/fileinput.css',
                        '<%= meta.assets_root %>/widgets/input-switch/inputswitch.css',
                        '<%= meta.assets_root %>/widgets/input-switch/inputswitch-alt.css',
                        '<%= meta.assets_root %>/widgets/ionrangeslider/ionrangeslider.css',
                        '<%= meta.assets_root %>/widgets/jcrop/jcrop.css',
                        '<%= meta.assets_root %>/widgets/jgrowl-notifications/jgrowl.css',
                        '<%= meta.assets_root %>/widgets/loading-bar/loadingbar.css',
                        '<%= meta.assets_root %>/widgets/maps/vector-maps/vectormaps.css',
                        '<%= meta.assets_root %>/widgets/markdown/markdown.css',
                        '<%= meta.assets_root %>/widgets/modal/modal.css',
                        '<%= meta.assets_root %>/widgets/multi-select/multiselect.css',
                        '<%= meta.assets_root %>/widgets/multi-upload/fileupload.css',
                        '<%= meta.assets_root %>/widgets/nestable/nestable.css',
                        '<%= meta.assets_root %>/widgets/noty-notifications/noty.css',
                        '<%= meta.assets_root %>/widgets/popover/popover.css',
                        '<%= meta.assets_root %>/widgets/pretty-photo/prettyphoto.css',
                        '<%= meta.assets_root %>/widgets/progressbar/progressbar.css',
                        '<%= meta.assets_root %>/widgets/range-slider/rangeslider.css',
                        '<%= meta.assets_root %>/widgets/slider-ui/slider.css',
                        '<%= meta.assets_root %>/widgets/summernote-wysiwyg/summernote-wysiwyg.css',
                        '<%= meta.assets_root %>/widgets/tabs-ui/tabs.css',
                        '<%= meta.assets_root %>/widgets/theme-switcher/themeswitcher.css',
                        '<%= meta.assets_root %>/widgets/timepicker/timepicker.css',
                        '<%= meta.assets_root %>/widgets/tocify/tocify.css',
                        '<%= meta.assets_root %>/widgets/tooltip/tooltip.css',
                        '<%= meta.assets_root %>/widgets/touchspin/touchspin.css',
                        '<%= meta.assets_root %>/widgets/uniform/uniform.css',
                        '<%= meta.assets_root %>/widgets/wizard/wizard.css',
                        '<%= meta.assets_root %>/widgets/xeditable/xeditable.css',

                        <!-- FRONTEND WIDGETS -->

                        '<%= meta.assets_root %>/widgets/layerslider/layerslider.css',
                        '<%= meta.assets_root %>/widgets/owlcarousel/owlcarousel.css',
                        '<%= meta.assets_root %>/widgets/fullpage/fullpage.css',

                        <!-- SNIPPETS -->

                        '<%= meta.assets_root %>/snippets/chat.css',
                        '<%= meta.assets_root %>/snippets/files-box.css',
                        '<%= meta.assets_root %>/snippets/login-box.css',
                        '<%= meta.assets_root %>/snippets/notification-box.css',
                        '<%= meta.assets_root %>/snippets/progress-box.css',
                        '<%= meta.assets_root %>/snippets/todo.css',
                        '<%= meta.assets_root %>/snippets/user-profile.css',
                        '<%= meta.assets_root %>/snippets/mobile-navigation.css',

                        <!-- Frontend theme -->

                        '<%= meta.assets_root %>/themes/frontend/layout.css',
                        '<%= meta.assets_root %>/themes/frontend/color-schemes/default.css',


                        <!-- Components theme -->

                        '<%= meta.assets_root %>/themes/components/default.css',
                        '<%= meta.assets_root %>/themes/components/border-radius.css',

                        <!-- Frontend responsive -->

                        '<%= meta.assets_root %>/helpers/responsive-elements.css',
                        '<%= meta.assets_root %>/helpers/frontend-responsive.css'

                    ]
                }
            }

        },

        concat: {

            options: {},

            elementsCSS: {
                src: [
                    '<%= meta.assets_root %>/elements/*.css'
                ],
                dest: '<%= meta.assets_concat_root %>/elements/elements-all.css'
            },
            helperCSS: {
                src: [
                    '<%= meta.assets_root %>/helpers/*.css'
                ],
                dest: '<%= meta.assets_concat_root %>helpers/helpers-all.css'
            },
            frontendelementsCSS: {
                src: [
                    '<%= meta.assets_root %>/frontend-elements/*.css'
                ],
                dest: '<%= meta.assets_concat_root %>frontend-elements/frontend-elements-all.css'
            },
            snippetsCSS: {
                src: [
                    '<%= meta.assets_root %>/snippets/*.css'
                ],
                dest: '<%= meta.assets_concat_root %>snippets/snippets-all.css'
            },
            coreJS: {
                src: [
                    '<%= meta.assets_root %>/js-core/jquery-core.js',
                    '<%= meta.assets_root %>/js-core/jquery-ui-core.js',
                    '<%= meta.assets_root %>/js-core/jquery-ui-widget.js',
                    '<%= meta.assets_root %>/js-core/jquery-ui-mouse.js',
                    '<%= meta.assets_root %>/js-core/jquery-ui-position.js',
                    // '<%= meta.assets_root %>/js-core/transition.js',
                    '<%= meta.assets_root %>/js-core/jquery-cookie.js'

                ],
                dest: '<%= meta.assets_concat_root %>js-core.js'
            }

        },

        copy: {

            icons: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>icons',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/icons'
                }]
            },
            images: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>images',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/images'
                }]
            },
            dummy_images: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>image-resources',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/image-resources'
                }]
            },
            tabletools_swf: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>widgets/datatable/swf',
                    src: ['**'],
                    dest: '<%= meta.pages_distribution %>/swf'
                }]
            },
            pretty_photo: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>widgets/pretty-photo/images',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/widgets/pretty-photo/images'
                }]
            },
            ckeditor_3: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>widgets/ckeditor/skins/bootstrapck/images',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/widgets/ckeditor/skins/bootstrapck/images'
                }]
            },
            ckeditor_1: {
                files: [{
                    src: '<%= meta.assets_root %>widgets/ckeditor/plugins/icons.png',
                    dest: '<%= meta.assets_minified_root %>widgets/ckeditor/plugins/icons.png'
                }]
            },
            ckeditor_2: {
                files: [{
                    src: '<%= meta.assets_root %>widgets/ckeditor/plugins/icons_hidpi.png',
                    dest: '<%= meta.assets_minified_root %>widgets/ckeditor/plugins/icons_hidpi.png'
                }]
            },
            ckeditor_4: {
                files: [{
                    src: '<%= meta.assets_root %>widgets/ckeditor/skins/bootstrapck/icons.png',
                    dest: '<%= meta.assets_minified_root %>widgets/ckeditor/skins/bootstrapck/icons.png'
                }]
            },
            ckeditor_5: {
                files: [{
                    src: '<%= meta.assets_root %>widgets/ckeditor/skins/bootstrapck/icons_hidpi.png',
                    dest: '<%= meta.assets_minified_root %>widgets/ckeditor/skins/bootstrapck/icons_hidpi.png'
                }]
            },
            ckeditor_6: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>widgets/ckeditor/plugins/link/images',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/widgets/ckeditor/plugins/link/images'
                }]
            },
            ckeditor_7: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>widgets/ckeditor/plugins/magicline/images',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/widgets/ckeditor/plugins/magicline/images'
                }]
            },
            xeditable: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.assets_root %>widgets/xeditable/images',
                    src: ['**'],
                    dest: '<%= meta.assets_minified_root %>/widgets/xeditable/images'
                }]
            },
            //production_assets_copy: {
            //    expand: true,
            //    cwd: '<%= meta.assets_root %>',
            //    src: ['**'],
            //    dest: 'production/assets'
            //}

        },

        dom_munger: {

            remove_admin_1: {
                options: {
                    remove: '.remove-production'
                },
                src: 'production/admin-template/*.html'
            },
            remove_admin_2: {
                options: {
                    remove: '.example-html'
                },
                src: 'production/admin-template/*.html'
            },
            remove_frontend_1: {
                options: {
                    remove: '.remove-production'
                },
                src: 'production/frontend-template/*.html'
            },
            remove_frontend_2: {
                options: {
                    remove: '.example-html'
                },
                src: 'production/frontend-template/*.html'
            }

        },

        'http-server': {

            'aui_server': {
                root: "",
                port: 8585,
                host: "localhost",
                showDir : true,
                autoIndex: true,
                defaultExt: "html",
                runInBackground: false
            }

        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: 'production',
                src: ['**/*.html'],
                dest: 'demo/'
            }
        },

        clean: {
            clean_all: ["assets-minified", "assets-concat", "production"],
            clean_assets: ["assets-minified", "assets-concat"],
            clean_admin_files: ["admin-template"],
            clean_frontend_files: ["frontend-template"]
        }

    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-csscomb');

    grunt.registerTask('server', [
        'http-server'
    ]);

    grunt.registerTask('default', [
        'clean', 'assemble', 'concat', 'uglify', 'cssmin', 'copy', 'dom_munger'
    ]);


    grunt.registerTask('create-assets', [
        'clean:clean_assets', 'concat', 'uglify', 'cssmin', 'copy'
    ]);

    grunt.registerTask('create-admin-template', [
        'clean:clean_admin_files', 'assemble:create_admin_files', 'assemble:create_admin_blank_files'
        //, 'clean:clean_assets', 'copy'
    ]);

    grunt.registerTask('create-angular-template', [
        'clean:clean_admin_files', 'assemble:create_admin_files', 'assemble:create_angular_files', 'assemble:create_admin_blank_files'
        //, 'clean:clean_assets', 'copy'
    ]);

    grunt.registerTask('create-frontend-template', [
        'clean:clean_frontend_files', 'assemble:create_frontend_files'
        //, 'clean:clean_assets', 'copy'
    ]);

    grunt.registerTask('create-components-frontend-files', [
        'clean:clean_frontend_files', 'assemble:create_components_frontend_files'
        //, 'clean:clean_assets', 'copy'
    ]);

};


