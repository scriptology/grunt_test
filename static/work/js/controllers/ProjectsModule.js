/**
* Created with WebStorm.
* User: ASolovyev@dir.condenast.ru
* Date: 5/14/14
* Time: 5:34 PM
* To change this template use File | Settings | File Templates.
*/

    angular.module('GlobalModule', [])


    .controller('HelloCtrl', function($scope) {
        $scope.name = "World";
    })


    // Profiles ++++++++++++++++++++++++
    .controller('Profiles', function($scope, $http) {

        var futureResponse = $http.get('http://localhost:63342/Devsearch_2/static/public/json/temp_profiles.json');
        futureResponse.success(function(data, status, headers, config) {
            $scope.allProfiles = data;
        });

        futureResponse.error(function(data, status, headers, config) {
            throw new Error('Something went wrong...');
        });
    })

    // Vacancy ++++++++++++++++++++++++
    .controller('Vacancy', function($scope, $http) {

        var futureResponse = $http.get('http://localhost:63342/Devsearch_2/static/public/json/temp_all_vacancy_lict.json');
        futureResponse.success(function(data, status, headers, config) {
            $scope.allVacancies = data;
        });

        futureResponse.error(function(data, status, headers, config) {
            throw new Error('Something went wrong...');
        });
    })

    .controller('Projects', function($scope, $http) {
        //$scope.name = 'World';
        $scope.population = 7000; 

        $scope.worldPercentage = function(countryPopulation) {
            return (countryPopulation / $scope.population) * 100
        };

        var futureResponse = $http.get('http://localhost:63342/Devsearch_2/static/public/json/temp_projects_list.json');
        futureResponse.success(function(data, status, headers, config) {
            $scope.projects = data;
        });

        futureResponse.error(function(data, status, headers, config) {
            throw new Error('Something went wrong...');
        });

        $scope.selectProjects = function (country) {
            $scope.selectedProjects = country;
        };

        $scope.isSelected = function (country) {
            return $scope.selectedProjects === country
        }
    })

    .controller('TextAreaWithLimitCtrl', function($scope) {
        $scope.remaining = function() {
            return MAX_LEN = $scope.message.length;
        };
        $scope.shouldWarn = function () {
            return $scope.remaining() < WARN_THRESHOLD;
        }
    })

    .controller('myEventsTest', function($scope) {
        $scope.clicked = function($event) {
            $event.stopPropagation();
            //alert('clicked');
            //console.log('sdfsd')
        };

    })

    // Main menu
    .controller('MainMenu', function($scope, $http) {
        //$scope.name = 'World';

        var futureResponse = $http.get('http://localhost:63342/Devsearch_2/static/public/json/temp_main_menu.json');
        futureResponse.success(function(data, status, headers, config) {
            $scope.MenuData = data;
        });

        futureResponse.error(function(data, status, headers, config) {
            throw new Error('Something went wrong...');
        });

    })

    // Project detail
    .controller('ProjectDetail', function ($scope, $http) {

        // tabs ****************************************
        $scope.tabs = [
            {
                id: 'desc',
                title: 'Описание проекта',
                url: 'one.tpl.html'
            },
            {
                id: 'vacancy',
                title: 'Вакансии',
                url: 'two.tpl.html'
            },
            {
                id: 'comments',
                title: 'Вопросы к команде',
                url: 'three.tpl.html'
            }
        ];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
            $scope.hideVacancyDetailPanel();
            if(tab.id == 'comments') {
                getCommentsProject();
                console.log(tab.id);
            }
        };

        $scope.isActiveTab = function (tabUrl) {
            return tabUrl == $scope.currentTab;
        };
        // end tabs ****************************************


        // vacancy detail tabs ****************************************
        $scope.vacancy_detail_panel_tabs = [
            {
                title: 'Описание вакансии',
                url: 'vacancy_desc.tpl.html'
            },
            {
                title: 'Кандидаты',
                url: 'vacancy_candidat.tpl.html'
            },
            {
                title: 'Заявки',
                url: 'vacancy_applicants.tpl.html'
            }
        ];

        $scope.vacancy_detail_panel_currentTab = 'vacancy_desc.tpl.html';

        $scope.onClickVacancyDetailTab = function (tab) {
            $scope.vacancy_detail_panel_currentTab = tab.url;
        };

        $scope.isActiveVacancyDetailTab = function (tabUrl) {
            return tabUrl == $scope.vacancy_detail_panel_currentTab;
        };
        // end vacancy detail tabs ****************************************

        var futureResponse = $http.get('http://localhost:63342/Devsearch_2/static/public/json/temp_project_detail.json');
        futureResponse.success(function (data, status, headers, config) {
            $scope.ProjectDetailData = data;
        });

        futureResponse.error(function (data, status, headers, config) {
            throw new Error('Something went wrong...');
        });

        // profile detail ****************************************
        $scope.ProfileDetail = '';
        $scope.doThisShit = function(id){
            var url = 'http://localhost:63342/Devsearch_2/static/public/json/temp_profile_detail_'+ id +'.json';
            $http.get(url).success(function (data) {
                $scope.data = data;
            }).error(function (data, status) {
                $scope.data = 'Request failed';
            });
        };

        // profile detail ****************************************

        $scope.getVacancyDetail = function(id){
            var url = 'http://localhost:63342/Devsearch_2/static/public/json/temp_vacancy_detail_'+ id +'.json';
            $http.get(url).success(function (data) {
                //$scope.currentTab = false;
                $scope.VacancyDetail = data;
                $scope.showVacancyDetailPanel=true;
            }).error(function (data, status) {
                $scope.VacancyDetail = 'Request failed';
            });
        };
        $scope.hideVacancyDetailPanel = function() {
            $scope.showVacancyDetailPanel=false;
        };

        // project comments ****************************************
        //$scope.commentTemplate = 'commentTemplate.tpl.html';
        var getCommentsProject = function() {
            var futureResponse = $http.get('http://localhost:63342/Devsearch_2/static/public/json/temp_project_comments.json');
                futureResponse.success(function (data, status, headers, config) {
                    $scope.ProjectCommentsData = data;
                });

            futureResponse.error(function (data, status, headers, config) {
                throw new Error('Something went wrong...');
            });
        }

    });

