//Earth/Moon Weight Comparison Tool (JS Edition)
//More celestial bodies on the way.
var ibodies;
var obodies;
var step = 0;
var idx1;
var idx2;
var bodies = ["Pick One","Mercury", "Venus", "Earth", "Moon", "Mars", "Phobos", "Deimos", "Ceres", "Jupiter", "Ganymede", "Europa", "Callisto", "Io", "Saturn", "Titan", "Enceladus", "Uranus", "Neptune", "Triton", "Pluto", "Charon", "Nix", "Hydra", "Styx", "Kerberos", "Makemake", "Haumea", "Eris", "Sedna", "Sun"];
var gravity = [0, 3.70, 8.87, 9.81, 1.622, 3.71, 0.0057, 0.003, 0.28, 24.79, 1.428, 1.316, 1.23603, 1.719, 10.44, 1.354, 0.113, 8.87, 11.15, 0.782, 0.620, 0.288, 0.000163, 0.051, 0.00080086, 0.00305037, 0.5, 0.401, 0.82, 0.5, 274];
var pics = [0, 2369, 2342, 2392, 2366, 2372, 2358, 2434, 2400, 2375, 2385, 2388, 2402, 2379, 2355, 2349, 2391, 2344, 2364, 2346, 2357, 2399, 0, 0, 0, 0, 2374, 2384, 2390, 0, 2352];
//var picslot;

//Sets up choices for the input dropdown.
function setupDropdown(){
    var option = "";
    for (var i=0; i<bodies.length; i++){
        option += '<option value="'+ bodies[i] +'">' + bodies[i] + "</option>";
    }
    document.getElementById("bodies").innerHTML = option;
}

//Displays console.log contents to HTML.
(function displayLog() {
    var old = console.log;
    var logger = document.getElementById('log');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})();

function modelorpic () {
    if (step == 0){
        idx1 = bodies.indexOf(ibodies);
        var model = pics[idx1];
        if (model == 0){
            var picslot = (ibodies+".jpg");
            document.getElementById("img1").src = picslot;
        } else {
            var picslot = ("https://solarsystem.nasa.gov/gltf_embed/"+model);
            document.getElementById("img1").src = picslot;
        }
    } else if (step == 1) {
        idx2 = bodies.indexOf(obodies);
        var model = pics[idx2];
        if (model == 0){
            var picslot2 = (obodies+".jpg");
            document.getElementById("img2").src = picslot2;
        } else {
            var picslot2 = ("https://solarsystem.nasa.gov/gltf_embed/"+model);
            document.getElementById("img2").src = picslot2;
        }
    }
        
}

setupDropdown()
function update(bodies){
    if (step == 0){
        ibodies = document.getElementById("bodies").value;
        modelorpic();
        document.getElementById("iname").innerHTML = (ibodies+" and ");
        //var newSrc = pics.options[pics.selectedIndex].value;
        
        //console.log(ibodies+" and ");
        step++;
        setupDropdown()
    } else if (step == 1){
        obodies = document.getElementById("bodies").value;
        modelorpic();
        document.getElementById("iname").innerHTML = (ibodies+" and "+obodies);

        //console.log(obodies);
        step++;
    }
}


function math(){
    if (step == 2){
        weight = document.getElementById("weight").value;
        unit = document.getElementById("units").value;
        idx1 = bodies.indexOf(ibodies);
        var igrav = gravity[idx1];
        idx2 = bodies.indexOf(obodies);
        var ograv = gravity[idx2];
        //Formula
        var firststep = weight / igrav; //Divides input weight by input's gravity.
        var output = firststep * ograv; //Multiplies previous answer by output's gravity.
        step++
        if (obodies == "Moon"){
            obodies = "The Moon";
        }
        if (ibodies == obodies){
            document.getElementById("output").innerHTML = ("May I ask you why in your right mind would you pick TWO of the SAME PLANET?");
        } else {
            document.getElementById("output").innerHTML = ("If you weigh "+weight+" "+unit+" on "+ibodies+", you'd weigh "+output+" "+unit+" on "+obodies+".");
        }
    }
}
