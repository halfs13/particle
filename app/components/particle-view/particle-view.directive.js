angular.module('particle.directives')
.directive('particleView', [function() {
    return {
        templateUrl: 'app/components/particle-view/particle-view.directive.html',
        restrict: 'E',
        scope: {
            particle: "=",
            frequency: "=?",
            background: "=?",
            play: "=?",
            "control": "=?"
        },
        link: function($scope, el) {
            $scope.canvas = el.find("canvas.particle-view")[0];

            $scope.init();
        },
        controller: function($scope) {
            $scope.play = true;

            $scope.init = function() {
                var particleEngine = new Particle.ParticleEngine({
                    canvas: $scope.canvas,
                    Particle: $scope.particle,
                    particleCount: $scope.frequency,
                    background: $scope.background
                });

                particleEngine.start();

                //Watch the particle type and switch in the engine on change
                $scope.$watch('particle', function() {
                    particleEngine.setParticle($scope.particle, $scope.background, $scope.frequency);
                }, true);

                if($scope.control) {
                    $scope.control.pause = function() {
                        particleEngine.toggle();
                    }
                }
            };
        }
    };
}]);