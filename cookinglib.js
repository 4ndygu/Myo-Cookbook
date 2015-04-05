var CookingLibrary = function (){

    //var type = "R";
    // 0 = rest, 1 = mix, 2 = cut, 3 = heat
    var type = 0;
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
        //this.CheckTask();
    };
    this.GetCounter = function(){
        if (mixing_enabled){
            return mixing_counter;
        } else if (cutting_enabled){
            return cutting_counter;
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
    };
    this.SetMixBounds = function(x){
        mixing_max_x = x + 0.05;
        mixing_min_x = x - 0.04;
    };
    
};