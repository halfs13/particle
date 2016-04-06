angular.module('particle')
.controller('landingCtrl', ['$scope', function($scope) {
    $scope.mode = "rain";
    setRainActive();

    $scope.updateMode = function(mode) {
        if($scope.mode !== mode) {
            $scope.mode = mode;
            switch(mode) {
                case 'snow': setSnowActive();
                    break;
                case 'rain': setRainActive();
                    break;
            }
        }
    };

    $scope.particleControl = {};

    $scope.paused = false;
    $scope.pause = function() {
        $scope.paused = !$scope.paused;
        $scope.particleControl.pause();
    }

    /** Sets the necessary scope variables for using the particle-view directive with the snow view */
    function setSnowActive() {
        $scope.activeParticle = Particle.SnowParticle;
        $scope.activeFrequency = Particle.SnowParticle.DEFAULT_FREQUENCY;
        $scope.activeBackground = Particle.SnowParticle.DEFAULT_BACKGROUND;
    }

    /** Sets the necessary scope variables for using the particle-view directive with the rain view */
    function setRainActive() {
        $scope.activeParticle = Particle.RainParticle;
        $scope.activeFrequency = Particle.RainParticle.DEFAULT_FREQUENCY;
        $scope.activeBackground = Particle.RainParticle.DEFAULT_BACKGROUND;
    }
}]);