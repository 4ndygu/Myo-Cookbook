var CookingLibrary = function (){

	var mixing_enabled = false;
    var mixing_state = 1;
    var mixing_min_x = -0.5;
    var mixing_max_x = 0.5;
    var mixing_counter = 0;

    var cutting_enabled = false;
    var cutting_state = 1;
    var cutting_min_yaw = 0;
    var cutting_max_yaw = 0.8;
    var cutting_counter = 0;

    this.EnableMix = function(){
    	mixing_enabled = true;
    };
    this.DisableMix = function(){
    	mixing_enabled = false;
    };
    this.EnableCut = function(){
    	cutting_enabled = true;
    };
    this.DisableCut = function(){
    	cutting_enabled = false;
    };
    this.SendMixSignal = function(x){
    	if (mixing_state == 1){
            if (x < mixing_min_x){
                mixing_state = 2;
            }
        } else {
            if (x > mixing_max_x){
                mixing_state = 1;
                mixing_counter++;
            }
        }
    };
    this.SendCutSignal = function(yaw){
    	if (cutting_state == 1){
    		if (yaw < cutting_min_yaw){
    			cutting_state = 2;
    		}

    	} else{
    		if (yaw > cutting_max_yaw){
    			cutting_state = 1;
    			cutting_counter++;
    		}
    	}
    };
    this.ReceiveSignal = function(x, y, z, pitch, yaw , row){
    	if (mixing_enabled){
    		SendMixSignal(x);
    	}
    	if (cutting_enabled){
    		SendCutSignal(z);
    	}
    };
    this.getMixCounter = function(){
    	return mixing_counter;
    };
    this.getCutCounter = function(){
    	return cutting_counter;
    };
};