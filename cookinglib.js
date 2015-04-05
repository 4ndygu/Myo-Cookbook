var CookingLibrary = function (){

    var type = "R";

    var mixing_state = 1;
    var mixing_min_x = -0.5;
    var mixing_max_x = 0.5;
    var mixing_counter = 0;

    var cutting_state = 1;
    var cutting_min_yaw = 0;
    var cutting_max_yaw = 0.8;
    var cutting_counter = 0;

    var task_count = 0;
    var task_time = 0;

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
    this.CheckTask = function(){
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
    this.ReceiveSignal = function(x, y, z, pitch, yaw , row){
        if (type == "S"){
            SendMixSignal(x);
        }
        if (type == "C"){
            SendCutSignal(z);
        }
        this.CheckTask();
    };
    this.GetCounter = function(){
        if (t == "C"){
            return cutting_counter;
        } else if (t == "S"){
            return mixing_counter;
        }

    };
    
    this.NewTask = function(t, count, time){
        type = t.substring(0,1);
        task_count = count;
        task_time = time;
    };
    
};