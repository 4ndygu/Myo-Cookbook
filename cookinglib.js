var CookingLibrary = function (){

    var mixing_enabled = false;
    var mixing_state = 1;
    var mixing_min_x = -1000;
    var mixing_max_x = 1000;
    var mixing_counter = 0;

    var cutting_done = false;
    var cutting_enabled = false;
    var cutting_state = 1;
    var cutting_min_yaw = 0;
    var cutting_max_yaw = 0.8;
    var cutting_counter = 0;

    var flipping_enabled = false;
    var flipping_state = 1;
    var flipping_min_yaw = -1000;
    var flipping_max_yaw = 1000;
    var flipping_counter = 0;

    this.ToggleMixOn = function(){
        mixing_enabled = true;
    };
    this.ToggleCutOn = function(){
        cutting_enabled = true;
    };
    this.ToggleMixOff = function(){
        mixing_enabled = false;
    };
    this.ToggleCutOff = function(){
        cutting_enabled = false;
    };
    this.ToggleFlipOff = function(){
        flipping_enabled = false;
    };
    this.ToggleFlipOn = function(){
        flipping_enabled = true;
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
                cutting_done = true;
            }
        }
    };
    /*this.CheckTask = function(){
        if (type == "R"){
            return true;
        }
        if (type == "S"){
            if (mixing_counter == task_count){
                task_count = 0;
                task_time = 0;
                type == "R";
                return true;
            } else {
                return false;
            }
        }
        if (type == "C"){
            if (cutting_counter == task_count){
                task_count = 0;
                task_time = 0;
                type == "R";
                return true;
            } else {
                return false;
            }
        }
    };
    */
    this.ReceiveSignal = function(x, y, z, pitch, yaw , row){
        if (mixing_enabled){
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
        }
        if (cutting_enabled){
        //this.CheckTask();
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
        }
        if (flipping_enabled){
            if (flipping_state == 1){
                if (yaw < flipping_min_yaw){
                    flipping_state = 2;
                }
            } else {
                if (yaw > flipping_max_yaw){
                    flipping_state = 1;
                    flipping_counter++;
                }
            }
        }
        //this.CheckTask();
    };
    this.GetCounter = function(){
        if (mixing_enabled){
            return mixing_counter;
        } else if (cutting_enabled){
            return cutting_counter;
        }
        if (flipping_enabled){
            return flipping_counter;
        }

    };
    this.GetCuttingDone = function(){
        if (cutting_done){
            cutting_done = false;
            return true;
        } else{
            return false;
        }
    }
    /*
    this.NewTask = function(t, count, time){
        type = t.substring(0,1);
        task_count = count;
        task_time = time;
        return type;
    };
    */
    this.ResetCounter = function(){
        mixing_counter = 0;
        cutting_counter = 0;
        flipping_counter = 0;
    };
    this.SetMixBounds = function(x){
        mixing_max_x = x + 0.04;
        mixing_min_x = x - 0.02;
    };
    this.SetFlipBounds = function(yaw){
        flipping_max_yaw = yaw + 2.5;
        flipping_min_yaw = yaw - 0.5;
    };
    
};